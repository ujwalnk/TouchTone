/**
 * Author: Ujwal N K
 * Date: 2 Jan, 2023
 * User Specified formatting applied to the given data
 */

/**
 * 
 * @param {String} rawCopy - String to be formatted into custom notation format
 * @returns Custom formatted Array - with piping & new Lines
 */

function convert2SRG(rawCopy) {

    let raw = rawCopy.slice();

    for (let x = 0; x < raw.length; x++) {

        // Middle Octave Notes
        if (Object.keys(srgNotes).includes(raw[x])) {
            raw[x] = srgNotes[raw[x]]["M"];
        }

        // Higher & Lower Octave Notes
        else {
            for (const note in srgNotes) {
                // Match note name (ex. C, D, E etc)
                if (note.replace(/[0-9]/g, '') == raw[x].replace(/[0-9]/g, '')) {

                    // Match octave number (ex. 3, 4)
                    if (note.match(/\d+/)[0] > raw[x].match(/\d+/)[0]) {
                        // Lower Octave
                        if (srgNotes[note]["L"].length != 0)
                            raw[x] = srgNotes[note]["L"];
                        else {
                            raw[x] = "<span class='lowerNote'>" + srgNotes[note]["M"] + "</span>";
                        }
                    } else {
                        // Higher Octave
                        if (srgNotes[note]["H"].length != 0)
                            raw[x] = srgNotes[note]["H"];
                        else {
                            raw[x] = "<span class='higherNote'>" + srgNotes[note]["M"] + "</span>";
                        }
                    }
                    break;
                }
            }
        }


    }
    return raw;
}