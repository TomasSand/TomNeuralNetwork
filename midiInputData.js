
console.clear();
var noteArray = [];
var timeArray = [];
var totaltime;
var notex;
var i=0;


var selectedPreset=_tone_0000_JCLive_sf2_file;
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();
var player=new WebAudioFontPlayer();
player.loader.decodeAfterLoading(audioContext, '_tone_0000_JCLive_sf2_file');



navigator.requestMIDIAccess().then(access => {
   const devices = access.inputs.values();
    for (let device of devices)
        device.onmidimessage = onMidiMessage;
}).catch(console.error);


function onMidiMessage(message){
    
    if (message.data[2]>0){
      noteArray[i]=message.data[1];
      timeArray[i]=message.timeStamp/1000;
      document.getElementById("noteArray").innerHTML=noteArray;
      document.getElementById('timeArray').innerHTML=timeArray;
    }
    
    if (message.data[2]==0){
        i++;
        timeArray[i]=message.timeStamp/1000;
        document.getElementById('timeArray').innerHTML=timeArray;
        i++;
    }
}



