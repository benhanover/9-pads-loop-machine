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

  useEffect(() => {
    // case there is a track playing
    if (sounds.some((soundObj) => soundObj.on)) {
      setPlaySoundsInterval(
        setInterval(() => {
          console.log('round');
        }, 3000)
      );
      // no track is playing
    } else {
      clearInterval(playSoundsInterval);
    }
  }, [sounds]);

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
    </div>
  );
};

export default Pads;
