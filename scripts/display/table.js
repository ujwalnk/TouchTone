function updateTableABC(abc) {

    document.getElementById("paper").innerHTML = "";

    var table;
    var currentRow;

    table = document.createElement("table");
    table.className = "srgNotationTable";
    table.id = "srgNotationTable";
    table.insertRow();

    currentRow = table.firstChild.lastChild;
    currentRow.insertCell(-1);

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

            if (abc[x].includes("#"))
                currentRow.lastChild.innerHTML += abc[x].replace(/[^a-z]/gi, '') + "<sub>" + abc[x].match(/(\d+)/)[1] + "</sub><sup>#</sup> ";

            else
                currentRow.lastChild.innerHTML += abc[x].replace(/[^a-z]/gi, '') + "<sub>" + abc[x].match(/(\d+)/)[1] + "</sub>" + " ";

        }
        prevCur = abc[x];
    }
}

function updateTableSRG(abc) {

    document.getElementById("paper").innerHTML = "";

    var table;
    var currentRow;

    table = document.createElement("table");
    table.className = "srgNotationTable";
    table.id = "srgNotationTable";
    table.insertRow();

    currentRow = table.firstChild.lastChild;
    currentRow.insertCell(-1);

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