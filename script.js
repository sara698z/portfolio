//load vindue
window.addEventListener("load", sidenVises);

//lav variabler
let randTal;
let points;
let antalLivTilbage;
let speed;

const god1 = document.querySelector("#good_container1");
const god2 = document.querySelector("#good_container2");
const god3 = document.querySelector("#good_container3");
const bad1 = document.querySelector("#bad_container1");
const bad2 = document.querySelector("#bad_container2");

//indlæs siden og gå til startgame
function sidenVises() {
  console.log("sidenVises");
  //force reflow
  this.offsetLeft;
  //lyt om der bliver ændret størrelse af browser window
  window.addEventListener("resize", windowResize);
  //kald windowresize første gang siden vises
  windowResize;
  //skjul andre skærme og vis kun startskærm
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#info").classList.add("hide");
  document.querySelector("#start_knap").addEventListener("mousedown", visInfo);
}

function windowResize() {
  console.log("windowResize");
  let widthScreen = document.querySelector("#screen").clientWidth;
  let myFontInProducent = 5;
  let myFont = (widthScreen / 100) * myFontInProducent;
  document.querySelector("score_board").style.fontSize = myFont + "px";
}

function visInfo() {
  //skjul start, gameover og level complete-skærm og vis infoskærm
  document.querySelector("#start").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#info").classList.remove("hide");
  document.querySelector("#start_knap2").addEventListener("mousedown", startGame);
}

//definer hvad der skal ske, når spillet starter
function startGame() {
  document.querySelector("#liv1").classList.remove("gray");
  document.querySelector("#liv2").classList.remove("gray");
  document.querySelector("#liv3").classList.remove("gray");
  //skjul start, gameover og level complete-skærm
  document.querySelector("#start").classList.add("hide");
  document.querySelector("#info").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  //start bryllups-melodi
  document.querySelector("#sound_bryllup").volume = 0.1;
  document.querySelector("#sound_bryllup").currentTime = 0;
  document.querySelector("#sound_bryllup").play();

  //definer antal liv og point fra start
  antalLivTilbage = 3;
  points = 0;
  //udskriv point
  document.querySelector("#point").textContent = points + "/25";
  console.log("startGame");
  //start timer_animation
  document.querySelector("#time_container").classList.add("timer_animation");
  document.querySelector("#time_container").classList.add("tidpos");
  document
    //når tid slutter gå til stop spil
    .querySelector("#time_container")
    .addEventListener("animationend", stopSpillet);

  //lav eventlistener til god_1 og gå til point function, når der klikkes
  god1.addEventListener("mousedown", goodClickHandler);
  //tilføj fald-animation, random position og random delay på god_1
  god1.classList.add("fald");
  randTal = Math.floor(Math.random() * 5) + 1;
  god1.classList.add("pos" + randTal);
  randTal = Math.floor(Math.random() * 3) + 1;
  god1.classList.add("delay" + randTal);
  //lav function der mister et liv når god rammer bund af skærm
  // altså (hver gang fald-animationen har kørt 1 gang)
  god1.addEventListener("animationiteration", mistLiv);

  //lav eventlistener til god_2 og gå til point function, når der klikkes
  god2.addEventListener("mousedown", goodClickHandler);
  //tilføj fald-animation, random position og random delay på god_2
  god2.classList.add("fald");
  randTal = Math.floor(Math.random() * 5) + 1;
  god2.classList.add("pos" + randTal);
  randTal = Math.floor(Math.random() * 3) + 1;
  god2.classList.add("delay" + randTal);
  //lav function der mister point når god_2 rammer bund af skærm
  // altså (hver gang fald-animationen har kørt 1 gang)
  god2.addEventListener("animationiteration", mistLiv);

  //lav eventlistener til god_3 og gå til point function, når der klikkes
  god3.addEventListener("mousedown", goodClickHandler);
  //tilføj fald-animation, random position og random delay på god_2
  god3.classList.add("fald");
  randTal = Math.floor(Math.random() * 5) + 1;
  god3.classList.add("pos" + randTal);
  randTal = Math.floor(Math.random() * 3) + 1;
  god3.classList.add("delay" + randTal);
  //lav function der mister point når god_2 rammer bund af skærm
  // altså (hver gang fald-animationen har kørt 1 gang)
  god3.addEventListener("animationiteration", mistLiv);

  //lav eventlistener til bad_1 og mist liv, når der klikkes
  bad1.addEventListener("mousedown", badClickHandler);
  //tilføj fald-animation, random position og random delay på bad_1
  bad1.classList.add("fald");
  randTal = Math.floor(Math.random() * 5) + 1;
  bad1.classList.add("pos" + randTal);
  randTal = Math.floor(Math.random() * 3) + 1;
  bad1.classList.add("delay" + randTal);
  //tilføj genstart function til bad_1
  bad1.addEventListener("animationiteration", badGenstart);
  //lav eventlistener til bad_2 og mist liv, når der klikkes
  bad2.addEventListener("mousedown", badClickHandler);
  //tilføj fald-animation, random position og random delay på bad_2
  bad2.classList.add("fald");
  randTal = Math.floor(Math.random() * 5) + 1;
  bad2.classList.add("pos" + randTal);
  randTal = Math.floor(Math.random() * 3) + 1;
  bad2.classList.add("delay" + randTal);
  //tilføj genstart function til bad_2
  bad2.addEventListener("animationiteration", badGenstart);
}

