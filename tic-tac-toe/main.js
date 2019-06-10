function createBoard() {
    var boxs = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];
    var result = boxs.map(element => {
        return createBox(element);
    }).join("")
    return result
}


function createBox(number) {
    //console.log(`<div class="box" id="${number}"></div>`)
    return `<div class="box" id="${number}"></div>`
}


function makeBoard() {
    var board = createBoard();
    //console.log(board);
    var tiktak = $(".tik-tak-toe");
    tiktak.append(board);
    console.log(document.getElementsByClassName('tik-tak-toe').text);
}


function user1Move(box) {
    $(box).append('<div class="choice"><h1>X</h1></div>');
    $(box).addClass('user1').addClass('selected');
    $('.messages').text('Player 2 Turn');
}


function user2Move(box) {
    $(box).append('<div><h1>O</h1></div>');
    $(box).addClass('user2').addClass('selected');
    $('.messages').text('Player 1 Turn');
}


function InvalidMove() {
    var text = $('.messages').text();
    $('.messages').text('Error');
    $('.messages').addClass('error');
    setTimeout(function() {
        $('.messages').text(text);
        $('.messages').removeClass('error');
    }, 2000)
};


function resetBox() {
    $(".box").text('');
    $('.box').removeClass('selected').removeClass('user1').removeClass('user2').removeClass('won');
    $('.messages').text('Player 1 Turn');
    $('.tik-tak-toe').removeClass('finshed');
}


function evaluateWinner(moveMemory, user) {
    combos = [
        ['A1', 'A2', 'A3'],
        ['B1', 'B2', 'B3'],
        ['C1', 'C2', 'C3'],
        ['A1', 'B1', 'C1'],
        ['A2', 'B2', 'C2'],
        ['A3', 'B3', 'C3'],
        ['A1', 'B2', 'C3'],
        ['A3', 'B2', 'C1'],
    ];
    var choices = moveMemory[user];
    for (i = 0; i < combos.length; i++) {
        if (containsAll(combos[i], choices)) {
            $('.messages').text(`${user} Wins!`.toUpperCase());
            $('.tik-tak-toe').addClass('finshed');
            markWinner(combos[i]);
            break
        }
    };
};


function markWinner(winner) {
    for (i = 0; i < winner.length; i++) {
        $(`#${winner[i]}`).addClass('won');
    }
}


function containsAll(winner, memory) {
    for (var i = 0, len = winner.length; i < len; i++) {
        if ($.inArray(winner[i], memory) == -1) return false;
    }
    return true;
};


$(document).ready(function() {
    var moveMemory = {
        'user1': [],
        'user2': []
    }
    var move = 1;
    makeBoard();
    $(".button").click(function() {
        resetBox();
        move = 1;
        moveMemory = {
            'user1': [],
            'user2': []
        };
    });
    $(".box").click(function() {
        if ($('.tik-tak-toe').hasClass('finshed')) {
            return;
        }
        if (!$(this).hasClass('selected')) {
            if (move % 2) {
                user1Move(this);
                moveMemory['user1'].push(this.id)
                move++;
                evaluateWinner(moveMemory, 'user1');
            } else {
                user2Move(this);
                moveMemory['user2'].push(this.id);
                move++;
                evaluateWinner(moveMemory, 'user2');
            }
        } else {
            InvalidMove();
        };
    });
});