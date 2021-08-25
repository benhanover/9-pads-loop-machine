// import libraries
import RecordRTC from 'recordrtc';

// import css
import './Buttons.css';

const Buttons = ({
  stopHowls,
  refHowls,
  setShouldIntervalRun,
  setPlayIsOn,
  recordIsOn,
  setRecordIsOn,
  setRecordedBlob,
  setRecordedBlobUrl,
  refRecorder,
  playIsOn,
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

  const startInterval = () => {
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
        {recordIsOn ? (
          <button className='btn buttons' onClick={startRecord}>
            Record
          </button>
        ) : (
          <button className='btn buttons' onClick={stopRecord}>
            Stop Record
          </button>
        )}
      </div>
    </>
  );
};

export default Buttons;
