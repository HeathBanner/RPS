

const config = {
    apiKey: "AIzaSyAJS4YQWU5DmESeYueG1qH1NGkjv3DncEY",
    authDomain: "fir-click-counter-7cdb9.firebaseapp.com",
    databaseURL: "https://rpsapp-a5bc6.firebaseio.com/",
    storageBucket: "fir-click-counter-7cdb9.appspot.com"
};
  
firebase.initializeApp(config);

const database = firebase.database();

const dbRef = database.ref();
const connectedRef = firebase.database().ref('.info/connected');
const usersRef = database.ref('users');
const choicesRef = database.ref('choices');
const chatRef = database.ref('chatLog');

//=========================================================//

var username =  'username1'
var users = []
var playerOne = ""
var playerTwo = ""

var playerOneChoice = 0
var playerTwoChoice = 0

var ties = 0
var playerOneWins = 0
var playerTwoWins = 0

var chatLogCount = 0
var chatLog = []
chatRef.update({
    logCount: 1,
})

//=========================================================//

if (localStorage.getItem('user')) {
    $("#login").val(localStorage.getItem('user'))
}

connectedRef.on('value', function() {
    dbRef.onDisconnect().remove()
})

dbRef.on('value', function(snap){
    
    if (!snap.val()){location.reload()}

    else {console.log("Not yet...")}
})

$("#submit").on("click", function() {
    
    let login = $("#login").val().trim().replace(/\s/g, '');

    if(login.length < 2){return $('#loginWarning').text('You must provide more than 1 character!');}
    
    localStorage.setItem('user', login);

    usersRef.once('value').then(function(data){

        if(!data.val()) {
            usersRef.update({playerOne: {[login]: true}});
        }
        else if (data.val()) {
            usersRef.update({playerTwo: {[login]: true}});
        }
    });

    $("#login").remove();
    $("#submit").remove();
    $('#loginWarning').remove();

    $("#btnTarget").append('<img src="imgs/rock.png" id="rock" class="btns" value="rock" alt="rock">');
    $("#btnTarget").append('<img src="imgs/paper.png" id="paper" class="btns" value="paper" alt="paper">');
    $("#btnTarget").append('<img src="imgs/scissor.png" id="scissor" class="btns" value="scissor" alt="scissor">');

    $("#chatSubmit").css({visibility: 'visible'});
});

usersRef.on('child_added', function(data){

    if (data.val()) {

        console.log(data.key);
                            
        if (data.key === 'playerOne') {
            
            console.log('PLAYER ONE', data.node_.children_.root_.key)

            let playerOne = data.node_.children_.root_.key;
        
            $("#p1ScoreHead").addClass(playerOne);
            $("#p1Score").addClass(playerOne);
            $("#p1Chooses").addClass(playerOne);
            $("#p1Choice").addClass(playerOne);

            $("#p1ScoreHead").attr('id', `${playerOne}ScoreHead`);
            $("#p1Score").attr('id', `${playerOne}Score`);
            $("#p1Chooses").attr('id', `${playerOne}Chooses`);
            $("#p1Choice").attr('id', `${playerOne}Choice`);

            $(`#${playerOne}ScoreHead`).text(playerOne);
            $(`#${playerOne}Chooses`).text(`${playerOne} Chooses!`);
        } 
        else if (data.key === 'playerTwo') {
            
            console.log('PLAYER TWO', data.node_.children_.root_.key);
            let playerTwo = data.node_.children_.root_.key;
            $("#p2ScoreHead").addClass(playerTwo);
            $("#p2Score").addClass(playerTwo);
            $("#p2Chooses").addClass(playerTwo);
            $("#p2Choice").addClass(playerTwo);

            $("#p2ScoreHead").attr('id', `${playerTwo}ScoreHead`);
            $("#p2Score").attr('id', `${playerTwo}Score`);
            $("#p2Chooses").attr('id', `${playerTwo}Chooses`);
            $("#p2Choice").attr('id', `${playerTwo}Choice`);

            $(`#${playerTwo}ScoreHead`).text(playerTwo);
            $(`#${playerTwo}Chooses`).text(`${playerTwo} Chooses!`);
        }
    }
});

