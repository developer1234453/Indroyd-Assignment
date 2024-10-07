import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeDisplay = () => {
  const gameUrl = `http://${window.location.hostname}:3000`; 

  console.log("Game URL:", gameUrl); 

  return (
    <div className="qr-code-display">
      <h2>Scan to Join the Game</h2>
      <QRCodeCanvas value={gameUrl} size={150} />
    </div>
  );
};

export default QRCodeDisplay;
