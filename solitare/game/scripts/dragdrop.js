import { getColor, getNumericValue, getCardImagePath } from './utils.js';

export function onDragStart(event) {
    const cardEl = event.target.closest(".card");
    if (!cardEl.classList.contains("face-up")) return;

    const parentPile = cardEl.parentElement;
    const cards = Array.from(parentPile.children);
    const cardIndex = cards.indexOf(cardEl);
    const stack = cards.slice(cardIndex);

    stack.forEach(card => card.dataset.dragging = "true");
    event.dataTransfer.setData("text/plain", "stack");
    event.dataTransfer.setDragImage(cardEl, 10, 10);
}

export function onDragOver(event) {
    event.preventDefault();
}

export function onDrop(event) {
    event.preventDefault();
    if (event.dataTransfer.getData("text/plain") !== "stack") return;

    let pile = event.currentTarget;
    if (pile.classList.contains('pile-slot')) {
        pile = pile.parentElement;
    }

    const draggingCards = Array.from(document.querySelectorAll('.card[data-dragging="true"]'));
    if (draggingCards.length === 0) return;

    const oldParent = draggingCards[0].parentElement;

    const cardEl = draggingCards[0];
    const draggedSuit = cardEl.dataset.suit;
    const draggedValue = cardEl.dataset.value;
    const draggedColor = getColor(draggedSuit);
    const draggedNumeric = getNumericValue(draggedValue);

    const lastCard = Array.from(pile.children).filter(c => c.classList.contains("card")).pop();

    if (lastCard) {
        const targetSuit = lastCard.dataset.suit;
        const targetValue = lastCard.dataset.value;
        const targetColor = getColor(targetSuit);
        const targetNumeric = getNumericValue(targetValue);

        const isOppositeColor = draggedColor !== targetColor;
        const isOneLess = draggedNumeric === targetNumeric - 1;

        if (!isOppositeColor || !isOneLess) {
            draggingCards.forEach(card => card.removeAttribute("data-dragging"));
            return;
        }
    } else {
        if (draggedValue !== "K") {
            draggingCards.forEach(card => card.removeAttribute("data-dragging"));
            return;
        }
    }
    draggingCards.forEach(card => {
        card.removeAttribute("data-dragging");
        pile.appendChild(card);
    });

    // Re-stack cards in the pile
    const cards = Array.from(pile.children).filter(c => c.classList.contains("card"));
    cards.forEach((card, idx) => {
        card.style.top = `${idx * 25}px`;
        card.style.left = `0px`;
        card.style.zIndex = idx;
    });

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