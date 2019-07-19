
const config = {
    apiKey: "AIzaSyAlPNMry6JqL2XeDIQ-2iAeTAwerXCXn38",
    authDomain: "rpsapp-a5bc6.firebaseapp.com",
    databaseURL: "https://rpsapp-a5bc6.firebaseio.com",
    projectId: "rpsapp-a5bc6",
    storageBucket: "rpsapp-a5bc6.appspot.com",
    messagingSenderId: "793047331326",
    appId: "1:793047331326:web:2989683cb3944c7b"
};
  
firebase.initializeApp(config);

const database = firebase.firestore();
const functions = firebase.functions();

const usersRef = database.collection('users');
const publicRef = database.collection('publicLobbies');
const privateRef = database.collection('privateLobbies');
const chatRef = database.collection('chat');

const addPrivateListener = (name) => {

    privateRef.doc(name).onSnapshot(snap => {
        
        let info = snap.data();

        let playerOneChoice = info.choices.playerOne.choice;
        let playerTwoChoice = info.choices.playerTwo.choice;

        const users = {
            playerOne: info.playerOne,
            playerTwo: info.playerTwo
        };

        playerJoin(info);
        isChoosing(info);

        if((!info.p1Active)&&(info.playerOne)) {
            privateRef.doc(name).update({
                p1Active: true
            });
        }
        if((!info.p2Active)&&(info.playerTwo)) {
            privateRef.doc(name).update({
                p2Active: true
            });
        }

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

    publicRef.doc(name).onSnapshot(snap => {
        
        let info = snap.data();

        let playerOneChoice = info.choices.playerOne.choice;
        let playerTwoChoice = info.choices.playerTwo.choice;


        const users = {
            playerOne: info.playerOne,
            playerTwo: info.playerTwo
        };

        playerJoin(info);
        isChoosing(info);

        if((!info.p1Active)&&(info.playerOne)) {

            publicRef.doc(name).update({
                p1Active: true
            });
        }
        if((!info.p2Active)&&(info.playerTwo)) {

            publicRef.doc(name).update({
                p2Active: true
            });
        }
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

const addChatListener = (lobby) => {
    
    chatRef.doc(lobby).onSnapshot(snap => {

        let chatLog = snap.data().chatLog;

        if(!chatLog) { return }

        return newMsg(snap.data());
    });
};

//=========================================================//

const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
};

const isOfflineForFirestore = {
    state: 'offline',
    last_changed: firebase.firestore.FieldValue.serverTimestamp()
};

const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
};

const isOnlineForFirestore = {
    state: 'online',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
};

firebase.database().ref('.info/connected').on('value', (snapshot => {
        
    if(!firebase.auth().currentUser) { return }
    
    var uid = firebase.auth().currentUser.uid;

    const userStatusDatabaseRef = firebase.database().ref('/status/' + uid);
    const userStatusFirestoreRef = firebase.firestore().doc('/status/' + uid);

    if (!snapshot.val()) {
        return userStatusFirestoreRef.set(isOfflineForFirestore);  
    };

    userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(() => {
            
        userStatusDatabaseRef.set(isOnlineForDatabase);
        userStatusFirestoreRef.set(isOnlineForFirestore);
    });
}));
    
var ties = 0
var playerOneWins = 0
var playerTwoWins = 0

//=========================================================//

if (localStorage.getItem('email')) {
    $("#login").val(localStorage.getItem('email'))
}

$(document).on("submit", '#loginForm', (e) => {
    
    e.preventDefault();

    let login = $("#login").val().trim().replace(/\s/g, '');
    let password = $('#password').val().trim()

    firebase.auth().signInWithEmailAndPassword(login, password).then(() => {
       
        localStorage.setItem('email', login);
        $('#root').empty();
        return $('#root').append(menu());

    }).catch((error) => {

        if(error){
            return $('#loginWarning').text(error.message);
        }
    });
});

$(document).on('click', '#signout', () => {
    firebase.auth().signOut().then(() => {
        console.log('signed out');
    })
    .catch((error) => {
        if(error) console.log(error);
    });
});

$(document).on("submit", '#signupForm', (e) => {
    
    e.preventDefault();

    let formData = $('#signupForm').serializeArray();
    let username = formData[0].value;
    let email = formData[1].value;
    let password = formData[2].value;

    if(username.length < 2) {return $('#loginWarning').text('You must provide more than 1 character for your Username!');}
    if(password.length < 6) {return $('#loginWarning').text('You must provide more than 1 character for your Password!');}

    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {

        let uid = firebase.auth().currentUser.uid;
        localStorage.setItem('email', email);

        $('#root').empty();
        $('#root').append(login());
        usersRef.doc(uid).set({
            username: username, password: password, email: email
        });
    })
    .catch((error) => {
        if(error){return $('#loginWarning').text(error.message)};
    });
});

$(document).on('click', '#joinPublic', () => {

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

    publicRef.where('name', '==', name).get().then(snap => {
        
        if(!snap.empty) {
            return $('#lobbyWarning').text('A lobby already exists with that name!');
        }
        if(snap.empty) {
            
            let uid = firebase.auth().currentUser.uid;

            usersRef.doc(uid).get().then(snapShot => {

                let username = snapShot.data().username;

                addPublicListener(name);
                addChatListener(name);
                renderLobby();
                renderButtons();
    
                usersRef.doc(uid).update({
                    lobby: name,
                    private: false,
                    public: true,
                    host: true,
                });
    
                chatRef.doc(name).set({
                    name: name,
                    host: uid,
                    playerOne: username
                });
    
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
            });
        }
    });
});

$(document).on('click', '.connectPublic', function() {

    let name = this.id;
    let uid = firebase.auth().currentUser.uid;

    publicRef.where('name', '==', name).get().then(lobby => {

        if(lobby.empty) {
            return $('#lobbyWarning').text('No lobby was found with the information you provided');
        }
        if(!lobby.empty) {

            usersRef.doc(uid).get(snap => {

                let username = snap.data().username;

                lobby.forEach((info) => {
    
                    let lobbyInfo = info.data();
    
                    if(lobbyInfo.name !== name) {
                        return $('#lobbyInfo').text(`Something appears to have broken :(`);
                    }
                    if(lobbyInfo.name === name) {
                        
                        if(lobbyInfo.full) {
                            return $('#lobbyWarning').text('This lobby is already full!');
                        }
                        if(!lobbyInfo.full) {
    
                            let uid = firebase.auth().currentUser.uid;
    
                            addPublicListener(name); 
                            addChatListener(name);
                            renderLobby();
                            renderButtons();
    
                            usersRef.doc(uid).update({
                                lobby: name,
                                private: false,
                                public: true,
                                host: false,
                            });
    
                            chatRef.doc(name).set({
                                name: name,
                                host: uid,
                                playerTwo: username
                            });
    
                            return publicRef.doc(name).update({
                                playerTwo: username,
                                full: true
                            });    
                        }
                    }
                });
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

    privateRef.where('name', '==', name).get().then(snap => {
        
        if(!snap.empty) {
            return $('#lobbyWarning').text('A lobby already exists with that name!');
        }
        if(snap.empty) {
            
            let uid = firebase.auth().currentUser.uid;

            usersRef.doc(uid).get().then(snapShot => {

                let username = snapShot.data().username;
                    
                addPrivateListener(name);
                addChatListener(name);
                renderLobby();
                renderButtons();
    
                usersRef.doc(uid).update({
                    lobby: name,
                    private: true,
                    public: false,
                    host: true,
                });
    
                chatRef.doc(name).set({
                    name: name,
                    host: uid,
                    playerOne: username
                });
    
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
            });

        }
    });
});
 
$(document).on('click', '#connectPrivate', () => {
    
    let name = $('#lobbyName').val().trim();
    let password = $('#lobbyPass').val().trim();

    privateRef.where('name', '==', name).get().then(lobby => {

        if(lobby.empty) {
            return $('#lobbyWarning').text('No lobby was found with the information you provided');
        }
        if(!lobby.empty) {

            let uid = firebase.auth().currentUser.uid;

            usersRef.doc(uid).get().then(snap => {

                let username = snap.data().username;
                
                lobby.forEach((info) => {
        
                    let lobbyInfo = info.data();
        
                    if(lobbyInfo.password !== password) {
                        return $('#lobbyInfo').text(`Password provided doesn't match`);
                    }
                    if(lobbyInfo.password === password) {
                        
                        if(lobbyInfo.full) {
                            return $('#lobbyWarning').text('This lobby is already full!');
                        }
                        if(!lobbyInfo.full) {
                            
                            let uid = firebase.auth().currentUser.uid;
        
                            localStorage.setItem('lobby', name); 
                            localStorage.setItem('openStatus', false);
        
                            addPrivateListener(name); 
                            addChatListener(name);
                            renderLobby();
                            renderButtons();
        
                            usersRef.doc(uid).update({
                                lobby: name,
                                private: true,
                                public: false,
                                host: false,
                            });
        
                            chatRef.doc(name).update({
                                playerTwo: username
                            });
        
                            return privateRef.doc(name).update({
                                playerTwo: username,
                                full: true
                            });    
                        }
                    }
                });
            });

        }
    });
});

$(document).on('click', '.btns', function() {
    
    let playerChoice = this.id;

    let uid = firebase.auth().currentUser.uid;

    usersRef.doc(uid).get().then(snapShot => {

        let username = snapShot.data().username;
        let lobby = snapShot.data().lobby;
        let open = snapShot.data().public;    

        if(open) {
    
            publicRef.doc(lobby).get().then(snap => {
    
                let playerOne = snap.data().playerOne;
                let playerTwo = snap.data().playerTwo;
                    
                $("#btnTarget").css({display: 'none'});
                $("#chosen").text(`Waiting for other player's choice!`);
        
                if((playerOne)&&(playerOne === username)) {
    
                    return publicRef.doc(lobby).update({
                        'choices.playerOne': {
                            isChoosing: false,
                            username: username,
                            choice: playerChoice.toUpperCase()
                        }
                    });
                }
                if((playerTwo)&&(playerTwo === username)) {
                 
                    return publicRef.doc(lobby).update({
                        'choices.playerTwo': {
                            isChoosing: false,
                            username: username,
                            choice: playerChoice.toUpperCase()
                        }
                    });
                }
            });
        }
        if(!open) {
    
            privateRef.doc(lobby).get().then(snap => {
    
                let playerOne = snap.data().playerOne;
                let playerTwo = snap.data().playerTwo;
                    
                $("#btnTarget").css({display: 'none'});
                $("#chosen").text(`Waiting for other player's choice!`);
        
                if((playerOne)&&(playerOne === username)) {
    
                    return privateRef.doc(lobby).update({
                        'choices.playerOne': {
                            isChoosing: false,
                            username: username,
                            choice: playerChoice.toUpperCase()
                        }
                    });
                }
                if((playerTwo)&&(playerTwo === username)) {
    
                    return privateRef.doc(lobby).update({
                        'choices.playerTwo': {
                            isChoosing: false,
                            username: username,
                            choice: playerChoice.toUpperCase()
                        }
                    });
                }
            });
        }
    });

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

$(document).on('click', '#chatSubmit', () => {
  
    let msg = $('#chatInput').val();
    let uid = firebase.auth().currentUser.uid;

    usersRef.doc(uid).get().then(snapShot => {

        let username = snapShot.data().username;
        let lobby = snapShot.data().lobby;    

        chatRef.doc(lobby).get().then(snap => {
    
            let chatLog = snap.data().chatLog;
    
            if(!chatLog) {
    
                return chatRef.doc(lobby).update({
                    chatLog: [{
                        uid: uid,
                        msg: msg,
                        username: username
                    }]
                });
            } 
            if(chatLog) {
    
                chatLog.push({
                    uid: uid,
                    msg: msg,
                    username: username,
                });
    
                return chatRef.doc(lobby).update({
                    chatLog: chatLog
                });
            }
        });
    });
    $("#chatInput").val('');
});