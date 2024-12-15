import { useState, useEffect } from 'react';
import styles from './Timer.module.css'
import { useSelector, useDispatch } from 'react-redux';
import Increment from './Increment';
import Decrement from './Decrement';

const Timer = () => {
  const [inp, setInp] = useState("");
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [recordedTimes, setRecordedTimes] = useState([]);
  
  const num = useSelector(state => state.counter.value);  
  const dispatch = useDispatch();

  useEffect(() => {
    const totalMinutes = Math.floor(num / 60);
    setHour(totalMinutes);
    setMinute(num % 60);
    setSecond(0);
  }, [num]);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSecond((prevSecond) => {
          if (prevSecond === 0) {
            if (minute === 0) {
              if (hour === 0) {
                setIsRunning(false);
                clearInterval(interval);
                return 0;
              } else {
                setHour((prevHour) => prevHour - 1);
                setMinute(59);
                return 59;
              }
            } else {
              setMinute((prevMinute) => prevMinute - 1);
              return 59;
            }
          } else {
            return prevSecond - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, hour, minute]);

  useEffect(() => {
    const totalMinutes = Number(inp);
    setHour(Math.floor(totalMinutes / 60));
    setMinute(totalMinutes % 60);
    setSecond(0);
  }, [inp]);

  const startTimer = () => {
    if (inp !== "" && Number(inp) > 0) {
      setIsRunning(true);
    } else {
      console.log("Input boşdur və ya düzgün deyil");
    }
  };

  const pauseTimer = () => {
    setIsRunning((prevState) => !prevState);

    if (isRunning) {
      const currentTime = `${hour < 10 ? "0" : ""}${hour}:${minute < 10 ? "0" : ""}${minute}:${second < 10 ? "0" : ""}${second}`;
      setRecordedTimes((prevTimes) => [...prevTimes, currentTime]);
    }
  };

  const incrementHour = () => {
    setHour((prevHour) => prevHour + 1);
  };

  const decrementHour = () => {
    setHour((prevHour) => (prevHour > 0 ? prevHour - 1 : 0));
  };

  const incrementMinute = () => {
    setMinute((prevMinute) => (prevMinute < 59 ? prevMinute + 1 : prevMinute));
  };

  const decrementMinute = () => {
    setMinute((prevMinute) => (prevMinute > 0 ? prevMinute - 1 : 0));
  };

  const incrementSecond = () => {
    setSecond((prevSecond) => (prevSecond < 59 ? prevSecond + 1 : prevSecond));
  };

  const decrementSecond = () => {
    setSecond((prevSecond) => (prevSecond > 0 ? prevSecond - 1 : 0));
  };

  return (
    <div className={styles.timer}>
      <input
        type="number"
        value={inp}
        onChange={(e) => {
          setInp(e.target.value.replace(/[^0-9]/g, ""));
        }}
      />
      <button className={styles.timerbutton} onClick={startTimer}>Start</button>
      <button className={styles.timerbutton} onClick={pauseTimer}>
        {isRunning ? "Pause" : "Resume"}
      </button>
      <div className={styles.watch}>
        <div className={styles.hour}>
          <h1>{(hour < 10 ? "0" : "") + hour}</h1>
          <div className={styles.incdec}>
            <Increment onClick={incrementHour} />
            <Decrement onClick={decrementHour} />
          </div>
        </div>
        <div className={styles.minute}>
          <h1>{(minute < 10 ? "0" : "") + minute}</h1>
          <div className={styles.incdec}>
            <Increment onClick={incrementMinute} />
            <Decrement onClick={decrementMinute} />
          </div>
        </div>
        <div className={styles.second}>
          <h1>{(second < 10 ? "0" : "") + second}</h1>
          <div className={styles.incdec}>
            <Increment onClick={incrementSecond} />
            <Decrement onClick={decrementSecond} />
          </div>
        </div>
      </div>
      <div className={styles.records}>
        <h3>Keçmiş ölçmələr:</h3>
        {recordedTimes.map((time, index) => (
          <p key={index}>{time}</p>
        ))}
      </div>
    </div>
  );
};

export default Timer;
