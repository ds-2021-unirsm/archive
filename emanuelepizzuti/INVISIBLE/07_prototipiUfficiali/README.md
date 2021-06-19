# 📰  BROKEN NEWS! 📰

![Screenshot 2021-06-19 at 13 08 34](https://user-images.githubusercontent.com/76455312/122640375-7d28dd00-d0ff-11eb-8fcf-b5ad27ec2392.png)

La percezione di ciò che accade intorno a noi è fortemente influenzata da ciò che leggiamo o vediamo. Nei social media
di oggi però, dove il giornalismo si fa sempre più politico ed emozionale, siamo sommersi da fatti e informazioni raccontati in modo da catturare la nostra attenzione, colpire le nostre credenze ed emozioni, portando così la reale notizia in secondo piano.

BROKEN NEWS! è un applicativo che imita la manipolazione di una notizia, modificandone il testo e analizzando allo stesso tempo il modo in cui viene percepita. L’obiettivo è quello di mostrare come diverse modalità di racconto possano incidere sulla percezione delle cose.

---

## 🗝  Keywords 🗝

percezione, informazione, distorsione, giornalismo, social media

---
## 🧑‍💻 Prototipi 🧑‍💻
I prototipi sviluppati permettono all’utente di cercare e visualizzare, inserendo una keyword
nella barra di ricerca, una delle ultime notizie pubblicate dal New York Times. Per fare ciò sono
state utilizzate le APIs fornite dalla suddetta testata giornalistica, che possono essere interrogate piuttosto facilmente e che permettono quindi di ottenere come risultato un array contenente le ultime dieci notizie apparse sul sito e relative al termine inserito in partenza. Nei prototipi ho scelto di visualizzarne una, scelta in modo casuale dall’array. Insieme all’articolo, la keyword viene utilizzata anche per cercare e stampare un’immagine dal sito UNSPLASH.

Ho scelto di impaginare l’output come se fosse 
un vero e proprio articolo di giornale, in modo da valoraizzare l’idea secondo cui i meccanismi di manipolazione dell’informazione siano ben nascosti in tutti i mezzi che utilizziamo oggi per informarci. A questo punto, tramite la Sentiment Analysis di DandelionAPI viene analizzato il titolo della notizia, così da simulare quelle che dovrebbero essere la percezione e le emozioni scaturite nel lettore. I risultati possono essere tre: positivo, negativo, neutrale.
Il compito del primo prototipo è quello di modificare il contenuto del testo analizzato finché il risultato della Sentiment Analysis non corrisponda ad un valore “neutrale”. Questo avviene tramite l’utilizzo della libreria RiTa a cui, a intervalli di tempo prestabiliti, chiedo di cambiare una parola con
un nuovo termine in modo che questo sia simile a quelli di partenza secondo diversi parametri specificati: possono infatti essere parole in rima, che suonano o che si pronunciano allo stesso modo. 

### Prototipo 1

![1](https://user-images.githubusercontent.com/76455312/122645913-2a5e1e00-d11d-11eb-8e91-2f09ef07d7d4.gif)

### Prototipo 2

Il secondo prototipo è stato realizzato invece ragionando su quale potrebbe essere il ruolo dell’utente nella trasformazione della notizia.
Al contrario del precedente infatti, questo non è autonomo, ma permette all’utente di decidere quante parole cambiare nel testo, rendendolo
libero di decidere che “tipo” di notizia leggere.

![2](https://user-images.githubusercontent.com/76455312/122645931-38ac3a00-d11d-11eb-862b-c455850f2bd6.gif)

