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

export {
  bass_groove,
  drums,
  electric_guitar,
  funk_beats,
  maze_politics,
  organ,
  pas_groove,
  stutter_breakbeats,
  tanggu,
};

export const initialSoundsValue = [
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

export const playHowls = (refHowls) => {
  refHowls.current.forEach((howlObj) => {
    howlObj.howl.play();
  });
};

export const stopHowls = (refHowls) => {
  refHowls.current.forEach((howlObj) => {
    howlObj.howl.stop();
  });
};
