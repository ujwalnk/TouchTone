/**
 * Author: Ujwal N K
 * Date: 5 Jan, 2023
 * Make a table for ABC and Custom Notation and put it on HTML
 */


/**
 * Function to put the ABC Script on the HTML 
 * @param {String} abc - Western music script 
 */
function updateTableABC(abc) {

    // Get the paper element from html
    document.getElementById("paper").innerHTML = "";

    var table;
    var currentRow;

    // Create a new table
    table = document.createElement("table");
    table.className = "srgNotationTable";
    table.id = "srgNotationTable";

    // Add a new row and column
    table.insertRow();
    currentRow = table.firstChild.lastChild;
    currentRow.insertCell(-1);

    // Put the table onto HTML
    document.getElementById("paper").appendChild(table);

    var prevCur = "";

    for (let x = 0; x < abc.length; x++) {
        // On adding a new line, remove the last blank cell on the previous line
        if (abc[x] == "\n") {
            if (prevCur == "|") {
                currentRow.deleteCell(-1);
            }
            currentRow = table.insertRow();
            currentRow.insertCell(-1);
        } else if (abc[x] == "|") {
            // Delete extra cell on using a new cell
            currentRow.insertCell(-1);
        } else {
            // Add octave numbering at the bottom

            // Add # as a superscript incase it exists
            if (abc[x].includes("#"))
                currentRow.lastChild.innerHTML += abc[x].replace(/[^a-z]/gi, '') + "<sub>" + abc[x].match(/(\d+)/)[1] + "</sub><sup>#</sup> ";
            else
                currentRow.lastChild.innerHTML += abc[x].replace(/[^a-z]/gi, '') + "<sub>" + abc[x].match(/(\d+)/)[1] + "</sub>" + " ";

        }
        prevCur = abc[x];
    }
}

/**
 * Function to put Custom notation on HTML
 * @param {String} abc - Custom Notation
 */
function updateTableSRG(abc) {

    // Get the paper on HTML
    document.getElementById("paper").innerHTML = "";

    var table;
    var currentRow;

    // Create Table
    table = document.createElement("table");
    table.className = "srgNotationTable";
    table.id = "srgNotationTable";
    
    // Insert a row and column to the table
    table.insertRow();
    currentRow = table.firstChild.lastChild;
    currentRow.insertCell(-1);

    // Write the table to the HTML
    document.getElementById("paper").appendChild(table);

    var prevCur = "";

    for (let x = 0; x < abc.length; x++) {

        if (abc[x] == "\n") {
            if (prevCur == "|") {
                currentRow.deleteCell(-1);
            }
            currentRow = table.insertRow();
            currentRow.insertCell(-1);
        } else if (abc[x] == "|") {
            currentRow.insertCell(-1);
        } else {
            currentRow.lastChild.innerHTML += abc[x] + " ";
        }
        prevCur = abc[x];
    }
}