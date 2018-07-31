//The player's board icon
let player = "O";
//The opponent's board icon
let ai = "X";

//The list of available squares
let available_squares = Array.apply(null, {length: 9}).map(Function.call, Number);

//Initialise the board
init();

/**
	Initialises the event listeners for all of the buttons on the TicTacToe grid
**/
function init()
{
	available_squares = Array.apply(null, {length: 9}).map(Function.call, Number);
	for(i=0;i<available_squares.length;i++)
	{
		//Add event listeners for every square
		document.getElementById(i.toString()).innerHTML = "";
		document.getElementById(i.toString()).addEventListener("click", process_button);
	}
}

function process_button()
{
	//If the square has not already been selected
	if(available_squares.indexOf(Number(event.target.id)) > -1)
	{
		//Set icon to player's symbol
		event.target.innerHTML = player;
		//Delete square from list available
		delete available_squares[Number(event.target.id)];
		
		//If the player has won, then wrap up the game and remove event listeners
		if(isWon(player, Number(event.target.id)))
		{
			console.log("Player Won!");
			wrap_up("You won!");
			return;
		}
		
		//If there are no moves left to make, then the game is a draw
		if(available_squares.filter(function(el){
			return el != null;
		}).length == 0)
		{
			console.log("Draw");
			wrap_up("Draw.");
			return;
		}
		
		//Select first available index for opponent
		let firstIndex = available_squares.filter(function(el){
			return el != null;
		})[0];
		
		console.log(firstIndex);
		
		delete available_squares[firstIndex];
		document.getElementById(firstIndex.toString()).innerHTML = ai;
		//If the AI has won
		if(isWon(ai, firstIndex))
		{
			console.log("AI Won!");
			wrap_up("You lost...");
			return;
		}
	}
	else
	{
		console.log("Square already used")
	}
	console.log(available_squares);
}

/**
	Wraps-up the game by removing event listeners and accepting no more input
**/
function wrap_up(text)
{
	document.getElementById("finished_text").innerHTML = text;
	
	for(i=0;i<9;i++)
	{
		document.getElementById(i.toString()).removeEventListener("click", process_button);
	}
}

/**
	Looks for any occurence of the player's symbol (X or O)
	appearing 3 times in a row from placePos (the last positiion placed)
**/
function isWon(player, placePos)
{
	return (check_column(player, placePos) || check_row(player, placePos) || check_diag(player, placePos));
}

/**
	Checks for column win condition
**/
function check_column(player, placePos)
{
	let col0 = document.getElementById(placePos.toString()).innerHTML;
	let col1 = document.getElementById(((placePos + 3) % 9).toString()).innerHTML;
	let col2 = document.getElementById(((placePos + 6) % 9).toString()).innerHTML;
	
	return (col0 === player && col1 === player && col2 === player);
}

/**
	Checks for row win condition
**/
function check_row(player, placePos)
{
	let offset = Math.floor(placePos / 3);
	
	let r1 = 3*offset + ((placePos + 0) % 3);
	let r2 = 3*offset + ((placePos + 1) % 3);
	let r3 = 3*offset + ((placePos + 2) % 3);
	
	let row0 = document.getElementById(r1.toString()).innerHTML;
	let row1 = document.getElementById(r2.toString()).innerHTML;
	let row2 = document.getElementById(r3.toString()).innerHTML;
		
	return (row0 === player && row1 === player && row2 === player);
}

/**
	Checks diagonals by simple brute-force
**/
function check_diag(player, placePos)
{
	let diag0 = document.getElementById("0").innerHTML;
	let diag4 = document.getElementById("4").innerHTML;
	let diag8 = document.getElementById("8").innerHTML;
	let diag6 = document.getElementById("6").innerHTML;
	let diag2 = document.getElementById("2").innerHTML;
	
	return (diag0 === player && diag4 === player && diag8 === player) || 
	       (diag6 === player && diag4 === player && diag2 === player);
}