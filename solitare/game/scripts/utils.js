export const valueIndex = {
    "A": 0, "2": 1, "3": 2, "4": 3, "5": 4,
    "6": 5, "7": 6, "8": 7, "9": 8, "10": 9,
    "J": 10, "Q": 11, "K": 12
};
export const suitOffset = {
    diamonds: 1,
    hearts: 14,
    spades: 27,
    clubs: 40
};
export function getColor(suit) {
    return (suit === "hearts" || suit === "diamonds") ? "red" : "black";
}
export function getNumericValue(value) {
    return valueIndex[value];
}
export function getCardImagePath(value, suit) {
    const tileNumber = suitOffset[suit] + valueIndex[value];
    return `sprites/tile${tileNumber.toString().padStart(3, '0')}.png`;
}