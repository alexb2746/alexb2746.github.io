/*
    This is the start / game module, it handles the UI and game engine
    so to speak.
*/
const game = (function() {
    // Dynamically add starting screen
    const div = document.createElement('div');
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    const a = document.createElement('a');
    const p = document.createElement('p');
    const playerNameH2 = document.createElement('h2');
    let playerName;

    div.id = 'start';
    div.className = 'screen screen-start';
    h1.textContent = 'Tic Tac Toe';
    a.textContent = 'Start game';
    a.href = "#";
    a.className = 'button';
    a.id = "startButton";

    header.appendChild(h1);
    header.appendChild(a);
    div.appendChild(header);

    renderInPage();
    // these have to be declared after the above code runs
    const startScreen = document.getElementById('start');
    const startGameButton = document.getElementById('startButton');
    // ask if they want to play against the computer
    let playAgainstComputer = confirm('Want to play against the computer?');

    // winning combinations based on box index
    const winningBoxes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    // on click of the start game button we will start the game
    startGameButton.addEventListener('click', function() {
        let currentPlayer = player.getActivePlayer();
        $(startScreen).remove();
        $('body').children().show();
        playAgainstComputer = confirm('Want to play against the computer?');
        playerName = prompt('Please enter your name') || 'Anonymous';
        playerNameH2.textContent = 'Player: ' + playerName + ' is "O"';
        $('#board').find('h1').after('<br>');
        $('#board').find('h1').after(playerNameH2);
        // For this game we are only ever having the user / "O" go first
        // This makes the computer click logic work as well
        if (currentPlayer.id === 'player1') {
            player.changeActivePlayer();
            highlightPlayer();
        }
    });

    // On hover if the box is not filled will give the background-image of the
    // active player
    $('.boxes > li').hover(
        function() {
            if (isNotFilled($(this))) {
                let activePlayer = player.getActivePlayer();
                $(this).css('background-image', 'url(' + activePlayer.img + ')');
            }
        },
        function () {
            if (isNotFilled($(this))) {
                $(this).css('background-image', 'none');
            }
        }
    );

    /*
        When a box is clicked, if it is not filled, fill the box with the
        players' color and symbol. Change the active player at the end
    */
    $('.boxes > li').click(function() {
        if (isNotFilled($(this))) {
            let activePlayer = player.getActivePlayer();
            let clickedBox = $(this).index();

            $(this).css('background-image', '');
            $(this).addClass(activePlayer.cssClass);

            player.addBoxIndex(clickedBox);

            let isFilled = $('.box-filled-1').length;
            isFilled += $('.box-filled-2').length;

            if (checkWinner()) {
                return endScreen(true);
            } else if (isFilled === 9) {
                return tieScreen();
            }
            player.changeActivePlayer();
            highlightPlayer();
            if (playAgainstComputer && activePlayer.id === 'player2') {
                // make it seem as if the computer is thinking :P
                window.setTimeout(function() {
                    player.computerClick();
                }, 100);
            }
        }
    });
    function isNotFilled(box) {
        if ($(box).is('[class*="box-filled-"]')) {
            return false;
        } else {
            return true;
        }
    }

    function checkWinner() {
        let hasWon = false;
        const currentPlayerBoxes = player.boxes();

        function inPlayerBoxes(num) {
            return currentPlayerBoxes.includes(num);
        }
        winningBoxes.forEach(function(combo) {
            if (combo.every(inPlayerBoxes)) {
                hasWon = true;
            }
        });
        return hasWon;
    };

    function endScreen(notTie) {
        let winningPlayer = player.getActivePlayer();
        if (winningPlayer.id === 'player1') {
            div.className = 'screen screen-win screen-win-two';
            p.textContent = 'Winner';
        } else {
            div.className = 'screen screen-win screen-win-one';
            p.textContent = playerName + ' is the winner!';
        }
        p.className = 'message';
        a.textContent = 'New game';
        div.id = 'finish';

        $('.boxes > li').removeClass('box-filled-1');
        $('.boxes > li').removeClass('box-filled-2');
        $('.boxes > li').css('background-image', 'none');

        if ($(header).find('p').length) {
            // dont double add :)
        } else {
            $(h1).after(p);
        }
        player.clearBoxes();
        if (notTie) {
            renderInPage();
        }
    }

    function tieScreen() {
        endScreen(false);
        div.className = 'screen screen-win screen-win-tie';
        p.textContent = "It's a draw"
        renderInPage();
    }

    function highlightPlayer() {
        $(player1).toggleClass('active');
        $(player2).toggleClass('active');
    }

    function renderInPage() {
        $('body').children().hide();
        $('body').append(div);
    }
}());
