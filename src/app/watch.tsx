// components/StepCounterCard.tsx
import { useState } from 'react';

const Watch = ({ initialStepCount = 0 }) => {
    const [stepCount, setStepCount] = useState(initialStepCount);
  
    const incrementStepCount = () => {
      setStepCount(stepCount + 1);
      // You can also call a function to send this data to your backend here.
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-white-100">
        <div className="relative w-64 h-64 rounded-full bg-white flex items-center justify-center border white"
             onClick={incrementStepCount}
             style={{ cursor: 'pointer' }}>
          <div className="absolute inset-0 rounded-full border-8 border-gray-300"></div>
          <div className="text-white text-3xl">{stepCount}</div>
        </div>
      </div>
    );
  };
  
  export default Watch;