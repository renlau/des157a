(function(){
    'use strict';
    console.log('running js');

    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const game = document.getElementById('game');
    const score = document.getElementById('score');
    // const score1 = document.getElementById('score1');
    // const score2 = document.getElementById('score2');
    const actionArea = document.getElementById('actions');
    var enemy;

    const gameData = {
        // dice: ['1die.jpg', '2die.jpg', '3die.jpg', '4die.jpg', '5die.jpg', '6die.jpg'],
        players: ['player 1', 'player 2'],
        score: [100, 100],
        sheild: [0,0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        //which player it is (player 1 or player 2)
        index: 0,
        gameEnd: 0,
    }

    startGame.addEventListener('click',function(){
        document.getElementById('rules').style.display = "none";
        document.getElementById('gamecontrol').style.display = "block";
        gameData.index = Math.round(Math.random());
        console.log(gameData.index);
        gameControl.innerHTML += '<button id = "quit" class = "button3">Quit</button>';
        document.getElementById('quit').addEventListener('click', function(){
            // reloads the page
            location.reload(); 
        });
        //either zero or one; 0 = player 1; 1 = player 2
        console.log('set up the turn');
        setUpTurn();
    });

    function setUpTurn(){
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        actionArea.innerHTML = '<button id="roll" class="button2">ROLL</button>';
        document.getElementById('roll').addEventListener('click', function(){
            console.log('roll the dice!');
            throwDice();
        });
    }

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>Roll the Dice for the ${gameData.players[gameData.index]}</p>`
        // game.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}">`;
        // game.innerHTML += `<img src="${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        if(gameData.rollSum == 2){
            game.innerHTML += '<p>oh snap! snake eyes! 0.0</p>';
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            setTimeout(setUpTurn, 2000);
            console.log('snake eyes!');
            showCurrentScore();
        }
        else if(gameData.roll1 == 1 || gameData.roll2 == 1){
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p>sorry, one of your rolls was a one. Switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 2000);
            console.log("wah wah your tunr is over!");
        }
        else{
            //this is for the current player so make sure to make it the enemy; make a variable 
            if (gameData.index == 0){
                enemy = 1;

            } else {
                enemy = 0;
            }
            gameData.score[enemy] = gameData.score[enemy] - gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain" class="button2">ROLL</button> <button id="pass" class="button3">PASS</button>';
            document.getElementById('rollagain').addEventListener('click', function(){
                setUpTurn();
            });
            document.getElementById('pass').addEventListener('click', function(){
                //switches players 
                //+ 25 shield 
                //checkgameData.sheild; if its zero add 25;
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });
            checkWinningCondition();
            console.log("game continues");
        }

    };  

    //REVISIT HERE

    function checkWinningCondition(){
        //if current score of the current player is greater than the end game score then game ends
        if(gameData.score[gameData.index] < gameData.gameEnd){
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points</h2>`

            actionArea.innerHTML = '';
            document.getElementById('quit').innerHTML = "Start a New Game";
        }

        else {
            //show current score...
            showCurrentScore();
        }
        function showCurrentScore(){
            document.getElementById('score').style.display = "block";
            // score1.innerHTML += `<h1>${gameData.score[0]}</h1>`;
            // score2.innerHTML += `<h1>${gameData.score[1]}</h1>`;
            score.innerHTML = `<p>the score is currently <strong>${gameData.players[0]} ${gameData.score[0]}</strong> and <strong>${gameData.players[1]} ${gameData.score[1]}</strong></p>`;
        }
    }


})();