$(document).ready($(document).on("click", ".btns", function(){
    
    let playerChoice = this.id;
    let user = localStorage.getItem('user');
        
        usersRef.once('value').then(data => {
    
            if (data.val()) {
    
                choicesRef.update({
                    [user]: playerChoice.toUpperCase()
                });
                usersRef.update({[user]: false});
    
                $("#btnTarget").css({display: 'none'});
                $("#chosen").text(`Waiting for other player's choice!`);
            }
        });
}));

choicesRef.on('child_added', function(data){
    
    if (data.key === playerOne) {

        playerOneChoice = data.val();
        console.log(data.val());
    } 
    else if (data.key == playerTwo) {
        
        playerTwoChoice = data.val();
        console.log(data.val());
    }
    if ((playerOneChoice) && (playerTwoChoice)) {
        
        $(`#playerOneChoice`).text(playerOneChoice)
        $(`#playerTwoChoice`).text(playerTwoChoice)
        
        rpsRules()  
        
        setTimeout(function(){
            $(`#playerOneChoice`).text('');
            $(`#playerTwoChoice`).text('');
            $("#chosen").text('');
            
            $(`#btnTarget`).css({display: 'block'});

            choicesRef.remove()
            
            for (var i = 0; i < users.length; i++){
               database.ref('users').update({
                    [users[i]]: true
                }) 
            }
        }, 2000)
    }
})

function rpsRules() {
    console.log("RPSRULES")
    
    if ((playerOneChoice == 'ROCK') && (playerTwoChoice == 'ROCK')) {
        ties++
        $("#ties").text(ties)
        
    }else if ((playerOneChoice == 'PAPER') && (playerTwoChoice == 'PAPER')) {
        ties++
        $("#ties").text(ties)

    }else if ((playerOneChoice == 'SCISSOR') && (playerTwoChoice == 'SCISSOR')) {
        ties++
        $("#ties").text(ties)

    }else if ((playerOneChoice == 'ROCK') && (playerTwoChoice == 'SCISSOR')) {
        playerOneWins++
        $("#" + playerOne + "Score").text(playerOneWins)

    }else if ((playerOneChoice == 'SCISSOR') && (playerTwoChoice == 'PAPER')) {
        playerOneWins++
        $("#" + playerOne + "Score").text(playerOneWins)

    }else if ((playerOneChoice == 'PAPER') && (playerTwoChoice == 'ROCK')) {
        playerOneWins++
        $("#" + playerOne + "Score").text(playerOneWins)

    }else if ((playerOneChoice == 'SCISSOR') && (playerTwoChoice == 'ROCK')) {
        playerTwoWins++
        $("#" + playerTwo + "Score").text(playerTwoWins)

    }else if ((playerOneChoice == 'ROCK') && (playerTwoChoice == 'PAPER')) {
        playerTwoWins++
        $("#" + playerTwo + "Score").text(playerTwoWins)

    }else if ((playerOneChoice == 'PAPER') && (playerTwoChoice == 'SCISSOR')) {
        playerTwoWins++
        $("#" + playerTwo + "Score").text(playerTwoWins)
    }
}

$(document).ready($(document).on("click", "#chatSubmit", function(){
    
    var input = $("#chatInput").val()
    chatLog.push(input)

    chatRef.once('value').then(function(snap){
        var numberChildren = snap.numChildren()
        database.ref('chatLogIndex').update({
            logCount: numberChildren
        })
    
        database.ref('chatLog').update({
            [numberChildren]: localStorage.getItem('user') + ": " + input
        })
    })
    $("#chatInput").val('')
}))

chatRef.on('child_added', function(data){
    
    var numberChildren = 0

    database.ref('chatLog').once('value').then(function(snapshot){
        
        numberChildren = snapshot.numChildren()
        console.log(numberChildren)

        if (numberChildren <= 6) {
            
            for (var i = numberChildren; i > 0; i-- ) {
                
                $('#chat' + i).text(snapshot.child(i).val())
                console.log(snapshot.child(i).val())
            }
        }else if (numberChildren > 6) {
            
            chatIndex = 6
            
            for (var i = numberChildren; i >= numberChildren - 6; i--) {
                    
                    $('#chat' + chatIndex).text(snapshot.child(i).val())
                    console.log(snapshot.child(i).val())
                    chatIndex--
            }
        }
    })
})