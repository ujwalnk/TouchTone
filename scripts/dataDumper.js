/**
 * Dump all Data to Browser Storage
 */
function dump() {
    // Dump number of cellsPerLine & notePerLine to browser Storage
    localStorage.setItem("cellsPerLine", cellsPerLine);
    localStorage.setItem("notePerCell", notesPerCell);
    localStorage.setItem("noNewLines", noNewLines);

    localStorage.setItem("specialNotes", JSON.stringify(specialNotes));

    // Display Type
    localStorage.setItem("displayType", displayType);

    // Data Store
    localStorage.setItem("raw", JSON.stringify(raw));

    // Store custom Notation
    localStorage.setItem("srgNotes", JSON.stringify(srgNotes));

    // Store New Line Count
    localStorage.setItem("noNewLines", noNewLines);

    // Store Input Source
    localStorage.setItem("inputSource", inputType);
}

/**
 * Load data from Browser Storage
 */
function load() {

    if(localStorage.length == 0){
        console.log("No Saved Data to LOAD");
        dump();
    }

    try {
        specialNotes = JSON.parse(localStorage.getItem("specialNotes"));
        console.log(type(specialNotes));
    } catch (err) {
        console.log("Spcial Notes Note found")
    }
    try {
        cellsPerLine = Number.parseInt(localStorage.getItem("cellsPerLine"));
    } catch (err) {
        console.log("Cells Per Line Note found")
    }

    try {
        noNewLines = Number.parseInt(localStorage.getItem("noNewLines"));
    } catch (err) {
        console.log("Empty Lines Per New Line Not found");
    }

    try {
        notesPerCell = Number.parseInt(localStorage.getItem("notePerCell"));
    } catch (err) {
        console.log("Notes Per Cell Note found")
    }
    try {
        displayType = Number.parseInt(localStorage.getItem("displayType"));
    } catch (err) {
        console.log("DisplayType not found");
    }
    try {
        noNewLines = Number.parseInt(localStorage.getItem("noNewLines"));
    } catch (err) {
        console.log("DisplayType not found");
    }

    try {
        inputType = Number.parseInt(localStorage.getItem("inputSource"));
        inputSelect();
    } catch (err) {
        console.log("DisplayType not found");
    }



    try {
        if (localStorage.getItem("srgNotes") != null) {
            srgNotes = JSON.parse(localStorage.getItem("srgNotes"));
        }
    } catch (err) {
        console.log("srgNotes not found");
    }

    try {
        if (localStorage.getItem("raw") != null) {
            raw = JSON.parse(localStorage.getItem("raw"));
            display(raw);
        }
    } catch (err) {
        console.log(err);
        console.log("raw not found");
    }
}

function hookUpValues() {
    // HookUp Special Key Values
    document.getElementById("eraseNoteTextBox").value = specialNotes["erase"];
    document.getElementById("tabNoteTextBox").value = specialNotes["tab"];
    document.getElementById("lineNoteTextBox").value = specialNotes["line"];

    // HookUp Setting Values
    document.getElementById("cellsPerLineInput").value = cellsPerLine;
    document.getElementById("notesPerCellInput").value = notesPerCell;

    // HookUp Number Of New Lines per new Line
    document.getElementById("newLinesPerNewLineInput").value = noNewLines;

    // HookUp Display Type Radio Value
    switch (displayType) {
        case 1:
            document.getElementById("staffNotation").checked = true;
            break;
        case 2:
            document.getElementById("abcNotation").checked = true;
            break;
        default:
            document.getElementById("srgNotation").checked = true;
            break;
    }

    // Hookup InputType Select
    switch (inputType) {
        case 1:
            document.getElementById("inputMIDI").checked = true;
            break;
            
        default:
            document.getElementById("inputMIC").checked = true;
            break;
    }

    for (let x = 1; x < 13; x++) {
        document.getElementById("noteTextBox" + x).value = Object.keys(srgNotes)[x - 1];

        document.getElementById("notationTextBox" + x).value = srgNotes[Object.keys(srgNotes)[x - 1]]["M"];
        document.getElementById("notationTextBox" + x + "L").value = srgNotes[Object.keys(srgNotes)[x - 1]]["L"];
        document.getElementById("notationTextBox" + x + "H").value = srgNotes[Object.keys(srgNotes)[x - 1]]["H"];
    }
}

setInterval(function () {
    localStorage.setItem("raw", JSON.stringify(raw));
}, 3 * 1000); // 60 * 1000 milsec

// Clear the Editor & Local Storage on Browser
function free() {
    raw = [];
    dump();
}