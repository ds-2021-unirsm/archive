# Metamorfosi
![copertina](https://user-images.githubusercontent.com/76476647/122622344-a6625280-d098-11eb-87db-3be5dcdb1c4d.jpg)

L’incomprensione spesso deriva da fraintendimenti nella comunicazione verbale. Questo causa l’incapacità di capire le necessità e le esigenze di un’altra persona. Metamorfosi è un’applicazione che offre agli utenti con disabilità cognitive la possibilità di visualizzare in maniera simultanea e in realtà aumentata ciò che viene pronunciato attraverso testo e icone. Metamorfosi ha come obiettivo quello di coinvolgere questi individui nella società, creando opportunità di comunicazione.

---

# Keywords
#comunicare #parole #icone #emozioni #inclusione

---

# Prototipi 
La realizzazione dei prototipi mi ha permesso di valutare possibili tecnologie che mirano a tradurre il linguaggio verbale in testo e immagini visive.
In primo luogo, ho deciso di utilizzare la libreria p5.js per l’agevolazione e l’accessibilità del codice, e la sua estensione p5.speech per la registrazione e la trascrizione in testo di quello che viene pronunciato.
Nella prima fase è stato realizzato un algoritmo che utilizza l’API di Dandelion per la Sentiment Analysis e la Entity Extraction, e che interroga Unsplash o GIPHY per la richiesta di immagini o GIF animate associate alle entità.
Successivamente è stata sostituita la sentiment analysis di Dandelion con l’algoritmo di ml5 Face-Api per il riconoscimento del volto (e quindi il posizionamento nello spazio delle immagini) e l’analisi delle emozioni (visibile tramite il colore del testo e gli istogrammi indicanti la percentuale dello stato d’animo analizzato), ed è stata aggiunta un’interfaccia GUI per la personalizzazione dei colori.
Infine, tramite node.js con il framework Express.js, è stato possibile fare richieste in locale in lingua inglese, per ricevere icone da Noun Project, in sostituzione delle immagini non facilmente accessibili per le persone con delle disabilità. Personalizzabili anche queste, tramite un’interfaccia GUI.

### 1° prototipo Unsplash :point_right: [+](https://editor.p5js.org/Lucilla/full/QW6jw8g4U) 
![Metamorfosi_prototipo1_Unsplash](https://user-images.githubusercontent.com/76476647/122623336-f262c680-d09b-11eb-8632-ee8f9d0bc26f.jpg)
![Metamorfosi_prototipo1_Unsplash](https://user-images.githubusercontent.com/76476647/122623144-44efb300-d09b-11eb-96e5-bed7b6831948.gif)

### 1° prototipo GIPHY :point_right:

### 2° prototipo :point_right: [+](https://editor.p5js.org/Lucilla/full/GesR6MZmV)
![Metamorfosi_prototipo2_Unsplash](https://user-images.githubusercontent.com/76476647/122635382-e7cc1f80-d0e3-11eb-99a1-c79f10f40529.jpg)
![Metamorfosi_prototipo2_Unsplash](https://user-images.githubusercontent.com/76476647/122644427-64c3bd00-d115-11eb-8fb8-4693e5108495.gif)

### 3° prototipo :point_right: da eseguire in locale
![Metamorfosi_prototipo2_NounProject](https://user-images.githubusercontent.com/76476647/122635368-c408d980-d0e3-11eb-82dc-d14d8abf64c5.jpg)
![Metamorfosi_prototipo2_NounProject](https://user-images.githubusercontent.com/76476647/122646079-bf611700-d11d-11eb-8d6f-e898241d3978.gif)

---

# Mockup

![Mockup](https://user-images.githubusercontent.com/76476647/122623748-9c8f1e00-d09d-11eb-959c-6ba48a3548d6.jpg)

🚧
