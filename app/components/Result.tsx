
import React from 'react'
import "../globals.css";

interface ResultProps {
  result: string;
}

function Result({result}: ResultProps) {
  return (
    <div>
      <p className='result_text'>{result}</p>
    </div>
  );
}

export default Result