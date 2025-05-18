import { getCardImagePath } from './utils.js';
import { onDragStart, onDragOver, onDrop } from './dragdrop.js';

export function createCardElement(card, faceUp) {
    const div = document.createElement("div");
    div.className = "card" + (faceUp ? " face-up" : " face-down");
    div.dataset.suit = card.suit;
    div.dataset.value = card.value;

    const img = document.createElement("img");
    if (faceUp) {
        img.src = getCardImagePath(card.value, card.suit);
        img.alt = `${card.value} of ${card.suit}`;
        img.draggable = true;
        img.addEventListener("dragstart", onDragStart);
    } else {
        img.src = "sprites/tile000.png";
        img.alt = "Card Back";
        img.draggable = false;
    }

    div.appendChild(img);
    return div;
}

export function dealCards() {
    const board = window.board;
    const deck = window.deck;
    board.innerHTML = "";
    let pileCount = 7;
    for (let i = 0; i < pileCount; i++) {
        const pile = document.createElement("div");
        pile.className = "pile";
        pile.addEventListener("dragover", onDragOver);
        pile.addEventListener("drop", onDrop);
        const slot = document.createElement("div");
        slot.className = "pile-slot";
        pile.appendChild(slot);

        for (let j = 0; j <= i; j++) {
            const card = deck.pop();
            const cardDiv = createCardElement(card, j === i);
            cardDiv.style.top = `${j * 25}px`;
            pile.appendChild(cardDiv);
        }

        board.appendChild(pile);
    }
}