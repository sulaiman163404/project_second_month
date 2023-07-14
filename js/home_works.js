const gmailInput = document.querySelector('#gmail_input')
const gmailCheck = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')
// const emailCheck = input('Введите ваш email ...   (пример - xxxxxxxxxx@gmail.com)')
const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/ig

gmailCheck.addEventListener('click', () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = 'OK'
        gmailResult.style.color = 'green'
        // console.log('Вы авторизованы')
    }else {
        gmailResult.innerHTML = 'Ошибка, Проверь почту!'
        gmailResult.style.color = 'red'
        // console.log('Не правильно введен email')
    }
})

// function moveBlock(position) {
//     const childBlock = document.querySelector(".child_block");
//     childBlock.style.left = position + "px";
//
//
//     if (position < 450) {
//         setTimeout(function() {
//             moveBlock(position + 10);
//         },120);
//     }
// }
//
// moveBlock(0);

const box = document.querySelector('.child_block');

let positionX = 0;
let positionY = 0;

const move = () => {
    if (positionX < 448 && positionY === 0) {
        positionX++;
        box.style.left = `${positionX}px`;
    } else if (positionX >= 448 && positionY < 448) {
        positionY++;
        box.style.top = `${positionY}px`;
    } else if (positionX > 0 && positionY === 448) {
        positionX--;
        box.style.left = `${positionX}px`;
    } else if (positionX === 0 && positionY > 0) {
        positionY--;
        box.style.top = `${positionY}px`;
    }
    setTimeout(move, 1)
};

move();


// /////////////////// DZ 2 lesson /////////////////////////////////////////

const minutesLabel = document.querySelector('#minutes');
const secondsLabel = document.querySelector('#seconds');
const millisecondsLabel = document.querySelector('#ml-seconds');

const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const clearButton = document.querySelector('#reset');

let totalMilliseconds = 0;
let intervalId;

stopButton.disabled = true;
clearButton.disabled = true;

const startCounter = () => {
    startButton.disabled = true;
    stopButton.disabled = false;
    clearButton.disabled = true;

    intervalId = setInterval(() => {
        totalMilliseconds += 10; // Увеличиваем на 10 миллисекунд

        const date = new Date(totalMilliseconds);

        const milliseconds = date.getMilliseconds();
        const seconds = date.getSeconds();
        const minutes = date.getMinutes();

        millisecondsLabel.textContent = pad(milliseconds, 2);
        secondsLabel.textContent = pad(seconds, 2);
        minutesLabel.textContent = pad(minutes, 2);
    }, 10);
};

const stopCounter = () => {
    startButton.disabled = true;
    stopButton.disabled = true;
    clearButton.disabled = false;

    clearInterval(intervalId);
};

const clearCounter = () => {
    totalMilliseconds = 0;
    millisecondsLabel.textContent = pad(0, 2);
    secondsLabel.textContent = pad(0, 2);
    minutesLabel.textContent = pad(0, 2);
    stopCounter();

    startButton.disabled = false;
    stopButton.disabled = true;
    clearButton.disabled = true;
};

const pad = (value, length) => {
    return value.toString().padStart(length, '0');
};

startButton.addEventListener('click', startCounter);
stopButton.addEventListener('click', stopCounter);
clearButton.addEventListener('click', clearCounter);
