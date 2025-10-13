

let canvas;           // <- definisce una variabile chiamata canvas (vuota ora)
let dataset;          // <- definisce una variabile dataset che conterrà i dati caricati
let medianValue = 0;  // <- inizializza la variabile della mediana a 0
let modeValue = 0;    // <- inizializza la variabile della moda a 0  
let MeanValue = 0;    // <- inizializza la media della colonna A a 0
let S_DeviationValue = 0;  // <- inizializza la deviazione standard (colonna B) a 0
let St_DeviationValue = 0; // <- inizializza la deviazione standard (colonna E) a 0
let MeanValueE = 0;   // <- inizializza la media della colonna E a 0

// Questi sono i colori che useremo per disegnare
let backgroundColor = [240, 245, 249]; 
let cardColor = [255, 255, 255];       
let textColor = [50, 50, 50];          
let accentColor = [22, 71, 106];       
let highlightColor = [191, 9, 47];     

// Queste servono per organizzare le card sullo schermo
let cards = [];              // <- inizializza una lista vuota che conterrà le card
let cardWidth = 700;         // <- imposta la larghezza delle card a 700 pixel
let cardHeight = 300;        // <- imposta l'altezza delle card a 300 pixel  
let cardSpacing = 30;        // <- spazio verticale tra le card
let startY = 40;             // <- posizione Y di partenza per la prima card

// =============================================
// PARTE 2: CARICARE I DATI 
// =============================================

function preload() {
  // Questa funzione dice: "prima di iniziare, carica il file con i numeri"
  dataset = loadTable("data_filtro.csv", "csv", "header"); // <- carica il file CSV con intestazione e lo mette in dataset
  // "header" significa che la prima riga ha i nomi delle colonne
}

// =============================================
// PARTE 3: PREPARARE TUTTO 
// =============================================

function setup() {
  // Questa funzione viene fatta una volta all'inizio
  // Crea un foglio da disegno di 800 per 2200 pixel
  createCanvas(800, 2200); // <- crea la tela (canvas) dove si disegna: 800x2200

  // Adesso facciamo tutti i calcoli con i numeri
  CalculateMedian();     // <- chiama la funzione che calcola la mediana (colonna D)
  CalculateMode();       // <- chiama la funzione che calcola la moda (colonna C)  
  CalculateMean();       // <- calcola la media della colonna A
  CalculateS_Deviation(); // <- calcola la deviazione standard della colonna B
  CalculateSt_Deviation(); // <- calcola la deviazione standard della colonna E
  CalculateMeanE();      // <- calcola la media della colonna E

  // Prepariamo l'elenco delle card da mostrare
  initializeCards();     // <- crea e popola l'array 'cards' con le card da disegnare
}

function initializeCards() {
  // Qui creiamo la lista di tutte le card che vogliamo mostrare
  // Ogni card è come un foglietto con: titolo, cosa contiene, dove metterla

  cards = [  // <- assegna all'array cards una lista di oggetti (una card per oggetto)
    {
      title: "MEDIA - Colonna A",           // <- titolo della prima card
      type: "visualization",                // <- tipo: visualizzazione grafica
      drawFunction: drawMeanCard,           // <- funzione da usare per disegnare il contenuto
      y: startY                              // <- posizione verticale della card (startY)
    },
    {
      title: "DEVIAZIONE STANDARD - Colonna B", 
      type: "text",                         // <- tipo: solo testo (non grafico)
      value: S_DeviationValue,              // <- valore da mostrare: deviazione calcolata prima
      description: "Misura della dispersione dei dati", // <- spiegazione sotto il numero
      y: startY + cardHeight + cardSpacing  // <- posiziona la card sotto la prima
    },
    {
      title: "MODA - Colonna C",
      type: "visualization", 
      drawFunction: drawModeCard,           // <- funzione che disegna la moda
      y: startY + 2*(cardHeight + cardSpacing)  // <- terza card: ancora più sotto
    },
    {
      title: "MEDIANA - Colonna D", 
      type: "text",
      value: medianValue,                   // <- mostra la mediana calcolata
      description: "Valore centrale dei dati ordinati", 
      y: startY + 3*(cardHeight + cardSpacing)
    },
    {
      title: "MEDIA E DEVIAZIONE STANDARD - Colonna E",
      type: "visualization",
      drawFunction: drawStdWaveCard,        // <- funzione che disegna la media + onda (deviazione)
      y: startY + 4*(cardHeight + cardSpacing)
    }
  ];
}

