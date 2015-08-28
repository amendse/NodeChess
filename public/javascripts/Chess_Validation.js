

var blckedblocks = ['a1', 'b1', 'a2', 'b2', 'a11', 'b11', 'a12', 'b12', 'k1','k2', 'k11', 'k12', 'l1', 'l2', 'l11', 'l12'];


document.addEventListener('DOMContentLoaded', function () {

    /*Empty ChessBoard*/
    $('#board').append('<table id="ChessBoard" style="border:1px solid #000;border-collapse: collapse;"></table>');
    var table = $('#board').children();
    var rowcreate;
    var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
    var cnt = 12;
    for (var i = 0; i < 12; i++) {

        rowcreate = rowcreate + "<tr>";
        for (var j = 0; j < 12; j++) {
            rowcreate = rowcreate + "<td id=" + col[j] + cnt + " class='ChessBlocks' ondrop='drop(event)' ondragover='allowDrop(event)'></td>";
           
        }
        rowcreate = rowcreate + "</tr>";
        cnt--;
    }
    table.append(rowcreate);

    /*Background Black & White*/
    var table = document.getElementById("ChessBoard");
    for (var i = 0, row; row = table.rows[i]; i++) {
        for (var j = 0, col; col = row.cells[j]; j++) {
                if ((i + j) % 2 == 0)
                    row.cells[j].style.backgroundColor = "#fff";
                else
                    row.cells[j].style.backgroundColor = "#999";
         
        }
    }
  
    for (var i = 0; i < blckedblocks.length; i++) {
        
        var clrblk = blckedblocks[i];
     $("#" + clrblk).css("background-color", "Blue", "border-color", "Black","cellspacing","0", "cellpadding","0","rowspan","0");
        //$("#" + clrblk).css("border-color", "Black");
        //$("#a1").style.backgroundColor = "#5e6bd1";
        //blckedblocks[i].style.backgroundColor = "#000";
    }

});


var gamestarted;
var activeplayer;
var TurnCountwP = 1;
var TurnCountbP = 1;
var TurnCountrP = 1;
var TurnCountgP = 1;
var wpValid = false;


function p1strt() {
   
  //  gamestarted = 1;
    var col = ["'#c2'", "'#d2'", "'#e2'", "'#f2'", "#g2", "#h2", "#i2", "#j2", "#c1","#j1", "#d1", "#i1", "#e1","#h1", "#f1", "#g1"];
    var imgs = ["wP.png", "wR.png", "wN.png", "wB.png", "wQ.png", "wK.png"];
 
    $("#c2").prepend('<img id="wP1" src=wP.png draggable="true" ondragstart="drag(event)"/>');
    $("#d2").prepend('<img id="wP2" src=wP.png draggable="true" ondragstart="drag(event)"/>');
    $("#e2").prepend('<img id="wP3" src=wP.png draggable="true" ondragstart="drag(event)"/>');
    $("#f2").prepend('<img id="wP4" src=wP.png draggable="true" ondragstart="drag(event)"/>');
    $("#g2").prepend('<img id="wP5" src=wP.png draggable="true" ondragstart="drag(event)"/>');
    $("#h2").prepend('<img id="wP6" src=wP.png draggable="true" ondragstart="drag(event)"/>');
    $("#i2").prepend('<img id="wP7" src=wP.png draggable="true" ondragstart="drag(event)"/>');
    $("#j2").prepend('<img id="wP8" src=wP.png draggable="true" ondragstart="drag(event)"/>');
    $("#c1").prepend('<img id="wR1" src=wR.png draggable="true" ondragstart="drag(event)"/>');
    $("#d1").prepend('<img id="wN1" src=wN.png draggable="true" ondragstart="drag(event)"/>');
    $("#e1").prepend('<img id="wB1" src=wB.png draggable="true" ondragstart="drag(event)"/>');
    $("#f1").prepend('<img id="wQ" src=wQ.png draggable="true" ondragstart="drag(event)"/>');
    $("#g1").prepend('<img id="wK" src=wK.png draggable="true" ondragstart="drag(event)"/>');
    $("#h1").prepend('<img id="wB2" src=wB.png draggable="true" ondragstart="drag(event)"/>');
    $("#i1").prepend('<img id="wN2" src=wN.png draggable="true" ondragstart="drag(event)"/>');
    $("#j1").prepend('<img id="wR2" src=wR.png draggable="true" ondragstart="drag(event)"/>');

   // activeplayer = "w";
}

