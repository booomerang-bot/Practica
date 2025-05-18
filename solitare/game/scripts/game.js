export function resetGame(deckDeal) {
    createDeck();
    shuffleDeck();
    renderDeckPile();
    dealCards();
    deckDeal.innerHTML = "";
    renderFoundations();
}