// =============================================
// PARTE 4: DISEGNARE LE CARD 

function drawCardBase(x, y, w, h, title) {
  // Questa funzione disegna la base di una card (il rettangolo con il titolo)

  // Prima disegna un'ombra grigia sotto la card
  fill(220, 220, 220, 100);   // <- imposta il colore di riempimento (grigio semi-trasparente)
  noStroke();                 // <- senza bordo
  rect(x + 4, y + 4, w, h, 12); // <- disegna un rettangolo spostato di 4px (ombra), angoli arrotondati

  // Poi disegna la card bianca sopra
  fill(cardColor);            // <- riempie col colore della card (bianco)
  stroke(200);                // <- imposta il colore del bordo
  strokeWeight(1);            // <- spessore del bordo
  rect(x, y, w, h, 12);       // <- rettangolo principale della card

  // Poi disegna la barra blu in alto per il titolo
  fill(accentColor);          // <- usa il colore di accento (blu)
  noStroke();                 // <- nessun bordo sulla barra del titolo
  rect(x, y, w, 40, 12, 12, 0, 0); // <- rettangolo della barra titolo (solo angoli in alto arrotondati)

  // Infine scrive il titolo in bianco sulla barra blu
  fill(255);                  // <- testo in bianco
  textSize(16);               // <- dimensione del testo
  textAlign(CENTER, CENTER);  // <- allineamento del testo al centro orizz. e vert.
  text(title, x + w/2, y + 20); // <- scrive il titolo centrato nella barra
}

// =============================================
// PARTE 5: DISEGNARE IL CONTENUTO DI OGNI CARD
// =============================================

function drawMeanCard(x, y, w, h) {
  // Questa card mostra la media della colonna A

  // Prima scrive il valore della media in grande
  fill(textColor);            // <- colore testo
  textSize(18);               // <- dimensione testo
  textAlign(CENTER);          // <- allineamento orizzontale centro
  text("Media: " + MeanValue.toFixed(2), x + w/2, y + 70); // <- scrive la media formattata con 2 decimali

  // Prende tutti i numeri della colonna A
  let valoriA = dataset.getColumn(0).map(Number); // <- legge colonna 0 del CSV e la trasforma in numeri
  let minVal = Math.min(...valoriA);  // <- trova il valore min tra i numeri
  let maxVal = Math.max(...valoriA);  // <- trova il valore max tra i numeri

  // Decide dove disegnare i punti
  let graphX = x + 50;          // <- margine sinistro del grafico dentro la card
  let graphY = y + 140;         // <- posizione verticale per i punti
  let graphWidth = w - 100;     // <- larghezza disponibile per il grafico

  // Disegna un puntino per ogni numero
  for (let i = 0; i < valoriA.length; i++) {
    // Trova dove mettere il puntino in base al suo valore
    let pointX = map(valoriA[i], minVal, maxVal, graphX, graphX + graphWidth); // <- scala il valore su una posizione X dentro il grafico

    fill(highlightColor[0], highlightColor[1], highlightColor[2], 80); // <- riempie con il colore highlight ma semitrasparente
    noStroke();                // <- senza bordo
    ellipse(pointX, graphY, 10, 10);  // <- disegna un cerchio di diametro 10 al punto calcolato
  }

  // Disegna una linea blu dove sta la media
  let xMedia = map(MeanValue, minVal, maxVal, graphX, graphX + graphWidth); // <- mappa la media su una x del grafico
  stroke(accentColor[0], accentColor[1], accentColor[2], 200); // <- imposta il colore e opacità della linea
  strokeWeight(2);           // <- spessore linea
  line(xMedia, graphY - 30, xMedia, graphY + 30); // <- disegna una linea verticale che indica la media

  // Scrive "Media" sotto la linea
  noStroke();                // <- nessun bordo per il testo
  fill(accentColor[0], accentColor[1], accentColor[2]); // <- testo blu
  textSize(14);              // <- dimensione testo
  text("Media: " + MeanValue.toFixed(2), xMedia, graphY + 50); // <- etichetta sotto la linea della media
}