function p3strt() {
  //  gamestarted = 1;
    /*Add Images In td BLocks*/
    $('#c12').prepend('<img id="bR1" src="bR.png" draggable="true" ondragstart="drag(event)"/>');
    $("#d12").prepend('<img id="bN1" src=bN.png draggable="true" ondragstart="drag(event)"/>');
    $("#e12").prepend('<img id="bB1" src=bB.png draggable="true" ondragstart="drag(event)"/>');
    $("#f12").prepend('<img id="bQ" src=bQ.png draggable="true" ondragstart="drag(event)"/>');
    $("#g12").prepend('<img id="bK" src=bK.png draggable="true" ondragstart="drag(event)"/>');
    $("#h12").prepend('<img id="bB2" src=bB.png draggable="true" ondragstart="drag(event)"/>');
    $("#i12").prepend('<img id="bN1" src=bN.png draggable="true" ondragstart="drag(event)"/>');
    $("#j12").prepend('<img id="bR2" src=bR.png draggable="true" ondragstart="drag(event)"/>');
    $("#c11").prepend('<img id="bP1" src=bP.png class="chsele"/>');
    $("#d11").prepend('<img id="bP2" src=bP.png draggable="true" ondragstart="drag(event)"/>');
    $("#e11").prepend('<img id="bP3" src=bP.png draggable="true" ondragstart="drag(event)"/>');
    $("#f11").prepend('<img id="bP4" src=bP.png draggable="true" ondragstart="drag(event)"/>');
    $("#g11").prepend('<img id="bP5" src=bP.png draggable="true" ondragstart="drag(event)"/>');
    $("#h11").prepend('<img id="bP6" src=bP.png draggable="true" ondragstart="drag(event)"/>');
    $("#i11").prepend('<img id="bP7" src=bP.png draggable="true" ondragstart="drag(event)"/>');
    $("#j11").prepend('<img id="bP8" src=bP.png draggable="true" ondragstart="drag(event)"/>');

  //  activeplayer = "w";
}

function p2strt() {
 //   gamestarted = 1;
    $("#b3").prepend('<img id="gP1" src=GPawn.png draggable="true" ondragstart="drag(event)"/>');
    $("#b4").prepend('<img id="gP2" src=GPawn.png draggable="true" ondragstart="drag(event)"/>');
    $("#b5").prepend('<img id="gP3" src=GPawn.png draggable="true" ondragstart="drag(event)"/>');
    $("#b6").prepend('<img id="gP4" src=GPawn.png draggable="true" ondragstart="drag(event)"/>');
    $("#b7").prepend('<img id="gP5" src=GPawn.png draggable="true" ondragstart="drag(event)"/>');
    $("#b8").prepend('<img id="gP6" src=GPawn.png draggable="true" ondragstart="drag(event)"/>');
    $("#b9").prepend('<img id="gP7" src=GPawn.png draggable="true" ondragstart="drag(event)"/>');
    $("#b10").prepend('<img id="gP8" src=GPawn.png draggable="true" ondragstart="drag(event)"/>');
    $("#a3").prepend('<img id="gR1" src=GRook.png draggable="true" ondragstart="drag(event)"/>');
    $("#a4").prepend('<img id="gN1" src=GKnight.png draggable="true" ondragstart="drag(event)"/>');
    $("#a5").prepend('<img id="gB1" src=GBishop.png draggable="true" ondragstart="drag(event)"/>');
    $("#a6").prepend('<img id="gQ" src=GQueen.png draggable="true" ondragstart="drag(event)"/>');
    $("#a7").prepend('<img id="gK" src=GKing.png draggable="true" ondragstart="drag(event)"/>');
    $("#a8").prepend('<img id="gB2" src=GBishop.png draggable="true" ondragstart="drag(event)"/>');
    $("#a9").prepend('<img id="gN2" src=GKnight.png draggable="true" ondragstart="drag(event)"/>');
    $("#a10").prepend('<img id="gR2" src=GRook.png draggable="true" ondragstart="drag(event)"/>');

  //  activeplayer = "w";
}

