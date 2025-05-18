import { createCardElement } from './board.js';
import { onDragStart } from './dragdrop.js';

export function createDeck() {
    const deck = window.deck;
    const suits = window.suits;
    const values = window.values;
    deck.length = 0;
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
}

export function shuffleDeck() {
    const deck = window.deck;
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

export function drawCard() {
    const deck = window.deck;
    const deckDeal = document.getElementById("deck-deal");
    if (deck.length === 0) {
        const cards = Array.from(deckDeal.querySelectorAll(".card"));
        cards.reverse().forEach(card => {
            deck.push({
                suit: card.dataset.suit,
                value: card.dataset.value
            });
        });
        deckDeal.innerHTML = "";
        renderDeckPile();
        return;
    }

    const card = deck.pop();
    const cardEl = createCardElement(card, true);
    cardEl.addEventListener("dragstart", onDragStart);
    deckDeal.appendChild(cardEl);
    const cards = deckDeal.querySelectorAll(".card");
    cards.forEach((c, idx) => {
        c.style.left = `${idx * 10}px`;
        c.style.zIndex = idx;
        if (idx === cards.length - 1) {
            c.classList.add("face-up");
            c.classList.remove("face-down");
            c.querySelector("img").draggable = true;
        } else {
            c.classList.remove("face-up");
            c.classList.add("face-down");
            c.querySelector("img").draggable = false;
            c.querySelector("img").src = "sprites/tile000.png";
            c.querySelector("img").alt = "Card Back";
        }
    });
}

export function renderDeckPile() {
    const deckPile = window.deckPile;
    deckPile.innerHTML = "";
    const backCard = document.createElement("div");
    backCard.className = "card back";

    const img = document.createElement("img");
    img.src = "sprites/tile000.png";
    img.alt = "Card Back";
    img.addEventListener("click", drawCard);

    backCard.appendChild(img);
    deckPile.appendChild(backCard);
    const oldParent = backCard.parentElement;
    if (oldParent) {
        const remaining = Array.from(oldParent.children).filter(c => c.classList.contains("card"));
        if (remaining.length > 0) {
            const top = remaining[remaining.length - 1];
            if (top.classList.contains("face-down")) {
                top.classList.remove("face-down");
                top.classList.add("face-up");
                const value = top.dataset.value;
                const suit = top.dataset.suit;
                const img = top.querySelector("img");
                img.src = getCardImagePath(value, suit);
                img.alt = `${value} of ${suit}`;
                img.draggable = true;
                img.addEventListener("dragstart", onDragStart);
            }
        }
    }
}