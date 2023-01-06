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
                if (note.replace(/[0-9]/g, '') == raw[x].replace(/[0-9]/g, '')) {
                    if (note.match(/\d+/)[0] > raw[x].match(/\d+/)[0]) {
                        // Lower Octave
                        raw[x] = srgNotes[note]["L"];
                    } else {
                        // Higher Octave
                        raw[x] = srgNotes[note]["H"];
                    }
                    break;
                }
            }
        }


    }
    return raw;
}