//DEFINIZIONE VARIABILI//
let canvas;
let dataset;
let stats = {};
let medianValue = 0;
let modeValue = 0;
let MeanValue = 0;
let S_DeviationValue = 0;
let St_DeviationValue = 0;
let MeanValueE = 0;

// Colori per il tema
let backgroundColor = [240, 245, 249];
let cardColor = [255, 255, 255];
let textColor = [50, 50, 50];
let accentColor = [22, 71, 106];
let highlightColor = [191, 9, 47];

// Layout variables
let cards = [];
let cardWidth = 700;
let cardHeight = 300;
let cardSpacing = 30;
let startY = 40;

//CARICAMENTO CONTENUTI//
function preload() {
  dataset = loadTable("data_filtro.csv", "csv", "header");
}

//CALCOLO DEI RISULTATI NUMERICI//
function setup() {
  createCanvas(800, 2200);
  
  // Calcola tutte le statistiche
  CalculateMedian();
  CalculateMode();  
  CalculateMean();
  CalculateS_Deviation();
  CalculateSt_Deviation();
  CalculateMeanE();
  
  // Inizializza le card
  initializeCards();
}

function initializeCards() {
  cards = [
    {
      title: "MEDIA - Colonna A",
      type: "visualization",
      drawFunction: drawMeanCard,
      y: startY
    },
    {
      title: "DEVIAZIONE STANDARD - Colonna B", 
      type: "text",
      value: S_DeviationValue,
      description: "Misura della dispersione dei dati",
      y: startY + cardHeight + cardSpacing
    },
    {
      title: "MODA - Colonna C",
      type: "visualization", 
      drawFunction: drawModeCard,
      y: startY + 2*(cardHeight + cardSpacing)
    },
    {
      title: "MEDIANA - Colonna D",
      type: "text",
      value: medianValue,
      description: "Valore centrale dei dati ordinati",
      y: startY + 3*(cardHeight + cardSpacing)
    },
    {
      title: "MEDIA E DEVIAZIONE STANDARD - Colonna E",
      type: "visualization",
      drawFunction: drawStdWaveCard,
      y: startY + 4*(cardHeight + cardSpacing)
    }
  ];
}

// FUNZIONE PER DISEGNARE UNA CARD
function drawCardBase(x, y, w, h, title) {
  // Ombra
  fill(220, 220, 220, 100);
  noStroke();
  rect(x + 4, y + 4, w, h, 12);
  
  // Card principale
  fill(cardColor);
  stroke(200);
  strokeWeight(1);
  rect(x, y, w, h, 12);
  
  // Header
  fill(accentColor);
  noStroke();
  rect(x, y, w, 40, 12, 12, 0, 0);
  
  // Titolo
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(title, x + w/2, y + 20);
}

// CARDS VISUALIZATION FUNCTIONS

function drawMeanCard(x, y, w, h) {
  // Testo informativo
  fill(textColor);
  textSize(18);
  textAlign(CENTER);
  text("Media: " + MeanValue.toFixed(2), x + w/2, y + 70);
  
  // Preparazione dati
  let valoriA = dataset.getColumn(0).map(Number);
  let minVal = Math.min(...valoriA);
  let maxVal = Math.max(...valoriA);

  // Area del grafico
  let graphX = x + 50;
  let graphY = y + 140;
  let graphWidth = w - 100;

  // Disegna punti
  for (let i = 0; i < valoriA.length; i++) {
    let pointX = map(valoriA[i], minVal, maxVal, graphX, graphX + graphWidth);
    fill(highlightColor[0], highlightColor[1], highlightColor[2], 80);
    noStroke();
    ellipse(pointX, graphY, 10, 10);
  }

  // Linea della media
  let xMedia = map(MeanValue, minVal, maxVal, graphX, graphX + graphWidth);
  stroke(accentColor[0], accentColor[1], accentColor[2], 200);
  strokeWeight(2);
  line(xMedia, graphY - 30, xMedia, graphY + 30);

  // Etichetta della media
  noStroke();
  fill(accentColor[0], accentColor[1], accentColor[2]);
  textSize(14);
  text("Media: " + MeanValue.toFixed(2), xMedia, graphY + 50);
}

function drawModeCard(x, y, w, h) {
  if (!dataset) return;

  let valoriC = dataset.getColumn(2).map(Number); 
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

  // Titolo
  fill(textColor);
  textSize(18);
  textAlign(CENTER);
  text("Moda: " + modeValue, x + w/2, y + 70);

  // disegno bolle per ogni valore
  for (let i = 0; i < valoriUnici.length; i++) {
    let valore = Number(valoriUnici[i]);
    let freq = frequenze[valore];

    let xBolla = map(valore, min(valoriC), max(valoriC), x + 100, x + w - 100);
    let yBolla = y + 160;

    let diametro = map(freq, 1, maxFrequenza, 20, 80);

    fill(accentColor[0], accentColor[1], accentColor[2], 80);
    noStroke();
    ellipse(xBolla, yBolla, diametro, diametro);
  }

  // trova la moda
  let moda = modeValue;
  let modaFreq = frequenze[moda];

  // disegno bolla speciale per la moda
  let xModa = map(Number(moda), min(valoriC), max(valoriC), x + 100, x + w - 100);
  let yModa = y + 160;
  let diametroModa = map(modaFreq, 1, maxFrequenza, 20, 80);

  fill(highlightColor[0], highlightColor[1], highlightColor[2], 180);
  stroke(255);
  strokeWeight(2);
  ellipse(xModa, yModa, diametroModa + 10, diametroModa + 10);

  // Etichetta della moda
  noStroke();
  fill(highlightColor[0], highlightColor[1], highlightColor[2]);
  textSize(14);
  textAlign(CENTER);
  text("Moda: " + moda, xModa, yModa - diametroModa/2 - 15);
}

