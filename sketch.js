/* You're in Movie Land, waiting to take a picture
behind the boards of your favourite movies */

var capture;
var board01;
var board02;
var board03;
var snap;

var mySong01;
var mySong02;
var mySong03;
var analyzer;


function preload() {

  //--Loading my external material, cardboards and music
  mySong01 = loadSound("./assets/greatGatsby.mp3");
  mySong02 = loadSound("./assets/titanic.mp3");
  mySong03 = loadSound("./assets/starWars.mp3");

  board01 = loadImage('assets/gatsby.png');
  board02 = loadImage('assets/titanic.png');
  board03 = loadImage('assets/yoda.png');
}


function setup() {

  //--Setting my canvas
  createCanvas(windowWidth, windowHeight);
  background('black');

  //--Setting your webcam
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();

  //--Setting the button to take a picture
  snap = createButton('Save your Sounvenir');
  snap.position((windowWidth / 2) - 75, windowHeight - (windowHeight / 5));
  snap.size(150, 40);
  snap.mousePressed(savePhoto);

  //--Analysing my songs
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong01);
  analyzer.setInput(mySong02);
  analyzer.setInput(mySong03);

}


function draw() {

  //--Webcam is ready
  var myImage = capture.loadPixels();
  image(myImage, (windowWidth / 2) - 320, (windowHeight / 2) - 320, 640, 480);

  //--I fliped the webcam to make it easier to fit in the hole
  push();
  translate((windowWidth / 2) + 320, (windowHeight / 2) - 320);
  scale(-1.0, 1.0);
  image(capture, 0, 0);
  pop();

  //--My songs are under control
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, height);

  //--My key directions are ready to work
  keyTyped();

  //--Instructions
  push();
    let myText = "Press 'a', 's', 'd', to change your favourite movie to appear in";
    noStroke();
    fill('White');
    textStyle(BOLD);
    textSize(20);
    textAlign(CENTER,CENTER);
    text(myText, windowWidth / 2, windowHeight - (windowHeight / 13));
  pop();

}

function keyTyped() {

  //--This function changes my cardboards and songs
  if (key === 'a') {
    //--Show first cardboard after clicking 'a'
    image(board01, (windowWidth / 2) - (board01.width / 2), (windowHeight / 2) - (board01.height / 2), board01.width, board01.height);
    //--Text
    push();
    var myText = "Your favourite party crasher";
    drawingContext.font = "60px Righteous";
    drawingContext.textAlign = "center";
    fill('RoyalBlue');
    text(myText, windowWidth / 2, windowHeight - (windowHeight / 4));
    pop();
    //--Play soundtrack
    if (mySong02.isPlaying() == true) {
      mySong02.stop();
    } else if (mySong03.isPlaying() == true) {
      mySong03.stop();
    } else if (mySong01.isPlaying() == false) {
      mySong01.play();
    }
  }
    else if (key === 's') {
    //--Show first cardboard after clicking 's'
    image(board02, (windowWidth / 2) - (board02.width / 2), (windowHeight / 2) - (board02.height / 2), board02.width, board02.height);
    //--Text
    push();
    var myText = "Hold me like Leo before a shipwreck";
    drawingContext.font = "60px Crimson Pro";
    drawingContext.textAlign = "center";
    fill('LightYellow');
    text(myText, windowWidth / 2, windowHeight - (windowHeight / 4));
    push();
    //--Play soundtrack
    if (mySong01.isPlaying() == true) {
      mySong01.stop();
    } else if (mySong03.isPlaying() == true) {
      mySong03.stop();
    } else if (mySong02.isPlaying() == false) {
      mySong02.play();
    }

  }
    else if (key === 'd') {
    //--Show first cardboard after clicking 'd'
    image(board03, (windowWidth / 2) - (board03.width / 2), (windowHeight / 2) - (board03.height / 2), board03.width, board03.height);
    //--Text
    push();
    var myText = "May p5 be with you";
    drawingContext.font = "60px Turret Road";
    drawingContext.textAlign = "center";
    fill('Lime');
    text(myText, windowWidth / 2, windowHeight - (windowHeight / 4));
    pop();
    //--Play soundtrack
    if (mySong01.isPlaying() == true) {
      mySong01.stop();
    } else if (mySong02.isPlaying() == true) {
      mySong02.stop();
    } else if (mySong03.isPlaying() == false) {
      mySong03.play();
    }
  }
}


function savePhoto() {

  //--This function gets you your souvenir from Movie Land
  saveCanvas('Souvenir', 'jpg');
}
