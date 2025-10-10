//DEFINIZIONE VARIABILI//
let dataset; //contiene dataset filtrato
let stats = {} //contiene i risultati numerici ottenuti (media, mediana ecc.)
let medianValue = 0; //variabile globale(dichiarata fuori dalla funzione) per salvare la mediana
let modeValue = 0; //variabile globale per salvare la moda
let meanValue = 0 //variabile globale per salvare la media
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
  createCanvas(400, 400);
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

  meanValue = somma / valoriA.length; // calcolo la media

  console.log("valori colonna A:", valoriA);
  console.log("media colonna A:", meanValue);
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

//VISUALIZZAZIONE SU CANVAS//
function draw() {
  background(220);
  fill(0);
  textAlign(LEFT);
  text("Mediana colonna D: " + medianValue, 20, 50);
  text("Moda colonna C: " + modeValue, 20, 80); 
  text("Media colonna A: " + meanValue, 20, 110);
  text("StandardDeviation colonna B: " + S_DeviationValue, 20, 140);
  text("Mean colonna E: " + MeanValueE, 20, 170);
  text("StandardDeviation colonna E: " + St_DeviationValue, 20, 200);
}
