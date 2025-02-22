let raw = []; // Storing RAW Data

// MIDI Input
var input;
// PauseHandler Function Handler & Status
var pauseHandler;
var pauseStatus = false;

// Special notes: Pause, Space, New Line
var specialNotes = {
  erase: "",
  tab: "",
  line: "",
};

var srgNotes = {}; // SrgNotes

console.log("MIDI Sentinel Running");

WebMidi.enable({ sysex: true })
  .then(() => {
    console.log("WebMidi with sysex enabled!");

    // Inputs
    WebMidi.inputs.forEach((input) =>
      console.log(input.manufacturer, input.name)
    );

      // Outputs
  WebMidi.outputs.forEach(output => console.log(output.manufacturer, output.name));

    // const myInput = WebMidi.getInputByName("MPK mini 3");
    const myInput = WebMidi.inputs[1];
    console.log(myInput);
    myInput.addListener("noteon", (e) => {
      console.log(e.note.identifier);
      noteListener(e);
    });
  })
  .catch((err) => alert(err));


function pause() {
  pauseStatus = true;
}

function pauseEnd() {
  pauseStatus = false;
}

function noteListener(e) {
  console.log(
    "Received 'noteon' message (" +
      "name:" + e.note.name +
      "acciendental:" + e.note.accidental +
      "octave:" + e.note.octave +
      ")."
  );
  if (!pauseStatus) {
    console.log(specialNotes, e.note.name + e.note.octave + e.note.accidental);
    // Accidental - when not used, becomes undefined

    accidental = e.note.accidental;
    if (e.note.accidental == undefined) {
      accidental = "";
    }

    console.log("Accidental:" + accidental);
    if(specialNotes == null){
        var specialNotes = {
            erase: "",
            tab: "",
            line: ""
        }
    }
    console.log(specialNotes);

    // Check for Alternate Key Function
    if (
      Object.values(specialNotes).includes(
        e.note.name + e.note.octave + accidental
      )
    ) {
      console.log("Alternate Key Detected");
      if (e.note.name + e.note.octave + accidental == specialNotes["erase"]) {
        raw.pop();
      } else if (
        e.note.name + e.note.octave + accidental ==
        specialNotes["tab"]
      ) {
        raw.push("|");
      } else if (
        e.note.name + e.note.octave + accidental ==
        specialNotes["line"]
      ) {
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
    if (e.note.accidental == null) pauseHandler(e.note.name + e.note.octave);
    else pauseHandler(e.note.name + e.note.octave + e.note.accidental);
  }
}

function getEraserNote(e) {
  // Set current note as the erase note
  specialNotes["erase"] = e;

  // Display note as the erase note in the dialog box
  document.getElementById("eraseNoteTextBox").value = specialNotes["erase"];
  console.log(specialNotes);

  // Resume recording
  pauseStatus = false;
}

function getTabNote(e) {
  // Set current note as the tab note
  specialNotes["tab"] = e;

  // Display note as the tab note in the dialog box
  document.getElementById("tabNoteTextBox").value = specialNotes["tab"];
  console.log(specialNotes);

  // Resume recording
  pauseStatus = false;
}

function getLineNote(e) {
  // Set current note as the new line note
  specialNotes["line"] = e;

  // Display note as the new line note in the dialog box
  document.getElementById("lineNoteTextBox").value = specialNotes["line"];
  console.log(specialNotes);

  // Resume recording
  pauseStatus = false;
}

function getSRGNotes(e) {
  console.log("noteTextBox" + Number(Object.keys(srgNotes).length + 1));

  // Create empty dictionary for lower,  middle & higher octave
  srgNotes[e] = { L: "", M: "", H: "" };

  // Display the values in the custom notes dialog box
  document.getElementById(
    "noteTextBox" + Number(Object.keys(srgNotes).length)
  ).value = e;
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
    srgNotes[Object.keys(srgNotes)[x - 1]] = {
      L: document.getElementById("notationTextBox" + x + "L").value,
      M: document.getElementById("notationTextBox" + x).value,
      H: document.getElementById("notationTextBox" + x + "H").value,
    };
  }

  console.log(srgNotes);
}
