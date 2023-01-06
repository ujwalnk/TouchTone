const jsLiveDiv = ABCJS;
var visualOptions = { responsive: 'resize', add_classes: true}

function updateScript(str) {
    jsLiveDiv.renderAbc("paper", str, visualOptions);
}