function drawModeCard(x, y, w, h) {
  // Questa card mostra la moda della colonna C (il numero che compare più volte)
  if (!dataset) return;  // <- se dataset non è ancora caricato, esci dalla funzione

  // Prende tutti i numeri della colonna C
  let valoriC = dataset.getColumn(2).map(Number); // <- colonna 2 in numeri
  let frequenze = {};  // <- oggetto/vettore per contare quante volte compare ogni valore

  // Conta per ogni numero quante volte appare
  for (let i = 0; i < valoriC.length; i++) {
    let v = valoriC[i];  // <- numero corrente
    if (frequenze[v]) {
      frequenze[v]++;    // <- se già esiste la chiave, incrementa il contatore
    } else {
      frequenze[v] = 1;  // <- altrimenti crea la chiave e la imposta a 1
    }
  }

  // Trova qual è il numero che compare più volte
  let maxFrequenza = max(Object.values(frequenze)); // <- prende il valore massimo tra le frequenze
  let valoriUnici = Object.keys(frequenze);         // <- lista dei valori unici trovati

  // Scrive il valore della moda
  fill(textColor);           // <- colore testo
  textSize(18);              // <- dimensione testo
  textAlign(CENTER);         // <- allineamento
  text("Moda: " + modeValue, x + w/2, y + 70); // <- scrive la moda calcolata prima (modeValue)

  // Per ogni numero diverso, disegna una bolla
  for (let i = 0; i < valoriUnici.length; i++) {
    let valore = Number(valoriUnici[i]);  // <- converte la chiave in numero
    let freq = frequenze[valore];         // <- prende la frequenza di quel valore

    // Decide dove mettere la bolla
    let xBolla = map(valore, min(valoriC), max(valoriC), x + 100, x + w - 100); // <- mappa il valore su una posizione X della card
    let yBolla = y + 160; // <- posizione verticale delle bolle

    // La bolla è più grande se il numero compare più volte
    let diametro = map(freq, 1, maxFrequenza, 20, 80); // <- scala la frequenza in un diametro da 20 a 80

    // Disegna la bolla blu
    fill(accentColor[0], accentColor[1], accentColor[2], 80); // <- riempimento blu semitrasparente
    noStroke();                // <- senza bordo
    ellipse(xBolla, yBolla, diametro, diametro); // <- disegna la bolla
  }

  // Trova qual è la moda (il numero più frequente)
  let moda = modeValue;               // <- usa la moda calcolata in precedenza
  let modaFreq = frequenze[moda];     // <- legge quante volte compare la moda

  // Disegna la bolla della moda più grande e rossa
  let xModa = map(Number(moda), min(valoriC), max(valoriC), x + 100, x + w - 100); // <- posizione x della moda
  let yModa = y + 160;               // <- posizione y
  let diametroModa = map(modaFreq, 1, maxFrequenza, 20, 80); // <- diametro relativo alla frequenza della moda

  fill(highlightColor[0], highlightColor[1], highlightColor[2], 180); // <- riempimento rosso più opaco
  stroke(255);               // <- bordo bianco
  strokeWeight(2);           // <- spessore bordo
  ellipse(xModa, yModa, diametroModa + 10, diametroModa + 10); // <- disegna una bolla più grande per la moda

  // Scrive "MODA" sopra la bolla rossa
  noStroke();                // <- nessun bordo per il testo
  fill(highlightColor[0], highlightColor[1], highlightColor[2]); // <- testo rosso
  textSize(14);              // <- dimensione testo
  textAlign(CENTER);         // <- allineamento centro
  text("MODA: " + moda, xModa, yModa - diametroModa/2 - 15); // <- etichetta sopra la bolla della moda
}

