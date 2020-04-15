
var midiNotes = [];
var noteArray = [];
var timeArray = [];
var i=0;

alert("Ciao sono la rete Neurale artificiale di Tomas!!!");


//Listen midikeyboard
function ListenMidikeyboard(){
    var msg=document.getElementById('msg');
    var evnt=document.getElementById('evnt');
        console.log(navigator.requestMIDIAccess);
    if (navigator.requestMIDIAccess) {
        console.log('navigator.requestMIDIAccess ok');
        navigator.requestMIDIAccess().then(requestMIDIAccessSuccess, requestMIDIAccessFailure);
    } else {
        console.log('navigator.requestMIDIAccess undefined');
        msg.innerHTML = 'navigator.requestMIDIAccess undefined';
    }
}




function requestMIDIAccessFailure(e) {
    console.log('requestMIDIAccessFailure', e);
}
    
    
function logKeys(){
    var s = 'Note:';
    for (var i = 0; i < midiNotes.length; i++) {
        s = s + ' ' + midiNotes[i].pitch;
        
    }
    evnt.innerHTML = s;
    
}


function midNoteOn(pitch, velocity,timeStamp) {
    midiNoteOff(pitch);
    //seleziona se velocity=0 {play} else null;
    if (velocity>0){       
        //start time count
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
    document.getElementById('NoteNumber').innerHTML=("Numero di note suonate:"+i);
    }
    
    if (i>21){
        alert("Generazione Risposta...");
        i=0;
        melodysequence();
    }
}


function midiNoteOff(pitch) {
    for (var i = 0; i < midiNotes.length; i++) {
        if (midiNotes[i].pitch == pitch) {
            if (midiNotes[i].envelope) {
                midiNotes[i].envelope.cancel();
            }
            midiNotes.splice(i, 1);
            return;
        }
    }
}


function midiOnStateChange(event) {
    console.log('midiOnStateChange', event);
    msg.innerHTML = event.port.manufacturer + ' ' + event.port.name + ' ' + event.port.state;
}
function midiOnMIDImessage(event) {
    var data = event.data;
    var cmd = data[0] >> 4;
    var channel = data[0] & 0xf;
    var type = data[0] & 0xf0;
    var pitch = data[1];
    var velocity = data[2];
    var timeStamp = event.timeStamp;
    console.log(timeStamp);
    switch (type) {
    case 144:
        midNoteOn(pitch, velocity,timeStamp);
        logKeys();
        break;
    case 128:
        midiNoteOff(pitch);
        logKeys();
        break;
    }
}
function requestMIDIAccessSuccess(midi) {
    var inputs = midi.inputs.values();
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        console.log('midi input', input);
        input.value.onmidimessage = midiOnMIDImessage;
    }
    midi.onstatechange = midiOnStateChange;
}
function selectIns(o){
    var n=document.getElementById('ins').selectedIndex;
    var info=player.loader.instrumentInfo(n)
    console.log('select',n,info);
    player.loader.startLoad(audioContext, info.url, info.variable);
    player.loader.waitLoad(function () {
        console.log('done',info.variable);
        tone=window[info.variable];
        player.cancelQueue(audioContext);
    });
}