//lav function til når der klikkes på god
function goodClickHandler() {
  console.log("goodClickHandler");
  //tilføj frys og forsvind-animationer på god_1
  this.classList.add("frys");
  this.firstElementChild.classList.add("forsvind_god");
  console.log("givPoint");
  points++;
  document.querySelector("#point").innerHTML = points + "/25";
  //få god_1 til at genstarte
  this.addEventListener("animationend", goodGenstart);
  //undersøg point og få hastighed til at stige

  if (points >= 5) {
    console.log("10 point");
    speed = 1;
  }
  if (points >= 10) {
    console.log("10 point");
    speed = 2;
  }
  if (points >= 15) {
    console.log("10 point");
    speed = 3;
  }

  // TODO: Lav kode der tilfældigt vælger mellem kling og pling-lyd

  if (Math.random() < 0.5) {
    document.querySelector("#sound_god1").vol = 0.5;
    document.querySelector("#sound_god1").currentTime = 0;
    document.querySelector("#sound_god1").play();
  } else {
    document.querySelector("#sound_god2").volume = 0.5;
    document.querySelector("#sound_god2").currentTime = 0;
    document.querySelector("#sound_god2").play();
  }
}
//lav function der får good til at genstarte
function goodGenstart() {
  console.log("goodGenstart");
  //fjern alle klasser fra god_1
  this.classList = "";
  this.firstElementChild.classList = "";
  //force reflow
  this.offsetLeft;
  //tiløj fald-animation igen
  this.classList.add("fald");
  //tilføj random position
  randTal = Math.floor(Math.random() * 5) + 1;
  this.classList.add("pos" + randTal);
}

//lav function til når der klikkes på bad
function badClickHandler() {
  console.log("badClickHandler");
  console.log("mistLiv");
  // TODO: Spil lyd for bombe
  document.querySelector("#sound_vissen").volume = 0.5;
  document.querySelector("#sound_vissen").play();
  //tilføj frys og forsvind-animationer
  this.classList.add("frys");
  this.firstElementChild.classList.add("forsvind_bad");
  this.addEventListener("animationend", badGenstart);
  //sørg for at man mister 1 liv, når der klikkes
  document.querySelector("#liv" + antalLivTilbage).classList.add("gray");
  //undersøg antal liv, hvis der ikke er flere liv, gå til stop spillet
  antalLivTilbage--;
  if (antalLivTilbage <= 0) {
    console.log("0 liv");
    stopSpillet();
  }
}
//lav function genstarter bad_elementer
function badGenstart() {
  console.log("badGenstart");
  //fjern alle klasser fra bad
  this.classList = "";
  this.firstElementChild.classList = "";
  //force reflow
  this.offsetLeft;
  //tilføj fald-animation på bad igen
  this.classList.add("fald");
  //giv random position
  randTal = Math.floor(Math.random() * 5) + 1;
  this.classList.add("pos" + randTal);
}

