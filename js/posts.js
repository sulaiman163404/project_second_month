const cardContainer = document.querySelector('.card-container');
const totalImages = 6


const fetchData = async (title) => {
    try {
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${title}`)
    const postData = await postResponse.json()

    const imageIndex = (title - 1) % totalImages + 1
    const imageURL = `../images/online_item_${imageIndex}.jpg`
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card')

    cardDiv.innerHTML = `
                    <h4>${postData.title}</h4>
                    <span>${postData.body}</span>
                    <img class="card-image" src="${imageURL}" alt="Card Image">
                `;

    cardContainer.appendChild(cardDiv)
    } catch (error) {
        console.error('ERROR', error)
    }
}

for (let count = 1; count <= 6; count++) {
    fetchData(count);
}

