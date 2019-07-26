
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

    $(document).on('click', '#menu', () => {
        $('#root').empty();
        return $('#root').append(menu());
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
    $('#trunk').empty();
    $('#root').append(setLobby());
    $('#trunk').append(chatInit());
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
        
        $(`.p1Chooses`).text(`${info.playerOne} Is Choosing`);
        $(`#p1Choosing`).addClass('playerChoosing');
    }

    if((info.playerTwo)&&(info.choices.playerTwo.isChoosing)) {
        
        $(`.p2Chooses`).text(`${info.playerTwo} Is Choosing`);
        $(`#p2Choosing`).addClass('playerChoosing');
    }
}

const playerJoin = (info) => {

    if(info.playerOne) {

        let playerOne = info.playerOne;
    
        $(`.p1ScoreHead`).text(playerOne);
        $(`.p1Chooses`).text(`Waiting for ${playerOne}'s choice!`);
    }
    if(info.playerTwo) {

        let playerTwo = info.playerTwo;

        $(`.p2ScoreHead`).text(playerTwo);
        $(`.p2Chooses`).text(`Waiting for ${playerTwo}'s choice!`);

    } else {

        $(`.p2ScoreHead`).text(`Player 2 Score`);
        $(`.p2Chooses`).text(`Awaiting Player 2`);
        $('.p1Score').text('0');
        $('.p2Score').text('0');
        $('.tiesScore').text('0');
    }
};

const newMsg = (chat) => {

    let username = chat.chatLog[chat.chatLog.length - 1].username;
    let msg = chat.chatLog[chat.chatLog.length - 1].msg;
    let playerOne = chat.playerOne;
    let playerTwo = chat.playerTwo;
    let chatCount = chat.chatLog.length;
    let currentCount = $('#msgContainer').attr('data-count');

    $('#msgContainer').attr('data-count', chatCount);

    if(currentCount == chatCount) { return }

    if(currentCount == chatCount - 1) {
    
        if(username === playerOne) {

            return $('#msgContainer').prepend(`<p class="msg p1">${username}: ${msg}</p>`);
        }
        if(username === playerTwo) {
            
            return $('#msgContainer').prepend(`<p class="msg p2">${username}: ${msg}</p>`);
        }   

    } else {
                
        chat.chatLog.forEach((msg) => {
            if(msg.username === playerOne) {

                return $('#msgContainer').prepend(`<p class="msg p1">${msg.username}: ${msg.msg}</p>`);
            }
            if(msg.username === playerTwo) {
                
                return $('#msgContainer').prepend(`<p class="msg p2">${msg.username}: ${msg.msg}</p>`);
            }        
        });
    }
};