

const login = () => {
    console.log('LOGIN')
    return (
        `<div class="col-12">
            <div id="loginDiv">
                <h5>Login</h5>
                <hr>
                <input type="text" id="login" placeholder="Username" required>
                <input type="password" id="password" placeholder="Password" required>
                <button id="submitLogin">Login</button>
                <h6 id="loginWarning"></h6>

                <button id="loadSignup">
                    <h6>Not Signed Up?</h6>
                </button>
            </div>
        </div>`
    );
};


        
const signup = () => {
    console.log('signup')
    return (
        `<div class="col-12">
        
            <div id="signupDiv">
                <h5>Sign Up</h5>
                <hr>
                <input type="text" id="login" placeholder="Username" required>
                <input type="password" id="password" placeholder="Password" required>
                <button id="submitSignup">Sign Up</button>
                <h6 id="loginWarning"></h6>

                <button id="loadLogin">
                    <h6>Not Signed Up?</h6>
                </button>
            </div>
        
        </div>`
    );
};

const menu = () => {
    return (
        `<div class="col-12">

            <div id="menuContainer">

                <button id="joinPublic">
                    <h6>Join Public Match</h6>
                </button>

                <button id="createPublic">
                    <h6>Create Public Match</h6>
                </button>

                <button id="joinPrivate">
                    <h6>Join Private Match</h6>
                </button>
                
                <button id="createPrivate">
                    <h6>Create Private Match</h6>
                </button>

            </div>

        </div>`
    );
};

const createPublic = () => {
    return (
        `<div class="col-12">

            <div id="lobbyCreation">
                <h5>Create a Public Match</h5>
                <hr>
                <input type="text" id="lobbyName" placeholder="Lobby Name" required>
                <button id="submitPublic">Create</button> 
                <h6 id="lobbyWarning"></h6>
            </div>

        </div>`
    );
};
 
const connectPublic = () => {
    return (
        `<div class="col-12">

            <div id="lobbyContainer">
                <h4>Join a Public Lobby</h4>
                <hr>
            </div>

        </div>`
    );
};

const createPrivate = () => {
    return (
        `<div class="col-12">

            <div id="lobbyCreation">
                <h5>Create a Private Match</h5>
                <hr>
                <input type="text" id="lobbyName" placeholder="Lobby Name" required>
                <input type="password" id="lobbyPass" placeholder="Lobby Password" required>
                <button id="submitPrivate">Create</button> 
                <h6 id="lobbyWarning"></h6>
            </div>

        </div>`
    )
}

const setLobby = () => {
    return (
        `<div class="col-12 scoreDiv">
            <div class="p1ScoreDiv">
                <h2 id="p1ScoreHead" class="p1ScoreHead">Player 1 Score</h2>
                    <span id="p1Score" class="p1Score">0</span>
            </div>
            
            <div class="tiesScoreDiv">
                <h2 class="tiesHead">Ties</h2>
                    <span id="ties" class="tiesScore">0</span>
            </div>

            <div class="p2ScoreDiv">
                <h2 id="p2ScoreHead" class="p2ScoreHead">Player 2 Score</h2>
                    <span id="p2Score" class="p2Score">0</span>
            </div>


            <div class="chooseDiv">

                <div class="p1ChoiceDiv">
                    <h4 id="p1Chooses" class="p1Chooses">Awaiting Player 1</h4>
                    <img id="p1Choice" class="p1Choice" src=''>
                    <img id="p1Choosing" class="playerChoosing playerChose" src="imgs/rpsLogo.png" alt="Player One Choosing">
                </div>

                <div class="p2ChoiceDiv">
                    <h4 id="p2Chooses" class="p2Chooses">Awaiting Player 2</h4>
                    <img id="p2Choice" class="p2Choice" scr=''>
                    <img id="p2Choosing" class="playerChoosing playerChose" src="imgs/rpsLogo.png" alt="Player Two Choosing">
                </div>

            </div>

            <div>

                <div id="outer">

                    <div id="btnTarget"></div>
                    <div id="notification">
                        <h1 id="chosen"></h1>
                    </div>

                </div>
                
            </div>
        </div>

        <div class="mediaQ">

            <div id="chatDiv">
                <p id="chat1" class="seatWarmer"></p>
                <p id="chat2" class="seatWarmer"></p>
                <p id="chat3" class="seatWarmer"></p>
                <p id="chat4" class="seatWarmer"></p>
                <p id="chat5" class="seatWarmer"></p>

                <div id="inputDiv">
                    <input type="text" id="chatInput">
                    <button id="chatSubmit">Send</button>
                </div>

            </div>
        </div>`
    );
};

const connectPrivate = () => {
    return (
        `<div class="col-12">

            <div id="connectContainer">
                <h5>Join a Private Match</h5>
                <hr>
                <input type="text" id="lobbyName" placeholder="Lobby Name" required>
                <input type="password" id="lobbyPass" placeholder="Lobby Password" required>
                <button id="connectPrivate">Join</button> 
                <h6 id="lobbyWarning"></h6>
            </div>

        </div>`
    );
};

        
//         lobby = {
//             load: `
//             <div class="row">
        
//             <div class="col-lg-12">
//                 <h1 id="rpsHeader">Rock Paper Scissors</h1>
//             </div>
        
//             </div>
//             <div class="row">
        
//             <div class="col-lg-12">
//                 <img src="imgs/rpsLogo.png" alt="logo" id="logo">
//             </div>
        
//             <div id="loginDiv">
//                 <input type="text" id="login" placeholder="Type your username...">
//                 <button id="submit">Login</button>
//                 <h6 id="loginWarning"></h6>
//             </div>
        
//             </div>
//             <div class="row">
        
            
//             </div>
        
//             </div>`
//         }
//     }
// }

// export function login() {
//     return (
//         `<div class="row">
            
//         <div class="col-lg-12">
//             <h1 id="rpsHeader">Rock Paper Scissors</h1>
//         </div>
    
//         </div>
//         <div class="row">
    
//         <div class="col-lg-12">
//             <img src="imgs/rpsLogo.png" alt="logo" id="logo">
//         </div>
    
//         <div id="loginDiv">
//             <h5>Choose a username!</h5>
//             <input type="text" id="login" placeholder="Username" required>
//             <input type="password" id="password" placeholder="Password" required>
//             <button id="submit">Login</button>
//             <h6 id="loginWarning"></h6>
//         </div>
    
//         </div>`
//     )
// };