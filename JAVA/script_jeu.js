let tentative = 0
let idTentative = 0
let item = 0
let bobChoose = []
let gameOn = false
let affichage = false
let color1,color2,color3,color4
let nameUs = ""

function game() {
  if (gameOn == true) {
    window.location.reload();
  }
  texte = document.getElementById("start");
  texte.innerHTML = "Partie en cour ! Cliquez pour recharger la page";
  console.log(texte);
  randomChoose()
  colorSelect = document.getElementById("color-select")
  colorSelect.style.display = "grid";
  gameOn = true
}

function randomChoose() {
  const color = ["red", "blue", "yellow", "purple", "green", "black", "white", "orange"]
  color1 = arrayRandom(color)
  color2 = arrayRandom(color)
  color3 = arrayRandom(color)
  color4 = arrayRandom(color)
  console.log("La couleur 1 est "+color1,"La couleur 2 est "+color2,"La couleur 3 est "+ color3,"La couleur 4 est "+ color4);
  bobChoose.push(color1, color2, color3, color4)
}

function printCheat() {
  console.log("JE PRINT CHEAT");
  let cheat = document.getElementById("cheat")
  console.log(color1, color2, color3, color4);
  
  if (affichage==false) {
    cheat.innerHTML = (`<h2>Le choix de bob !</h2>
      <div class="`
  + color1 +
  `"></div>
      <div class="`
  + color2 +
  `"></div>
      <div class="`
  + color3 +
  `"></div>
      <div class="`
  + color4 +
  `"></div>
      `)
  affichage = true
  }
  else {
    cheat.innerHTML = (`
      <div class="try" id="cheat">
      `)
      affichage = false
  }

}

function arrayRandom(a) {
  return a[Math.floor(Math.random() * a.length)];
}

function putcolor(color) {
  tentative += 1
  console.log("La couleur selctionner pour id="+tentative+" est "+color);
  document.getElementById("rond-" + tentative).classList.add(color);

  document.getElementById("rond-" + tentative).classList.remove("rond-vide");

  // essaie.insertAdjacentHTML("beforeend", `<div class="`+color+`"></div>`)
  if (tentative % 4 == 0) {
    verifColor()
  }
}

function verifColor() {
  idTentative += 1
  let j = 3
  let veriftab = []

  base = document.getElementById("rond-" + (item + 4))


  for (let i = 4; i > 0; i--) {
    console.log("valeur de i : "+i,"valeur de j : "+j);
    console.log("Bob choose de J :"+bobChoose[j]);
    console.log("class name de i :"+document.getElementById("rond-" + (item + 1)).className);

    if (bobChoose[j] == document.getElementById("rond-" + (item + i)).className) {
      base.insertAdjacentHTML("afterend", `<div class="green"></div>`)
      console.log("Pour "+i+" c'est vert");
      veriftab.push("green")
    }  
    else if (bobChoose.includes(document.getElementById("rond-" + (item + i)).className)) {
      base.insertAdjacentHTML("afterend", `<div class="orange"></div>`)
      veriftab.push("orange")
      console.log("Pour "+i+" c'est orange");
    } 
    else{
      //couleur rouge
      base.insertAdjacentHTML("afterend", `<div class="red"></div>`)
      veriftab.push("red")
      console.log("Pour "+i+" c'est rouge");
    }
  j--
  }
  console.log(veriftab);
  item+=4
  if (veriftab[0] == "green" && veriftab[1] == "green" && veriftab[2] == "green" && veriftab[3] == "green") {
    console.log("C'est gagné ! en "+idTentative+" tentative");
    for (let index = idTentative+1; index < 8; index++) {
        let supprimerResult = document.getElementById(index)
        supprimerResult.className = "disparaitre"
        let supprimerBarre = document.getElementById("barre")
        supprimerBarre.className = "barreNon"
        let bobResult = document.getElementById("bob")
        bobResult.className = "apparaitre"
    }

    win()
  }
}

function win() {
  printCheat();
  let users = JSON.parse(localStorage.getItem('users')) || [];

  if (!Array.isArray(users)) {
      console.error("Les données stockées ne sont pas valides.");
      return;
  }
  users = users.map(user => {
      if (user.statut == "Active") {
          if (!Array.isArray(user.lastFiveMasMas)) {
              user.lastFiveMas = [];
          }
          user.lastFiveMas.push(idTentative);
          if (user.lastFiveMas.length > 5) {
              user.lastFiveMas.shift();
          }
      }
      return user;
  });
  // Sauvegarder les utilisateurs mis à jour
  localStorage.setItem('users', JSON.stringify(users));
  
}

function userName() {
  let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.map(user => {
        if (user.statut == "Active") {
            nameUs = user.nom
            console.log(nameUs);
            base = document.querySelector("h1")
            base.insertAdjacentHTML("afterend", `<h3 class="nameus">Bonjour, `+nameUs+` vous êtes connecté !</h3>`)
        }
    });  
}
