# Prime ipotesi
### TEMA 1
### _Le emozioni della città_
Questo tema vuole analizzare la città attraverso le emozioni che provano i suoi cittadini. 
Si tratta quindi di scoprire i diversi sentimenti che la popolano, in quali momenti della giornata si manifestano e in quali luoghi. 
Lo scopo è mostrare una città che vive e pulsa, grazie ai suoi abitanti. 

#### Reference
The City Lab (Domestic Data Streamers) 👉🏻 [+](https://domesticstreamers.com/project/the-city-lab/)

Maps of Babel (Giorgia Lupi) 👉🏻 [+](https://giorgialupi.wordpress.com/2012/05/12/maps-of-babel/)

The world pulse (Domestic Data Streamers) 👉🏻 [+](https://domesticstreamers.com/project/the-world-pulse/)

Melting pot porject (Tekja) 👉🏻 [+](https://tekja.com/portfolio/melting_pot_project/)

Collectiv-e-motion (Tekja) 👉🏻 [+](https://tekja.com/portfolio/barbican_collectiv-e-motion/)

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### TEMA 2
### _Rendere visibili le discriminazioni_
Il tema delle discriminazioni è molto vasto, ne esistono infatti innumerevoli tipologie, che spesso però risultano essere invisibili. 
La loro invisibilità si verifica sotto due aspetti. Il primo è dovuto al modo in cui vengono espresse. Spesso capita di leggerle oppure di sentirle, ma non sempre si riescono a vedere le conseguenze reali su chi le subisce. Il secondo aspetto si riferisce all’indifferenza che spesso gli viene rivolta. In alcuni casi, infatti, le discriminazioni non vengono riconosciute come tali, oppure non gli si dà l’importanza che meriterebbero per essere debellate. 
Esiste un modo per rendere le discriminazioni visibili a tutti? Si possono rendere visibili gli effetti che queste producono sulle persone?

#### Reference
You had to be feminist (Domestic Data Streamers) 👉🏻 [+](https://domesticstreamers.com/project/you-had-to-be-a-feminist/)

The privilege of choice (Domestic Data Streamers) 👉🏻 [+](https://domesticstreamers.com/project/the-privilege-of-choice/)

Wealth Inequality (Xushan Li - Density Design) 👉🏻 [+](https://infopoetry.densitydesign.org/infopoetries/wealth-inequality.html)


----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# IPOTESI PROGETTUALE
### Close reading, tecnologie e dati da utilizzare
------------------------------

### Che cos'è?
L'hate speech è un fenomeno altamente diffuso, soprattutto nel mondo online, dove è più semplice esprimersi senza filtri e senza paura di fare del male. 
Si tratta di espressioni violente o discriminatorie nei confronti di altre persone e, più nello specifico, stando a quanto detto dal 
Consiglio d'Europa nel 1997, ricadono nei discorsi d’odio quelle “espressioni che diffondono, incitano, promuovono o giustificano 
l’odio razziale, la xenofobia, l’antisemitismo o altre forme di minaccia basate sull’intolleranza – inclusa l’intolleranza espressa 
dal nazionalismo aggressivo e dall’etnocentrismo –, sulla discriminazione e sull’ostilità verso i minori, i migranti 
e le persone di origine straniera”.
Questo progetto vuole rendere visibile questo crescente fenomeno che dilaga sui social network, che denigra e ferisce sempre più 
persone. Si tratta di una rappresentazione spaziale delle parole discriminatorie, che vengono raccolte in tempo reale dai social 
network e rappresentate nello spazio come grandi macchie di petrolio, che soffocano e inquinano il mare.

------------------------------

### Come funziona?
Un algoritmo interroga Twitter in tempo reale attraverso le API, raccogliendo così gli ultimi tweet pubblicati contenenti parole discriminatorie. Le parole vengono analizzate e raggruppate in categorie, per poi essere rappresentate visivamente attraverso la metafora del petrolio. Le categorie discriminatorie sono delle grandi macchie olese, le quali a loro volta racchiudono gocce più o meno grandi. Queaste gocce rappresentano le singole parole raccolte dall'algoritmo e semanticamente coerenti con la categoria stessa. 
Ad esempio, viene rilevata la parola "frocio": questa goccia di petrolio andrà ad unirsi all'isola dell'omofobia. In seguito viene rilevata 
un'altra volta "frocio", questa goccia andrà ad unirsi a quella precedente, creando una goccia più grande all'interno della categoria. 
Perciò le dimensioni delle gocce variano a seconda della frequenza di rilevamento della stessa parola. 
Oltre alla visualizzazione grafica della rete di parole d'odio che si viene a creare su Twitter, il progetto prevede anche un'elaborazione dei tweet presi in considerazione dall'algoritmo precedente. Attraverso RiTa, una libreria javascript che propone strumenti per generare letteratura computazionale, le parole discriminatorie vengono sostituite con altre parole in rima, modificando o addirittura privando la frase del significato originale.  

------------------------------

### Cosa significa? 
Il petrolio rilasciato in mare si allarga rapidamente in un'ampia chiazza, disponendosi in strati di vario spessore che le correnti 
e i venti trasportano a grandi distanze. Le frazioni più volatili del petrolio evaporano nel giro di pochi giorni, perdendo in poche 
ore una notevole porzione della propria massa. Alcune componenti però penetrano negli strati superiori dell'acqua, dove producono 
effetti altamente nocivi sugli organismi marini. Le frazioni più pesanti vagano invece sulla superficie del mare, fino a formare 
grumi difficilmente degradabili, che affondano lentamente fino a raggiungere il fondo marino. I tempi richiesti dal processo di
degradazione variano a seconda delle condizioni del mare, dalle condizioni metereologiche, dalla temperatura e dal tipo di inquinante. 
La metafora del petrolio va a sottolineare come l'hate speech diventi un peso enorme per le persone o per i gruppi che lo subiscono.
Si allarga e si espande sulle debolezze e vulnerabilità, diventando nocivo per la salute mentale e fisica. 
Il progetto vuole evidenziare come la violenza e l'odio vengano amplificati dalle parole che usiamo e come sia importante misurare 
e pesare il modo di esprimersi nei confronti delle altre persone.

------------------------------

### Cosa succederebbe se? 
Uno sviluppo futuro del progetto potrebbe essere l'implementazione di un sistema che, dopo aver analizzato e mappato il contenuto dei tweet discriminatori, generi anche delle risposte ai tweet, contestandone il contenuto o ribattendo con risposte alternative, come ad esempio attraverso delle rime o utilizzando alcune delle parole del post in una modalità diversa, generando un significato opposto. 

------------------------------

![collage_Tavola disegno 1_Tavola disegno 1](https://user-images.githubusercontent.com/79698172/117275440-f2916480-ae55-11eb-9dd7-4f4dcd5c0bd0.jpg)

![Risorsa 1](https://user-images.githubusercontent.com/79698172/117277157-7f88ed80-ae57-11eb-9bd5-3d4a0a0d7450.png)

-------

### Casi studio
* Personal Knowledge Database - Santiago Ortiz [+](http://intuitionanalytics.com/other/knowledgeDatabase/)
![caso1](https://user-images.githubusercontent.com/79698172/117285530-06da5f00-ae60-11eb-8352-56bde203aab5.png)

* Love Will Conquer - Experiments with Google [+](https://experiments.withgoogle.com/love-will-conquer)
![caso2](https://user-images.githubusercontent.com/79698172/117286282-e52da780-ae60-11eb-8640-af4bb5b8be9c.png)

