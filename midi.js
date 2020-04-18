
var noteArray = [];
var timeArray = [];
var note;
var i=0;

if (navigator.requestMIDIAccess) {
  console.log('This browser supports WebMIDI!');
} else {
  console.log('WebMIDI is not supported in this browser.');
}

navigator.requestMIDIAccess({ sysex: true })
    .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
    console.log(midiAccess);

    var inputs = midiAccess.inputs;
    var outputs = midiAccess.outputs;
    console.log(inputs);
    console.log(outputs);
}

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}

function onMIDISuccess(midiAccess) {
  for (var input of midiAccess.inputs.values())
      input.onmidimessage = getMIDIMessage;
      
  }


function getMIDIMessage(midiMessage) {
  console.log(i);
  console.log(midiMessage);
  document.getElementById('mididevice').innerHTML=(midiMessage.srcElement.name);
  console.log("Note:"+midiMessage.data[0]+"  "+"Velocity:"+midiMessage.data[2]+"  "+"timeStamp:"+midiMessage.timeStamp);
  pitch=midiMessage.data[1];
  velocity=midiMessage.data[2];
  timeStamp=midiMessage.timeStamp;
  
  if (velocity>0){
    noteArray[i] = pitch;
    timeArray[i] = timeStamp/1000;
    document.getElementById('noteArray').innerHTML=("Note:"+pitch);
    document.getElementById('timeArray').innerHTML=("Time Stamps:"+(timeStamp/1000));
  }
  if (velocity==0){
    i++;
    timeArray[i] = timeStamp/1000;
    document.getElementById('timeArray').innerHTML=("Time Stamps:"+(timeStamp/1000));
    i++;
    document.getElementById('noteNumber').innerHTML=("Numero di note suonate:"+i);
  }
}



