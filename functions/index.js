const functions = require('firebase-functions');
const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.onUserStatusChanged = functions.database.ref('/status/{userId}').onUpdate((snapshot, context) => {
    
    const statusRef = firestore.collection('/status');
    const usersRef = firestore.collection('/users');
    const privateRef = firestore.collection('/privateLobbies');
    const publicRef = firestore.collection('/publicLobbies');
    const chatRef = firestore.collection('/chat');

    console.log(snapshot.after.val());
    console.log(context.params);
    
    if(snapshot.after.val().state === 'offline') {
        
        usersRef.doc(context.params.userId).get().then(snap => {
            
            let info = snap.data();

            console.log(`USERNAME ${info.username} is host: ${info.host} of lobby: ${info.lobby}`);

            statusRef.doc(context.params.userId).update({
                state: 'offline',
                last_changed: snapshot.after.val().last_changed
            });

            usersRef.doc(context.params.userId).update({
                host: false,
                lobby: '',
                private: false,
                public: false
            });

            if(!info.lobby){return console.log('NOT LOBBY')}

            if(info.host) {

                chatRef.doc(info.lobby).delete();

                if(info.private) {
                    console.log(`HOST PRIVATE`)
                    return privateRef.doc(info.lobby).delete();
                }
                if(info.public) {
                    console.log(`HOST PUBLIC`)
                    return publicRef.doc(info.lobby).delete();
                }
            }
            if(!info.host) {
                if(info.private) {
                    console.log(`NO HOST PRIVATE`)
                    return privateRef.doc(info.lobby).update({
                        full: false,
                        p2Active: false,
                        playerTwo: ''
                    });
                }
                if(info.public) {
                    console.log(`NO HOST PUBLIC`)
                    return publicRef.doc(info.lobby).update({
                        full: false,
                        p2Active: false,
                        playerTwo: ''
                    });
                }
            }
        });
    }
});
