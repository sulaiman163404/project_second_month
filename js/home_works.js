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
const resumeButton = document.querySelector('#resume');
const stopButton = document.querySelector('#stop');
const clearButton = document.querySelector('#reset');

let totalMilliseconds = 0;
let intervalId;

stopButton.disabled = true;
clearButton.disabled = true;
resumeButton.disabled = true;

const startCounter = () => {
    startButton.disabled = true;
    stopButton.disabled = false;
    resumeButton.disabled = true;
    clearButton.disabled = false;

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
    resumeButton.disabled = false;
    clearButton.disabled = false;

    clearInterval(intervalId);
};

const resumeCounter = () => {
    startButton.disabled = true;
    stopButton.disabled = false;
    resumeButton.disabled = true;
    clearButton.disabled = false;

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

const clearCounter = () => {
    totalMilliseconds = 0;
    millisecondsLabel.textContent = pad(0, 2);
    secondsLabel.textContent = pad(0, 2);
    minutesLabel.textContent = pad(0, 2);
    stopCounter();

    startButton.disabled = false;
    stopButton.disabled = true;
    resumeButton.disabled = true;
    clearButton.disabled = true;
};

const pad = (value, length) => {
    return value.toString().padStart(length, '0');
};

startButton.addEventListener('click', startCounter);
stopButton.addEventListener('click', stopCounter);
resumeButton.addEventListener('click', resumeCounter);
clearButton.addEventListener('click', clearCounter);


/////////////////////////weather//////////////////////////////

const apiKey = '863242cfb2b1d357e6093d9a4df19a4b'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='

const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather-icon')
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)

    if(response.status === 404){
        document.querySelector('.error').style.display = 'block'
        document.querySelector('.weather').style.display = 'none'
    }else {
        const data = await response.json()

        document.querySelector('.city').innerHTML = data.name
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c'
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%'
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h'

        if (data.weather[0].main === 'Clouds') {
            weatherIcon.src = '../images/clouds.png'
        } else if (data.weather[0].main === 'Clear') {
            weatherIcon.src = '../images/clear.png'
        } else if (data.weather[0].main === 'Rain') {
            weatherIcon.src = '../images/rain.png'
        } else if (data.weather[0].main === 'Drizzle') {
            weatherIcon.src = '../images/drizzle.png'
        } else if (data.weather[0].main === 'Mist') {
            weatherIcon.src = '../images/mist.png'
        }

        document.querySelector('.weather').style.display = 'block'
        document.querySelector('.error').style.display = 'none'

    }
}

searchBox.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault(); // Предотвращает отправку формы при нажатии Enter
        checkWeather(searchBox.value);
    }
});

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value)
})


///////////// converter ////////////

const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');


const convert = (inputCurrency, targetCurrency1, targetCurrency2) => {
    inputCurrency.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '../currency.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.onload = () => {
            const response = JSON.parse(request.response);
            if (inputCurrency === som) {
                targetCurrency1.value = (inputCurrency.value / response.usd).toFixed(2);
                targetCurrency2.value = (inputCurrency.value / response.eur).toFixed(2);
            } else if (inputCurrency === usd) {
                targetCurrency1.value = (inputCurrency.value * response.usd).toFixed(2);
                targetCurrency2.value = (inputCurrency.value * response.usd / response.eur).toFixed(2);
            } else if (inputCurrency === eur) {
                targetCurrency1.value = (inputCurrency.value * response.eur).toFixed(2);
                targetCurrency2.value = (inputCurrency.value * response.eur / response.usd).toFixed(2);
            }
            inputCurrency.value === '' && (targetCurrency1.value = targetCurrency2.value = '');
        };
    };
};

convert(som, usd, eur);
convert(usd, som, eur);
convert(eur, som, usd);

const clearConverter = document.querySelector('#reset-converter')
clearConverter.addEventListener('click', () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
        input.value = '';
    })
})
