'use strict';

// Global Variables 
var endGame = 3;
var playerWins = 0;
var computerWins = 0;
var round = 1;
var playerMove;
var computerMove;
var winner;
var playerName = "Player";

// New Game
function newGame() {
	playerWins = 0;
	computerWins = 0;
	round = 1;
	$("tbody").html("");
	$(".winner_message").remove();
	refreshScores();
	$("#change_wins_form").slideDown("slow");
}

// Get Player Move
function getMove(playerSelection) {
	playerMove = playerSelection;
	winner = getWinner(playerMove, randomPlay());
	createHistoryRow(winner);
	refreshScores();
	round += 1;
}

// Random Play for Computer
function randomPlay() {
    var randomNumber = Math.random();
    if (randomNumber < 0.33) {
    	computerMove = "rock";
        return "rock";
    } else if (randomNumber < 0.66) {
    	computerMove = "paper";
        return "paper";
    } else {
    	computerMove = "scissors";
        return "scissors";
    }
} 

// Get Winner
function getWinner(playerMove, computerMove) {
    if (playerMove === "rock") {
        switch (computerMove) {
            case "rock":
                winner = "tie";
                break;
            case "paper":
                computerWins += 1;
                winner = "computer";
                break;
            case "scissors":
                playerWins += 1;
                winner = "player";
                break;
            default:
                winner = "Someone didn't pick!";
        } //closes switch
    } else if (playerMove === "paper") {
         switch (computerMove) {
            case "rock":
                winner = "player";
                playerWins += 1;
                break;
            case "paper":
                winner = "tie";
                break;
            case "scissors":
                winner = "computer";
                computerWins += 1;
                break;
            default:
                winner = "Someone didn't pick!";
        } // closes switch
    } else if (playerMove === "scissors") {
         switch (computerMove) {
            case "rock":
                winner = "computer";
                computerWins += 1;
                break;
            case "paper":
                winner = "player";
                playerWins += 1;
                break;
            case "scissors":
                winner = "tie";
                break;
            default:
                winner = "Someone didn't pick!";
        } // closes switch
    } // closes else if
    return winner;
} // closes getWinner
	
// Update Scoreboard 
function refreshScores() {
	$(".computer_score").html(computerWins);
	$(".player_score").html(playerWins);

	if (playerWins >= endGame) {
		if ($(".winner_message").length) {
			// do nothing
		} else if (playerName === "Player") {
			$(".modal-title").prepend("<h1 class='winner_message'>Yay! You Won!</h1>");
		}
		else {
			$(".modal-title").prepend("<h1 class='winner_message'>Yay! " + playerName + " Won!</h1>");
		}
		$("#myModal").modal("show");

	} else if (computerWins >= endGame) {
		if ($(".winner_message").length) {
			// do nothing
		} else {
			$(".modal-title").prepend("<h1 class='winner_message'>Game Over &ndash; Computer Won</h1>");
		}		
		$("#myModal").modal("show");
    }
}

// Create History Row
function createHistoryRow(winner) {
	var historyRowData;
	historyRowData += "<tr><td>" + round + "</td>";
	historyRowData += "<td class='playerDataCell'><i class='fa'></i>" + playerMove + "</td>";
	historyRowData += "<td class='computerDataCell'><i class='fa'></i>" + computerMove + "</td>";

	$("tbody").append(historyRowData);

		// Add Icon
		if (playerMove === "rock") {
			$("td[class='playerDataCell']:last i").addClass('fa-hand-rock-o');
		} else if (playerMove === "paper") {
			$("td[class='playerDataCell']:last i").addClass('fa-hand-paper-o');
		} else if (playerMove === "scissors") {
			$("td[class='playerDataCell']:last i").addClass('fa-hand-scissors-o');
		}

		if (computerMove === "rock") {
			$("td[class='computerDataCell']:last i").addClass('fa-hand-rock-o');
		} else if (computerMove === "paper") {
			$("td[class='computerDataCell']:last i").addClass('fa-hand-paper-o');
		} else if (computerMove === "scissors") {
			$("td[class='computerDataCell']:last i").addClass('fa-hand-scissors-o');
		}

		// Add Win Class
		if (winner === "player") {
			$("td[class='playerDataCell']:last").addClass('win');
		} else if (winner === "computer") {
			$("td[class='computerDataCell']:last").addClass('win');
		}

		// Capitalize First Letter
		$("td").css("text-transform", "capitalize");
}

// Set New Game Parameters
function submitNewGameForm() {

	// Set Number of Wins to End the Game
	endGame = parseInt($("#numberOfWins").val());
	if ((endGame === NaN) || (endGame > 10)) {
		alert("Please pick a number between 1 and 10.");
	} else {
		$("div.scoreboard h4").html(endGame + " Wins Ends the Game");
		$("#change_wins_form").slideUp("slow");
		$(".action_items").fadeIn("slow");
	}

	// Get Player Name
	playerName = ($("#playerName").val());
	$(".player_name").html(playerName);
}

// Button Click Actions
$("button.newgame").click(newGame);
$("#change_wins_form").submit(function(e) {
	e.preventDefault();
	submitNewGameForm();
});
$("button.rock").click(function() {getMove("rock");});
$("button.paper").click(function() {getMove("paper");});
$("button.scissors").click(function() {getMove("scissors");});

$(document).ready(function() {

	$(".action_items").hide();
	$("#change_wins_form").hide();

});