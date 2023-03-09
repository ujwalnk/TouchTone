/**
 * Author: Ujwal N K
 * Date: 2 Jan, 2023
 * Add Piping and New Lines into the array - into ABC / Staff Format
 */


/**
 * 
 * @param {Array} arr - User inputted midi data
 * @param {Number} notesPerCell - Number of notes in one cell
 * @param {Number} cellsPerLine - Number of cells in one line
 * @returns  - Formatted array with piping & new Lines into ABC / Staff Format
 */


function addPipesNLines(arr, notesPerCell, cellsPerLine) {
    var pipeCounter = 0;
    var lineCounter = 0;

    var resp = [];
    
    // Total Pipes & Lines Counter
    var pipeCtr = 0;
    var lineCtr = 0;
    
    for(var x = 0; x < arr.length; x++){
        if(arr[x] == "|") {
            // On finding a user inserted piping, reset the piping counter
            pipeCtr = 0;
            lineCtr++;
        } else if(arr[x] == "\n") {
            // On finding a user inserted newline, reset the newline counter
            lineCtr = 0;
        } else {
            // Increase the piping counter
            pipeCtr++;
        }
        resp.push(arr[x]);
        
        // On number of notes == notesPerCell insert a piping & clear the counter
        if(pipeCtr == notesPerCell) {
            resp.push("|");
            pipeCtr = 0;
            lineCtr++;
        }

        // On number of cells per line == cellsPerLine insert a newline & clear the lineCtr
        if(lineCtr == cellsPerLine) {
            resp.push("\n");
            lineCtr = 0;
        }
    }

    // Return once piping and lines are added
    return resp;
}