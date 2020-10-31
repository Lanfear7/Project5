//make a request to get a user and the info
fetchData = (url) => {
    return fetch(url)
        .then(data => data.json())
        .then(data => jsonData = data.results) //will return the json of the data we have requested from the url provided
        .then(data => createHTML(data)) //will creat new card elements that go to the DOM
        .then(data => addEvent(data)) //will add the event listener to each card
}
fetchData('https://randomuser.me/api/?results=12')


//format gallery markup
createHTML = (data) => {
    let gallery =document.getElementById('gallery')
    for(let i = 0; i < data.length; i++){
        //HTML creation
        let card = document.createElement('div');
        card.setAttribute('class', 'card')
        card.innerHTML = `
        <div class="card-img-container">
            <img class="card-img" src="${data[i].picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data[i].name.first}</h3>
            <p class="card-text">${data[i].email}</p>
            <p class="card-text cap">${data[i].location.city}, ${data[i].location.street.name}</p>
        </div>
        </div>
        `
        gallery.appendChild(card)
    }
    return  data
}

addEvent = (data) =>{
    let body = document.querySelector('body')
    let cards = document.querySelectorAll('.card')
    let gallery = document.querySelector('.gallery')
    for(let i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', (e) => {
            gallery.insertAdjacentHTML('afterend', `
            <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${data[i].name.first}</h3>
                        <p class="modal-text">${data[i].email}</p>
                        <p class="modal-text cap">${data[i].location.city}</p>
                        <hr>
                        <p class="modal-text">${data[i].phone}</p>
                        <p class="modal-text">${data[i].location.street.number} ${data[i].location.street.name}, ${data[i].location.city}, ${data[i].location.postcode}</p>
                        <p class="modal-text">Birthday: ${data[i].dob.date.slice(0, 10)}</p>
                    </div>
                </div>

                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`
            )
            //log the clicked card
            let clicked = cards[i]
            let closeBtn = document.getElementById('modal-close-btn')
            closeBtn.addEventListener('click', () =>{
                let popUp = document.querySelector('.modal-container')
                body.removeChild(popUp)
                
            })
            
            //card click
            //clicked

            //data on clicked card
            //data[i]
 

        })
    }
    

}
