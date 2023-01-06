function addPipesNLines(arr, notesPerCell, cellsPerLine) {
    var pipeCounter = 0;
    var lineCounter = 0;

    // console.log("notesPerCell: ", notesPerCell, " cellsPerLine: ", cellsPerLine);

    var resp = [];
    var pipeCtr = 0;
    var lineCtr = 0;
    for(var x = 0; x < arr.length; x++){
        // console.log(arr[x]);
        if(arr[x] == "|") {
            // console.log("Found piping");
            pipeCtr = 0;
            lineCtr++;
        } else if(arr[x] == "\n") {
            // console.log("Found new line");
            lineCtr = 0;
        } else {
            pipeCtr++;
        }
        resp.push(arr[x]);
        // console.log("pipeCtr: ", pipeCtr, " lineCtr: ", lineCtr);
        if(pipeCtr == notesPerCell) {
            // console.log("pipeCtr reached max");
            resp.push("|");
            pipeCtr = 0;
            lineCtr++;
        }
        if(lineCtr == cellsPerLine) {
            // console.log("lineCtr reached max");
            resp.push("\n");
            lineCtr = 0;
        }
        // console.log("Response: ", resp);
    }
    return resp;
}