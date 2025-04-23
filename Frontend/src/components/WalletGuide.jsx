import React from 'react';
import { Card, Button } from './';

const WalletGuide = ({ onGetStarted }) => {
  return (
    <Card className="wallet-guide">
      <h3>Welcome to Your Digital Memory Journal</h3>
      <div className="guide-steps">
        <div className="guide-step">
          <span className="step-number">1</span>
          <p>Write your memories, thoughts, or experiences</p>
        </div>
        <div className="guide-step">
          <span className="step-number">2</span>
          <p>Add photos or videos to capture the moment</p>
        </div>
        <div className="guide-step">
          <span className="step-number">3</span>
          <p>Your entries are automatically saved to IPFS and verified on the Base blockchain</p>
        </div>
        <div className="guide-step">
          <span className="step-number">4</span>
          <p>Access your memories anytime, anywhere - they're permanently stored and tamper-proof</p>
        </div>
      </div>
      <Button 
        onClick={onGetStarted}
        variant="primary"
        className="get-started-btn"
      >
        Start Writing
      </Button>
    </Card>
  );
};

export default WalletGuide;