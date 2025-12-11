'use client';

import { FaCookie, FaDatabase, FaEnvelope, FaGavel, FaLock, FaShieldAlt, FaUserCog, FaUserShield } from 'react-icons/fa';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/20 to-transparent rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-100/20 to-transparent rounded-full"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <FaShieldAlt className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    Informativa sulla Privacy
                  </span>
                </h1>
              </div>

              <p className="text-gray-600 mb-8 text-lg">
                Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <section className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <FaUserShield className="text-purple-600 text-xl" />
                  <h2 className="text-2xl font-bold text-gray-800">1. Titolare del Trattamento</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Il Titolare del trattamento dei dati personali è <strong>SMARTUP SRL</strong>, con sede legale in Viale Delle Industrie 36, 81100 Caserta (CE), Italia,
                  P.IVA 09227760965, Email: info@safescale.it. Il Titolare si impegna a garantire che il trattamento
                  dei dati personali avvenga nel rispetto del Regolamento UE 2016/679 (GDPR).
                </p>
              </section>

              <section className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <FaDatabase className="text-blue-600 text-xl" />
                  <h2 className="text-2xl font-bold text-gray-800">2. Dati Raccolti tramite il Questionario</h2>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-600 mb-4">
                    Durante la compilazione del questionario di valutazione, raccogliamo i seguenti dati:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span><strong>Dati identificativi:</strong> Nome, cognome, ragione sociale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span><strong>Dati di contatto:</strong> Indirizzo email, numero di telefono</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span><strong>Dati aziendali:</strong> Nome dell'azienda, settore di attività, dimensione aziendale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span><strong>Informazioni di marketing:</strong> Budget pubblicitario, canali utilizzati, obiettivi di marketing</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <FaLock className="text-purple-600 text-xl" />
                  <h2 className="text-2xl font-bold text-gray-800">3. Finalità del Trattamento</h2>
                </div>
                <p className="text-gray-600 mb-4">I suoi dati personali saranno trattati per le seguenti finalità:</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                    <span className="text-blue-600 font-bold">a)</span>
                    <p className="text-gray-700">
                      <strong>Analisi e valutazione:</strong> Per elaborare un'analisi personalizzata della situazione
                      di marketing della sua azienda e fornire consulenza strategica mirata.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 bg-purple-50 p-4 rounded-lg">
                    <span className="text-purple-600 font-bold">b)</span>
                    <p className="text-gray-700">
                      <strong>Comunicazioni di servizio:</strong> Per contattarla in merito ai risultati dell'analisi
                      e proporle soluzioni personalizzate.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                    <span className="text-blue-600 font-bold">c)</span>
                    <p className="text-gray-700">
                      <strong>Marketing diretto:</strong> Previo suo consenso esplicito, per inviarle comunicazioni
                      promozionali sui nostri servizi.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <FaGavel className="text-blue-600 text-xl" />
                  <h2 className="text-2xl font-bold text-gray-800">4. Base Giuridica del Trattamento</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Il trattamento dei suoi dati si basa su:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span><strong>Consenso dell'interessato</strong> (art. 6.1.a GDPR) per le attività di marketing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span><strong>Esecuzione di misure precontrattuali</strong> (art. 6.1.b GDPR) per l'analisi e la consulenza richiesta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span><strong>Legittimo interesse</strong> (art. 6.1.f GDPR) per migliorare i nostri servizi</span>
                  </li>
                </ul>
              </section>

              <section className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <FaUserCog className="text-purple-600 text-xl" />
                  <h2 className="text-2xl font-bold text-gray-800">5. I Suoi Diritti</h2>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                  <p className="text-gray-700 mb-4">
                    In conformità al GDPR, Lei ha il diritto di:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-purple-600">•</span>
                      <span className="text-gray-700">Accedere ai suoi dati personali</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-600">•</span>
                      <span className="text-gray-700">Richiedere la rettifica dei dati</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-600">•</span>
                      <span className="text-gray-700">Richiedere la cancellazione</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-600">•</span>
                      <span className="text-gray-700">Limitare il trattamento</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-600">•</span>
                      <span className="text-gray-700">Opporsi al trattamento</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-600">•</span>
                      <span className="text-gray-700">Portabilità dei dati</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-600">•</span>
                      <span className="text-gray-700">Revocare il consenso</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-600">•</span>
                      <span className="text-gray-700">Proporre reclamo al Garante</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <FaCookie className="text-blue-600 text-xl" />
                  <h2 className="text-2xl font-bold text-gray-800">6. Conservazione dei Dati</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  I suoi dati personali saranno conservati per il tempo necessario al perseguimento delle finalità
                  per cui sono stati raccolti. In particolare:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Dati per l'analisi: 12 mesi dalla compilazione del questionario</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Dati per finalità di marketing: fino alla revoca del consenso</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Dati per obblighi legali: secondo i termini di legge applicabili</span>
                  </li>
                </ul>
              </section>

              <section className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <FaShieldAlt className="text-purple-600 text-xl" />
                  <h2 className="text-2xl font-bold text-gray-800">7. Sicurezza dei Dati</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Adottiamo misure di sicurezza tecniche e organizzative adeguate per proteggere i suoi dati
                  personali da accessi non autorizzati, perdita, distruzione o alterazione. Tutti i dati sono
                  trasmessi attraverso connessioni criptate (SSL/TLS) e conservati su server sicuri nell'Unione Europea.
                </p>
              </section>

              <section className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <FaEnvelope className="text-blue-600 text-xl" />
                  <h2 className="text-2xl font-bold text-gray-800">8. Contatti</h2>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-600 mb-4">
                    Per esercitare i suoi diritti o per qualsiasi domanda relativa al trattamento dei suoi dati
                    personali, può contattarci attraverso:
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <strong>Email:</strong> info@safescale.it
                    </p>
                    <p className="text-gray-700">
                      <strong>Indirizzo:</strong> Viale Delle Industrie 36, 81100 Caserta (CE), Italia
                    </p>
                  </div>
                </div>
              </section>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Questa informativa sulla privacy è stata redatta in conformità al Regolamento UE 2016/679 (GDPR)
                  e alla normativa italiana in materia di protezione dei dati personali.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}