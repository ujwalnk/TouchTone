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