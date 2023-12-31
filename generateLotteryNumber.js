const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const lotteryInfo = {};

async function getLotteryRange() {
  return new Promise((resolve) => {
    rl.question('How many numbers does the lottery have?  ', (answer) => {
      lotteryInfo.range = parseInt(answer);

      if (!isNaN(lotteryInfo.range) && lotteryInfo.range > 0) {
        resolve();
      } else {
        console.log('Please enter a valid number.');
        getLotteryRange().then(resolve);
      }
    });
  });
}

async function getHowManyNumbers() {
  return new Promise((resolve) => {
    rl.question('How many numbers will you play?  ', (answer) => {
      lotteryInfo.numbersToPlay = parseInt(answer);

      if (!isNaN(lotteryInfo.numbersToPlay) && lotteryInfo.numbersToPlay > 0) {
        resolve();
      } else {
        console.log('Please enter a valid number.');
        getHowManyNumbers().then(resolve);
      }
    });
  });
}

function generateLotteryNumbers() {
  const lotteryNumbers = [];
  const lotteryRange = lotteryInfo.range;
  const numbersToPlay = lotteryInfo.numbersToPlay;

  for (let i = 0; i < numbersToPlay; i++) {
    let randomNumber = Math.floor(Math.random() * lotteryRange) + 1;

    while (lotteryNumbers.includes(randomNumber)) {
      randomNumber = Math.floor(Math.random() * lotteryRange) + 1;
    }

    lotteryNumbers.push(randomNumber);
  }

  console.log('Enjoy your millions:', lotteryNumbers.sort((a, b) => a - b));
}

async function start() {
  await getLotteryRange();
  await getHowManyNumbers();
  generateLotteryNumbers();
  rl.close();
}

start();