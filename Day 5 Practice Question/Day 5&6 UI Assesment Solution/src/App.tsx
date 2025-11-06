import React, { useState } from 'react';

// Interface
interface NumberItem {
  value: number;
}

// Constructor Class
class NumberProcessor {
  numbers: number[];
  
  constructor(numbers: number[]) {
    this.numbers = numbers;
  }
  
  getSum(): number {
    return this.numbers.reduce((acc, curr) => acc + curr, 0);
  }
  
  getAverage(): number {
    return this.getSum() / this.numbers.length;
  }
}

// Main App
const App: React.FC = () => {
  const initialNumbers: NumberItem[] = [
    { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 },
    { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }
  ];
  
  const [numbers, setNumbers] = useState<NumberItem[]>(initialNumbers);
  const [logs, setLogs] = useState<string[]>([]);
  const [hoistOutput, setHoistOutput] = useState<string[]>([]);
  const [stats, setStats] = useState<{ sum: number; average: number } | null>(null);
  
  // Filter - Show only even numbers
  const handleFilter = () => {
    const filtered = initialNumbers.filter(item => item.value % 2 === 0);
    setNumbers(filtered);
  };
  
  // Map - Double all numbers
  const handleMap = () => {
    const mapped = initialNumbers.map(item => ({ value: item.value * 2 }));
    setNumbers(mapped);
  };
  
  // Reset
  const handleReset = () => {
    setNumbers(initialNumbers);
  };
  
  // forEach - Log numbers
  const handleLog = () => {
    const newLogs: string[] = [];
    numbers.forEach((item, index) => {
      const logMessage = `Index ${index}: Value = ${item.value}`;
      console.log(logMessage);
      newLogs.push(logMessage);
    });
    setLogs(newLogs);
  };
  
  // Hoisting Demo
  const demonstrateHoisting = () => {
    const results: string[] = [];
    
    results.push('Variable Hoisting:');
    results.push(`Before: x = ${typeof x}`);
    var x = 10;
    results.push(`After: x = ${x}`);
    
    results.push('Function Hoisting:');
    results.push(`Result: ${hoistedFunction()}`);
    
    function hoistedFunction() {
      return 'Function called before declaration!';
    }
    
    setHoistOutput(results);
  };
  
  // Constructor Demo
  const calculateStats = () => {
    const values = numbers.map(item => item.value);
    const processor = new NumberProcessor(values);
    
    setStats({
      sum: processor.getSum(),
      average: processor.getAverage()
    });
  };
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>JSX and JavaScript Concepts</h1>
      
      {/* Number List */}
      <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
        <h2>Number List</h2>
        <div>
          {numbers.map((item, index) => (
            <span key={index} style={{ 
              display: 'inline-block', 
              padding: '10px', 
              margin: '5px',
              border: '1px solid blue',
              backgroundColor: '#e0f0ff'
            }}>
              {item.value}
            </span>
          ))}
        </div>
      </div>
      
      {/* Filter, Map, Reset Buttons */}
      <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
        <h2>Array Methods</h2>
        <button onClick={handleFilter} style={{ margin: '5px', padding: '10px' }}>
          Filter (Even Numbers)
        </button>
        <button onClick={handleMap} style={{ margin: '5px', padding: '10px' }}>
          Map (Double Values)
        </button>
        <button onClick={handleReset} style={{ margin: '5px', padding: '10px' }}>
          Reset
        </button>
      </div>
      
      {/* Logger (forEach) */}
      <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
        <h2>Logger (forEach)</h2>
        <button onClick={handleLog} style={{ padding: '10px' }}>
          Log Numbers to Console
        </button>
        {logs.length > 0 && (
          <div style={{ marginTop: '10px', backgroundColor: '#f5f5f5', padding: '10px' }}>
            {logs.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
          </div>
        )}
      </div>
      
      {/* Hoisting Demo */}
      <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
        <h2>Hoisting Demonstration</h2>
        <button onClick={demonstrateHoisting} style={{ padding: '10px' }}>
          Demonstrate Hoisting
        </button>
        {hoistOutput.length > 0 && (
          <div style={{ marginTop: '10px', backgroundColor: '#f5f5f5', padding: '10px' }}>
            {hoistOutput.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        )}
      </div>
      
      {/* Constructor Demo */}
      <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
        <h2>Constructor Demonstration</h2>
        <button onClick={calculateStats} style={{ padding: '10px' }}>
          Calculate Stats
        </button>
        {stats && (
          <div style={{ marginTop: '10px' }}>
            <p><strong>Sum:</strong> {stats.sum}</p>
            <p><strong>Average:</strong> {stats.average.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
