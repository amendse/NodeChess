var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public/javascripts'));
app.use(express.static(__dirname + '/public/images'));
app.use(express.static(__dirname + '/public/stylesheets'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms = ['room1', 'room2', 'room3'];

var colarray = {
    pieces: []
};


var undowhitecolarray = {
    pieces: []
};
var undogreencolarray = {
    pieces: []
};
var undoblackcolarray = {
    pieces: []
};
var undoredcolarray = {
    pieces: []
};


var delpcsarray = {
    pieceslst: []
};

var plyr = '';
var pcdel = 0;
var klldelement = '';
var usrnm = '';
var tdid = '';
var gamstarted = 0;
var plr = 'w';
var times = 1;
var chkto = '';
var plyrsavailable = '';
var dangerzonevalidMoves = [];
var straightCol = [], straightColBack = [], rightHorizontalCol = [], lefttHorizontalCol = [], msgval = '';
var rightDiagonalCol = [], leftDiagonalCol = [], leftDiagonalColDown = [], rightDiagonalColDown = [];
var gpawnsvalidmoves = [];
var kingMoves = [], wpawnsvalidmoves = [], rpawnsvalidmoves = [], gpawnvldmoves = [], bpawnsvalidmoves = [], wrookvalidmoves = [], bishopvalidmoves = [], queenvldmoves = [], knghvldmoves = [], kngvldmoves = [];
var clr = '';
var msg = '', p = '';

var chatarray = {
    chatlst: []
};
var captured = [];
var wKing = 1;
var gKing = 1;
var bKing = 1;

var rKing = 1;
var inBetImg = false;

io.on('connection', function (socket) {
   
    socket.on('chat message', function (msg, p) {
       
        chatarray.chatlst.push({
            "msg": msg,
            "p": p,
            "imgs": ''
        });

        var chatstringjson = JSON.stringify(chatarray);
        //chatarray.chatlst
        io.emit('chat message', chatstringjson);
    });

    socket.on('adduser', function (username) {
        
        socket.username = username;
        socket.room = 'room1';
        usernames[username] = username;
        
        socket.join('room1');
        times = times + 1;
    //    console.log("times : " + times + "plyrsavailable : " + plyrsavailable);
        if (times > 2) {

            //console.log('times>2');
            //if (plyrsavailable == 'all') {
            //    console.log('plyrsavailable : ' + plyrsavailable);
            // //   io.sockets.emit('updatesession', usrnm);
            //    plyrsavailable = 'all1';
            //}
       
            var stringjson = JSON.stringify(colarray);
            var stts = "true";
           // io.sockets.emit('updateboard1', usrnm, stringjson, gamstarted, plyr, stts);

            io.sockets.emit('updateboard', usrnm, stringjson, gamstarted, plyr, stts);
        }
        else {
         //   console.log("Else " + times);

            io.sockets.emit('updatesession', usrnm);
            var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
            var cnt = 12;
            for (var i = 0; i < 12; i++) {
                for (var j = 0; j < 12; j++) {
                    colarray.pieces.push({
                        "colid": col[j] + cnt,
                        "imgids": '',
                        "imgs": ''
                    });

                    undowhitecolarray.pieces.push({
                        "colid": col[j] + cnt,
                        "imgids": '',
                        "imgs": ''
                    });

                    undogreencolarray.pieces.push({
                        "colid": col[j] + cnt,
                        "imgids": '',
                        "imgs": ''
                    });

                    undoblackcolarray.pieces.push({
                        "colid": col[j] + cnt,
                        "imgids": '',
                        "imgs": ''
                    });

                    undoredcolarray.pieces.push({
                        "colid": col[j] + cnt,
                        "imgids": '',
                        "imgs": ''
                    });

                }
                cnt--;
            }


            plyr = 'w';
            usrnm = '';

            var stringjson = JSON.stringify(colarray);
            io.sockets.emit('updateboard', usrnm, stringjson, gamstarted, plyr);
        }

      
      
        return false;
    });

    socket.on('rst', function (username) {
        usrnm = '';
        tdid = '';
        gamstarted = 0;
        plr = 'w';
       // times = 1;
         straightCol = [], straightColBack = [], rightHorizontalCol = [], lefttHorizontalCol = [], msgval = '';
         rightDiagonalCol = [], leftDiagonalCol = [], leftDiagonalColDown = [], rightDiagonalColDown = [];
         gpawnsvalidmoves = [];
         kingMoves = [], wpawnsvalidmoves = [],  rpawnsvalidmoves = [], gpawnvldmoves = [], bpawnsvalidmoves = [], wrookvalidmoves = [], bishopvalidmoves = [], queenvldmoves = [], knghvldmoves = [], kngvldmoves = [];
         clr = '';
         var msg = '', p = '';

  //       console.log('Reset button clicked....');

         plyrsavailable = '';



        ////usrnm = '';
        ////gamstarted = 0;
        ////plr = 'w';
        ////straightCol = [], straightColBack = [], rightHorizontalCol = [], lefttHorizontalCol = [], msgval = '';
        ////rightDiagonalCol = [], leftDiagonalCol = [], leftDiagonalColDown = [], rightDiagonalColDown = [];
        ////kingMoves = [], wpawnsvalidmoves = [], rpawnsvalidmoves = [], gpawnvldmoves = [], bpawnsvalidmoves = [], wrookvalidmoves = [], bishopvalidmoves = [], queenvldmoves = [], knghvldmoves = [], kngvldmoves = [];
        ////clr = '';
        wKing = 1;
        gKing = 1;
        bKing = 1;
        rKing = 1;
        inBetImg = false;
        tdid = '';
    
        for (var j = 0; j < colarray.pieces.length; j++) {
            colarray.pieces[j].imgids = '';
            colarray.pieces[j].imgs = '';
                
        }

        var a = 0, b = 0, c = 0, d = 0;
        a = undowhitecolarray.pieces.length;
        b = undogreencolarray.pieces.length;
        c = undoblackcolarray.pieces.length;
        d = undoredcolarray.pieces.length;

        for (var k = 0; k < undowhitecolarray.pieces.length; k++) {
            undowhitecolarray.pieces[k].colid = '';
            undowhitecolarray.pieces[k].imgids = '';
            undowhitecolarray.pieces[k].imgs = '';
        }

        for (var k = 0; k < b; k++) {
            undogreencolarray.pieces[k].colid = '';
            undogreencolarray.pieces[k].imgids = '';
            undogreencolarray.pieces[k].imgs = '';
        }

        for (var k = 0; k < c; k++) {
            undoblackcolarray.pieces[k].colid = '';
            undoblackcolarray.pieces[k].imgids = '';
            undoblackcolarray.pieces[k].imgs = '';
        }

        for (var k = 0; k < d; k++) {
            undoredcolarray.pieces[k].colid = '';
            undoredcolarray.pieces[k].imgids = '';
            undoredcolarray.pieces[k].imgs = '';
        }


        //for (var j = 0; j < delpcsarray.pieceslst.length; j++) {
        //    delpcsarray.pieceslst[j].imgids = '';
        //    delpcsarray.pieceslst[j].imgs = '';
        //}


        var stringjson = JSON.stringify(colarray);

      //  var removeelemjson = JSON.stringify(delpcsarray);
        
        plyr = 'w';
        //username, stringjson, gamstarted, plyr, stts
        io.sockets.emit('updateboard', usrnm, stringjson, gamstarted, plyr);

    });

    socket.on('Player1Shw', function (username) {

        plyrsavailable = 'all';
        usrnm = 'Player1';
       
        socket.username = 'Player1';
        socket.room = 'room1';
        usernames[username] = username;
        socket.join('room1');
      

        console.log(username + " logged in...");

        var col = ["a", "b" , "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
        var cnt = 12;

        var colids = ["c2", "d2", "e2", "f2", "g2", "h2", "i2", "j2", "c1", "j1", "d1", "i1", "e1", "h1", "f1", "g1"];
        var imgids = ["wP1", "wP2", "wP3", "wP4", "wP5", "wP6", "wP7", "wP8", "wR1", "wR2", "wN1", "wN2", "wB1", "wB2", "wQ", "wK"];
        var imgs = ["wP.png", "wR.png", "wN.png", "wB.png", "wQ.png", "wK.png"];

        var cnt1 = 144;
        var i = 0;
        var j = 0;

        for (var i = 0; i < colids.length; i++) {
            for (var j = 0; j < colarray.pieces.length; j++) {
                if (colarray.pieces[j].colid == colids[i]) {
                    colarray.pieces[j].imgids = imgids[i];

                    if (j >= 122 && j < 134) {
                        colarray.pieces[j].imgs = imgs[0];
                    }
                    else if (j == 134 || j == 141) {
                        colarray.pieces[j].imgs = imgs[1];
                    }
                    else if (j == 135 || j == 140) {
                        colarray.pieces[j].imgs = imgs[2];
                    }
                    else if (j == 136 || j == 139) {
                        colarray.pieces[j].imgs = imgs[3];
                    }
                    else if (j == 137) {
                        colarray.pieces[j].imgs = imgs[4];
                    }
                    else if (j == 138) {
                        colarray.pieces[j].imgs = imgs[5];
                    }

                    break;
                }
                else {

                }


            }
        }
        
        var stringjson = JSON.stringify(colarray);
        gamstarted = 0;
    //    var plyr = 'w';
        io.sockets.emit('updateboard', usrnm, stringjson, gamstarted, plyr);
        //var stringjson1 = JSON.stringify(delpcsarray);
        //console.log(stringjson1 + " - - - - - - -  " + klldelement);
        //io.sockets.emit('updatedeadelem', stringjson1, klldelement);

    });

    socket.on('Player2Shw', function (username) {
        plyrsavailable = 'all';
        usrnm = 'Player2';
      
        socket.username = 'Player2';
        socket.room = 'room1';
        usernames[username] = username;
        socket.join('room1');
        socket.emit('updatechat', 'SERVER', 'you have connected to room1');
        socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
        socket.emit('updatechessrooms', rooms, 'room1');

        console.log(username + " logged in...");

        var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
        var cnt = 12;

        var colids = ["b3", "b4", "b5", "b6", "b7", "b8", "b9", "b10", "a3", "a10", "a4", "a9", "a5", "a8", "a6", "a7"];
        var imgids = ["gP1", "gP2", "gP3", "gP4", "gP5", "gP6", "gP7", "gP8", "gR1", "gR2", "gN1", "gN2", "gB1", "gB2","gK", "gQ"];
        var imgs = ["GPawn.png", "GRook.png", "GKnight.png", "GBishop.png", "GQueen.png", "GKing.png"];

        for (var i = 0; i < colids.length; i++) {
            for (var j = 0; j < colarray.pieces.length; j++) {
                if (colarray.pieces[j].colid == colids[i]) {
                    //   console.log(j + " - " + colarray.pieces[j].colid);

                    colarray.pieces[j].imgids = imgids[i];

                    if (j == 25 || j == 37 || j == 49 || j == 61 || j == 73 || j == 85 || j == 97 || j == 109) {
                        colarray.pieces[j].imgs = imgs[0];
                    }
                    else if (j == 108 || j == 24) {
                        colarray.pieces[j].imgs = imgs[1];
                    }
                    else if (j == 96 || j == 36) {
                        colarray.pieces[j].imgs = imgs[2];
                    }
                    else if (j == 84 || j == 48) {
                        colarray.pieces[j].imgs = imgs[3];
                    }
                    else if (j == 60) {//60
                        colarray.pieces[j].imgs = imgs[4];
                    }
                    else if (j == 72) {//72
                        colarray.pieces[j].imgs = imgs[5];
                    }

                    break;
                }
                else {

                }

            }

        }

        var stringjson = JSON.stringify(colarray);


        gamstarted = 0;
      //  var plyr = 'w';
        
        io.sockets.emit('updateboard', usrnm, stringjson, gamstarted, plyr);
     
    });

    socket.on('Player3Shw', function (username) {
        plyrsavailable = 'all';
        usrnm = 'Player3';
     
        socket.username = 'Player3';
        socket.room = 'room1';
        usernames[username] = username;
        socket.join('room1');

        console.log(username + " logged in...");

        var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
        var cnt = 12;

        var colids = ["c11", "d11", "e11", "f11", "g11", "h11", "i11", "j11", "c12", "j12", "d12", "i12", "e12", "h12", "f12", "g12"];
        var imgids = ["bP1", "bP2", "bP3", "bP4", "bP5", "bP6", "bP7", "bP8", "bR1", "bR2", "bN1", "bN2", "bB1", "bB2", "bK", "bQ"];
        var imgs = ["bP.png", "bR.png", "bN.png", "bB.png", "bQ.png", "bK.png"];

        for (var i = 0; i < colids.length; i++) {
            for (var j = 0; j < colarray.pieces.length; j++) {
                if (colarray.pieces[j].colid == colids[i]) {
                    //    console.log(j + " - " + colarray.pieces[j].colid);

                    colarray.pieces[j].imgids = imgids[i];

                    if (j >= 14 && j <= 21) {
                        colarray.pieces[j].imgs = imgs[0];
                    }
                    else if (j == 2 || j == 9) {
                        colarray.pieces[j].imgs = imgs[1];
                    }
                    else if (j == 3 || j == 8) {
                        colarray.pieces[j].imgs = imgs[2];
                    }
                    else if (j == 4 || j == 7) {
                        colarray.pieces[j].imgs = imgs[3];
                    }
                    else if (j == 6) {
                        colarray.pieces[j].imgs = imgs[4];
                    }
                    else if (j == 5) {
                        colarray.pieces[j].imgs = imgs[5];
                    }

                    break;
                }
                else {

                }


            }

        }

        var stringjson = JSON.stringify(colarray);
        gamstarted = 0;
      //  var plyr = 'w';

        io.sockets.emit('updateboard', usrnm, stringjson, gamstarted, plyr);
        //io.sockets.in(socket.room).emit('updateboard', socket.username, stringjson, gamstarted, plyr);
    });

    socket.on('Player4Shw', function (username) {
      
        plyrsavailable = 'all';
        usrnm = 'Player4';
        socket.username = 'Player4';
        socket.room = 'room1';
        usernames[username] = username;
        socket.join('room1');
      
        console.log(username + " logged in...");

        var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
        var cnt = 12;
        
        var colids = ["k3", "k4", "k5", "k6", "k7", "k8", "k9", "k10", "l3", "l10", "l4", "l9", "l5", "l8", "l7", "l6"];
        var imgids = ["rP1", "rP2", "rP3", "rP4", "rP5", "rP6", "rP7", "rP8", "rR1", "rR2", "rN1", "rN2", "rB1", "rB2", "rK", "rQ"];
        var imgs = ["rPawn.png", "rRook.png", "rKnight.png", "rBishop.png", "rQueen.png", "rKing.png"];

        for (var i = 0; i < colids.length; i++) {
            for (var j = 0; j < colarray.pieces.length; j++) {
                if (colarray.pieces[j].colid == colids[i]) {

                    colarray.pieces[j].imgids = imgids[i];

                    if (j == 34 || j == 46 || j == 58 || j == 70 || j == 82 || j == 94 || j == 106 || j == 118) {
                        colarray.pieces[j].imgs = imgs[0];
                    }
                    else if (j == 35 || j == 119) {
                        colarray.pieces[j].imgs = imgs[1];
                    }
                    else if (j == 47 || j == 107) {
                        colarray.pieces[j].imgs = imgs[2];
                    }
                    else if (j == 95 || j == 59) {
                        colarray.pieces[j].imgs = imgs[3];
                    }
                    else if (j ==83 ) {//71
                        colarray.pieces[j].imgs = imgs[4];
                    }
                    else if (j == 71) {//83
                        colarray.pieces[j].imgs = imgs[5];
                    }

                    break;
                }
                else {

                }

            }

        }


        var stringjson = JSON.stringify(colarray);
        gamstarted = 1;
    //    var plyr = 'w';

        io.sockets.emit('updateboard', usrnm, stringjson, gamstarted, plyr);
    });
    
    //---------------------------------------------------------FUNCTIONS START-------------------------------------------------------------------------

    var clr = '';
    function whchcolor(cl) {

        if (cl == "w") {
            clr = "White";
        }
        else if (cl == "g") {
            clr = "Green";
        }
        else if (cl == "b") {
            clr = "Black";
        }
        else if (cl == "r") {
            clr = "Red";
        }
    }

    ////////function wpawnvldmoves(c, r, whichPlayer) {
    ////////  //  console.log("c : "+c+"r : "+ r+"whcplr : "+ whichPlayer);
    //////// //   console.log("In wvalidate");
    ////////    var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
    ////////    var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    ////////    var blckedblocks1 = ['a1', 'b1', 'a2', 'b2', 'a11', 'b11', 'a12', 'b12', 'k1', 'k2', 'k11', 'k12', 'l1', 'l2', 'l11', 'l12'];
    ////////    var stringjson = JSON.stringify(colarray);
    ////////    var pieceslists = JSON.parse(stringjson);
    ////////    var whichplayer = whichPlayer;
    ////////    var pickedPieceRow = r;
    ////////    var pickColIndex = col.indexOf(String(c));
    ////////    wpawnsvalidmoves = [];
    ////////    var i1 = 0;
    ////////    var img_id = '';
    ////////    if (pickedPieceRow == 2) {
    ////////        var rz = parseInt(pickedPieceRow);
    ////////        var r = parseInt(pickedPieceRow) + 1;
    ////////        var r1 = parseInt(pickedPieceRow) + 2;
    ////////        var rws = [];
    ////////        rws.push(r); rws.push(r1);
    ////////        var c = parseInt(pickColIndex);          
    ////////        var c1 = col[c];
    ////////        var cz = c1 + rz;
    ////////        var co1 = c1 + r1;
    ////////        var co2 = c1 + r; 
    ////////        var colschk = [];
    ////////        colschk.push(co2); colschk.push(co1);

    ////////        console.log("cz : " + cz);

    ////////        if (cz == 'c2' || cz == 'j2') {

    ////////            var r = parseInt(pickedPieceRow) + 1;
    ////////            var r1 = parseInt(pickedPieceRow) + 2;
    ////////            var c = parseInt(pickColIndex);
    ////////            var c1 = col[c];
    ////////            var c2 = parseInt(pickColIndex) + 1;
    ////////            var c21 = col[c2];
    ////////            //var c3 = parseInt(pickColIndex) - 1;
    ////////            //var c31 = col[c3];
    ////////            var cols1 = [];
    ////////            cols1.push(c); cols1.push(c2); 
    ////////            var colschk = [];
    ////////            colschk.push(c1); colschk.push(c21); 
    ////////            var co1 = c1 + r;
    ////////            var co2 = c21 + r;
    ////////          //  var co3 = c31 + r;
    ////////            //var co4 = c1 + r1;
    ////////            //var chkcols = [];
    ////////            //chkcols.push(co1); chkcols.push(co2); chkcols.push(co3);  

    ////////            for (var i = 0; i <= colschk.length; i++) {
    ////////                img_id = '';
    ////////                if (rows.indexOf(String(r)) != -1 && col.indexOf(String(colschk[i])) != -1 && blckedblocks1.indexOf(colschk[i]) == -1) {
    ////////                    f1:
    ////////                        for (var j = 0; j < pieceslists.pieces.length; j++) {
    ////////                            if (pieceslists.pieces[j].colid == colschk[i]) {
    ////////                                img_id = pieceslists.pieces[j].imgids;
    ////////                                break f1;
    ////////                            }
    ////////                        }
    ////////                    if (img_id.substring(0, 1) != whichplayer) {
    ////////                        if (img_id == '') {

    ////////                            if (parseInt(pickColIndex) == (cols1[i])) {
    ////////                                wpawnsvalidmoves.push(colschk[i]);
    ////////                            }
    ////////                        }
    ////////                        else if (img_id != '' && colschk[i] != co1) {
    ////////                            wpawnsvalidmoves.push(colschk[i]);
    ////////                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
    ////////                                whchcolor(img_id.substring(0, 1));
    ////////                                chkto = 'Check To  : ' + clr + " King at " + colschk[i];
    ////////                            }
    ////////                        }
    ////////                    }

    ////////                }
    ////////            }

    ////////        }
    ////////        else {                 
    ////////                var r = parseInt(pickedPieceRow) + 1;
    ////////                var r1 = parseInt(pickedPieceRow) + 2;
    ////////                var c = parseInt(pickColIndex);
    ////////                var c1 = col[c];
    ////////                var c2 = parseInt(pickColIndex) + 1;
    ////////                var c21 = col[c2];
    ////////                var c3 = parseInt(pickColIndex) - 1;
    ////////                var c31 = col[c3];
    ////////                var cols1 = [];
    ////////                cols1.push(c); cols1.push(c2); cols1.push(c3);
    ////////                var colschk = [];
    ////////                colschk.push(c1); colschk.push(c21); colschk.push(c31);
    ////////                var co1 = c1 + r;
    ////////                var co2 = c21 + r;
    ////////                var co3 = c31 + r;
    ////////                var co4 = c1 + r1;
    ////////                var chkcols = [];
    ////////                chkcols.push(co1); chkcols.push(co2); chkcols.push(co3); chkcols.push(co4);

    ////////                for (var i = 0; i <= chkcols.length; i++) {
    ////////                    img_id = '';
    ////////                    if (rows.indexOf(String(r)) != -1  && col.indexOf(String(colschk[i])) != -1 && blckedblocks1.indexOf(chkcols[i]) == -1) {
    ////////                        f1:
    ////////                            for (var j = 0; j < pieceslists.pieces.length; j++) {
    ////////                                if (pieceslists.pieces[j].colid == chkcols[i]) {
    ////////                                    img_id = pieceslists.pieces[j].imgids;
    ////////                                    break f1;
    ////////                                }
    ////////                            }
    ////////                        if (img_id.substring(0, 1) != whichplayer) {
    ////////                            if (img_id == '') {

    ////////                                if (parseInt(pickColIndex) == (cols1[i])) {
    ////////                                    wpawnsvalidmoves.push(chkcols[i]);
    ////////                                }
    ////////                            }
    ////////                            else if (img_id != '' && chkcols[i] != co1) {
    ////////                                wpawnsvalidmoves.push(chkcols[i]);
    ////////                                if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
    ////////                                    whchcolor(img_id.substring(0, 1));
    ////////                                     chkto = 'Check To  : ' + clr + " King at " + chkcols[i];
    ////////                                }
    ////////                           }
    ////////                        }

    ////////                    }
                     

                   

    ////////            }

    ////////                wpawnsvalidmoves.push(chkcols[3]);

    ////////        }
             
    ////////    }
    ////////    else if (pickedPieceRow > 2) {
    ////////        var r = parseInt(pickedPieceRow) + 1;
    ////////        //var r1 = parseInt(pickedPieceRow) + 2;
    ////////        var c = parseInt(pickColIndex);
    ////////        var c1 = col[c];
    ////////        var c2 = parseInt(pickColIndex) + 1;
    ////////        var c21 = col[c2];
    ////////        var c3 = parseInt(pickColIndex) - 1;
    ////////        var c31 = col[c3];
    ////////        var cols1 = [];
    ////////        cols1.push(c); cols1.push(c2); cols1.push(c3);
    ////////        var colschk = [];
    ////////        colschk.push(c1); colschk.push(c21); colschk.push(c31);
    ////////        var co1 = c1 + r;
    ////////        var co2 = c21 + r;
    ////////        var co3 = c31 + r; 
    ////////        var chkcols = [];
    ////////        chkcols.push(co1); chkcols.push(co2); chkcols.push(co3);
    ////////         for (var i = 0; i <= chkcols.length; i++) {
    ////////            img_id = '';
    ////////            if (rows.indexOf(String(r)) != -1 && col.indexOf(String(colschk[i])) != -1 && blckedblocks1.indexOf(chkcols[i]) == -1) {
    ////////                f1:
    ////////                    for (var j = 0; j < pieceslists.pieces.length; j++) {
    ////////                        if (pieceslists.pieces[j].colid == chkcols[i]) {
    ////////                            img_id = pieceslists.pieces[j].imgids;                              
    ////////                            break f1;                             
    ////////                        }
    ////////                    }
    ////////                if (img_id.substring(0, 1) != whichplayer) {
    ////////                     if (img_id == '') {
 
    ////////                        if (parseInt(pickColIndex) == (cols1[i])) {
    ////////                            wpawnsvalidmoves.push(chkcols[i]);
    ////////                        }
    ////////                    }
    ////////                    else if (img_id != '' && chkcols[i] != co1) {
    ////////                         wpawnsvalidmoves.push(chkcols[i]);
    ////////                        if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
    ////////                            whchcolor(img_id.substring(0, 1));
    ////////                           // console.log('Check To  : ' + clr + " King at " + chkcols[i]);
    ////////                            chkto = 'Check To  : ' + clr + " King at " + chkcols[i];
    ////////                        }
    ////////                    //    console.log('You can Kill : ' + img_id + " at " + chkcols[i]);
    ////////                    }
    ////////                }

    ////////            }
    ////////        }
      
    ////////    }

    ////////}

    function wpawnvldmoves(c, r, whichPlayer) {
        var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
        var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        var blckedblocks1 = ['a1', 'b1', 'a2', 'b2', 'a11', 'b11', 'a12', 'b12', 'k1', 'k2', 'k11', 'k12', 'l1', 'l2', 'l11', 'l12'];
        var stringjson = JSON.stringify(colarray);
        var pieceslists = JSON.parse(stringjson);
        var whichplayer = whichPlayer;
        var pickedPieceRow = r;
        var pickColIndex = col.indexOf(String(c));
        wpawnsvalidmoves = [];
        var i1 = 0;
        var img_id = '';
        if (pickedPieceRow == 2) {
            var r = parseInt(pickedPieceRow) + 1;
            var r1 = parseInt(pickedPieceRow) + 2;
            var rz = parseInt(pickedPieceRow);
            var rws = [];
            rws.push(r); rws.push(r1);
            var c = parseInt(pickColIndex);
            var c1 = col[c];
            var co1 = c1 + r1;
            var co2 = c1 + r;
            var cz = c1 + rz;
            var chkcols = [];
            chkcols.push(co2); chkcols.push(co1);

            //  console.log(chkcols);

            if (cz == 'c2' || cz == 'j2') {



                for (var i = 0; i <= chkcols.length; i++) {
                    img_id = '';
                    if (rows.indexOf(String(rws[i])) != -1 && col.indexOf(String(c1)) != -1 && blckedblocks1.indexOf(chkcols[i]) == -1) {
                        f1:
                            for (var j = 0; j < pieceslists.pieces.length; j++) {
                                if (pieceslists.pieces[j].colid == chkcols[i]) {
                                    img_id = pieceslists.pieces[j].imgids;
                                    if (img_id != '') {
                                        i1 = 1;
                                    }

                                    break f1;

                                }


                            }
                        if (img_id == '' && i1 == 0) {
                            // console.log(img_id + "----" + i1);
                            wpawnsvalidmoves.push(chkcols[i]);
                        }


                    }
                }

            }
            else {

                var r = parseInt(pickedPieceRow) + 1;
                var r1 = parseInt(pickedPieceRow) + 2;
                var c = parseInt(pickColIndex);
                var c1 = col[c];
                var c2 = parseInt(pickColIndex) + 1;
                var c21 = col[c2];
                var c3 = parseInt(pickColIndex) - 1;
                var c31 = col[c3];
                var cols1 = [];
                cols1.push(c); cols1.push(c2); cols1.push(c3);
                var colschk = [];
                colschk.push(c1); colschk.push(c21); colschk.push(c31);
                var co1 = c1 + r;
                var co2 = c21 + r;
                var co3 = c31 + r;
                var co4 = c1 + r1;
                //   console.log(co1 + "----" + co2 + "----" + co3);

                var chkcols = [];
                chkcols.push(co1); chkcols.push(co2); chkcols.push(co3); chkcols.push(co4);
                //  console.log(chkcols);
                for (var i = 0; i <= chkcols.length; i++) {
                    img_id = '';
                    if (rows.indexOf(String(r)) != -1 && col.indexOf(String(colschk[i])) != -1 && blckedblocks1.indexOf(chkcols[i]) == -1) {
                        f1:
                            for (var j = 0; j < pieceslists.pieces.length; j++) {
                                if (pieceslists.pieces[j].colid == chkcols[i]) {
                                    img_id = pieceslists.pieces[j].imgids;
                                    // console.log(img_id.substring(0, 1));
                                    break f1;
                                    //  }
                                }
                            }
                        if (img_id.substring(0, 1) != whichplayer) {
                            if (img_id == '') {
                                if (parseInt(pickColIndex) == (cols1[i])) {
                                    wpawnsvalidmoves.push(chkcols[i]);
                                }
                            }
                            else if (img_id != '' && chkcols[i] != co1) {
                                wpawnsvalidmoves.push(chkcols[i]);
                                if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                    whchcolor(img_id.substring(0, 1));
                                   // console.log('Check To  : ' + clr + " King at " + chkcols[i]);
                                    chkto = 'Check To  : ' + clr + " King at " + chkcols[i];
                                }
                               // console.log('You can Kill : ' + img_id + " at " + chkcols[i]);
                            }
                        }

                    }
                }

                wpawnsvalidmoves.push(chkcols[3]);

            }


            // console.log(wpawnsvalidmoves);
        }
        else if (pickedPieceRow > 2) {
            var r = parseInt(pickedPieceRow) + 1;
            //var r1 = parseInt(pickedPieceRow) + 2;
            var c = parseInt(pickColIndex);
            var c1 = col[c];
            var c2 = parseInt(pickColIndex) + 1;
            var c21 = col[c2];
            var c3 = parseInt(pickColIndex) - 1;
            var c31 = col[c3];
            var cols1 = [];
            cols1.push(c); cols1.push(c2); cols1.push(c3);
            var colschk = [];
            colschk.push(c1); colschk.push(c21); colschk.push(c31);
            var co1 = c1 + r;
            var co2 = c21 + r;
            var co3 = c31 + r;

            //   console.log(co1 + "----" + co2 + "----" + co3);

            var chkcols = [];
            chkcols.push(co1); chkcols.push(co2); chkcols.push(co3);
            //  console.log(chkcols);
            for (var i = 0; i <= chkcols.length; i++) {
                img_id = '';
                if (rows.indexOf(String(r)) != -1 && col.indexOf(String(colschk[i])) != -1 && blckedblocks1.indexOf(chkcols[i]) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == chkcols[i]) {
                                img_id = pieceslists.pieces[j].imgids;
                                // console.log(img_id.substring(0, 1));
                                break f1;
                                //  }
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {
                            if (parseInt(pickColIndex) == (cols1[i])) {
                                wpawnsvalidmoves.push(chkcols[i]);
                            }
                        }
                        else if (img_id != '' && chkcols[i] != co1) {
                            wpawnsvalidmoves.push(chkcols[i]);
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                             //   console.log('Check To  : ' + clr + " King at " + chkcols[i]);
                                chkto = 'Check To  : ' + clr + " King at " + chkcols[i];
                            }
                         //   console.log('You can Kill : ' + img_id + " at " + chkcols[i]);
                        }
                    }

                }
            }
            //console.log(wpawnsvalidmoves);

        }

    }



    function bpawnvldmoves(c, r, whichPlayer) {
        var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
        var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        var blckedblocks1 = ['a1', 'b1', 'a2', 'b2', 'a11', 'b11', 'a12', 'b12', 'k1', 'k2', 'k11', 'k12', 'l1', 'l2', 'l11', 'l12'];
        var stringjson = JSON.stringify(colarray);
        var pieceslists = JSON.parse(stringjson);
        var whichplayer = whichPlayer;
        var pickedPieceRow = r;
        var i1 = 0;
        var pickColIndex = col.indexOf(String(c));
        bpawnsvalidmoves = [];
        var img_id = '';
        if (pickedPieceRow == 11) {
            var rz = parseInt(pickedPieceRow);
            var r = parseInt(pickedPieceRow) - 1;
            var r1 = parseInt(pickedPieceRow) - 2;
            var rws = [];
            rws.push(r); rws.push(r1);
            var c = parseInt(pickColIndex);
            var c1 = col[c];
            var cz = c1 + rz;
            var co1 = c1 + r1;
            var co2 = c1 + r;
            var chkcols = [];
            chkcols.push(co2); chkcols.push(co1);
            //console.log(co2 + '-----------' + co1 + '-----------' + cz);
            if (cz == 'c11' || cz == 'j11') {
                for (var i = 0; i < chkcols.length; i++) {
                    img_id = '';
                    if (rows.indexOf(String(rws[i])) != -1 && col.indexOf(String(c1)) != -1 && blckedblocks1.indexOf(chkcols[i]) == -1) {
                        f1:
                            for (var j = 0; j < pieceslists.pieces.length; j++) {
                                if (pieceslists.pieces[j].colid == chkcols[i]) {
                                    img_id = pieceslists.pieces[j].imgids;
                                    if (img_id != '') {
                                        i1 = 1;
                                    }
                                    break f1;
                                }
                            }
                        if (img_id == '' && i1 == 0) {
                            bpawnsvalidmoves.push(chkcols[i]);
                        }
                    }

                }
            }
            else  
            {
    
                    var r = parseInt(pickedPieceRow) - 1;
                    var r1 = parseInt(pickedPieceRow) - 2;
                    var c = parseInt(pickColIndex);
                    var c1 = col[c];
                    var c2 = parseInt(pickColIndex) + 1;
                    var c21 = col[c2];
                    var c3 = parseInt(pickColIndex) - 1;
                    var c31 = col[c3];

                    var cols1 = [];
                    cols1.push(c); cols1.push(c2); cols1.push(c3);

                    var colschk = [];
                    colschk.push(c1); colschk.push(c21); colschk.push(c31);

                    var co1 = c1 + r;
                    var co2 = c21 + r;
                    var co3 = c31 + r;
                    var co4 = c1 + r1;
                    var chkcols = [];
                    chkcols.push(co1); chkcols.push(co2); chkcols.push(co3); chkcols.push(co4);

                    //      console.log("cols1 : " + cols1 + " colschk : " + colschk + " chkcols : " + chkcols);


                    for (var i = 0; i < chkcols.length; i++) {
                        img_id = '';
                        if (rows.indexOf(String(r)) != -1 && col.indexOf(String(colschk[i])) != -1 && blckedblocks1.indexOf(chkcols[i]) == -1) {
                            f1:
                                for (var j = 0; j < pieceslists.pieces.length; j++) {
                                    if (pieceslists.pieces[j].colid == chkcols[i]) {
                                        img_id = pieceslists.pieces[j].imgids;
                                        break f1;

                                    }
                                }
                            if (img_id.substring(0, 1) != whichplayer) {
                                if (img_id == '') {
                                    if (parseInt(pickColIndex) == (cols1[i])) {
                                        bpawnsvalidmoves.push(chkcols[i]);
                                    }
                                }
                                else if (img_id != '' && chkcols[i] != co1) {
                                    bpawnsvalidmoves.push(chkcols[i]);
                                    if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                        whchcolor(img_id.substring(0, 1));
                                        //        console.log('Check To  : ' + clr + " King at " + chkcols[i]);
                                        chkto = 'Check To  : ' + clr + " King at " + chkcols[i];
                                    }
                                    //    console.log('You can Kill : ' + img_id + " at " + chkcols[i]);
                                }
                            }

                        }

                        
                    }

                    bpawnsvalidmoves.push(chkcols[3]);

                }
           // }


            // console.log(bpawnsvalidmoves);
        }
        else if (pickedPieceRow < 11) {
            var r = parseInt(pickedPieceRow) - 1;
            var c = parseInt(pickColIndex);
            var c1 = col[c];
            var c2 = parseInt(pickColIndex) + 1;
            var c21 = col[c2];
            var c3 = parseInt(pickColIndex) - 1;
            var c31 = col[c3];

            var cols1 = [];
            cols1.push(c); cols1.push(c2); cols1.push(c3);

            var colschk = [];
            colschk.push(c1); colschk.push(c21); colschk.push(c31);

            var co1 = c1 + r;
            var co2 = c21 + r;
            var co3 = c31 + r;

            var chkcols = [];
            chkcols.push(co1); chkcols.push(co2); chkcols.push(co3);

            //      console.log("cols1 : " + cols1 + " colschk : " + colschk + " chkcols : " + chkcols);


            for (var i = 0; i < chkcols.length; i++) {
                img_id = '';
                if (rows.indexOf(String(r)) != -1 && col.indexOf(String(colschk[i])) != -1 && blckedblocks1.indexOf(chkcols[i]) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == chkcols[i]) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;

                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {
                            if (parseInt(pickColIndex) == (cols1[i])) {
                                bpawnsvalidmoves.push(chkcols[i]);
                            }
                        }
                        else if (img_id != '' && chkcols[i] != co1) {
                            bpawnsvalidmoves.push(chkcols[i]);
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                        //        console.log('Check To  : ' + clr + " King at " + chkcols[i]);
                                chkto = 'Check To  : ' + clr + " King at " + chkcols[i];
                            }
                        //    console.log('You can Kill : ' + img_id + " at " + chkcols[i]);
                        }
                    }

                }
            }
            //  console.log(bpawnsvalidmoves);

        }


    }

    function rpawnvldmoves(c, r, whichPlayer) {
        var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
        var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        var blckedblocks1 = ['a1', 'b1', 'a2', 'b2', 'a11', 'b11', 'a12', 'b12', 'k1', 'k2', 'k11', 'k12', 'l1', 'l2', 'l11', 'l12'];
        var stringjson = JSON.stringify(colarray);
        var pieceslists = JSON.parse(stringjson);
        var whichplayer = whichPlayer;
        var pickedPieceRow = r;
        var pickColIndex = col.indexOf(String(c));
        //  pickColIndex = col.indexOf(pickedPieceColumn);
  //      console.log(pickColIndex);
        rpawnsvalidmoves = [];
        var img_id = '';
        if (pickColIndex == 10) {
         
            var r = parseInt(pickedPieceRow);
            var c0 = parseInt(pickColIndex);
            var c01 = col[c0];
            var c = parseInt(pickColIndex) - 1;
            var c1 = col[c];
            var c2 = parseInt(pickColIndex) - 2;
            var c21 = col[c2];
            var cz = c01 + r;
            var cols1 = [];
            cols1.push(c1); cols1.push(c21);
            var co1 = c1 + r;
            var co2 = c21 + r;
           
            var chkcols = [];
            var i1 = 0;
            chkcols.push(co1); chkcols.push(co2);// chkcols.push(co3); chkcols.push(co4);
              //console.log(chkcols);
            //console.log("cz : " + cz);

              if (cz == 'k3' || cz == 'k10') {
                  for (var i = 0; i < chkcols.length; i++) {
                      img_id = '';
                      if (rows.indexOf(String(r)) != -1 && col.indexOf(String(cols1[i])) != -1 && blckedblocks1.indexOf(chkcols[i]) == -1) {
                          f1:
                              for (var j = 0; j < pieceslists.pieces.length; j++) {
                                  if (pieceslists.pieces[j].colid == chkcols[i]) {
                                      img_id = pieceslists.pieces[j].imgids;
                                      if (img_id != '') {
                                          i1 = 1;
                                      }
                                      break f1;
                                  }
                              }
                          if (img_id == '' && i1 == 0) {
                              rpawnsvalidmoves.push(chkcols[i]);
                          }
                      }
                  }
              }
              else { 
                  var r = parseInt(pickedPieceRow);
                  var r1 = parseInt(pickedPieceRow) + 1;
                  var r2 = parseInt(pickedPieceRow) - 1;
                  var rw1 = [];
                  rw1.push(r); rw1.push(r1); rw1.push(r2);
                  var c = parseInt(pickColIndex) - 1;
                  var c2 = parseInt(pickColIndex) - 2;
                  var c1 = col[c];
                  var c2 = col[c2];
                  var co1 = c1 + r;
                  var co2 = c1 + r1;
                  var co3 = c1 + r2;
                  var co4 = c2 + r;
                  var chkcols = [];
                  chkcols.push(co1); chkcols.push(co2); chkcols.push(co3); chkcols.push(co4); 

                  for (var i = 0; i < chkcols.length; i++) {
                      img_id = '';
                      if (rows.indexOf(String(rw1[i])) != -1 && col.indexOf(String(c1)) != -1 && blckedblocks1.indexOf(chkcols[i]) == -1) {
                          f1:
                              for (var j = 0; j < pieceslists.pieces.length; j++) {
                                  if (pieceslists.pieces[j].colid == chkcols[i]) {
                                      img_id = pieceslists.pieces[j].imgids;
                                      break f1;
                                  }
                              }
                          if (img_id.substring(0, 1) != whichplayer) {
                              if (img_id == '') {
                                  if (parseInt(pickedPieceRow) == rw1[i]) {
                                      rpawnsvalidmoves.push(chkcols[i]);
                                  }
                              }
                              else if (img_id != '' && chkcols[i] != co1) {
                                  rpawnsvalidmoves.push(chkcols[i]);
                                  if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                      whchcolor(img_id.substring(0, 1));
                                      // console.log('Check To  : ' + clr + " King at " + chkcols[i]);
                                      chkto = 'Check To  : ' + clr + " King at " + chkcols[i];
                                  }
                                  //  console.log('You can Kill : ' + img_id + " at " + chkcols[i]);
                              }
                          }

                      }
                  }

                  rpawnsvalidmoves.push(chkcols[3]);
              }
 

        }
        else if (pickColIndex < 10) {
            var r = parseInt(pickedPieceRow);
            var r1 = parseInt(pickedPieceRow) + 1;
            var r2 = parseInt(pickedPieceRow) - 1;
            var rw1 = [];
            rw1.push(r); rw1.push(r1); rw1.push(r2);
            var c = parseInt(pickColIndex) - 1;
            var c1 = col[c];
            var co1 = c1 + r;
            var co2 = c1 + r1;
            var co3 = c1 + r2;
            var chkcols = [];
            chkcols.push(co1); chkcols.push(co2); chkcols.push(co3);

            for (var i = 0; i < chkcols.length; i++) {
                img_id = '';
                if (rows.indexOf(String(rw1[i])) != -1 && col.indexOf(String(c1)) != -1 && blckedblocks1.indexOf(chkcols[i]) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == chkcols[i]) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {
                            if (parseInt(pickedPieceRow) == rw1[i]) {
                                rpawnsvalidmoves.push(chkcols[i]);
                            }
                        }
                        else if (img_id != '' && chkcols[i] != co1) {
                            rpawnsvalidmoves.push(chkcols[i]);
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                               // console.log('Check To  : ' + clr + " King at " + chkcols[i]);
                                chkto = 'Check To  : ' + clr + " King at " + chkcols[i];
                            }
                          //  console.log('You can Kill : ' + img_id + " at " + chkcols[i]);
                        }
                    }

                }
            }

        }


    }

    function gpawnvldmoves(c, r, whichPlayer) {
     //   console.log('gpawnvldmoves');
        var i1 = 0;
        var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
        var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        var blckedblocks1 = ['a1', 'b1', 'a2', 'b2', 'a11', 'b11', 'a12', 'b12', 'k1', 'k2', 'k11', 'k12', 'l1', 'l2', 'l11', 'l12'];
        var stringjson = JSON.stringify(colarray);
        var pieceslists = JSON.parse(stringjson);
        var whichplayer = whichPlayer;
        var pickedPieceRow = r;
        var pickColIndex = col.indexOf(String(c));

        gpawnsvalidmoves = [];
        var img_id = '';
        if (pickColIndex == 1) {
            var r = parseInt(pickedPieceRow);
            var c = parseInt(pickColIndex) + 1;
            var c1 = col[c];
            var c2 = parseInt(pickColIndex) + 2;
            var c21 = col[c2];
            var cols1 = [];
            cols1.push(c1); cols1.push(c21);
            var co1 = c1 + r;
            var co2 = c21 + r;
            var chkcols = [];
            chkcols.push(co1); chkcols.push(co2);
       //     console.log(chkcols);
            for (var i = 0; i < chkcols.length; i++) {
                img_id = '';
                if (rows.indexOf(String(r)) != -1 && col.indexOf(String(cols1[i])) != -1 && blckedblocks1.indexOf(chkcols[i]) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == chkcols[i]) {
                                img_id = pieceslists.pieces[j].imgids;
                                if (img_id != '') {
                                    i1 = 1;
                                }

                                break f1;
                            }
                        }
                    if (img_id == '' && i1 == 0) {
                        gpawnsvalidmoves.push(chkcols[i]);
                    }
                }
            }

        }
        else if (pickColIndex > 1) {
            var r = parseInt(pickedPieceRow);
            var r1 = parseInt(pickedPieceRow) + 1;
            var r2 = parseInt(pickedPieceRow) - 1;
            var rw1 = [];
            rw1.push(r); rw1.push(r1); rw1.push(r2);
            var c = parseInt(pickColIndex) + 1;
            var c1 = col[c];
            var co1 = c1 + r;
            var co2 = c1 + r1;
            var co3 = c1 + r2;
            var chkcols = [];
            chkcols.push(co1); chkcols.push(co2); chkcols.push(co3);

            for (var i = 0; i < chkcols.length; i++) {
                img_id = '';
                if (rows.indexOf(String(rw1[i])) != -1 && col.indexOf(String(c1)) != -1 && blckedblocks1.indexOf(chkcols[i]) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == chkcols[i]) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {
                            if (parseInt(pickedPieceRow) == rw1[i]) {
                                gpawnsvalidmoves.push(chkcols[i]);
                            }
                        }
                        else if (img_id != '' && chkcols[i] != co1) {
                            gpawnsvalidmoves.push(chkcols[i]);
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                           //     console.log('Check To  : ' + clr + " King at " + chkcols[i]);
                                chkto = 'Check To  : ' + clr + " King at " + chkcols[i];
                            }
                          //  console.log('You can Kill : ' + img_id + " at " + chkcols[i]);
                        }
                    }

                }
            }

        }

    }
     
    function abz(c, r, whichPlayer) {
     
        var i1 = 0;
        var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
        var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        var blckedblocks1 = ['a1', 'b1', 'a2', 'b2', 'a11', 'b11', 'a12', 'b12', 'k1', 'k2', 'k11', 'k12', 'l1', 'l2', 'l11', 'l12'];
        var stringjson = JSON.stringify(colarray);
        var pieceslists = JSON.parse(stringjson);
        var whichplayer = whichPlayer;
        var pickedPieceRow = r;
        var pickColIndex = col.indexOf(String(c));

        gpawnsvalidmoves = [];
        var img_id = '';
        if (pickColIndex == 1) {
            var r = parseInt(pickedPieceRow);
            var c = parseInt(pickColIndex) + 1;
            var c1 = col[c];
            var c0 = parseInt(pickColIndex);
            var c01 = col[c0];
            var c2 = parseInt(pickColIndex) + 2;
            var c21 = col[c2];
            var cz = c01 + r;
            var cols1 = [];
            cols1.push(c1); cols1.push(c21);
            var co1 = c1 + r;
            var co2 = c21 + r;
            var chkcols = [];
            chkcols.push(co1); chkcols.push(co2);
            if (cz == 'b3' || cz == 'b10') {
                for (var i = 0; i < chkcols.length; i++) {
                    img_id = '';
                    if (rows.indexOf(String(r)) != -1 && col.indexOf(String(cols1[i])) != -1 && blckedblocks1.indexOf(chkcols[i]) == -1) {
                        f1:
                            for (var j = 0; j < pieceslists.pieces.length; j++) {
                                if (pieceslists.pieces[j].colid == chkcols[i]) {
                                    img_id = pieceslists.pieces[j].imgids;
                                    if (img_id != '') {
                                        i1 = 1;
                                    }

                                    break f1;
                                }
                            }
                        if (img_id == '' && i1 == 0) {
                            gpawnsvalidmoves.push(chkcols[i]);
                        }
                    }
                }
            }
            else {
                var r = parseInt(pickedPieceRow);
                var r1 = parseInt(pickedPieceRow) + 1;
                var r2 = parseInt(pickedPieceRow) - 1;
                var rw1 = [];
                rw1.push(r); rw1.push(r1); rw1.push(r2);
                var c = parseInt(pickColIndex) + 1;
                var c1 = col[c];
                var c2 = parseInt(pickColIndex) + 2;
                var c21 = col[c2];
                var co1 = c1 + r;
                var co2 = c1 + r1;
                var co3 = c1 + r2;
                var co4 = c21 + r;
                var chkcols = [];
                chkcols.push(co1); chkcols.push(co2); chkcols.push(co3); chkcols.push(co4);

                for (var i = 0; i < chkcols.length; i++) {
                    img_id = '';
                    if (rows.indexOf(String(rw1[i])) != -1 && col.indexOf(String(c1)) != -1 && blckedblocks1.indexOf(chkcols[i]) == -1) {
                        f1:
                            for (var j = 0; j < pieceslists.pieces.length; j++) {
                                if (pieceslists.pieces[j].colid == chkcols[i]) {
                                    img_id = pieceslists.pieces[j].imgids;
                                    break f1;
                                }
                            }
                        if (img_id.substring(0, 1) != whichplayer) {
                            if (img_id == '') {
                                if (parseInt(pickedPieceRow) == rw1[i]) {
                                    gpawnsvalidmoves.push(chkcols[i]);
                                }
                            }
                            else if (img_id != '' && chkcols[i] != co1) {
                                gpawnsvalidmoves.push(chkcols[i]);
                                if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                    whchcolor(img_id.substring(0, 1));
                                    //     console.log('Check To  : ' + clr + " King at " + chkcols[i]);
                                    chkto = 'Check To  : ' + clr + " King at " + chkcols[i];
                                }
                                //  console.log('You can Kill : ' + img_id + " at " + chkcols[i]);
                            }
                        }

                    }
                }
                gpawnsvalidmoves.push(chkcols[3]);

            }

        

        }
        else if (pickColIndex > 1) {
            var r = parseInt(pickedPieceRow);
            var r1 = parseInt(pickedPieceRow) + 1;
            var r2 = parseInt(pickedPieceRow) - 1;
            var rw1 = [];
            rw1.push(r); rw1.push(r1); rw1.push(r2);
            var c = parseInt(pickColIndex) + 1;
            var c1 = col[c];
            var co1 = c1 + r;
            var co2 = c1 + r1;
            var co3 = c1 + r2;
            var chkcols = [];
            chkcols.push(co1); chkcols.push(co2); chkcols.push(co3);

            for (var i = 0; i < chkcols.length; i++) {
                img_id = '';
                if (rows.indexOf(String(rw1[i])) != -1 && col.indexOf(String(c1)) != -1 && blckedblocks1.indexOf(chkcols[i]) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == chkcols[i]) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {
                            if (parseInt(pickedPieceRow) == rw1[i]) {
                                gpawnsvalidmoves.push(chkcols[i]);
                            }
                        }
                        else if (img_id != '' && chkcols[i] != co1) {
                            gpawnsvalidmoves.push(chkcols[i]);
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                                //     console.log('Check To  : ' + clr + " King at " + chkcols[i]);
                                chkto = 'Check To  : ' + clr + " King at " + chkcols[i];
                            }
                            //  console.log('You can Kill : ' + img_id + " at " + chkcols[i]);
                        }
                    }

                }
            }

        }

    }
     
    function rookvldmoves(c, r, whichPlayer) {

        var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
        var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        var blckedblocks1 = ['a1', 'b1', 'a2', 'b2', 'a11', 'b11', 'a12', 'b12', 'k1', 'k2', 'k11', 'k12', 'l1', 'l2', 'l11', 'l12'];
        var stringjson = JSON.stringify(colarray);
        var pieceslists = JSON.parse(stringjson);
        var whichplayer = whichPlayer;
        var pickedPieceRow = r;
        var pickColIndex = col.indexOf(String(c));

        var img_id = '';

        //   pickColIndex = col.indexOf(pickedPieceColumn);
        var c = col[pickColIndex];
        var r = parseInt(pickedPieceRow);
        wrookvalidmoves = [];


        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------StraightCol START----------------------------------------------
        //----------------------------------------------------------------------------------------------------------

        cmpltloop:
            for (var i = parseInt(pickedPieceRow) + 1; i <= 12; i++) {

                //var tdid = c + i;
                tdid = c + i;
                img_id = '';

                if (rows.indexOf(String(i)) != -1 && col.indexOf(String(c)) != -1 && blckedblocks1.indexOf(tdid) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == tdid) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {
                            wrookvalidmoves.push(tdid);
                            //   rkvldmoves.push(tdid);
                        }
                        else if (img_id != '') {
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                           //     console.log('Check To  : ' + clr + " King at " + tdid);
                                var stts = 'Check To  : ' + clr + " King";
                                chkto = stts;
                                io.sockets.emit('updateboard2', stts);

                            }
                     //       console.log('You can Kill : ' + img_id + " at " + tdid);
                            
                            wrookvalidmoves.push(tdid);
                            break cmpltloop;
                        }
                    }
                    else if (img_id.substring(0, 1) == whichplayer) {
                        break cmpltloop;
                    }
                }
            }



        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------StraightCol END----------------------------------------------
        //----------------------------------------------------------------------------------------------------------



        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------StraightColBack START----------------------------------------------
        //----------------------------------------------------------------------------------------------------------
        //for (var i = parseInt(DropPieceRow) + 1; i < pickedPieceRow; i++) {
        cmpltloop1:
            for (var i = parseInt(pickedPieceRow) - 1; i >= 0; i--) {
                var tdid = c + i;
                img_id = '';

                if (rows.indexOf(String(i)) != -1 && col.indexOf(String(c)) != -1 && blckedblocks1.indexOf(tdid) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == tdid) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {
                            //   rkvldmoves.push(tdid);



                            wrookvalidmoves.push(tdid);
                        }
                        else if (img_id != '') {
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                           //     console.log('Check To  : ' + clr + " King at " + tdid);
                                var stts = 'Check To  : ' + clr + " King";
                                chkto = stts;
                                io.sockets.emit('updateboard2', stts);
                            }
                     //       console.log('You can Kill : ' + img_id + " at " + tdid);
                            //   rkvldmoves.push(tdid);
                            wrookvalidmoves.push(tdid);
                            break cmpltloop1;
                        }
                    }
                    else if (img_id.substring(0, 1) == whichplayer) {
                        break cmpltloop1;
                    }
                }
            }


        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------StraightColBack END----------------------------------------------
        //----------------------------------------------------------------------------------------------------------


        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------RightHorizontalCol START----------------------------------------------
        //----------------------------------------------------------------------------------------------------------


        cmpltloop2:
            for (var i = pickColIndex + 1; i < 12; i++) {
                var tdid = col[i] + r;
                img_id = '';

                if (blckedblocks1.indexOf(tdid) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == tdid) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {
                            //   rkvldmoves.push(tdid);
                            wrookvalidmoves.push(tdid);
                        }
                        else if (img_id != '') {
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                            //    console.log('Check To  : ' + clr + " King at " + tdid);
                                var stts = 'Check To  : ' + clr + " King";
                                chkto = stts;
                                io.sockets.emit('updateboard2', stts);
                            }
                         //   console.log('You can Kill : ' + img_id + " at " + tdid);

                            //   rkvldmoves.push(tdid);
                            wrookvalidmoves.push(tdid);
                            break cmpltloop2;
                        }
                    }
                    else if (img_id.substring(0, 1) == whichplayer) {
                        break cmpltloop2;
                    }
                }


            }



        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------RightHorizontalCol END----------------------------------------------
        //----------------------------------------------------------------------------------------------------------



        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------LefttHorizontalCol START----------------------------------------------
        //----------------------------------------------------------------------------------------------------------


        cmpltloop3:
            for (var i = pickColIndex - 1; i >= 0 ; i--) {

                var tdid = col[i] + r;
                img_id = '';

                if (blckedblocks1.indexOf(tdid) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == tdid) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {
                            //   rkvldmoves.push(tdid);
                            wrookvalidmoves.push(tdid);
                        }
                        else if (img_id != '') {
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                          //      console.log('Check To  : ' + clr + " King at " + tdid);
                                var stts = 'Check To  : ' + clr + " King";
                                chkto = stts;
                                io.sockets.emit('updateboard2', stts);
                            }
                     //       console.log('You can Kill : ' + img_id + " at " + tdid);
                            //   rkvldmoves.push(tdid);
                            wrookvalidmoves.push(tdid);
                            break cmpltloop3;
                        }
                    }
                    else if (img_id.substring(0, 1) == whichplayer) {
                        break cmpltloop3;
                    }
                }

            }


        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------LefttHorizontalCol END----------------------------------------------
        //----------------------------------------------------------------------------------------------------------


        //console.log(wrookvalidmoves);

    }

    function bishopvldmoves(c, r, whichPlayer) {
        var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
        var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        var blckedblocks1 = ['a1', 'b1', 'a2', 'b2', 'a11', 'b11', 'a12', 'b12', 'k1', 'k2', 'k11', 'k12', 'l1', 'l2', 'l11', 'l12'];
        var stringjson = JSON.stringify(colarray);
        var pieceslists = JSON.parse(stringjson);
        var whichplayer = whichPlayer;
        var pickedPieceRow = r;
        var pickedPieceColumn = c;
        var pickColIndex = col.indexOf(String(c));
        bishopvalidmoves = [];

        var pr = pickedPieceRow;
        pickColIndex = col.indexOf(pickedPieceColumn);

        //--------------------------------------------------------------------------------------------------------------------
        //--------------------------------------------------RightDiagonalCol Start--------------------------------------------
        //--------------------------------------------------------------------------------------------------------------------

        cmpltloop0:
            for (var i = pickColIndex + 1; i < 12; i++) {
                pr++;
                var tdid = col[i] + pr;
                img_id = '';

                if (rows.indexOf(String(pr)) != -1 && col.indexOf(String(col[i])) != -1 && blckedblocks1.indexOf(tdid) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == tdid) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {
                            //               bshpvldmoves.push(tdid);
                            bishopvalidmoves.push(tdid);
                        }
                        else if (img_id != '') {
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                          //      console.log('Check To  : ' + clr + " King at " + tdid);
                                chkto = 'Check To  : ' + clr + " King at " + tdid;
                            }
                         //   console.log('You can Kill : ' + img_id + " at " + tdid);
                            //               bshpvldmoves.push(tdid);
                            bishopvalidmoves.push(tdid);
                            break cmpltloop0;
                        }
                    }
                    else if (img_id.substring(0, 1) == whichplayer) {
                        break cmpltloop0;
                    }
                }

            }



        //--------------------------------------------------------------------------------------------------------------------
        //--------------------------------------------------RightDiagonalCol End----------------------------------------------
        //--------------------------------------------------------------------------------------------------------------------



        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------LeftDiagonal START-------------------------------------------------
        //----------------------------------------------------------------------------------------------------------

        var pr = pickedPieceRow;
        pickColIndex = col.indexOf(pickedPieceColumn);
        cmpltloop3:
            for (var i = pickColIndex - 1; i >= 0 ; i--) {
                pr++;
                var tdid = col[i] + pr;

                img_id = '';

                if (rows.indexOf(String(pr)) != -1 && col.indexOf(String(col[i])) != -1 && blckedblocks1.indexOf(tdid) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == tdid) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {
                            bishopvalidmoves.push(tdid);
                            //               bshpvldmoves.push(tdid);
                        }
                        else if (img_id != '') {
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                         //       console.log('Check To  : ' + clr + " King at " + tdid);
                                chkto = 'Check To  : ' + clr + " King at " + tdid;
                            }
                      //      console.log('You can Kill : ' + img_id + " at " + tdid);
                            //               bshpvldmoves.push(tdid);
                            bishopvalidmoves.push(tdid);
                            break cmpltloop3;
                        }
                    }
                    else if (img_id.substring(0, 1) == whichplayer) {
                        break cmpltloop3;
                    }
                }

            }


        //////----------------------------------------------------------------------------------------------------------
        // --------------------------------------LeftDiagonalCol END----------------------------------------------
        //----------------------------------------------------------------------------------------------------------


        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------RightDiagonalColDwn START----------------------------------------------
        //----------------------------------------------------------------------------------------------------------
        var cl = col.indexOf(pickedPieceColumn);
        cmpltloop1:
            for (var i = parseInt(pickedPieceRow) - 1; i >= 0; i--) {
                cl++;
                var tdid = (col[cl] + i);

                img_id = '';

                if (rows.indexOf(String(i)) != -1 && col.indexOf(String(col[cl])) != -1 && blckedblocks1.indexOf(tdid) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == tdid) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {
                            bishopvalidmoves.push(tdid);
                            //               bshpvldmoves.push(tdid);
                        }
                        else if (img_id != '') {
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                          //      console.log('Check To  : ' + clr + " King at " + tdid);
                                chkto = 'Check To  : ' + clr + " King at " + tdid;
                            }
                       //     console.log('You can Kill : ' + img_id + " at " + tdid);
                            //               bshpvldmoves.push(tdid);
                            bishopvalidmoves.push(tdid);
                            break cmpltloop1;
                        }
                    }
                    else if (img_id.substring(0, 1) == whichplayer) {
                        break cmpltloop1;
                    }
                }
            }


        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------RightDiagonalColDwn END----------------------------------------------
        //----------------------------------------------------------------------------------------------------------

        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------LeftDiagonalColDwn Start----------------------------------------------
        //----------------------------------------------------------------------------------------------------------

        var cl = col.indexOf(pickedPieceColumn);

        cmpltloop:
            for (var i = parseInt(pickedPieceRow) - 1; i >= 0; i--) {
                cl--;
                var tdid = (col[cl] + i);
                img_id = '';

                if (rows.indexOf(String(i)) != -1 && col.indexOf(String(col[cl])) != -1 && blckedblocks1.indexOf(tdid) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == tdid) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {
                            bishopvalidmoves.push(tdid);
                            //               bshpvldmoves.push(tdid);
                        }
                        else if (img_id != '') {
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                         //       console.log('Check To  : ' + clr + " King at " + tdid);
                                chkto = 'Check To  : ' + clr + " King at " + tdid;
                            }
                       //     console.log('You can Kill : ' + img_id + " at " + tdid);
                            //               bshpvldmoves.push(tdid);
                            bishopvalidmoves.push(tdid);
                            break cmpltloop;
                        }
                    }
                    else if (img_id.substring(0, 1) == whichplayer) {
                        break cmpltloop;
                    }
                }
            }

      //  console.log(bishopvalidmoves);

        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------LeftDiagonal END----------------------------------------------
        //----------------------------------------------------------------------------------------------------------



    }

    function knightvldmoves(c, r, whichPlayer) {

        var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
        var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        var blckedblocks1 = ['a1', 'b1', 'a2', 'b2', 'a11', 'b11', 'a12', 'b12', 'k1', 'k2', 'k11', 'k12', 'l1', 'l2', 'l11', 'l12'];
        var stringjson = JSON.stringify(colarray);
        var pieceslists = JSON.parse(stringjson);
        var whichplayer = whichPlayer;
        var pickedPieceRow = r;
        var pickedPieceColumn = c;
        var pickColIndex = col.indexOf(String(c));
        knghvldmoves = [];
        knightMoves = [];


        if (whichplayer == 'w' || whichplayer == 'b') {
            pickColIndex = col.indexOf(pickedPieceColumn);


            //----------------------------------Start Knight Function------------------------------------------------------------------

            var c = pickedPieceRow + 2;
            var c1 = parseInt(pickedPieceRow) + 2;
            var r = parseInt(pickColIndex) - 1;
            var r1 = col[r];
            var co1 = r1 + c1;

            //    console.log('c' + " - " + c + ' c1' + " - " + c1 + ' r' + " - " + r + ' r1' + " - " + r1 + " - " + "co1" + " - " + co1);
            if ((col.indexOf(r1) != -1) && (rows.indexOf(String(c1)) != -1) && (blckedblocks1.indexOf(co1) == -1) && (knightMoves.indexOf(co1) == -1)) {
                for (var j = 0; j < pieceslists.pieces.length; j++) {
                    if (pieceslists.pieces[j].colid == String(co1)) {

                        img_id = pieceslists.pieces[j].imgids;
                        if (img_id.substring(0, 1) != whichplayer) {
                            knightMoves.push(co1);
                            knghvldmoves.push(co1);
                        }
                        else if (img_id == '') {

                            knghvldmoves.push(co1);
                            knightMoves.push(co1);
                        }

                    }
                }
            }


            var c = (pickedPieceRow) + 2;
            var c1 = parseInt(pickedPieceRow) + 2;
            var r = parseInt(pickColIndex) + 1;
            var r1 = col[r];
            var co1 = r1 + c1;
            //  console.log('c' + " - " + c + ' c1' + " - " + c1 + ' r' + " - " + r + ' r1' + " - " + r1 + " - " + "co1" + " - " + co1);
            if ((col.indexOf(r1) != -1) && (rows.indexOf(String(c1)) != -1) && (blckedblocks1.indexOf(co1) == -1) && (knightMoves.indexOf(co1) == -1)) {
                for (var j = 0; j < pieceslists.pieces.length; j++) {
                    if (pieceslists.pieces[j].colid == String(co1)) {

                        img_id = pieceslists.pieces[j].imgids;
                        if (img_id.substring(0, 1) != whichplayer) {
                            knightMoves.push(co1);
                            knghvldmoves.push(co1);
                        }
                        else if (img_id == '') {

                            knghvldmoves.push(co1);
                            knightMoves.push(co1);
                        }

                    }
                }
            }



            var c = (pickedPieceRow) + 1;
            var c1 = parseInt(pickedPieceRow) + 1;
            var r = parseInt(pickColIndex) + 2;
            var r1 = col[r];
            var co1 = r1 + c1;
            // console.log('c' + " - " + c + ' c1' + " - " + c1 + ' r' + " - " + r + ' r1' + " - " + r1 + " - " + "co1" + " - " + co1);

            if ((col.indexOf(r1) != -1) && (rows.indexOf(String(c1)) != -1) && (blckedblocks1.indexOf(co1) == -1) && (knightMoves.indexOf(co1) == -1)) {

                for (var j = 0; j < pieceslists.pieces.length; j++) {
                    if (pieceslists.pieces[j].colid == String(co1)) {

                        img_id = pieceslists.pieces[j].imgids;
                        if (img_id.substring(0, 1) != whichplayer) {
                            knightMoves.push(co1);
                            knghvldmoves.push(co1);
                        }
                        else if (img_id == '') {

                            knghvldmoves.push(co1);
                            knightMoves.push(co1);
                        }

                    }

                }

            }


            var c = (pickedPieceRow) + 1;
            var c1 = parseInt(pickedPieceRow) + 1;
            var r = parseInt(pickColIndex) - 2;
            var r1 = col[r];
            var co1 = r1 + c1;
            //   console.log('c' + " - " + c + ' c1' + " - " + c1 + ' r' + " - " + r + ' r1' + " - " + r1 + " - " + "co1" + " - " + co1);


            if ((col.indexOf(r1) != -1) && (rows.indexOf(String(c1)) != -1) && (blckedblocks1.indexOf(co1) == -1) && (knightMoves.indexOf(co1) == -1)) {
                for (var j = 0; j < pieceslists.pieces.length; j++) {
                    if (pieceslists.pieces[j].colid == String(co1)) {

                        img_id = pieceslists.pieces[j].imgids;
                        if (img_id.substring(0, 1) != whichplayer) {
                            knightMoves.push(co1);
                            knghvldmoves.push(co1);
                        }
                        else if (img_id == '') {

                            knghvldmoves.push(co1);
                            knightMoves.push(co1);
                        }

                    }

                }
            }
            
            if (whichplayer == 'w') {
                var c = (pickedPieceRow) - 1;
                var c1 = parseInt(pickedPieceRow) - 1;
                var r = parseInt(pickColIndex) - 2;
                var r1 = col[r];
                var co1 = r1 + c1;


                if ((col.indexOf(r1) != -1) && (rows.indexOf(String(c1)) != -1) && (blckedblocks1.indexOf(co1) == -1) && (knightMoves.indexOf(co1) == -1)) {
                    for (var j = 0; j < pieceslists.pieces.length; j++) {
                        if (pieceslists.pieces[j].colid == String(co1)) {

                            img_id = pieceslists.pieces[j].imgids;
                            if (img_id.substring(0, 1) != whichplayer) {
                                knightMoves.push(co1);
                                knghvldmoves.push(co1);
                            }
                            else if (img_id == '') {

                                knghvldmoves.push(co1);
                                knightMoves.push(co1);
                            }

                        }

                    }
                }

                var c = (pickedPieceRow) - 1;
                var c1 = parseInt(pickedPieceRow) - 1;
                var r = parseInt(pickColIndex) + 2;
                var r1 = col[r];
                var co1 = r1 + c1;

                if ((col.indexOf(r1) != -1) && (rows.indexOf(String(c1)) != -1) && (blckedblocks1.indexOf(co1) == -1) && (knightMoves.indexOf(co1) == -1)) {
                    for (var j = 0; j < pieceslists.pieces.length; j++) {
                        if (pieceslists.pieces[j].colid == String(co1)) {

                            img_id = pieceslists.pieces[j].imgids;
                            if (img_id.substring(0, 1) != whichplayer) {
                                knightMoves.push(co1);
                                knghvldmoves.push(co1);
                            }
                            else if (img_id == '') {

                                knghvldmoves.push(co1);
                                knightMoves.push(co1);
                            }

                        }

                    }
                }

                var c = (pickedPieceRow) - 2;
                var c1 = parseInt(pickedPieceRow) - 2;
                var r = parseInt(pickColIndex) + 1;
                var r1 = col[r];
                var co1 = r1 + c1;

                //  console.log('c' + " - " + c + ' c1' + " - " + c1 + ' r' + " - " + r + ' r1' + " - " + r1 + " - " + "co1" + " - " + co1);

                if ((col.indexOf(r1) != -1) && (rows.indexOf(String(c1)) != -1) && (blckedblocks1.indexOf(co1) == -1) && (knightMoves.indexOf(co1) == -1)) {
                    for (var j = 0; j < pieceslists.pieces.length; j++) {
                        if (pieceslists.pieces[j].colid == String(co1)) {

                            img_id = pieceslists.pieces[j].imgids;
                            if (img_id.substring(0, 1) != whichplayer) {
                                knightMoves.push(co1);
                                knghvldmoves.push(co1);
                            }
                            else if (img_id == '') {

                                knghvldmoves.push(co1);
                                knightMoves.push(co1);
                            }

                        }

                    }
                }


                var c = (pickedPieceRow) - 2;
                var c1 = parseInt(pickedPieceRow) - 2;
                var r = parseInt(pickColIndex) - 1;
                var r1 = col[r];
                var co1 = r1 + c1;

                //  console.log('c' + " - " + c + ' c1' + " - " + c1 + ' r' + " - " + r + ' r1' + " - " + r1 + " - " + "co1" + " - " + co1);

                if ((col.indexOf(r1) != -1) && (rows.indexOf(String(c1)) != -1) && (blckedblocks1.indexOf(co1) == -1) && (knightMoves.indexOf(co1) == -1)) {
                    for (var j = 0; j < pieceslists.pieces.length; j++) {
                        if (pieceslists.pieces[j].colid == String(co1)) {

                            img_id = pieceslists.pieces[j].imgids;
                            if (img_id.substring(0, 1) != whichplayer) {
                                knightMoves.push(co1);
                                knghvldmoves.push(co1);
                            }
                            else if (img_id == '') {

                                knghvldmoves.push(co1);
                                knightMoves.push(co1);
                            }

                        }
                    }
                }
            }
            else if (whichplayer == 'b') {
                //----------------------------------------Black Knight---------------------------------------------------------
                var c = (pickColIndex) - 1;
                var c1 = parseInt(pickColIndex) - 1;
                var r0 = (pickedPieceRow) - 2;
                var r = parseInt(pickedPieceRow) - 2;
                var r1 = col[c1];
                var r2 = rows[r];
                var co1 = r1 + c1;
                var co2 = r1 + r;

                // console.log('51)c' + " - " + c + ' c1' + " - " + c1 + ' r' + " - " + r + ' r1' + " - " + r1 + ' r2' + " - " + r2 + " - " + "co1" + " - " + co1 + "co2" + " - " + co2);

                if ((col.indexOf(r1) != -1) && (rows.indexOf(String(r0)) != -1) && (blckedblocks1.indexOf(co2) == -1) && (knightMoves.indexOf(co2) == -1)) {
                    for (var j = 0; j < pieceslists.pieces.length; j++) {
                        if (pieceslists.pieces[j].colid == String(co2)) {

                            img_id = pieceslists.pieces[j].imgids;
                            if (img_id.substring(0, 1) != whichplayer) {
                                knightMoves.push(co2);
                                knghvldmoves.push(co2);
                            }
                            else if (img_id == '') {

                                knghvldmoves.push(co2);
                                knightMoves.push(co2);
                            }

                        }
                    }
                }





                var c = (pickColIndex) + 1;
                var c1 = parseInt(pickColIndex) + 1;
                var r = parseInt(pickedPieceRow) - 2;
                var r1 = col[c1];
                var r2 = rows[r];
                var co1 = r1 + c1;
                var co2 = r1 + r;
                if ((col.indexOf(r1) != -1) && (rows.indexOf(String(r0)) != -1) && (blckedblocks1.indexOf(co2) == -1) && (knightMoves.indexOf(co2) == -1)) {
                    for (var j = 0; j < pieceslists.pieces.length; j++) {
                        if (pieceslists.pieces[j].colid == String(co2)) {

                            img_id = pieceslists.pieces[j].imgids;
                            if (img_id.substring(0, 1) != whichplayer) {
                                knightMoves.push(co2);
                                knghvldmoves.push(co2);
                            }
                            else if (img_id == '') {

                                knghvldmoves.push(co2);
                                knightMoves.push(co2);
                            }

                        }
                    }
                }



                var c = (pickColIndex) + 2;
                var c1 = parseInt(pickColIndex) + 2;
                var r = parseInt(pickedPieceRow) - 1;
                var r1 = col[c1];
                var r2 = rows[r];
                var co1 = r1 + c1;
                var co2 = r1 + r;
                if ((col.indexOf(r1) != -1) && (rows.indexOf(String(r0)) != -1) && (blckedblocks1.indexOf(co2) == -1) && (knightMoves.indexOf(co2) == -1)) {
                    for (var j = 0; j < pieceslists.pieces.length; j++) {
                        if (pieceslists.pieces[j].colid == String(co2)) {

                            img_id = pieceslists.pieces[j].imgids;
                            if (img_id.substring(0, 1) != whichplayer) {
                                knightMoves.push(co2);
                                knghvldmoves.push(co2);
                            }
                            else if (img_id == '') {

                                knghvldmoves.push(co2);
                                knightMoves.push(co2);
                            }

                        }
                    }
                }



                var c = (pickColIndex) - 2;
                var c1 = parseInt(pickColIndex) - 2;
                var r = parseInt(pickedPieceRow) - 1;
                var r1 = col[c1];
                var r2 = rows[r];
                var co1 = r1 + c1;
                var co2 = r1 + r;
                //console.log('54)c' + " - " + c + ' c1' + " - " + c1 + ' r' + " - " + r + ' r1' + " - " + r1 + ' r2' + " - " + r2 + " - " + "co1" + " - " + co1 + "co2" + " - " + co2);

                if ((col.indexOf(r1) != -1) && (rows.indexOf(String(r0)) != -1) && (blckedblocks1.indexOf(co2) == -1) && (knightMoves.indexOf(co2) == -1)) {
                    for (var j = 0; j < pieceslists.pieces.length; j++) {
                        if (pieceslists.pieces[j].colid == String(co2)) {

                            img_id = pieceslists.pieces[j].imgids;
                            if (img_id.substring(0, 1) != whichplayer) {
                                knightMoves.push(co2);
                                knghvldmoves.push(co2);
                            }
                            else if (img_id == '') {

                                knghvldmoves.push(co2);
                                knightMoves.push(co2);
                            }

                        }
                    }
                }




            }







            //----------------------------------End Knight Function------------------------------------------------------------------

        }
        else {
            pickColIndex = col.indexOf(pickedPieceColumn);
            pickedPieceRow = rows.indexOf(pickedPieceRow);
         //   dropColIndex = col.indexOf(DropPieceColumn);

            if (pickColIndex == 0) {
                pickColIndex = 0;
            }

            //----------------------------------Start Knight Function------------------------------------------------------------------

            var c = pickedPieceRow - 1;
            var c1 = rows[c];
            var r = parseInt(pickColIndex) + 2;

            if (r >= 0) {
                var r1 = col[r];
                var co1 = r1 + c1;
            }
            else {
                var r1 = "-";
                var co1 = "-";
            }

            //    console.log('c' + " - " + c + ' c1' + " - " + c1 + ' r' + " - " + r + ' r1' + " - " + r1 + " - " + "co1" + " - " + co1);



            if ((col.indexOf(r1) != -1) && (rows.indexOf(String(c1)) != -1) && (blckedblocks1.indexOf(co1) == -1) && (knightMoves.indexOf(co1) == -1)) {
                for (var j = 0; j < pieceslists.pieces.length; j++) {
                    if (pieceslists.pieces[j].colid == String(co1)) {

                        img_id = pieceslists.pieces[j].imgids;
                        if (img_id.substring(0, 1) != whichplayer) {
                            knightMoves.push(co1);
                            knghvldmoves.push(co1);
                        }
                        else if (img_id == '') {

                            knghvldmoves.push(co1);
                            knightMoves.push(co1);
                        }

                    }
                }
            }



            var c = pickedPieceRow + 1;
            var c1 = rows[c];
            var r = parseInt(pickColIndex) + 2;

            if (r >= 0) {
                var r1 = col[r];
                var co1 = r1 + c1;
            }
            else {
                var r1 = "-";
                var co1 = "-";
            }

            if ((col.indexOf(r1) != -1) && (rows.indexOf(String(c1)) != -1) && (blckedblocks1.indexOf(co1) == -1) && (knightMoves.indexOf(co1) == -1)) {
                for (var j = 0; j < pieceslists.pieces.length; j++) {
                    if (pieceslists.pieces[j].colid == String(co1)) {

                        img_id = pieceslists.pieces[j].imgids;
                        if (img_id.substring(0, 1) != whichplayer) {
                            knightMoves.push(co1);
                            knghvldmoves.push(co1);
                        }
                        else if (img_id == '') {

                            knghvldmoves.push(co1);
                            knightMoves.push(co1);
                        }

                    }
                }
            }



            var c = (pickedPieceRow) + 2;
            var c1 = rows[c];//parseInt(pickedPieceRow) + 2;
            var r = parseInt(pickColIndex) + 1;
            if (r >= 0) {
                var r1 = col[r];
                var co1 = r1 + c1;
            }
            else {
                var r1 = "-";
                var co1 = "-";
            }

            if ((col.indexOf(r1) != -1) && (rows.indexOf(String(c1)) != -1) && (blckedblocks1.indexOf(co1) == -1) && (knightMoves.indexOf(co1) == -1)) {
                for (var j = 0; j < pieceslists.pieces.length; j++) {
                    if (pieceslists.pieces[j].colid == String(co1)) {

                        img_id = pieceslists.pieces[j].imgids;
                        if (img_id.substring(0, 1) != whichplayer) {
                            knightMoves.push(co1);
                            knghvldmoves.push(co1);
                        }
                        else if (img_id == '') {

                            knghvldmoves.push(co1);
                            knightMoves.push(co1);
                        }

                    }
                }
            }

            var c = (pickedPieceRow) - 2;
            var c1 = rows[c];//parseInt(pickedPieceRow) + 2;
            var r = parseInt(pickColIndex) + 1;
            if (r >= 0) {
                var r1 = col[r];
                var co1 = r1 + c1;
            }
            else {
                var r1 = "-";
                var co1 = "-";
            }
            //var r1 = col[r];
            if ((col.indexOf(r1) != -1) && (rows.indexOf(String(c1)) != -1) && (blckedblocks1.indexOf(co1) == -1) && (knightMoves.indexOf(co1) == -1)) {
                for (var j = 0; j < pieceslists.pieces.length; j++) {
                    if (pieceslists.pieces[j].colid == String(co1)) {

                        img_id = pieceslists.pieces[j].imgids;
                        if (img_id.substring(0, 1) != whichplayer) {
                            knightMoves.push(co1);
                            knghvldmoves.push(co1);
                        }
                        else if (img_id == '') {

                            knghvldmoves.push(co1);
                            knightMoves.push(co1);
                        }

                    }
                }
            }


            var c = (pickedPieceRow) - 1;
            var c1 = rows[c];//parseInt(pickedPieceRow) + 2;
            var r = parseInt(pickColIndex) - 2;
            if (r >= 0) {
                var r1 = col[r];
                var co1 = r1 + c1;
            }
            else {
                var r1 = "-";
                var co1 = "-";
            }

            if ((col.indexOf(r1) != -1) && (rows.indexOf(String(c1)) != -1) && (blckedblocks1.indexOf(co1) == -1) && (knightMoves.indexOf(co1) == -1)) {
                for (var j = 0; j < pieceslists.pieces.length; j++) {
                    if (pieceslists.pieces[j].colid == String(co1)) {

                        img_id = pieceslists.pieces[j].imgids;
                        if (img_id.substring(0, 1) != whichplayer) {
                            knightMoves.push(co1);
                            knghvldmoves.push(co1);
                        }
                        else if (img_id == '') {

                            knghvldmoves.push(co1);
                            knightMoves.push(co1);
                        }

                    }
                }
            }

            var c = (pickedPieceRow) + 1;
            var c1 = rows[c];
            var r = parseInt(pickColIndex) - 2;
            if (r >= 0) {
                var r1 = col[r];
                var co1 = r1 + c1;
            }
            else {
                var r1 = "-";
                var co1 = "-";
            }

            if ((col.indexOf(r1) != -1) && (rows.indexOf(String(c1)) != -1) && (blckedblocks1.indexOf(co1) == -1) && (knightMoves.indexOf(co1) == -1)) {
                for (var j = 0; j < pieceslists.pieces.length; j++) {
                    if (pieceslists.pieces[j].colid == String(co1)) {

                        img_id = pieceslists.pieces[j].imgids;
                        if (img_id.substring(0, 1) != whichplayer) {
                            knightMoves.push(co1);
                            knghvldmoves.push(co1);
                        }
                        else if (img_id == '') {

                            knghvldmoves.push(co1);
                            knightMoves.push(co1);
                        }

                    }
                }
            }


            var c = (pickedPieceRow) + 2;
            var c1 = rows[c];//parseInt(pickedPieceRow) + 2;
            var r = parseInt(pickColIndex) - 1;
            if (r >= 0) {
                var r1 = col[r];
                var co1 = r1 + c1;
            }
            else {
                var r1 = "-";
                var co1 = "-";
            }
            if ((col.indexOf(r1) != -1) && (rows.indexOf(String(c1)) != -1) && (blckedblocks1.indexOf(co1) == -1) && (knightMoves.indexOf(co1) == -1)) {
                for (var j = 0; j < pieceslists.pieces.length; j++) {
                    if (pieceslists.pieces[j].colid == String(co1)) {

                        img_id = pieceslists.pieces[j].imgids;
                        if (img_id.substring(0, 1) != whichplayer) {
                            knightMoves.push(co1);
                            knghvldmoves.push(co1);
                        }
                        else if (img_id == '') {

                            knghvldmoves.push(co1);
                            knightMoves.push(co1);
                        }

                    }
                }
            }



            var c = (pickedPieceRow) - 2;
            var c1 = rows[c];
            var r = parseInt(pickColIndex) - 1;
            if (r >= 0) {
                var r1 = col[r];
                var co1 = r1 + c1;
            }
            else {
                var r1 = "-";
                var co1 = "-";
            }

            if ((col.indexOf(r1) != -1) && (rows.indexOf(String(c1)) != -1) && (blckedblocks1.indexOf(co1) == -1) && (knightMoves.indexOf(co1) == -1)) {
                for (var j = 0; j < pieceslists.pieces.length; j++) {
                    if (pieceslists.pieces[j].colid == String(co1)) {

                        img_id = pieceslists.pieces[j].imgids;
                        if (img_id.substring(0, 1) != whichplayer) {
                            knightMoves.push(co1);
                            knghvldmoves.push(co1);
                        }
                        else if (img_id == '') {

                            knghvldmoves.push(co1);
                            knightMoves.push(co1);
                        }

                    }
                }
            }


            //----------------------------------End Knight Function------------------------------------------------------------------

         //   console.log("KnightMoves VALID :-----------------" + knightMoves);

        }
    }

    function funqueenvldmoves(c, r, whichPlayer) {

        var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
        var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        var blckedblocks1 = ['a1', 'b1', 'a2', 'b2', 'a11', 'b11', 'a12', 'b12', 'k1', 'k2', 'k11', 'k12', 'l1', 'l2', 'l11', 'l12'];
        var stringjson = JSON.stringify(colarray);
        var pieceslists = JSON.parse(stringjson);
        var whichplayer = whichPlayer;
        var pickedPieceRow = r;
        var pickedPieceColumn = c;
        var pickColIndex = col.indexOf(String(c));
        queenvldmoves = [];

        var img_id = '';

        pickColIndex = col.indexOf(pickedPieceColumn);
        var c = col[pickColIndex];
        var r = parseInt(pickedPieceRow);


        //for (var i = 0; i < bishopvalidmoves.length; i++) {
        //    queenvldmoves.push(bishopvalidmoves[i]);
        //}

        //for (var j = 0; j < wrookvalidmoves.length; j++) {
        //    queenvldmoves.push(wrookvalidmoves[j]);
        //}


        //console.log("queenvldmoves : "+queenvldmoves);
        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------StraightCol START----------------------------------------------
        //----------------------------------------------------------------------------------------------------------

        cmpltloop:
            for (var i = parseInt(pickedPieceRow) + 1; i <= 12; i++) {

                var tdid = c + i;
                img_id = '';

                if (rows.indexOf(String(i)) != -1 && col.indexOf(String(c)) != -1 && blckedblocks1.indexOf(tdid) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == tdid) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {
                            queenvldmoves.push(tdid);

                        }
                        else if (img_id != '') {
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                            //    console.log('Check To  : ' + clr + " King at " + tdid);
                                chkto = 'Check To  : ' + clr + " King at " + tdid;

                            }
                        //    console.log('You can Kill : ' + img_id + " at " + tdid);
                            queenvldmoves.push(tdid);

                            break cmpltloop;
                        }
                    }
                    else if (img_id.substring(0, 1) == whichplayer) {
                        break cmpltloop;
                    }
                }
            }



        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------StraightCol END----------------------------------------------
        //----------------------------------------------------------------------------------------------------------



        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------StraightColBack START----------------------------------------------
        //----------------------------------------------------------------------------------------------------------
        //for (var i = parseInt(DropPieceRow) + 1; i < pickedPieceRow; i++) {
        cmpltloop1:
            for (var i = parseInt(pickedPieceRow) - 1; i >= 0; i--) {
                var tdid = c + i;
                img_id = '';

                if (rows.indexOf(String(i)) != -1 && col.indexOf(String(c)) != -1 && blckedblocks1.indexOf(tdid) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == tdid) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {
                            queenvldmoves.push(tdid);
                        }
                        else if (img_id != '') {
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                        //        console.log('Check To  : ' + clr + " King at " + tdid);
                                chkto = 'Check To  : ' + clr + " King at " + tdid;
                            }
                      //      console.log('You can Kill : ' + img_id + " at " + tdid);

                            queenvldmoves.push(tdid);
                            break cmpltloop1;
                        }
                    }
                    else if (img_id.substring(0, 1) == whichplayer) {
                        break cmpltloop1;
                    }
                }
            }


        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------StraightColBack END----------------------------------------------
        //----------------------------------------------------------------------------------------------------------


        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------RightHorizontalCol START----------------------------------------------
        //----------------------------------------------------------------------------------------------------------


        cmpltloop2:
            for (var i = pickColIndex + 1; i < 12; i++) {
                var tdid = col[i] + r;
                img_id = '';

                if (blckedblocks1.indexOf(tdid) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == tdid) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {

                            queenvldmoves.push(tdid);
                        }
                        else if (img_id != '') {
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                        //        console.log('Check To  : ' + clr + " King at " + tdid);
                                chkto = 'Check To  : ' + clr + " King at " + tdid;
                            }
                      //      console.log('You can Kill : ' + img_id + " at " + tdid);


                            queenvldmoves.push(tdid);
                            break cmpltloop2;
                        }
                    }
                    else if (img_id.substring(0, 1) == whichplayer) {
                        break cmpltloop2;
                    }
                }


            }



        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------RightHorizontalCol END----------------------------------------------
        //----------------------------------------------------------------------------------------------------------



        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------LefttHorizontalCol START----------------------------------------------
        //----------------------------------------------------------------------------------------------------------


        cmpltloop3:
            for (var i = pickColIndex - 1; i >= 0 ; i--) {

                var tdid = col[i] + r;
                img_id = '';

                if (blckedblocks1.indexOf(tdid) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == tdid) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {

                            queenvldmoves.push(tdid);
                        }
                        else if (img_id != '') {
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                           //     console.log('Check To  : ' + clr + " King at " + tdid);
                                chkto = 'Check To  : ' + clr + " King at " + tdid;
                            }
                        //    console.log('You can Kill : ' + img_id + " at " + tdid);

                            queenvldmoves.push(tdid);
                            break cmpltloop3;
                        }
                    }
                    else if (img_id.substring(0, 1) == whichplayer) {
                        break cmpltloop3;
                    }
                }

            }


        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------LefttHorizontalCol END----------------------------------------------
        //----------------------------------------------------------------------------------------------------------


        //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


        var pr = pickedPieceRow;
        pickColIndex = col.indexOf(pickedPieceColumn);

        //--------------------------------------------------------------------------------------------------------------------
        //--------------------------------------------------RightDiagonalCol Start--------------------------------------------
        //--------------------------------------------------------------------------------------------------------------------

        cmpltloop0:
            for (var i = pickColIndex + 1; i < 12; i++) {
                pr++;
                var tdid = col[i] + pr;
                img_id = '';

                if (rows.indexOf(String(pr)) != -1 && col.indexOf(String(col[i])) != -1 && blckedblocks1.indexOf(tdid) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == tdid) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {

                            queenvldmoves.push(tdid);
                        }
                        else if (img_id != '') {
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                             //   console.log('Check To  : ' + clr + " King at " + tdid);
                                chkto = 'Check To  : ' + clr + " King at " + tdid;
                            }
                     //       console.log('You can Kill : ' + img_id + " at " + tdid);

                            queenvldmoves.push(tdid);
                            break cmpltloop0;
                        }
                    }
                    else if (img_id.substring(0, 1) == whichplayer) {
                        break cmpltloop0;
                    }
                }

            }



        //--------------------------------------------------------------------------------------------------------------------
        //--------------------------------------------------RightDiagonalCol End----------------------------------------------
        //--------------------------------------------------------------------------------------------------------------------



        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------LeftDiagonal START-------------------------------------------------
        //----------------------------------------------------------------------------------------------------------

        var pr = pickedPieceRow;
        pickColIndex = col.indexOf(pickedPieceColumn);
        cmpltloop3:
            for (var i = pickColIndex - 1; i >= 0 ; i--) {
                pr++;
                var tdid = col[i] + pr;
                //  console.log("tdid : " + tdid);

                img_id = '';

                if (rows.indexOf(String(pr)) != -1 && col.indexOf(String(col[i])) != -1 && blckedblocks1.indexOf(tdid) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == tdid) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {

                            queenvldmoves.push(tdid);
                        }
                        else if (img_id != '') {
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                      //          console.log('Check To  : ' + clr + " King at " + tdid);
                                chkto = 'Check To  : ' + clr + " King at " + tdid;
                            }
                  //          console.log('You can Kill : ' + img_id + " at " + tdid);

                            queenvldmoves.push(tdid);
                            break cmpltloop3;
                        }
                    }
                    else if (img_id.substring(0, 1) == whichplayer) {
                        break cmpltloop3;
                    }
                }

            }


        //////----------------------------------------------------------------------------------------------------------
        // --------------------------------------LeftDiagonalCol END----------------------------------------------
        //----------------------------------------------------------------------------------------------------------


        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------RightDiagonalColDwn START----------------------------------------------
        //----------------------------------------------------------------------------------------------------------
        var cl = col.indexOf(pickedPieceColumn);
     //   console.log("pickedPieceColumn :--" + pickedPieceColumn + "----cl : " + cl)
        cmpltloop1:
            for (var i = parseInt(pickedPieceRow) - 1; i > 0; i--) {
                cl++;
                var tdid = (col[cl] + i);

                img_id = '';

                if (rows.indexOf(String(i)) != -1 && col.indexOf(String(col[cl])) != -1 && blckedblocks1.indexOf(tdid) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == tdid) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {

                            queenvldmoves.push(tdid);
                        }
                        else if (img_id != '') {
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                      //          console.log('Check To  : ' + clr + " King at " + tdid);
                                chkto = 'Check To  : ' + clr + " King at " + tdid;
                            }
                     //       console.log('You can Kill : ' + img_id + " at " + tdid);

                            queenvldmoves.push(tdid);
                            break cmpltloop1;
                        }
                    }
                    else if (img_id.substring(0, 1) == whichplayer) {
                        break cmpltloop1;
                    }
                }
            }


        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------RightDiagonalColDwn END----------------------------------------------
        //----------------------------------------------------------------------------------------------------------

        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------LeftDiagonalColDwn Start----------------------------------------------
        //----------------------------------------------------------------------------------------------------------

        var cl = col.indexOf(pickedPieceColumn);

        cmpltloop:
            for (var i = parseInt(pickedPieceRow) - 1; i > 0; i--) {
                cl--;
                var tdid = (col[cl] + i);
                img_id = '';

                if (rows.indexOf(String(i)) != -1 && col.indexOf(String(col[cl])) != -1 && blckedblocks1.indexOf(tdid) == -1) {
                    f1:
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == tdid) {
                                img_id = pieceslists.pieces[j].imgids;
                                break f1;
                            }
                        }
                    if (img_id.substring(0, 1) != whichplayer) {
                        if (img_id == '') {

                            queenvldmoves.push(tdid);
                        }
                        else if (img_id != '') {
                            if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                whchcolor(img_id.substring(0, 1));
                    //            console.log('Check To  : ' + clr + " King at " + tdid);
                                chkto = 'Check To  : ' + clr + " King at " + tdid;
                            }
                   //         console.log('You can Kill : ' + img_id + " at " + tdid);

                            queenvldmoves.push(tdid);
                            break cmpltloop;
                        }
                    }
                    else if (img_id.substring(0, 1) == whichplayer) {
                        break cmpltloop;
                    }
                }
            }


        //----------------------------------------------------------------------------------------------------------
        // --------------------------------------LeftDiagonal END----------------------------------------------
        //----------------------------------------------------------------------------------------------------------


    //    console.log(queenvldmoves);

    }
    
    function kingMovement(lcol1, rcol1, pickedRow, pickedCol, lrow1, rrow1, whichPlayer) {

        var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
        var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        var blckedblocks1 = ['a1', 'b1', 'a2', 'b2', 'a11', 'b11', 'a12', 'b12', 'k1', 'k2', 'k11', 'k12', 'l1', 'l2', 'l11', 'l12'];
        var stringjson = JSON.stringify(colarray);
        var pieceslists = JSON.parse(stringjson);
        kngvldmoves = [];
        var leftCol = lcol1;
        var rightCol = rcol1;
        var leftRow = lrow1;
        var rightRow = rrow1;
        var pickedPieceColumn = pickedCol;
        var pickedPieceRow = pickedRow;
        var whichplayer = whichPlayer;

  //      console.log(lcol1 + " - " + rcol1 + " - " + pickedRow + " - " + pickedCol + " - " + lrow1 + " - " + rrow1 + " - " + whichPlayer);

        kingMoves = [];


        switch (whichplayer) {

            case 'w':
                kingMoves.push(leftCol + (parseInt(pickedPieceRow) + 1), leftCol + (parseInt(pickedPieceRow) - 1), leftCol + pickedPieceRow)
                kingMoves.push(rightCol + (parseInt(pickedPieceRow) + 1), rightCol + (parseInt(pickedPieceRow) - 1), rightCol + pickedPieceRow);
                kingMoves.push(pickedPieceColumn + (parseInt(pickedPieceRow) + 1), pickedPieceColumn + (parseInt(pickedPieceRow) - 1));
                break;
            case 'b':
                kingMoves.push(leftCol + (parseInt(pickedPieceRow) + 1), leftCol + (parseInt(pickedPieceRow) - 1), leftCol + pickedPieceRow)
                kingMoves.push(rightCol + (parseInt(pickedPieceRow) + 1), rightCol + (parseInt(pickedPieceRow) - 1), rightCol + pickedPieceRow);
                kingMoves.push(pickedPieceColumn + (parseInt(pickedPieceRow) + 1), pickedPieceColumn + (parseInt(pickedPieceRow) - 1));
                break;
            case 'g':
                kingMoves.push(col[(col.indexOf(pickedPieceColumn) - 1)] + leftRow, pickedPieceColumn + leftRow, col[(col.indexOf(pickedPieceColumn) + 1)] + leftRow);
                kingMoves.push(col[(col.indexOf(pickedPieceColumn) - 1)] + rightRow, pickedPieceColumn + rightRow, col[(col.indexOf(pickedPieceColumn) + 1)] + rightRow);
                kingMoves.push(col[(col.indexOf(pickedPieceColumn) - 1)] + pickedPieceRow, col[(col.indexOf(pickedPieceColumn) + 1)] + pickedPieceRow);
                break;
            case 'r':
                kingMoves.push(col[(col.indexOf(pickedPieceColumn) - 1)] + leftRow, pickedPieceColumn + leftRow, col[(col.indexOf(pickedPieceColumn) + 1)] + leftRow);
                kingMoves.push(col[(col.indexOf(pickedPieceColumn) - 1)] + rightRow, pickedPieceColumn + rightRow, col[(col.indexOf(pickedPieceColumn) + 1)] + rightRow);
                kingMoves.push(col[(col.indexOf(pickedPieceColumn) - 1)] + pickedPieceRow, col[(col.indexOf(pickedPieceColumn) + 1)] + pickedPieceRow);
                break;
        }
        //kngvldmoves

    //    console.log(kingMoves);
        cmpltloop5:
            for (var i = 0; i < kingMoves.length; i++) {
                for (var j = 0; j < pieceslists.pieces.length; j++) {
                    if (pieceslists.pieces[j].colid == kingMoves[i]) {
                        img_id = pieceslists.pieces[j].imgids;
                        if (img_id.substring(0, 1) != whichplayer) {
                            if (img_id == '') {

                            }
                            else if (img_id != '') {
                                if (img_id.substring(1, img_id.length) == 'K' || img_id.substring(1, img_id.length) == 'King') {
                                    whchcolor(img_id.substring(0, 1));
                          //          console.log('Check To  : ' + clr + " King at " + tdid);
                                    chkto = 'Check To  : ' + clr + " King at " + tdid;
                                }
                                else {
                         //           console.log('You can Kill : ' + img_id + " at " + tdid);
                                }

                            }
                        }
                        else if (img_id.substring(0, 1) == whichplayer) {
                            break cmpltloop5;
                        }
                    }
                }
            }
        
        for (var i = 0; i < kingMoves.length; i++) {
            for (var j = 0; j < pieceslists.pieces.length; j++) {
                if (pieceslists.pieces[j].colid == String(kingMoves[i])) {
                    img_id = pieceslists.pieces[j].imgids;
                    if (img_id.substring(0, 1) != whichplayer) {
                        kngvldmoves.push(kingMoves[i]);
                        kngvldmoves.push(kingMoves[i]);
                    }
                    else if (img_id == '') {

                        kngvldmoves.push(kingMoves[i]);
                        kngvldmoves.push(kingMoves[i]);
                    }
                }
            }
        }

        
       
    }


    //------------------------------------------------------FUNCTIONS END-----------------------------------------------------------------------------
     


    //------------------------------------------------------MOVES UPDATION METHOD START----------------------------------------------------------------------

    socket.on('record data', function (msg) {
   //     console.log(msg);
        if (msg == 'Player1' || msg == 'Player2' || msg == 'Player3' || msg == 'Player4') {

            //undowhitecolarray,undogreencolarray,undoblackcolarray,undoredcolarray

            //if (plyr == 'w') {
            //    socket.username = 'Player1';
            //    usrnm = 'Player1';
            //}
            //else if (plyr == 'g') {
            //    socket.username = 'Player2';
            //    usrnm = 'Player2';
            //}
            //else if (plyr == 'b') {
            //    socket.username = 'Player3';
            //    usrnm = 'Player3';
            //}
            //else if (plyr == 'r') {
            //    socket.username = 'Player4';
            //    usrnm = 'Player4';
            //}

            //var stringjson = JSON.stringify(colarray);
            //var pieceslists = JSON.parse(stringjson);

            for (var j = 0; j < colarray.pieces.length; j++) {
                colarray.pieces[j].colid = '';
                colarray.pieces[j].imgids = '';
                colarray.pieces[j].imgs = '';
            }


            if (msg == 'Player1') {
                for (var i = 0; i < undowhitecolarray.pieces.length; i++) {
                    colarray.pieces[i].colid = undowhitecolarray.pieces[i].colid;
                    colarray.pieces[i].imgids = undowhitecolarray.pieces[i].imgids;
                    colarray.pieces[i].imgs = undowhitecolarray.pieces[i].imgs;
                }
                plyr = 'w';
                socket.username = 'Player1';
                usrnm = 'Player1';
                stringjson = JSON.stringify(undowhitecolarray);
            }
            else if (msg == 'Player2') {
                for (var i = 0; i < undogreencolarray.pieces.length; i++) {
                    colarray.pieces[i].colid = undogreencolarray.pieces[i].colid;
                    colarray.pieces[i].imgids = undogreencolarray.pieces[i].imgids;
                    colarray.pieces[i].imgs = undogreencolarray.pieces[i].imgs;
                }
                plyr = 'g';
                socket.username = 'Player2';
                usrnm = 'Player2';
                stringjson = JSON.stringify(undogreencolarray);
            }
            else if (msg == 'Player3') {
                for (var i = 0; i < undoblackcolarray.pieces.length; i++) {
                    colarray.pieces[i].colid = undoblackcolarray.pieces[i].colid;
                    colarray.pieces[i].imgids = undoblackcolarray.pieces[i].imgids;
                    colarray.pieces[i].imgs = undoblackcolarray.pieces[i].imgs;
                }
                plyr = 'b';
                socket.username = 'Player3';
                usrnm = 'Player3';
                stringjson = JSON.stringify(undoblackcolarray);
            }
            else if (msg == 'Player4') {
                for (var i = 0; i < undoredcolarray.pieces.length; i++) {
                    colarray.pieces[i].colid = undoredcolarray.pieces[i].colid;
                    colarray.pieces[i].imgids = undoredcolarray.pieces[i].imgids;
                    colarray.pieces[i].imgs = undoredcolarray.pieces[i].imgs;
                    //colarray.pieces.push({
                    //    "colid": undoredcolarray.pieces[i].colid,
                    //    "imgids": undoredcolarray.pieces[i].imgids,
                    //    "imgs": undoredcolarray.pieces[i].imgs
                    //});
                }
                plyr = 'r';
                socket.username = 'Player4';
                usrnm = 'Player4';
                stringjson = JSON.stringify(undoredcolarray);
            }

            stts = "true";
            gamstarted = 1;

           // console.log(socket.username + '-----------' + stringjson + '-----------' + gamstarted + '-----------' + plyr + '-----------' + stts);
            io.sockets.emit('updateboard1', socket.username, stringjson, gamstarted, plyr, stts);
        }
        else {
            var wimgs = ["wP.png", "wR.png", "wN.png", "wB.png", "wQ.png", "wK.png"];
            var gimgs = ["GPawn.png", "GRook.png", "GKnight.png", "GBishop.png", "GQueen.png", "GKing.png"];
            var bimgs = ["bP.png", "bR.png", "bN.png", "bB.png", "bQ.png", "bK.png"];
            var rimgs = ["rPawn.png", "rRook.png", "rKnight.png", "rBishop.png", "rQueen.png", "rKing.png"];

            obj = JSON.parse(msg);
            var data = obj.data;
            var piecepicked = obj.piecepicked;
            var whichplayer = obj.whichplayer;
            var pickpiecefrom = obj.pickpiecefrom;
            var placepieceat = obj.placepieceat;
            var elementType = obj.elementType;
            var pickedPieceRow = obj.pickedPieceRow;
            var pickedPieceColumn = obj.pickedPieceColumn;
            var stringjson = JSON.stringify(colarray);
            var pieceslists = JSON.parse(stringjson);
            var DropPieceRow;
            var DropPieceColumn;
            var dropPlayer;
            var dropPlayerfullnm = '';
            var htmlstr1 = obj.htmlstr;
            var moveTowards = "";
            DropPieceRow = obj.DropPieceRow;
            DropPieceColumn = obj.DropPieceColumn;
            placepieceat = DropPieceColumn + DropPieceRow;
            dropPlayer = obj.dropPlayer;
            dropPlayerfullnm = obj.dropPlayerfullnm;
            var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
            var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
            var blckedblocks1 = ['a1', 'b1', 'a2', 'b2', 'a11', 'b11', 'a12', 'b12', 'k1', 'k2', 'k11', 'k12', 'l1', 'l2', 'l11', 'l12'];
            var leftCol;
            var rightCol;
            var leftRow;
            var rightRow;
            inBetImg = false;
            var i;
            var j;
            var pickColIndex;
            var dropColIndex;


            if (whichplayer == 'w' || whichplayer == 'b') {
                var a = col.indexOf(pickedPieceColumn);
                leftCol = col[a - 1];
                rightCol = col[a + 1];
                i = pickedPieceRow;
                j = DropPieceRow;
                pickColIndex = col.indexOf(pickedPieceColumn);
                dropColIndex = col.indexOf(DropPieceColumn);
            }
            else {
                leftRow = parseInt(pickedPieceRow) + 1;
                rightRow = parseInt(pickedPieceRow) - 1;
                i = col.indexOf(pickedPieceColumn);
                j = col.indexOf(DropPieceColumn);
            }


            /*********    For Straight Columns & Rows   *********/

            var kingMoves = [];
            var knightMoves = [];


            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //-----------------------------------------------------Check If King Reached Corner Bishop Captured Start-------------------------------------------------------------
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------


            var wImgids1 = ["wP1", "wP2", "wP3", "wP4", "wP5", "wP6", "wP7", "wP8", "wR1", "wR2", "wN1", "wN2", "wB1", "wB2", "wQ", "wK"];
            var gImgids1 = ["gP1", "gP2", "gP3", "gP4", "gP5", "gP6", "gP7", "gP8", "gR1", "gR2", "gN1", "gN2", "gB1", "gB2", "gQ", "gK"];
            var bImgids1 = ["bP1", "bP2", "bP3", "bP4", "bP5", "bP6", "bP7", "bP8", "bR1", "bR2", "bN1", "bN2", "bB1", "bB2", "bQ", "bK"];
            var rImgids1 = ["rP1", "rP2", "rP3", "rP4", "rP5", "rP6", "rP7", "rP8", "rR1", "rR2", "rN1", "rN2", "rB1", "rB2", "rQ", "rK"];

            var WbishopCaptured = 0;
            var GbishopCaptured = 0;
            var BbishopCaptured = 0;
            var RbishopCaptured = 0;

            for (var i = 0; i < captured.length; i++) {
                if ((captured[i] == "wB1" || captured[i] == "wB2")) {
                    WbishopCaptured += 1;
                }
                else if ((captured[i] == "gB1" || captured[i] == "gB2")) {
                    GbishopCaptured += 1;
                }
                else if ((captured[i] == "bB1" || captured[i] == "bB2")) {
                    BbishopCaptured += 1;
                }
                else if ((captured[i] == "rB1" || captured[i] == "rB2")) {
                    RbishopCaptured += 1;
                }
            }



            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
            //-----------------------------------------------------Check If King Reached Corner Bishop Captured End---------------------------------------------------------------
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------



            ////    switch (whichplayer) {

            ////        case 'w':
            ////            for (var i = parseInt(pickedPieceRow) + 1; i < DropPieceRow; i++) {
            ////                straightCol.push(pickedPieceColumn + i);
            ////            }
            ////            for (var i = parseInt(DropPieceRow) + 1; i < pickedPieceRow; i++) {
            ////                straightColBack.push(pickedPieceColumn + i);
            ////            }
            ////            for (var i = pickColIndex + 1; i < dropColIndex; i++) {
            ////                rightHorizontalCol.push(col[i] + pickedPieceRow);
            ////            }
            ////            for (var i = dropColIndex + 1; i < pickColIndex ; i++) {
            ////                lefttHorizontalCol.push(col[i] + pickedPieceRow);
            ////            }
            ////            break;

            ////        case 'b':
            ////            for (var i = parseInt(DropPieceRow) + 1; i < pickedPieceRow; i++) {
            ////                straightCol.push(pickedPieceColumn + i);
            ////            }
            ////            for (var i = parseInt(pickedPieceRow) + 1; i < DropPieceRow; i++) {
            ////                straightColBack.push(pickedPieceColumn + i);
            ////            }
            ////            for (var i = pickColIndex + 1; i < dropColIndex; i++) {
            ////                lefttHorizontalCol.push(col[i] + pickedPieceRow);
            ////            }
            ////            for (var i = dropColIndex + 1; i < pickColIndex; i++) {
            ////                rightHorizontalCol.push(col[i] + pickedPieceRow);
            ////            }
            ////            break;

            ////        case 'g':
            ////            for (var i = col.indexOf(pickedPieceColumn) + 1; i < col.indexOf(DropPieceColumn) ; i++) {
            ////                straightCol.push(col[i] + DropPieceRow);
            ////            }
            ////            for (var i = col.indexOf(DropPieceColumn) + 1; i < col.indexOf(pickedPieceColumn) ; i++) {
            ////                straightColBack.push(col[i] + DropPieceRow);
            ////            }
            ////            for (var i = parseInt(pickedPieceRow) + 1; i < DropPieceRow; i++) {
            ////                lefttHorizontalCol.push(pickedPieceColumn + i);
            ////            }
            ////            for (var i = parseInt(DropPieceRow) + 1; i < pickedPieceRow; i++) {
            ////                rightHorizontalCol.push(pickedPieceColumn + i);
            ////            }
            ////            break;

            ////        case 'r':
            ////            for (var i = col.indexOf(DropPieceColumn) + 1; i < col.indexOf(pickedPieceColumn) ; i++) {
            ////                straightCol.push(col[i] + DropPieceRow);
            ////            }
            ////            for (var i = col.indexOf(pickedPieceColumn) + 1; i < col.indexOf(DropPieceColumn) ; i++) {
            ////                straightColBack.push(col[i] + DropPieceRow);
            ////            }
            ////            for (var i = parseInt(pickedPieceRow) + 1; i < DropPieceRow; i++) {
            ////                rightHorizontalCol.push(pickedPieceColumn + i);
            ////            }
            ////            for (var i = parseInt(DropPieceRow) + 1; i < pickedPieceRow; i++) {
            ////                lefttHorizontalCol.push(pickedPieceColumn + i);
            ////            }
            ////            break;
            ////}






            var state = "";
            var nxtplr = "";

            var pc = "";
            var plrclr = "";

            if (piecepicked == "P") {
                pc = "Pawn";
            }
            else if (piecepicked == "R") {
                pc = "Rook";
            }
            else if (piecepicked == "N") {
                pc = "Knight";
            }
            else if (piecepicked == "B") {
                pc = "Bishop";
            }
            else if (piecepicked == "Q") {
                pc = "Queen";
            }
            else if (piecepicked == "K") {
                pc = "King";
            }

            if (whichplayer == "w") {
                plrclr = "White";
            }
            else if (whichplayer == "g") {
                plrclr = "Green";
            }
            else if (whichplayer == "b") {
                plrclr = "Black";
            }
            else if (whichplayer == "r") {
                plrclr = "Red";
            }

            var pckcolid = pickedPieceColumn + pickedPieceRow;
            var drpcolid = DropPieceColumn + DropPieceRow;


            function straightMoves() {
                // function straightMoves(whichPlayer, r, c, DropPieceRow, DropPieceColumn) {
                //console.log('In straightMoves');
                //var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
                //var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
                //var blckedblocks1 = ['a1', 'b1', 'a2', 'b2', 'a11', 'b11', 'a12', 'b12', 'k1', 'k2', 'k11', 'k12', 'l1', 'l2', 'l11', 'l12'];
                //var stringjson = JSON.stringify(colarray);
                //var pickedPieceColumn = c;
                //var pieceslists = JSON.parse(stringjson);
                //var whichplayer = whichPlayer;
                //var pickedPieceRow = r;
                //var pickColIndex = col.indexOf(String(c));
                //var dropColIndex = col.indexOf(String(DropPieceColumn));
                //var DropPieceRow = DropPieceRow;
                straightCol = []; straightColBack = []; rightHorizontalCol = []; lefttHorizontalCol = [];

                switch (whichplayer) {
                    case 'w':
                        for (var i = parseInt(pickedPieceRow) + 1; i < DropPieceRow; i++) {
                            straightCol.push(pickedPieceColumn + i);
                        }
                        for (var i = parseInt(DropPieceRow) + 1; i < pickedPieceRow; i++) {
                            straightColBack.push(pickedPieceColumn + i);
                        }
                        for (var i = pickColIndex + 1; i < dropColIndex; i++) {
                            rightHorizontalCol.push(col[i] + pickedPieceRow);
                        }
                        for (var i = dropColIndex + 1; i < pickColIndex ; i++) {
                            lefttHorizontalCol.push(col[i] + pickedPieceRow);
                        }
                        break;

                    case 'b':
                        for (var i = parseInt(DropPieceRow) + 1; i < pickedPieceRow; i++) {
                            straightCol.push(pickedPieceColumn + i);
                        }
                        for (var i = parseInt(pickedPieceRow) + 1; i < DropPieceRow; i++) {
                            straightColBack.push(pickedPieceColumn + i);
                        }
                        for (var i = pickColIndex + 1; i < dropColIndex; i++) {
                            lefttHorizontalCol.push(col[i] + pickedPieceRow);
                        }
                        for (var i = dropColIndex + 1; i < pickColIndex; i++) {
                            rightHorizontalCol.push(col[i] + pickedPieceRow);
                        }
                        break;

                    case 'g':
                        for (var i = col.indexOf(pickedPieceColumn) + 1; i < col.indexOf(DropPieceColumn) ; i++) {
                            straightCol.push(col[i] + DropPieceRow);
                        }
                        for (var i = col.indexOf(DropPieceColumn) + 1; i < col.indexOf(pickedPieceColumn) ; i++) {
                            straightColBack.push(col[i] + DropPieceRow);
                        }
                        for (var i = parseInt(pickedPieceRow) + 1; i < DropPieceRow; i++) {
                            lefttHorizontalCol.push(pickedPieceColumn + i);
                        }
                        for (var i = parseInt(DropPieceRow) + 1; i < pickedPieceRow; i++) {
                            rightHorizontalCol.push(pickedPieceColumn + i);
                        }
                        break;

                    case 'r':
                        for (var i = col.indexOf(DropPieceColumn) + 1; i < col.indexOf(pickedPieceColumn) ; i++) {
                            straightCol.push(col[i] + DropPieceRow);
                        }
                        for (var i = col.indexOf(pickedPieceColumn) + 1; i < col.indexOf(DropPieceColumn) ; i++) {
                            straightColBack.push(col[i] + DropPieceRow);
                        }
                        for (var i = parseInt(pickedPieceRow) + 1; i < DropPieceRow; i++) {
                            rightHorizontalCol.push(pickedPieceColumn + i);
                        }
                        for (var i = parseInt(DropPieceRow) + 1; i < pickedPieceRow; i++) {
                            lefttHorizontalCol.push(pickedPieceColumn + i);
                        }
                        break;
                }


                forloops:
                    for (var i = 0; i < straightCol.length; i++) {
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == straightCol[i]) {
                                var a = pieceslists.pieces[j].imgids;
                                if (a == '') {
                                    //  console.log('No Img on the Way');
                                }
                                else {
                                    inBetImg = true;
                                    //    console.log('Img on the Way');
                                    break forloops;
                                }
                            }
                            else {

                            }
                        }
                    }

                forloops1:
                    for (var i = 0; i < straightColBack.length; i++) {
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == straightColBack[i]) {
                                var a = pieceslists.pieces[j].imgids;
                                if (a == '') {
                                    //       console.log('No Img on the Way');
                                }
                                else {
                                    inBetImg = true;
                                    //    console.log('Img on the Way');
                                    break forloops1;
                                }
                            }
                            else {

                            }
                        }
                    }

                forloops2:
                    for (var i = 0; i < lefttHorizontalCol.length; i++) {
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == lefttHorizontalCol[i]) {
                                var a = pieceslists.pieces[j].imgids;
                                if (a == '') {
                                    //    console.log('No Img on the Way');
                                }
                                else {
                                    inBetImg = true;
                                    //       console.log('Img on the Way');
                                    break forloops2;
                                }
                            }
                            else {

                            }
                        }
                    }
                forloops3:
                    for (var i = 0; i < rightHorizontalCol.length; i++) {
                        for (var j = 0; j < pieceslists.pieces.length; j++) {
                            if (pieceslists.pieces[j].colid == rightHorizontalCol[i]) {
                                var a = pieceslists.pieces[j].imgids;
                                if (a == '') {
                                    //    console.log('No Img on the Way');
                                }
                                else {
                                    inBetImg = true;
                                    //     console.log('Img on the Way');
                                    break forloops3;
                                }
                            }
                            else {

                            }
                        }
                    }



            }

            // function digonalMoves(whichPlayer, r, c, DropPieceRow, DropPieceColumn, placepieceat) {
            function digonalMoves() {
                //var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
                //var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
                //var blckedblocks1 = ['a1', 'b1', 'a2', 'b2', 'a11', 'b11', 'a12', 'b12', 'k1', 'k2', 'k11', 'k12', 'l1', 'l2', 'l11', 'l12'];
                //var stringjson = JSON.stringify(colarray);
                //var pieceslists = JSON.parse(stringjson);
                //var whichplayer = whichPlayer;
                //var pickedPieceRow = r;
                //var pickedPieceColumn = String(c);
                //var DropPieceColumn = String(DropPieceColumn);
                //var pickColIndex = col.indexOf(String(c));
                //var dropColIndex = col.indexOf(String(DropPieceColumn));
                //var DropPieceRow = DropPieceRow;
                //// var placepieceat='';


                rightDiagonalCol = [];
                leftDiagonalCol = [];
                leftDiagonalColDown = [];
                rightDiagonalColDown = [];

                inBetImg = false;
                switch (whichplayer) {
                    case 'w':
                        var pr = pickedPieceRow;
                        for (var i = col.indexOf(pickedPieceColumn) + 1 ; i <= col.indexOf(DropPieceColumn) ; i++) {
                            pr++;
                            rightDiagonalCol.push(col[i] + pr);
                        }
                        var pr = pickedPieceRow;
                        for (var i = col.indexOf(pickedPieceColumn) - 1 ; i >= col.indexOf(DropPieceColumn) ; i--) {
                            pr++;
                            leftDiagonalCol.push(col[i] + pr);
                        }
                        var cl = col.indexOf(pickedPieceColumn);
                        for (var i = parseInt(pickedPieceRow) - 1 ; i >= DropPieceRow; i--) {
                            cl--;
                            leftDiagonalColDown.push(col[cl] + i);
                        }
                        var cl = col.indexOf(pickedPieceColumn);
                        for (var i = parseInt(pickedPieceRow) - 1; i >= DropPieceRow  ; i--) {
                            cl++;
                            rightDiagonalColDown.push(col[cl] + i);
                        }
                        break;

                    case 'b':

                        var pr = pickedPieceRow;
                        for (var i = col.indexOf(pickedPieceColumn) + 1 ; i <= col.indexOf(DropPieceColumn) ; i++) {
                            pr--;
                            leftDiagonalCol.push(col[i] + pr);
                        }
                        var pr = pickedPieceRow;
                        for (var i = col.indexOf(pickedPieceColumn) - 1 ; i >= col.indexOf(DropPieceColumn) ; i--) {
                            pr--;
                            rightDiagonalCol.push(col[i] + pr);
                        }
                        var cl = col.indexOf(pickedPieceColumn);
                        for (var i = parseInt(pickedPieceRow) + 1 ; i <= DropPieceRow; i++) {
                            cl--;
                            rightDiagonalColDown.push(col[cl] + i);
                        }
                        var cl = col.indexOf(pickedPieceColumn);
                        for (var i = parseInt(pickedPieceRow) + 1; i <= DropPieceRow  ; i++) {
                            cl++;
                            leftDiagonalColDown.push(col[cl] + i);
                        }
                        break;
                    case 'g':

                        var pr = pickedPieceRow;
                        for (var i = col.indexOf(pickedPieceColumn) + 1 ; i <= col.indexOf(DropPieceColumn) ; i++) {
                            pr++;
                            leftDiagonalCol.push(col[i] + pr);
                        }
                        var pr = pickedPieceRow;
                        for (var i = col.indexOf(pickedPieceColumn) + 1 ; i <= col.indexOf(DropPieceColumn) ; i++) {
                            pr--;
                            rightDiagonalCol.push(col[i] + pr);
                        }

                        var cl = col.indexOf(pickedPieceColumn);
                        for (var i = parseInt(pickedPieceRow) - 1 ; i >= DropPieceRow; i--) {
                            cl--;
                            rightDiagonalColDown.push(col[cl] + i);
                        }

                        var cl = col.indexOf(pickedPieceColumn);
                        for (var i = parseInt(pickedPieceRow) + 1 ; i <= DropPieceRow; i++) {
                            cl--;
                            leftDiagonalColDown.push(col[cl] + i);
                        }
                        break;
                    case 'r':
                        var pr = pickedPieceRow;
                        for (var i = col.indexOf(pickedPieceColumn) - 1 ; i >= col.indexOf(DropPieceColumn) ; i--) {
                            pr--;
                            leftDiagonalCol.push(col[i] + pr);
                        }
                        var pr = pickedPieceRow;
                        for (var i = col.indexOf(pickedPieceColumn) - 1 ; i >= col.indexOf(DropPieceColumn) ; i--) {
                            pr++;
                            rightDiagonalCol.push(col[i] + pr);
                        }

                        var cl = col.indexOf(pickedPieceColumn);
                        for (var i = parseInt(pickedPieceRow) + 1 ; i <= DropPieceRow; i++) {
                            cl++;
                            rightDiagonalColDown.push(col[cl] + i);
                        }

                        var cl = col.indexOf(pickedPieceColumn);
                        for (var i = parseInt(pickedPieceRow) - 1 ; i >= DropPieceRow; i--) {
                            cl++;
                            leftDiagonalColDown.push(col[cl] + i);
                        }
                        break;
                }
                for (var i = 0; i < rightDiagonalCol.length; i++) {
                    if (rightDiagonalCol[i] == placepieceat) {
                        moveTowards = "Right Diagonal";
                    }
                }
                for (var i = 0; i < leftDiagonalCol.length; i++) {
                    if (leftDiagonalCol[i] == placepieceat) {
                        moveTowards = "Left Diagonal";
                    }
                }
                for (var i = 0; i < rightDiagonalColDown.length; i++) {
                    if (rightDiagonalColDown[i] == placepieceat) {
                        moveTowards = "Right Diagonal Down";
                    }
                }
                for (var i = 0; i < leftDiagonalColDown.length; i++) {
                    if (leftDiagonalColDown[i] == placepieceat) {
                        moveTowards = "Left Diagonal Down";
                    }
                }

                if (moveTowards == "Left Diagonal") {
                    forloops1:
                        for (var i = 0; i < leftDiagonalCol.length - 1; i++) {
                            for (var j = 0; j < pieceslists.pieces.length; j++) {
                                if (pieceslists.pieces[j].colid == leftDiagonalCol[i]) {

                                    var a = pieceslists.pieces[j].imgids;
                                    if (a == '') {
                                        // console.log('No Img on the Way');
                                    }
                                    else {
                                        inBetImg = true;
                                        //                       console.log('Img on the Way');
                                        break forloops1;
                                    }
                                }
                                else {

                                }
                            }
                        }

                }
                else if (moveTowards == "Right Diagonal") {
                        forloops1:
                        for (var i = 0; i < rightDiagonalCol.length - 1; i++) {
                            for (var j = 0; j < pieceslists.pieces.length; j++) {
                                if (pieceslists.pieces[j].colid == rightDiagonalCol[i]) {
                                    var a = pieceslists.pieces[j].imgids;
                                    if (a == '') {
                                        //   console.log('No Img on the Way');
                                    }
                                    else {
                                        inBetImg = true;
                                        //  console.log('Img on the Way');
                                        break forloops1;
                                    }
                                }
                                else {

                                }
                            }
                        }

                }
                else if (moveTowards == "Left Diagonal Down") {
                        forloops1:
                        for (var i = 0; i < leftDiagonalColDown.length - 1; i++) {
                            for (var j = 0; j < pieceslists.pieces.length; j++) {
                                if (pieceslists.pieces[j].colid == leftDiagonalColDown[i]) {
                                    var a = pieceslists.pieces[j].imgids;
                                    if (a == '') {
                                        //     console.log('No Img on the Way');
                                    }
                                    else {
                                        inBetImg = true;
                                        //    console.log('Img on the Way');
                                        break forloops1;
                                    }
                                }
                                else {

                                }
                            }
                        }


                }
                else if (moveTowards == "Right Diagonal Down") {
                        forloops1:
                        for (var i = 0; i < rightDiagonalColDown.length - 1; i++) {
                            for (var j = 0; j < pieceslists.pieces.length; j++) {
                                if (pieceslists.pieces[j].colid == rightDiagonalColDown[i]) {
                                    var a = pieceslists.pieces[j].imgids;
                                    if (a == '') {
                                        //    console.log('No Img on the Way');
                                    }
                                    else {
                                        inBetImg = true;
                                        //     console.log('Img on the Way');
                                        break forloops1;
                                    }
                                }
                                else {

                                }
                            }
                        }


                }

            }


            function validMoves(ig, dropPlayerfullnm) {


                var i = 1;
                // ifportion:
                if (i == 1) {



                    // validMoves(ig, msg, pckcolid, drpcolid);
                    //validMoves(ig, msg, pckcolid, drpcolid, plrclr, pc);
                    ////------------------------------------------------------------------------------------------------------------------------------------------

                    ////----------------------------------------------------------------------------------------------------------------------------------------

                    var wimgs = ["wP.png", "wR.png", "wN.png", "wB.png", "wQ.png", "wK.png"];
                    var gimgs = ["GPawn.png", "GRook.png", "GKnight.png", "GBishop.png", "GQueen.png", "GKing.png"];
                    var bimgs = ["bP.png", "bR.png", "bN.png", "bB.png", "bQ.png", "bK.png"];
                    var rimgs = ["rPawn.png", "rRook.png", "rKnight.png", "rBishop.png", "rQueen.png", "rKing.png"];

                    var wrmvimgids = ["wP1", "wP2", "wP3", "wP4", "wP5", "wP6", "wP7", "wP8", "wR1", "wR2", "wN1", "wN2", "wB1", "wB2", "wQ", "wK"];
                    var grmvimgids = ["gP1", "gP2", "gP3", "gP4", "gP5", "gP6", "gP7", "gP8", "gR1", "gR2", "gN1", "gN2", "gB1", "gB2", "gK", "gQ"];
                    var brmvimgids = ["bP1", "bP2", "bP3", "bP4", "bP5", "bP6", "bP7", "bP8", "bR1", "bR2", "bN1", "bN2", "bB1", "bB2", "bQ", "bK"];
                    var rrmvimgids = ["rP1", "rP2", "rP3", "rP4", "rP5", "rP6", "rP7", "rP8", "rR1", "rR2", "rN1", "rN2", "rB1", "rB2", "rK", "rQ"];

                    // console.log("dropPlayer :" + dropPlayer + ".   ........whichplayer : " + whichplayer + "   ........dropPlayerfullnm: " + dropPlayerfullnm);

                    ////------------------------------------------------------------------------------------------------------------------------------------------
                    if (elementType == "IMG" || dropPlayer != '') {

                        var kng = '';
                        var imgnm = '';
                        //     console.log("dropPlayerfullnm : " + dropPlayerfullnm);
                        switch (dropPlayerfullnm.substring(0, 1)) {
                            case 'w':
                                switch (dropPlayerfullnm.substring(0, 2)) {
                                    case 'wP': imgnm = wimgs[0];
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": wimgs[0]
                                        });
                                        break;
                                    case 'wR': imgnm = wimgs[1];
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": wimgs[1]
                                        });
                                        break;
                                    case 'wN': imgnm = wimgs[2];
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": wimgs[2]
                                        });
                                        break;
                                    case 'wB': imgnm = wimgs[3];
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": wimgs[3]
                                        });
                                        break;
                                    case 'wQ': imgnm = wimgs[4];
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": wimgs[4]
                                        });
                                        break;
                                    case 'wK': imgnm = wimgs[5]; wKing = 0; kng = 'rKing';
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": wimgs[5]
                                        });
                                        break;
                                }

                                break;
                            case 'b':
                                switch (dropPlayerfullnm.substring(0, 2)) {
                                    case 'bP': imgnm = bimgs[0];
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": bimgs[0]
                                        });
                                        break;
                                    case 'bR': imgnm = bimgs[1];
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": bimgs[1]
                                        });
                                        break;
                                    case 'bN': imgnm = bimgs[2];
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": bimgs[2]
                                        });
                                        break;
                                    case 'bB': imgnm = bimgs[3];
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": bimgs[3]
                                        });
                                        break;
                                    case 'bQ': imgnm = bimgs[4];
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": bimgs[4]
                                        });
                                        break;
                                    case 'bK': imgnm = bimgs[5]; bKing = 0; kng = 'bKing';
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": bimgs[5]
                                        });
                                        break;
                                }
                                break;
                            case 'g':

                                switch (dropPlayerfullnm.substring(0, 2)) {
                                    case 'gP': imgnm = gimgs[0];
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": gimgs[0]
                                        });
                                        break;
                                    case 'gR': imgnm = gimgs[1];
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": gimgs[1]
                                        });
                                        break;
                                    case 'gN': imgnm = gimgs[2];
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": gimgs[2]
                                        });
                                        break;
                                    case 'gB': imgnm = gimgs[3];
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": gimgs[3]
                                        });
                                        break;
                                    case 'gQ': imgnm = gimgs[4];
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": gimgs[4]
                                        });
                                        break;

                                    case 'gK': imgnm = gimgs[5]; gKing = 0; kng = 'gKing';
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": gimgs[5]
                                        });
                                        break;
                                }
                                break;
                            case 'r':
                                switch (dropPlayerfullnm.substring(0, 2)) {
                                    case 'rP': imgnm = rimgs[0];
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": rimgs[0]
                                        });
                                        break;
                                    case 'rR': imgnm = rimgs[1];
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": rimgs[1]
                                        });
                                        break;
                                    case 'rN': imgnm = rimgs[2];
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": rimgs[2]
                                        });
                                        break;
                                    case 'rB': imgnm = rimgs[3]; pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": rimgs[3]
                                        });
                                        break;
                                    case 'rQ': imgnm = rimgs[4];
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": rimgs[4]
                                        });
                                        break;
                                    case 'rK': imgnm = rimgs[5]; rKing = 0; kng = 'rKing';
                                        pcdel = 1;
                                        klldelement = dropPlayerfullnm.substring(0, 2);
                                        delpcsarray.pieceslst.push({
                                            "imgs": rimgs[5]
                                        });
                                        break;
                                }
                                break;
                        }


                        var kngteam = [];
                        if (kng.substring(0, 1) == 'w') {
                            for (var i = 0; i < wrmvimgids.length; i++) {
                                kngteam.push(wrmvimgids[i]);
                            }
                        }
                        else if (kng.substring(0, 1) == 'b') {
                            for (var i = 0; i < brmvimgids.length; i++) {
                                kngteam.push(brmvimgids[i]);
                            }
                        }
                        else if (kng.substring(0, 1) == 'g') {

                            for (var i = 0; i < grmvimgids.length; i++) {
                                kngteam.push(grmvimgids[i]);
                            }
                        }
                        else if (kng.substring(0, 1) == 'r') {
                            for (var i = 0; i < rrmvimgids.length; i++) {
                                kngteam.push(rrmvimgids[i]);
                            }
                        }


                        for (var i = 0; i < kngteam.length; i++) {
                            for (var j = 0; j < pieceslists.pieces.length; j++) {
                                if (pieceslists.pieces[j].imgids == kngteam[i]) {
                                    pieceslists.pieces[j].imgids = '';
                                    pieceslists.pieces[j].imgs = '';
                                }
                            }
                        }





                        //io.sockets.emit('deadelem', imgnm);



                        //var stringjson = JSON.stringify(pieceslists);
                        //var stts = state;

                        //colarray = pieceslists;
                        //socket.username = 'Player4';
                        //var gamstarted = 1;
                        //var plyr = plr;


                        //---------------------------------------------------------------------------------------------------------------------------

                        var msgval = '';

                        switch (whichplayer) {
                            case 'w':
                                if (rKing == 1) {
                                    nxtplr = "r";
                                }
                                if (bKing == 1) {
                                    nxtplr = "b";
                                }
                                if (gKing == 1) {
                                    nxtplr = "g";
                                }
                                if (rKing == 0 && bKing == 0 && gKing == 0 && wKing == 1) {
                                    msgval = " Congratulations..!!!! Player1 Won";
                                    nxtplr = "w";
                                    console.log(" Congratulations..!!!! Player1 Won");
                                }
                                break;
                            case 'g':

                                if (wKing == 1) {
                                    nxtplr = "w";
                                }
                                if (rKing == 1) {
                                    nxtplr = "r";
                                }
                                if (bKing == 1) {
                                    nxtplr = "b";
                                }
                                if (rKing == 0 && bKing == 0 && gKing == 1 && wKing == 0) {
                                    msgval = " Congratulations..!!!! Player2 Won";
                                    nxtplr = "g";
                                    console.log(" Congratulations..!!!! Player2 Won");
                                }
                                break;
                            case 'b':

                                if (gKing == 1) {
                                    nxtplr = "g";
                                }
                                if (wKing == 1) {
                                    nxtplr = "w";
                                }
                                if (rKing == 1) {
                                    nxtplr = "r";
                                }
                                if (rKing == 0 && bKing == 1 && gKing == 0 && wKing == 0) {
                                    msgval = " Congratulations..!!!! Player3 Won";
                                    nxtplr = "b";
                                    console.log(" Congratulations..!!!! Player3 Won");
                                }
                                break;
                            case 'r':
                                if (bKing == 1) {
                                    nxtplr = "b";
                                }
                                if (gKing == 1) {
                                    nxtplr = "g";
                                }
                                if (wKing == 1) {
                                    nxtplr = "w";
                                }
                                if (rKing == 1 && bKing == 0 && gKing == 0 && wKing == 0) {
                                    msgval = " Congratulations..!!!! Player4 Won";
                                    nxtplr = "r";
                                    console.log(" Congratulations..!!!! Player4 Won");
                                }
                                break;
                        }


                        stts = msgval;

                    }
                    //-----------------------------------------------------------------------------------------------------------------------------

                    //    console.log("whichplayer -----" + whichplayer);
                    switch (whichplayer) {
                        case 'w':
                            
                            //for (var j = 0; j < undowhitecolarray.pieces.length; j++) {
                            //    undowhitecolarray.pieces[j].colid = '';
                            //    undowhitecolarray.pieces[j].imgids = '';
                            //    undowhitecolarray.pieces[j].imgs = '';

                            //}

                            //for (var i = 0; i < pieceslists.pieces.length; i++) {
                            //    undowhitecolarray.pieces.push({
                            //    "colid": pieceslists.pieces[i].colid,
                            //    "imgids": pieceslists.pieces[i].imgids,
                            //    "imgs": pieceslists.pieces[i].imgs
                            //    });
                            //}


                            for (var j = 0; j < undowhitecolarray.pieces.length; j++) {
                                undowhitecolarray.pieces[j].colid = '';
                                undowhitecolarray.pieces[j].imgids = '';
                                undowhitecolarray.pieces[j].imgs = '';

                            }
                            
                            for (var i = 0; i < pieceslists.pieces.length; i++) {
                                undowhitecolarray.pieces[i].colid = pieceslists.pieces[i].colid,
                                undowhitecolarray.pieces[i].imgids = pieceslists.pieces[i].imgids,
                                undowhitecolarray.pieces[i].imgs = pieceslists.pieces[i].imgs
                            }


                            for (var j = 0; j < pieceslists.pieces.length; j++) {
                                if (pieceslists.pieces[j].colid == drpcolid) {
                                    pieceslists.pieces[j].colid = drpcolid;
                                    pieceslists.pieces[j].imgids = data;
                                    pieceslists.pieces[j].imgs = ig;
                                }
                                else if (pieceslists.pieces[j].colid == pckcolid) {
                                    pieceslists.pieces[j].colid = pckcolid;
                                    pieceslists.pieces[j].imgids = '';
                                    pieceslists.pieces[j].imgs = '';
                                }
                            }

                            state = "true";
                            console.log(plrclr + " " + pc + " Moved From " + pickpiecefrom + " to " + drpcolid);
                            nxtplr = 'g';
                            plr = 'g';
                            break;
                        case 'g':
                            //  console.log(ig);



                            for (var j = 0; j < undogreencolarray.pieces.length; j++) {
                                undogreencolarray.pieces[j].colid = '';
                                undogreencolarray.pieces[j].imgids = '';
                                undogreencolarray.pieces[j].imgs = '';

                            }
                            //var stringjson = JSON.stringify(colarray);
                            //var pieceslists = JSON.parse(stringjson);

                            for (var i = 0; i < pieceslists.pieces.length; i++) {
                               // console.log("colid : " + pieceslists.pieces[i].colid + "====imgids : " + pieceslists.pieces[i].imgids + "=====imgs : " + pieceslists.pieces[i].imgs);
                                undogreencolarray.pieces[i].colid = pieceslists.pieces[i].colid,
                                undogreencolarray.pieces[i].imgids = pieceslists.pieces[i].imgids,
                                undogreencolarray.pieces[i].imgs = pieceslists.pieces[i].imgs
                            }

                           // var s = JSON.stringify(undogreencolarray);
                           // console.log("undogreencolarray : ---------------" + s);

                        //    undogreencolarray = pieceslists;
                            for (var j = 0; j < pieceslists.pieces.length; j++) {
                                if (pieceslists.pieces[j].colid == drpcolid) {
                                    pieceslists.pieces[j].colid = drpcolid;
                                    pieceslists.pieces[j].imgids = data;
                                    pieceslists.pieces[j].imgs = ig;
                                }
                                else if (pieceslists.pieces[j].colid == pckcolid) {
                                    pieceslists.pieces[j].colid = pckcolid;
                                    pieceslists.pieces[j].imgids = '';
                                    pieceslists.pieces[j].imgs = '';
                                }
                            }

                            state = "true";
                            console.log(plrclr + " " + pc + " Moved From " + pickpiecefrom + " to " + drpcolid);
                            nxtplr = 'b';
                            plr = 'b';
                            break;
                        case 'b':
                            //  console.log(ig);
                          //  undoblackcolarray = pieceslists;

                            for (var j = 0; j < undoblackcolarray.pieces.length; j++) {
                                undoblackcolarray.pieces[j].colid = '';
                                undoblackcolarray.pieces[j].imgids = '';
                                undoblackcolarray.pieces[j].imgs = '';

                            }

                            for (var i = 0; i < pieceslists.pieces.length; i++) {
                                undoblackcolarray.pieces[i].colid = pieceslists.pieces[i].colid,
                                undoblackcolarray.pieces[i].imgids = pieceslists.pieces[i].imgids,
                                undoblackcolarray.pieces[i].imgs = pieceslists.pieces[i].imgs
                            }


                            //for (var j = 0; j < undoblackcolarray.pieces.length; j++) {
                            //    undoblackcolarray.pieces[j].colid = '';
                            //    undoblackcolarray.pieces[j].imgids = '';
                            //    undoblackcolarray.pieces[j].imgs = '';

                            //}

                            //for (var i = 0; i < pieceslists.pieces.length; i++) {
                            //    undoblackcolarray.pieces.push({
                            //        "colid": pieceslists.pieces[i].colid,
                            //        "imgids": pieceslists.pieces[i].imgids,
                            //        "imgs": pieceslists.pieces[i].imgs
                            //    });
                            //}




                            for (var j = 0; j < pieceslists.pieces.length; j++) {
                                if (pieceslists.pieces[j].colid == drpcolid) {
                                    pieceslists.pieces[j].colid = drpcolid;
                                    pieceslists.pieces[j].imgids = data;
                                    pieceslists.pieces[j].imgs = ig;
                                }
                                else if (pieceslists.pieces[j].colid == pckcolid) {
                                    pieceslists.pieces[j].colid = pckcolid;
                                    pieceslists.pieces[j].imgids = '';
                                    pieceslists.pieces[j].imgs = '';
                                }
                            }

                            state = "true";
                            console.log(plrclr + " " + pc + " Moved From " + pickpiecefrom + " to " + drpcolid);
                            nxtplr = 'r';
                            plr = 'r';
                            break;
                        case 'r':
                            //  console.log(ig);
                            //undoredcolarray = pieceslists;

                            for (var j = 0; j < undoredcolarray.pieces.length; j++) {
                                undoredcolarray.pieces[j].colid = '';
                                undoredcolarray.pieces[j].imgids = '';
                                undoredcolarray.pieces[j].imgs = '';

                            }

                            for (var i = 0; i < pieceslists.pieces.length; i++) {
                                undoredcolarray.pieces[i].colid = pieceslists.pieces[i].colid,
                                undoredcolarray.pieces[i].imgids = pieceslists.pieces[i].imgids,
                                undoredcolarray.pieces[i].imgs = pieceslists.pieces[i].imgs
                            }


                            //for (var j = 0; j < undoredcolarray.pieces.length; j++) {
                            //    undoredcolarray.pieces[j].colid = '';
                            //    undoredcolarray.pieces[j].imgids = '';
                            //    undoredcolarray.pieces[j].imgs = '';

                            //}

                            //for (var i = 0; i < pieceslists.pieces.length; i++) {
                            //    undoredcolarray.pieces.push({
                            //        "colid": pieceslists.pieces[i].colid,
                            //        "imgids": pieceslists.pieces[i].imgids,
                            //        "imgs": pieceslists.pieces[i].imgs
                            //    });
                            //}



                            for (var j = 0; j < pieceslists.pieces.length; j++) {
                                if (pieceslists.pieces[j].colid == drpcolid) {
                                    pieceslists.pieces[j].colid = drpcolid;
                                    pieceslists.pieces[j].imgids = data;
                                    pieceslists.pieces[j].imgs = ig;
                                }
                                else if (pieceslists.pieces[j].colid == pckcolid) {
                                    pieceslists.pieces[j].colid = pckcolid;
                                    pieceslists.pieces[j].imgids = '';
                                    pieceslists.pieces[j].imgs = '';
                                }
                            }

                            state = "true";
                            console.log(plrclr + " " + pc + " Moved From " + pickpiecefrom + " to " + drpcolid);
                            nxtplr = 'w';
                            plr = 'w';
                            break;
                    }

                    //var stringjson = JSON.stringify(pieceslists);
                    //var stts = state;
                    //colarray = pieceslists;
                    //socket.username = 'Player4';
                    //var gamstarted = 1;
                    //var plyr = plr;



                    ////   io.sockets.emit('updateboard', socket.username, stringjson, gamstarted, plyr);

                    //io.sockets.emit('updateboard1', socket.username, stringjson, gamstarted, plyr, stts);
                }

            }


            function inValidMoves() {

                switch (whichplayer) {
                    case 'w':
                        state = "false";
                        console.log(plrclr + " " + pc + " Cannot Be Moved at this place,Invalid Move");
                        nxtplr = 'w';
                        plr = 'w';
                        break;

                    case 'g':
                        state = "false";
                        console.log(plrclr + " " + pc + " Cannot Be Moved at this place,Invalid Move");
                        nxtplr = 'g';
                        plr = 'g';
                        break;
                    case 'b':
                        state = "false";
                        console.log(plrclr + " " + pc + " Cannot Be Moved at this place,Invalid Move");
                        nxtplr = 'b';
                        plr = 'b';
                        break;
                    case 'r':
                        state = "false";
                        console.log(plrclr + " " + pc + " Cannot Be Moved at this place,Invalid Move");
                        nxtplr = 'r';
                        plr = 'r';
                        break;
                }

                //var stringjson = JSON.stringify(pieceslists);
                //var stts = state;
                //colarray = pieceslists;
                //socket.username = 'Player1';
                //var gamstarted = 1;
                //var plyr = plr;

                ////   io.sockets.emit('updateboard', socket.username, stringjson, gamstarted, plyr);

                //io.sockets.emit('updateboard1', socket.username, stringjson, gamstarted, plyr, stts);

            }




            switch (piecepicked) {
                case 'P':
                    /********************************************************/
                    /************************  PAWN *************************/
                    /********************************************************/

                    forloops:
                        for (var i = 0; i < straightCol.length; i++) {
                            for (var j = 0; j < pieceslists.pieces.length; j++) {
                                if (pieceslists.pieces[j].colid == straightCol[i]) {
                                    var a = pieceslists.pieces[j].imgids;
                                    if (a == '') {
                                        //  console.log('No Img on the Way');
                                    }
                                    else {
                                        inBetImg = true;
                                        //  console.log('Img on the Way');
                                        break forloops;
                                    }
                                }
                                else {

                                }
                            }
                        }

                    straightMoves();



                    switch (whichplayer) {

                        case 'w':
                            // console.log(pickedPieceColumn + "-----" + DropPieceColumn + "-----" + whichplayer + "-----" + dropPlayer + "-----" + pickedPieceRow + "-----" + elementType + "------" + pickpiecefrom);
                            /***  For Straight Move  ***/
                            if (pickedPieceColumn == DropPieceColumn) {

                                if (((pickedPieceRow == 2 && (DropPieceRow == 4 || DropPieceRow == 3) && inBetImg == false && pickpiecefrom != placepieceat && elementType != "IMG")) || (pickedPieceRow > 2 && (DropPieceRow - pickedPieceRow) == 1 && pickpiecefrom != placepieceat && elementType != "IMG"))//Before OR is Fist Move of Pawn ////After OR is Second Move start of Pawn
                                {
                                    var ig = wimgs[0];
                                    validMoves(ig, dropPlayerfullnm);
                                    //break;
                                }
                                else {
                                    inValidMoves();
                                   // break;
                                }

                          //      console.log('before vldmoves1');

                                wpawnvldmoves(DropPieceColumn, DropPieceRow, whichplayer);

                        //        console.log('After vldmoves1');

                                break;
                            }//  console.log(plrclr + " " + pc + " Moved From " + pickpiecefrom + " to " + drpcolid);
                            else if ((pickedPieceColumn != DropPieceColumn && whichplayer != dropPlayer && pickedPieceRow > 2 && (elementType == "IMG" || elementType == "DIV") && (DropPieceRow - pickedPieceRow) == 1 && pickpiecefrom != placepieceat) || (pickedPieceColumn != DropPieceColumn && (pickpiecefrom != 'c2' && pickpiecefrom != 'j2') && whichplayer != dropPlayer && pickedPieceRow == 2 && (elementType == "IMG" || elementType == "DIV") && (DropPieceRow - pickedPieceRow) == 1 && pickpiecefrom != placepieceat))/***  For Digonal Move  ***/ {
                            //    console.log('In');
                                if (DropPieceColumn == leftCol || DropPieceColumn == rightCol) {
                                    var ig = wimgs[0];
                                    validMoves(ig, dropPlayerfullnm);
                                }
                                else {
                                    inValidMoves();
                                  //  break;
                                }


                           //     console.log('before vldmoves2');

                                wpawnvldmoves(DropPieceColumn, DropPieceRow, whichplayer);

                            //    console.log('After vldmoves2');


                                break;
                            }
                            else {
                                inValidMoves();

                         //       console.log('before vldmoves3');

                                wpawnvldmoves(DropPieceColumn, DropPieceRow, whichplayer);

                       //         console.log('After vldmoves3');

                                break;
                            }

                           

                            break;

                        case 'g':

                            pickedPieceColumnIndex = col.indexOf(pickedPieceColumn);
                            DropPieceColumnIndex = col.indexOf(DropPieceColumn);
                            if (pickedPieceRow == DropPieceRow) {
                                if ((pickedPieceColumn == 'b' && pickedPieceColumn != DropPieceColumn && (DropPieceColumnIndex - pickedPieceColumnIndex) <= 2 && DropPieceColumnIndex > pickedPieceColumnIndex && inBetImg == false && pickpiecefrom != placepieceat && elementType != "IMG") || (pickedPieceColumn != 'b' && pickedPieceColumn != DropPieceColumn && (DropPieceColumnIndex - pickedPieceColumnIndex) == 1 && pickpiecefrom != placepieceat && elementType != "IMG"))//Fist Move of Pawn  && (DropPieceRow - pickedPieceRow) <= 2
                                {
                                    var ig = gimgs[0];
                                    validMoves(ig, dropPlayerfullnm);
                                    abz(DropPieceColumn, DropPieceRow, whichplayer);
                                    break;
                                }
                                else {
                                    inValidMoves(); abz(DropPieceColumn, DropPieceRow, whichplayer); break;
                                }

                            }
                            else if ((pickedPieceRow != DropPieceRow && whichplayer != dropPlayer && pickedPieceColumnIndex > 1 && elementType == "IMG" && (DropPieceColumnIndex - pickedPieceColumnIndex) == 1 && pickedPieceColumn != DropPieceColumn && pickpiecefrom != placepieceat) || (pickedPieceRow != DropPieceRow && whichplayer != dropPlayer && pickedPieceColumnIndex == 1 && elementType == "IMG" && (DropPieceColumnIndex - pickedPieceColumnIndex) == 1 && pickedPieceColumn != DropPieceColumn && pickpiecefrom != placepieceat && (pickpiecefrom != 'b3' && pickpiecefrom != 'b10')))/***  For Digonal Move  ***/ {

                                if (DropPieceRow == rightRow || DropPieceRow == leftRow) {
                                    var ig = gimgs[0];
                                    validMoves(ig, dropPlayerfullnm);
                                    abz(DropPieceColumn, DropPieceRow, whichplayer);
                                    break;
                                }
                                else {
                                    inValidMoves(); abz(DropPieceColumn, DropPieceRow, whichplayer); break;
                                }
                            }
                            else {
                                inValidMoves(); abz(DropPieceColumn, DropPieceRow, whichplayer); break;
                            }

                            abz(DropPieceColumn, DropPieceRow, whichplayer);
                            break;



                        case 'b':

                            // console.log(pickedPieceColumn + "-----" + DropPieceColumn + "-----" + whichplayer + "-----" + dropPlayer + "-----" + pickedPieceRow + "-----" + elementType + "------" + pickpiecefrom);
                            /***  For Straight Move  ***/
                            if (pickedPieceColumn == DropPieceColumn) {
                                if ((pickedPieceRow == 11 && (DropPieceRow == 10 || DropPieceRow == 9) && inBetImg == false && pickpiecefrom != placepieceat && elementType != "IMG") || (pickedPieceRow < 11 && (pickedPieceRow - DropPieceRow) == 1 && pickpiecefrom != placepieceat && elementType != "IMG"))//Before OR is Fist Move of Pawn ////After OR is Second Move start of Pawn
                                {
                                    var ig = bimgs[0];
                                    validMoves(ig, dropPlayerfullnm);
                                    break;
                                }
                                else {
                                    inValidMoves();
                                    break;
                                }
                            }
                                /***  For Digonal Move  ***/
                            else if ((pickedPieceColumn != DropPieceColumn && whichplayer != dropPlayer && pickedPieceRow < 11 && (elementType == "IMG" || elementType == "DIV") && (DropPieceRow - pickedPieceRow) == -1 && pickpiecefrom != placepieceat) || (pickedPieceColumn != DropPieceColumn && whichplayer != dropPlayer && (pickpiecefrom != 'c11' && pickpiecefrom != 'j11') && pickedPieceRow == 11 && (elementType == "IMG" || elementType == "DIV") && (DropPieceRow - pickedPieceRow) == -1 && pickpiecefrom != placepieceat)) {
                                if (DropPieceColumn == rightCol || DropPieceColumn == leftCol) {
                                    var ig = bimgs[0];
                                    validMoves(ig, dropPlayerfullnm); bpawnvldmoves(DropPieceColumn, DropPieceRow, whichplayer);
                                    break;
                                }
                                else {
                                    inValidMoves(); bpawnvldmoves(DropPieceColumn, DropPieceRow, whichplayer);
                                    break;
                                }
                            }
                            else {
                                inValidMoves(); bpawnvldmoves(DropPieceColumn, DropPieceRow, whichplayer);
                                break;
                            }
                            bpawnvldmoves(DropPieceColumn, DropPieceRow, whichplayer);
                            break;
                        case 'r':
                            pickedPieceColumnIndex = col.indexOf(pickedPieceColumn);
                            DropPieceColumnIndex = col.indexOf(DropPieceColumn);
                            if (pickedPieceRow == DropPieceRow) {
                                if ((pickedPieceColumn == 'k' && pickedPieceColumn != DropPieceColumn && (pickedPieceColumnIndex - DropPieceColumnIndex) <= 2 && pickedPieceColumnIndex > DropPieceColumnIndex && inBetImg == false && pickpiecefrom != placepieceat && elementType != "IMG") || (pickedPieceColumn != 'k' && pickedPieceColumn != DropPieceColumn && (pickedPieceColumnIndex - DropPieceColumnIndex) == 1 && pickedPieceColumnIndex > DropPieceColumnIndex && pickpiecefrom != placepieceat && elementType != "IMG"))//Fist Move of Pawn  && (DropPieceRow - pickedPieceRow) <= 2
                                {
                                    var ig = rimgs[0];
                                    validMoves(ig, dropPlayerfullnm); rpawnvldmoves(DropPieceColumn, DropPieceRow, whichplayer);
                                    break;
                                }
                                else {
                                    state = "false";
                                    console.log(plrclr + " " + pc + " Cannot Be Moved at this place,Invalid Move");
                                    nxtplr = 'r';
                                    plr = 'r';
                                    rpawnvldmoves(DropPieceColumn, DropPieceRow, whichplayer);
                                    break;
                                }
                            }
                                /***  For Digonal Move  ***/
                            else if ((pickedPieceRow != DropPieceRow && whichplayer != dropPlayer && pickedPieceColumnIndex < 10 && elementType == "IMG" && (pickedPieceColumnIndex - DropPieceColumnIndex) == 1 && pickedPieceColumn != DropPieceColumn && pickpiecefrom != placepieceat) || (pickedPieceRow != DropPieceRow && whichplayer != dropPlayer && pickedPieceColumnIndex == 10 && elementType == "IMG" && (pickedPieceColumnIndex - DropPieceColumnIndex) == 1 && pickedPieceColumn != DropPieceColumn && pickpiecefrom != placepieceat && (pickpiecefrom != 'k3' && pickpiecefrom != 'k10'))) {
                                if (DropPieceRow == leftRow || DropPieceRow == rightRow) {
                                    var ig = rimgs[0];
                                    validMoves(ig, dropPlayerfullnm); rpawnvldmoves(DropPieceColumn, DropPieceRow, whichplayer);
                                    break;

                                }
                                else {

                                    inValidMoves(); rpawnvldmoves(DropPieceColumn, DropPieceRow, whichplayer);
                                    break;

                                }
                            }
                            else {

                                inValidMoves(); rpawnvldmoves(DropPieceColumn, DropPieceRow, whichplayer);
                                break;
                            }

                            rpawnvldmoves(DropPieceColumn, DropPieceRow, whichplayer);
                            break;
                    }
                    break;

                case 'R':
                    /********************************************************/
                    /************************ ROOK *************************/
                    /********************************************************/
                    straightMoves();
                    // straightMoves(whichPlayer, pickedPieceRow, pickedPieceColumn, DropPieceRow, DropPieceColumn);
                    //                    digonalMoves(whichPlayer, pickedPieceRow, pickedPieceColumn, DropPieceRow, DropPieceColumn);

                    switch (whichplayer) {
                        case 'w':
                            //  rookvldmoves();
                            // straightMoves();
                            if ((pickedPieceColumn == DropPieceColumn || pickedPieceRow == DropPieceRow) && whichplayer != dropPlayer && inBetImg == false && pickpiecefrom != placepieceat) {
                                var ig = wimgs[1];
                                validMoves(ig, dropPlayerfullnm);
                                //   console.log("data  : " + data + " elementType : " + elementType + " dropPlayerfullnm : " + dropPlayerfullnm);
                                // validMoves1(ig, data, elementType, dropPlayerfullnm);
                            }
                            else {
                                inValidMoves();
                            }

                            break;
                        case 'g':
                            //  rookvldmoves();
                            //  straightMoves();
                            if ((pickedPieceColumn == DropPieceColumn || pickedPieceRow == DropPieceRow) && whichplayer != dropPlayer && inBetImg == false && pickpiecefrom != placepieceat) {
                                var ig = gimgs[1];
                                validMoves(ig, dropPlayerfullnm);
                            }
                            else {
                                inValidMoves();
                            }
                            break;
                        case 'b':
                            // rookvldmoves();
                            // straightMoves();
                            if ((pickedPieceColumn == DropPieceColumn || pickedPieceRow == DropPieceRow) && whichplayer != dropPlayer && inBetImg == false && pickpiecefrom != placepieceat) {
                                var ig = bimgs[1];
                                validMoves(ig, dropPlayerfullnm);
                            }
                            else {
                                inValidMoves();
                            }
                            break;
                        case 'r':
                            // rookvldmoves();
                            // straightMoves();
                            if ((pickedPieceColumn == DropPieceColumn || pickedPieceRow == DropPieceRow) && whichplayer != dropPlayer && inBetImg == false && pickpiecefrom != placepieceat) {
                                var ig = rimgs[1];
                                validMoves(ig, dropPlayerfullnm);
                            }
                            else {
                                inValidMoves();
                            }

                    }

                    rookvldmoves(DropPieceColumn, DropPieceRow, whichplayer);
                    // console.log("From Rook Function : " + stts);
                    break;
                case 'N':

                    knightvldmoves(pickedPieceColumn, pickedPieceRow, whichplayer);
                    if (whichplayer != dropPlayer) {
                        if (knghvldmoves.indexOf(drpcolid) == -1) {

                            inValidMoves();
                            break;
                        }
                        else {
                            switch (whichplayer) {
                                case 'w':
                                    var ig = wimgs[2];
                                    validMoves(ig, dropPlayerfullnm);
                                    break;
                                case 'g':
                                    var ig = gimgs[2];
                                    validMoves(ig, dropPlayerfullnm);
                                    break;
                                case 'b':
                                    var ig = bimgs[2];
                                    validMoves(ig, dropPlayerfullnm);
                                    break;
                                case 'r':
                                    var ig = rimgs[2];
                                    validMoves(ig, dropPlayerfullnm);
                                    break;

                            }
                        }


                    }
                    knightvldmoves(DropPieceColumn, DropPieceRow, whichplayer);
                    break;
                case 'B':
                    /********************************************************/
                    /************************ BISHOP *************************/
                    /********************************************************/

                    digonalMoves();


                    switch (whichplayer) {
                        case 'w':

                            if (whichplayer != dropPlayer && inBetImg == false && pickpiecefrom != placepieceat && moveTowards != "") {

                                var ig = wimgs[3];
                                validMoves(ig, dropPlayerfullnm);
                            }
                            else {
                                inValidMoves();
                            }
                            break;
                        case 'g':

                            if (whichplayer != dropPlayer && inBetImg == false && pickpiecefrom != placepieceat && moveTowards != "") {
                                var ig = gimgs[3];
                                validMoves(ig, dropPlayerfullnm);
                            }
                            else {
                                inValidMoves();
                            }
                            break;
                        case 'b':
                            if (whichplayer != dropPlayer && inBetImg == false && pickpiecefrom != placepieceat && moveTowards != "") {
                                var ig = bimgs[3];
                                validMoves(ig, dropPlayerfullnm);
                            }
                            else {
                                inValidMoves();
                            }
                            break;
                        case 'r':
                            if (whichplayer != dropPlayer && inBetImg == false && pickpiecefrom != placepieceat && moveTowards != "") {
                                var ig = rimgs[3];
                                validMoves(ig, dropPlayerfullnm);
                            }
                            else {
                                inValidMoves();
                            }
                            break;

                    }
                    bishopvldmoves(DropPieceColumn, DropPieceRow, whichplayer);
                    break;
                case 'Q':
                    /********************************************************/
                    /************************ QUEEN *************************/
                    /********************************************************/



                    straightMoves();
                    digonalMoves();


                    //pickedPieceRow = obj.pickedPieceRow;
                    //pickedPieceColumn = obj.pickedPieceColumn;
                    //whichplayer = obj.whichplayer;

                    //funqueenvldmoves(DropPieceColumn, DropPieceRow, whichplayer);



                    switch (whichplayer) {
                        case 'w':
                            if (whichplayer != dropPlayer && inBetImg == false && pickpiecefrom != placepieceat && ((moveTowards != "") || (pickedPieceColumn == DropPieceColumn || pickedPieceRow == DropPieceRow))) {
                                var ig = wimgs[4];
                                validMoves(ig, dropPlayerfullnm);
                            }
                            else {
                                inValidMoves();
                            }
                            break;
                        case 'g':
                            //  console.log("From Green :-------------"+whichplayer + " - " + dropPlayer + " - " + inBetImg + " - " + pickpiecefrom + " - " + placepieceat + " - " + moveTowards + " - " + pickedPieceColumn + " - " + DropPieceColumn + " - " + pickedPieceRow + " - " + DropPieceRow);
                            if (whichplayer != dropPlayer && inBetImg == false && pickpiecefrom != placepieceat && ((moveTowards != "") || (pickedPieceColumn == DropPieceColumn || pickedPieceRow == DropPieceRow))) {
                                var ig = gimgs[4];
                                validMoves(ig, dropPlayerfullnm);
                            }
                            else {
                                inValidMoves();
                            }
                            break;
                        case 'b':
                            if (whichplayer != dropPlayer && inBetImg == false && pickpiecefrom != placepieceat && ((moveTowards != "") || (pickedPieceColumn == DropPieceColumn || pickedPieceRow == DropPieceRow))) {
                                var ig = bimgs[4];
                                validMoves(ig, dropPlayerfullnm);
                            }
                            else {
                                inValidMoves();
                            }
                            break;
                        case 'r':
                            if (whichplayer != dropPlayer && inBetImg == false && pickpiecefrom != placepieceat && ((moveTowards != "") || (pickedPieceColumn == DropPieceColumn || pickedPieceRow == DropPieceRow))) {
                                var ig = rimgs[4];
                                validMoves(ig, dropPlayerfullnm);
                            }
                            else {
                                inValidMoves();
                            }
                            break;

                    }

                    funqueenvldmoves(DropPieceColumn, DropPieceRow, whichplayer);
                    break;

                case 'K':
                    /********************************************************/
                    /************************ KING *************************/
                    /********************************************************/

                    //leftCol,rightCol,pickedPieceRow,pickedPieceColumn,leftRow,rightRow


                    kingMovement(leftCol, rightCol, pickedPieceRow, pickedPieceColumn, leftRow, rightRow, whichplayer);

                    if (whichplayer != dropPlayer) {
                        if (kngvldmoves.indexOf(drpcolid) == -1) {
                            inValidMoves();
                            break;
                        }
                        else {
                            switch (whichplayer) {
                                case 'w':
                                    var ig = wimgs[5];
                                    validMoves(ig, dropPlayerfullnm);
                                    break;
                                case 'g':
                                    var ig = gimgs[5];
                                    validMoves(ig, dropPlayerfullnm);
                                    break;
                                case 'b':
                                    var ig = bimgs[5];
                                    validMoves(ig, dropPlayerfullnm);
                                    break;
                                case 'r':
                                    var ig = rimgs[5];
                                    validMoves(ig, dropPlayerfullnm);
                                    break;

                            }
                        }


                    }



                    kingMovement(leftCol, rightCol, pickedPieceRow, pickedPieceColumn, leftRow, rightRow, whichplayer);
                    //   console.log(kngvldmoves);
                    break;
            }





            var stringjson = JSON.stringify(pieceslists);
            var stts = state;
            // console.log(stts);
            colarray = pieceslists;
            // socket.username = 'Player4';
            var gamstarted = 1;
        //    console.log('plr' + plr);

            //plyr = plr;


            //////---------------------------------------------------------------------------------------------------------------------------

            ////    var msgval = '';
            msgval = '';
            console.log("stts : " + stts);
            if ((stts == "false" || stts == "true") && (wKing == 1 && rKing == 1 && gKing == 1 && bKing == 1)) {
                plyr = plr;
            }
            else {
                if (wKing == 0 || rKing == 0 || gKing == 0 || bKing == 0) {
                    switch (whichplayer) {
                        case 'w':
                            if (rKing == 1) {
                                nxtplr = "r";
                            }
                            if (bKing == 1) {
                                nxtplr = "b";
                            }
                            if (gKing == 1) {
                                nxtplr = "g";
                            }
                            if (rKing == 0 && bKing == 0 && gKing == 0 && wKing == 1) {
                                msgval = " Congratulations..!!!! Player1 Won";
                                nxtplr = "w";
                                console.log(" Congratulations..!!!! Player1 Won");
                            }
                            break;
                        case 'g':

                            if (wKing == 1) {
                                nxtplr = "w";
                            }
                            if (rKing == 1) {
                                nxtplr = "r";
                            }
                            if (bKing == 1) {
                                nxtplr = "b";
                            }
                            if (rKing == 0 && bKing == 0 && gKing == 1 && wKing == 0) {
                                msgval = " Congratulations..!!!! Player2 Won";
                                nxtplr = "g";
                                console.log(" Congratulations..!!!! Player2 Won");
                            }
                            break;
                        case 'b':

                            if (gKing == 1) {
                                nxtplr = "g";
                            }
                            if (wKing == 1) {
                                nxtplr = "w";
                            }
                            if (rKing == 1) {
                                nxtplr = "r";
                            }
                            if (rKing == 0 && bKing == 1 && gKing == 0 && wKing == 0) {
                                msgval = " Congratulations..!!!! Player3 Won";
                                nxtplr = "b";
                                console.log(" Congratulations..!!!! Player3 Won");
                            }
                            break;
                        case 'r':
                            if (bKing == 1) {
                                nxtplr = "b";
                            }
                            if (gKing == 1) {
                                nxtplr = "g";
                            }
                            if (wKing == 1) {
                                nxtplr = "w";
                            }
                            if (rKing == 1 && bKing == 0 && gKing == 0 && wKing == 0) {
                                msgval = " Congratulations..!!!! Player4 Won";
                                nxtplr = "r";
                                console.log(" Congratulations..!!!! Player4 Won");
                            }
                            break;
                    }

                    if (msgval != '') {
                        stts = msgval;
                    }
                   
                    //  console.log('nxtpl' + nxtplr);
                    console.log("stts1111 : " + stts);
                    if (stts == "false" || stts == '') {

                    }
                    else {
                        plyr = nxtplr;
                    }


                }
            }
           
            

            if (plyr == 'w') {
                socket.username = 'Player1';
                usrnm = 'Player1';
            }
            else if (plyr == 'g') {
                socket.username = 'Player2';
                usrnm = 'Player2';
            }
            else if (plyr == 'b') {
                socket.username = 'Player3';
                usrnm = 'Player3';
            }
            else if (plyr == 'r') {
                socket.username = 'Player4';
                usrnm = 'Player4';
            }



            //if (chkto != '') {
            //    stts = chkto;

            //    if (clr == "White") {
            //        plyr = "w";
            //    }
            //    else if (clr == "Green") {
            //        plyr = "g";
            //    }
            //    else if (clr == "Black") {
            //        plyr = "b";
            //    }
            //    else if (clr == "Red") {
            //        plyr = "r";
            //    }
            //}


            //delpcsarray.pieceslst
            //  console.log("chkto : -------------- " + chkto + "clr : ---------------" + clr);
            // console.log(stts);
            console.log("plyr : " + plyr);
            if (pcdel == 1) {
                var stringjson1 = JSON.stringify(delpcsarray);
                //     console.log(socket.username + " ---- " + gamstarted + " ---- " + plyr + " ---- " + stts);
                io.sockets.emit('updateboard1', socket.username, stringjson, gamstarted, plyr, stts);
                // console.log(stringjson1 + " - - - " + klldelement);
                //      io.sockets.emit('updatedeadelem1', stringjson1);
                //    console.log("pcdel : "+pcdel);
            }
            else {
                var stringjson1 = JSON.stringify(delpcsarray);
                io.sockets.emit('updateboard1', socket.username, stringjson, gamstarted, plyr, stts);
                //     console.log(stringjson1 + " - - - " + klldelement);
                //        io.sockets.emit('updatedeadelem1', stringjson1);
                //    console.log("pcdel : " + pcdel);
            }

            chkto = '';
            //     console.log("chkto : -----" + chkto);
            //pcdel = 0;
            //klldelement = '';
        }
    });

    //------------------------------------------------------MOVES UPDATION METHOD END----------------------------------------------------------------------

    //----------------------------------------------------Highlight Moves Start-----------------------------------------------------------------------------

    socket.on('highlightMoves', function (tdId, imgId) {
       
       
        var validMoves = [];
        var whichPlayer = imgId.substring(0, 1);
        var pickedRow = tdId.substring(1, tdId.length);
        var pickedCol = tdId.substring(0, 1);
        var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
        var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        switch (whichPlayer) {
            case 'w':
                switch (imgId.substring(1, 2)) {
                    case 'P':                        
                        wpawnvldmoves(pickedCol, pickedRow, whichPlayer);
                        for (var i = 0; i < wpawnsvalidmoves.length; i++) {
                            validMoves.push(wpawnsvalidmoves[i]);
                        }

                        break;
                    case 'R':
                        rookvldmoves(pickedCol, pickedRow, whichPlayer);                        
                        for (var i = 0; i < wrookvalidmoves.length; i++) {
                            validMoves.push(wrookvalidmoves[i]);
                        }
                        break;
                    case 'N':                        
                       var pickedCol1 = col[pickedCol];
                        knightvldmoves(pickedCol, pickedRow, whichPlayer);                        
                        for (var i = 0; i < knghvldmoves.length; i++) {
                            validMoves.push(knghvldmoves[i]);
                        }
                        break;
                    case 'B':
                        bishopvldmoves(pickedCol, pickedRow, whichPlayer);                        
                        for (var i = 0; i < bishopvalidmoves.length; i++) {
                            validMoves.push(bishopvalidmoves[i]);
                        }
                        break;
                    case 'Q':
                        funqueenvldmoves(pickedCol, pickedRow, whichPlayer);
                        for (var i = 0; i < queenvldmoves.length; i++) {
                            validMoves.push(queenvldmoves[i]);
                        }
                        break;
                    case 'K':
                        var lcol1 = col[(col.indexOf(pickedCol) - 1)];
                        var rcol1 = col[(col.indexOf(pickedCol) + 1)];
                        if (rows.indexOf(pickedRow) > 0) {
                            var lrow1 = rows[(rows.indexOf(pickedRow) - 1)];
                        }
                        else {
                            var lrow1 = -1;
                        }
                        
                        if (rows.indexOf(pickedRow) < 11) {
                            var rrow1 = rows[(rows.indexOf(pickedRow) + 1)];
                        }
                        else {
                            var rrow1 = -1;
                        }
                        kingMovement(lcol1, rcol1, pickedRow, pickedCol, lrow1, rrow1, whichPlayer);
                        for (var i = 0; i < kngvldmoves.length; i++) {
                            validMoves.push(kngvldmoves[i]);
                        }
                        break;
                }
                break;
            case 'g':

                switch (imgId.substring(1, 2)) {
                    case 'P':
                        abz(pickedCol, pickedRow, whichPlayer);
                        for (var i = 0; i < gpawnsvalidmoves.length; i++) {
                            validMoves.push(gpawnsvalidmoves[i]);
                        }

                        break;
                    case 'R':
                        rookvldmoves(pickedCol, pickedRow, whichPlayer);
                        for (var i = 0; i < wrookvalidmoves.length; i++) {
                            validMoves.push(wrookvalidmoves[i]);
                        }
                        break;
                    case 'N':                        
                        var pickedCol1 = col[pickedCol];
                        knightvldmoves(pickedCol, pickedRow, whichPlayer);                        
                        for (var i = 0; i < knghvldmoves.length; i++) {
                            validMoves.push(knghvldmoves[i]);
                        }
                        break;
                    case 'B':
                        bishopvldmoves(pickedCol, pickedRow, whichPlayer);
                        for (var i = 0; i < bishopvalidmoves.length; i++) {
                            validMoves.push(bishopvalidmoves[i]);
                        }
                        break;
                    case 'Q':
                        funqueenvldmoves(pickedCol, pickedRow, whichPlayer);
                        for (var i = 0; i < queenvldmoves.length; i++) {
                            validMoves.push(queenvldmoves[i]);
                        }
                        break;
                    case 'K':
                        var lcol1 = col[(col.indexOf(pickedCol) - 1)];
                        var rcol1 = col[(col.indexOf(pickedCol) + 1)];
                        if (rows.indexOf(pickedRow) > 0) {
                            var lrow1 = rows[(rows.indexOf(pickedRow) - 1)];
                        }
                        else {
                            var lrow1 = -1;
                        }

                        if (rows.indexOf(pickedRow) < 11) {
                            var rrow1 = rows[(rows.indexOf(pickedRow) + 1)];
                        }
                        else {
                            var rrow1 = -1;
                        }
                        kingMovement(lcol1, rcol1, pickedRow, pickedCol, lrow1, rrow1, whichPlayer);

                        for (var i = 0; i < kngvldmoves.length; i++) {
                            validMoves.push(kngvldmoves[i]);
                        }
                        break;

                }
                break;
            case 'b':

                switch (imgId.substring(1, 2)) {
                    case 'P':
                        bpawnvldmoves(pickedCol, pickedRow, whichPlayer);
                        for (var i = 0; i < bpawnsvalidmoves.length; i++) {
                            validMoves.push(bpawnsvalidmoves[i]);
                        }
                        break;
                    case 'R':
                        rookvldmoves(pickedCol, pickedRow, whichPlayer);
                        for (var i = 0; i < wrookvalidmoves.length; i++) {
                            validMoves.push(wrookvalidmoves[i]);
                        }
                        break;
                    case 'N':
                        var pickedCol1 = col[pickedCol];
                        knightvldmoves(pickedCol, pickedRow, whichPlayer);
                        for (var i = 0; i < knghvldmoves.length; i++) {
                            validMoves.push(knghvldmoves[i]);
                        }
                        break;
                    case 'B':
                        bishopvldmoves(pickedCol, pickedRow, whichPlayer);
                        for (var i = 0; i < bishopvalidmoves.length; i++) {
                            validMoves.push(bishopvalidmoves[i]);
                        }
                        break;
                    case 'Q':
                        funqueenvldmoves(pickedCol, pickedRow, whichPlayer);
                        for (var i = 0; i < queenvldmoves.length; i++) {
                            validMoves.push(queenvldmoves[i]);
                        }
                        break;
                    case 'K':
                        var lcol1 = col[(col.indexOf(pickedCol) - 1)];
                        var rcol1 = col[(col.indexOf(pickedCol) + 1)];
                        if (rows.indexOf(pickedRow) > 0) {
                            var lrow1 = rows[(rows.indexOf(pickedRow) - 1)];
                        }
                        else {
                            var lrow1 = -1;
                        }

                        if (rows.indexOf(pickedRow) < 11) {
                            var rrow1 = rows[(rows.indexOf(pickedRow) + 1)];
                        }
                        else {
                            var rrow1 = -1;
                        }
                        kingMovement(lcol1, rcol1, pickedRow, pickedCol, lrow1, rrow1, whichPlayer);
                        for (var i = 0; i < kngvldmoves.length; i++) {
                            validMoves.push(kngvldmoves[i]);
                        }
                        break;
                }
                break;
            case 'r':

                switch (imgId.substring(1, 2)) {
                    case 'P':

                        rpawnvldmoves(pickedCol, pickedRow, whichPlayer);
                        for (var i = 0; i < rpawnsvalidmoves.length; i++) {
                            validMoves.push(rpawnsvalidmoves[i]);
                        }

                        break;
                    case 'R':
                        rookvldmoves(pickedCol, pickedRow, whichPlayer);
                        for (var i = 0; i < wrookvalidmoves.length; i++) {
                            validMoves.push(wrookvalidmoves[i]);
                        }
                        break;
                    case 'N':
                        var pickedCol1 = col[pickedCol];
                        knightvldmoves(pickedCol, pickedRow, whichPlayer);
                        for (var i = 0; i < knghvldmoves.length; i++) {
                            validMoves.push(knghvldmoves[i]);
                        }
                        break;
                    case 'B':
                        bishopvldmoves(pickedCol, pickedRow, whichPlayer);
                        for (var i = 0; i < bishopvalidmoves.length; i++) {
                            validMoves.push(bishopvalidmoves[i]);
                        }
                        break;
                    case 'Q':
                        funqueenvldmoves(pickedCol, pickedRow, whichPlayer);
                        for (var i = 0; i < queenvldmoves.length; i++) {
                            validMoves.push(queenvldmoves[i]);
                        }
                        break;
                    case 'K':
                        var lcol1 = col[(col.indexOf(pickedCol) - 1)];
                        var rcol1 = col[(col.indexOf(pickedCol) + 1)];
                        if (rows.indexOf(pickedRow) > 0) {
                            var lrow1 = rows[(rows.indexOf(pickedRow) - 1)];
                        }
                        else {
                            var lrow1 = -1;
                        }

                        if (rows.indexOf(pickedRow) < 11) {
                            var rrow1 = rows[(rows.indexOf(pickedRow) + 1)];
                        }
                        else {
                            var rrow1 = -1;
                        }

                        kingMovement(lcol1, rcol1, pickedRow, pickedCol, lrow1, rrow1, whichPlayer);
                        for (var i = 0; i < kngvldmoves.length; i++) {
                            validMoves.push(kngvldmoves[i]);
                        }
                        break;
                }
                break;
        }
       
        //console.log(validMoves);

        io.emit('highlightMoves', validMoves,imgId);
    });

    //----------------------------------------------------Highlight Moves End-----------------------------------------------------------------------------

    socket.on('dangerzone', function (strngjsn) {
        
        var validMoves = [];
        var wkvalidMoves = []; var gkvalidMoves = []; var bkvalidMoves = []; var rkvalidMoves = [];
        var datajsn = strngjsn;
        var pieceslists1 = JSON.parse(strngjsn);
        var actuallength;
        actuallength = pieceslists1.pieces.length;
         for (var z1 = 0; z1 < actuallength; z1++) {
          
            var im = pieceslists1.pieces[z1].imgids;
            var whichPlayer = pieceslists1.pieces[z1].whchplyr;
            var pickedRow = pieceslists1.pieces[z1].parentid.substring(1, pieceslists1.pieces[z1].parentid.length);
            var pickedCol = pieceslists1.pieces[z1].parentid.substring(0, 1);
            var col = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
            var rows = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

             switch (whichPlayer) {
                 case 'w':
                     switch (pieceslists1.pieces[z1].imgids.substring(1, 2)) {
                         case 'P':
                             wpawnvldmoves(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < wpawnsvalidmoves.length; i++) {
                                 validMoves.push(wpawnsvalidmoves[i]);
                             }

                             break;
                         case 'R':
                             rookvldmoves(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < wrookvalidmoves.length; i++) {
                                 validMoves.push(wrookvalidmoves[i]);
                             }
                             break;
                         case 'N':
                             var pickedCol1 = col[pickedCol];
                             knightvldmoves(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < knghvldmoves.length; i++) {
                                 validMoves.push(knghvldmoves[i]);
                             }
                             break;
                         case 'B':
                             bishopvldmoves(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < bishopvalidmoves.length; i++) {
                                 validMoves.push(bishopvalidmoves[i]);
                             }
                             break;
                         case 'Q':
                             funqueenvldmoves(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < queenvldmoves.length; i++) {
                                 validMoves.push(queenvldmoves[i]);
                             }
                             break;
                         case 'K':
                             var lcol1 = col[(col.indexOf(pickedCol) - 1)];
                             var rcol1 = col[(col.indexOf(pickedCol) + 1)];
                             if (rows.indexOf(pickedRow) > 0) {
                                 var lrow1 = rows[(rows.indexOf(pickedRow) - 1)];
                             }
                             else {
                                 var lrow1 = -1;
                             }

                             if (rows.indexOf(pickedRow) < 11) {
                                 var rrow1 = rows[(rows.indexOf(pickedRow) + 1)];
                             }
                             else {
                                 var rrow1 = -1;
                             }
                             kingMovement(lcol1, rcol1, pickedRow, pickedCol, lrow1, rrow1, whichPlayer);
                             for (var i = 0; i < kngvldmoves.length; i++) {
                                 validMoves.push(kngvldmoves[i]);
                                 wkvalidMoves.push(kngvldmoves[i]);
                             }
                             break;
                     }
                     break;
                 case 'g':

                     switch (pieceslists1.pieces[z1].imgids.substring(1, 2)) {
                         case 'P':
                              abz(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < gpawnsvalidmoves.length; i++) {
                                 validMoves.push(gpawnsvalidmoves[i]);
                             }

                             break;
                         case 'R':
                             rookvldmoves(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < wrookvalidmoves.length; i++) {
                                 validMoves.push(wrookvalidmoves[i]);
                             }
                             break;
                         case 'N':
                             var pickedCol1 = col[pickedCol];
                             knightvldmoves(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < knghvldmoves.length; i++) {
                                 validMoves.push(knghvldmoves[i]);
                             }
                             break;
                         case 'B':
                             bishopvldmoves(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < bishopvalidmoves.length; i++) {
                                 validMoves.push(bishopvalidmoves[i]);
                             }
                             break;
                         case 'Q':
                             funqueenvldmoves(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < queenvldmoves.length; i++) {
                                 validMoves.push(queenvldmoves[i]);
                             }
                             break;
                         case 'K':
                             var lcol1 = col[(col.indexOf(pickedCol) - 1)];
                             var rcol1 = col[(col.indexOf(pickedCol) + 1)];
                             if (rows.indexOf(pickedRow) > 0) {
                                 var lrow1 = rows[(rows.indexOf(pickedRow) - 1)];
                             }
                             else {
                                 var lrow1 = -1;
                             }

                             if (rows.indexOf(pickedRow) < 11) {
                                 var rrow1 = rows[(rows.indexOf(pickedRow) + 1)];
                             }
                             else {
                                 var rrow1 = -1;
                             }
                             kingMovement(lcol1, rcol1, pickedRow, pickedCol, lrow1, rrow1, whichPlayer);

                             for (var i = 0; i < kngvldmoves.length; i++) {
                                 validMoves.push(kngvldmoves[i]);
                                 gkvalidMoves.push(kngvldmoves[i]);
                             }
                             break;

                     }
                     break;
                 case 'b':

                     switch (pieceslists1.pieces[z1].imgids.substring(1, 2)) {
                         case 'P':
                             bpawnvldmoves(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < bpawnsvalidmoves.length; i++) {
                                 validMoves.push(bpawnsvalidmoves[i]);
                             }
                             break;
                         case 'R':
                             rookvldmoves(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < wrookvalidmoves.length; i++) {
                                 validMoves.push(wrookvalidmoves[i]);
                             }
                             break;
                         case 'N':
                             var pickedCol1 = col[pickedCol];
                             knightvldmoves(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < knghvldmoves.length; i++) {
                                 validMoves.push(knghvldmoves[i]);
                             }
                             break;
                         case 'B':
                             bishopvldmoves(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < bishopvalidmoves.length; i++) {
                                 validMoves.push(bishopvalidmoves[i]);
                             }
                             break;
                         case 'Q':
                             funqueenvldmoves(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < queenvldmoves.length; i++) {
                                 validMoves.push(queenvldmoves[i]);
                             }
                             break;
                         case 'K':
                             var lcol1 = col[(col.indexOf(pickedCol) - 1)];
                             var rcol1 = col[(col.indexOf(pickedCol) + 1)];
                             if (rows.indexOf(pickedRow) > 0) {
                                 var lrow1 = rows[(rows.indexOf(pickedRow) - 1)];
                             }
                             else {
                                 var lrow1 = -1;
                             }

                             if (rows.indexOf(pickedRow) < 11) {
                                 var rrow1 = rows[(rows.indexOf(pickedRow) + 1)];
                             }
                             else {
                                 var rrow1 = -1;
                             }
                             kingMovement(lcol1, rcol1, pickedRow, pickedCol, lrow1, rrow1, whichPlayer);
                             for (var i = 0; i < kngvldmoves.length; i++) {
                                 validMoves.push(kngvldmoves[i]);
                                 bkvalidMoves.push(kngvldmoves[i]);
                             }
                             break;
                     }
                     break;
                 case 'r':

                     switch (pieceslists1.pieces[z1].imgids.substring(1, 2)) {
                         case 'P':

                             rpawnvldmoves(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < rpawnsvalidmoves.length; i++) {
                                 validMoves.push(rpawnsvalidmoves[i]);
                             }

                             break;
                         case 'R':
                             rookvldmoves(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < wrookvalidmoves.length; i++) {
                                 validMoves.push(wrookvalidmoves[i]);
                             }
                             break;
                         case 'N':
                             var pickedCol1 = col[pickedCol];
                             knightvldmoves(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < knghvldmoves.length; i++) {
                                 validMoves.push(knghvldmoves[i]);
                             }
                             break;
                         case 'B':
                             bishopvldmoves(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < bishopvalidmoves.length; i++) {
                                 validMoves.push(bishopvalidmoves[i]);
                             }
                             break;
                         case 'Q':
                             funqueenvldmoves(pickedCol, pickedRow, whichPlayer);
                             for (var i = 0; i < queenvldmoves.length; i++) {
                                 validMoves.push(queenvldmoves[i]);
                             }
                             break;
                         case 'K':
                             var lcol1 = col[(col.indexOf(pickedCol) - 1)];
                             var rcol1 = col[(col.indexOf(pickedCol) + 1)];
                             if (rows.indexOf(pickedRow) > 0) {
                                 var lrow1 = rows[(rows.indexOf(pickedRow) - 1)];
                             }
                             else {
                                 var lrow1 = -1;
                             }

                             if (rows.indexOf(pickedRow) < 11) {
                                 var rrow1 = rows[(rows.indexOf(pickedRow) + 1)];
                             }
                             else {
                                 var rrow1 = -1;
                             }

                             kingMovement(lcol1, rcol1, pickedRow, pickedCol, lrow1, rrow1, whichPlayer);
                             for (var i = 0; i < kngvldmoves.length; i++) {
                                 validMoves.push(kngvldmoves[i]);
                                 rkvalidMoves.push(kngvldmoves[i]);
                             }
                             break;
                     }
                     break;
            }
           

        } 
        var a = '', b = '', c = '';
        var carray = [];
        fz:
        for (var i = 0; i < colarray.pieces.length; i++) {
            b = colarray.pieces[i].colid;
            c = colarray.pieces[i].imgids;

            for (var j = 0; j < validMoves.length; j++) {
                var a = validMoves[j];
                if (a == b) {
                    if (c != '') {
                        if (c == 'wK' || c == 'gK' || c == 'bK' || c == 'rK') {
                            carray.push(c);
                             break fz;
                        }
                        else {
                   
                        }
                    }
                   
                }
               
            }
        }

   //     console.log('plyr : --------' + plyr);

        var garr = [];

        var dngrimg = '';
        var dngrpc = '';
        if (carray.length > 0) {
            dngrimg = c;
            switch (c.substring(0, 1)) {
                case 'w': dngrpc = "Check : White King "; break;
                case 'g': dngrpc = "Check : Green King "; break;
                case 'b': dngrpc = "Check : Black King "; break;
                case 'r': dngrpc = "Check : Red King "; break;
            } 
            io.sockets.emit('dngrbrd', dngrpc);
        }
        else {
            var dngrpc =  " ";
            io.sockets.emit('dngrbrd', dngrpc);
        }


        var stts = '';

        //if (dngrpc != '') {
        //    stts = dngrpc;

        //    if (c.substring(0,1) == "w") {
        //        plyr = "w";
        //    }
        //    else if (c.substring(0, 1) == "g") {
        //        plyr = "g";
        //    }
        //    else if (c.substring(0, 1) == "b") {
        //        plyr = "b";
        //    }
        //    else if (c.substring(0, 1) == "r") {
        //        plyr = "r";
        //    }
        //}


      //  io.sockets.emit('updateboard5', gamstarted, plyr);
          
    });

      


   });


server.listen(port, function () {
    console.log('Server listening at port %d', port); 
});

//console.log('Connected : 3000');

