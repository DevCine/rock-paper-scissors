let game = () => {
	const intro = document.querySelector('.intro');
	const start = document.querySelector('.intro button');
	const match = document.querySelector('.match');
	const buttons = document.querySelectorAll('.buttons button');
	const playerHand = document.querySelector('.playerHand');
	const computerHand = document.querySelector('.computerHand');
	const hands = document.querySelectorAll('.hands img');
	const winner = document.querySelector('.winner');
	const winAudio = document.querySelector('.winAudio');
	const loseAudio = document.querySelector('.loseAudio');
	const waitAudio = document.querySelector('.waitAudio');
	const drawAudio = document.querySelector('.drawAudio');
	const player = document.querySelector('.playerBox h2');

	let pScore = 0;
	let cScore = 0;

	winner.addEventListener('animationend', function () {
		document.querySelector('.winner').style.animation = '';
	});
	hands.forEach(hand => {
		hand.addEventListener('animationend', function () {
			this.style.animation = '';
			waitAudio.load();
		});
		hand.addEventListener('animationstart', function () {
			this.src = './assets/rock.png';
			winner.textContent = 'Choose an option';
			winner.style.color = 'rgb(238, 238, 238)';

			winAudio.load();
			waitAudio.play();
		});
	});
	start.addEventListener('click', () => {
		intro.classList.add('fadeOut');
		match.classList.add('fadeIn');
		const playerName = prompt('Enter Your Name:');
		player.textContent = playerName;
	});
	buttons.forEach(button => {
		button.addEventListener('click', function () {
			// computer hand .........
			let computerOptions = ['rock', 'paper', 'scissors'];
			let computerNumber = Math.floor(Math.random() * 3);
			let computerChoice = computerOptions[computerNumber];

			setTimeout(() => {
				// update images-----------
				playerHand.src = `./assets/${this.textContent}.png`;
				computerHand.src = `./assets/${computerChoice}.png`;
				//  calling compare hands------------
				compareHands(this.textContent, computerChoice);
			}, 2200);

			// animation----------
			playerHand.style.animation = 'shakePlayer 2.2s ease';
			computerHand.style.animation = 'shakeComputer 2.2s ease';
		});
	});

	// compare hands -----------
	let compareHands = (playerHand, computerChoice) => {
		if (playerHand === computerChoice) {
			document.querySelector('.winner').textContent = 'It is a draw!';
			drawAudio.play();
			return;
		}
		// rock -----
		if (playerHand === 'rock') {
			if (computerChoice === 'paper') {
				document.querySelector('.winner').textContent = 'Computer wins';
				losing();
				computerScore();
				return;
			} else if (computerChoice === 'scissors') {
				document.querySelector('.winner').textContent = `You win`;
				winning();
				playerScore();
				return;
			}
		}
		// paper------------
		if (playerHand === 'paper') {
			if (computerChoice === 'rock') {
				document.querySelector('.winner').textContent = 'You win';
				winning();
				playerScore();
				return;
			} else if (computerChoice === 'scissors') {
				document.querySelector('.winner').textContent = 'Computer wins';
				losing();
				computerScore();
				return;
			}
		}
		// scissors------
		if (playerHand === 'scissors') {
			if (computerChoice === 'paper') {
				document.querySelector('.winner').textContent = 'You win';
				winning();
				playerScore();
				return;
			} else if (computerChoice === 'rock') {
				document.querySelector('.winner').textContent = 'Computer wins';
				losing();
				computerScore();
				return;
			}
		}
	};

	// update score --------------------
	let playerScore = () => {
		pScore++;
		document.querySelector('.playerBox p').textContent = pScore;
	};
	let computerScore = () => {
		cScore++;
		document.querySelector('.computerBox p').textContent = cScore;
	};
	// winning audio and animation----------
	let winning = () => {
		winner.style.animation =
			'shake-horizontal 1s cubic-bezier(.455,.03,.515,.955) 2 both';
		winner.style.color = 'rgb(37 196 57)';
		winAudio.play();
		// losing audio and animation -------
	};
	let losing = () => {
		winner.style.animation = 'bounce-top 0.9s both';
		winner.style.color = 'red';

		loseAudio.play();
	};
};
game();
