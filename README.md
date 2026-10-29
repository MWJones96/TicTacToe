# TicTacToe

A noughts and crosses (tic-tac-toe) game in the browser, written in plain JavaScript.

## Overview

You play O against a computer opponent that plays X. Click an empty square to make your move; the opponent replies immediately. The game announces a win, a loss or a draw and then stops accepting moves.

## Features

- 3x3 board drawn with an HTML table.
- Win detection for rows, columns and both diagonals.
- Draw detection when the board is full.
- A simple opponent that always takes the first free square (top left to bottom right). It does not try to win or block.

## Tech stack

HTML, CSS and plain JavaScript. There are no dependencies or build step.

## Getting started

Open `index.html` in a web browser. Reload the page to start a new game.

## Project structure

```
index.html     Board and result message
style.css      Board layout and styling
tictactoe.js   Game logic: move handling, opponent move, and win and draw checks
```

## Limitations

- There is no restart button; reload the page to play again.
- The player always moves first.
