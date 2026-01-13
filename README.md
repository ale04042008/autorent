# AutoRent - Sito Noleggio Auto

Sito web per il noleggio di auto utilitarie con configuratore dinamico e sistema di prenotazione.

## 🚀 Deploy su GitHub Pages

### Passo 1: Crea un repository su GitHub
1. Vai su [GitHub](https://github.com)
2. Clicca su "New repository"
3. Dai un nome al repository (es: `autorent`)
4. Lascia il repository pubblico
5. NON inizializzare con README, .gitignore o license
6. Clicca "Create repository"

### Passo 2: Carica i file
Ci sono due modi per caricare i file:

#### Metodo A: Via interfaccia web GitHub
1. Nel tuo repository appena creato, clicca su "uploading an existing file"
2. Trascina tutti i file (`index.html`, `app.jsx`, `README.md`)
3. Clicca "Commit changes"

#### Metodo B: Via Git (se hai Git installato)
```bash
git init
git add .
git commit -m "Initial commit - AutoRent website"
git branch -M main
git remote add origin https://github.com/TUO_USERNAME/TUO_REPOSITORY.git
git push -u origin main
```

### Passo 3: Attiva GitHub Pages
1. Nel tuo repository, vai su "Settings"
2. Nel menu laterale, clicca su "Pages"
3. Sotto "Source", seleziona "main" branch
4. Clicca "Save"
5. Aspetta qualche minuto

### Passo 4: Visita il tuo sito
Il tuo sito sarà disponibile all'indirizzo:
```
https://TUO_USERNAME.github.io/TUO_REPOSITORY/
```

## 📁 Struttura del progetto

```
autorent/
├── index.html          # Pagina HTML principale
├── app.jsx            # Componente React con tutta la logica
└── README.md          # Questo file
```

## ✨ Funzionalità

- 🚗 Catalogo auto con foto reali
- ⚙️ Configuratore interattivo
- 💰 Calcolo dinamico del prezzo
- 📋 Form di prenotazione
- 📧 Sistema email (simulato)
- 🍪 Banner cookie
- ✅ Pagina di ringraziamento

## 🛠️ Tecnologie utilizzate

- React 18
- Tailwind CSS
- Lucide Icons
- Vanilla JavaScript (ES6+)

## 📝 Note

- Le email sono attualmente simulate nel console.log
- Per implementare l'invio reale, integrare un servizio come EmailJS o un backend
- Il sito è completamente responsive e ottimizzato per mobile

## 📧 Contatti

Per supporto o domande: abozza59@gmail.com

---

Creato con ❤️ per AutoRent
