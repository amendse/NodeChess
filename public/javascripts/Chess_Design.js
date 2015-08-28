var straightCol1 = [];
var elementonway;
var elemtexsts;
var captured = [];
var wKing = true;
var gKing = true;
var bKing = true;
var rKing = true;
var n = 0;;

var blckedblocks = ['a1', 'b1', 'a2', 'b2', 'a11', 'b11', 'a12', 'b12', 'k1', 'k2', 'k11', 'k12', 'l1', 'l2', 'l11', 'l12'];

var timerInterval;

function rstbtn()
{
  //  alert('In rst ChessDesign');
    sessionStorage.res = '';
}

 

function startBlinking() {
    if (!timerInterval)
        timerInterval = setInterval(Timer, 5000);
}

function stopBlinking() {
    if (timerInterval) {
        clearInterval(timerInterval)
        timerInterval = null
    }

    if (timerInterval1) {
        clearInterval(timerInterval1)
        timerInterval1 = null
    }
    if (timerInterval2) {
        clearInterval(timerInterval2)
        timerInterval2 = null
    }
    if (timerInterval3) {
        clearInterval(timerInterval3)
        timerInterval3 = null
    }
}

//<!-- Begin
x=1;
function Timer(wchbtn) {
    set = 1;
    
    if(x==0 && set==1) {	
        document.getElementById(wchbtn).style.color = "#CCFF00";
        x=1;
        set=0;
    }
    if(x==1 && set==1) {
        document.getElementById(wchbtn).style.color = "#993333";
        x=0;
        set=0;
    }
}
// End -->

var timerInterval;
var timerInterval1;
var timerInterval2;
var timerInterval3;




function blinker(activeplayer) {
    var result = activeplayer;

    if (result == 'w') {
        document.getElementById('btn_plyr2').style.backgroundColor = '#5e6bd1';
        document.getElementById('btn_plyr3').style.backgroundColor = '#5e6bd1';
        document.getElementById('btn_plyr4').style.backgroundColor = '#5e6bd1';
        if (timerInterval1) {
            clearInterval(timerInterval1)
            timerInterval1 = null
        }
        if (timerInterval2) {
            clearInterval(timerInterval2)
            timerInterval2 = null
        }
        if (timerInterval3) {
            clearInterval(timerInterval3)
            timerInterval3 = null
        }
        if (!timerInterval)
            timerInterval = setInterval("Timer('btn_plyr1')", 500);

    }
    else if (result == 'g') {
        document.getElementById('btn_plyr1').style.backgroundColor = '#5e6bd1';
        document.getElementById('btn_plyr3').style.backgroundColor = '#5e6bd1';
        document.getElementById('btn_plyr4').style.backgroundColor = '#5e6bd1';

        if (timerInterval) {
            clearInterval(timerInterval)
            timerInterval = null
        }
        if (timerInterval2) {
            clearInterval(timerInterval2)
            timerInterval2 = null
        }
        if (timerInterval3) {
            clearInterval(timerInterval3)
            timerInterval3 = null
        }
        if (!timerInterval1)
            timerInterval1 = setInterval("Timer('btn_plyr2')", 500);
    }
    else if (result == 'b') {
        document.getElementById('btn_plyr1').style.backgroundColor = '#5e6bd1';
        document.getElementById('btn_plyr2').style.backgroundColor = '#5e6bd1';
        document.getElementById('btn_plyr4').style.backgroundColor = '#5e6bd1';

        if (timerInterval) {
            clearInterval(timerInterval)
            timerInterval = null
        }
        if (timerInterval1) {
            clearInterval(timerInterval1)
            timerInterval1 = null
        }
        if (timerInterval3) {
            clearInterval(timerInterval3)
            timerInterval3 = null
        }

        if (!timerInterval2)
            timerInterval2 = setInterval("Timer('btn_plyr3')", 500);
    }
    else if (result == 'r') {
        document.getElementById('btn_plyr1').style.backgroundColor = '#5e6bd1';
        document.getElementById('btn_plyr2').style.backgroundColor = '#5e6bd1';
        document.getElementById('btn_plyr3').style.backgroundColor = '#5e6bd1';

        if (timerInterval) {
            clearInterval(timerInterval)
            timerInterval = null
        }
        if (timerInterval1) {
            clearInterval(timerInterval1)
            timerInterval1 = null
        }
        if (timerInterval2) {
            clearInterval(timerInterval2)
            timerInterval2 = null
        }

        if (!timerInterval3)
            timerInterval3 = setInterval("Timer('btn_plyr4')", 500);
    }


}

