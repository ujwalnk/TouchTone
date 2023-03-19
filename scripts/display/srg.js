/**
 * Author: Ujwal N K
 * Date: 7 Jan, 2023
 * Custom Notation Handler
 */

/**
 * Fromat and add notes to Table
 * @param {String} abc - Custom notation to add to table
 */
function updateTableSRG(abc) {

    console.log("LOG:", abc);
    document.getElementById("paper").innerHTML = "";

    var table;
    var currentRow;

    console.log(document.getElementById("srgNotationTable"));

    // Create table if not exists 
    if (document.getElementById("srgNotationTable") == null) {

        table = document.createElement("table");
        table.className = "srgNotationTable";
        table.id = "srgNotationTable";
        
        // TODO: Check for content Editable
        table.contentEditable = true;
        
        table.insertRow();

        currentRow = table.firstChild.firstChild;
        currentRow.insertCell(-1);

        document.getElementById("paper").appendChild(table);

    } else {
        table = document.getElementById("srgNotationTable");
        currentRow = table.firstChild.lastChild;
        console.log(currentRow);
    }

    var prevCur = "";
    for (const cur of abc) {
        if (cur == "\n") {
            if(prevCur == "|"){
                currentRow.deleteCell(-1);
            }
            currentRow = table.insertRow();
            currentRow.insertCell(-1);  
        } else if (cur == "|") {
            currentRow.insertCell(-1);
        } else {
            currentRow.lastChild.innerHTML += cur + " ";
        }
        prevCur = cur;
    }
}