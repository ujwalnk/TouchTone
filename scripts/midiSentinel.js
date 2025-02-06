let raw = []; // Storing RAW Data

// MIDI Input
var input;
// PauseHandler Function Handler & Status
var pauseHandler;
var pauseStatus = false;

// Special notes: Pause, Space, New Line
var specialNotes = {
    "erase": "",
    "tab": "",
    "line": ""
};

var srgNotes = {}; // SrgNotes

console.log("MIDI Sentinel Running");

WebMidi.enable(function () {

    // Viewing available inputs and outputs
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);

    // Retrieve an input by name, id or index - Currently using index mode
    // input = WebMidi.getInputByName("CASIO USB-MIDI");
    // input = WebMidi.getInputById("1809568182");
    input = WebMidi.inputs[0];
    console.log(input);

    // Listen for a 'note on' message on all channels
    input.addListener('noteon', 'all', noteListener);

    // Remove all listeners for 'noteoff' on all channels
    // input.removeListener('noteoff');

    // Remove all listeners on the input
    // input.removeListener();

});

function pause() {
    pauseStatus = true;
}

function pauseEnd() {
    pauseStatus = false;
}

function noteListener(e) {
    console.log("Received 'noteon' message (" + e.note.name + e.note.accidental + e.note.octave + ").");
    if (!pauseStatus) {
        console.log(specialNotes, e.note.name + e.note.octave + e.note.accidental);
        // Check for Alternate Key Function
        if (Object.values(specialNotes).includes(e.note.name + e.note.octave + e.note.accidental)) {

            console.log("Alternate Key Detected");
            if (e.note.name + e.note.octave + e.note.accidental == specialNotes["erase"]) {
                raw.pop();
            } else if (e.note.name + e.note.octave + e.note.accidental == specialNotes["tab"]) {
                raw.push("|");
            } else if (e.note.name + e.note.octave + e.note.accidental == specialNotes["line"]) {
                raw.push("\n");
            }
        } else {

            // Regular Key Function
            if (e.note.accidental == "#") {
                raw.push(e.note.name + e.note.octave + "#");
            } else {
                raw.push(e.note.name + e.note.octave);
            }

        }

        // Send data to parent function
        display(raw);

    } else {
        if (e.note.accidental == null)
            pauseHandler(e.note.name + e.note.octave);
        else
            pauseHandler(e.note.name + e.note.octave + e.note.accidental);
    }
}

function getEraserNote(e) {
    specialNotes["erase"] = e;
    document.getElementById("eraseNoteTextBox").value = specialNotes["erase"];
    console.log(specialNotes);
    pauseStatus = false;
}

function getTabNote(e) {
    specialNotes["tab"] = e;
    document.getElementById("tabNoteTextBox").value = specialNotes["tab"];
    console.log(specialNotes);
    pauseStatus = false;
}

function getLineNote(e) {
    specialNotes["line"] = e;
    document.getElementById("lineNoteTextBox").value = specialNotes["line"];
    console.log(specialNotes);
    pauseStatus = false;
}

function getSRGNotes(e) {
    console.log("noteTextBox" + Number(Object.keys(srgNotes).length + 1));
    srgNotes[e] = { "L": "", "M": "", "H": "" };
    document.getElementById("noteTextBox" + Number(Object.keys(srgNotes).length)).value = e;
    console.log("SRG Notes:", srgNotes);

    // Alert the user on completely entering all the required data
    if (Object.keys(srgNotes).length == 12) {
        alert("DONE");

        // Remove the pause on the editor data fill
        pauseStatus = false;
    }
}

function getSRGNotation() {
    for (let x = 1; x < 13; x++) {
        // Put the notes of a octave higher, lower and paritcular octave into the array
        srgNotes[Object.keys(srgNotes)[x - 1]] = { "L": document.getElementById("notationTextBox" + x + "L").value, "M": document.getElementById("notationTextBox" + x).value, "H": document.getElementById("notationTextBox" + x + "H").value }
    }

    console.log(srgNotes);
}