function myFunction(res) {

    var btn1 = document.getElementById("btn_plyr1");
    var btn2 = document.getElementById("btn_plyr2");
    var btn3 = document.getElementById("btn_plyr3");
    var btn4 = document.getElementById("btn_plyr4");
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
        $("#" + clrblk).css("background-color", "#0C0C0C");
    }

}

function btncntrler(res) {

   

    var btn1 = document.getElementById("btn_plyr1");
    var btn2 = document.getElementById("btn_plyr2");
    var btn3 = document.getElementById("btn_plyr3");
    var btn4 = document.getElementById("btn_plyr4");

    if (res == '') {
      
        sessionStorage.res = '';
        res = 'ChsBoard1';

    }

    
    if (res == 'ChsBoard1') {
        if (typeof sessionStorage.res == "undefined" || sessionStorage.res == null || sessionStorage.res == '') {
        n = 0;
            sessionStorage.res = '';
            btn1.style.display = "Block";
            btn2.style.display = 'none';
            btn3.style.display = 'none';
            btn4.style.display = 'none';
            $('#btn_plyr1').attr('disabled', false);
            $('#btn_plyr2').attr('disabled', false);
            $('#btn_plyr3').attr('disabled', false);
            $('#btn_plyr4').attr('disabled', false);

        }

        else if ((btn1.style.display == '' || btn1.style.display == 'Block') && btn2.style.display == 'none' && btn3.style.display == 'none' && btn4.style.display == 'none') {
            res = "Player1";
        }
        else if (btn1.style.display == '' && btn2.style.display == 'Block' && btn3.style.display == 'none' && btn4.style.display == 'none') {
            res = "Player2";
        }
        else if (btn1.style.display == '' && btn2.style.display == 'Block' && btn3.style.display == 'Block' && btn4.style.display == 'none') {
            res = "Player3";
        }
        else if (btn1.style.display == '' && btn2.style.display == 'Block' && btn3.style.display == 'Block' && btn4.style.display == 'Block') {
            res = "Player4";
        }
    }


  

    if (sessionStorage.res == 'Player4') {
        //alert("res :  " + res + "sessionStorage.res : " + sessionStorage.res);

        btn1.style.display = "Block";
        btn2.style.display = "Block";
        btn3.style.display = "Block";
        btn4.style.display = "Block";
        $('#btn_plyr1').prop('value', 'Player1');
        $('#btn_plyr2').prop('value', 'Player2');
        $('#btn_plyr3').prop('value', 'Player3');
        $('#btn_plyr4').prop('value', 'Player4');
        $('#btn_plyr1').attr('disabled', 'disabled');
        $('#btn_plyr2').attr('disabled', 'disabled');
        $('#btn_plyr3').attr('disabled', 'disabled');
          $('#btn_plyr4').attr('disabled', 'disabled');
    }

    if (res == "Player1" && (typeof sessionStorage.res == "undefined" || sessionStorage.res == null || sessionStorage.res == '')) {
        //value
        btn2.style.display = "Block";
        $('#btn_plyr1').prop('value', 'Player1');
       
        $('#btn_plyr1').attr('disabled', 'disabled');
        n = 1;

    }
    else if (res == "Player2" && (typeof sessionStorage.res == "undefined" || sessionStorage.res == null || sessionStorage.res == '')) {
        btn1.style.display = "Block";
        btn2.style.display = "Block";
        btn3.style.display = "Block";
        $('#btn_plyr1').prop('value', 'Player1');
        $('#btn_plyr2').prop('value', 'Player2');
        $('#btn_plyr1').attr('disabled', 'disabled');
        $('#btn_plyr2').attr('disabled', 'disabled');
        n = 1;
    }
    else if (res == "Player3" && (typeof sessionStorage.res == "undefined" || sessionStorage.res == null || sessionStorage.res == '')) {
        btn1.style.display = "Block";
        btn2.style.display = "Block";
        btn3.style.display = "Block";
        btn4.style.display = "Block";
        $('#btn_plyr1').prop('value', 'Player1');
        $('#btn_plyr2').prop('value', 'Player2');
        $('#btn_plyr3').prop('value', 'Player3');
        $('#btn_plyr1').attr('disabled', 'disabled');
        $('#btn_plyr2').attr('disabled', 'disabled');
        $('#btn_plyr3').attr('disabled', 'disabled');
       // sessionStorage.res = "Player4";
        n = 1;
     //   alert('------- res : ' + res + '------- sessionStorage.res : ' + sessionStorage.res + '------- n : ' + n);

    }//res,sessionStorage.res,n------------------------ && sessionStorage.res == "Player4"
    else if (res == "Player4" && (typeof sessionStorage.res == "undefined" || sessionStorage.res == null || sessionStorage.res == '')) {
      //   alert('In 4');
        sessionStorage.res = "Player4";
        n = 2;
        
    }

    if (n == 2) {
        
        btn1.style.display = "Block";
        btn2.style.display = "Block";
        btn3.style.display = "Block";
        btn4.style.display = "Block";
        $('#btn_plyr1').prop('value', 'Player1');
        $('#btn_plyr2').prop('value', 'Player2');
        $('#btn_plyr3').prop('value', 'Player3');
        $('#btn_plyr4').prop('value', 'Player4');
        $('#btn_plyr1').attr('disabled', 'disabled');
        $('#btn_plyr2').attr('disabled', 'disabled');
        $('#btn_plyr3').attr('disabled', 'disabled');
      //  $('#btn_plyr4').attr('disabled', 'disabled');
    }

}

