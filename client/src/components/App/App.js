// import libraries
import { useState, useRef } from 'react';

// import components
import Pads from '../Pads/Pads';
import Buttons from '../Buttons/Buttons';
import Combinations from '../Combinations/Combinations';
import Record from '../Record/Record';

// import css
import './App.css';

// import helpers
import { initialSoundsValue, playHowls, stopHowls } from './helpers';
function App() {
  // states
  const [sounds, setSounds] = useState(initialSoundsValue);
  const [playSoundsInterval, setPlaySoundsInterval] = useState();
  const [shouldIntervalRun, setShouldIntervalRun] = useState(false);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [playIsOn, setPlayIsOn] = useState(true);
  const [recordIsOn, setRecordIsOn] = useState(true);
  const [combinations, setCombinations] = useState([]);
  const [showCombinationInput, setShowCombinationInput] = useState(false);
  // refs
  const refHowls = useRef([]);
  const refRecorder = useRef();
  const refCombinationName = useRef('');

  return (
    <div className='app'>
      <section className='left-section'>
        <Record recordedBlobUrl={recordedBlobUrl} recordedBlob={recordedBlob} />
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
          recordedBlobUrl={recordedBlobUrl}
          recordIsOn={recordIsOn}
          showCombinationInput={showCombinationInput}
          refCombinationName={refCombinationName}
          setShowCombinationInput={setShowCombinationInput}
          setRecordedBlob={setRecordedBlob}
          setRecordedBlobUrl={setRecordedBlobUrl}
          refRecorder={refRecorder}
          recordedBlob={recordedBlob}
          playIsOn={playIsOn}
          setRecordIsOn={setRecordIsOn}
          stopHowls={stopHowls}
          setSounds={setSounds}
          initialSoundsValue={initialSoundsValue}
          refHowls={refHowls}
          setShouldIntervalRun={setShouldIntervalRun}
          playSoundsInterval={playSoundsInterval}
          setPlaySoundsInterval={setPlaySoundsInterval}
          setPlayIsOn={setPlayIsOn}
          combinations={combinations}
          setCombinations={setCombinations}
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
