// import css
import './PlayingSounds.css';

const PlayingSounds = ({
  sounds,
  showCombinationInput,
  refCombinationName,
  setShowCombinationInput,
  refHowls,
  combinations,
  setCombinations,
}) => {
  const saveCombination = () => {
    const combinationToAdd = {};
    combinationToAdd[refCombinationName.current.value] =
      refHowls.current.slice();
    combinations.push(combinationToAdd);
    setCombinations([...combinations]);
    setShowCombinationInput(false);
  };

  return (
    <div className='playing-sounds-container'>
      <h3 className='playing-sounds-title'>Currently playing</h3>
      <ul className='playing-sounds-list'>
        {sounds.filter((sound) => sound.on).length > 0 &&
          sounds
            .filter((sound) => sound.on)
            .map((sound) => {
              return <li className='playing-sounds-item'>{sound.name}</li>;
            })}
      </ul>
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
          onClick={() => {
            setShowCombinationInput(true);
          }}
        >
          Save Combination
        </button>
      )}
    </div>
  );
};

export default PlayingSounds;
