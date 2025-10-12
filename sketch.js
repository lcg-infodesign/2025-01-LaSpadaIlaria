//DEFINIZIONE VARIABILI//
let canvas
let dataset; //contiene dataset filtrato
let stats = {} //contiene i risultati numerici ottenuti (media, mediana ecc.)
let medianValue = 0; //variabile globale(dichiarata fuori dalla funzione) per salvare la mediana
let modeValue = 0; //variabile globale per salvare la moda
let MeanValue = 0 //variabile globale per salvare la media
let S_DeviationValue = 0
let St_DeviationValue = 0
let MeanValueE = 0


// colore condiviso per le medie (R,G,B) — usiamo questo per A e per E
let mediaR = 22;
let mediaG = 71;
let mediaB = 106;
//===================================================//

//CARICAMENTO CONTENUTI//
function preload() {
  dataset = loadTable("data_filtro.csv", "csv", "header")
}
//===================================================//

//CALCOLO DEI RISULTATI NUMERICI//
function setup() {
  createCanvas(800, 1800);

  CalculateMedian(); //calcola e mostra la mediana appena lo sketch parte
  CalculateMode(); //calcola e mostra la moda  
  CalculateMean(); //calcola e mostra la media
  CalculateS_Deviation(); //calcola e mostra la standard deviation
  CalculateSt_Deviation(); // calcola la std colonna E
  CalculateMeanE(); // calcola la media colonna E
  textSize(20); //impostiamo la dimensione del testo
}

//---------------------------------------------------
//FUNZIONE PER LA MEDIA
function CalculateMean() {
  let valoriA = dataset.getColumn(0).map(Number); // prendo la colonna A e la trasformo in numeri
  let somma = 0; // variabile per sommare tutti i valori

  for (let i = 0; i < valoriA.length; i++) {
    somma = somma + valoriA[i]; // aggiungo ogni valore alla somma
  }

  MeanValue = somma / valoriA.length; // calcolo la media, QUESTO LO RICHIAMO DOPO

  console.log("valori colonna A:", valoriA);
  console.log("media colonna A:", MeanValue);
}
//===================================================//

//FUNZIONE PER LA STANDARD DEVIATION//
function CalculateS_Deviation() {
  let valoriB = dataset.getColumn(1).map(Number); // prendo tutti i valori della colonna B
  let somma = 0; // servirà per calcolare la media

  // Calcolo la media della colonna
  for (let i = 0; i < valoriB.length; i++) {
    somma = somma + valoriB[i];
  }
  let mediaB = somma / valoriB.length; // media dei valori

  // Calcolo la somma dei quadrati delle differenze dalla media
  let sommaDifferenzeQuadrate = 0;
  for (let i = 0; i < valoriB.length; i++) {
    let differenza = valoriB[i] - mediaB; // distanza del valore dalla media
    sommaDifferenzeQuadrate += differenza * differenza; // quadrato della differenza
  }

  // Calcolo la varianza (media delle differenze quadrate)
  let varianza = sommaDifferenzeQuadrate / valoriB.length;

  // Deviazione standard = radice quadrata della varianza
  S_DeviationValue = sqrt(varianza); // funzione sqrt() di p5.js

  // Mostro i risultati in console per controllare
  console.log("Valori colonna B:", valoriB);
  console.log("Media colonna B:", mediaB);
  console.log("Deviazione standard colonna B:", S_DeviationValue);
}

//FUNZIONE PER LA MEDIANA//
function CalculateMedian() {
  let numbers = dataset.getColumn(3).map(Number); 
  numbers.sort((a, b) => a - b); //mette i numeri in ordine crescente, fondamentale per la mediana
  medianValue = 0; //inizializzo la mediana nella variabile globale

  if (numbers.length % 2 === 0) { //controllo se il numero di elementi è pari
    medianValue = (numbers[numbers.length / 2 - 1] + numbers[numbers.length / 2]) / 2;
  } else { //caso dispari
    medianValue = numbers[(numbers.length - 1) / 2];
  }

  //MOSTRO I RISULTATI IN CONSOLE//
  console.log("valori colonna D", numbers);
  console.log("mediana colonna D:", medianValue);
}

