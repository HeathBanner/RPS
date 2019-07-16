
const config = {
    apiKey: "AIzaSyAJS4YQWU5DmESeYueG1qH1NGkjv3DncEY",
    authDomain: "fir-click-counter-7cdb9.firebaseapp.com",
    databaseURL: "https://rpsapp-a5bc6.firebaseio.com/",
    projectId: 'rpsapp-a5bc6'
};
  
firebase.initializeApp(config);

const database = firebase.firestore();

const usersRef = database.collection('users');
const publicRef = database.collection('publicLobbies');
const privateRef = database.collection('privateLobbies');

const addPrivateListener = (name) => {

    privateRef.doc(name).onSnapshot((snap) => {
        
        let info = snap.data();

        let playerOneChoice = info.choices.playerOne.choice;
        let playerTwoChoice = info.choices.playerTwo.choice;


        const users = {
            playerOne: info.playerOne,
            playerTwo: info.playerTwo
        };

        if((!info.p1Active)&&(info.playerOne)) {

            playerJoin(info);
            privateRef.doc(name).update({
                p1Active: true
            });
        }
        if((!info.p2Active)&&(info.playerTwo)) {

            playerJoin(info);
            privateRef.doc(name).update({
                p2Active: true
            });
        }
        console.log(info);
        isChoosing(info);

        if((playerOneChoice)&&(playerTwoChoice)) {
        
            $(`.p1Choice`).attr('src', `./imgs/${playerOneChoice.toLowerCase()}.png`);
            $('.p1Choice').toggleClass('playerChoice');
    
            $(`.p2Choice`).attr('src', `./imgs/${playerTwoChoice.toLowerCase()}.png`);
            $('.p2Choice').toggleClass('playerChoice');
    
            $('#p1Choosing').css({display: 'none'});
            $('#p2Choosing').css({display: 'none'});
            
            setTimeout(() => {
                rpsRules(playerOneChoice, playerTwoChoice, users);
            }, 1000);
        
            setTimeout(() => {
                
                $(`.p1Choice`).attr('src', ``);
                $('.p1Choice').toggleClass('playerChoice');
    
                $(`.p2Choice`).attr('src', ``);
                $('.p2Choice').toggleClass('playerChoice');
    
                $('#p1Choosing').css({display: 'inline-block'});
                $('#p2Choosing').css({display: 'inline-block'});
    
                $("#chosen").text('');
                
                $(`#btnTarget`).css({display: 'block'});
    
                    privateRef.doc(name).update({
                        'choices.playerOne': {choice: '', isChoosing: true},
                        'choices.playerTwo': {choice: '', isChoosing: true}
                    });
            }, 5000)
        }
    });   
};

const addPublicListener = (name) => {

    publicRef.doc(name).onSnapshot((snap) => {
        
        let info = snap.data();

        let playerOneChoice = info.choices.playerOne.choice;
        let playerTwoChoice = info.choices.playerTwo.choice;


        const users = {
            playerOne: info.playerOne,
            playerTwo: info.playerTwo
        };

        if((!info.p1Active)&&(info.playerOne)) {

            playerJoin(info);
            publicRef.doc(name).update({
                p1Active: true
            });
        }
        if((!info.p2Active)&&(info.playerTwo)) {

            playerJoin(info);
            publicRef.doc(name).update({
                p2Active: true
            });
        }
        console.log(info);
        isChoosing(info);

        if((playerOneChoice)&&(playerTwoChoice)) {
        
            $(`.p1Choice`).attr('src', `./imgs/${playerOneChoice.toLowerCase()}.png`);
            $('.p1Choice').toggleClass('playerChoice');
    
            $(`.p2Choice`).attr('src', `./imgs/${playerTwoChoice.toLowerCase()}.png`);
            $('.p2Choice').toggleClass('playerChoice');
    
            $('#p1Choosing').css({display: 'none'});
            $('#p2Choosing').css({display: 'none'});
            
            setTimeout(() => {
                rpsRules(playerOneChoice, playerTwoChoice, users);
            }, 1000);
        
            setTimeout(() => {
                
                $(`.p1Choice`).attr('src', ``);
                $('.p1Choice').toggleClass('playerChoice');
    
                $(`.p2Choice`).attr('src', ``);
                $('.p2Choice').toggleClass('playerChoice');
    
                $('#p1Choosing').css({display: 'inline-block'});
                $('#p2Choosing').css({display: 'inline-block'});
    
                $("#chosen").text('');
                
                $(`#btnTarget`).css({display: 'block'});
    
                    publicRef.doc(name).update({
                        'choices.playerOne': {choice: '', isChoosing: true},
                        'choices.playerTwo': {choice: '', isChoosing: true}
                    });
            }, 5000)
        }
    });   
};  

