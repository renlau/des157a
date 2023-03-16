
(function () {
    'use strict';
    console.log('running js');

    const startGame = document.getElementById('startgame');
    const topbar = document.getElementById('topbar');
    const display = document.getElementById('display');
    const gameInfo = document.getElementById('gameInfo');
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    const roll0 = document.getElementById('roll0');
    const roll1 = document.getElementById('roll1');
    const pass0 = document.getElementById('pass0');
    const pass1 = document.getElementById('pass1');
    const score0 = document.getElementById('score0');
    const score1 = document.getElementById('score1');
    const rules = document.getElementById('rules');
    const gun = new Audio('./audio/shoot.mp3');
    const heal = new Audio('./audio/heal.mp3');
    const win = new Audio('./audio/win.mp3');
    const reload = new Audio('./audio/reload.mp3');

    const gameData = {
        players: ['JETT', 'SAGE'],
        score: [99, 99],
        shield: [0,0],
        roll1: 0,
        roll2: 0,
        critChance: 0,
        index: 0, //which player it is (player 1 or player 2)
        enemy: 0
    }

    startGame.addEventListener('click', function () {
        rules.style.display = "none"; // closes the rules
        topbar.style.display = "flex"; // show the quit button and image
        //selects player 1 or player 2 randomly
        gameData.index = Math.round(Math.random()); // either 0 or 1
        player1.style.display = `flex` //CHANGE DURING FINAL WHERE ITS INPUT BASED ON THE AGENT YOU SELECT
        player2.style.display = `flex` //CHANGE DURING FINAL WHERE ITS INPUT BASED ON THE AGENT YOU SELECT
        switchPlayers();
        document.getElementById('quit').addEventListener('click', function () {
            // reloads the page
            location.reload();
        });
        document.getElementById('help').addEventListener('click', function () {
            // reloads the page
            rules.style.display = "block";
            topbar.style.display = "none";
            display.style.display = "none";
            document.getElementById('startgame').remove();
            rules.innerHTML += `<button id="close" class="button1">Return to Game</button>`;
        });
        // document.getElementById('close').addEventListener('click', function () {
        //     rules.style.display = "none";
        //     topbar.style.display = "block";
        //     display.style.display = "block";
        // });
        roll0.addEventListener("click", function () {
            throwDice();
        })
        roll1.addEventListener("click", function () {
            throwDice();
        })
        pass0.addEventListener('click', function () {
            gameInfo.innerHTML = `<p>You equipped <span>25 light shield.</span> Switching to ${gameData.players[gameData.index]}</p>`;
            gameData.shield[0] = gameData.shield[0] + 25;
            showCurrentScore();
            switchPlayers();
        });
        pass1.addEventListener('click', function () { 
            gameInfo.innerHTML = `<p>You equipped <span>25 light shield</span> Switching to ${gameData.players[gameData.index]}</p>`;
            gameData.shield[1] = gameData.shield[1] + 25;
            showCurrentScore();
            switchPlayers();
        });
        showCurrentScore();
    });

    function throwDice() {
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        gameData.critChance = Math.floor(Math.random() * 10) + 1;
        let rollSum = gameData.roll1 + gameData.roll2;
        if (gameData.critChance == 2) {
            rollSum = rollSum * 2
        }
        
        if (gameData.roll1 == 1 && gameData.roll2 == 1) {
            gameInfo.innerHTML = `<p>You're enemy <span>healed full health</span></p>`;
            gameData.score[gameData.enemy] = 99;
            switchPlayers();
            showCurrentScore();
            heal.play();
        } else if (gameData.roll1 == 1 || gameData.roll2 == 1) {
            switchPlayers();
            gameInfo.innerHTML = `<p>Sorry, one of your rolls was a one. <span>Switching to ${gameData.players[gameData.index]}</span></p>`;
            reload.play();
        } else {
            if (gameData.critChance == 2) {
                gameInfo.innerHTML = `<p>You got a headshot and did double the damage. You did <span>${rollSum} damage</span></p>`;
            } else {
                gameInfo.innerHTML = `<p>You did <span>${rollSum} damage</span></p>`;
            }
            
            if (gameData.shield[gameData.enemy] == 0) {
                gameData.score[gameData.enemy] = gameData.score[gameData.enemy] - rollSum;
            } else if (gameData.shield[gameData.enemy] < rollSum) {
                let remainder = rollSum - gameData.shield[gameData.enemy];
                gameData.shield[gameData.enemy] = 0;
                gameData.score[gameData.enemy] = gameData.score[gameData.enemy] - remainder;
            } else {
                gameData.shield[gameData.enemy] = gameData.shield[gameData.enemy] - rollSum;
            }
            checkWinningCondition();
            showCurrentScore();
            gun.play();
        }
    };

    function switchPlayers () {
        if (gameData.index === 0) { // player1's turn is over
            gameData.index = 1; //changes over to the other player
            gameData.enemy = 0; //changes over to the enemy
            player1.classList.add("disabled"); //adds the opacity to player 1
            roll0.setAttribute("disabled", "");
            roll0.classList.remove("button2h");
            pass0.setAttribute("disabled", "");
            pass0.classList.remove("button3h");
            player2.classList.remove("disabled"); //removes the opacity to player 2
            roll1.removeAttribute("disabled");
            roll1.classList.add("button2h");
            pass1.removeAttribute("disabled");
            pass1.classList.add("button3h");
        } else { // player2's turn is over
            gameData.index = 0; //changes player to player 1 
            gameData.enemy = 1; //changes enemy to player 2
            player1.classList.remove("disabled"); //removes the opacity to player 1
            roll0.removeAttribute("disabled");
            roll0.classList.add("button2h")
            pass0.removeAttribute("disabled");
            pass0.classList.add("button3h")
            player2.classList.add("disabled");//adds the opacity to player 2
            roll1.setAttribute("disabled", "");
            roll1.classList.remove("button2h");
            pass1.setAttribute("disabled", "");
            pass1.classList.remove("button3h");
        }
    }


    function checkWinningCondition() {
        //if current score of the current player is greater than the end game score then game ends
        if (gameData.score[gameData.enemy] <= 0) {
            gameInfo.innerHTML = `<h1>${gameData.players[gameData.index]} wins</h1>`
            document.getElementById('quit').innerHTML = "Start a New Game";
            document.getElementById('quit').style.width = "auto";
            document.getElementById('help').remove();
            roll0.setAttribute("disabled", "");
            roll0.classList.remove("button2h");
            roll0.classList.add("disabled");
            pass0.setAttribute("disabled", "");
            pass0.classList.remove("button3h");
            pass0.classList.add("disabled");
            roll1.setAttribute("disabled", "");
            roll1.classList.remove("button2h");
            roll1.classList.add("disabled");
            pass1.setAttribute("disabled", "");
            pass1.classList.remove("button3h");
            pass1.classList.add("disabled");
            win.play();
        }
    }
    
    function showCurrentScore() {
        score0.style.display = "flex";
        score1.style.display = "flex";
        score0.innerHTML = `<p>${gameData.shield[0]}</p>`
        score0.innerHTML += `<h1>${gameData.score[0]}</h1>`;
        score1.innerHTML = `<p>${gameData.shield[1]}</p>`
        score1.innerHTML += `<h1>${gameData.score[1]}</h1>`;
    }
})();