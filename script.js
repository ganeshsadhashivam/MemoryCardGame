const cards = document.querySelectorAll(".card");

let cardOne, cardTwo;
let disableDeck = false;
let matchedCards = 0;

const flipCard = (e) => {
  //getting user clicked card
  let clickedCard = e.target;
  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      //return the cardOne value to clickedCard
      return (cardOne = clickedCard);
    }

    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector("img").src,
      cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);
    console.log(cardOne, cardTwo);
  }
};

// Match images
const matchCards = (img1, img2) => {
  //if Two cards Image Matched
  if (img1 === img2) {
    //increment matched value by 1
    matchedCards++;
    //if matched value is 8 that means user has matched all the cards (8 *2 = 16 cards)
    console.log(matchedCards);
    if (matchedCards == 8) {
      setTimeout(() => {
        return shuffleCards();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
    console.log("cards matched");
  }

  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  //removing both shake and flip classes from the both card after 1.2 seconds
  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    //selecting both card value to blank
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
  console.log("cards didn't matched");
  //console.log(img1, img2);
};

//shuffle cards
const shuffleCards = () => {
  matchedCards = 0;
  cardOne = cardTwo = "";
  disableDeck = false;
  //creating array of 16 items and each item is repeated twice
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  //sorting array item randomly
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  //removing  flip class from all cards and passing random image to each card
  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    imgTag.src = `images/img-${arr[index]}.png`;
    card.addEventListener("click", flipCard);
  });
};

shuffleCards();

cards.forEach((card) => {
  //   card.classList.add("flip");
  //adding click event to all cards
  card.addEventListener("click", flipCard);
});
console.log(cards);