//=========================================================//

var ties = 0
var playerOneWins = 0
var playerTwoWins = 0

//=========================================================//

if (localStorage.getItem('user')) {
    $("#login").val(localStorage.getItem('user'))
}

$(document).on("click", '#submitLogin', () => {
    
    let login = $("#login").val().trim().replace(/\s/g, '');
    let password = $('#password').val().trim()

    if(login.length < 2){return $('#loginWarning').text('You must provide more than 1 character for your Username!');}
    if(password.length < 6){return $('#loginWarning').text('You must provide more than 1 character for your Password!');}

    localStorage.setItem('user', login);

    usersRef.where('username', '==', login).get().then(function(snap){

        if(snap.empty) {
            return usersRef.doc().set({username: login, password: password}, {merge: true});
        }
        
        snap.forEach((user) => {
            
            if(user.data().password === password) {
                console.log('CORRECT');
                $('#root').empty();
                return $('#root').append(menu());
            }
            if(user.data().password !== password) {
                return $('#loginWarning').text('Incorrect Credentials!');
            }
        });
    });
});

$(document).on("click", '#submitSignUp', () => {
    
    let login = $("#login").val().trim().replace(/\s/g, '');
    let password = $('#password').val().trim()

    if(login.length < 2){return $('#loginWarning').text('You must provide more than 1 character for your Username!');}
    if(password.length < 6){return $('#loginWarning').text('You must provide more than 1 character for your Password!');}

    usersRef.where('username', '==', login).get().then(function(snap){

        if(snap.empty) {
            console.log('CORRECT');

            $('#root').empty();
            $('#root').append(menu());
            localStorage.setItem('user', login);
            return usersRef.doc().set({username: login, password: password}, {merge: true});
        }
        if(!snap.empty) {
            return $('#loginWarning').text('Incorrect Credentials!');
        }
    });
});

$(document).on('click', '#joinPublic', () => {

    console.log('GET PUBLIC LOBBIES');
    publicRef.get().then((snap) => {

        snap.forEach((lobby) => {
            if(!lobby.data().full) {lobbyInput(lobby)}
        });
    });
});

$(document).on('click', '#submitPublic', () => {
    let name = $('#lobbyName').val();

    if(name.length < 3) {
        return $('#lobbyWarning').text('The lobby name must be more than 3 characters!');
    }

    publicRef.where('name', '==', name).get().then((snap) => {
        
        if(!snap.empty) {
            return $('#lobbyWarning').text('A lobby already exists with that name!');
        }
        if(snap.empty) {
            console.log('SETTING NEW LOBBY');
            
            let username = localStorage.getItem('user');

            localStorage.setItem('lobby', name); 
            localStorage.setItem('openStatus', true);

            addPublicListener(name);
            renderLobby();
            renderButtons();
            return publicRef.doc(name).set({
                name: name,
                full: false,
                playerOne: username,
                p1Active: false,
                p2Active: false,
                choices: {
                    playerOne: {
                        isChoosing: true
                    },
                    playerTwo: {
                        isChoosing: true
                    }
                }
            });
        }
    });
});

$(document).on('click', '.connectPublic', function() {

    let name = this.id;
    let username = localStorage.getItem('user');

    publicRef.where('name', '==', name).get().then((lobby) => {

        if(lobby.empty) {
            return $('#lobbyWarning').text('No lobby was found with the information you provided');
        }
        if(!lobby.empty) {
            lobby.forEach((info) => {

                let lobbyInfo = info.data();

                if(lobbyInfo.name !== name) {
                    return $('#lobbyInfo').text(`Something appears to have broken :(`);
                }
                if(lobbyInfo.name === name) {
                    console.log(info.data());
                    if(lobbyInfo.full) {
                        return $('#lobbyWarning').text('This lobby is already full!');
                    }
                    if(!lobbyInfo.full) {

                        localStorage.setItem('lobby', name);
                        localStorage.setItem('openStatus', true);

                        addPublicListener(name); 
                        renderLobby();
                        renderButtons();
                        return publicRef.doc(name).update({
                            playerTwo: username,
                            full: true
                        });    
                    }
                }
            });
        }
    });
});

