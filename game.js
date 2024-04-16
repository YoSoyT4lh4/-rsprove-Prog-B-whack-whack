var countdown; // variable for countdown 
var countdowntid = 5000; // tid sat til 5 sekunder (5000 milisekunder)
var vinder = 0; // antal pointsx vundet
var moleX; // x pos for muldvarpen
var moleY; // y pos for muldvarpen
var bombX; // x pos for bomben
var bombY; // y pos for bomben
var start; // starttid for spillet
var milliseconds = 660; // tid mellem muldvarpebevægelser man kan skru op eller ned hvis den er for nemt/svært
var tegnmole = false; //  muldvarpen skal tegnes == false
var molevist = false; // anden variablen om muldvarpen skal vises eller ej
let moleimg; // billede af muldvarpen
var gameover = false; // skal spillet sluttes
let bombimg; // billeder af bomben
let highestScore = 0; // highscore

function setup() { // setup funktion
  var canvas = createCanvas(1300, 600); // størrelsen af vores canvas
  var x = (windowWidth - width) / 2; 
  var y = (windowHeight - height) / 3;
  canvas.position(x, y); // centrerer i midten af skærmen

  start = millis(); // holder starttidspunktet for spillet

  countdown = countdowntid; // sætter countdown til den fulde tid ved starten

  // laver genstartsknap
  var GenstartKnap = createButton('Genstart');
  GenstartKnap.position(x + 570, y + 890 + height - 850); // knap pos
  //GenstartKnap.position()
  GenstartKnap.mousePressed(GenstartSpil); // hvis knapen er klikket på, kører den GenstartSpil functionen
  GenstartKnap.id('genstartKnap'); // giver knappen en id
}




function GenstartSpil() { // hvis GenstartSpil funktionen bliver kaldt skal den:
  //reset disse variabler
  vinder = 0;
  gameover = false;
  setup(); // kalder setup funktionen for at starte et nyt spil
}

function preload(){
  moleimg = loadImage("mole.png"); // load billedet af muldvarpen
  bombimg = loadImage("bomb.png"); // load billedet af bomben
}

function mouseClicked() {
  if (!gameover) { // hvis gameover er false
    var distanceToMole = int(dist(mouseX, mouseY, moleX, moleY)); // finder afstanden mellem molen, og og vores mus
    var distanceToBomb = int(dist(mouseX, mouseY, bombX, bombY));
    
    if (distanceToMole <= 50) {
      console.log("Muldvarp blev klikket!");
      vinder++; //  antallet af point stiger
      if (vinder > highestScore) {
        highestScore = vinder; // ny højeste score
      }
      countdown = countdowntid; // ny countdown ved at klikke på muldvarpen
    } else if (distanceToBomb <= 30) { 
      console.log("Bomben blev klikket! Spillet er slut!");
      gameover = true; // gameover og at spillet er slut
    }
  }
}

function draw() { 
  background(160, 80, 51); // Baggrundsfarve

  // Titel
  fill(0);
  textSize(20);
  text("Whack a mole!", width / 2 - 1, 50); //  titel og position

  fill(0)
  text("Bedste Score: " + highestScore, 100, 30); // Viser den højeste score


  // Tjekker om det er tid til at tælle ned
  if (!gameover && countdown > 0) {
    countdown -= deltaTime; // .

    // Viser countdown tiden
    textSize(20);
    fill(255);
    textAlign(CENTER);
    text("Tid tilbage: " + (countdown / 1000).toFixed(1), width / 2.1, height - 60); //plasering af vores tid tilbage tekst

    // tjekker om tiden er udløbet
    if (countdown <= 0) {
      gameover = true; // spillet er slut
    }
  }

  // Huller
  fill(100,42,42);
  var holestr = 60; // Størrelse på hullerne
  var molestr = 90; //  størrelse af muldvarpen
  var molepos = 10; // position(til venstre)
  var molepos2 = 20; // position midten af hullet

  // Tegner hullerne
  for (let i = 0; i < 3; i++) { // for loop/ løkke der går gennem rækkerne af rektangler (3 rækker). ved at lave en condition at i < 3
    for (let j = 0; j < 3; j++) {  // her har vi det samme, og j kørere så længe j er mindre end 3, altså den kører 3 gange for hver kolonne af rektangler
      rect(width / 2 - 150 + j * 100 - molepos, height / 2 - 100 + i * 100 - molepos2, holestr, holestr); // for hvert loop beregnes positionen
    }
  }

  // Viser vinder
  textSize(20);
  text("Point:", width / 2 - 50, height / 2 + 200);
  text(vinder, width / 2 + 20, height / 2 + 200);

  // tjekker om det er tid til muldvarpens bevægelse
  if (millis() - start > milliseconds) {
    moveMole(); // Kalder movemole funktionen for at flytte muldvarpen
    start = millis(); // ny starttidspunktet
  }

  if (molevist) { // hvis molevist er trur
    // Tegner billedet af muldvarpen med justeringer for centrering og størrelse
    image(moleimg, moleX - molestr / 2, moleY - molestr / 2, molestr, molestr);
  }
  
  // tegner bomben
  image(bombimg, bombX - 30, bombY - 30, 60, 60);

  // Tjekker om spillet er slut og viser spillets sluttekst
  if (gameover) {
    gameoverText();
  }
}

function moveMole() {
  var possibleX = [width/2 - 135, width/2 - 35, width/2 + 65]; // 
  var possibleY = [height/2 - 85, height/2 + 15, height/2 + 115]; // 

  // random og tilfældigt  position af muldvarpens
  moleX = random(possibleX);
  moleY = random(possibleY);

  // tilfældigt bombens position men er ikke det samme felt som muldvarpen
  do {
    bombX = random(possibleX);
    bombY = random(possibleY);
  } while (bombX === moleX && bombY === moleY);

  
  molevist = random() > 0.2; // Juster tærsklen efter behov
}

function gameoverText() {
  fill(255, 0, 0);
  textSize(45);
  textAlign(CENTER, CENTER);
  text("Spillet er slut!", width / 2, height / 2); //  viser gameover teksten
}