/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
var scores = [0, 0];
var roundScore = 0;
var activePlayer = 0;
var gamePlaying = true;
var lastDiceRoll = 0;
var winningScore = 100;

init();

// Button Roll Listener
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying){
        // 0. Animate the dice
        animateDice();

        // 1. Random number
        var dice0 = Math.floor((Math.random() * (/*max*/6 - /*min*/1 + 1))) + /*min*/1;
        var dice1 = Math.floor((Math.random() * (/*max*/6 - /*min*/1 + 1))) + /*min*/1;

        // 2. Display the result
        document.getElementById('dice-0').style.display = 'block';
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-0').src = 'dice-' + dice0 + '.png';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        /*
        // CHALLENGE RULE #1
        // 3. Player loses scores if he rolls two 6 in a row
        if (dice === 6 && lastDiceRoll === 6) {
            console.log(dice);
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        } 
        
        // 4. Update the round score IF the rolled number was NOT a one
        else if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            //lastDiceRoll = dice;
            //console.log(dice);
        }
        else {
            //Next player
            nextPlayer();
        }
        */
       if (dice0 !== 1 && dice1 !== 1) {
            //Add score
            roundScore += dice0 + dice1;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            //lastDiceRoll = dice;
            //console.log(dice);
        }
        else {
            //Next player
            nextPlayer();
        }
    }
});

// Button Hold Listener
document.querySelector(".btn-hold").addEventListener('click', function() {
    if (gamePlaying){
        // Add CURRENT score to the global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.getElementById("name-" + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            // Block buttons click
            gamePlaying = false;
            //Hide dices
            document.getElementById('dice-0').style.display = 'none';
            document.getElementById('dice-1').style.display = 'none';

        } else {
            //Next Player
            nextPlayer();
        }
    }
});

// Winning Score Listener
document.getElementById('winning-score__input').addEventListener('blur', function() {
    winningScore = document.getElementById('winning-score__input').value;
    init();
});

function nextPlayer() {
    lastDiceRoll = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;
    roundScore = 0;
    // Change the active player
    activePlayer = activePlayer === 0 ? 1 : 0;
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
};

// New Game listener
document.querySelector(".btn-new").addEventListener('click', init);

// Reset all game values
function init() {
    // Reset game values
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    lastDiceRoll = 0;
    
    // Reset UI values
    document.getElementById('dice-0').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById("name-0").textContent = 'Player 1';
    document.getElementById("name-1").textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// Add an rotate animation to the dice
function animateDice() {
    var dice = document.querySelector('.dice-box');
    dice.classList.toggle('flipped');
}