function shwdeadele(stringjson1) {

    var jsonData = JSON.parse(stringjson1);
    var info1 = jsonData.pieceslst;

    var wdeadelementdiv = document.getElementById('wcaptured');
    var bdeadelementdiv = document.getElementById('bcaptured');
    var rdeadelementdiv = document.getElementById('rcaptured');
    var gdeadelementdiv = document.getElementById('gcaptured');
    var cnt = info1.length;

    wdeadelementdiv.innerHTML = '';
    bdeadelementdiv.innerHTML = '';
    rdeadelementdiv.innerHTML = '';
    gdeadelementdiv.innerHTML = '';

    for (var i = 0; i <= cnt; i++) {
        var elem3 = info1[i].imgs;

        if (elem3.substring(0, 1) == 'w') {
            wdeadelementdiv.innerHTML = wdeadelementdiv.innerHTML + '<img src="' + elem3 + '"  />';
        }
        else if (elem3.substring(0, 1) == 'G') {
            // alert('In');
            gdeadelementdiv.innerHTML = gdeadelementdiv.innerHTML + '<img src="' + elem3 + '"  />';
        }
        else if (elem3.substring(0, 1) == 'b') {
            bdeadelementdiv.innerHTML = bdeadelementdiv.innerHTML + '<img src="' + elem3 + '"  />';
        }
        else if (elem3.substring(0, 1) == 'r') {
            rdeadelementdiv.innerHTML = rdeadelementdiv.innerHTML + '<img src="' + elem3 + '"  />';
        }
    }

}

