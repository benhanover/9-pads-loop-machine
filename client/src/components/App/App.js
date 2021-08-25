// import libraries
import { useState, useRef } from 'react';

// import components
import Pads from '../Pads/Pads';
import Buttons from '../Buttons/Buttons';
import Combinations from '../Combinations/Combinations';
import Record from '../Record/Record';
import PlayingSounds from '../PlayingSounds/PlayingSounds';

// import css
import './App.css';

// import helpers
import { initialSoundsValue, playHowls, stopHowls } from './helpers';

function App() {
  // states
  // sounds keep track of all the pads states, sound = {name: string, sound: blob, on: boolean, id: number}
  const [sounds, setSounds] = useState(initialSoundsValue);
  // playSoundsInterval holds the interval
  const [playSoundsInterval, setPlaySoundsInterval] = useState();
  // either create the interval or clears it
  const [shouldIntervalRun, setShouldIntervalRun] = useState(false);
  // holds the recorded blob url in order to play it
  const [recordedBlobUrl, setRecordedBlobUrl] = useState(null);
  // holds the recorded blob in order to download it
  const [recordedBlob, setRecordedBlob] = useState(null);
  // toggle between play and pause button
  const [playIsOn, setPlayIsOn] = useState(true);
  // toggle between start and stop recording buttons
  const [recordIsOn, setRecordIsOn] = useState(true);
  // array of all created combinations [{combinationName: [{ name: string, howl: howl }]}]
  const [combinations, setCombinations] = useState([]);
  // toggle between add combination to the input it self
  const [showCombinationInput, setShowCombinationInput] = useState(false);
  // refs
  // holds the current tracks to be played [{ name: string, howl: howl }]
  const refHowls = useRef([]);
  // recordRTC object
  const refRecorder = useRef();
  // assigned to the combination input
  const refCombinationName = useRef('');

  return (
    <div className='app'>
      <section className='left-section'>
        <Record recordedBlobUrl={recordedBlobUrl} recordedBlob={recordedBlob} />
        <PlayingSounds
          sounds={sounds}
          showCombinationInput={showCombinationInput}
          refCombinationName={refCombinationName}
          setShowCombinationInput={setShowCombinationInput}
          refHowls={refHowls}
          combinations={combinations}
          setCombinations={setCombinations}
        />
      </section>
      <section className='middle-section'>
        <h1 className='title'>9 Pads</h1>
        <Pads
          sounds={sounds}
          refHowls={refHowls}
          setShouldIntervalRun={setShouldIntervalRun}
          shouldIntervalRun={shouldIntervalRun}
          setPlaySoundsInterval={setPlaySoundsInterval}
          playHowls={playHowls}
          playSoundsInterval={playSoundsInterval}
          setSounds={setSounds}
          setPlayIsOn={setPlayIsOn}
        />
        <Buttons
          recordIsOn={recordIsOn}
          setRecordedBlob={setRecordedBlob}
          setRecordedBlobUrl={setRecordedBlobUrl}
          refRecorder={refRecorder}
          playIsOn={playIsOn}
          setRecordIsOn={setRecordIsOn}
          stopHowls={stopHowls}
          refHowls={refHowls}
          setShouldIntervalRun={setShouldIntervalRun}
          setPlayIsOn={setPlayIsOn}
          sounds={sounds}
          shouldIntervalRun={shouldIntervalRun}
          playHowls={playHowls}
        />
      </section>
      <section className='right-section'>
        <Combinations
          combinations={combinations}
          refHowls={refHowls}
          sounds={sounds}
          setSounds={setSounds}
        />
      </section>
    </div>
  );
}

export default App;
