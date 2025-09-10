import { Pool } from 'pg';

// Crea pool di connessioni per Neon PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20, // massimo numero di client nel pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Funzione helper per query
export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release();
  }
}

// Funzione per inizializzare il database
export async function initDatabase() {
  try {
    // Crea tabella per le candidature complete
    await query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        candidate_id VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) NOT NULL,
        nome VARCHAR(255) NOT NULL,
        cognome VARCHAR(255),
        telefono VARCHAR(50),
        ip_address VARCHAR(45),
        session_token VARCHAR(255),
        questionnaire_data JSONB,
        is_incomplete BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_ip (ip_address),
        INDEX idx_created (created_at)
      )
    `);

    // Crea tabella per rate limiting
    await query(`
      CREATE TABLE IF NOT EXISTS rate_limits (
        id SERIAL PRIMARY KEY,
        identifier VARCHAR(255) UNIQUE NOT NULL,
        count INTEGER DEFAULT 1,
        window_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_identifier (identifier),
        INDEX idx_window (window_start)
      )
    `);

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    // Se le tabelle esistono già, ignora l'errore
    if (error instanceof Error && !error.message.includes('already exists')) {
      throw error;
    }
  }
}

// Funzione per controllare duplicati nel database
export async function checkDuplicateSubmission(email: string, ipAddress: string): Promise<boolean> {
  try {
    const result = await query<{count: string}>(
      `SELECT COUNT(*) as count 
       FROM submissions 
       WHERE (LOWER(email) = LOWER($1) OR ip_address = $2)
       AND is_incomplete = false
       AND created_at > NOW() - INTERVAL '24 hours'`,
      [email, ipAddress]
    );
    
    return parseInt(result[0]?.count || '0') > 0;
  } catch (error) {
    console.error('Error checking duplicate submission:', error);
    return false;
  }
}

// Funzione per salvare una candidatura
export async function saveSubmission(data: {
  candidateId: string;
  email: string;
  nome: string;
  cognome?: string;
  telefono?: string;
  ipAddress: string;
  sessionToken?: string;
  questionnaireData?: any;
  isIncomplete: boolean;
}) {
  try {
    const result = await query(
      `INSERT INTO submissions 
       (candidate_id, email, nome, cognome, telefono, ip_address, session_token, questionnaire_data, is_incomplete)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (candidate_id) DO NOTHING
       RETURNING id`,
      [
        data.candidateId,
        data.email.toLowerCase(),
        data.nome,
        data.cognome || null,
        data.telefono || null,
        data.ipAddress,
        data.sessionToken || null,
        JSON.stringify(data.questionnaireData || {}),
        data.isIncomplete
      ]
    );
    
    return result[0];
  } catch (error) {
    console.error('Error saving submission:', error);
    throw error;
  }
}

// Funzione per rate limiting con database
export async function checkRateLimit(identifier: string, maxRequests: number = 2, windowMinutes: number = 60): Promise<{allowed: boolean, message?: string}> {
  try {
    // Pulisci vecchi record
    await query(
      `DELETE FROM rate_limits 
       WHERE window_start < NOW() - INTERVAL '${windowMinutes} minutes'`
    );

    // Controlla se esiste già un record
    const existing = await query<{count: number, window_start: Date}>(
      `SELECT count, window_start 
       FROM rate_limits 
       WHERE identifier = $1 
       AND window_start > NOW() - INTERVAL '${windowMinutes} minutes'`,
      [identifier]
    );

    if (existing.length > 0) {
      const record = existing[0];
      
      if (record.count >= maxRequests) {
        const minutesLeft = Math.ceil((windowMinutes * 60000 - (Date.now() - new Date(record.window_start).getTime())) / 60000);
        return {
          allowed: false,
          message: `Hai raggiunto il limite di invii. Riprova tra ${minutesLeft} minuti.`
        };
      }

      // Incrementa il contatore
      await query(
        `UPDATE rate_limits 
         SET count = count + 1, updated_at = CURRENT_TIMESTAMP 
         WHERE identifier = $1`,
        [identifier]
      );
      
      return { allowed: true };
    }

    // Crea nuovo record
    await query(
      `INSERT INTO rate_limits (identifier, count, window_start) 
       VALUES ($1, 1, CURRENT_TIMESTAMP)`,
      [identifier]
    );
    
    return { allowed: true };
  } catch (error) {
    console.error('Error checking rate limit:', error);
    // In caso di errore, permetti l'invio per non bloccare gli utenti
    return { allowed: true };
  }
}

export default pool;