function showbrd(usr, blcklst, cmingfrm) {

   
    $('#showboard tr').remove();


    if (usr == 'ChsBoard') {

        var jsonData = JSON.parse(blcklst);
        var info = jsonData.pieces;
        //style="position:fixed;top:1%;"<input id="Submit1" type="submit" value="UNDO" style="display: block;" class="btn_plyr" onclick="undobtn();/>
        //<input id="Submit1" type="button"  value="Pass" onclick="undobtn();" class="btn_plyr" style="position:absolute;top:18.5%;"/><br />
        $('#showboard').append('<table style="position:fixed;top:1%;"><tr><td><input id="Submit1" type="button"  value="Undo" onclick="undobtn();" class="btn_plyr" style="position:absolute;top:27%;"/><br /><input id="btn_reset" type="button"  value="Reset" onclick="resetbtn();" class="btn_plyr" style="position:absolute;top:35.5%;"/><br /><span id="P1"></span><input id="btn_plyr1" type="button" value="PL-1 START" onclick="p1strt();" class="btn_plyr"  style="position:absolute;top:44%;"/> <br /><input id="btn_plyr2" type="button" value="PL-2 START" onclick="p2strt();" class="btn_plyr" style="display: none;position:absolute;top:52.5%;"/> <br /><input id="btn_plyr3" type="button" value="PL-3 START" onclick="p3strt();" class="btn_plyr" style="display: none;position:absolute;top:61%;"/><br /><span id="P4"></span> <input id="btn_plyr4" type="button" value="PL-4 START" onclick="p4strt();" class="btn_plyr" style="display: none;position:absolute;top:69.5%;"/></td><td>&nbsp;</td><td><table id="ChessBoard" style="border:1px solid #000;border-collapse: collapse;position:relative;left:16%;"></table></td><td><table><tr><td><div id="wcaptured" style="border:1px solid #000;width:70px;height:600px;overflow: auto;"></div></td><td><div id="gcaptured" style="border:1px solid #000;width:70px;height:600px;overflow: auto;"></div></td><td><div id="bcaptured" style="border:1px solid #000;width:70px;height:600px;overflow: auto;"></div></td><td><div id="rcaptured" style="border:1px solid #000;width:70px;height:600px;overflow: auto;"></div></td></tr></table></td><td> <div id="chatDiv"></div></td></tr></table>');


        $('#chatDiv').append('<input id="m" autocomplete="off" /> <input type="submit" name="Send" value="Send" onclick="chatMsg()" /> <ul id="messages"></ul>');


        var table = document.getElementById('ChessBoard');
        var cnt = info.length;
        var rowcreate = "";
        var cnt1 = cnt;
        var i = 0;

        while (i < cnt1) {
            rowcreate = rowcreate + "<tr>";
            for (var j = 0; j < 12; j++) {
                var elem1 = info[i].colid;
                rowcreate = rowcreate + "<td id=" + elem1 + " class='ChessBlocks' ondrop='drop(event)' ondragover='allowDrop(event)'></td>";
                i++;
            }
            rowcreate = rowcreate + "</tr>";
        }
        table.innerHTML = rowcreate;
        myFunction('bnkbrd');
    }


    else {
        //style="position:fixed;top:1%;"
        //$('#showboard').append('<table style="position:fixed;top:1%;"><tr><td><input id="Submit1" type="button"  value="Undo" onclick="undobtn();" class="btn_plyr" /><br /><br /><input id="btn_reset" type="button"  value="Reset" onclick="resetbtn();" class="btn_plyr" /><br /><br /><span id="P1"></span><input id="btn_plyr1" type="button" value="PL-1 START" onclick="p1strt();" class="btn_plyr"  /> <br /><input id="btn_plyr2" type="button" value="PL-2 START" onclick="p2strt();" class="btn_plyr" style="display: none"/> <br /><span id="P3"></span><input id="btn_plyr3" type="button" value="PL-3 START" onclick="p3strt();" class="btn_plyr" style="display: none"/><br /><span id="P4"></span> <input id="btn_plyr4" type="button" value="PL-4 START" onclick="p4strt();" class="btn_plyr" style="display: none"/></td><td><table id="ChessBoard" style="border:1px solid #000;border-collapse: collapse;"></table></td><td></td></tr></table>');

        // alert(cmingfrm);
        //if (sessionStorage.res == 'Player4') {
        //    alert('In shwbrd session storage');
        //    btn1.style.display = "Block";
        //    btn2.style.display = "Block";
        //    btn3.style.display = "Block";
        //    btn4.style.display = "Block";
        //    $('#btn_plyr1').prop('value', 'Player1');
        //    $('#btn_plyr2').prop('value', 'Player2');
        //    $('#btn_plyr3').prop('value', 'Player3');
        //    $('#btn_plyr4').prop('value', 'Player4');
        //    $('#btn_plyr1').attr('disabled', 'disabled');
        //    $('#btn_plyr2').attr('disabled', 'disabled');
        //    $('#btn_plyr3').attr('disabled', 'disabled');
        //    $('#btn_plyr4').attr('disabled', 'disabled');
        //}
        //<input id="Submit1" type="button"  value="Pass" onclick="undobtn();" class="btn_plyr" style="position:absolute;top:18.5%;"/><br />
        $('#showboard').append('<table style="position:fixed;top:1%;"><tr><td><input id="Submit1" type="button"  value="Undo" onclick="undobtn();" class="btn_plyr" style="position:absolute;top:27%;"/><br /><input id="btn_reset" type="button"  value="Reset" onclick="resetbtn();" class="btn_plyr" style="position:absolute;top:35.5%;"/><br /><span id="P1"></span><input id="btn_plyr1" type="button" value="PL-1 START" onclick="p1strt();" class="btn_plyr"  style="position:absolute;top:44%;"/> <br /><span id="P2"></span><input id="btn_plyr2" type="button" value="PL-2 START" onclick="p2strt();" class="btn_plyr" style="display: none;position:absolute;top:52.5%;"/> <br /><span id="P3"></span><input id="btn_plyr3" type="button" value="PL-3 START" onclick="p3strt();" class="btn_plyr" style="display: none;position:absolute;top:61%;"/><br /><span id="P4"></span> <input id="btn_plyr4" type="button" value="PL-4 START" onclick="p4strt();" class="btn_plyr" style="display: none;position:absolute;top:69.5%;"/></td><td>&nbsp;</td><td><table id="ChessBoard" style="border:1px solid #000;border-collapse: collapse;position:relative;left:16%;"></table></td><td></td></tr></table>');

        if (cmingfrm == 'updateboard') {
            showele(blcklst, usr);
            myFunction(usr);

            btncntrler(usr);
                      
        }
        else if (cmingfrm == 'updateboard1') {
            showele(blcklst, usr);
            myFunction(usr);
          //  alert('updateboard1  ' + sessionStorage.thisscreenuser+ '                ' + usr);
            btncntrler(usr);
            if (sessionStorage.thisscreenuser == '' || typeof sessionStorage.thisscreenuser == "undefined" || sessionStorage.thisscreenuser == null) {
                 btncntrler(usr);
            }
            else {
                 btncntrler('Player4');
            }

        //if (sessionStorage.res == 'Player4') {
        //    alert('In shwbrd session storage');
        //    btn1.style.display = "Block";
        //    btn2.style.display = "Block";
        //    btn3.style.display = "Block";
        //    btn4.style.display = "Block";
        //    $('#btn_plyr1').prop('value', 'Player1');
        //    $('#btn_plyr2').prop('value', 'Player2');
        //    $('#btn_plyr3').prop('value', 'Player3');
        //    $('#btn_plyr4').prop('value', 'Player4');
        //    $('#btn_plyr1').attr('disabled', 'disabled');
        //    $('#btn_plyr2').attr('disabled', 'disabled');
        //    $('#btn_plyr3').attr('disabled', 'disabled');
        //    $('#btn_plyr4').attr('disabled', 'disabled');
        //}
            
        }

    }


}


