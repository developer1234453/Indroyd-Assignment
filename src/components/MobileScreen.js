import React from 'react';

const MobileScreen = ({ currentQuestion, onJoin, onAnswer, players, congratulationMessage }) => {
  return (
    <div className="mobile-screen">
      <h2>{currentQuestion.question}</h2>
      {currentQuestion.options.map((option) => (
        <button key={option} onClick={() => onAnswer(players[0], option)}>
          {option}
        </button>
      ))}
      <div className="congratulation-message">{congratulationMessage}</div>
    </div>
  );
};

export default MobileScreen;
