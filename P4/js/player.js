const player = (function() {
    /*
        This is the player module. It keeps track of players boxes they have
        clicked and their properties. It returns specific functions for the
        game module to use
    */
    const Player = {
        init: function(img, id, cssClass) {
            this.img = img;
            this.id = id;
            this.cssClass = cssClass;
            this.boxes = [];
            this.activePlayer = false;
            return this;
        }
    }
    const playerX = Object.create(Player).init('img/x.svg', 'player1', 'box-filled-2');
    const playerO = Object.create(Player).init('img/o.svg', 'player2', 'box-filled-1');

    function getActivePlayer() {
        if (playerX.activePlayer) {
            return playerX;
        } else {
            return playerO;
        }
    }
    function changeActivePlayer() {
        if (playerX.activePlayer) {
            playerX.activePlayer = false;
            playerO.activePlayer = true;
        } else {
            playerO.activePlayer = false;
            playerX.activePlayer = true;
        }
    }
    function addBoxIndex(index) {
        const currentPlayer = getActivePlayer();
        currentPlayer.boxes.push(index);
    }
    function boxes() {
        const currentPlayer = getActivePlayer();
        return currentPlayer.boxes;
    }
    function clearBoxes() {
        playerX.boxes = [];
        playerO.boxes = [];
    }
    function computerClick() {
        let randomNumber = Math.floor(Math.random() * 9) + 1;
        if ($('.box:nth-child(' + randomNumber + ')').is('[class*="box-filled-"]')) {
            computerClick();
        } else {
            $('.box:nth-child(' + randomNumber + ')').trigger('click');
        }
    }
    return {
        getActivePlayer: getActivePlayer,
        changeActivePlayer: changeActivePlayer,
        addBoxIndex: addBoxIndex,
        boxes: boxes,
        clearBoxes: clearBoxes,
        computerClick: computerClick
    }
}());
