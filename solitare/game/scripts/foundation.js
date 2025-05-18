import { getNumericValue, getCardImagePath } from './utils.js';
import { onDragStart } from './dragdrop.js';

export function renderFoundations() {
    const finish = window.finish;
    const suits = window.suits;
    if (!finish || !suits) return;
    finish.innerHTML = "";
    const suitSymbols = {
        diamonds: "♦",
        hearts: "♥",
        spades: "♠",
        clubs: "♣"
    };
    const suitColors = {
        diamonds: "red",
        hearts: "red",
        spades: "black",
        clubs: "black"
    };
    suits.forEach(suit => {
        const slot = document.createElement("div");
        slot.className = "foundation";
        slot.dataset.suit = suit;
        slot.addEventListener("dragover", onFoundationDragOver);
        slot.addEventListener("drop", onFoundationDrop);

        const symbol = document.createElement("span");
        symbol.textContent = suitSymbols[suit];
        symbol.style.color = suitColors[suit];
        symbol.style.position = "absolute";
        symbol.style.top = "4px";
        symbol.style.left = "8px";
        symbol.style.fontSize = "22px";
        slot.appendChild(symbol);

        finish.appendChild(slot);
    });
}

export function onFoundationDragOver(event) {
    event.preventDefault();
}

export function onFoundationDrop(event) {
    event.preventDefault();
    const draggingCard = document.querySelector('.card[data-dragging="true"]');
    if (!draggingCard) return;

    const oldParent = draggingCard.parentElement;
    draggingCard.removeAttribute("data-dragging");

    draggingCard.style.top = "0px";
    draggingCard.style.left = "0px";
    draggingCard.style.zIndex = "";

    event.currentTarget.appendChild(draggingCard);
    if (oldParent && oldParent.classList.contains("pile")) {
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