import { useState, useEffect } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [recordedTimes, setRecordedTimes] = useState([]);
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return { hours, minutes, secs };
  };
  const { hours, minutes, secs } = formatTime(seconds);
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
    const currentTime = formatTime(seconds);
    const formattedTime = `${currentTime.hours.toString().padStart(2, '0')}:${currentTime.minutes.toString().padStart(2, '0')}:${currentTime.secs.toString().padStart(2, '0')}`;
    setRecordedTimes((prevTimes) => [...prevTimes, formattedTime]);
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
    setRecordedTimes([]);
  };

  return (
    <div className='second'>
      <h1>
        {(hours < 10 ? "0" : "") + hours}:
        {(minutes < 10 ? "0" : "") + minutes}:
        {(secs < 10 ? "0" : "") + secs}
      </h1>
      <div>
        <button className='second-button' onClick={handleStart}>Başlat</button>
        <button className='second-button' onClick={handlePause}>Dayandır</button>
        <button className='second-button' onClick={handleReset}>Sıfırla</button>
      </div>
      <div className="records">
        <h3>Keçmiş ölçmələr:</h3>
        {recordedTimes.map((time, index) => (
          <p key={index}>{time}</p>
        ))}
      </div>
    </div>
  );
};

export default Stopwatch;
