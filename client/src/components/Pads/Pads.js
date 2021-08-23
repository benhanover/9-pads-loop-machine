// import libraries
import { useState, useEffect } from 'react';
import { Howl, Howler } from 'howler';

// components
import Pad from '../Pad/Pad';

// sounds
import bass_groove from '../../sounds/bass_groove.mp3';
import drums from '../../sounds/drums.mp3';
import electric_guitar from '../../sounds/electric_guitar.mp3';
import funk_beats from '../../sounds/funk_beats.mp3';
import maze_politics from '../../sounds/maze_politics.mp3';
import organ from '../../sounds/organ.mp3';
import pas_groove from '../../sounds/pas_groove.mp3';
import stutter_breakbeats from '../../sounds/stutter_breakbeats.mp3';
import tanggu from '../../sounds/tanggu.mp3';

const Pads = () => {
  const initialSoundsValue = [
    { name: 'bass_groove', sound: bass_groove, on: false, id: 1 },
    { name: 'drums', sound: drums, on: false, id: 2 },
    { name: 'electric_guitar', sound: electric_guitar, on: false, id: 3 },
    { name: 'funk_beats', sound: funk_beats, on: false, id: 4 },
    { name: 'maze_politics', sound: maze_politics, on: false, id: 5 },
    { name: 'organ', sound: organ, on: false, id: 6 },
    { name: 'pas_groove', sound: pas_groove, on: false, id: 7 },
    { name: 'stutter_breakbeats', sound: stutter_breakbeats, on: false, id: 8 },
    { name: 'tanggu', sound: tanggu, on: false, id: 9 },
  ];

  const [sounds, setSounds] = useState(initialSoundsValue);
  const [playSoundsInterval, setPlaySoundsInterval] = useState();
  const [shouldIntervalRun, setShouldIntervalRun] = useState(false);
  const [howls, setHowls] = useState([]);

  const playHowls = () => {
    console.log(howls);
    howls.forEach((howlObj) => {
      howlObj.howl.play();
    });
  };

  const stopHowls = () => {
    howls.forEach((howlObj) => {
      howlObj.howl.stop();
    });
  };

  const startInterval = () => {
    // case there is a sound playing
    if (sounds.some((soundObj) => soundObj.on)) {
      if (!shouldIntervalRun) {
        playHowls();
        setShouldIntervalRun(true);
      }
      // no sound is playing
    } else {
      alert('No Sound Is On');
    }
  };

  const stopInterval = () => {
    stopHowls();
    setShouldIntervalRun(false);
  };

  useEffect(() => {
    sounds.forEach((sound) => {
      // sound should play and not already in howls
      if (sound.on && !howls.find((howlObj) => howlObj.name === sound.name)) {
        const howl = new Howl({
          src: [sound.sound],
        });
        howls.push({ name: sound.name, howl: howl });
        console.log('setting Howls');
        setHowls([...howls]);
      } else {
        // sound should not be playing but is in howls
        // prettier-ignore
        if (!sound.on && howls.find((howlObj) => howlObj.name === sound.name)) {
            const index = howls.findIndex((howlObj) => howlObj.name === sound.name);
            if (index !== -1) {
              howls.splice(index, 1);
              setHowls([...howls]);
            }
          }
      }
    });
  }, [sounds]);

  useEffect(() => {
    if (shouldIntervalRun) {
      setPlaySoundsInterval(
        setInterval(() => {
          console.log('round');
          playHowls();
        }, 8000)
      );
    } else {
      clearInterval(playSoundsInterval);
      console.log('should not play a track');
    }
  }, [shouldIntervalRun]);

  useEffect(() => {
    console.log('howls', howls);
  }, [howls]);

  return (
    <div>
      {sounds.map((sound) => {
        return (
          <Pad
            key={sound.id}
            name={sound.name}
            sound={sound.sound}
            sounds={sounds}
            setSounds={setSounds}
          />
        );
      })}
      <button onClick={startInterval}>Play</button>
      <button onClick={stopInterval}>Stop</button>
    </div>
  );
};

export default Pads;
