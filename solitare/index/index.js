document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('start-btn');
    if (button) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../game/solitare.html';
        });
    }
});

