import React, { useState } from 'react';
import GameScreen from './components/GameScreen';
import MobileScreen from './components/MobileScreen';
import QRCodeDisplay from './components/QRCodeDisplay';
import './styles.css';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [congratulationMessage, setCongratulationMessage] = useState('');

  const questions = [
    { question: "What is the capital of France?", options: ["A. Paris", "B. Berlin", "C. Madrid", "D. Rome"], correct: "A" },
    { question: "Who developed the theory of relativity?", options: ["A. Newton", "B. Einstein", "C. Galileo", "D. Curie"], correct: "B" },
    { question: "What is the largest ocean?", options: ["A. Atlantic", "B. Indian", "C. Pacific", "D. Arctic"], correct: "C" },
    { question: "What is the square root of 64?", options: ["A. 6", "B. 7", "C. 8", "D. 9"], correct: "C" },
    { question: "What is the chemical symbol for water?", options: ["A. O", "B. H2O", "C. CO2", "D. H"], correct: "B" },
  ];

  const handleJoin = () => {
    if (playerName && !players.includes(playerName)) {
      setPlayers([...players, playerName]);
      setPlayerName('');
      if (players.length === 0) {
        setGameStarted(true);
      }
    }
  };

  const handleAnswer = (name, answer) => {
    if (!answers[name]) { // Ensure a player can answer only once
      setAnswers({ ...answers, [name]: answer });

      // Check if the answer is correct and set the message
      if (answer === questions[currentQuestion].correct) {
        setCongratulationMessage(`Congratulations ${name}! Your answer is correct!`);
      } else {
        setCongratulationMessage(`Sorry ${name}, that's not correct. The correct answer is ${questions[currentQuestion].correct}.`);
      }

      // Proceed to the next question after a short delay
      setTimeout(() => {
        setCongratulationMessage(''); // Clear the message
        setCurrentQuestion(currentQuestion + 1); // Move to the next question

        // Check if the game should end
        if (currentQuestion + 1 >= questions.length) {
          setGameStarted(false); // Reset the game
          setCurrentQuestion(0); // Reset the question
          setAnswers({}); // Clear answers
        }
      }, 3000); // Wait for 3 seconds to display the message
    }
  };

  return (
    <div className="App">
      <QRCodeDisplay />
      {!gameStarted && (
        <div className="join-game">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            required
          />
          <button onClick={handleJoin}>Join Game</button>
        </div>
      )}
      {gameStarted && (
        <>
          <div className="congratulation-message">{congratulationMessage}</div>
          {window.innerWidth > 768 ? (
            <GameScreen
              questions={questions}
              currentQuestion={currentQuestion}
              players={players}
              answers={answers}
              onAnswer={handleAnswer} // Ensure to pass onAnswer to the GameScreen
            />
          ) : (
            <MobileScreen
              currentQuestion={questions[currentQuestion]}
              onJoin={handleJoin}
              onAnswer={handleAnswer}
              players={players}
              congratulationMessage={congratulationMessage} // Pass message to MobileScreen
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
