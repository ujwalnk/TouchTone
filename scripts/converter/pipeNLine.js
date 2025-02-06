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
 * @param {Number} emptyLinesPerNewLine - Number of new Lines for every new Line
 * @returns  - Formatted array with piping & new Lines into ABC / Staff Format
 */
function addPipesNLines(arr, notesPerCell, cellsPerLine, emptyLinesPerNewLine) {
    var pipeCounter = 0;
    var lineCounter = 0;

    var resp = [];

    for(let lines = 1; lines < emptyLinesPerNewLine; lines++){
        for(let pipes = 0; pipes < cellsPerLine; pipes ++){
            resp.push("|");
        }
        resp.push("\n");
    }
    
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
            
            // Add extra lines incase user intended extra lines - even when user inputs new line explicitly
            for(let x = 0; x < emptyLinesPerNewLine - 1; x ++){
                resp.push("\n");

                // Add number of cells to the row as the previous row
                for(let y = 0; y < cellsPerLine; y++){
                    resp.push("|");
                }
            }

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

            // Add extra lines incase user intended extra lines
            for(let x = 0; x < emptyLinesPerNewLine - 1; x ++){
                resp.push("\n");

                // Add number of cells to the row as the previous row
                for(let y = 0; y < cellsPerLine; y++){
                    resp.push("|");
                }
            }

            // Add new line for the next set of entires
            resp.push("\n");
            lineCtr = 0;
        }
    }

    // Return once piping and lines are added
    return resp;
}