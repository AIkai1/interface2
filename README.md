# Internet Meme Archive Browser

Een interactieve webinterface voor het ontdekken, filteren en bekijken van klassieke internetmemes.

## Features

- **Asynchroon data ophalen**: Gebruikt `fetch()` met `async/await` om JSON-data te laden
- **Real-time filtering**: Filter memes op jaartal en categorie zonder pagina te herladen
- **Loading state**: Toont een loading indicator tijdens het laden van data
- **Error handling**: Robuuste foutafhandeling met try/catch
- **ES6+ Modules**: Modulaire code structuur met import/export
- **Responsive design**: Werkt op desktop, tablet en mobile

## Technische Implementatie

### Module Structuur

1. **dataService.js** - Data management
   - `fetchMemes()`: Haalt meme data op via fetch API
   - `filterMemes()`: Filtert memes op jaar en categorie
   - `getCategories()`: Retourneert unieke categorieën

2. **uiRenderer.js** - UI rendering
   - `renderMemes()`: Rendert meme kaarten dynamisch
   - `renderFilters()`: Creëert filter controls
   - `showLoading()` / `hideLoading()`: Loading state management
   - `showError()`: Error message display

3. **main.js** - Application orchestration
   - Initialiseert de applicatie
   - Koppelt event listeners aan filters
   - Coördineert tussen dataService en uiRenderer

### Gebruikte ES6+ Features

- Arrow functions
- Template literals
- Async/await
- Import/export modules
- Destructuring
- Spread operator
- const/let
- Array methods (map, filter, reduce)

## Hoe te gebruiken

1. **Start een lokale server**:
   ```bash
   cd aangeleverd
   python3 -m http.server 8000
   ```

2. **Open in browser**:
   ```
   http://localhost:8000
   ```

3. **Filter memes**:
   - Selecteer een jaartalbereik (2007-2010, 2011-2015, 2016-2020, of All Years)
   - Selecteer een categorie (animal, animation, concept, humor, music, reaction, relationship, of All Categories)
   - De interface update automatisch zonder pagina refresh

## Project Structuur

```
aangeleverd/
├── index.html              # Hoofdpagina
├── style/
│   └── style.css          # Clean, professionele styling
├── scripts/
│   ├── main.js            # App orchestration
│   ├── dataService.js     # Data fetching & filtering
│   └── uiRenderer.js      # UI rendering
├── data/
│   └── data.json          # Meme dataset
└── img/                   # Meme afbeeldingen
```

## Meme Dataset

De applicatie bevat 10 iconische internetmemes:
- Doge (2013)
- Distracted Boyfriend (2017)
- Nyan Cat (2011)
- Pepe the Frog (2008)
- Rickroll (2007)
- Success Kid (2009)
- Bad Luck Brian (2012)
- Woman Yelling at Cat (2019)
- Grumpy Cat (2012)
- Galaxy Brain (2017)

## Design Principes

- **Clean & Professional**: Geen flashy gradients of neon borders
- **Minimalistisch**: Focus op content en functionaliteit
- **Toegankelijk**: Duidelijke labels, goede contrast ratios
- **Responsive**: Mobile-first approach met flexbox en CSS grid
- **Performance**: Efficient DOM updates, geen onnodige re-renders