function showele(elemlst, usr) {

    var jsonData = JSON.parse(elemlst);
    var info = jsonData.pieces;

    // <table><tr><td><div id="wcaptured" style="border:1px solid #000;width:55px;height:600px;overflow: auto;"></div></td><td><div id="gcaptured" style="border:1px solid #000;width:55px;height:600px;overflow: auto;"></div></td><td><div id="bcaptured" style="border:1px solid #000;width:55px;height:600px;overflow: auto;"></div></td><td><div id="rcaptured" style="border:1px solid #000;width:50px;height:600px;overflow: auto;"></div></td></tr></table>
   // <td><div id="container" style="border: 2px solid rgb(105, 120, 120);background-color:#fff; margin: -2px; width: 301px;height: 400px;position:absolute;left:95%;top:37.13%"><div id="hdr" style="background-color:#696569"><table><tr><td><span style="font-size:larger;position:relative;left:4%;color:#fff;">Chat Here</span></td><td><div style="position:relative;right:-128%"><img src="Minimize_png.png" class="chtwin" height="32" width="32" id="mini"/><img src="Maximize_png.png" class="chtwin" height="32" width="32" id="maxi"/><img src="Close_png.png" class="chtwin" height="32" width="32" /></div></td></tr></table></div><div id="msgslst" style="height:69%;overflow:auto;"><ul id="messages"></ul></div><div id="msgdv" style="margin-bottom:-6px;"><input type="text" id="m" placeholder="Enter You message" class="textox"><input type="submit" name="Send" value="Send" class="css_button" onclick="chatMsg()" /></div></td>
  // $('#showboard').append('<table><tr><td><input id="btn_reset" type="button"  value="Reset" onclick="resetbtn();" class="btn_plyr" /><br /><br /><span id="P1"></span><input id="btn_plyr1" type="button" value="PL-1 START" onclick="p1strt();" class="btn_plyr"  /><br /><br /><span id="P2"></span><input id="btn_plyr2" type="button" value="PL-2 START" onclick="p2strt();" class="btn_plyr" style="display: none"/> <br /><br /><span id="P3"></span><input id="btn_plyr3" type="button" value="PL-3 START" onclick="p3strt();" class="btn_plyr" style="display: none"/> <br /><br /><span id="P4"></span> <input id="btn_plyr4" type="button" value="PL-4 START" onclick="p4strt();" class="btn_plyr" style="display: none"/></td><td><table id="ChessBoard" style="border:1px solid #000;border-collapse: collapse;"></table></td><td><table><tr><td><div id="wcaptured" style="border:1px solid #000;width:70px;height:600px;overflow: auto;"></div></td><td><div id="gcaptured" style="border:1px solid #000;width:70px;height:600px;overflow: auto;"></div></td><td><div id="bcaptured" style="border:1px solid #000;width:70px;height:600px;overflow: auto;"></div></td><td><div id="rcaptured" style="border:1px solid #000;width:70px;height:600px;overflow: auto;"></div></td></tr></table></td><td><div id="container" style="border: 2px solid rgb(105, 120, 120);background-color:#fff; margin: -2px; width: 301px;height: 400px;position:absolute;left:95%;top:37.13%"><div id="hdr" style="background-color:#696569"><table><tr><td><span style="font-size:larger;position:relative;left:4%;color:#fff;">Chat Here</span></td><td><div style="position:relative;right:-128%"><img src="Minimize_png.png" class="chtwin" height="32" width="32" id="mini"/><img src="Maximize_png.png" class="chtwin" height="32" width="32" id="maxi"/><img src="Close_png.png" class="chtwin" height="32" width="32" /></div></td></tr></table></div><div id="msgslst" style="height:69%;overflow:auto;"><ul id="messages"></ul></div><div id="msgdv" style="margin-bottom:-6px;"><input type="text" id="m" placeholder="Enter You message" class="textox"><input type="submit" name="Send" value="Send" class="css_button" onclick="chatMsg()" /></div></td></tr></table>');

  //  $('#showboard').append('<table><tr><td><input id="btn_reset" type="button"  value="Reset" onclick="resetbtn();" class="btn_plyr" /><br /><br /><span id="P1"></span><input id="btn_plyr1" type="button" value="PL-1 START" onclick="p1strt();" class="btn_plyr"  /><br /><br /><span id="P2"></span><input id="btn_plyr2" type="button" value="PL-2 START" onclick="p2strt();" class="btn_plyr" style="display: none"/> <br /><br /><span id="P3"></span><input id="btn_plyr3" type="button" value="PL-3 START" onclick="p3strt();" class="btn_plyr" style="display: none"/> <br /><br /><span id="P4"></span> <input id="btn_plyr4" type="button" value="PL-4 START" onclick="p4strt();" class="btn_plyr" style="display: none"/></td><td><table id="ChessBoard" style="border:1px solid #000;border-collapse: collapse;"></table></td><td></td></tr></table>');
    var table = document.getElementById('ChessBoard');
    var cnt = info.length;
    var rowcreate = "";
    var cnt1 = cnt;
    var i = 0;

    while (i < cnt1) {
        rowcreate = rowcreate + "<tr>";
        for (var j = 0; j < 12; j++) {
            var elem1 = info[i].colid;
            rowcreate = rowcreate + "<td id=" + elem1 + " class='ChessBlocks' ondrop='drop(event)' ondragover='allowDrop(event)'></td>";
            i++;
        }
        rowcreate = rowcreate + "</tr>";
    }

    table.innerHTML = rowcreate;
    var stringjson = JSON.stringify(jsonData);
    var info = jsonData.pieces;
    var table = document.getElementById("ChessBoard");
    var cells = table.getElementsByTagName('td');
    var cnt = info.length;
    var i = 0;

    while (i < cnt) {
        for (var j = 0; j < 12; j++) {
            var elem1 = info[i].colid;
            var elem2 = info[i].imgids;
            var elem3 = info[i].imgs;

            if (elem2 == '') {

            }
            else {
                cells[elem1].innerHTML = '<img id="' + elem2 + '" src="' + elem3 + '" class="imgClass" />';
            }
            i++;
        }
    }

    
}





