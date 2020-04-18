
var music_rnn, rnnPlayer;
var melody1;
Players();
inizializzamodello();


function enable(){
  console.log("abilitato");
  if(MagentaPlayer.state === 'running') {
    MagentaPlayer.suspend().then(function() {
      susresBtn.textContent = 'Resume context';
    });
  } else if(MagentaPlayer.state === 'suspended') {
    MagentaPlayer.resume().then(function() {
      susresBtn.textContent = 'Suspend context';
    });
  }
}




function Players() {
  MagentaPlayer = new mm.Player();
  MagentaPlayer = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
 
}

function melodysequence() {

  melody1 = {
    notes: [
      {pitch: noteArray[0], startTime: timeArray[0], endTime: timeArray[1]},
      {pitch: noteArray[2], startTime: timeArray[2], endTime: timeArray[3]},
      {pitch: noteArray[4], startTime: timeArray[4], endTime: timeArray[5]},
      {pitch: noteArray[6], startTime: timeArray[6], endTime: timeArray[7]},
      {pitch: noteArray[8], startTime: timeArray[8], endTime: timeArray[9]},
      {pitch: noteArray[10], startTime: timeArray[10], endTime: timeArray[11]},
      {pitch: noteArray[12], startTime: timeArray[12], endTime: timeArray[13]},
      {pitch: noteArray[14], startTime: timeArray[14], endTime: timeArray[15]},
      {pitch: noteArray[16], startTime: timeArray[16], endTime: timeArray[17]},
      {pitch: noteArray[18], startTime: timeArray[18], endTime: timeArray[19]},

    ],
    tempos: [{
      time: 0, 
      qpm: 120
    }],
    totalTime: timeArray[19]
    };
    
    playRNN();
  }



function inizializzamodello(){
     // Initialize model
     music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn');
     music_rnn.initialize();
   
}


var rnn_steps = 20;
var rnn_temperature = 1.5;

function playRNN() {

  const qns = mm.sequences.quantizeNoteSequence(melody1, 2);
  music_rnn
  .continueSequence(qns, rnn_steps, rnn_temperature)
  .then((sample) => MagentaPlayer.start(sample))
  noteArray = [];
  timeArray = [];
  
}