function p4strt() {

    gamestarted = 1;

    $("#k3").prepend('<img id="rP1" src=rPawn.png draggable="true" ondragstart="drag(event)"/>');
    $("#k4").prepend('<img id="rP2" src=rPawn.png draggable="true" ondragstart="drag(event)"/>');
    $("#k5").prepend('<img id="rP3" src=rPawn.png draggable="true" ondragstart="drag(event)"/>');
    $("#k6").prepend('<img id="rP4" src=rPawn.png draggable="true" ondragstart="drag(event)"/>');
    $("#k7").prepend('<img id="rP5" src=rPawn.png draggable="true" ondragstart="drag(event)"/>');
    $("#k8").prepend('<img id="rP6" src=rPawn.png draggable="true" ondragstart="drag(event)"/>');
    $("#k9").prepend('<img id="rP7" src=rPawn.png draggable="true" ondragstart="drag(event)"/>');
    $("#k10").prepend('<img id="rP8" src=rPawn.png draggable="true" ondragstart="drag(event)"/>');
    $("#l3").prepend('<img id="rR1" src=rRook.png draggable="true" ondragstart="drag(event)"/>');
    $("#l4").prepend('<img id="rN1" src=rKnight.png draggable="true" ondragstart="drag(event)"/>');
    $("#l5").prepend('<img id="rB1" src=rBishop.png draggable="true" ondragstart="drag(event)"/>');
    $("#l6").prepend('<img id="rQ" src=rQueen.png draggable="true" ondragstart="drag(event)"/>');
    $("#l7").prepend('<img id="rK" src=rKing.png draggable="true" ondragstart="drag(event)"/>');
    $("#l8").prepend('<img id="rB2" src=rBishop.png draggable="true" ondragstart="drag(event)"/>');
    $("#l9").prepend('<img id="rN2" src=rKnight.png draggable="true" ondragstart="drag(event)"/>');
    $("#l10").prepend('<img id="rR2" src=rRook.png draggable="true" ondragstart="drag(event)"/>');

    activeplayer = "w";
}

function drag(ev) {

    if (gamestarted == true) {
        var player = (ev.target.id).substring(0, 1);
        if (activeplayer != player) {
            alert("Sorry Its not your turn");
        }
        else {
            switch (player) {
                case 'w':
                    ev.dataTransfer.setData("text", ev.target.id);
                    activeplayer = "g";
                    var player = (ev.target.id).substring(0, 2);
                    break;
                case 'g':
                    ev.dataTransfer.setData("text", ev.target.id);
                    activeplayer = "b";
                    break;
                case 'b':
                    ev.dataTransfer.setData("text", ev.target.id);
                    activeplayer = "r";
                    break;
                case 'r':
                    ev.dataTransfer.setData("text", ev.target.id);
                    activeplayer = "w";
                    break;
            }
        }
    }
    else {
        alert("Please Start the game to play...");
    }


}

function allowDrop(ev) {
    ev.preventDefault();

}


