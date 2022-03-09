const boxes = document.querySelectorAll(".boxes");
const score = document.querySelectorAll(".score");
const over = document.querySelectorAll(".over");
const gameOver = document.querySelectorAll(".gameOver");
const ball = document.getElementsByClassName("ball");

var start = true;
var toTop = 1;

var left = 1;

var Colides = 0;

var totalScore = 0;

var howMuchColide = Math.floor(Math.random() * 7);

var defaultballLeft  = '50%'
var defaultballTop  = '80%'



function MoveBall() {

  const ballLeft = parseInt(getComputedStyle(ball[0]).getPropertyValue("left"));

  const balltop = parseInt(getComputedStyle(ball[0]).getPropertyValue("top"));

  const paddle = document.getElementsByClassName("plate");

  const paddleBottom = paddle[0].getBoundingClientRect().bottom;

//Checking corners of page

  if (ballLeft < 0 || ballLeft > window.innerWidth) {
    left = -left;
  }
  if (balltop < 0) {
    toTop = -toTop;
  }

//   Game Over --------------------------------------_______________________________

  if (balltop > paddleBottom) {


    over[0].innerHTML = "Game over Your score is " + totalScore;
    start = false;
    gameOver[0].style.display = "block";
  }

  ball[0].style.left = ballLeft + 10 * left + "px";
  ball[0].style.top = balltop - 10 * toTop + "px";
}




// Checking ball and brick collision  __________________________________________________________________

function checkCollision() {

  boxes.forEach((element) => {
    const box = element.getBoundingClientRect();
    const ballDetail = ball[0].getBoundingClientRect();

    if (
      ballDetail.right > box.left &&
      ballDetail.top < box.bottom &&
      ballDetail.bottom > box.top &&
      ballDetail.left < box.right &&
      !element.classList.contains("colide")
    ) {

      element.style.visibility = "hidden";
      left = -left;
      element.style.visibility = "hidden";
      element.classList.add("colide");
      Colides++;
      totalScore++;
      score[0].innerHTML = "Score=" + totalScore;

      if (Colides >= howMuchColide) {
        toTop = -toTop;
        Colides = 0;
        howMuchColide = Math.floor(Math.random() * 7);
      }
    }
  });
}

// Running the game  _________________________________________________________________
setInterval(() => {
  if (start) {
    MoveBall();

    checkCollision();

    paddleCollide();

    movePaddle();

  }
}, 19);

// Moving paddle ______________________________________________________


let Toleft = false;
let right = false;

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    Toleft = true;
  }
  if (e.keyCode == 37) {
    right = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    Toleft = false;
  }
  if (e.keyCode == 37) {
    right = false;
  }
});

function movePaddle() {
  const paddle = document.getElementsByClassName("plate");
  const paddleLeft = paddle[0].getBoundingClientRect().left;
  const paddleRight = paddle[0].getBoundingClientRect().right;

  if (paddleRight < window.innerWidth) {
    if (Toleft == true) {

      paddle[0].style.left = paddleLeft + 40 + "px";
    }
  }
  if (paddleLeft > 0) {
    if (right == true) {
      paddle[0].style.left = paddleLeft - 40 + "px";
    }
  }
}




// Detecting paddle and ball collision  ____________________________________________________________

function paddleCollide() {
  const paddle = document.getElementsByClassName("plate");

  const ballBottom = ball[0].getBoundingClientRect().bottom;
  const paddleTop = paddle[0].getBoundingClientRect().top;
  const paddleLeft = paddle[0].getBoundingClientRect().left;
  const paddleRight = paddle[0].getBoundingClientRect().right;
  const ballleft = ball[0].getBoundingClientRect().left;
  const ballright = ball[0].getBoundingClientRect().right;

  if (
    paddleTop < ballBottom &&
    paddleLeft < ballleft &&
    paddleRight > ballright
  ) {
    toTop = -toTop;
  }
}


// Setting brick color __________________________________________________


function brickColor() {
  const colors = ["#145DA0", "#0C2D48", "#2E8BC0"];
//   const colors = ["linear-gradient(to left, #648ecd, #00b0ea, #00ced3, #00e38a, #a8eb12)", " linear-gradient(to left, #7164cd, #e84eab, #ff6461, #ffaa00, #a8eb12)", " linear-gradient(to left, #c6c1e9, #b5c8ef, #a6cff0, #9cd5ea, #9adae1)"];
  boxes.forEach((element) => {
    const r = Math.floor(Math.random() * colors.length);
    element.style.backgroundColor = colors[r];
  });
}
brickColor();


// Start new game ____________________________________________________

function startAgain() {
  const paddle = document.getElementsByClassName("plate");

    start=true
    gameOver[0].style.display = "none";

    totalScore =0
    ball[0].style.top ='85%'
    ball[0].style.left = '50%'
    paddle[0].style.left = '45%'
    paddle[0].style.bottom = '10%'

    boxes.forEach((e)=>{
        e.style.visibility='visible'
        e.classList.remove("colide");
    })
}
