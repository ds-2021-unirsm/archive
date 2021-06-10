![Copertina](https://user-images.githubusercontent.com/76455356/121450001-30c0fd00-c99b-11eb-9fa9-27acaf03f537.png)

# Spatial Being
Spatial Being è un ambiente virtuale collaborativo nel quale l’utente è svincolato dalle interfacce.  
Spatial Being offre la possibilità a più persone di vedersi e interagire nello stesso spazio, tra loro e con gli oggetti, utilizzando modalità naturali di comunicazione come la voce, i gesti e il movimento del corpo.

## Keywords:
> Spazi, virtuale, gesti, creatività, online, co-design, essere.

## Sperimentazioni
Per sviluppare il progetto sono state individuate e analizzate le parti principali che lo costituiscono, in particolar modo: avviare una comunicazione bidirezionale server-client, riconoscere e usare i gesti delle mani e la voce per controllare gli oggetti all’interno di uno spazio virtuale.

#### HandPose 3D Control [+](https://editor.p5js.org/RobertoAlesi/full/mFpSAsZWK)
>Utilizzando HandPose di ml5, è possibile controllare e manipolare un elemento tridimensionale.  
>**Hand Gesture:**    
>Aperta/Rock -> per cambiare la forma da sfera in cubo  
>Pugno -> per cambiare colore  
>Pinch -> per cambiare la dimensione  
  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;![ezgif-3-26f56a864e64](https://user-images.githubusercontent.com/76455356/119957006-fa01e480-bfa1-11eb-95b0-16d7449cf2c1.gif)

#### Voice Control [+](https://editor.p5js.org/RobertoAlesi/full/u0AwDYMCh)
>Un cubo posizionato in un ambiente 3D può essere controllato pronunciando diversi comandi vocali.  
>**Comandi Vocali:**  
"Sfera", "Cubo" -> per cambiare la forma dell'elemento 3D  
"Su", "giu", "destra", "sinistra" -> per muoversi in alto, in basso, a destra o a sinistra  
Blu, rosso, viola, giallo -> per cambiare colore  
Grande, base, piccolo -> per controllare la dimensione  

#### Socket.io + Three.js + HandPose + Tensorflow.js [+](https://hand-pose.glitch.me)  
>Con questa sperimentazione è stato testato l’hand tracking, utilizzando le libreria javascript Tensorflow unita a Three.js, per ottenere un riconoscimento più affidabile e lineare della mano per disegnare elementi tridimensionali nello spazio.  

![photo5908976784651695548](https://user-images.githubusercontent.com/76455356/121269371-00f0f700-c8c0-11eb-9249-8c234b108080.jpg)

#### Socket.io + Three.js  [+](https://socket-three-due2.glitch.me)
>Più utenti si possono collegare all’interno di uno spazio 3D condiviso, muovere il proprio cubo identificativo utilizzando le frecce della tastiera e cambiare il colore di un elemento, posto al centro della scena, con un click del mouse.

&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;![ezgif-4-2e46827d9407](https://user-images.githubusercontent.com/76455356/121268981-452fc780-c8bf-11eb-8804-f8f02f2cd5eb.gif)

#### Socket.io Drawing
**2Drawing** [+](https://editor.p5js.org/RobertoAlesi/full/TyDXiyUc8)
>Cliccando con il mouse è possibile disegnare dei cerchi bidimensionali nello spazio, insieme a quelli che arrivano dagli altri utenti.  

![photo5908976784651695607](https://user-images.githubusercontent.com/76455356/121272474-59c38e00-c8c6-11eb-8412-d2184024d4ef.jpg)


**3Drawing** [+](https://editor.p5js.org/RobertoAlesi/full/cez4xDvz7)
>Muovendosi con il mouse è possibile disegnare delle sfere nello spazio.  

![photo5908976784651695608](https://user-images.githubusercontent.com/76455356/121272490-65af5000-c8c6-11eb-852d-68c4e1826c0a.jpg)

**Glitch WebSocket Server** [+](https://glitch.com/edit/#!/disegni-diversi)
>Il server permette di inviare e ricevere dati per disegnare contemporaneamente nello stesso spazio  

&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ![ezgif-4-59684b72a30a](https://user-images.githubusercontent.com/76455356/121272567-a5763780-c8c6-11eb-91a3-0dc7f756ae29.gif)


# Prototipi
Il risultato finale permette, a più persone, di collegarsi su diversi sketch di P5.js e di interagire, tra loro e con lo spazio, utilizzando le mani per generare forme e la voce per cambiarne il colore o per dare comandi vocali come “Disegna”, “Stop” e “Salva”.

## Spatial Being 2D [+](https://editor.p5js.org/RobertoAlesi/full/bIxa6qOea)

![SpatialBeing (1)](https://user-images.githubusercontent.com/76455356/121309497-8ac1b400-c902-11eb-8ea0-dd4fa64421b5.png)


## Spatial Being 3D [+](https://editor.p5js.org/RobertoAlesi/full/0Tne-Js-i)

![photo5902370038323721666](https://user-images.githubusercontent.com/76455356/121416968-b2983280-c969-11eb-8668-6a3bc22c15a7.jpg)  


## Users Map [+](https://editor.p5js.org/RobertoAlesi/full/8Iwd_t86o)  
>Quando un nuovo utente esegue l’accesso su Spatial Being, il suo nome viene posizionato casualmente nello spazio e collegato a quello degli altri, generando una mappa tridimensionale della community di persone, che si incontrano per creare liberamente.  

&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ![ezgif-4-1c5c28e0566c](https://user-images.githubusercontent.com/76455356/121377551-b82e5200-c942-11eb-9187-a157bd71cf22.gif)  
