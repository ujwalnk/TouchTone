
let raw = []; // Storing RAW Data

// MIDI Input
var input;
// PauseHandler Function Handler & Status
var pauseHandler;
var pauseStatus = false;

// Special notes: Pause, Space, New Line
var specialNotes = {
    "erase": null,
    "tab": null,
    "line": null
};
var abc = [];

function start() {
    if (confirm("Please permit Mic Access")) {
        var voice = new Wad({ source: 'mic' }); // At this point, your browser will ask for permission to access your microphone.
        var tuner = new Wad.Poly();
        tuner.setVolume(0); // If you're not using headphones, you can eliminate microphone feedback by muting the output from the tuner.
        tuner.add(voice);

        voice.play(); // You     must give your browser permission to access your microphone before calling play().
        tuner.updatePitch() // The tuner is now calculating the pitch and note name of its input 60 times per second. These values are stored in <code>tuner.pitch</code> and <code>tuner.noteName</code>.

        var logPitch = function () {
            requestAnimationFrame(logPitch)
            if (typeof (tuner.noteName) == "string" && tuner.noteName != abc[abc.length - 1]) {
                console.log(tuner.pitch, tuner.noteName)

                // Swap the positions of # and Number
                if (tuner.noteName.includes("#")) {
                    tuner.noteName = tuner.noteName.replace("#", "") + "#";
                }

                // Check for Function Keys
                if (Object.values(specialNotes).includes(tuner.noteName)) {
                    console.log("Function key detected");
                    if (tuner.noteName == specialNotes["erase"]) {
                        raw.pop();
                    } else if (tuner.noteName == specialNotes["tab"]) {
                        raw.push("|");
                    } else if (tuner.noteName == specialNotes["line"]) {
                        raw.push("\n");
                    }
                } else {
                    raw.push(tuner.noteName);
                }

                display(raw);
            }
        };
        logPitch();
    }
}

function endListening() {
    tuner.stopUpdatingPitch(); // Stop calculating the pitch if you don't need to know it anymore.
}

function updateScript(str) {
    jsLiveDiv.renderAbc("paper", str, visualOptions);
}