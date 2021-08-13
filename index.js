let deck = [
    { value: "A", suit: "S", numValue: 11},
    { value: "A", suit: "D", numValue: 11},
    { value: "A", suit: "C", numValue: 11},
    { value: "A", suit: "H", numValue: 11},
    { value: "2", suit: "S", numValue: 2},
    { value: "2", suit: "D", numValue: 2},
    { value: "2", suit: "C", numValue: 2},
    { value: "2", suit: "H", numValue: 2},
    { value: "3", suit: "S", numValue: 3},
    { value: "3", suit: "D", numValue: 3},
    { value: "3", suit: "C", numValue: 3},
    { value: "3", suit: "H", numValue: 3},
    { value: "4", suit: "S", numValue: 4},
    { value: "4", suit: "D", numValue: 4},
    { value: "4", suit: "C", numValue: 4},
    { value: "4", suit: "H", numValue: 4},
    { value: "5", suit: "S", numValue: 5},
    { value: "5", suit: "D", numValue: 5},
    { value: "5", suit: "C", numValue: 5},
    { value: "5", suit: "H", numValue: 5},
    { value: "6", suit: "S", numValue: 6},
    { value: "6", suit: "D", numValue: 6},
    { value: "6", suit: "C", numValue: 6},
    { value: "6", suit: "H", numValue: 6},
    { value: "7", suit: "S", numValue: 7},
    { value: "7", suit: "D", numValue: 7},
    { value: "7", suit: "C", numValue: 7},
    { value: "7", suit: "H", numValue: 7},
    { value: "8", suit: "S", numValue: 8},
    { value: "8", suit: "D", numValue: 8},
    { value: "8", suit: "C", numValue: 8},
    { value: "8", suit: "H", numValue: 8},
    { value: "9", suit: "S", numValue: 9},
    { value: "9", suit: "D", numValue: 9},
    { value: "9", suit: "C", numValue: 9},
    { value: "9", suit: "H", numValue: 9},
    { value: "10", suit: "S", numValue: 10},
    { value: "10", suit: "D", numValue: 10},
    { value: "10", suit: "C", numValue: 10},
    { value: "10", suit: "H", numValue: 10},
    { value: "J", suit: "S", numValue: 10},
    { value: "J", suit: "D", numValue: 10},
    { value: "J", suit: "C", numValue: 10},
    { value: "J", suit: "H", numValue: 10},
    { value: "Q", suit: "S", numValue: 10},
    { value: "Q", suit: "D", numValue: 10},
    { value: "Q", suit: "C", numValue: 10},
    { value: "Q", suit: "H", numValue: 10},
    { value: "K", suit: "S", numValue: 10},
    { value: "K", suit: "D", numValue: 10},
    { value: "K", suit: "C", numValue: 10},
    { value: "K", suit: "H", numValue: 10},
]

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let hasDealtCards = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let dealerSum = 0
let dealerCards = []
let dealerSumEl = document.getElementById("dealer-sum-el")
let dealerCardsEl = document.getElementById("dealer-cards-el")
let bet = 0
let betEl = document.getElementById("bet-el")

let player = {
    name: "Player",
    chips: 200
}

function renderPlayer() {
    playerEl.textContent = player.name + ": $" + player.chips    
}
renderPlayer()

function getRandomCard() {
    let randomCardIndex = Math.floor( Math.random()* deck.length )
    deck.splice(randomCardIndex, 1)
    return deck[randomCardIndex]
}

function getSum(cardsArray) {
    let cardsSum = 0
    for (let i = 0; i < cardsArray.length; i++) {
        cardsSum += cardsArray[i].numValue
    }
    return cardsSum
}

function resetGame() {
    dealerCards = []
    dealerCards = 0
    dealerCardsEl.innerHTML = ""
    dealerSumEl.textContent = ""
    cards = []
    sum = 0
    cardsEl.innerHTML = ""
    sumEl.textContent = ""
    messageEl.textContent = "Place your bets!"
    bet = 0
    betEl.textContent = ""
    hasDealtCards = false
}

function dealCards() {
    isAlive = true
    hasGameStarted = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = getSum(cards)
    dealerCards = [getRandomCard()]
    dealerSum = getSum(dealerCards)
    renderGame()
}

function renderGame() {
    
    dealerCardsEl.textContent = ""
    for (let i = 0; i < dealerCards.length; i++) {
        let path = `images/${dealerCards[i].value + dealerCards[i].suit}.png`
        dealerCardsEl.innerHTML += `
            <img src="${path}" class="class-img">
        `
    }
    dealerSumEl.textContent = "Dealer's sum: " + dealerSum
    
    cardsEl.textContent = ""
    for (let i = 0; i < cards.length; i++) {
        let path = `images/${cards[i].value + cards[i].suit}.png`
        cardsEl.innerHTML += `
            <img src="${path}" class="class-img">
        `
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        // sum += card
        cards.push(card)
        sum = getSum(cards)
        renderGame()        
    }
}

function declareWinner() {
    if (sum > dealerSum || dealerSum > 21) {
        messageEl.textContent = "You won"
        player.chips += bet * 2
        renderPlayer()
    } else if (dealerSum > sum) {
        messageEl.textContent = "The dealer won"
    } else {
        messageEl.textContent = "It's a tie"
        player.chips += bet
        renderPlayer()
    }
}

function newDealerCard() {
    let card = getRandomCard()
    dealerCards.push(card)
    dealerSum = getSum(dealerCards)
    renderGame()
    if (dealerSum < 17) {
        newDealerCard()
    } else {
        declareWinner()
    }
}

function stand() {
    if (isAlive) {
        newDealerCard()   
    }
}

function placeBet() {
    if (player.chips >= 10 && hasDealtCards === false) {
        bet += 10
        player.chips -= 10
        betEl.textContent = "Bet: $" + bet
        renderPlayer()
    }
}