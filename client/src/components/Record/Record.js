// import libarires
import { invokeSaveAsDialog } from 'recordrtc';

// import css
import './Record.css';

const Record = ({ recordedBlobUrl, recordedBlob }) => {
  return (
    <div className='record-div-container'>
      <div className='record-div'>
        <h3 className='title'>Last Record</h3>
        <div className='record-audio-button-div'>
          <audio src={recordedBlobUrl} controls autoPlay />
          <button
            className='btn'
            onClick={() => invokeSaveAsDialog(recordedBlob)}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Record;
