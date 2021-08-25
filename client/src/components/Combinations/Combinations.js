// import css
import './Combinations.css';

const Combinations = ({ combinations, refHowls, sounds, setSounds }) => {
  const switchToCombination = (combination) => {
    sounds.forEach((soundObj) => {
      soundObj.on = false;
    });
    refHowls.current = Object.values(combination)[0];
    for (let i = 0; i < refHowls.current.length; i++) {
      const index = sounds.findIndex(
        (sound) => sound.name === refHowls.current[i].name
      );
      if (index !== -1) {
        sounds[index].on = true;
      }
    }
    setSounds(sounds);
  };

  return (
    <div className='combinations-container'>
      <div>
        <h1 className='title'>Combinations</h1>
        <ul>
          {combinations.length > 0 &&
            combinations.map((combination, index) => {
              return (
                <li
                  className='combination'
                  onClick={() => switchToCombination(combination)}
                  key={index}
                >
                  {Object.keys(combination)[0]}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Combinations;