function drawStdWaveCard(x, y, w, h) {
  // Questa card mostra media e deviazione standard della colonna E
  if (typeof MeanValueE === 'undefined') return;  // <- se MeanValueE non è definita, esci (sicurezza)

  // Scrive i valori della media e deviazione standard
  fill(textColor);           // <- colore testo
  textSize(16);              // <- dimensione testo
  textAlign(CENTER);         // <- allineamento
  text("Media: " + MeanValueE.toFixed(2), x + w/2, y + 70); // <- scrive la media col 2 decimali
  text("Deviazione Standard: " + St_DeviationValue.toFixed(2), x + w/2, y + 95); // <- scrive la deviazione standard

  // Decide dove disegnare
  let centerY = y + 170;        // <- linea centrale verticale per l'onda
  let graphWidth = w - 100;     // <- larghezza per disegnare l'onda
  let startX = x + 50;          // <- margine sinistro

  // Disegna la linea blu della media
  stroke(accentColor);          // <- colore linea (usa l'array intero, p5 lo interpreta)
  strokeWeight(2);              // <- spessore linea
  line(startX, centerY, startX + graphWidth, centerY); // <- disegna la linea orizzontale della media

  // Prende i numeri della colonna E per capire quanto deve essere "alta" l'onda
  let valoriE = dataset.getColumn(4).map(Number); // <- valori della colonna 4 convertiti in numeri
  let minE = Math.min(...valoriE); // <- min colonna E
  let maxE = Math.max(...valoriE); // <- max colonna E
  let maxReasonableStd = Math.max((maxE - minE) / 2, 1e-6); // <- calcolo di riferimento per normalizzare l'ampiezza
  let amp = map(St_DeviationValue, 0, maxReasonableStd, 2, 40); // <- mappa la deviazione standard in ampiezza tra 2 e 40 px

  // Disegna l'onda rossa che si muove
  noFill();                    // <- niente riempimento (solo contorno per la linea)
  stroke(highlightColor);      // <- colore della linea d'onda (rosso)
  strokeWeight(2);             // <- spessore linea
  
  beginShape();                // <- inizio di una forma fatta da vertici (linea continua)
  let frames = frameCount * 0.01;  // <- piccolo valore che cambia nel tempo per animare l'onda
  for (let px = 0; px <= graphWidth; px += 4) { // <- scorre lungo la larghezza del grafico a passi di 4 px
    let xPos = startX + px;    // <- posizione x corrente
    let t = map(px, 0, graphWidth, 0, TWO_PI * 2); // <- mappa px su un angolo tra 0 e 4π (due cicli)
    let yPos = centerY + sin(t + frames) * amp;  // <- calcola l'oscillazione verticale usando il seno
    vertex(xPos, yPos);        // <- aggiunge il punto alla forma
  }
  endShape();                  // <- chiude e disegna la forma

  // Disegna due linee grigie che mostrano quanto è "alta" l'onda
  stroke(200, 80);             // <- colore grigio semi-trasparente
  strokeWeight(1);             // <- spessore linea più sottile
  line(startX, centerY + amp, startX + graphWidth, centerY + amp); // <- linea sotto l'onda
  line(startX, centerY - amp, startX + graphWidth, centerY - amp); // <- linea sopra l'onda
}

// =============================================
// PARTE 6: FUNZIONI PER FARE I CALCOLI
// =============================================

function CalculateMean() {
  // Calcola la media: somma tutti i numeri e divide per quanti sono
  let valoriA = dataset.getColumn(0).map(Number); // <- prendi i valori della colonna A
  let somma = 0; // <- inizializza la somma a zero
  
  for (let i = 0; i < valoriA.length; i++) {
    somma += valoriA[i];  // <- aggiungi ogni valore alla somma
  }
  
  MeanValue = somma / valoriA.length;  // <- media = somma diviso numero di elementi
}

function CalculateS_Deviation() {
  // Calcola la deviazione standard: misura quanto i numeri sono "sparsi"
  let valoriB = dataset.getColumn(1).map(Number); // <- prendi i valori della colonna B
  let somma = 0; // <- somma per calcolare la media
  
  // Prima calcola la media
  for (let i = 0; i < valoriB.length; i++) {
    somma += valoriB[i]; // <- somma i valori
  }
  let mediaB = somma / valoriB.length; // <- media della colonna B
  
  // Poi per ogni numero, calcola quanto dista dalla media
  let sommaDifferenzeQuadrate = 0; // <- inizializza la somma dei quadrati delle differenze
  for (let i = 0; i < valoriB.length; i++) {
    let differenza = valoriB[i] - mediaB; // <- distanza dal valore alla media
    sommaDifferenzeQuadrate += differenza * differenza;  // <- aggiunge il quadrato della distanza
  }
  
  // Infine fa la radice quadrata
  let varianza = sommaDifferenzeQuadrate / valoriB.length; // <- varianza = media dei quadrati delle differenze
  S_DeviationValue = sqrt(varianza); // <- deviazione standard = radice quadrata della varianza
}

function CalculateMedian() {
  // Calcola la mediana: il numero che sta in mezzo quando metti tutti in fila
  let numbers = dataset.getColumn(3).map(Number); // <- prendi i valori della colonna D
  numbers.sort((a, b) => a - b);  // <- ordina i numeri dal piccolo al grande
  
  if (numbers.length % 2 === 0) {
    // Se i numeri sono pari: media dei due di mezzo
    medianValue = (numbers[numbers.length/2 - 1] + numbers[numbers.length/2]) / 2; // <- media dei due centrali
  } else {
    // Se i numeri sono dispari: prendi quello in mezzo
    medianValue = numbers[(numbers.length - 1)/2]; // <- elemento centrale (indice intero)
  }
}

