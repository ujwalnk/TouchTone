
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
        // permission to access your microphone.
        var voice = new Wad({ source: 'mic' }); 
        var tuner = new Wad.Poly();

        // If not using headphones, you can eliminate microphone feedback by muting the output from the tuner.
        tuner.setVolume(0); 
        tuner.add(voice);

        // You must give your browser permission to access your microphone before calling play().
        voice.play(); 

        // The tuner is now calculating the pitch and note name of its input 60 times per second. These values are stored in <code>tuner.pitch</code> and <code>tuner.noteName</code>.
        tuner.updatePitch() 

        var logPitch = function () {
            requestAnimationFrame(logPitch)
            if (typeof (tuner.noteName) == "string" && tuner.noteName != abc[abc.length - 1]) {
                console.log(tuner.pitch, tuner.noteName)

                // Swap the positions of # and Number to bring it to std format used throughout the application
                if (tuner.noteName.includes("#")) {
                    tuner.noteName = tuner.noteName.replace("#", "") + "#";
                }

                // Check for Function Keys
                if (Object.values(specialNotes).includes(tuner.noteName)) {
                    if (tuner.noteName == specialNotes["erase"]) {
                        raw.pop();
                    } else if (tuner.noteName == specialNotes["tab"]) {
                        raw.push("|");
                    } else if (tuner.noteName == specialNotes["line"]) {
                        raw.push("\n");
                    }
                } else {
                    // Push to rawnotes if special keys not found
                    raw.push(tuner.noteName);
                }

                // Display raw on the paper
                display(raw);
            }
        };

        // Repeated Function Call
        logPitch();
    }
}


/**
 *  Stop calculating the pitch if you don't need to know it anymore.
 */
function endListening() {
    tuner.stopUpdatingPitch(); 
}

/**
 * Update the Staff Notation on the paper
 * @param {String} str - String to display as staff notation
 */
function updateScript(str) {
    jsLiveDiv.renderAbc("paper", str, visualOptions);
}