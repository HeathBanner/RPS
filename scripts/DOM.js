
const login = () => {

    return (
        `<div class="col-12">

            <div id="loginDiv">

                <h5>Login</h5>

                <hr>

                <form id="loginForm">

                    <input type="email" id="login" placeholder="Email" required>
                    <input type="password" id="password" placeholder="Password" required>
                    <input type="submit" id="submitLogin" value="Login">
                
                </form>

                <h6 id="loginWarning"></h6>

                <button id="loadSignup">
                    <h6>Not Signed Up?</h6>
                </button>

            </div>

        </div>`
    );
};
 
const signup = () => {

    return (
        `<div class="col-12">
    
            <div id="signupDiv">

                <h5>Sign Up</h5>

                <hr>

                <form id="signupForm">

                    <input type="text" name="username" placeholder="Username" required>
                    <input type="email" name="email" placeholder="Email" required>
                    <input type="password" name="password" placeholder="Password" required>

                    <input type="submit" value="Sign Up" id="submitSignup">
                
                </form>
                
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

                <div id="menuOffset">

                    <i id="menu" class="fa-2x fas fa-chevron-circle-left"></i>
                
                </div>

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

                <div id="menuOffset">

                    <i id="menu" class="fa-2x fas fa-chevron-circle-left"></i>
                
                    </div>

                <h5>Join a Public Lobby</h5>
                
                <hr>
                
            </div>

        </div>`
    );
};

const createPrivate = () => {

    return (
        `<div class="col-12">

            <div id="lobbyCreation">

                <div id="menuOffset">
                        <i id="menu" class="fa-2x fas fa-chevron-circle-left"></i>
                </div>

                <h5>Create a Private Match</h5>

                <hr>

                <input type="text" id="lobbyName" placeholder="Lobby Name" required>
                <input type="password" id="lobbyPass" placeholder="Lobby Password" required>
                
                <button id="submitPrivate">Create</button> 
                
                <h6 id="lobbyWarning"></h6>
            
            </div>

        </div>`
    );
};

const connectPrivate = () => {

    return (
        `<div class="col-12">

            <div id="connectContainer">
            
                <div id="menuOffset">

                    <i id="menu" class="fa-2x fas fa-chevron-circle-left"></i>
                
                </div>

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
        </div>`
    );
};

const chatInit = () => {

    return (
        `<div class="col-12">
                   
            <img src="imgs/rpsMainLogo.png" alt="logo" id="lobbyLogo">
            
            <div id="chatContainer">

                <div id="chatDiv">

                    <div id="msgContainer" data-count="0">
                        
                    </div>

                    <div id="inputDiv">

                        <input type="text" id="chatInput">
                        <button id="chatSubmit">Send</button>
                    
                        </div>
                    
                </div>
            </div>

        </div>`
    );
};