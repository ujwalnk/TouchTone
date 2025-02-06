/**
 * Author: Ujwal N K
 * Date: 5 Jan, 2023
 * 
 */

/**
 * 
 * @param {*} abc 
 */

function updateTableABC(abc) {

    // Get the paper element from the HTML
    document.getElementById("paper").innerHTML = "";

    var table;
    var currentRow;

    console.log(document.getElementById("srgNotationTable"));

    // Create table if not exists 
    if (document.getElementById("srgNotationTable") == null) {
        
        table = document.createElement("table");
        table.className = "srgNotationTable";
        table.id = "srgNotationTable";
        table.insertRow();
        
        currentRow = table.firstChild.firstChild;
        currentRow.insertCell(-1);
        
        // Add the table to body.paper
        document.getElementById("paper").appendChild(table);
        
    } else {
        
        table = document.getElementById("srgNotationTable");
        currentRow = table.firstChild.lastChild;
        //console.log(currentRow);
    }

    var prevCur = "";

    for(let x = 0; x < abc.len; x++){
        console.log(abc[x]);
        if(abc[x] == "\n"){
            if(prevCur == "|"){
                // On Piping found, delete previous cell
                currentRow.deleteCell(-1);
            }

            // Insert a new row & cell
            currentRow = table.insertRow();
            currentRow.insertCell(-1);  
        } else if(abc[x] == "|"){
            // On piping found, insert new cell at end
            currentRow.insertCell(-1);
        } else{
            // Add the note to the cell
            currentRow.lastChild.innerHTML += abc[x] + " ";
        }

        prevCur = abc[x];
    }
}