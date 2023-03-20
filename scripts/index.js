var cellsPerLine = 4;
var notesPerCell = 4;
var noNewLines = 1;

// Display Type (1: Staff, 2: ABC (Default), 3: SRG)
var displayType = 2;

var inputType = 2;

function display(rawMIDI) {
    if (displayType == 1) {
        // Printing to Staff Notation
        // No extra lines in staff notation
        updateScript(addPipesNLines(convert2Staff(rawMIDI), notesPerCell, cellsPerLine, 1).toString());
    } else if (displayType == 2) {
        // Printing to ABC Notation
        updateTableABC(addPipesNLines(rawMIDI, notesPerCell, cellsPerLine, noNewLines));
    } else {
        // Printing to Custom Notation
        updateTableSRG(addPipesNLines(convert2SRG(rawMIDI), notesPerCell, cellsPerLine, noNewLines));
    }
}

function inputSelect() {
   /* const scriptA = document.createElement('script');
    const scriptB = document.createElement('script');

    if (inputType == 1) {
        console.log("Adding MIDI Support");
        // MIDI Select
        scriptA.setAttribute(
            'src',
            './lib/webmidi/webmidi.iife.js',
        );
        scriptB.setAttribute(
            'src',
            './scripts/midiSentinel.js',
        );
        // document.body.innerHTML += "<script src='./lib/webmidi/webmidi.iife.js'></script>";
        // document.body.innerHTML += "<script src='./scripts/midiSentinel.js'></script>";
    } else {
        console.log("Adding MIC Support");
        // MIC Select
        scriptA.setAttribute(
            'src',
            './lib/wad/wad.js',
        );
        scriptB.setAttribute(
            'src',
            './scripts/pitch-detector.js',
        );
        // document.body.innerHTML += "<script src='./lib/wad/wad.js'></script>";
        // document.body.innerHTML += "<script src='./scripts/pitch-detector.js'></script>";
    }

    scriptA.onload = function handler() {
        console.log("ScriptA Has been loaded");
    }

    scriptB.onload = function handlerB() {
        console.log("ScriptB Has been loaded");
    }

    scriptB.onerror = function handleScriptError() {
        console.log('error loading scriptB');
    };

    scriptA.onerror = function handleScriptError() {
        console.log('error loading scriptA');
    };

    document.head.appendChild(scriptA);
    document.head.appendChild(scriptB);
    // start();*/
}

function pauseToggle(){
    pauseBtn = document.getElementById("pauseBtn");
    pauseBtnSVG = pauseBtn.firstChild;
    
    // Toggle the button icon & button Background color
    pauseBtnSVG.classList.toggle("bi-play-fill");
    pauseBtn.classList.toggle("btn-primary");

    pauseBtnSVG.classList.toggle("bi-pause-fill");
    pauseBtn.classList.toggle("btn-danger");

    // Toggle Pause Status
    if(pauseStatus){
        pauseEnd();
    }else{
        pause();
    }

    // Grey background indicating pause
    if(document.body.style.backgroundColor == "grey"){
        document.body.style.backgroundColor = "white";
    } else{
        document.body.style.backgroundColor = "grey";
    }
}


// Enable tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})