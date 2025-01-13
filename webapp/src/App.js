import React, { useState } from 'react';

function App() {
  const [startingNumber, setStartingNumber] = useState('');
  const [finalNumber, setFinalNumber] = useState('');
  const [intervalSkip, setIntervalSkip] = useState('');
  const [responses, setResponses] = useState([]);
  const [result, setResult] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const start = parseInt(startingNumber);
    const end = parseInt(finalNumber);
    const interval = parseInt(intervalSkip);
    const neg = ["n", "no", "reject"];
    const pos = ["y", "yes", "accept"];
    let settlementReached = false;

    for (let i = start; i <= end; i += interval) {
      const plaintiffResponse = prompt(`Plaintiff: what is your response to $${i}?`);
      const defendantResponse = prompt(`Defendant: what is your response to $${i}?`);

      if (neg.includes(plaintiffResponse.toLowerCase()) || neg.includes(defendantResponse.toLowerCase())) {
        continue;
      } else if (pos.includes(plaintiffResponse.toLowerCase()) && pos.includes(defendantResponse.toLowerCase())) {
        setResult(`Congratulations! Both sides are willing to settle the case at $${i}.`);
        settlementReached = true;
        break;
      }
    }

    if (!settlementReached) {
      setResult("Unfortunately it does not appear the parties have any common ground.");
    }
  };

  return (
    <div>
      <h1>Hotseat Mediator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Starting Number: </label>
          <input type="number" value={startingNumber} onChange={(e) => setStartingNumber(e.target.value)} required />
        </div>
        <div>
          <label>Final Number: </label>
          <input type="number" value={finalNumber} onChange={(e) => setFinalNumber(e.target.value)} required />
        </div>
        <div>
          <label>Interval Skip: </label>
          <input type="number" value={intervalSkip} onChange={(e) => setIntervalSkip(e.target.value)} required />
        </div>
        <button type="submit">Start Negotiation</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
}

export default App;
