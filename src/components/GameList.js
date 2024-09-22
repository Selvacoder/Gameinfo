import React, { useState } from 'react';
import GameCard from './GameCard'; // Ensure correct import path

const GameList = ({ games }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const gamesPerPage = 15;

    const totalPages = Math.ceil(games.length / gamesPerPage);
    
    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const currentGames = games.slice(currentPage * gamesPerPage, (currentPage + 1) * gamesPerPage);

    return (
        <div>
            <h1>Game List</h1>
            <div className="game-list">
                {currentGames.length > 0 ? (
                    currentGames.map(game => (
                        <GameCard
                            key={game.id}
                            id={game.id}
                            name={game.name}
                            description={game.description}
                            image={game.image}
                        />
                    ))
                ) : (
                    <p>No games found.</p>
                )}
            </div>
            <div>
                <button onClick={handlePrevious} disabled={currentPage === 0}>
                    Previous
                </button>
                <button onClick={handleNext} disabled={currentPage === totalPages - 1}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default GameList;