function drawStdWaveCard(x, y, w, h) {
  if (typeof MeanValueE === 'undefined') return;

  // Informazioni numeriche
  fill(textColor);
  textSize(16);
  textAlign(CENTER);
  text("Media: " + MeanValueE.toFixed(2), x + w/2, y + 70);
  text("Deviazione Standard: " + St_DeviationValue.toFixed(2), x + w/2, y + 95);

  let centerY = y + 170;
  let graphWidth = w - 100;
  let startX = x + 50;

  // Linea della media
  stroke(accentColor);
  strokeWeight(2);
  line(startX, centerY, startX + graphWidth, centerY);

  // Calcolo ampiezza
  let valoriE = dataset.getColumn(4).map(Number);
  let minE = Math.min(...valoriE);
  let maxE = Math.max(...valoriE);
  let maxReasonableStd = Math.max((maxE - minE) / 2, 1e-6);
  let amp = map(St_DeviationValue, 0, maxReasonableStd, 2, 40);

  // Onda animata
  noFill();
  stroke(highlightColor);
  strokeWeight(2);
  
  beginShape();
  let frames = frameCount * 0.01;
  for (let px = 0; px <= graphWidth; px += 4) {
    let xPos = startX + px;
    let t = map(px, 0, graphWidth, 0, TWO_PI * 2);
    let y = centerY + sin(t + frames) * amp;
    vertex(xPos, y);
  }
  endShape();

  // Linee guida
  stroke(200, 80);
  strokeWeight(1);
  line(startX, centerY + amp, startX + graphWidth, centerY + amp);
  line(startX, centerY - amp, startX + graphWidth, centerY - amp);
}

// FUNZIONI DI CALCOLO ORIGINALI
function CalculateMean() {
  let valoriA = dataset.getColumn(0).map(Number);
  let somma = 0;
  for (let i = 0; i < valoriA.length; i++) {
    somma += valoriA[i];
  }
  MeanValue = somma / valoriA.length;
}

function CalculateS_Deviation() {
  let valoriB = dataset.getColumn(1).map(Number);
  let somma = 0;
  for (let i = 0; i < valoriB.length; i++) {
    somma += valoriB[i];
  }
  let mediaB = somma / valoriB.length;
  
  let sommaDifferenzeQuadrate = 0;
  for (let i = 0; i < valoriB.length; i++) {
    let differenza = valoriB[i] - mediaB;
    sommaDifferenzeQuadrate += differenza * differenza;
  }
  
  let varianza = sommaDifferenzeQuadrate / valoriB.length;
  S_DeviationValue = sqrt(varianza);
}

function CalculateMedian() {
  let numbers = dataset.getColumn(3).map(Number); 
  numbers.sort((a, b) => a - b);
  
  if (numbers.length % 2 === 0) {
    medianValue = (numbers[numbers.length/2 - 1] + numbers[numbers.length/2]) / 2;
  } else {
    medianValue = numbers[(numbers.length - 1)/2];
  }
}

function CalculateMode() {
  let values = dataset.getColumn(2).map(Number); 
  values.sort((a, b) => a - b);
  
  let currentCount = 1;
  let maxCount = 1;
  let currentValue = values[0];
  modeValue = currentValue;
  
  for (let i = 1; i < values.length; i++) {
    if (values[i] === currentValue) {
      currentCount++;
    } else {
      currentValue = values[i];
      currentCount = 1;
    }
    
    if (currentCount > maxCount) {
      maxCount = currentCount;
      modeValue = currentValue;
    }
  }
}

function CalculateMeanE() {
  let valoriE = dataset.getColumn(4).map(Number);
  let somma = 0;
  for (let i = 0; i < valoriE.length; i++) {
    somma += valoriE[i];
  }
  MeanValueE = somma / valoriE.length;
}

function CalculateSt_Deviation() {
  let valoriE = dataset.getColumn(4).map(Number);
  let somma = 0;
  for (let i = 0; i < valoriE.length; i++) {
    somma += valoriE[i];
  }
  let mediaE = somma / valoriE.length;
  
  let sommaDifferenzeQuadrate = 0;
  for (let i = 0; i < valoriE.length; i++) {
    let differenza = valoriE[i] - mediaE;
    sommaDifferenzeQuadrate += differenza * differenza;
  }
  
  let varianza = sommaDifferenzeQuadrate / valoriE.length;
  St_DeviationValue = sqrt(varianza);
}

// VISUALIZZAZIONE PRINCIPALE
function draw() {
  background(backgroundColor);
  
  // Disegna tutte le card
  for (let card of cards) {
    let x = (width - cardWidth) / 2;
    
    // Disegna la base della card
    drawCardBase(x, card.y, cardWidth, cardHeight, card.title);
    
    // Disegna il contenuto della card
    if (card.type === "visualization") {
      card.drawFunction(x, card.y, cardWidth, cardHeight);
    } else if (card.type === "text") {
      fill(textColor);
      textSize(32);
      textAlign(CENTER, CENTER);
      text(card.value.toFixed(2), x + cardWidth/2, card.y + cardHeight/2);
      
      // Descrizione
      textSize(14);
      fill(150);
      text(card.description, x + cardWidth/2, card.y + cardHeight/2 + 40);
    }
  }
  
  // Footer
  fill(150);
  textSize(12);
  textAlign(CENTER);
  text("Analisi Statistica - Dataset: data_filtro.csv", width/2, height - 20);
}