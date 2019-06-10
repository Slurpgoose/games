var content = document.getElementById('content');

var rockPaperScissors = "Replace this with your own abstraction of Rock Paper Scissors"

content.innerHTML = renderGame(rockPaperScissors);

let games = 0;
let user_wins = 0;
let cpu_wins = 0;
let win_percentage = 0;
buttons = document.getElementsByTagName("button");
for(i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", function(){
        games += 1;
        var move = this.innerHTML;
        var decision = computerDecision();
        var result = findWinner(move, decision);
        win_percentage = ((user_wins / games) * 100).toFixed(2)
        document.getElementById('total-game').innerHTML = `<b>${games}</b>`;
        document.getElementById('cpu').innerHTML = `<b>${cpu_wins}</b>`;
        document.getElementById('user').innerHTML = `${user_wins}</b>`;
        document.getElementById('percentage').innerHTML = `${win_percentage}%</b>`;
        document.getElementById('your-move').innerHTML = `You played: <b>${move}</b>`;
        document.getElementById('your-move').innerHTML = `You played: <b>${move}</b>`;
        document.getElementById('computer-move').innerHTML = `The computer played: <b>${decision}</b>`;
        document.getElementById('result').innerHTML = result;
        //console.log(decision);
})
}


function findWinner(move, decision) {
    if (move == 'Rock' & decision == 'Paper') {
        user_wins++;
        return 'You Win!!!'
    }
    else if (move == 'Scissors' & decision == 'Paper') {
        user_wins++;
        return 'You Win!!!'
    }
    else if (move == 'Paper' & decision == 'Rock') {
        user_wins++;
        return 'You Win!!!'
    }
    else if (move == decision) {
        return "Its a Tie '__'"
    }
    else {
        cpu_wins ++;
        return 'You Lost (ツ)'
    }
}


function computerDecision(){
    var options = ['Rock', 'Paper', 'Scissors']
    var decision = Math.floor(Math.random() * 3);
    console.log(decision);
    return options[decision]
}

function renderGame(game) {
    // Change this render function to use the "game" parameter

    return `
        <div class="container d-flex flex-column justify-content-start align-items-center">
            <h4>Choose your weapon:</h4>
            <div class="w-50 text-center">
                <button class="btn btn-primary">Rock</button>
                <button class="btn btn-primary">Paper</button>
                <button class="btn btn-primary">Scissors</button>
            </div>
            <div class="d-flex justify-content-center">
                <div class="m-5" id="your-move">You played: <b>ROCK</b></div>
                <div class="m-5" id="computer-move">The computer played: <b>SCISSORS</b></div>
            </div>
            <h1 class="text-center" id="result">Make a Decision</h1>
            <br>
            <table>
                <tr>
                    <th>Total Played</th>
                    <th>User Won</th>
                    <th>CPU Won</th>
                    <th>Win %</th>
                </tr>
                <tr>
                    <td id="total-game">0</td>
                    <td id="user">0</td>
                    <td id="cpu">0</td>
                    <td id="percentage">0</td>
                </tr>
                </table>
        </div>`
}
