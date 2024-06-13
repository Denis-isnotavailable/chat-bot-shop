
import { useEffect } from 'react';
import './App.css';

const tg = window.Telegram.WebApp;

function App() {

  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  }

  return (
    <div className="App">
      
      my app

      <button type='button' onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default App;