//===================================================//

//FUNZIONE PER LA MODA//
function CalculateMode() {
  let values = dataset.getColumn(2).map(Number); 
  values.sort((a, b) => a - b); //mette in ordine i valori

  let currentCount = 1;   // quante volte ho visto di fila il numero corrente
  let maxCount = 1;       // quante volte è comparso finora il numero più frequente
  let currentValue = values[0]; // numero che sto analizzando in questo momento
  modeValue = currentValue;     // per ora la moda è il primo numero

  // ciclo for 
  for (let i = 1; i < values.length; i++) {
    if (values[i] === currentValue) { 
      currentCount++; // se il numero è uguale al precedente, incremento il conteggio
    } else {
      currentValue = values[i]; // se cambia numero...
      currentCount = 1;         // ...ricomincio a contare da 1
    }

    if (currentCount > maxCount) {
      maxCount = currentCount;  // aggiorno il massimo conteggio trovato
      modeValue = currentValue; // e salvo il numero come nuova moda
    }
  }

  console.log("valori colonna C", values);
  console.log("moda colonna C:", modeValue);
}

//FUNZIONE PER LA MEDIA LETTERA E//
function CalculateMeanE() {
  let valoriE = dataset.getColumn(4).map(Number); // prendo la colonna E e la trasformo in numeri
  let somma = 0; // variabile per sommare tutti i valori

  for (let i = 0; i < valoriE.length; i++) {
    somma = somma + valoriE[i]; // aggiungo ogni valore alla somma
  }

  MeanValueE = somma / valoriE.length; // calcolo la media

  console.log("valori colonna E:", valoriE);
  console.log("media colonna E:", MeanValueE);
}
//===================================================//

//FUNZIONE PER LA STANDARD DEVIATION LETTERA E//
function CalculateSt_Deviation() {
  let valoriE = dataset.getColumn(4).map(Number); // prendo tutti i valori della colonna E
  let somma = 0; // servirà per calcolare la media

  // Calcolo la media della colonna
  for (let i = 0; i < valoriE.length; i++) {
    somma = somma + valoriE[i];
  }
  let mediaE = somma / valoriE.length; // media dei valori

  // Calcolo la somma dei quadrati delle differenze dalla media
  let sommaDifferenzeQuadrate = 0;
  for (let i = 0; i < valoriE.length; i++) {
    let differenza = valoriE[i] - mediaE; // distanza del valore dalla media
    sommaDifferenzeQuadrate += differenza * differenza; // quadrato della differenza
  }

  // Calcolo la varianza (media delle differenze quadrate)
  let varianza = sommaDifferenzeQuadrate / valoriE.length;

  // Deviazione standard = radice quadrata della varianza
  St_DeviationValue = sqrt(varianza); // funzione sqrt() di p5.js

  // Mostro i risultati in console per controllare
  console.log("Valori colonna E:", valoriE);
  console.log("Media colonna E:", mediaE);
  console.log("Deviazione standard colonna E:", St_DeviationValue);
}

//===================================================//
// DISEGNO LA MEDIA DELLA LETTERA A //

