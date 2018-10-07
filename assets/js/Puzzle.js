class Puzzle {
    constructor () {
        this.tiles = document.getElementsByTagName('li');
    }

    // function to retrieve the current order of the shuffled tiles to later compare with the correct order
    currentOrder() {
        let tiles = this.tiles;
        let currentOrder = [];

        // loop through all the tiles in the puzzle
        for (let i = 0; i < tiles.length; i++) {

            // push each tile into the currentOrder array
            currentOrder.push(parseInt(tiles[i].textContent));

        }

        // push an 'empty' value into the currentOrder array to represent blank space
        currentOrder.push('empty');
        console.log(currentOrder);

        return currentOrder;
    }

    // function to move tile
    clickTile() {
    
        let tiles = this.tiles;

        // renders an 'empty' value to the html puzzle to represent blank space
        let puzzle = document.querySelector('ul');
        let space = document.createElement('li');
        let empty = document.createTextNode(0);
        space.appendChild(empty);
        space.classList.add("empty");
        
        let currentOrder = this.currentOrder();

        let liArray = [];

        for (let i = 0; i < tiles.length; i++) {
            liArray.push(tiles[i]);
        }    

        // loop through all the tiles in puzzle
        for (let i = 0; i < liArray.length; i++) {
            
            // check if a tile is clicked
            liArray[i].addEventListener('click', () => {

                // set clickedTile to the number of the tile
                let clickedTile = parseInt(liArray[i].textContent);
                console.log(`${clickedTile} clicked!`);

                // ** Below is the logic to shift each tile upon click. The intention was to detect if the empty space is to the clicked tile's right, left, top or bottom. Opening the console shows that the numbers shift accordingly within the currentOrder array, but attaching each array item to its corresponding html tile causes bugs. Visually, multiple tiles shift at the same time and sometimes even shift diagonally(!). The console does match the correct number with the tile that's been clicked. A little more time to dissect the logic should reveal the source of the bugs ** 
                let clickedTileIndex = currentOrder.indexOf(clickedTile);
                let leftIndex = clickedTileIndex - 1;
                let rightIndex = clickedTileIndex + 1;
                let topIndex = clickedTileIndex - 3;
                let bottomIndex = clickedTileIndex + 3;

                if (currentOrder[rightIndex] === 'empty') { // check if the empty space is to right
                    puzzle.insertBefore(space, liArray[i]); // inserts html blank space at specified index
                    currentOrder.splice(currentOrder.indexOf('empty'), 1); // removes empty space
                    currentOrder.splice(clickedTileIndex, 0, 'empty');  // replaces with clicked tile
                    
                } 

                else if (currentOrder[bottomIndex] === 'empty') { // check if the empty space is on the bottom
                    puzzle.insertBefore(space, liArray[topIndex]); // inserts html blank space at specified index
                    currentOrder.splice(currentOrder.indexOf('empty'), 1); // removes empty space
                    currentOrder.splice(clickedTileIndex, 1, 'empty'); // replaces with clicked tile
                    currentOrder.splice(bottomIndex, 0, clickedTile);
                } 
                
                else if (currentOrder[leftIndex] === 'empty') { // check if the empty space is to left
                    puzzle.insertBefore(space, liArray[i]); // inserts html blank space at specified index
                    currentOrder.splice(currentOrder.indexOf('empty'), 1); // removes empty space
                    currentOrder.splice(rightIndex, 0, 'empty'); // replaces with clicked tile
                    
                } 
                
                else if (currentOrder[topIndex] === 'empty') { // check if the empty space is on the top
                    puzzle.insertBefore(space, liArray[bottomIndex]); // inserts html blank space at specified index
                    currentOrder.splice(currentOrder.indexOf('empty'), 1); // removes empty space
                    currentOrder.splice(leftIndex, 1, 'empty'); // replaces with clicked tile
                    currentOrder.splice(topIndex, 0, clickedTile);
                }

                console.log(currentOrder);

                // check if the tiles are placed correctly after each tile click
                this.checkForWin();

            });

        }

    }

    // function to check if all tiles are placed correctly
    // returns boolean
    checkForWin() {

        let tiles = this.tiles;
        let correctOrder = [1, 2, 3, 4, 5, 6, 7, 8, 'empty'];
        let currentOrder = [];

        // loop through all the tiles in the puzzle
        for (let i = 0; i < tiles.length; i++) {

            // push each tile into the currentOrder array
            currentOrder.push(parseInt(tiles[i].textContent));

        }

        // check if the currentOrder strictly matches the correctOrder to determine if the game has been won
        for (let i = 0; i < correctOrder.length; i++) {

            if (correctOrder[i] !== currentOrder[i]) {
                return false;
            }
     
        }

        console.log('You Won!');
        return true;

    }

}