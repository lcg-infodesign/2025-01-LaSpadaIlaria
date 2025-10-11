//DEFINIZIONE VARIABILI//
let dataset; //contiene dataset filtrato
let stats = {} //contiene i risultati numerici ottenuti (media, mediana ecc.)
let medianValue = 0; //variabile globale(dichiarata fuori dalla funzione) per salvare la mediana
let modeValue = 0; //variabile globale per salvare la moda
let MeanValue = 0 //variabile globale per salvare la media
let S_DeviationValue = 0
let St_DeviationValue = 0
let MeanValueE = 0
//===================================================//

//CARICAMENTO CONTENUTI//
function preload() {
  dataset = loadTable("data_filtro.csv", "csv", "header")
}
//===================================================//

//CALCOLO DEI RISULTATI NUMERICI//
function setup() {
  createCanvas(800, 800);
  CalculateMedian(); //calcola e mostra la mediana appena lo sketch parte
  CalculateMode(); //calcola e mostra la moda  
  CalculateMean(); //calcola e mostra la media
  CalculateS_Deviation(); //calcola e mostra la standard deviation
  CalculateSt_Deviation(); // calcola la std colonna E
  CalculateMeanE(); // calcola la media colonna E
  textSize(20); //impostiamo la dimensione del testo
}
//===================================================//

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
  fill(22, 71, 106);
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
    let y = height / 2 - 250; // linea orizzontale centrale
    fill(191, 9, 47, 80);
    noStroke();
    ellipse(x, y, 10, 10); // disegno il punto in blu e la trasparenza serve per creare una macchia
  }

  // --- Disegno la linea della media ---
//  qui salvamo il risultato di map() in xMedia 
  let xMedia = map(MeanValue, minVal, maxVal, margin, width - margin);
  stroke(22, 71, 106);
  strokeWeight(2);
  line(xMedia, height / 2 - 280, xMedia, height / 2 - 220);

  // --- Etichetta della media ---
  noStroke();
  fill(22, 71, 106);
  
  text("Media: " + MeanValue.toFixed(2), xMedia, height / 2 - 200);
}

//VISUALIZZAZIONE SU CANVAS//
function draw() {
  background(255);
  fill(0);
  textAlign(LEFT);
  text("Mediana colonna D: " + medianValue, 20, 250);
  text("Moda colonna C: " + modeValue, 20, 280); 
  text("StandardDeviation colonna B: " + S_DeviationValue, 20, 340);
  text("Mean colonna E: " + MeanValueE, 20, 370);
  text("StandardDeviation colonna E: " + St_DeviationValue, 20, 400);
  drawMeanVisualization();
}
