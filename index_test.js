var expect = chai.expect;


//Testing my wargame classes and methods
function defineTests() {
describe('War Card Game', () => {

  describe('Player Class', () => {
    it('should create a player with a name', () => {
      const player = new Player('Alice');
      expect(player.name).to.equal('Alice');
    });

    it('should initialize with an empty hand', () => {
      const player = new Player('Bob');
      expect(player.hand).to.be.an('array').that.is.empty; 
    });

    it('should initialize with a score of 0', () => {
      const player = new Player('Charlie');
      expect(player.score).to.equal(0);
    });
  });

  describe('Deck Class', () => {
    let deck;

    beforeEach(() => {  //this runs before each 'it' test creating a new deck instance for each test. Cool!
      deck = new Deck(); 
    });

    it('should create an empty deck on initialization', () => {
      expect(deck.deck).to.be.an('array').that.is.empty;
    });

    it('should have 4 suits: Hearts, Spades, Clubs, Diamonds', () => {
      expect(deck.suits).to.have.lengthOf(4);
      expect(deck.suits).to.include.members(['Hearts', 'Spades', 'Clubs', 'Diamonds']);
    });

    it('should have 13 ranks from Ace through King', () => {
      expect(deck.ranks).to.have.lengthOf(13);
      expect(deck.ranks).to.include.members(["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]);
    });

    describe('createDeck()', () => {
      it('should create a deck of 52 cards', () => {
        deck.createDeck();
        expect(deck.deck).to.have.lengthOf(52);
      });

      it('should create cards with name and value properties', () => {
        deck.createDeck();
        const firstCard = deck.deck[0];
        expect(firstCard).to.have.property('name');
        expect(firstCard).to.have.property('value');
      });

      it('should create cards with correct naming format', () => {
        deck.createDeck();
        expect(deck.deck[0].name).to.equal('Ace of Hearts');
        expect(deck.deck[12].name).to.equal('King of Hearts');
      });

      it('should assign correct values to cards (1-13)', () => {
        deck.createDeck();
        expect(deck.deck[0].value).to.equal(1); // Ace
        expect(deck.deck[12].value).to.equal(13); // King
      });
    });

    describe('shuffleDeck()', () => {
      it('should maintain deck size after shuffling', () => {
        deck.createDeck();
        deck.shuffleDeck();
        expect(deck.deck).to.have.lengthOf(52);
      });

      it('should change the order of cards after shuffling', () => {
        deck.createDeck();
        // Create a copy of the original deck order
        const originalOrder = deck.deck.map(card => card.name);
        
        deck.shuffleDeck();
        
        // Create array of shuffled deck order
        const shuffledOrder = deck.deck.map(card => card.name);
        
        // Check that the orders are not exactly the same
        expect(shuffledOrder).to.not.deep.equal(originalOrder);
      });
    });
  });

 describe('Game Class', () => {
    let game;

    beforeEach(() => {
      game = new Game('Alice', 'Bob');
    });

    it('should create two players with given names', () => {
      expect(game.player1.name).to.equal('Alice');
      expect(game.player2.name).to.equal('Bob');
    });

    it('should create a deck instance', () => {
      expect(game.deck).to.be.an.instanceof(Deck);
    });

    describe('dealCards()', () => {
      beforeEach(() => {
        game.dealCards();
      });

      it('should deal 26 cards to each player', () => {
        expect(game.player1.hand).to.have.lengthOf(26);
        expect(game.player2.hand).to.have.lengthOf(26);
      });
      

      it('should not deal cards in sequential order (verifies shuffle)', () => {
        // Create a new unshuffled deck to compare against
        const testDeck = new Deck();
        testDeck.createDeck();
        
        // Get the first 10 cards from unshuffled deck
        const unshuffledOrder = testDeck.deck.slice(0, 10).map(card => card.name);
        
        // Get the first 10 cards dealt to players (alternating)
        const dealtOrder = [
          game.player1.hand[0].name,
          game.player2.hand[0].name,
          game.player1.hand[1].name,
          game.player2.hand[1].name,
          game.player1.hand[2].name,
          game.player2.hand[2].name,
          game.player1.hand[3].name,
          game.player2.hand[3].name,
          game.player1.hand[4].name,
          game.player2.hand[4].name
        ];
        
        // The dealt cards should NOT match the unshuffled sequential order
        expect(dealtOrder).to.not.deep.equal(unshuffledOrder);
      
    });

    });

    describe('playWar()', () => {
      beforeEach(() => {
        game = new Game('Alice', 'Bob');
        game.dealCards();
        game.playWar();
      });

      it('should have total rounds equal to hand size', () => {
        const totalRounds = game.player1.score + game.player2.score;
        // Total rounds could be less than 26 if there are ties
        expect(totalRounds).to.be.at.most(26);
      });


       it(`should each round:
            award the higher card value 1 point, 
            0 points for a tie, 
            and correctly add score over multiple rounds`, () => {
        const testGame = new Game('Alice', 'Bob');
       // Set up 3 rounds: P1 wins, P2 wins, Tie
         testGame.player1.hand = [
           { name: 'King of Hearts', value: 13 },   // P1 wins
           { name: 'Two of Hearts', value: 2 },     // P2 wins
           { name: 'Five of Hearts', value: 5 }     // Tie
            ];
          testGame.player2.hand = [
           { name: 'Ace of Spades', value: 1 },     // P1 wins
           { name: 'Queen of Spades', value: 12 },  // P2 wins
           { name: 'Five of Spades', value: 5 }     // Tie
            ];
    
          testGame.playWar();
    
          expect(testGame.player1.score).to.equal(1);
          expect(testGame.player2.score).to.equal(1);
      });

     it('should determine the winner of the entire game after 26 rounds or declare a tie', () => {
      const testGame = new Game('Player1', 'Player2');
      testGame.dealCards();
      
      testGame.playWar();
  
   // After all 26 rounds, check that a winner is determined or it's a tie
    if (testGame.player1.score > testGame.player2.score) {
      // Player 1 wins
     expect(testGame.player1.score).to.be.above(testGame.player2.score);
    } else if (testGame.player2.score > testGame.player1.score) {
      // Player 2 wins
     expect(testGame.player2.score).to.be.above(testGame.player1.score);
    } else {
    // It's a tie
     expect(testGame.player1.score).to.equal(testGame.player2.score);
    }

    });

    });
  });
})
}