//lav function, der giver minus-point
function mistLiv() {
  console.log("mistLiv");
  if (Math.random() < 0.5) {
    document.querySelector("#sound_bad").volume = 0.5;
    document.querySelector("#sound_bad").currentTime = 0;
    document.querySelector("#sound_bad").play();
  } else {
    document.querySelector("#sound_bad2").volume = 0.5;
    document.querySelector("#sound_bad2").currentTime = 0;
    document.querySelector("#sound_bad2").play();
  }
  //fjern alle klasser fra good og få den til at genstarte(ligesom i genstart)
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;
  this.classList.add("fald");
  randTal = Math.floor(Math.random() * 5) + 1;
  this.classList.add("pos" + randTal);
  //sørg for at man mister 1 liv, når god falder til bund
  document.querySelector("#liv" + antalLivTilbage).classList.add("gray");
  //undersøg antal liv, hvis der ikke er flere liv, gå til stop spillet
  antalLivTilbage--;
  if (antalLivTilbage <= 0) {
    console.log("0 liv");
    stopSpillet();
  }
}

function stopSpillet() {
  console.log("stopSpillet");
  //ryd op, fjern alle klasser på good-elementer
  god1.classList = "";
  document.querySelector("#good_sprite1").classList = "";
  god2.classList = "";
  document.querySelector("#good_sprite2").classList = "";
  god3.classList = "";
  document.querySelector("#good_sprite3").classList = "";

  //ryd op, fjern alle eventlistener på good-elementer
  god1.removeEventListener("animationend", goodGenstart);
  god2.removeEventListener("animationend", goodGenstart);
  god3.removeEventListener("animationend", goodGenstart);

  //ryd op, fjern alle klasser på bad-elementer
  bad1.classList = "";
  document.querySelector("#bad_sprite1").classList = "";

  //ryd op, fjern alle eventlistener på bad-elementer
  bad1.removeEventListener("mousedown", badClickHandler);
  bad1.removeEventListener("animationiteration", badGenstart);
  bad1.removeEventListener("animationend", badGenstart);

  bad2.removeEventListener("mousedown", badClickHandler);
  bad2.removeEventListener("animationiteration", badGenstart);
  bad2.removeEventListener("animationend", badGenstart);

  //ryd op, fjern timer_animation
  document.querySelector("#time_container").classList.remove("timer_animation");

  //undersøg om der er liv tilbage, gå til game over hvis 0 liv
  if (antalLivTilbage <= 0) {
    gameOVer();
  }
  //undersøg om der er point nok til at vinde, gå til level complete hvis 25 point
  if (points >= 25) {
    levelComplete();
  }
  if (points < 25) {
    gameOVer();
  }
}

//lav gameover function
function gameOVer() {
  console.log("GAME OVER");
  document.querySelector("#game_over").classList.remove("hide");
  document.querySelector("#spil_igen1").addEventListener("click", startGame);
  document.querySelector("#game_over_points").textContent = "Du har samlet " + points + "/25 blomster";
  document.querySelector("#sound_taber").play();
}

//lav level complete function
function levelComplete() {
  console.log("level complete");
  document.querySelector("#level_complete").classList.remove("hide");
  document.querySelector("#spil_igen2").addEventListener("click", startGame);
  document.querySelector("#level_complete_points").textContent = "Du har samlet " + points + "/25 blomster";
}
