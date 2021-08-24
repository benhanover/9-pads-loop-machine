// import libraries
import { useEffect } from 'react';
import { Howl } from 'howler';

// components
import Pad from '../Pad/Pad';

// sounds
import {
  bass_groove,
  drums,
  electric_guitar,
  funk_beats,
  maze_politics,
  organ,
  pas_groove,
  stutter_breakbeats,
  tanggu,
} from '../App/helpers';

// import css
import './Pads.css';

const Pads = ({
  sounds,
  refHowls,
  setShouldIntervalRun,
  shouldIntervalRun,
  setPlaySoundsInterval,
  playHowls,
  playSoundsInterval,
  setSounds,
  setPlayIsOn,
}) => {
  useEffect(() => {
    sounds.forEach((sound) => {
      // sound should play and not already in howls
      if (
        sound.on &&
        !refHowls.current.find((howlObj) => howlObj.name === sound.name)
      ) {
        const howl = new Howl({
          src: [sound.sound],
        });
        refHowls.current.push({ name: sound.name, howl: howl });
        refHowls.current = [...refHowls.current];
      } else {
        // sound should not be playing but is in howls
        // prettier-ignore
        if (!sound.on && refHowls.current.find((howlObj) => howlObj.name === sound.name)) {
          const index = refHowls.current.findIndex((howlObj) => howlObj.name === sound.name);
          if (index !== -1) {
            refHowls.current[index].howl.stop();
            refHowls.current.splice(index, 1);
            refHowls.current = [...refHowls.current];
            if (refHowls.current.length === 0) {
              setShouldIntervalRun(false);
            }
          }
        }
      }
    });
    // change to play button
    if (sounds.every((sound) => !sound.on)) {
      setPlayIsOn(true);
    }
  }, [sounds]);

  useEffect(() => {
    if (shouldIntervalRun) {
      setPlaySoundsInterval(
        setInterval(() => {
          playHowls(refHowls);
        }, 8000)
      );
    } else {
      clearInterval(playSoundsInterval);
    }
  }, [shouldIntervalRun]);

  return (
    <>
      <div className='pads-container'>
        <div className='pads-row'>
          <Pad
            name={'pas_groove'}
            sound={pas_groove}
            sounds={sounds}
            setSounds={setSounds}
          />
          <Pad
            name={'stutter_breakbeats'}
            sound={stutter_breakbeats}
            sounds={sounds}
            setSounds={setSounds}
          />
          <Pad
            name={'tanggu'}
            sound={tanggu}
            sounds={sounds}
            setSounds={setSounds}
          />
        </div>
        <div className='pads-row'>
          <Pad
            name={'funk_beats'}
            sound={funk_beats}
            sounds={sounds}
            setSounds={setSounds}
          />
          <Pad
            name={'maze_politics'}
            sound={maze_politics}
            sounds={sounds}
            setSounds={setSounds}
          />
          <Pad
            name={'organ'}
            sound={organ}
            sounds={sounds}
            setSounds={setSounds}
          />
        </div>
        <div className='pads-row'>
          <Pad
            name={'bass_groove'}
            sound={bass_groove}
            sounds={sounds}
            setSounds={setSounds}
          />
          <Pad
            name={'drums'}
            sound={drums}
            sounds={sounds}
            setSounds={setSounds}
          />
          <Pad
            name={'electric_guitar'}
            sound={electric_guitar}
            sounds={sounds}
            setSounds={setSounds}
          />
        </div>
      </div>
    </>
  );
};

export default Pads;
