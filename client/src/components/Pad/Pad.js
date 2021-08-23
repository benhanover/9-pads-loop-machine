// import libraries
import { Howl, Howler } from 'howler';

// import css
import './Pad.css';

const Pad = ({ name, sound, sounds, setSounds }) => {
  const howl = new Howl({
    src: [sound],
  });
  const setSound = () => {
    const index = sounds.findIndex((sound) => sound.name === name);
    sounds[index].on = !sounds[index].on;
    setSounds(sounds.slice());
  };

  return (
    <div className='pad'>
      <h3 onClick={setSound}>{name}</h3>
      {/* prettier-ignore */}
      <button onClick={() => { howl.play()}}>sample</button>
    </div>
  );
};

export default Pad;
