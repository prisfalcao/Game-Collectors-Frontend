const API_BASE_URL = 'http://127.0.0.1:5000';

document.getElementById('add-game-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formElement = document.getElementById('add-game-form');
    const formData = new FormData(formElement)

    try {
        const response = await fetch(`${API_BASE_URL}/game`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro ao adicionar o jogo:', errorData);
            throw new Error(`Erro de resposta da API: ${response.status}`);
        }
        fetchGames();
    } catch (error) {
        console.error('Error adding the game: ', error);
    }
});

async function fetchGames() {
    try {
        const response = await fetch(`${API_BASE_URL}/games`);
        const data = await response.json();

        const games = data.games || data;

        const gameList = document.getElementById('game-list');
        gameList.innerHTML = '';

        games.forEach((game) => {
            const gameItem = document.createElement('li');
            const gameInfo = document.createElement('div');
            gameInfo.innerHTML = `<strong>${game.name}</strong> For: ${game.platform} - released in ${game.release_date} <br>
                                   Developed by: ${game.developer} <br>
                                   Condition of the item: ${game.condition}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => removeGame(game.game_id);

            gameItem.appendChild(gameInfo);
            gameItem.appendChild(removeButton);
            gameList.appendChild(gameItem);
        });
    } catch (error) {
        console.error('Error loading the game list:', error);
    }
}

async function removeGame(gameId) {
    try {
        const response = await fetch(`${API_BASE_URL}/game?game_id=${gameId}`, {method: 'DELETE'});

        if (response.ok) {
        fetchGames();
        } else {
            console.error('Error removing the game from the collection:', await response.json());
        }
    } catch (error) {
        console.error('Error removing the game from the collection:', error);
    }
}

document.addEventListener("DOMContentLoaded", fetchGames);