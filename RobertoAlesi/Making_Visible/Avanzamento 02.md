# Connect the dots/ Machine Storming
## Machine learning come acceleratore di idee

La creatività è una delle doti peculiari dell'Homo sapiens, qualcosa che ci definisce come specie; la capacità, a lungo ritenuta unica, di realizzare opere d'arte o trovare soluzioni innovative ai problemi e agli stimoli del mondo.

Tuttavia, negli ultimi anni, nuovi algoritmi e modelli di linguaggio, si sono dimostrati in grado di svolgere in maniera impeccabile una serie di compiti “creativi”, rendendo impercettibile il confine tra umano e macchina.
L’empatia rimane una variabile tipicamente e profondamente umana, un pezzo indispensabile di creatività che la rende rilevante indipendentemente dall’artefatto finale.

Proprio per questo motivo alcuni sostengono che alla base dell’operato delle macchine ci sarà sempre la creatività dell’uomo, ma ci è stato insegnato che anch’essa può essere sviluppata e allenata nel tempo grazie al pensiero laterale.

Creare uno luogo di incontro virtuale nel quale una o più persone possano avviare processi di coprogettazione insieme a piccole macchine, che vagano nello spazio e cercano collegamenti tra gli elementi, per innescare nuovi ragionamenti e nuove idee.

1. Si potrebbe lavorare sulla fase di brainstorming, fondamentale per la creatività, che cosituisce la fase cruciale del processo di progettazione/ creazione. L'utilizzo del machine learning in questa fase potrebbe alimentare ed accrescere la creatività umana. Quando si deve fare brainstorming di gruppo c’è sempre l’imbarazzo del primo postit, la macchina potrebbe, in base al tema cardine del brainstorming, dare un input testuale o visivo per invogliare l’inizio. Successivamente, nel corso del brainstorming, la macchina crea collegamenti tra i punti emersi e genera reference visive di forme e colori, disegnando e scrivendo le associazioni.

2. L'algoritmo potrebbe favorire il processo creativo plasmando l'ambiente di lavoro circostante (un'ambiente 3d, uno spazio bidimensionale, un ibrido) sulla base degli input che vengono riconosciuti, dai dialoghi e dal contenuto dello spazio. La macchina potrebbe analizzare l'ambiente circostante ai due utenti connessi, le conversazioni e il tipo di esperienza che deve scaturire da quello spazio.


## Cosa succederebbe se...?
Cosa succederebbe se la macchina o le piccole macchine riuscissero ad innescare ragionamenti e intuizioni che altrimenti non sarebbero potute esistere?
La macchina creativa potrebbe essere uno strumento che potenzia le capacità e le visioni di un team di lavoro in fase di ideazione.

Cosa succederebbe se grazie al Machine Learning venissero creati dei collegamenti tra le parole di un brainstorming in uno spazio tridimensionale?
La macchina potrebbe creare associazioni tra le parole inserite da due o piu persone in uno spazio. Le parole si potrebbero disporre per colore, in base al tipo di collegamento, per posizione in base all'area tematica di quella parola, in altezza, in base al numero di associazioni.

## Tecnologie/ Dati
### Connettere le persone
Sarà necessario creare un ServerClient per connettere due o piu persone in un unico spazio.

12.1: Introduction to Node - WebSockets https://www.youtube.com/watch?v=bjULmG8fqc8

14.3: Connecting Client to Server with Socket.io WebSockets https://www.youtube.com/watch?v=HZWmrt3Jy10

16.12.4: Shared Drawing Canvas - WebSockets and p5.js: https://www.youtube.com/watch?v=i6eP1Lw4gZk

Socket.io 4.0: https://socket.io/ 

WSClient.js: https://editor.p5js.org/tigoe/sketches/rJDfv8N0 

### Fase1. Riconoscimento parole/ raccolta dati
Le macchine raccoglieranno i dati relativi agli elementi presenti nello spazio, parole e forme disegnate, in modo da poterli usare per individuare collegamenti o riferimenti visivi:

CharRNN: https://learn.ml5js.org/#/reference/charrnn

Image Classifier: https://learn.ml5js.org/#/reference/image-classifier

### Fase2. Interpretazione dei dati 
Le macchine dopo aver raccolto e classificato i dati, cerca collegamenti e associazioni visive che possano stimolare la creatività degli utenti:

Quick Draw: https://quickdraw.withgoogle.com/

Sketch RNN: https://learn.ml5js.org/#/reference/sketchrnn

Word2Vec: https://learn.ml5js.org/#/reference/word2vec

### Fase3. Visualizzazione dei dati
Three.js
WebGL


