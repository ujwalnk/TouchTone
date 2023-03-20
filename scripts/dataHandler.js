/**
 * Author: Ujwal N K
 * Date:  20 Mar, 2023
 * Handle Import and Export of Data
 */


/**
 * Generate Music JSON File Download - Export
 * @returns NULL
 */
function saveMusic() {
    // Save the existing data to LocalStorage
    dump();

    // Get music from LocalStorage
    try {
        // Don't save if no data saved
        if (localStorage.getItem("raw") == "[]") {
            alert("No Data");
            return;
        }
        if (localStorage.getItem("raw") != null) {
            rawJSONText = localStorage.getItem("raw");

            // Create File using the raw data from LocalStorage
            download("music.json", "{\"raw\":" + rawJSONText + "}");

            // Return or throw error - warn user
            return;
        }
    } catch (err) {
        console.log("Unable to generate download", err);
    }

    alert("We are Sorry! Unable to generate download");
}

/**
 * recallMusic() - import music from json file to LocalStorage
 */
function recallMusic(e){
    var fileReader = new FileReader();

    fileReader.onload = function(){
        rawJSONText = fileReader.result;
        
        rawJSON = JSON.parse(rawJSONText);
        localStorage.setItem("raw", rawJSON["raw"]);
        raw = rawJSON["raw"];
        load();

        console.log(rawJSON["raw"]);

    }

    fileReader.readAsText(e.files[0]);
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}