/**
 * Author: Ujwal N K
 * Date: 21 Mar, 23
 * Play Along Module - Highlight note to be played
 */

// Note to be played
var note2BePlayed;

function playAlongTable(){
    notesTableFirstCell = document.getElementById("srgNotationTable").firstChild.firstChild.firstChild;
    console.log(notesTableFirstCell);

    // document.getElementById().firstChild.

    notesTableFirstCell.firstChild.classList.toggle("markNote");
}