function drawMeanVisualization() { 
  textSize(16);
  textAlign(CENTER);
  fill(mediaR, mediaG, mediaB);
  text("Rappresentazione grafica della Media della colonna A", width / 2, 30); //per la scritta in alto

  // --- Preparazione dati ---
  let valoriA = dataset.getColumn(0).map(Number); //estraggo i valori dalla colonna a li visualizzo come numeri e non come stringhe
  let minVal = Math.min(...valoriA); 
  let maxVal = Math.max(...valoriA); //trovo i valori minimi e quelli massimi, mi serve dopo per dargli le coordinate

  // --- Mappatura: trasformo i valori in coordinate X 
  // (più il valore è grande, più il punto è a destra)
  let margin = 50;
  for (let i = 0; i < valoriA.length; i++) {
    let x = map(valoriA[i], minVal, maxVal, margin, width - margin); //Prendi questo valore che appartiene ai dati e trovagli il posto giusto sullo schermo//
    let y = height / 2 - 750; // linea orizzontale centrale
    fill(191, 9, 47, 80);
    noStroke();
    ellipse(x, y, 10, 10); // disegno il punto in blu e la trasparenza serve per creare una macchia
  }

  // --- Disegno la linea della media ---
//  qui salvamo il risultato di map() in xMedia 
  let xMedia = map(MeanValue, minVal, maxVal, margin, width - margin);
  stroke(mediaR, mediaG, mediaB);
  strokeWeight(2);
  line(xMedia, height / 2 - 780, xMedia, height / 2 - 720);

  // --- Etichetta della media ---
  noStroke();
  fill(mediaR, mediaG, mediaB);
  
  text("Media: " + MeanValue.toFixed(2), xMedia, height / 2 - 700);
}

//===================================================//
//DISEGNO LA MODA DELLA LETTERA C//
function drawModeVisualization() {
  if (!dataset) return; // protezione: esci se dataset non pronto

  let valoriC = dataset.getColumn(2).map(Number); 
  if (!valoriC || valoriC.length === 0) return; // protezione aggiuntiva

  let frequenze = {}; 

  // calcolo frequenze
  for (let i = 0; i < valoriC.length; i++) {
    let v = valoriC[i];
    if (frequenze[v]) {
      frequenze[v]++;
    } else {
      frequenze[v] = 1;
    }
  }

  let maxFrequenza = max(Object.values(frequenze));
  let valoriUnici = Object.keys(frequenze);

  // --- Titolo ---
  textSize(16);
  textAlign(CENTER);
  fill(22, 71, 106); // stesso colore della media
  text("Rappresentazione grafica della Moda (colonna C)", width / 2, height / 2 - 100);

  // disegno bolle per ogni valore
  for (let i = 0; i < valoriUnici.length; i++) {
    let valore = Number(valoriUnici[i]);
    let freq = frequenze[valore];

    let x = map(valore, min(valoriC), max(valoriC), 100, width - 100);
    let y = height / 2;

    let diametro = map(freq, 1, maxFrequenza, 20, 100);

    fill(22, 71, 106,80);
    noStroke();
    ellipse(x, y, diametro, diametro);
  }

  // trova la moda
  let moda = null;
  let modaFreq = 0;
  for (let valore in frequenze) {
    if (frequenze[valore] > modaFreq) {
      modaFreq = frequenze[valore];
      moda = valore;
    }
  }

  // disegno bolla speciale per la moda
  let xModa = map(Number(moda), min(valoriC), max(valoriC), 100, width - 100);
  let yModa = height / 2;
  let diametroModa = map(modaFreq, 1, maxFrequenza, 20, 100);

  fill(191, 9, 47, 180); // rosso
  stroke(255);
  strokeWeight(2);
  ellipse(xModa, yModa, diametroModa + 10, diametroModa + 10);

  // --- Etichetta della moda ---
  noStroke();
  fill(255, 0, 0);
  textAlign(CENTER);
  text("Moda: " + moda, xModa, yModa - diametroModa/2 - 10);
}