function drop(ev) {

    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var piecepicked = data.substring(1, 2);
    var whichplayer = data.substring(0, 1);
    var pickpiecefrom = $("#" + data).parent().attr("id");
    var placepieceat = ev.target.id;

    var elementType = $("#" + placepieceat).prop('tagName');
    var pickedPieceRow = pickpiecefrom.substring(1, pickpiecefrom.length);
    var pickedPieceColumn = pickpiecefrom.substring(0, 1);
    var DropPieceRow;
    var DropPieceColumn;
    var dropPlayer;

    if (elementType == 'TD') {
        DropPieceRow = placepieceat.substring(1, placepieceat.length);
        DropPieceColumn = placepieceat.substring(0, 1);
    }
    else if (elementType == "IMG") {
        dropPlayer = placepieceat.substring(0, 1);
        placepieceat = $("#" + placepieceat).parent().attr("id");
        DropPieceRow = placepieceat.substring(1, placepieceat.length);
        DropPieceColumn = placepieceat.substring(0, 1);
    }





    var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
    var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    var leftCol;
    var rightCol;
    var leftRow;
    var rightRow;
    var straightCol = [];
    var inBetImg = false;
    var i;
    var j;

    wpValid = false;


    if (whichplayer == 'w' || whichplayer == 'b') {
        leftCol = col[($.inArray(pickedPieceColumn, col) - 1 + col.length) % col.length];
        rightCol = col[($.inArray(pickedPieceColumn, col) + 1 + col.length) % col.length];
        i = pickedPieceRow;
        j = DropPieceRow;
    }
    else {
        leftRow = parseInt(pickedPieceRow) + 1;
        rightRow = parseInt(pickedPieceRow) - 1;
        i = col.indexOf(pickedPieceColumn);
        j = col.indexOf(DropPieceColumn);
    }


    switch (whichplayer) {
        case 'w':
            do {
                i++;
                straightCol.push(pickedPieceColumn + i);
            } while (i < j);
            break;

        case 'b':
            do {
                i--;
                straightCol.push(pickedPieceColumn + i);
            } while (i > j);
            break;

        case 'g':
            do {
                i++;
                straightCol.push(col[i] + DropPieceRow);

            } while (i < j);
            break;

        case 'r':
            do {
                i--;
                straightCol.push(col[i] + DropPieceRow);
            } while (i > j);
            break;
    }



    $.each(straightCol, function (key, value) {
        var InElementType = $("#" + value).children().prop('tagName');
        if (InElementType == "IMG") {
            inBetImg = true;
        }
    });

    
    switch (piecepicked) {
        case 'P':
            /********************************************************/
            /************************  PAWN *************************/
            /********************************************************/

            switch (whichplayer) {

                case 'w':
                    /***  For Straight Move  ***/
                    if (pickedPieceColumn == DropPieceColumn) {
                        if (pickedPieceRow == 2 && (DropPieceRow == 4 || DropPieceRow == 3) && inBetImg == false && pickpiecefrom != placepieceat && elementType != "IMG")//Fist Move of Pawn
                        {
                            wpValid = true;
                        }
                        else if (pickedPieceRow > 2 && (DropPieceRow - pickedPieceRow) == 1 && pickpiecefrom != placepieceat && elementType != "IMG")//Second Move start of Pawn
                        {
                            wpValid = true;
                        }
                        else {
                            wpValid = false;
                        }

                        if (wpValid == true) {
                            ev.target.appendChild(document.getElementById(data));
                            TurnCountwP++;
                            activeplayer = "g";
                            $("#msg").text("");
                        }
                        else {
                            activeplayer = "w";
                            $("#msg").text("Invalid Move");
                        }
                    }
                    else if (pickedPieceColumn != DropPieceColumn && whichplayer != dropPlayer)/***  For Digonal Move  ***/ {
                        if (pickedPieceRow > 2 && DropPieceColumn == leftCol && elementType == "IMG" && (DropPieceRow - pickedPieceRow) == 1 && pickedPieceRow != DropPieceRow && DropPieceRow > pickedPieceRow && pickpiecefrom != placepieceat) {
                            $("#" + placepieceat).html($("#" + pickpiecefrom).html());//Replace Left Digonal
                            $("#" + pickpiecefrom).empty();
                            $("#msg").text("");
                            activeplayer = "g";
                        }
                        else if (pickedPieceRow > 2 && DropPieceColumn == rightCol && elementType == "IMG" && (DropPieceRow - pickedPieceRow) == 1 && pickedPieceRow != DropPieceRow && DropPieceRow > pickedPieceRow && pickpiecefrom != placepieceat) {
                            $("#" + placepieceat).html($("#" + pickpiecefrom).html());//Replace Right Digonal
                            $("#" + pickpiecefrom).empty();
                            $("#msg").text("");
                            activeplayer = "g";
                        }
                        else {
                            activeplayer = "w";
                            $("#msg").text("Invalid Move");
                        }
                    }
                    else {
                        activeplayer = "w";
                        $("#msg").text("Invalid Move");
                    }
                    break;

                case 'b':
                    /***  For Straight Move  ***/
                    if (pickedPieceColumn == DropPieceColumn) {
                        if (pickedPieceRow == 11 && (DropPieceRow == 10 || DropPieceRow == 9) && inBetImg == false && pickpiecefrom != placepieceat && elementType != "IMG")//Fist Move of Pawn
                        {
                            wpValid = true;
                        }
                        else if (pickedPieceRow < 11 && (pickedPieceRow - DropPieceRow) == 1 && pickpiecefrom != placepieceat && elementType != "IMG")//Second Move start of Pawn
                        {
                            wpValid = true;
                        }
                        else {
                            wpValid = false;
                        }

                        if (wpValid == true) {
                            ev.target.appendChild(document.getElementById(data));
                            TurnCountwP++;
                            activeplayer = "r";
                            $("#msg").text("");
                        }
                        else {
                            activeplayer = "b";
                            $("#msg").text("Invalid Move");
                        }
                    }
                    else if (pickedPieceColumn != DropPieceColumn && whichplayer != dropPlayer)/***  For Digonal Move  ***/ {
                        if (pickedPieceRow < 11 && DropPieceColumn == rightCol && elementType == "IMG" && (pickedPieceRow - DropPieceRow) == 1 && pickedPieceRow != DropPieceRow && DropPieceRow < pickedPieceRow && pickpiecefrom != placepieceat) {
                            $("#" + placepieceat).html($("#" + pickpiecefrom).html());//Replace Left Digonal
                            $("#" + pickpiecefrom).empty();
                            $("#msg").text("");
                            activeplayer = "r";
                        }
                        else if (pickedPieceRow < 11 && DropPieceColumn == leftCol && elementType == "IMG" && (pickedPieceRow - DropPieceRow) == 1 && pickedPieceRow != DropPieceRow && DropPieceRow < pickedPieceRow && pickpiecefrom != placepieceat) {
                            $("#" + placepieceat).html($("#" + pickpiecefrom).html());//Replace Right Digonal
                            $("#" + pickpiecefrom).empty();
                            $("#msg").text("");
                            activeplayer = "r";
                        }
                        else {
                            activeplayer = whichplayer;
                            $("#msg").text("Invalid Move");
                        }
                    }
                    else {
                        activeplayer = whichplayer;
                        $("#msg").text("Invalid Move");
                    }
                    break;


                case 'r':

                    pickedPieceColumnIndex = col.indexOf(pickedPieceColumn);
                    DropPieceColumnIndex = col.indexOf(DropPieceColumn);
                    if (pickedPieceRow == DropPieceRow) {
                        if (pickedPieceColumn != DropPieceColumn && (pickedPieceColumnIndex - DropPieceColumnIndex) <= 2 && pickedPieceColumnIndex > DropPieceColumnIndex && inBetImg == false && pickpiecefrom != placepieceat && elementType != "IMG")//Fist Move of Pawn  && (DropPieceRow - pickedPieceRow) <= 2
                        {
                            //alert("r1");
                            wpValid = true;
                        }
                        else if (pickedPieceColumn != DropPieceColumn && (pickedPieceColumnIndex - DropPieceColumnIndex) == 1 && pickpiecefrom != placepieceat && elementType != "IMG")//Second Move start of Pawn   && (DropPieceRow - pickedPieceRow) == 1
                        {
                            //alert("r2");
                            wpValid = true;
                        }
                        else {
                            wpValid == false;
                        }

                        if (wpValid == true) {
                            ev.target.appendChild(document.getElementById(data));
                            TurnCountwP++;
                            activeplayer = "w";
                            $("#msg").text("");
                        }
                        else {
                            activeplayer = "r";
                            $("#msg").text("Invalid Move");
                        }
                    }
                    else if (pickedPieceRow != DropPieceRow && whichplayer != dropPlayer)/***  For Digonal Move  ***/ {
                        if (pickedPieceColumnIndex < 10 && DropPieceRow == leftRow && elementType == "IMG" && (pickedPieceColumnIndex - DropPieceColumnIndex) == 1 && pickedPieceColumn != DropPieceColumn && DropPieceColumnIndex < pickedPieceColumnIndex && pickpiecefrom != placepieceat) {
                            //alert("innnn  leftCol" + leftCol + "")
                            $("#" + placepieceat).html($("#" + pickpiecefrom).html());//Replace Left Digonal
                            $("#" + pickpiecefrom).empty();
                            $("#msg").text("");
                            activeplayer = "w";
                        }
                        else if (pickedPieceColumnIndex < 10 && DropPieceRow == rightRow && elementType == "IMG" && (pickedPieceColumnIndex - DropPieceColumnIndex) == 1 && pickedPieceColumn != DropPieceColumn && DropPieceColumnIndex < pickedPieceColumnIndex && pickpiecefrom != placepieceat) {
                            //alert("innnn  rightCol" + rightCol + "")
                            $("#" + placepieceat).html($("#" + pickpiecefrom).html());//Replace Right Digonal
                            $("#" + pickpiecefrom).empty();
                            $("#msg").text("");
                            activeplayer = "w";
                        }
                        else {
                            activeplayer = whichplayer;
                            $("#msg").text("Invalid Move");
                        }
                    }
                    else {
                        activeplayer = whichplayer;
                        $("#msg").text("Invalid Move");
                    }
                    break;
                case 'g':
                    pickedPieceColumnIndex = col.indexOf(pickedPieceColumn);
                    DropPieceColumnIndex = col.indexOf(DropPieceColumn);

                    if (pickedPieceRow == DropPieceRow) {
                        if (pickedPieceColumn != DropPieceColumn && (DropPieceColumnIndex - pickedPieceColumnIndex) <= 2 && DropPieceColumnIndex > pickedPieceColumnIndex && inBetImg == false && pickpiecefrom != placepieceat && elementType != "IMG")//Fist Move of Pawn  && (DropPieceRow - pickedPieceRow) <= 2
                        {
                            //alert("g1");
                            wpValid = true;
                        }
                        else if (pickedPieceColumn != DropPieceColumn && (DropPieceColumnIndex - pickedPieceColumnIndex) == 1 && pickpiecefrom != placepieceat && elementType != "IMG")//Second Move start of Pawn   && (DropPieceRow - pickedPieceRow) == 1
                        {
                            //alert("g2");
                            wpValid = true;
                        }
                        else {
                            wpValid == false;
                        }

                        if (wpValid == true) {
                            ev.target.appendChild(document.getElementById(data));
                            TurnCountwP++;
                            activeplayer = "b";
                            $("#msg").text("");
                        }
                        else {
                            activeplayer = "g";
                            $("#msg").text("Invalid Move");
                        }
                    }
                    else if (pickedPieceRow != DropPieceRow && whichplayer != dropPlayer)/***  For Digonal Move  ***/ {
                        if (pickedPieceColumnIndex > 1 && DropPieceRow == rightRow && elementType == "IMG" && (DropPieceColumnIndex - pickedPieceColumnIndex) == 1 && pickedPieceColumn != DropPieceColumn && DropPieceColumnIndex > pickedPieceColumnIndex && pickpiecefrom != placepieceat) {
                            $("#" + placepieceat).html($("#" + pickpiecefrom).html());//Replace Left Digonal
                            $("#" + pickpiecefrom).empty();
                            $("#msg").text("");
                            activeplayer = "b";
                        }
                        else if (pickedPieceColumnIndex > 1 && DropPieceRow == leftRow && elementType == "IMG" && (DropPieceColumnIndex - pickedPieceColumnIndex) == 1 && pickedPieceColumn != DropPieceColumn && DropPieceColumnIndex > pickedPieceColumnIndex && pickpiecefrom != placepieceat) {
                            //alert("innnn  rightCol" + rightCol + "");
                            $("#" + placepieceat).html($("#" + pickpiecefrom).html());//Replace Right Digonal
                            $("#" + pickpiecefrom).empty();
                            $("#msg").text("");
                            activeplayer = "b";
                        }
                        else {
                            activeplayer = whichplayer;
                            $("#msg").text("Invalid Move");
                        }
                    }
                    else {
                        activeplayer = whichplayer;
                        $("#msg").text("Invalid Move");
                    }
                    break;
            }
            break;


        case 'R':
            /********************************************************/
            /************************ ROOK *************************/
            /********************************************************/
        case 'w':
            
            if (((pickedPieceRow == DropPieceRow) || (pickedPieceColumn == DropPieceColumn)) && (pickedPieceRookRowIndex1 != -1 && DropPieceRookRowIndex1 != -1)) {
                alert("Proper Move");
            }
            else {
                activeplayer = "w";
                $("#msg").text("Invalid Move");
                alert("Invalid Move");
            }
            break;



        ////////case 'g':
        ////////    {
        ////////        if (pickedPieceRow == 11 && (pickedPieceRow - DropPieceRow) <= 2 && pickpiecefrom != placepieceat && elementType != "IMG")//Fist Move of Pawn
        ////////        {
        ////////            wpValid = true;
        ////////        }
        ////////        else if (pickedPieceRow < 11 && (pickedPieceRow - DropPieceRow) == 1 && pickpiecefrom != placepieceat && elementType != "IMG")//Second Move start of Pawn
        ////////        {
        ////////            wpValid = true;
        ////////        }
        ////////        else {
        ////////            wpValid = false;
        ////////        }

        ////////        if (wpValid == true) {
        ////////            ev.target.appendChild(document.getElementById(data));
        ////////            TurnCountwP++;
        ////////            activeplayer = "r";
        ////////            $("#msg").text("");
        ////////        }
        ////////        else {
        ////////            activeplayer = "b";
        ////////            $("#msg").text("Invalid Move");
        ////////        }
        ////////    }
        ////////    break;
        ////////case 'b':
        ////////    {
        ////////        if (pickedPieceRow == 11 && (pickedPieceRow - DropPieceRow) <= 2 && pickpiecefrom != placepieceat && elementType != "IMG")//Fist Move of Pawn
        ////////        {
        ////////            wpValid = true;
        ////////        }
        ////////        else if (pickedPieceRow < 11 && (pickedPieceRow - DropPieceRow) == 1 && pickpiecefrom != placepieceat && elementType != "IMG")//Second Move start of Pawn
        ////////        {
        ////////            wpValid = true;
        ////////        }
        ////////        else {
        ////////            wpValid = false;
        ////////        }

        ////////        if (wpValid == true) {
        ////////            ev.target.appendChild(document.getElementById(data));
        ////////            TurnCountwP++;
        ////////            activeplayer = "r";
        ////////            $("#msg").text("");
        ////////        }
        ////////        else {
        ////////            activeplayer = "b";
        ////////            $("#msg").text("Invalid Move");
        ////////        }
        ////////    }
        ////////    break;
        ////////case 'r':
        ////////    {
        ////////        if (pickedPieceRow == 11 && (pickedPieceRow - DropPieceRow) <= 2 && pickpiecefrom != placepieceat && elementType != "IMG")//Fist Move of Pawn
        ////////        {
        ////////            wpValid = true;
        ////////        }
        ////////        else if (pickedPieceRow < 11 && (pickedPieceRow - DropPieceRow) == 1 && pickpiecefrom != placepieceat && elementType != "IMG")//Second Move start of Pawn
        ////////        {
        ////////            wpValid = true;
        ////////        }
        ////////        else {
        ////////            wpValid = false;
        ////////        }

        ////////        if (wpValid == true) {
        ////////            ev.target.appendChild(document.getElementById(data));
        ////////            TurnCountwP++;
        ////////            activeplayer = "r";
        ////////            $("#msg").text("");
        ////////        }
        ////////        else {
        ////////            activeplayer = "b";
        ////////            $("#msg").text("Invalid Move");
        ////////        }
        ////////    }
        ////////    break;



        case 'N':

            break;
        case 'B':

            break;
        case 'Q':

            break;
        case 'K':

            break;
    }


}