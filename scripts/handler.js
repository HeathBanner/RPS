
$(document).ready(() => {
    
    $(document).on('click', '#loadSignup', () => {
        $('#root').empty();
        $('#root').append(signup());
    });

    $(document).on('click', '#loadLogin', () => {
        $('#root').empty();
        $('#root').append(login());
    });

    $(document).on('click', '#createPublic', () => {
        $('#root').empty();
        $('#root').append(createPublic());
    });

    $(document).on('click', '#joinPublic', () => {
        $('#root').empty();
        $('#root').append(connectPublic());
    });

    $(document).on('click', '#createPrivate', () => {
        $('#root').empty();
        $('#root').append(createPrivate())
    });

    $(document).on('click', '#joinPrivate', () => {
        $('#root').empty();
        $('#root').append(connectPrivate());
    });
});

const lobbyInput = (lobby) => {

    $('#lobbyContainer').append(
        `<div class="lobby">
            <h4>${lobby.data().name}</h4>
            <hr>
            <h5>Player: ${lobby.data().playerOne}</h5>
            <button id="${lobby.data().name}" class="connectPublic">Join</button>
        </div>`
    );
};

const renderLobby = () => {
    $('#root').empty();
    $('#root').append(setLobby());
};

const renderButtons = () => {
    $("#btnTarget").append('<img src="imgs/rock.png" id="rock" class="btns" value="rock" alt="rock">');
    $("#btnTarget").append('<img src="imgs/paper.png" id="paper" class="btns" value="paper" alt="paper">');
    $("#btnTarget").append('<img src="imgs/scissor.png" id="scissor" class="btns" value="scissor" alt="scissor">');
};

const isChoosing = (info) => {

    if(!info.choices.playerOne.isChoosing) {
        $(`.p1Chooses`).text(`${info.playerOne} Has Chosen!`);
        $(`#p1Choosing`).removeClass('playerChoosing');
    }
    if((info.playerTwo)&&(!info.choices.playerTwo.isChoosing)) {
        $(`.p2Chooses`).text(`${info.playerTwo} Has Chosen!`);
        $(`#p2Choosing`).removeClass('playerChoosing');
    }

    if(info.choices.playerOne.isChoosing) {
        console.log('ADDING BACK CLASS')
        $(`.p1Chooses`).text(`${info.playerOne} Is Choosing`);
        $(`#p1Choosing`).addClass('playerChoosing');
    }
    if((info.playerTwo)&&(info.choices.playerTwo.isChoosing)) {
        console.log('ADDING BACK CLASS')
        $(`.p2Chooses`).text(`${info.playerTwo} Is Choosing`);
        $(`#p2Choosing`).addClass('playerChoosing');
    }
}

const playerJoin = (info) => {

    if(info.playerOne) {

        let playerOne = info.playerOne;

        $("#p1ScoreHead").addClass(playerOne);
        $("#p1Score").addClass(playerOne);
        $("#p1Chooses").addClass(playerOne);
        $("#p1Choice").addClass(playerOne);
        $("#p1ChoiceDiv").addClass(`${playerOne}ChoiceDiv`);
        $('#p1Choosing').addClass(`${playerOne}Img`);
    
        $("#p1ScoreHead").attr('id', `${playerOne}ScoreHead`);
        $("#p1Score").attr('id', `${playerOne}Score`);
        $("#p1Chooses").attr('id', `${playerOne}Chooses`);
        $("#p1Choice").attr('id', `${playerOne}Choice`);
    
        $(`#${playerOne}ScoreHead`).text(playerOne);
        $(`#${playerOne}Chooses`).text(`Waiting for ${playerOne}'s choice!`);
    }
    if(info.playerTwo) {

        let playerTwo = info.playerTwo;

        $("#p2ScoreHead").addClass(playerTwo);
        $("#p2Score").addClass(playerTwo);
        $("#p2Chooses").addClass(playerTwo);
        $("#p2Choice").addClass(playerTwo);
        $("#p2ChoiceDiv").addClass(`${playerTwo}ChoiceDiv`);
        $('#p2Choosing').addClass(`${playerTwo}Img`);
    
        $("#p2ScoreHead").attr('id', `${playerTwo}ScoreHead`);
        $("#p2Score").attr('id', `${playerTwo}Score`);
        $("#p2Chooses").attr('id', `${playerTwo}Chooses`);
        $("#p2Choice").attr('id', `${playerTwo}Choice`);
    
        $(`#${playerTwo}ScoreHead`).text(playerTwo);
        $(`#${playerTwo}Chooses`).text(`Waiting for ${playerTwo}'s choice!`);
    }
};