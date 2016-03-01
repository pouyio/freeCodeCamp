var PLAYER = {
  HUMAN: 1,
  CPU: 2,
  //Default options
  HUMAN_OPTION: "X",
  CPU_OPTION: "O"
};
var COLOR = {
  HUMAN: "#5D9ECE",
  CPU: "#ED5565",
  GREEN: "#1D592F",
  GREEN_BG: "#AAC091",
  YELLOW: "#FFCE54",
  CPU_WIN: "#48CFAD"
}
var ESTATE = {
  PLAYING: 0,
  WAITING: 1,
  FINISHED: 2
};

function Board() {
  this.panel = [];
  this.cels = [];
  for (var i = 0; i < 9; i++) {
    this.cels[i] = document.getElementById("cel" + (i + 1));
  }
}

Board.prototype.reset = function() {
  this.panel = [0, 0, 0, 0, 0, 0, 0, 0, 0];
};

Board.prototype.markable = function(position) {
  return (this.panel[position] == 0);
};

Board.prototype.mark = function(turn, position) {
  this.panel[position] = turn;
};

Board.prototype.isWinner = function(player) {
  //HORIZONTAL
  var bool = (this.panel[0] == player && this.panel[1] == player && this.panel[2] == player);
  bool = bool || (this.panel[3] == player && this.panel[4] == player && this.panel[5] == player);
  bool = bool || (this.panel[6] == player && this.panel[7] == player && this.panel[8] == player);
  //VERTICAL
  bool = bool || (this.panel[0] == player && this.panel[3] == player && this.panel[6] == player);
  bool = bool || (this.panel[1] == player && this.panel[4] == player && this.panel[7] == player);
  bool = bool || (this.panel[2] == player && this.panel[5] == player && this.panel[8] == player);
  //DIAGONAL
  bool = bool || (this.panel[0] == player && this.panel[4] == player && this.panel[8] == player);
  bool = bool || (this.panel[2] == player && this.panel[4] == player && this.panel[6] == player);
  return bool;
};

Board.prototype.emptyCels = function() {
  var n = this.panel.length;
  for (var i = 0; i < n; i++) {
    if (this.panel[i] == 0) {
      return true;
    }
  }
  return false;
};

Board.prototype.draw = function() {
  var n = this.panel.length;
  for (var i = 0; i < n; i++) {
    if (this.panel[i] == 0) {
      this.cels[i].innerHTML = '';
    } else {
      this.cels[i].innerHTML = '<span style="color:' + ((this.panel[i] == PLAYER.HUMAN) ? COLOR.HUMAN : COLOR.CPU) + ';">' + ((this.panel[i] == PLAYER.HUMAN) ? PLAYER.HUMAN_OPTION : PLAYER.CPU_OPTION) + '</span>';
    }
  }
};

function Game() {
  this.games = 0;
  this.board = new Board();
  this.estate = null;
  this.consola = document.getElementById("console");
  this.reset();
}
Game.prototype.reset = function() {
  this.board.reset();
  if (this.games % 2 == 1) {
    this.estate = ESTATE.WAITING;
    this.showMessage("Machine turn", COLOR.CPU);
    this.board.mark(PLAYER.CPU, Math.floor(Math.random() * 9));
  }
  this.games++;
  this.estate = ESTATE.PLAYING;
  this.showMessage("Your turn", "");
  this.board.draw();
  this.changeBackground(COLOR.GREEN_BG);
};
Game.prototype.showMessage = function(msg, color) {
  this.consola.innerHTML = '<span style="color:' + color + ';">' + msg + '</span>';
};

Game.prototype.changeBackground = function(color) {
  var body = document.getElementsByTagName('body');
  body[0].style.background = color;
};

Game.prototype.logic = function(position) {
  if (this.estate == ESTATE.PLAYING) {
    if (this.board.markable(position)) {
      this.board.mark(PLAYER.HUMAN, position);

      if (this.board.isWinner(PLAYER.HUMAN)) {
        this.estate = ESTATE.FINISHED;
        this.showMessage("YOU WIN!<br/>Click in a cell to start over.", COLOR.HUMAN);
      } else if (!this.board.emptyCels()) {
        this.estate = ESTATE.FINISHED;
        this.showMessage("It's a draw!<br/>Click in a cell to start over.", COLOR.GREEN);
        this.changeBackground(COLOR.YELLOW);
      } else {
        this.estate == ESTATE.WAITING;
        this.showMessage("Cpu turn...", COLOR.CPU);
        this.aIMovement();

        if (this.board.isWinner(PLAYER.CPU)) {
          this.estate = ESTATE.FINISHED;
          this.showMessage("CPU wins!<br/>Click in a cell to start over.", COLOR.CPU);
          this.changeBackground(COLOR.CPU_WIN);
        } else if (!this.board.emptyCels()) {
          this.estate = ESTATE.FINISHED;
          this.showMessage("It's a draw!<br/>Click in a cell to start over.", COLOR.GREEN);
          this.changeBackground(COLOR.YELLOW);
        } else {
          this.showMessage("Your turn", COLOR.HUMAN);
          this.estate == ESTATE.PLAYING;
        }
      }
    }
    this.board.draw();
  } else if (this.estate == ESTATE.FINISHED) {
    this.reset();
  }
};

Game.prototype.aIMovement = function() {
  var position = 0;
  var n = this.board.panel.length;
  var aux, best = -9999;

  for (var i = 0; i < n; i++) {
    if (this.board.markable(i)) {
      this.board.mark(
        PLAYER.CPU, i);
      aux = this.min();
      if (aux > best) {
        best = aux;
        position = i;
      }
      this.board.mark(0, i);
    }
  }

  this.board.mark(PLAYER.CPU, position);
};

Game.prototype.min = function() {
  if (this.board.isWinner(PLAYER.CPU)) return 1;
  if (!this.board.emptyCels()) return 0;
  var n = this.board.panel.length;
  var aux, best = 9999;

  for (var i = 0; i < n; i++) {
    if (this.board.markable(i)) {
      this.board.mark(PLAYER.HUMAN, i);
      aux = this.max();
      if (aux < best) {
        best = aux;
      }
      this.board.mark(0, i);
    }
  }
  return best;
};

Game.prototype.max = function() {
  if (this.board.isWinner(PLAYER.HUMAN)) return -1;
  if (!this.board.emptyCels()) return 0;
  var n = this.board.panel.length;
  var aux, best = -9999;

  for (var i = 0; i < n; i++) {
    if (this.board.markable(i)) {
      this.board.mark(PLAYER.CPU, i);
      aux = this.min();
      if (aux > best) {
        best = aux;
      }
      this.board.mark(0, i);
    }
  }
  return best;
};

function overlay() {
  el = document.getElementById("overlay");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  var blurrable = document.getElementsByClassName("blurrable");
  blurrable[0].classList.toggle("blur");
}

window.onload = function() {
  var game = new Game();

  overlay();
  var buttons = document.getElementsByTagName('button');
  for (var i in buttons) {
    buttons[i].onclick = function(e) {
      if (this.id == "buttonO") {
        PLAYER.HUMAN_OPTION = "O";
        PLAYER.CPU_OPTION = "X";
        COLOR.HUMAN = "#ED5565";
        COLOR.CPU = "#5D9ECE";
      }
      overlay();
    }
  }

  var cels = document.getElementsByClassName("cel");
  for (var i in cels) {
    cels[i].onclick = function(e) {
      game.logic(parseInt(this.getAttribute("cel")));
    };
  }

};
