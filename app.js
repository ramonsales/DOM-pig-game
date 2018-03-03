/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores = [0, 0];
var roundScore = 0;
var activePlayer = 0;
var gamePlaying;

init();

// Button Roll Listener
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying){
        // 0. Animate the dice
        animateDice();

        // 1. Random number
        var dice = Math.floor((Math.random() * (/*max*/6 - /*min*/1 + 1))) + /*min*/1;
        
        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        
        // 3. Update the round score IF the rolled number was NOT a one
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
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
        if (scores[activePlayer] >= 100) {
            document.getElementById("name-" + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            // Block buttons click
            gamePlaying = false;

        } else {
            //Next Player
            nextPlayer();
        }
    }
});

function nextPlayer() {
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
    // Reset the last Winner
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    document.getElementById("name-" + activePlayer).textContent = 'PLAYER ' + (activePlayer + 1);
    // Reset game values
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    // Reset UI values
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.add('active');
}

// Add an rotate animation to the dice
function animateDice() {
    var dice = document.querySelector('.dice-box');
    dice.classList.toggle('flipped');
}