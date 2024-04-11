function setup() {
  // Ændrer canvas størrelse til 1300x700 og centrerer det på siden
  var canvas = createCanvas(1300, 700);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 3;
  canvas.position(x, y);

  start = millis(); // Gemmer starttidspunktet for spillet
}

var vinder = 0; // Antal point vundet
var moleX; // X-koordinat for muldvarpen
var moleY; // Y-koordinat for muldvarpen
var bombX; // X-koordinat for bomben
var bombY; // Y-koordinat for bomben
var start; // Starttidspunktet for spillet
var milliseconds = 900; // Tid mellem muldvarpebevægelser
var tegnmole = false; // Angiver om muldvarpen skal tegnes
var moleVisning = false; // Angiver om muldvarpen skal vises eller ej
let moleimg; // Billedet af muldvarpen
var gameOver = false; // Angiver om spillet er slut
let bombimg; // Billedet af bomben

document.addEventListener('DOMContentLoaded', function() {
  var genstartKnap = document.getElementById('genstartKnap');
  genstartKnap.addEventListener('click', function() {
    // Nulstil spilvariablerne og start et nyt spil
    vinder = 0;
    gameOver = false;
    setup(); // Kald setup-funktionen for at starte et nyt spil
  });
});

function preload(){
  moleimg = loadImage("mole.png"); // Indlæser billedet af muldvarpen
  bombimg = loadImage("bomb.png"); // Indlæser billedet af bomben
}

function mouseClicked() {
  if (!gameOver) {
    var distanceToMole = int(dist(mouseX, mouseY, moleX, moleY));
    var distanceToBomb = int(dist(mouseX, mouseY, bombX, bombY));
    
    if (distanceToMole <= 50) {
      console.log("Muldvarp blev klikket!");
      vinder++; // Øger antallet af point
      if (vinder > highScore) {
        highScore = vinder; // Opdaterer højeste score
      }
    } else if (distanceToBomb <= 30) { // Justerer radius i forhold til bombestørrelse
      console.log("Bomben blev klikket! Spillet er slut!");
      gameOver = true; // Angiver at spillet er slut
    }
  }
}

function draw() {
  background(100, 100, 10); // Baggrundsfarve

  // Titel
  fill(0);
  textSize(50);
  text("Whack a mole!", width / 2 - 150, 50); // Centreret titel

  // Huller
  fill(100,42,42);
  var holeSize = 60; // Størrelse på hullerne
  var moleSize = 90; // Mindsket størrelse af muldvarpen
  var moleOffsetX = 10; // Justerer muldvarpens X-offset (til venstre)
  var moleOffsetY = 20; // Justerer muldvarpens Y-offset mod midten af hullet

  // Tegner hullerne
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      rect(width / 2 - 150 + j * 100 - moleOffsetX, height / 2 - 100 + i * 100 - moleOffsetY, holeSize, holeSize);
    }
  }

  // Viser vinder
  textSize(20);
  text("Point:", width / 2 - 50, height / 2 + 200);
  text(vinder, width / 2 + 20, height / 2 + 200);

  // Tjekker om det er tid til muldvarpens bevægelse
  if (millis() - start > milliseconds) {
    moveMole(); // Kalder moveMole-funktionen for at flytte muldvarpen
    start = millis(); // Opdaterer starttidspunktet
  }

  // Tegner muldvarpen kun hvis moleVisning er sand
  if (moleVisning) {
    // Tegner billedet af muldvarpen med justeringer for centrering og størrelse
    image(moleimg, moleX - moleSize / 2, moleY - moleSize / 2, moleSize, moleSize);
  }
  
  // Tegner bomben
  image(bombimg, bombX - 30, bombY - 30, 60, 60);

  // Tjekker om spillet er slut og viser spillets sluttekst
  if (gameOver) {
    gameOverText();
  }
}

function moveMole() {
  var possibleX = [width/2 - 135, width/2 - 35, width/2 + 65]; // Centrerede mulige X-koordinater
  var possibleY = [height/2 - 85, height/2 + 15, height/2 + 115]; // Centrerede mulige Y-koordinater

  // Tildeler tilfældigt muldvarpens position
  moleX = random(possibleX);
  moleY = random(possibleY);

  // Tildeler tilfældigt bombens position, og sikrer at den ikke er i samme felt som muldvarpen
  do {
    bombX = random(possibleX);
    bombY = random(possibleY);
  } while (bombX === moleX && bombY === moleY);

  // Tilfældigt sætter moleVisning til sand eller falsk for at skabe perioder med stilhed
  moleVisning = random() > 0.2; // Juster tærsklen efter behov
}

function gameOverText() {
  fill(255, 0, 0);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Spillet er slut!", width / 2, height / 2); // Viser spillets sluttekst centralt
}