//===================================================//
// DISEGNO LA MEDIA e DEVIAZIONE STANDARD LETTERA E //
function drawStdWaveE() {
  // protezione: se non hai valori calcolati, esci
  if (typeof MeanValueE === 'undefined' || typeof St_DeviationValue === 'undefined' || isNaN(MeanValueE)) {
    // messaggio utile se serve
    noStroke();
    fill(0);
    textAlign(CENTER);
    text("mean/std colonna E non disponibili", width/2, height/2);
    return;
  }

  push(); // salvo lo stato grafico

  // area di disegno
  let margin = 50;
  let x0 = margin;
  let x1 = width - margin;
  let yCenter = height / 2 + 700;            // la linea orizzontale fissa al centro 
  let cycles = 1.0;                    // quante oscillazioni della sin across the width
  let speed = 0.01;                    // velocità animazione (frameCount)
  stroke(40);                          // colore linea media (scuro/grigio)
  strokeWeight(2);
  // LINEA DELLA MEDIA (orizzontale)
  // --- ETICHETTA/TITOLO PRIMA DEL GRAFICO (stesso colore della media A) ---
  // calcolo ampiezza prima per posizionare il titolo sopra l'onda
  let valoriE = dataset ? dataset.getColumn(4).map(Number).filter(v => !isNaN(v)) : [];
  let amp = 20; // fallback minimo
  if (valoriE.length > 0) {
    let minE = Math.min(...valoriE);
    let maxE = Math.max(...valoriE);
    let maxReasonableStd = Math.max( (maxE - minE) / 2, 1e-6 );
    amp = map(St_DeviationValue, 0, maxReasonableStd, 2, height / 10);
    amp = constrain(amp, 2, height / 2 - 20); // limiti per evitare overflow
  }

  // disegno il titolo PRIMA del grafico, con lo stesso colore della media A
  noStroke();
  fill(mediaR, mediaG, mediaB);
  textAlign(CENTER);
  textSize(16);
  text("Rappresentazione Media + Deviazione Standard (colonna E)", width/2, yCenter - amp - 40);

  // ora disegno la linea della media E con lo stesso colore della media A
  stroke(mediaR, mediaG, mediaB);
  strokeWeight(2);
  line(x0, yCenter, x1, yCenter);

  // calcolo dell'ampiezza visiva (in pixel) a partire dalla deviazione standard numerica
  // per fare questo serviamo un "range di riferimento". Usiamo la range dei dati di E:
  // (amp è già calcolata sopra)

  // DISEGNO L'ONDA (senoide animata)
  noFill();
  stroke(191, 9, 47); // colore dell'onda 
  strokeWeight(2);
  beginShape();
  // itero in X e calcolo y come seno
  let frames = frameCount * speed; //controllo la velocità
  for (let x = x0; x <= x1; x += 4) { // passo 4px per performance + fluidità
    // t va da 0 a cycles* TWO_PI
    let t = map(x, x0, x1, 0, cycles * TWO_PI);
    let y = yCenter + sin(t + frames) * amp;
    vertex(x, y);
  }
  endShape();

  // DISEGNO DUE LINEE GUIDA +/- 1 STD (opzionale, per chiarezza)
  stroke(200, 80); // linea più chiara
  strokeWeight(1);
  line(x0, yCenter + amp, x1, yCenter + amp); // +1 std (visual)
  line(x0, yCenter - amp, x1, yCenter - amp); // -1 std

  // ETICHETTE: media e std numerici (stesso colore delle scritte della media A)
  noStroke();
  fill(mediaR, mediaG, mediaB);
  textAlign(LEFT);
  text("Media (E): " + MeanValueE.toFixed(2), x0 + 6, yCenter - 10);
  text("Deviazione standard (E): " + St_DeviationValue.toFixed(2), x0 + 6, yCenter + 20);

  pop(); // ripristino stato grafico
}

//VISUALIZZAZIONE SU CANVAS//
function draw() {
  background(255);
  fill(0);
  textAlign(LEFT);
  text("Mediana colonna D: " + medianValue, 20, 1200);
  text("StandardDeviation colonna B: " + S_DeviationValue, 20, 440);
  
 
  drawMeanVisualization();
  drawStdWaveE();
  drawModeVisualization();

}
