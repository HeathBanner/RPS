

var config = {
    apiKey: "AIzaSyAJS4YQWU5DmESeYueG1qH1NGkjv3DncEY",
    authDomain: "fir-click-counter-7cdb9.firebaseapp.com",
    databaseURL: "https://rpsapp-a5bc6.firebaseio.com/",
    storageBucket: "fir-click-counter-7cdb9.appspot.com"
};
  
firebase.initializeApp(config);

var database = firebase.database();

//=========================================================//



var username =  'username1'
var flagCount = 0
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
database.ref('chatLog').update({
    logCount: 1,
})

//=========================================================//

if (localStorage.getItem('user')) {
    $("#loginInput").val(localStorage.getItem('user'))
}

var connectedRef = firebase.database().ref('.info/connected');

var myRef = firebase.database().ref();

connectedRef.on('value', function(snap) {

    myRef.onDisconnect().remove()
})

database.ref().on('value', function(snap){
    
    if (!snap.val()) {
        
        console.log("Peace!")
        location.reload()

    }else {
        console.log("Not yet...")
    }
})

$("#submit").on("click", function() {
    
    login = $("#login").val().trim()

    localStorage.setItem('user', login)

    database.ref().once('value').then(function(snapshot){
        
        database.ref('users').update({
            [login]: true,
        })
    })
    $("#login").remove()
    $("#submit").remove()

    $("#btnTarget").append('<img src="imgs/rock.png" id="rock" class="btns" value="rock" alt="rock">')
    $("#btnTarget").append('<img src="imgs/paper.png" id="paper" class="btns" value="paper" alt="paper">')
    $("#btnTarget").append('<img src="imgs/scissor.png" id="scissor" class="btns" value="scissor" alt="scissor">')

    $("#chatSubmit").css({
        visibility: 'visible',
    })
})

database.ref('users').on('child_added', function(data){
    if (data.val()) {
        
        flagCount++
        var numberChildren = 0

        database.ref('users').once('value').then(function(snapshot){
            numberChildren = snapshot.numChildren()
        
        users.push(data.key)
        if (numberChildren == 1) {
            
            playerOne = data.key
            console.log("PLAYER ONE" + playerOne)
            $("#p1ScoreHead").addClass(playerOne)
            $("#p1Score").addClass(playerOne)
            $("#p1Chooses").addClass(playerOne)
            $("#p1Choice").addClass(playerOne)

            $("#p1ScoreHead").attr('id', playerOne + "ScoreHead")
            $("#p1Score").attr('id', playerOne + "Score")
            $("#p1Chooses").attr('id', playerOne + "Chooses")
            $("#p1Choice").attr('id', playerOne + "Choice")

            $("#" + playerOne + "ScoreHead").text(playerOne)
            $("#" + playerOne + "Chooses").text(playerOne + " Chooses!")

        } else if (numberChildren == 2) {
            
            playerTwo = data.key
            console.log("PLAYER TWO" + playerTwo)
            $("#p2ScoreHead").addClass(playerTwo)
            $("#p2Score").addClass(playerTwo)
            $("#p2Chooses").addClass(playerTwo)
            $("#p2Choice").addClass(playerTwo)

            $("#p2ScoreHead").attr('id', playerTwo + "ScoreHead")
            $("#p2Score").attr('id', playerTwo + "Score")
            $("#p2Chooses").attr('id', playerTwo + "Chooses")
            $("#p2Choice").attr('id', playerTwo + "Choice")

            $("#" + playerTwo + "ScoreHead").text(playerTwo)
            $("#" + playerTwo + "Chooses").text(playerTwo + " Chooses!")
        }
        })
    }else {
        console.log("missing one player!")
    }




})

$(document).ready($(document).on("click", ".btns", function(){
    
    playerChoice = this.id

    database.ref('users').once('value').then(function(data){

        user = localStorage.getItem('user')
    
        if (data.child(localStorage.getItem('user')).val()) {

            database.ref('choices').update({
                    [user]: playerChoice.toUpperCase(),
            })

            database.ref('users').update({
                [user]: false
            })

            $("#btnTarget").css({
                display: 'none',
            })

            $("#chosen").text("Waiting for other player's choice!")
        }
    })
}))

database.ref('choices').on('child_added', function(data){
    
    if (data.key == playerOne) {
        
        playerOneChoice = data.val()
        console.log(data.val())

    } else if (data.key == playerTwo) {
        
        playerTwoChoice = data.val()
        console.log(data.val())
    }

    if ((playerOneChoice) && (playerTwoChoice)) {
        
        console.log("WOOOH")
        console.log(playerOneChoice)
        console.log(playerTwoChoice)
        $("#" + playerOne + "Choice").text(playerOneChoice)
        $("#" + playerTwo + "Choice").text(playerTwoChoice)
        
        rpsRules()  
        
        setTimeout(function(){
            $("#" + playerOne + "Choice").text("")
            $("#" + playerTwo + "Choice").text("") 
            $("#btnTarget").css({
                display: 'block',
            })

            $("#chosen").text("")

            database.ref('choices').remove()
            playerOneChoice = ''
            playerTwoChoice = ''
            
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

    database.ref('chatLog').once('value').then(function(snap){
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

database.ref('chatLog').on('child_added', function(data){
    
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