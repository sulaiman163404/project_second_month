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


const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')
const tabContent = document.querySelectorAll('.tab_content_block')
let index = 0

const hideTabContent = () => {
    tabContent.forEach(item => {
        item.style.display = 'none'
    })
    tabs.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (i = 0) => {
    tabContent[i].style.display = 'block'
    tabs[i].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()

let tab = 0
const switchTab = () => {
    hideTabContent()
    showTabContent(tab)
    tab = (tab + 1) % tabs.length
}

const autoTab = setInterval(switchTab, 5000)

hideTabContent()
showTabContent(tab)
switchTab()

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((item, i) => {
            if (event.target === item) {
                // clearInterval(autoTab)
                hideTabContent()
                showTabContent(i)
            }
        })
    }
}

////////////////////////DZ-3 автослайдер //////////////////////

const autoSlider = (i = 0) => {
    setInterval(() => {
        i++
        if (i > tabContent.length - 1) {
            i = 0
        }
        hideTabContent()
        showTabContent(i)
        clearInterval(autoTab)
    }, 3000)
}
autoSlider()


// ДЗ 6-го урока

const card = document.querySelector('.card')
const btnPrev = document.querySelector('#btn-prev')
const btnNext = document.querySelector('#btn-next')

let count = 1

const getData = (id) => {
    if (id >= 1 && id <= 200) {
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(response => response.json())
            .then(todo => {
                card.innerHTML = `
          <h4>${todo.title}</h4>
          <span>${todo.id}</span>
          <h4 style="color: ${todo.completed ? 'green' : 'red'}">${todo.completed}</h4>  
        `})
    }
}

btnNext.onclick = () => {
    count++
    getData(count)
}

btnPrev.onclick = () => {
    if (count > 1) {
        count--
        getData(count)
    }
}

getData(count)

//////////////////////////////////////DZ6 task-2 ////////////////////////////////////
fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => console.log(data))