✹ COSE NON A CASO ✹
---

**Hey hey, my my  
Rock and roll can never die  
There's more to the picture  
Than meets the eye.**  

-Neil Young, Hey hey, my my


# Cos'è  
"Cose non a caso" è un lavoro realizzato da Irene Carlino per il Laboratorio di Sistemi dell'interazione tenuto dal prof. Daniele Tabellini e Irene Trotta. Questo progetto tratta il tema della personalità ed è formato da un interfaccia grafica con la quale si interagisce e da un output cartaceo.

# Come funziona   
Il progetto combina il machine learning e una serie di domande poste all'utente per raccogliere i dati che serviranno a realizzare l'output visivo. La prima interazione richiesta all'utente è quella di scattare una o più foto [questa parte è da rivedere] della propria camera o semplicemente della scrivania, dopodiché, tramite machine learning, si passerà ad individuare e analizzare i vari oggetti che si trovano all'interno della foto. In base agli oggetti trovati verranno poste, tramite l'interfaccia, delle domande all'utente per capire in che percentuale quel determinato oggetto riesce a rappresentare il suo "io interiore". Ad esempio: se nella foto vengono individuati una moltitudine di libri ed una chitarra, verranno poste all'utente domande relative alla tipologia di libri che legge più frequentemente (se legge fantasy, gialli, fantascienza ecc) e al tipo di musica che ascolta o suona. In base ai dati raccolti verrà stampata una fotografia della personalità (principalmente degli interessi), e la rappresenta associando ad ogni categoria d'interesse un'immagine.

# Cosa significa  
Ispirato dal lavoro dello psicologo Sam Gosling *"Snoop: What Your Stuff Says about You"*, il mio progetto  affonda le sue radici nella psicologia degli oggetti e ha come obiettivo quello di rendere evidente come la personalità si rivela nei contesti del mondo reale, nel modo in cui le persone organizzano e realizzano gli ambienti in cui vivono in base alla loro personalità. Sam Gosling ha studiato come le persone proiettano (e proteggono) il proprio io interiore in qualsiasi cosa li circondi, quindi noi creiamo ambienti **fisici** che riflettono e rafforzano la nostra identità. "Cose non a caso" tramite l'analisi dei nostri ambienti vuole rendere visibile l'anima dei nostri oggetti, nonché un'immagine che mostra visivamente la nostra interiorità, dove passioni e interessi si trasformano in simboli e texture.


---
# Tecnologia
ImageClassifier [+](https://learn.ml5js.org/#/reference/image-classifier)  
Stampante termica  

![ML](https://user-images.githubusercontent.com/79697764/116565517-3e985280-a906-11eb-8e86-a49b4c892228.png)

## ImageClassifier_Video "LIMITI"

- gli oggetti vanno presi singolarmente 
- sfondo uniforme 
- l'output è instabile, cambia frequentemente 
- mettere gli oggetti molto vicini alla telecamera 


![differenze](https://user-images.githubusercontent.com/79697764/117319521-a8c37100-ae8b-11eb-8275-d76c97cfcd4e.JPG)


