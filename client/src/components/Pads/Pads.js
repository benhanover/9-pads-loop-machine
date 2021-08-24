// import libraries
import { useState, useEffect, useRef } from 'react';
import { Howl, Howler } from 'howler';
import RecordRTC, { invokeSaveAsDialog } from 'recordrtc';

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

// import css
import './Pads.css';

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
  const [showRecord, setShowRecord] = useState(false);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [playIsOn, setPlayIsOn] = useState(true);
  const [recordIsOn, setRecordIsOn] = useState(true);
  const [combinations, setCombinations] = useState([]);
  const [showCombinationInput, setShowCombinationInput] = useState(false);
  const refHowls = useRef([]);
  const refRecorder = useRef();
  const refCombinationName = useRef('');

  const playHowls = () => {
    console.log('refHowls', refHowls.current);
    refHowls.current.forEach((howlObj) => {
      howlObj.howl.play();
    });
  };

  const stopHowls = () => {
    refHowls.current.forEach((howlObj) => {
      howlObj.howl.stop();
    });
  };

  const startRecord = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    refRecorder.current = RecordRTC(stream, { type: 'audio' });
    refRecorder.current.startRecording();
    setRecordIsOn(false);
  };

  const stopRecord = () => {
    refRecorder.current.stopRecording(() => {
      let blob = refRecorder.current.getBlob();
      let blobUrl = refRecorder.current.toURL();
      refRecorder.current.reset();
      setShowRecord(true);
      setRecordedBlobUrl(blobUrl);
      setRecordedBlob(blob);
      setRecordIsOn(true);
    });
  };

  const reset = () => {
    stopHowls();
    setShowRecord(false);
    setRecordedBlobUrl(false);
    setRecordedBlob(false);
    setSounds(initialSoundsValue);
    refHowls.current = [];
    refRecorder.current = null;
    setShouldIntervalRun(false);
    clearInterval(playSoundsInterval);
    setPlaySoundsInterval(null);
    setPlayIsOn(true);
    setRecordIsOn(true);
  };

  const saveCombination = () => {
    const combinationToAdd = {};
    combinationToAdd[refCombinationName.current.value] =
      refHowls.current.slice();
    combinations.push(combinationToAdd);
    setCombinations([...combinations]);
    console.log(combinations);
    setShowCombinationInput(false);
  };

  const startInterval = () => {
    // case there is a sound playing
    if (sounds.some((soundObj) => soundObj.on)) {
      if (!shouldIntervalRun) {
        playHowls();
        setShouldIntervalRun(true);
      }
      // no sound is playing
      setPlayIsOn(false);
    } else {
      alert('No Sound Is On');
    }
  };

  const stopInterval = () => {
    stopHowls();
    setShouldIntervalRun(false);
    setPlayIsOn(true);
  };

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
  }, [sounds]);

  useEffect(() => {
    if (shouldIntervalRun) {
      setPlaySoundsInterval(
        setInterval(() => {
          playHowls();
        }, 8000)
      );
    } else {
      clearInterval(playSoundsInterval);
      console.log('should not play a track');
    }
  }, [shouldIntervalRun]);

  return (
    <div>
      <div className='pads-container'>
        <div className='pads'>
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
      </div>
      <div className='pads-buttons-div'>
        {playIsOn ? (
          <button onClick={startInterval}>Play</button>
        ) : (
          <button onClick={stopInterval}>Stop</button>
        )}
        <button onClick={reset}>Reset</button>
        {recordIsOn ? (
          <button onClick={startRecord}>Record</button>
        ) : (
          <button onClick={stopRecord}>Stop Record</button>
        )}
      </div>

      {showCombinationInput ? (
        <>
          <input ref={refCombinationName} placeholder='Combination Name' />
          <button onClick={saveCombination}>Save</button>
        </>
      ) : (
        <button onClick={() => setShowCombinationInput(true)}>
          Save Combination
        </button>
      )}

      {showRecord && (
        <div>
          <audio src={recordedBlobUrl} controls autoPlay />
          <button
            onClick={() => {
              setShowRecord(false);
              setRecordedBlob(false);
              setRecordedBlobUrl(false);
              refRecorder.current = null;
            }}
          >
            Close
          </button>
          <button onClick={() => invokeSaveAsDialog(recordedBlob)}>
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default Pads;
