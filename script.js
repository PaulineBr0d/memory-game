const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');
const reset = document.getElementById('reset');
const timerDisplay = document.getElementById('timer');
let timer = 0;
let seconds =0;

let cards = [];
let flippedCards = [];
let matchedCards = [];
let moveCount = 0;
let deck = [];
function initgame () {
    cards = [];
    flippedCards = [];
    matchedCards = [];
    moveCount = 0;
    gameBoard.innerHTML = ""; 
    message.textContent ="";


  // constituer le jeu de cartes
  const allImages = [
    "css.png", "git.png", "html.png", "js.png",
    "node.png", "php.png", "react.png", "vue.png", "symfony.png"
  ];
  const selectedImages = allImages.sort(() => Math.random() - 0.5).slice(0, 8);
  deck = [...selectedImages, ...selectedImages].sort(() => Math.random() - 0.5);

 // disposer les cartes
  deck.forEach((img, index) => {
      const card = document.createElement('div');
      card.classList.add("card");
      card.dataset.image = img;
      card.dataset.index = index;
      
      cards.push(card);

      const back = document.createElement('img');
      back.src = 'assets/default.png';
      back.classList.add("back");
  
      const front = document.createElement('img');
      front.src = `assets/${img}`;
      front.classList.add("front", "hidden");

      card.appendChild(back);
      card.appendChild(front);
      gameBoard.appendChild(card);

      card.addEventListener('click', ()=> flipCard(card));

  })
  
    clearInterval(timer);
    seconds=0;
    timerDisplay.textContent = "Temps écoulé:" + seconds;
    
    timer = setInterval(() =>{
      seconds++;
      timerDisplay.textContent = "Temps écoulé:" + seconds;
    }, 1000);
    
}

initgame();

  

// retourner les cartes
    function flipCard(card) {
        if(flippedCards.length < 2 && !card.classList.contains("flipped")) {
            card.classList.add("flipped");
            flippedCards.push(card);

            if(flippedCards.length === 2) {
                checkMatch();
        }
     }  
    }

// checker si paires et si gagné
    function checkMatch() {
        moveCount++;
        const [card1, card2] = flippedCards;
      
        if(card1.dataset.image === card2.dataset.image){
            matchedCards.push(card1, card2);
            flippedCards = [];
            if (matchedCards.length === deck.length) {
              clearInterval(timer);  
              message.textContent = `Fécilitations ! Tu as gagné avec ${moveCount} tentatives`;
            }
            } else {
                setTimeout(() => {

                flippedCards = [];
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                card1.querySelector('.front').classList.add("hidden");
                card2.querySelector('.front').classList.add("hidden"); 
                   
                }, 1000);
                
            }
            
        }


// reset le jeu 
reset.addEventListener('click', () => {
  cards = [];
  flippedCards = [];
  moveCount = 0;
    initgame();
   }  
)   
