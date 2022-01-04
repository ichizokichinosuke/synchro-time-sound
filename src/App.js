import { useState, useCallback, useRef } from 'react';
import { useTime } from 'react-timer-hook';
import useSound from 'use-sound';
import Sound from './sounds/sound_1sec.mp3';
// import logo from './logo.svg';
import './App.css';

function setIntervCallback(soundPlay) {
  // setCount(c=>c+1);
  soundPlay();
}

function MyTime () {
  const {seconds, minutes, hours, ampm} = useTime({format: "12-hour"});
  const [count, setCount] = useState(0);
  const [nowStyle, setStyle] = useState("#282c34");
  const [soundPlay, {soundStop, soundPause}] = useSound(Sound);

  const intervalRef = useRef(null);
  const start = useCallback(() => {
    if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(() => {
      setCount(c => {
        console.log(c);
        if ((c+1) % 10 === 0 || c === 0) {
          setIntervCallback(soundPlay);
          setStyle("#FD461E");
        }
        else {
          setStyle("#282c34");
        }
        return c+1;
      });
    }, 1000);
  }, [soundPlay]);

  const stop = useCallback(() => {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCount(0);
  }, []);

  const zeroPad3Digits = new Intl.NumberFormat('ja', { minimumIntegerDigits: 2 })

  const strHours = zeroPad3Digits.format(hours);
  const strMinutes = zeroPad3Digits.format(minutes);
  const strSeconds = zeroPad3Digits.format(seconds);

  return (
    <div style={{textAlign: "center", backgroundColor: nowStyle}}>
      <h2>{nowStyle}</h2>
      <h1>React timer hook</h1>
      <p>Current Time</p>
      <div style={{fontSize: "100px"}}>
      <span>{ampm} </span><span className='span'>{strHours}</span>:<span className='span'>{strMinutes}</span>:<span className='span'>{strSeconds}</span>
      </div>
      <div style={{fontSize: "50px"}}>
        count seconds: {count}
      </div>
      <div>
        <button className="btn btn--orange btn--radius" onClick={start}>start</button>
        <button className="btn btn--radius" onClick={stop}>stop</button>
        <button className="btn btn--radius" onClick={reset}>reset</button>
      </div>
    </div>
  )
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MyTime />
      </header>
    </div>
  );
}

export default App;
