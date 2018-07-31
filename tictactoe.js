let player = "X";
let ai = "O";
let BOARD_SIZE = 3;

let available_squares = Array.apply(null, {length: 9}).map(Function.call, Number);

init();

/**
	Initialises the event listeners for all of the buttons on the TicTacToe grid
**/
function init()
{
	available_squares = Array.apply(null, {length: 9}).map(Function.call, Number);
	for(i=0;i<available_squares.length;i++)
	{
		document.getElementById(i.toString()).innerHTML = "";
		document.getElementById(i.toString()).addEventListener("click", process_button);
	}
}

function process_button()
{
	
	if(available_squares.indexOf(Number(event.target.id)) > -1)
	{
		event.target.innerHTML = "X";
		delete available_squares[Number(event.target.id)];
		if(isWon(player, Number(event.target.id)))
		{
			console.log("Player Won!");
			wrap_up("You won!");
			return;
		}
		
		if(available_squares.filter(function(el){
			return el != null;
		}).length == 0)
		{
			console.log("Draw");
			wrap_up("Draw.");
			return;
		}
		
		let firstIndex = available_squares.filter(function(el){
			return el != null;
		})[0];
		
		console.log(firstIndex);
		
		delete available_squares[firstIndex];
		document.getElementById(firstIndex.toString()).innerHTML = "O";
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

function check_column(player, placePos)
{
	let col0 = document.getElementById(placePos.toString()).innerHTML;
	let col1 = document.getElementById(((placePos + 3) % 9).toString()).innerHTML;
	let col2 = document.getElementById(((placePos + 6) % 9).toString()).innerHTML;
	
	return (col0 === player && col1 === player && col2 === player);
}

function check_row(player, placePos)
{
	let offset = Math.floor(placePos / 3);
	
	let r1 = 3*offset + ((placePos + 0) % 3);
	let r2 = 3*offset + ((placePos + 1) % 3);
	let r3 = 3*offset + ((placePos + 2) % 3);
	
	let col0 = document.getElementById(r1.toString()).innerHTML;
	let col1 = document.getElementById(r2.toString()).innerHTML;
	let col2 = document.getElementById(r3.toString()).innerHTML;
		
	return (col0 === player && col1 === player && col2 === player);
}

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