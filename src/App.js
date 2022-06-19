import React, { useState, useEffect } from 'react';

import Eat from './Eat';
import Wake from './Wakeup';
import Work from './Work';
import Home from './GettingHome';
import Lost from './Lost';
import './App.css';
export default function App() {
  const [health, setHealth] = useState(100);
  const [time, setTime] = useState(0);
  const [timeCyc, setTimeCyc] = useState(0);
  const [message, setMessage] = useState('');

  const [Click, setClick] = useState(false);
  const [Clicks, setClicks] = useState(4);
  const [littleMeels, setLittleMeels] = useState(5);

  useEffect(() => {
    let timer;
    timer = setInterval(() => {
      setTime(time + 1);
      setTimeCyc(timeCyc + 1);
      if (health < 0 || health === 0) {
        setMessage(Lost);
        setHealth(0);
        setTime(0);
        setClick(false);
        setLittleMeels(0);
        return;
      }
      if (timeCyc < 0 || timeCyc === 0) {
        setClick(false);
        setMessage('Sleeping 🛌');
      }
      if (timeCyc === 5) {
        setClicks(4);
        setClick(false);
        setLittleMeels(5);
        setMessage(<Wake />);
        setHealth(health - 40);
      } else if (timeCyc === 8) {
        setMessage(<Eat />);

        setClick(true);
      } else if (timeCyc === 20) {
        if (health < 0) {
          setHealth(0);
        }
        setClick(false);
        setMessage(<Work />);
        setHealth(health - 30);
      } else if (timeCyc === 30) {
        setMessage(<Home />);
        setHealth(health - 40);
      } else if (timeCyc === 40) {
        if (health < 0) {
          setHealth(0);
        }

        setClick(true);
        setClicks(4);
        setMessage(<Eat />);
      } else if (timeCyc === 50) {
        if (health < 0) {
          setHealth(0);
        }
        setClick(false);
        setMessage('Sleeping 🛌');
        setTime(0);
        setTimeCyc(-5);
      }
      if (health < 0) {
        setHealth(0);
      }
    }, 1000);

    if (health < 0 || health === 0) {
      setMessage(Lost);
      setHealth(0);
      return;
    }

    return () => clearInterval(timer);
  }, [health, time, timeCyc]);

  return (
    <div className="container">
      <h1 style={{ color: '#99cc00' }}>TamaGotchi</h1>
      <h3>To keep him Alive press Feed button, while he is eating</h3>
      <h4>In Critical Condtition of health use snack to make health better</h4>
      <p className="snacks">Snacks Left:{littleMeels}</p>
      <div className="health">
        <div>
          Health {health}
          <span>%</span>
        </div>
        <div>{message}</div>
      </div>
      {time}
      <div>
        <button
          onClick={(e) => {
            if (Click === true && Clicks > 0 && Clicks < 5) {
              setClicks(Clicks - 1);
              console.log(Clicks);
              if (health < 101) {
                if (health + 10 > 100) {
                  setMessage(`Can't eat more huh`);
                } else {
                  setHealth(health + 10);
                }
              } else if (health <= 0) {
                setMessage(Lost);
                setHealth(0);
                return;
              }
            } else if (Click === true && Clicks === 0) {
              setMessage(`Can't eat more huh`);
            }
            if (
              littleMeels > 0 &&
              littleMeels < 6 &&
              Click === false &&
              health < 100
            ) {
              setLittleMeels(littleMeels - 1);
              console.log(littleMeels, 'hello');
              if (health < 101) {
                if (health + 10 > 100) {
                  setMessage('Cant eat more huh');
                  setLittleMeels(littleMeels + 1);
                } else {
                  setHealth(health + 10);
                }
              }
            } else if (littleMeels === 0 && Click === false) {
              setLittleMeels('No more snacks left');
            }
          }}
        >
          Feed me
        </button>
      </div>
    </div>
  );
}
