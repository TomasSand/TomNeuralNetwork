
console.clear();
var noteArray = [];
var timeArray = [];
var totaltime;
var notex;
var i=0;


navigator.requestMIDIAccess().then(access => {
   const devices = access.inputs.values();
    for (let device of devices)
        device.onmidimessage = onMidiMessage;
}).catch(console.error);


function onMidiMessage(message){
    
    if (message.data[2]>0){
      noteArray[i]=message.data[1];
      pitch=message.data[1];
      timeArray[i]=message.timeStamp/1000;
      timeStamp=message.timeStamp;
      document.getElementById('noteArray').innerHTML=("Note:"+pitch);
      document.getElementById('timeArray').innerHTML=("Time Stamps:"+(timeStamp/1000));
      
    }
    
    if (message.data[2]==0){
        i++;
        timeArray[i]=message.timeStamp/1000;
        timeStamp=message.timeStamp;
        document.getElementById('timeArray').innerHTML=timeStamp;
        i++;
    }

    if (i>21){
        alert("Generazione Risposta...");
        i=0;
        melodysequence();
    }
}




