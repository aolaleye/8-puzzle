class Game {
    constructor () {
        this.puzzle = new Puzzle();
    }

    // function to shuffle the tiles in the puzzle
    // renders a rearranged list of numbers in the html puzzle
    shuffleTiles() {

        let puzzle = document.querySelector('ul');

        for (let i = puzzle.children.length; i >= 0; i--) {

            // randomly arranges list items within the ul
            puzzle.appendChild(puzzle.children[Math.random() * i | 0]);

        }

        // initialized clickTitle() function in Puzzle object
        this.puzzle.clickTile();

    }

}
