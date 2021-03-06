## Cos'è?
Progetto che porta l'attenzione sui materiali che compongono gli abiti e sui loro possibili riscontri negativi sull'ambiente (e sulle persone ?). 

## Cosa significa?

**-"Scientists have been warning us
that we're wreaking havoc on our planet.
We're told about all of these problems,
and we're told how
it's going to impact us.
So now, what are we left to do?
Well, what if I told you
that we actually do hold the power?
And that power is what we wear every day.
It's our clothing.
Because what people haven't told you
is under the radar,
the apparel industry has actually become
the second most polluting
industry in the world.
So, I'd like to talk today
about how we got to this place
and how we can take back control
and use our power
to both answer the question,
"What am I going to wear today?""- [Maxine Bédat](https://www.youtube.com/watch?v=5r8V4QWwxf0)**


Le etichette sono la prova tangibile del percorso che hanno subito i nostri abiti quando li acquistiamo. Partendo dall'etichette è possibile ottenere molte [informazioni](http://www.federconsumatoririmini.it/2017/05/16/etichettatura-dei-capi-di-abbigliamento-quali-sono-le-informazioni-obbligatorie-e-quelle-facoltative/) 
sugli abiti che indossiamo: provenienza, materiali, come assicurarci il loro corretto mantenimento.

![et1](https://user-images.githubusercontent.com/63911437/116553789-ca0be680-a8fa-11eb-8282-e14fd91f922c.jpeg)

Circa il 60% dell'abbigliamento di oggi contiene [poliestere1](https://zerrin.com/wtf-what-the-fabric-polyester-explained/) [poliestere2](https://www.kleiderly.com/our-blog/fabric-series-all-about-polyester).
Dal 2000 al 2016, l'uso del poliestere da parte dell'industria mondiale dell'abbigliamento è passato da 8,3 a 21,3 milioni di tonnellate all'anno. 
Allo stesso tempo la produzione totale mondiale di indumenti è più o meno raddoppiata, nel 2014 ha superato la soglia dei 100 miliardi di capi. 
La quota di fibre sintetiche, soprattutto poliestere, è passata da meno del 50 a più del 60 per cento.

Le particelle di microplastica sono tipicamente reliquie di oggetti di plastica più grandi, scomposte nel tempo in pezzi più piccoli.
Solo recentemente si è saputo che anche i tessuti sintetici sono una fonte considerevole di microplastiche, perché rilasciano fibre ogni volta che vengono lavati.
Una singola giacca in pile può rilasciare fino a un milione di fibre durante un ciclo di lavaggio; un paio di calze di nylon calze fino a 136.000 fibre. 
Secondo uno studio finanziato dall'Unione Europea, solo in Europa le lavatrici gettano nelle acque reflue 30.000 tonnellate di fibre sintetiche
ogni anno. [Greenpeace 2017](https://www.greenpeace.de/sites/www.greenpeace.de/files/i03971e_gp_flyer_mikrofaser_7_17.pdf)

Spesso non ci rendiamo conto di quello che indossiamo di com'è fatto o da dove proviene, le etichette sono però uno strumento che ci permette di creare una comunicazione diretta tra noi e ciò che indossiamo. 

## Com'è fatto?
Grazie all’intelligenza artificiale è possibile riconoscere le tipologie di informazioni presenti nelle etichette. Relazionandole con serie di dataset è possibile calcolarne il loro impatto inquinante o quantitativo plastico, rielaborarlo e tradurlo in un dato visivo facile da interpretare dall'utente. Il risultato potrà essere più o meno scioccante a seconda dell'indumento indossato.

## Com'è fatto? (APPROFONDIMENTO TECNOLOGIA)

1. OCR - Riconoscimento ottico dei caratteri --> applicabile alle etichette per leggerne i dati.
2. Image Classify - Classificazione immagini / Object Detector - Riconoscimento di oggetti nello spazio --> identificare gli indumenti.
3. BodyPix - utilizza TensorFlow.js identificare e sottolineare parti del corpo --> mi permette di posizionare degli elementi sul corpo.
4. Spark AR. --> Applicazione di supporto per creare filri in realtà aumentata.
5. CharRNN - Creare testo da testi analizzati in precedenza --> produrre testi di sensibilizzazione dei contenuti.

Allenare un intelligenza di **Object Detector** per riconoscere le etichette dei capi oppure invitare direttamente l'utente ad inquadrarne una e attraverso **OCR** estrapolare le informazioni necessarie alla visualizzazione dei dati dei materiali(materiali naturali/eco sostenibili/di derivazione animale/conteneti plastica). Data la grande percentuale di indumenti contenenti poliestere, focalizzarsi su quest'ultimo e in maniera provocatoria creando un output che miri a sensibilizzare l'utente.
Con **BodyPix** si potrebbero proiettare data-visualization direttamente su un indumento indossato in alternativa con **Spark AR** ottenere una rappresentazione in realtà aumentata del quantitativo di plastiche o della positività/negatività dell'indumento indossato. Infine si potrebbe allenare **CHarnRNN** per produrre testi di sensibilizzazione dei contenuti.

## E se...
Lo strumento realizzato permettesse di mettersi in contatto con un produttore fairtrade e creare un rapporto di fiducia?

## Esperimento GUI
![myTshirt](https://user-images.githubusercontent.com/63911437/117277316-0e9a0380-ae60-11eb-9663-b37a7fe1cf65.png)

[P5.js](https://editor.p5js.org/lfaraci/full/sZkfxaf8y)

## Applicare i camminatori a PoseNet

<img width="1271" alt="Screenshot 2021-06-10 at 10 13 12" src="https://user-images.githubusercontent.com/63911437/121490106-02f8aa00-c9d5-11eb-80b3-bb4705cfe76d.png">


[P5.js](https://editor.p5js.org/lfaraci/full/cM6MJkE7h)
