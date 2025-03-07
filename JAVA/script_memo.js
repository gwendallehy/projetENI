let rows, cols, images = [], flippedCards = [], matchedPairs = 0;
let availableImages = {};
let idTentative = 0
fetch("../memory.json") // Charge la liste des images au lancement
   .then(response => response.json())
   .then(data => availableImages = data)

function game() {
   const gridSize = document.getElementById("gridSize").value.split("x");
   rows = parseInt(gridSize[0]);
   cols = parseInt(gridSize[1]);
   const imgType = document.getElementById("imgType").value;
   images = randomImages(rows * cols / 2, imgType);
   printImages();
}

function randomImages(count, folder) {
   let imgArray = availableImages[folder].slice(0, count); // Prend X images
    console.log(imgArray);
   return shuffleArray([...imgArray, ...imgArray]); // Double pour paires
}

function printImages() {
   const gameBoard = document.getElementById("gameBoard");
   gameBoard.innerHTML = "";
   gameBoard.style.gridTemplateColumns = `repeat(${cols}, 100px)`;
   gameBoard.style.gridTemplateRows = `repeat(${rows}, 100px)`;
   images.forEach((fileName, index) => {
       const card = document.createElement("div");
       card.classList.add("card");
       card.dataset.index = index;
       const img = document.createElement("img");
       img.src = `../img_memo/${document.getElementById("imgType").value}/${fileName}`;
       card.appendChild(img);
       card.addEventListener("click", () => turnImgVerif(card));
       gameBoard.appendChild(card);
   });
}
function turnImgVerif(card) {
   if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
       card.classList.add("flipped");
       flippedCards.push(card);
       if (flippedCards.length === 2) {
            idTentative++
           console.log(idTentative);
           setTimeout(checkMatch, 800);
           
       }
   }
}
function checkMatch() {
   let [card1, card2] = flippedCards;
   if (card1.children[0].src === card2.children[0].src) {
       matchedPairs++;
       if (matchedPairs === images.length / 2) {
           win();
       }
   } else {
       card1.classList.remove("flipped");
       card2.classList.remove("flipped");
   }
   flippedCards = [];
}

function win() {
   setTimeout(() => alert("Bravo, vous avez gagné !"), 300);
   let users = JSON.parse(localStorage.getItem('users')) || [];

  if (!Array.isArray(users)) {
      console.error("Les données stockées ne sont pas valides.");
      return;
  }
  users = users.map(user => {
      if (user.statut == "Active") {
          if (!Array.isArray(user.lastFiveMemMas)) {
              user.lastFiveMem = [];
          }
          user.lastFiveMem.push(idTentative);
          if (user.lastFiveMem.length > 5) {
              user.lastFiveMem.shift();
          }
      }
      return user;
  });
  // Sauvegarder les utilisateurs mis à jour
  localStorage.setItem('users', JSON.stringify(users));
  
}

function shuffleArray(arr) {
   return arr.sort(() => Math.random() - 0.5);
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
