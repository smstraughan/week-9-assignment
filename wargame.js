

/*
First I construct a player class that outlines properties
    -Players name
    -an empty array to hold the dealt hand
    -keeps track of the players score
*/
class Player {
    constructor(name){ 
        this.name = name
        this.hand = [];
        this.score = 0

    }
}

/*
Second I create the Deck Class that contains properties for
    - An empty array for a deck
    - An array of suits
    - and array of card ranks Ace-King
The Deck class also contains methods to 
    - create a deck using the suits and ranks
    - shuffle the deck
*/

class Deck {
    constructor(){ //deck properties
        this.deck = [];
        this.suits = ["Hearts", "Spades", "Clubs", "Diamonds" ];
        this.ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
    }

    createDeck(){ // contains a double for loop to cycle through each suit and then each rank to create an entire deck
        for (let i = 0; i < this.suits.length; i++){ // outer loop cycles through instance of each suit. 
            for (let j = 0; j < this.ranks.length; j++){ // inner loop creates a card for each rank within the current suit
                let card = { // this creates a card object, naming it with the current suit and rank
                    name: `${this.ranks[j]} of ${this.suits[i]}`,
                    value: j + 1 // this line creates a value for the card based on index of the card rank
                }
                this.deck.push(card) //pushes the card object into the deck array
            }
        }
    }

    shuffleDeck(){  //Fisher-Yates shuffle technique, googled and then made fit for this deck
        let currentIndex = this.deck.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [this.deck[currentIndex], this.deck[randomIndex]] = [
            this.deck[randomIndex], this.deck[currentIndex]]

   
        }
    }
}

/*
Below I create a game class that contains properties of:
    - player 1 (creates a new instance of the player class)
    - player 2
    - deck creates new instance of deck class
Contains methods for:
    - dealing cards
    - playing game
*/

class Game{
        constructor(player1, player2){
        this.player1 = new Player(player1);
        this.player2 = new Player(player2);
        this.deck = new Deck();
    }



    dealCards(){
        this.deck.createDeck(); //first uses method from deck to create deck
        this.deck.shuffleDeck(); //then shuffles the deck 
        let currentPlayer = 1; // names a current player
        
        while(this.deck.deck.length > 0){ // using while to distribute cards until there are no more in the deck
            // Remove card from top of deck
            const card = this.deck.deck.pop(); // stores a card by using pop to take it off the deck
            
            // Alternate between players
            if(currentPlayer === 1){ //uses logic to determine who to give current card to
                this.player1.hand.push(card); //if current player is player 1 then it pushes the card to player 1s hand
                currentPlayer = 2; //then it changes currentPlayer to 2 and goes back to the top
            } else { //else it pushes the card to player 2s hand, changes the player to player 1 and goes back to the top. Thus it alternates between 
                this.player2.hand.push(card); //the two players until there are no more cards to deal
                currentPlayer = 1;
            }
        }

    }

    playWar(){ //this is the logic for playing the game
        console.log('------BEGIN GAME------')

        for (let i = 0; i < this.player1.hand.length; i++){ //here we build a for loop and make it iterate the number of times that is equal to cards in player 1 hand
            if (this.player1.hand[i].value > this.player2.hand[i].value){ //if player 1 card has a higher value:
                this.player1.score++ //We add 1 point to player 1 score then log the result of the round to the console
                console.log(`
                    ${this.player1.name}'s Card: ${this.player1.hand[i].name} 
                    ${this.player2.name}'s Card: ${this.player2.hand[i].name}
                    ${this.player1.name} Wins!
                    Current Score: ${this.player1.name}: ${this.player1.score}, ${this.player2.name}: ${this.player2.score}`)
            } else if (this.player2.hand[i].value > this.player1.hand[i].value){ //if player 2 has the higher value card:
                this.player2.score++ //we add a point to the score of player 1s hand and log the result to the console
                console.log(`
                    ${this.player1.name}'s Card: ${this.player1.hand[i].name}
                    ${this.player2.name}'s Card: ${this.player2.hand[i].name}
                    ${this.player2.name} Wins!
                    Current Score: ${this.player1.name}: ${this.player1.score}, ${this.player2.name}: ${this.player2.score}`)
            } else if (this.player2.hand[i].value == this.player1.hand[i].value) { //if players cards are of equal value it is a tie, no one gets points and we log the round to the console
                console.log(`
                    ${this.player1.name}'s Card: ${this.player1.hand[i].name}
                    ${this.player2.name}'s Card: ${this.player2.hand[i].name}
                    It's a Tie! No points awarded.
                    Current Score: ${this.player1.name}: ${this.player1.score}, ${this.player2.name}: ${this.player2.score}`)
            }
        }
        //Once the for loop has iterated over the complete hands, we evaluate the final score and log the results to the console.
        console.log(`
                    -------END GAME--------
                    Final Score: ${this.player1.name}: ${this.player1.score}, ${this.player2.name}: ${this.player2.score}`)
            if (this.player1.score > this.player2.score){
                console.log(`
                    ${this.player1.name} Wins!`)
            } else if (this.player2.score > this.player1.score) {
                console.log(`
                    ${this.player2.name} Wins!`)
            } else if (this.player1.score == this.player2.score) {
                console.log(`
                    It's a Tie!!`)
            }
    }
}





//below is fun code to get a prompt to dertermine the players names
const player1Name = prompt("Enter Player 1's name:");
const player2Name = prompt("Enter Player 2's name:");


let game = new Game(player1Name,player2Name) // we use the names entered into the prompt to create a new instance of game with p1 and p2
game.dealCards() //deal the cards
game.playWar() //play the war game



/*
This code is if I for go the prompts and just create a new game with player 1 and player 2

const game = new Game("Player 1", "Player 2")
game.dealCards()
game.playWar()
*/