$(document).on('click', '#submitPrivate', () => {

    let name = $('#lobbyName').val().trim();
    let password = $('#lobbyPass').val().trim();

    if(name.length < 3) {
        return $('#lobbyWarning').text('The lobby name must be more than 3 characters!');
    }
    if (password.length < 6) {
        return $('#lobbyWarning').text('The lobby password must be more than 6 characters!');
    }

    privateRef.where('name', '==', name).get().then((snap) => {
        
        if(!snap.empty) {
            return $('#lobbyWarning').text('A lobby already exists with that name!');
        }
        if(snap.empty) {
            console.log('SETTING NEW LOBBY');
            
            let username = localStorage.getItem('user');

            localStorage.setItem('lobby', name); 
            localStorage.setItem('openStatus', false);

            addPrivateListener(name);
            renderLobby();
            renderButtons();
            return privateRef.doc(name).set({
                name: name,
                password: password,
                full: false,
                playerOne: username,
                p1Active: false,
                p2Active: false,
                choices: {
                    playerOne: {
                        isChoosing: true
                    },
                    playerTwo: {
                        isChoosing: true
                    }
                }
            });
        }
    });
});
 
$(document).on('click', '#connectPrivate', () => {
    let name = $('#lobbyName').val().trim();
    let password = $('#lobbyPass').val().trim();
    let username = localStorage.getItem('user');

    privateRef.where('name', '==', name).get().then((lobby) => {

        if(lobby.empty) {
            return $('#lobbyWarning').text('No lobby was found with the information you provided');
        }
        if(!lobby.empty) {
            lobby.forEach((info) => {

                let lobbyInfo = info.data();

                if(lobbyInfo.password !== password) {
                    return $('#lobbyInfo').text(`Password provided doesn't match`);
                }
                if(lobbyInfo.password === password) {
                    console.log(info.data());
                    if(lobbyInfo.full) {
                        return $('#lobbyWarning').text('This lobby is already full!');
                    }
                    if(!lobbyInfo.full) {

                        localStorage.setItem('lobby', name); 
                        localStorage.setItem('openStatus', false);

                        addPrivateListener(name); 
                        renderLobby();
                        renderButtons();
                        return privateRef.doc(name).update({
                            playerTwo: username,
                            full: true
                        });    
                    }
                }
            });
        }
    });
});

$(document).on('click', '.btns', function() {
    let playerChoice = this.id;
    let user = localStorage.getItem('user');
    let lobby = localStorage.getItem('lobby');
    let open = localStorage.getItem('openStatus');
    
    if(open) {

        publicRef.doc(lobby).get().then(snap => {
            
            console.log(snap.data());
    
            $("#btnTarget").css({display: 'none'});
            $("#chosen").text(`Waiting for other player's choice!`);
    
            if((snap.data().playerOne)&&(snap.data().playerOne === user)) {
                console.log('PLAYER ONE')
                return publicRef.doc(lobby).update({
                        'choices.playerOne': {
                            isChoosing: false,
                            username: user,
                            choice: playerChoice.toUpperCase()
                        }
                });
            }
            if((snap.data().playerTwo)&&(snap.data().playerTwo === user)) {
                console.log('PLAYERTWO')
                return publicRef.doc(lobby).update({
                        'choices.playerTwo': {
                            isChoosing: false,
                            username: user,
                            choice: playerChoice.toUpperCase()
                        }
                });
            }
        });

    }
    if(!open) {

        privateRef.doc(lobby).get().then(snap => {
            
            console.log(snap.data());
    
            $("#btnTarget").css({display: 'none'});
            $("#chosen").text(`Waiting for other player's choice!`);
    
            if((snap.data().playerOne)&&(snap.data().playerOne === user)) {
                console.log('PLAYER ONE')
                return privateRef.doc(lobby).update({
                        'choices.playerOne': {
                            isChoosing: false,
                            username: user,
                            choice: playerChoice.toUpperCase()
                        }
                });
            }
            if((snap.data().playerTwo)&&(snap.data().playerTwo === user)) {
                console.log('PLAYERTWO')
                return privateRef.doc(lobby).update({
                        'choices.playerTwo': {
                            isChoosing: false,
                            username: user,
                            choice: playerChoice.toUpperCase()
                        }
                });
            }
        });
    }

});

