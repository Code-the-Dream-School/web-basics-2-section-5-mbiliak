
//------------------------ Game Project---------------------------
//Do you remember the game Battleship we created before? well .... it is time to make it with the DOM!!
//We are providing you with the design of a board (in the DOM) for a player1, you have to create the board for the player2 using the id property 'board_player2' -> it is the second list (ul) in your index.html file
//First ask the players for their names (use propmt)
//Now each time the turn player clicks on any cell of the opponent's board (you have to verify if the player is clicking the right board) the program needs to verify if there is an opponent's ship in that cell. If it is then the opponent has one less ship
//We want you to store the data of each player in two Player objects. Each object has to store: name, remaining boats, and their respective board.
//Each board needs to be initialized randomly with '0' and four '1' wich means the state of the cell. Numbers 1 are representing the 4 positions of the player's ships
//Also we want you to display the name of the turn player in the tag that has the id 'turn_player'. And if there is a winner  a text with: 'Congratulationes {name_player}!! you win'
//in the index.html file you are going to find 4 more ids: 'name_player1' , 'name_player2' , 'ships_player1' , 'ships_player2'. We want to see the information of each player in the respective elements
//As our previous Battleship, the winner is the player that hits the 4 opponent's ships first
//one more Thing create a 'reset' and a 'new game' buttons as childs of the element with the id 'buttons'. the reset button has to start the game again and the new game create a new game with new players and a new random board.

// declare variables and access ids in the DOM
const board_Player1 = document.getElementById('board_player1');
const board_Player2 = document.getElementById('board_player2');

const name_Player1 = document.getElementById('name_player1');
const name_Player2 = document.getElementById('name_player2');

name_Player1.textContent = prompt('Enter name for Player 1');
name_Player2.textContent = prompt('Enter name for Player 2');

const player1_lives = document.getElementById('ships_player1');
const player2_lives = document.getElementById('ships_player2');

const playerTurn = document.getElementById('turn_player');

// store data of each player in two Player objects
const player1 = {
  name: name_Player1.textContent,
  boatsLeft: player1_lives.innerHTML
};

const player2 = {
  name: name_Player2.textContent,
  boatsLeft: player2_lives.innerHTML
};

player1_lives.textContent = 4;
player2_lives.textContent = 4;

createBoard(board_Player1);
addShips(board_Player1);
createBoard(board_Player2);
addShips(board_Player2);


// create new and reset buttons
const buttons = document.getElementById('buttons');
const resetButton = document.createElement('button');
const newButton = document.createElement('button');
buttons.appendChild(resetButton);
buttons.appendChild(newButton);
resetButton.textContent = "Reset";
newButton.textContent = "New";

resetButton.addEventListener('click', bothButtons);
newButton.addEventListener('click', bothButtons);

// create function to new and reset buttons
function  bothButtons (event) {
  let button = event.target;
  if (button === newButton) {
    location.reload();
  } else if (button === resetButton) {
    player1_lives.innerText = 4;
    player2_lives.innerText = 4;
    board_Player1.innerText = "";
    board_Player2.innerText = "";
    createBoard(board_Player1);
    addShips(board_Player1);
    createBoard(board_Player2);
    addShips(board_Player2);
  }
}


// create function that adds ships randomly to the DOM
function addShips(board) {
  let ship = 0;
  while (ship < 4) {
    let xPosition = Math.floor(Math.random() * 4);
    let yPosition = Math.floor(Math.random() * 4);
    let cell1 = board.getElementsByTagName('li')[xPosition];
    let cell2 = cell1.getElementsByTagName('div')[yPosition];
      if (cell2.value === 0) {
        cell2.value = 1;
        ship++;
      } else {
        continue;
      }
  }
}

// function that create board cells
function createBoard(cells) {
  for (var x = 0; x < 4; x++) {
    const li = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board

      for (var y = 0; y < 4; y++) {
        const cell = document.createElement('div');
        cell.className = "square"; // adding css properties to make it looks like a square
        cell.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
        cell.value = 0;//state of the cell

        //this function adds the click event to each cell
        cell.addEventListener( 'click', playGame);
            
            //console.log( cell.textContent) //display the coordinates in the console
            //cell.style.visibility = 'hidden';// this  means that the contents of the element will be invisible, but the element stays in its original position and size / try it clicking on any of the black cells (in your browser) and see whats happens
            //cell.style.background ="purple"; //with this propertie you can change the background color of the clicked cell. try comment the line bellow and uncomment this line. Do not forget to save this file and refresh the borwser to see the changes

        li.appendChild(cell); //adding each cell into the row number x
      }
     cells.appendChild(li); //adding each row into the board
  }
}

let currentPlayer = player1;
playerTurn.textContent = player1.name;

// create function to start the game play
function playGame(event) {
  let cell = event.target; // get the element clicked
  if (currentPlayer === player1 && board_Player2.contains(cell)) {
    if (cell.value === 1 && cell.textContent !== 'ship') {
      cell.style.background = 'green';
      cell.textContent = 'ship';
      player2_lives.textContent--;
      if (player2_lives.textContent === "0") {
        alert(`Congratulations ${currentPlayer.name}. You win!`);
        return;
      }
      currentPlayer = player1;
    } else if (cell.value === 0) {
      cell.style.visibility = 'hidden';
      currentPlayer = player2;
      playerTurn.textContent = player2.name;
    } 
  } else if (currentPlayer === player2 && board_Player1.contains(cell)) {
    if (cell.value === 1 && cell.textContent !== 'ship') {
      cell.style.background = 'green';
      cell.textContent = 'ship';
      player1_lives.textContent--;
      if (player1_lives.textContent === "0") {
        alert(`Congratulations ${currentPlayer.name}. You win!`);
        return;
      }
      currentPlayer = player2;
    } else if (cell.value === 0) {
      cell.style.visibility = 'hidden';
      currentPlayer = player1;
      playerTurn.textContent = player1.name;
    }
  }
  return `The winner is ${currentPlayer.name}!`;
}


