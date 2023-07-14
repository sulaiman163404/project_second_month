// REG EXP
const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

// const regExp = /^\+996 \d{3} \d{2}-\d{2}-\d{2}$/
const regExp = /^\+996\d{9}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'ОК!'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'Не правильный номер!'
        phoneResult.style.color = 'red'
    }
}