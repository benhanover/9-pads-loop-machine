// import libraries
import RecordRTC from 'recordrtc';

// import css
import './Buttons.css';

const Buttons = ({
  stopHowls,
  setSounds,
  initialSoundsValue,
  refHowls,
  setShouldIntervalRun,
  playSoundsInterval,
  setPlaySoundsInterval,
  setPlayIsOn,
  recordIsOn,
  setRecordIsOn,
  showCombinationInput,
  refCombinationName,
  setShowCombinationInput,
  setRecordedBlob,
  setRecordedBlobUrl,
  refRecorder,
  playIsOn,
  combinations,
  setCombinations,
  sounds,
  shouldIntervalRun,
  playHowls,
}) => {
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
      setRecordedBlobUrl(blobUrl);
      setRecordedBlob(blob);
      setRecordIsOn(true);
    });
  };
  const reset = () => {
    stopHowls(refHowls);
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
    setCombinations([]);
    // BUG
    console.log('reset howls', refHowls.current);
  };

  const saveCombination = () => {
    const combinationToAdd = {};
    combinationToAdd[refCombinationName.current.value] =
      refHowls.current.slice();
    combinations.push(combinationToAdd);
    setCombinations([...combinations]);
    setShowCombinationInput(false);
  };

  const startInterval = () => {
    // BUG
    console.log('interval howls', refHowls.current);
    // case there is a sound playing
    if (sounds.some((soundObj) => soundObj.on)) {
      if (!shouldIntervalRun) {
        playHowls(refHowls);
        setShouldIntervalRun(true);
      }
      // no sound is playing
      setPlayIsOn(false);
    } else {
      alert('No Sound Is On');
    }
  };

  const stopInterval = () => {
    stopHowls(refHowls);
    setShouldIntervalRun(false);
    setPlayIsOn(true);
  };

  return (
    <>
      <div className='pads-buttons-div'>
        {playIsOn ? (
          <button className='btn buttons' onClick={startInterval}>
            Play
          </button>
        ) : (
          <button className='btn buttons' onClick={stopInterval}>
            Stop
          </button>
        )}

        {showCombinationInput ? (
          <>
            <input ref={refCombinationName} placeholder='Combination Name' />
            <button className='btn buttons' onClick={saveCombination}>
              Save
            </button>
          </>
        ) : (
          <button
            className='btn buttons'
            onClick={() => setShowCombinationInput(true)}
          >
            Save Combination
          </button>
        )}

        {recordIsOn ? (
          <button className='btn buttons' onClick={startRecord}>
            Record
          </button>
        ) : (
          <button className='btn buttons' onClick={stopRecord}>
            Stop Record
          </button>
        )}

        <button className='btn buttons' onClick={reset}>
          Reset
        </button>
      </div>
    </>
  );
};

export default Buttons;