function updateTableABC(abc) {

    console.log("LOG:", abc, abc.length);
    document.getElementById("paper").innerHTML = "";

    var table;
    var currentRow;

    console.log(document.getElementById("srgNotationTable"));

    // Create table if not exists 
    if (document.getElementById("srgNotationTable") == null) {
        console.log("Creating Table");
        table = document.createElement("table");
        table.className = "srgNotationTable";
        table.id = "srgNotationTable";
        table.insertRow();
        currentRow = table.firstChild.firstChild;
        currentRow.insertCell(-1);
        document.getElementById("paper").appendChild(table);
        console.log(currentRow);
    } else {
        table = document.getElementById("srgNotationTable");
        currentRow = table.firstChild.lastChild;
        console.log(currentRow);
    }


    /*        var poped = abc[abc.length - 1];
            console.log("Poped Value", typeof(poped), poped);
    
            if(poped == "\n"){
                if(abc[abc.length - 2] != "|")
                    currentRow.lastChild.innerHTML += abc[abc.length - 2] + " ";
                else    
                    currentRow.lastChild.innerHTML += abc[abc.length - 3] + " ";
                currentRow = table.insertRow();
                currentRow.insertCell(-1);
            } else if (poped == "|"){
                currentRow.lastChild.innerHTML += abc[abc.length - 2] + " ";
                currentRow.insertCell(-1);
            } else{
                currentRow.lastChild.innerHTML += poped + " ";
            }*/

    var prevCur = "";
    // for (const cur of abc) {
    //     console.log(cur);
    //     if (cur == "\n") {
    //         if(prevCur == "|"){
    //             currentRow.deleteCell(-1);
    //         }
    //         currentRow = table.insertRow();
    //         currentRow.insertCell(-1);  
    //     } else if (cur == "|") {
    //         currentRow.insertCell(-1);
    //     } else {
    //         currentRow.lastChild.innerHTML += cur + " ";
    //     }
    //     prevCur = cur;
    // }

    for(let x = 0; x < abc.len; x++){
        console.log(abc[x]);
        if(abc[x] == "\n"){
            if(prevCur == "|"){
                currentRow.deleteCell(-1);
            }
            currentRow = table.insertRow();
            currentRow.insertCell(-1);  
        } else if(abc[x] == "|"){
            currentRow.insertCell(-1);
        } else{
            currentRow.lastChild.innerHTML += abc[x] + " ";
        }

        prevCur = abc[x];
    }


    // } else {
    //     document.getElementById("paper").innerHTML = "";
    // }
}