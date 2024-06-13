
import { useEffect } from 'react';
import './App.css';
import {useTelegram} from "./hooks/useTelegram";
import Header from './components/Header/Header';

function App() {
  const {tg} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  const onClose = () => {
    tg.close();
  }

  return (
    <div className="App">
      <Header />
      
      my app

      <button type='button' onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default App;