const rpsRules = (playerOneChoice, playerTwoChoice, users) => {
    
    let playerOne = users.playerOne;
    let playerTwo = users.playerTwo
    
    if ((playerOneChoice === 'ROCK') && (playerTwoChoice == 'ROCK')) {
        ties++;
        $("#ties").text(ties);
        return $('#chosen').text(`It's a tie!`);
        
    }else if ((playerOneChoice === 'PAPER') && (playerTwoChoice == 'PAPER')) {
        ties++;
        $("#ties").text(ties);
        return $('#chosen').text(`It's a tie!`);

    }else if ((playerOneChoice === 'SCISSOR') && (playerTwoChoice == 'SCISSOR')) {
        ties++;
        $("#ties").text(ties);
        return $('#chosen').text(`It's a tie!`);

    }else if ((playerOneChoice === 'ROCK') && (playerTwoChoice === 'SCISSOR')) {
        playerOneWins++;
        $(`.p1Score`).text(playerOneWins);
        return $('#chosen').text(`${playerOne} wins!`);

    }else if ((playerOneChoice === 'SCISSOR') && (playerTwoChoice === 'PAPER')) {
        playerOneWins++;
        $(`.p1Score`).text(playerOneWins);
        return $('#chosen').text(`${playerOne} wins!`);

    }else if ((playerOneChoice === 'PAPER') && (playerTwoChoice === 'ROCK')) {
        playerOneWins++;
        $(`.p1Score`).text(playerOneWins);
        return $('#chosen').text(`${playerOne} wins!`);

    }else if ((playerOneChoice === 'SCISSOR') && (playerTwoChoice === 'ROCK')) {
        playerTwoWins++;
        $(`.p2Score`).text(playerTwoWins);
        return $('#chosen').text(`${playerTwo} wins!`);

    }else if ((playerOneChoice === 'ROCK') && (playerTwoChoice === 'PAPER')) {
        playerTwoWins++;
        $(`.p2Score`).text(playerTwoWins);
        return $('#chosen').text(`${playerTwo} wins!`);

    }else if ((playerOneChoice === 'PAPER') && (playerTwoChoice === 'SCISSOR')) {
        playerTwoWins++;
        $(`.p2Score`).text(playerTwoWins);
        return $('#chosen').text(`${playerTwo} wins!`);
    }
}

// $(document).ready($(document).on("click", "#chatSubmit", function(){
    
//     var input = $("#chatInput").val();
//     chatLog.push(input);

//     chatRef.once('value').then(function(snap){
//         var numberChildren = snap.numChildren();
//         chatLog.update({
//             logCount: numberChildren
//         });
    
//         chatRef.update({
//             [numberChildren]: `${localStorage.getItem('user')}: ${input}`
//         });
//     });
//     $("#chatInput").val('');
// }));

// chatRef.on('child_added', function(){
    
//     var numberChildren = 0

//     chatRef.once('value').then(function(snapshot){
        
//         numberChildren = snapshot.numChildren()
//         console.log(numberChildren)

//         if (numberChildren <= 6) {
            
//             for (var i = numberChildren; i > 0; i-- ) {
                
//                 $('#chat' + i).text(snapshot.child(i).val())
//                 console.log(snapshot.child(i).val())
//             }
//         }else if (numberChildren > 6) {
            
//             chatIndex = 6
            
//             for (var i = numberChildren; i >= numberChildren - 6; i--) {
                    
//                     $('#chat' + chatIndex).text(snapshot.child(i).val())
//                     console.log(snapshot.child(i).val())
//                     chatIndex--
//             }
//         }
//     })
// })