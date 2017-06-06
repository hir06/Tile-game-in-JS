$(".start .cell").click(moveTile);
//to kep track of moves count
var counter = 0;
//to keep track of moves
var arr = [];
//to keep track of time
var startTime = new Date();
setInterval(function() {
    $('#currentTime').text((new Date - startTime) / 1000 + " Seconds");
}, 1000);


function undo() {
    var val = arr.pop();
    var dest = arr.pop();
    var source = arr.pop();
    $("#" + source).text(val);
    $("#" + dest).text("");

}

function compare() {
    var index = 1;
    for (var i = 0; i <= 2; i++) {
        for (var j = 0; j <= 2 && index < 16; j++) {
            if ($("#" + i + j).text() == index) {
                index++;

            } else {
                return false;
            }
        }
    }
    return true;
}

function completed() {
    var endTime = new Date();
    var time = (endTime - startTime) / 1000;
    $("#time").text(time);
    $('#onepush-modal').openModal();
    $('#currentTime').text("0");
}

function moveTile() {

    // Gets the position of the current element
    var pos = $(this).attr('data-pos');
    var posRow = parseInt(pos.split(',')[0]);
    var posCol = parseInt(pos.split(',')[1]);

    var emptyRow = $("#empty").attr('data-pos').split(",")[0];
    var emptyCol = $("#empty").attr('data-pos').split(",")[1];
    //move down
    if (posRow + 1 == emptyRow && posCol == emptyCol && posRow <= 3) {

        var temp = $("#" + posRow + posCol).text();
        $("#" + posRow + posCol).text("");
        $("#" + (posRow + 1) + posCol).text(temp);
        counter++;

        arr.push(posRow.toString() + posCol, (posRow + 1).toString() + posCol, temp);
        panel.innerHTML += 'Step: ' + posRow + ',' + posCol + ' -> ' + (posRow + 1) + ' ,' + posCol + "<br/>" + "<br/>";
        $('#empty').attr('data-pos', posRow + "," + posCol);
    }
    //move up
    if (posRow - 1 == emptyRow && posCol == emptyCol && posRow >= 0) {

        var temp = $("#" + posRow + posCol).text();
        $("#" + posRow + posCol).text("");
        $("#" + (posRow - 1) + posCol).text(temp);
        counter++;
        arr.push(posRow.toString() + posCol, (posRow - 1).toString() + posCol, temp);
        panel.innerHTML += 'Step: ' + posRow + ',' + posCol + ' -> ' + (posRow - 1) + ' ,' + posCol + "<br/>" + "<br/>";

        $('#empty').attr('data-pos', posRow + "," + posCol);


    }
    //move left
    if (posRow == emptyRow && posCol - 1 == emptyCol && posCol <= 3) {

        var temp = $("#" + posRow + posCol).text();
        $("#" + posRow + posCol).text("");
        $("#" + posRow + (posCol - 1)).text(temp);
        counter++;

        arr.push(posRow.toString() + posCol, (posRow).toString() + (posCol - 1), temp);
        panel.innerHTML += 'Step: ' + posRow + ',' + posCol + ' -> ' + (posRow) + ' ,' + (posCol - 1) + "<br/>" + "<br/>";
        $('#empty').attr('data-pos', posRow + "," + posCol);
    }
    //move right
    if (posRow == emptyRow && posCol + 1 == emptyCol && posCol >= 0) {

        var temp = $("#" + posRow + posCol).text();
        $("#" + posRow + posCol).text("");
        $("#" + posRow + (posCol + 1)).text(temp);
        counter++;
        arr.push(posRow.toString() + posCol, posRow.toString() + (posCol + 1), temp);
        panel.innerHTML += 'Step: ' + posRow + ',' + posCol + ' -> ' + (posRow) + ' ,' + (posCol + 1) + "<br/>" + "<br/>";
        $('#empty').attr('data-pos', posRow + "," + posCol);
    }
    if (compare()) {
        completed();
    }
    $("#move").text(counter);
}