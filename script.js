$(function () {
  const X = 'x', O = 'o';
  let board = Array(9).fill('');
  let currentPlayer = X;
  let scores = { x: 0, o: 0, draw: 0 };
  let playing = true;

  const WIN_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  function render() {
    $('.cell').each(function (i) {
      $(this).removeClass('x o flipped').text('');
      if (board[i]) {
        $(this).addClass(board[i] + ' flipped').text(board[i].toUpperCase());
      }
    });
    $('#turnIndicator').text(`Turn: ${currentPlayer === X ? '❌ X' : '⭕ O'}`);
  }

  function checkWinner() {
    for (const combo of WIN_COMBOS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
    return board.includes('') ? null : 'draw';
  }

  function updateScore(winner) {
    if (winner === X) scores.x++;
    else if (winner === O) scores.o++;
    else scores.draw++;

    $('#xScore').text(scores.x);
    $('#oScore').text(scores.o);
    $('#drawScore').text(scores.draw);
  }

  function restart(delay = 2000) { //time 
    playing = false;
    setTimeout(() => {
      board = Array(9).fill('');
      currentPlayer = X;
      playing = true;
      $('#message').text('');
      render();
    }, delay);
  }

  $('.cell').click(function () {
    const i = $(this).data('index');
    if (!playing || board[i]) return;

    board[i] = currentPlayer;
    render();

    const winner = checkWinner();

    if (winner) {
      if (winner === 'draw') {
        $('#message').text("🤝 It's a draw!");
      } else {
        $('#message').text(`🎉 Player ${winner.toUpperCase()} wins!`);
      }
      updateScore(winner);
      restart();
      return;
    }

    currentPlayer = currentPlayer === X ? O : X;
    render();
  });

  render();
});
