//DEFINIZIONE VARIABILI//
let dataset; //contiene dataset filtrato
let stats = {} //contiene i risultati numerici ottenuti (media, mediana ecc.)
let medianValue = 0; // <-- AGGIUNTA: variabile globale(dichiarata fuori dalla funzione) per salvare la mediana

//CARICAMENTO CONTENUTI//
function preload() {
  dataset = loadTable("data_filtro.csv", "csv", "header")
}

//CALCOLO DEI RISULTATI NUMERICI//
function setup() {
  createCanvas(400, 400);
  CalculateMedian(); //calcola e mostra la mediana appena lo sketch parte
  textSize(20) // <-- AGGIUNTA: impostiamo la dimensione del testo
}

function CalculateMedian() {
  let numbers = dataset.getColumn(3).map(Number); //prendo tutti i valori della colonna D (indice 3), la parte del map trasforma ogni elemento della colonna da stringa a numero (evita che nelle somme accosti le due stringhe senza sommarle)
  numbers.sort((a, b) => a - b); //mette i numeri in ordine crescente, in modo ordinato, fondamentale per la mediana
  medianValue = 0; // <-- AGGIUNTA: inizializzo la mediana nella variabile globale
  if(numbers.length % 2 === 0) { //controllo se il numero è pari//
    medianValue = (numbers[numbers.length / 2-1] + numbers [numbers.length / 2]) /2;
  } else { //lo faccio in caso i numeri siano dispari e che la mediana mi risulti 0
    medianValue = numbers [(numbers.length - 1) /2];
  }
  //MOSTRO I RISULTATI IN CONSOLE//
  console.log("valori colonna D", numbers);
  console.log("mediana colonna D:", medianValue);
}

function draw() {
  background(220);
  fill(0);
  textAlign(LEFT);
  text("Mediana colonna D: " + medianValue, 20, 50); // <-- AGGIUNTA: visualizzo la mediana sul canvas
}
