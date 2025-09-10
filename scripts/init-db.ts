import { config } from 'dotenv';
import { Pool } from 'pg';
import path from 'path';

// Carica le variabili d'ambiente
config({ path: path.resolve(process.cwd(), '.env.local') });

// Usa l'URL esatto fornito dall'utente (con c-2 nel dominio come specificato)
const connectionString = 'postgresql://neondb_owner:npg_XfI34OxVdWcY@ep-fancy-cherry-agn9gjfq-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function initDatabase() {
  let client;
  try {
    client = await pool.connect();
    console.log('Connected to Neon PostgreSQL database');

    // Crea tabella per le candidature
    await client.query(`
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
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Aggiungi colonna updated_at se non esiste
    await client.query(`
      ALTER TABLE submissions 
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    `).catch(() => {
      // Ignora errore se la colonna esiste già
    });
    console.log('✅ Table "submissions" created/verified');

    // Crea indici per performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_submissions_email 
      ON submissions(LOWER(email))
    `);
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_submissions_ip 
      ON submissions(ip_address)
    `);
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_submissions_created 
      ON submissions(created_at)
    `);
    console.log('✅ Indexes created/verified');

    // Crea tabella per rate limiting
    await client.query(`
      CREATE TABLE IF NOT EXISTS rate_limits (
        id SERIAL PRIMARY KEY,
        identifier VARCHAR(255) UNIQUE NOT NULL,
        count INTEGER DEFAULT 1,
        window_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Table "rate_limits" created/verified');

    // Crea indici per rate limits
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier 
      ON rate_limits(identifier)
    `);
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_rate_limits_window 
      ON rate_limits(window_start)
    `);
    console.log('✅ Rate limit indexes created/verified');

    console.log('\n🎉 Database initialization completed successfully!');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

// Esegui l'inizializzazione
initDatabase();