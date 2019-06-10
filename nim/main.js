var content = document.getElementById('content');

var nim = "Replace this with your own abstraction of Nim"

content.innerHTML = renderGame(nim);
take = document.getElementById("selection");
take.addEventListener("click", function (){makeGameMove()});
reset = document.getElementById("reset");
reset.addEventListener("click", function (){cleanup()});

const pebbles = document.getElementsByClassName('pebble').length;
let used = 0;
let remainder = 0;
let turns = 0;


function cleanup() {

    used = 0;
    remainder = 16;
    turns = 0;
    document.getElementsByTagName("h4")[0].innerHTML = `There are ${remainder} pebbles left`;
    document.getElementsByTagName("h4")[1].innerHTML = `How many pebbles will you take?`;
    var pebble = document.getElementsByClassName('pebble');
    for (i = 0; i < pebble.length; i++){
        pebble[i].classList.remove("active")
    }
    document.getElementById("takeInput").options[0].disabled = false;
    document.getElementById("takeInput").options[1].disabled = false;
    document.getElementById("takeInput").options[2].disabled = false;
    document.getElementsByTagName("body")[0].classList.remove('active');


}

function makeGameMove(){
    turns ++;
    var value = parseInt(document.getElementById("takeInput").value);
    selectPebbles(value);
    used += value;
    remainder = (pebbles - used);
    document.getElementsByTagName("h4")[0].innerHTML = `There are ${remainder} pebbles left`;
    checkForWinner(value);
    SwitchTurns()
}

function selectPebbles(value){
    var pebble = document.getElementsByClassName('pebble');
    for (i = used; i < (used + value); i++){
        pebble[i].classList.add("active")
    }
}

function SwitchTurns(){
    boxs = document.getElementsByClassName('box');
    if (turns % 2 ===0){
        boxs[0].classList.toggle("active");
        boxs[1].classList.toggle("active");
    }
    else{
        boxs[0].classList.toggle("active");
        boxs[1].classList.toggle("active");
    }
}

function checkForWinner(value){
    select = document.getElementById("takeInput");
    if (remainder == 2) {
        select.selectedIndex = 0;
        select.options[2].disabled = true;
    }
    else if (remainder == 1) {
        select.selectedIndex = 0;
        select.options[1].disabled = true;
        select.options[2].disabled = true;
    }
    else if (remainder == 0) {
        var winner = document.getElementsByClassName("box");
        select.selectedIndex = 0;
        document.getElementById("takeInput").options[0].disabled = true;
        document.getElementById("takeInput").options[1].disabled = true;
        document.getElementById("takeInput").options[2].disabled = true;
        selectWinner(winner)
    }
    
}

function selectWinner(winner) {
        if (turns % 2 ===0){
            result = winner[0].id;
        }
        else {
            result = winner[1].id;
        }
        document.getElementsByTagName("h4")[1].innerHTML = `${result} Wins!!!`;
        document.getElementsByTagName("body")[0].classList.add('active');
}

function renderGame(game) {
    // Change this render function to use the "game" parameter

    return `
        <div class="container d-flex flex-column justify-content-start align-items-center">
            <h4>There are 16 pebbles left</h4>
            <div class="w-50 text-center pebble-container">
                <div class="pebble" id="0"></div>
                <div class="pebble" id="1"></div>
                <div class="pebble" id="2"></div>
                <div class="pebble" id="3"></div>
                <div class="pebble" id="4"></div>
                <div class="pebble" id="5"></div>
                <div class="pebble" id="6"></div>
                <div class="pebble" id="7"></div>
                <div class="pebble" id="8"></div>
                <div class="pebble" id="9"></div>
                <div class="pebble"></div>
                <div class="pebble"></div>
                <div class="pebble"></div>
                <div class="pebble"></div>
                <div class="pebble"></div>
                <div class="pebble"></div>
            </div>
            <h4 class="mt-5">How many pebbles will you take?</h4>
            <table>
                <tr>
                    <th>Payer 1</th>
                    <th>Player 2</th>
                </tr>
                <tr>
                    <td id="player1"><div class="box active" id="Player1"></div></td>
                    <td id="player2"><div class="box" id="Player2"></div></td>
                </tr>
                </table>
            <div>
                <select id="takeInput">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <button class="btn btn-primary" id="selection">Take</button>
                <button class="btn btn-primary" id="reset">Reset</button>
            </div>
        </div>
    `
}