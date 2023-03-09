/**
 * Author: Ujwal N K
 * Date: 4 Jan, 2023
 * Convert RAW MIDI data into staff notation
 */


/**
 * 
 * @param {MIDI} rawMIDI - raw MIDI input from instrument
 * @returns staff Formatted String
 */
function convert2Staff(rawMIDI){

    console.log(rawMIDI);
    staff = [];

    for(let cur of rawMIDI){
        var temp = "";

        if(cur.includes("#") == true)
            temp = "^";
        cur = cur.replace("#", "");
        temp += cur;

        staff.push(temp);
    }

    return staff;
}