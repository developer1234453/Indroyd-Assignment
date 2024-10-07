import React from 'react';

const GameScreen = ({ questions, currentQuestion, players, answers, onAnswer }) => {
  return (
    <div className="game-screen">
      <h2>{questions[currentQuestion].question}</h2>
      {questions[currentQuestion].options.map((option) => (
        <button key={option} onClick={() => onAnswer(players[0], option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default GameScreen;
