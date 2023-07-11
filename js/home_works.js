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

function moveBlock(position) {
    const childBlock = document.querySelector(".child_block");
    childBlock.style.left = position + "px";


    if (position < 450) {
        setTimeout(function() {
            moveBlock(position + 10);
        },120);
    }
}

moveBlock(0);