function CalculateMode() {
  // Calcola la moda: il numero che compare più volte
  let values = dataset.getColumn(2).map(Number); // <- prendi i valori della colonna C
  values.sort((a, b) => a - b); // <- ordina i valori

  let currentCount = 1;    // <- conta quante volte il numero corrente compare consecutivamente
  let maxCount = 1;        // <- massima frequenza trovata finora
  let currentValue = values[0];  // <- il primo valore come riferimento iniziale
  modeValue = currentValue;      // <- imposta temporaneamente la moda al primo valore

  // Guarda tutti i numeri uno per uno
  for (let i = 1; i < values.length; i++) {
    if (values[i] === currentValue) {
      currentCount++;  // <- se uguale al precedente, incrementa il contatore
    } else {
      currentValue = values[i];  // <- se cambia valore, aggiorna currentValue
      currentCount = 1;         // <- e resetta il contatore a 1
    }

    // Se abbiamo trovato un numero che compare più volte, aggiorna la moda
    if (currentCount > maxCount) {
      maxCount = currentCount;  // <- aggiorna la massima frequenza
      modeValue = currentValue; // <- aggiorna la moda al valore corrente
    }
  }
}

function CalculateMeanE() {
  // Calcola la media della colonna E (come per la colonna A)
  let valoriE = dataset.getColumn(4).map(Number); // <- prendi i valori della colonna E
  let somma = 0; // <- inizializza somma
  
  for (let i = 0; i < valoriE.length; i++) {
    somma += valoriE[i]; // <- somma i valori
  }
  
  MeanValueE = somma / valoriE.length; // <- media
}

function CalculateSt_Deviation() {
  // Calcola la deviazione standard della colonna E (come per la colonna B)
  let valoriE = dataset.getColumn(4).map(Number); // <- prendi valori colonna E
  let somma = 0; // <- per calcolare la media
  
  for (let i = 0; i < valoriE.length; i++) {
    somma += valoriE[i]; // <- somma
  }
  let mediaE = somma / valoriE.length; // <- media colonna E
  
  let sommaDifferenzeQuadrate = 0; // <- inizializza
  for (let i = 0; i < valoriE.length; i++) {
    let differenza = valoriE[i] - mediaE; // <- distanza dal valore alla media
    sommaDifferenzeQuadrate += differenza * differenza; // <- somma dei quadrati
  }
  
  let varianza = sommaDifferenzeQuadrate / valoriE.length; // <- varianza
  St_DeviationValue = sqrt(varianza); // <- deviazione standard = radice di varianza
}

// =============================================
// PARTE 7: FUNZIONE PRINCIPALE CHE DISEGNA TUTTO
// =============================================

function draw() {
  // Questa funzione viene chiamata 60 volte al secondo e ridisegna tutto
  // (per animazioni e aggiornamenti dinamici)

  // Prima colora tutto lo sfondo di azzurro
  background(backgroundColor); // <- colora lo sfondo con backgroundColor

  // Per ogni card nella lista...
  for (let card of cards) {
    // Calcola dove mettere la card (al centro dello schermo)
    let x = (width - cardWidth) / 2; // <- centra la card orizzontalmente

    // Disegna la card (il rettangolo con il titolo)
    drawCardBase(x, card.y, cardWidth, cardHeight, card.title); // <- disegna base e titolo

    // Aggiunge il contenuto dentro la card
    if (card.type === "visualization") {
      // Se è una card con disegno, chiama la funzione per disegnare
      card.drawFunction(x, card.y, cardWidth, cardHeight); // <- esegue la funzione grafica associata
    } else if (card.type === "text") {
      // Se è una card con solo testo, scrive il numero grande
      fill(textColor);          // <- colore testo
      textSize(32);             // <- dimensione grande per il numero
      textAlign(CENTER, CENTER); // <- allineamento centro per il numero
      text(card.value.toFixed(2), x + cardWidth/2, card.y + cardHeight/2); // <- scrive il valore con 2 decimali

      // E sotto scrive una spiegazione
      textSize(14);             // <- dimensione più piccola per la descrizione
      fill(150);                // <- colore grigio per la descrizione
      text(card.description, x + cardWidth/2, card.y + cardHeight/2 + 40); // <- scrive la descrizione
    }
  }

  // Alla fine scrive in basso il nome del file dei dati
  fill(150);                   // <- colore grigio per il footer
  textSize(12);                // <- dimensione piccola
  textAlign(CENTER);           // <- allineamento centro
  text("Analisi Statistica - Dataset: data_filtro.csv", width/2, height - 20); // <- testo finale in basso
}
