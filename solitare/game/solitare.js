import { getColor, getNumericValue, getCardImagePath } from './scripts/utils.js';
import { createDeck, shuffleDeck, drawCard, renderDeckPile } from './scripts/deck.js';
import { createCardElement, dealCards } from './scripts/board.js';
import { onDragStart, onDragOver, onDrop } from './scripts/dragdrop.js';
import { renderFoundations, onFoundationDragOver, onFoundationDrop } from './scripts/foundation.js';

document.addEventListener("DOMContentLoaded", function () {
    window.deck = [];
    window.suits = ["diamonds", "hearts", "spades", "clubs"];
    window.values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    window.deckDeal = document.getElementById("deck-deal");
    window.deckPile = document.getElementById("deck-pile");
    window.board = document.getElementById("board");
    window.finish = document.getElementById("finish");

    createDeck();
    shuffleDeck();
    renderDeckPile();
    dealCards();
    renderFoundations();
    window.deckDeal.innerHTML = "";

    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", function resetGame() {
        createDeck();
        shuffleDeck();
        renderDeckPile();
        dealCards();
        window.deckDeal.innerHTML = "";
        renderFoundations();
    });
});