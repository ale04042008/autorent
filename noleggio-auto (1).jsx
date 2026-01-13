import React, { useState, useEffect } from 'react';
import { Car, MapPin, Calendar, Shield, Briefcase, Palette, ChevronDown, User, Mail, X, Check } from 'lucide-react';

export default function NoleggioAuto() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [config, setConfig] = useState({
    parcheggio: '',
    km_annui: '',
    neopatentato: false,
    uso_lavoro: false,
    colore: ''
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    dataNascita: '',
    email: '',
    sesso: ''
  });
  const [sending, setSending] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    // Controlla se i cookie sono già stati accettati
    const accepted = localStorage.getItem('cookiesAccepted');
    if (accepted === 'true') {
      setShowCookieBanner(false);
      setCookiesAccepted(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setCookiesAccepted(true);
    setShowCookieBanner(false);
  };

  const handleRejectCookies = () => {
    setShowCookieBanner(false);
    setCookiesAccepted(false);
  };

  const validateForm = () => {
    if (!formData.nome.trim()) return false;
    if (!formData.cognome.trim()) return false;
    if (!formData.dataNascita) return false;
    if (!formData.email.trim()) return false;
    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return false;
    return true;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Per favore compila tutti i campi obbligatori correttamente');
      return;
    }

    setSending(true);

    try {
      // Prepara i dati dell'ordine
      const orderData = {
        cliente: formData,
        auto: selectedCar,
        configurazione: config,
        prezzoFinale: prezzoFinale,
        dataOrdine: new Date().toLocaleDateString('it-IT')
      };

      // Email al cliente
      const emailCliente = `
Gentile ${formData.nome} ${formData.cognome},

Grazie per aver scelto AutoRent!

Abbiamo ricevuto la tua richiesta di noleggio per:

🚗 AUTO SELEZIONATA
${selectedCar.nome}
Cavalli: ${selectedCar.cavalli} CV
Anno: ${selectedCar.anno}
Kilometri: ${selectedCar.kilometri.toLocaleString()} km

⚙️ CONFIGURAZIONE
Parcheggio: ${config.parcheggio === 'garage' ? 'In Garage' : 'All\'aperto'}
Km annui: ${config.km_annui <= 10000 ? 'Fino a 10.000 km' : config.km_annui <= 20000 ? '10.000-20.000 km' : config.km_annui <= 30000 ? '20.000-30.000 km' : 'Oltre 30.000 km'}
Neopatentato: ${config.neopatentato ? 'Sì' : 'No'}
Uso lavoro: ${config.uso_lavoro ? 'Sì' : 'No'}
Colore: ${config.colore}

💰 PREZZO MENSILE: €${prezzoFinale}/mese

Ti contatteremo a breve per completare la pratica.

Cordiali saluti,
Il Team AutoRent
      `;

      // Email all'azienda
      const emailAzienda = `
NUOVA RICHIESTA DI NOLEGGIO - AutoRent

📋 DATI CLIENTE
Nome: ${formData.nome}
Cognome: ${formData.cognome}
Data di nascita: ${new Date(formData.dataNascita).toLocaleDateString('it-IT')}
Email: ${formData.email}
Sesso: ${formData.sesso || 'Non specificato'}

🚗 AUTO SELEZIONATA
Modello: ${selectedCar.nome}
Prezzo base: €${selectedCar.prezzoBase}/mese
Cavalli: ${selectedCar.cavalli} CV
Anno: ${selectedCar.anno}
Kilometri: ${selectedCar.kilometri.toLocaleString()} km
Rapporto peso/potenza: ${selectedCar.pesoPotenza} kg/CV

⚙️ CONFIGURAZIONE SCELTA
Parcheggio: ${config.parcheggio === 'garage' ? 'In Garage (-5%)' : 'All\'aperto (+10%)'}
Km annui: ${config.km_annui <= 10000 ? 'Fino a 10.000 km (-10%)' : config.km_annui <= 20000 ? '10.000-20.000 km (base)' : config.km_annui <= 30000 ? '20.000-30.000 km (+15%)' : 'Oltre 30.000 km (+30%)'}
Neopatentato: ${config.neopatentato ? 'Sì (+25%)' : 'No'}
Uso lavoro: ${config.uso_lavoro ? 'Sì (+15%)' : 'No'}
Colore: ${config.colore}${!['bianco', 'grigio'].includes(config.colore) ? ' (+5%)' : ''}

💰 PREZZO FINALE: €${prezzoFinale}/mese

📅 Data richiesta: ${orderData.dataOrdine}
      `;

      // Simula invio email (in produzione useresti un servizio come EmailJS o un backend)
      console.log('Email al cliente:', emailCliente);
      console.log('Email all\'azienda:', emailAzienda);

      // Qui dovresti integrare un servizio di invio email reale
      // Per esempio con EmailJS:
      // await emailjs.send('service_id', 'template_id', {...})

      // Simula un delay per l'invio
      await new Promise(resolve => setTimeout(resolve, 2000));

      setOrderComplete(true);
      
    } catch (error) {
      console.error('Errore nell\'invio:', error);
      alert('Si è verificato un errore. Riprova più tardi.');
    } finally {
      setSending(false);
    }
  };

  const resetAll = () => {
    setSelectedCar(null);
    setConfig({
      parcheggio: '',
      km_annui: '',
      neopatentato: false,
      uso_lavoro: false,
      colore: ''
    });
    setFormData({
      nome: '',
      cognome: '',
      dataNascita: '',
      email: '',
      sesso: ''
    });
    setShowCheckout(false);
    setOrderComplete(false);
  };

  // Immagine della Fiat Panda reale
  const fiatPandaImage = "data:image/jpeg;base64,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";

  const autoDisponibili = [
    {
      id: 1,
      nome: "Fiat Panda",
      immagine: fiatPandaImage,
      prezzoBase: 199,
      cavalli: 69,
      anno: 2023,
      kilometri: 15000,
      pesoPotenza: 15.9,
      descrizione: "Compatta e agile, perfetta per la città"
    },
    {
      id: 2,
      nome: "Renault Clio",
      immagine: "https://images.unsplash.com/photo-1583267746897-96534be78e48?w=800&q=80",
      prezzoBase: 229,
      cavalli: 90,
      anno: 2023,
      kilometri: 12000,
      pesoPotenza: 12.8,
      descrizione: "Moderna ed elegante, comfort garantito"
    },
    {
      id: 3,
      nome: "Volkswagen Polo",
      immagine: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&q=80",
      prezzoBase: 249,
      cavalli: 95,
      anno: 2024,
      kilometri: 8000,
      pesoPotenza: 12.1,
      descrizione: "Affidabile e spaziosa, qualità tedesca"
    },
    {
      id: 4,
      nome: "Toyota Yaris",
      immagine: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80",
      prezzoBase: 239,
      cavalli: 92,
      anno: 2023,
      kilometri: 10000,
      pesoPotenza: 12.5,
      descrizione: "Ibrida ed economica, basse emissioni"
    },
    {
      id: 5,
      nome: "Ford Fiesta",
      immagine: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80",
      prezzoBase: 219,
      cavalli: 85,
      anno: 2023,
      kilometri: 14000,
      pesoPotenza: 13.5,
      descrizione: "Dinamica e divertente, ottima guidabilità"
    },
    {
      id: 6,
      nome: "Peugeot 208",
      immagine: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80",
      prezzoBase: 234,
      cavalli: 100,
      anno: 2024,
      kilometri: 6000,
      pesoPotenza: 11.5,
      descrizione: "Design francese, tecnologia avanzata"
    }
  ];

  const calcolaPrezzo = () => {
    if (!selectedCar) return 0;
    
    let prezzo = selectedCar.prezzoBase;
    
    // Parcheggio: garage -5%, all'aperto +10%
    if (config.parcheggio === 'garage') {
      prezzo *= 0.95;
    } else if (config.parcheggio === 'aperto') {
      prezzo *= 1.10;
    }
    
    // Kilometri annui
    const km = parseInt(config.km_annui);
    if (km <= 10000) {
      prezzo *= 0.90;
    } else if (km <= 20000) {
      prezzo *= 1.00;
    } else if (km <= 30000) {
      prezzo *= 1.15;
    } else {
      prezzo *= 1.30;
    }
    
    // Neopatentato: +25%
    if (config.neopatentato) {
      prezzo *= 1.25;
    }
    
    // Uso lavoro: +15%
    if (config.uso_lavoro) {
      prezzo *= 1.15;
    }
    
    // Colore: bianco/grigio standard, altri colori +5%
    if (config.colore && !['bianco', 'grigio'].includes(config.colore)) {
      prezzo *= 1.05;
    }
    
    return Math.round(prezzo);
  };

  const prezzoFinale = calcolaPrezzo();
  const configCompleta = selectedCar && config.parcheggio && config.km_annui && config.colore;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-indigo-500/20">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="relative max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center transform rotate-12">
                <Car className="w-7 h-7 text-white -rotate-12" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                  AutoRent<span className="text-indigo-400">.</span>
                </h1>
                <p className="text-sm text-indigo-300 font-light">Il tuo noleggio su misura</p>
              </div>
            </div>
            <div className="hidden md:flex gap-6 text-sm">
              <a href="#catalogo" className="text-indigo-200 hover:text-white transition-colors">Catalogo</a>
              <a href="#configuratore" className="text-indigo-200 hover:text-white transition-colors">Configura</a>
              <a href="#contatti" className="text-indigo-200 hover:text-white transition-colors">Contatti</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Noleggia la tua<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              auto perfetta
            </span>
          </h2>
          <p className="text-xl text-indigo-200 mb-12 max-w-2xl mx-auto font-light">
            Scegli tra le migliori utilitarie, configura il noleggio secondo le tue esigenze e parti subito
          </p>
          <a 
            href="#catalogo" 
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all transform hover:scale-105 shadow-2xl shadow-indigo-500/50"
          >
            Scopri le auto disponibili
          </a>
        </div>
      </section>

      {/* Catalogo Auto */}
      <section id="catalogo" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-black text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Auto disponibili
            </h3>
            <p className="text-indigo-300 text-lg">Seleziona il veicolo che preferisci</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {autoDisponibili.map((auto, idx) => (
              <div
                key={auto.id}
                onClick={() => {
                  setSelectedCar(auto);
                  setTimeout(() => {
                    document.getElementById('configuratore')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className={`group relative bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                  selectedCar?.id === auto.id 
                    ? 'border-indigo-500 shadow-2xl shadow-indigo-500/50' 
                    : 'border-slate-700/50 hover:border-indigo-400/50'
                }`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
                }}
              >
                {selectedCar?.id === auto.id && (
                  <div className="absolute top-4 right-4 z-10 bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Selezionata ✓
                  </div>
                )}
                
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img 
                    src={auto.immagine} 
                    alt={auto.nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <h4 className="text-2xl font-bold text-white mb-2">{auto.nome}</h4>
                  <p className="text-indigo-300 text-sm mb-4">{auto.descrizione}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-indigo-400 text-xs font-semibold mb-1">Cavalli</div>
                      <div className="text-white text-lg font-bold">{auto.cavalli} CV</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-indigo-400 text-xs font-semibold mb-1">Anno</div>
                      <div className="text-white text-lg font-bold">{auto.anno}</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-indigo-400 text-xs font-semibold mb-1">Km</div>
                      <div className="text-white text-lg font-bold">{auto.kilometri.toLocaleString()}</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-indigo-400 text-xs font-semibold mb-1">Peso/Potenza</div>
                      <div className="text-white text-lg font-bold">{auto.pesoPotenza} kg/CV</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <div>
                      <div className="text-indigo-400 text-xs font-semibold mb-1">Da</div>
                      <div className="text-white text-3xl font-black">€{auto.prezzoBase}</div>
                      <div className="text-indigo-300 text-xs">/mese</div>
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-full font-semibold transition-colors">
                      Configura
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Configuratore */}
      {selectedCar && (
        <section id="configuratore" className="py-20 px-6 bg-slate-900/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-5xl font-black text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Configura il tuo noleggio
              </h3>
              <p className="text-indigo-300 text-lg">
                Hai scelto: <span className="text-white font-bold">{selectedCar.nome}</span>
              </p>
            </div>

            <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-8 border border-indigo-500/20 shadow-2xl">
              <div className="space-y-6">
                {/* Parcheggio */}
                <div className="group">
                  <label className="flex items-center gap-2 text-white font-bold text-lg mb-3">
                    <MapPin className="w-5 h-5 text-indigo-400" />
                    Dove parcheggi l'auto?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setConfig({...config, parcheggio: 'garage'})}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        config.parcheggio === 'garage'
                          ? 'border-indigo-500 bg-indigo-500/20'
                          : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                      }`}
                    >
                      <div className="text-white font-semibold mb-1">🏠 In Garage</div>
                      <div className="text-green-400 text-sm font-semibold">-5% sul prezzo</div>
                    </button>
                    <button
                      onClick={() => setConfig({...config, parcheggio: 'aperto'})}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        config.parcheggio === 'aperto'
                          ? 'border-indigo-500 bg-indigo-500/20'
                          : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                      }`}
                    >
                      <div className="text-white font-semibold mb-1">🌳 All'aperto</div>
                      <div className="text-orange-400 text-sm font-semibold">+10% sul prezzo</div>
                    </button>
                  </div>
                </div>

                {/* Kilometri annui */}
                <div>
                  <label className="flex items-center gap-2 text-white font-bold text-lg mb-3">
                    <Calendar className="w-5 h-5 text-indigo-400" />
                    Quanti km fai all'anno?
                  </label>
                  <select
                    value={config.km_annui}
                    onChange={(e) => setConfig({...config, km_annui: e.target.value})}
                    className="w-full bg-slate-800 border-2 border-slate-600 text-white rounded-xl p-4 focus:border-indigo-500 focus:outline-none transition-colors"
                  >
                    <option value="">Seleziona i kilometri</option>
                    <option value="5000">Fino a 10.000 km (-10%)</option>
                    <option value="15000">10.000 - 20.000 km (prezzo base)</option>
                    <option value="25000">20.000 - 30.000 km (+15%)</option>
                    <option value="35000">Oltre 30.000 km (+30%)</option>
                  </select>
                </div>

                {/* Neopatentato */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer bg-slate-800/50 p-4 rounded-xl border-2 border-slate-600 hover:border-slate-500 transition-colors">
                    <input
                      type="checkbox"
                      checked={config.neopatentato}
                      onChange={(e) => setConfig({...config, neopatentato: e.target.checked})}
                      className="w-5 h-5 rounded accent-indigo-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-white font-bold text-lg">
                        <Shield className="w-5 h-5 text-indigo-400" />
                        Sei neopatentato?
                      </div>
                      {config.neopatentato && (
                        <div className="text-orange-400 text-sm font-semibold mt-1">+25% sul prezzo</div>
                      )}
                    </div>
                  </label>
                </div>

                {/* Uso lavoro */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer bg-slate-800/50 p-4 rounded-xl border-2 border-slate-600 hover:border-slate-500 transition-colors">
                    <input
                      type="checkbox"
                      checked={config.uso_lavoro}
                      onChange={(e) => setConfig({...config, uso_lavoro: e.target.checked})}
                      className="w-5 h-5 rounded accent-indigo-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-white font-bold text-lg">
                        <Briefcase className="w-5 h-5 text-indigo-400" />
                        Usi l'auto per lavoro?
                      </div>
                      {config.uso_lavoro && (
                        <div className="text-orange-400 text-sm font-semibold mt-1">+15% sul prezzo</div>
                      )}
                    </div>
                  </label>
                </div>

                {/* Colore */}
                <div>
                  <label className="flex items-center gap-2 text-white font-bold text-lg mb-3">
                    <Palette className="w-5 h-5 text-indigo-400" />
                    Scegli il colore
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['bianco', 'grigio', 'nero', 'blu', 'rosso', 'verde'].map(colore => (
                      <button
                        key={colore}
                        onClick={() => setConfig({...config, colore})}
                        className={`p-3 rounded-xl border-2 transition-all capitalize ${
                          config.colore === colore
                            ? 'border-indigo-500 bg-indigo-500/20'
                            : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded-full border-2 border-white/30"
                            style={{
                              backgroundColor: 
                                colore === 'bianco' ? '#f8fafc' :
                                colore === 'grigio' ? '#6b7280' :
                                colore === 'nero' ? '#1e293b' :
                                colore === 'blu' ? '#3b82f6' :
                                colore === 'rosso' ? '#ef4444' :
                                '#22c55e'
                            }}
                          />
                          <span className="text-white text-sm font-semibold">{colore}</span>
                        </div>
                        {!['bianco', 'grigio'].includes(colore) && config.colore === colore && (
                          <div className="text-orange-400 text-xs font-semibold mt-1">+5%</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prezzo Finale */}
              {configCompleta && (
                <div className="mt-8 pt-8 border-t border-slate-700">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center">
                    <div className="text-indigo-200 text-sm font-semibold mb-2">Prezzo mensile totale</div>
                    <div className="text-white text-6xl font-black mb-4">
                      €{prezzoFinale}
                      <span className="text-2xl font-normal text-indigo-200">/mese</span>
                    </div>
                    <button 
                      onClick={() => setShowCheckout(true)}
                      className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors transform hover:scale-105 shadow-2xl"
                    >
                      Procedi con il noleggio
                    </button>
                    <p className="text-indigo-200 text-sm mt-4">
                      {selectedCar.nome} • {config.km_annui <= 10000 ? 'Fino a 10k km' : config.km_annui <= 20000 ? '10-20k km' : config.km_annui <= 30000 ? '20-30k km' : 'Oltre 30k km'} • {config.colore}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Banner Cookie */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-indigo-500/20 p-6 z-50 animate-slideUp">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Utilizzo dei Cookie</h3>
                <p className="text-indigo-200 text-sm">
                  Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. 
                  Continuando la navigazione accetti la nostra politica sui cookie.
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={handleRejectCookies}
                className="px-6 py-3 bg-slate-700 text-white rounded-full font-semibold hover:bg-slate-600 transition-colors"
              >
                Rifiuta
              </button>
              <button
                onClick={handleAcceptCookies}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:from-indigo-500 hover:to-purple-500 transition-colors"
              >
                Accetta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Checkout */}
      {showCheckout && !orderComplete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl max-w-2xl w-full p-8 border border-indigo-500/20 relative my-8">
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Completa il tuo ordine
              </h2>
              <p className="text-indigo-300">Inserisci i tuoi dati per confermare il noleggio</p>
            </div>

            {/* Riepilogo */}
            <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-700">
              <h3 className="text-white font-bold text-lg mb-4">Riepilogo ordine</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-indigo-300">Auto:</span>
                  <span className="text-white font-semibold">{selectedCar.nome}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-300">Configurazione:</span>
                  <span className="text-white">{config.colore} • {config.km_annui <= 10000 ? '<10k km' : config.km_annui <= 20000 ? '10-20k km' : config.km_annui <= 30000 ? '20-30k km' : '>30k km'}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-slate-700">
                  <span className="text-white font-bold">Totale mensile:</span>
                  <span className="text-2xl font-black text-indigo-400">€{prezzoFinale}</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Nome <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full bg-slate-800 border-2 border-slate-600 text-white rounded-xl p-3 focus:border-indigo-500 focus:outline-none transition-colors"
                    placeholder="Mario"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Cognome <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cognome}
                    onChange={(e) => setFormData({...formData, cognome: e.target.value})}
                    className="w-full bg-slate-800 border-2 border-slate-600 text-white rounded-xl p-3 focus:border-indigo-500 focus:outline-none transition-colors"
                    placeholder="Rossi"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Data di nascita <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.dataNascita}
                  onChange={(e) => setFormData({...formData, dataNascita: e.target.value})}
                  className="w-full bg-slate-800 border-2 border-slate-600 text-white rounded-xl p-3 focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-800 border-2 border-slate-600 text-white rounded-xl p-3 focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="mario.rossi@email.com"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Sesso (opzionale)
                </label>
                <select
                  value={formData.sesso}
                  onChange={(e) => setFormData({...formData, sesso: e.target.value})}
                  className="w-full bg-slate-800 border-2 border-slate-600 text-white rounded-xl p-3 focus:border-indigo-500 focus:outline-none transition-colors"
                >
                  <option value="">Preferisco non specificare</option>
                  <option value="M">Maschio</option>
                  <option value="F">Femmina</option>
                  <option value="Altro">Altro</option>
                </select>
              </div>

              <div className="pt-6 border-t border-slate-700">
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-full font-bold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {sending ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Invio in corso...
                    </span>
                  ) : (
                    'Conferma e Invia'
                  )}
                </button>
                <p className="text-indigo-300 text-sm text-center mt-4">
                  Riceverai una email di conferma all'indirizzo fornito
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pagina di Ringraziamento */}
      {orderComplete && (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
              {/* Effetti di sfondo */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              <div className="relative bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-12 border border-indigo-500/20 text-center">
                {/* Icona di successo animata */}
                <div className="mb-8 flex justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-scaleIn shadow-2xl shadow-green-500/50">
                      <Check className="w-16 h-16 text-white animate-checkmark" />
                    </div>
                    <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20" />
                  </div>
                </div>
                
                {/* Titolo principale */}
                <h2 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight animate-fadeInUp" style={{ fontFamily: 'Georgia, serif', animationDelay: '0.2s' }}>
                  Grazie!
                </h2>
                
                <p className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 font-bold mb-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                  {formData.nome} {formData.cognome}
                </p>

                {/* Messaggio principale */}
                <div className="max-w-2xl mx-auto mb-10 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                  <p className="text-xl text-indigo-200 mb-4 leading-relaxed">
                    Grazie per aver scelto <span className="text-white font-bold">AutoRent</span> per il noleggio della tua auto!
                  </p>
                  <p className="text-lg text-indigo-300">
                    La tua richiesta è stata ricevuta con successo e il nostro team la prenderà in carico al più presto.
                  </p>
                </div>

                {/* Card riepilogo ordine */}
                <div className="max-w-2xl mx-auto mb-10 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                  <div className="bg-slate-900/50 rounded-2xl p-8 border border-indigo-500/30">
                    <h3 className="text-white font-bold text-2xl mb-6 flex items-center justify-center gap-2">
                      <Car className="w-6 h-6 text-indigo-400" />
                      Riepilogo della tua scelta
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6 text-left">
                      <div className="space-y-3">
                        <div>
                          <div className="text-indigo-400 text-sm font-semibold mb-1">Auto selezionata</div>
                          <div className="text-white text-lg font-bold">{selectedCar.nome}</div>
                        </div>
                        <div>
                          <div className="text-indigo-400 text-sm font-semibold mb-1">Colore</div>
                          <div className="text-white capitalize">{config.colore}</div>
                        </div>
                        <div>
                          <div className="text-indigo-400 text-sm font-semibold mb-1">Parcheggio</div>
                          <div className="text-white">{config.parcheggio === 'garage' ? 'In Garage' : 'All\'aperto'}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="text-indigo-400 text-sm font-semibold mb-1">Km annui</div>
                          <div className="text-white">
                            {config.km_annui <= 10000 ? 'Fino a 10.000 km' : 
                             config.km_annui <= 20000 ? '10.000-20.000 km' : 
                             config.km_annui <= 30000 ? '20.000-30.000 km' : 
                             'Oltre 30.000 km'}
                          </div>
                        </div>
                        <div>
                          <div className="text-indigo-400 text-sm font-semibold mb-1">Neopatentato</div>
                          <div className="text-white">{config.neopatentato ? 'Sì' : 'No'}</div>
                        </div>
                        <div>
                          <div className="text-indigo-400 text-sm font-semibold mb-1">Uso lavoro</div>
                          <div className="text-white">{config.uso_lavoro ? 'Sì' : 'No'}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-indigo-500/30">
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-indigo-300 text-lg">Canone mensile:</span>
                        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                          €{prezzoFinale}
                        </span>
                        <span className="text-indigo-300 text-lg">/mese</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card email */}
                <div className="max-w-2xl mx-auto mb-10 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                  <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-2xl p-6 border border-indigo-500/30">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <Mail className="w-6 h-6 text-indigo-400" />
                      <span className="text-white font-bold text-lg">Email di conferma inviata</span>
                    </div>
                    <p className="text-indigo-200 text-lg mb-2">{formData.email}</p>
                    <p className="text-indigo-300 text-sm">
                      Controlla la tua casella di posta per tutti i dettagli
                    </p>
                  </div>
                </div>

                {/* Prossimi passi */}
                <div className="max-w-2xl mx-auto mb-10 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
                  <h4 className="text-white font-bold text-xl mb-4">📋 Prossimi passi</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                      <div className="text-indigo-400 font-bold mb-2">1. Verifica email</div>
                      <div className="text-indigo-300">Controlla la conferma nella tua casella</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                      <div className="text-indigo-400 font-bold mb-2">2. Ti contattiamo</div>
                      <div className="text-indigo-300">Riceverai una chiamata entro 24h</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                      <div className="text-indigo-400 font-bold mb-2">3. Ritiro auto</div>
                      <div className="text-indigo-300">Organizziamo la consegna</div>
                    </div>
                  </div>
                </div>

                {/* Messaggio finale */}
                <div className="mb-10 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
                  <p className="text-indigo-300 text-lg italic">
                    "Siamo entusiasti di accompagnarti in questa nuova avventura su strada!"
                  </p>
                </div>

                {/* Pulsanti azione */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{ animationDelay: '0.9s' }}>
                  <button
                    onClick={resetAll}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all transform hover:scale-105 shadow-2xl shadow-indigo-500/50"
                  >
                    Torna alla Home
                  </button>
                  <button
                    onClick={() => window.location.href = 'mailto:info@autorent.com'}
                    className="bg-slate-700 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-600 transition-all transform hover:scale-105"
                  >
                    Contattaci
                  </button>
                </div>

                {/* Decorazione finale */}
                <div className="mt-12 pt-8 border-t border-slate-700 animate-fadeInUp" style={{ animationDelay: '1s' }}>
                  <p className="text-slate-500 text-sm">
                    AutoRent - Il tuo noleggio su misura
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              AutoRent<span className="text-indigo-400">.</span>
            </h3>
            <p className="text-indigo-300">Il tuo partner per il noleggio auto</p>
          </div>
          <div className="text-slate-500 text-sm">
            © 2026 AutoRent. Tutti i diritti riservati.
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes checkmark {
          0% {
            transform: scale(0) rotate(-45deg);
          }
          50% {
            transform: scale(1.2) rotate(-45deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-checkmark {
          animation: checkmark 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
}