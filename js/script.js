//make a request to get a user and the info
fetchData = (url) => {
    return fetch(url)
        .then(data => data.json())
        .then(data => jsonData = data.results) //will return the json of the data we have requested from the url provided
        .then(data => createHTML(data)) //will creat new card elements that go to the DOM
        .then(data => addEvent(data)) //will add the event listener to each card
}
fetchData('https://randomuser.me/api/?results=12&nat=us')


//format gallery markup
createHTML = (data) => {
    let gallery = document.getElementById('gallery')
    let search = document.querySelector('.search-container')
    search.innerHTML= `                       
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`

        
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
        `
        gallery.appendChild(card)
    }
    return  data
}

//regex to format the phone number
formatPhoneNumber = (phoneNumberString) => {
    var cleaned = phoneNumberString.replace(/\D/g, '')
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}

//events of app
addEvent = (data) =>{
    let submit = document.getElementById('search-submit')
    submit.addEventListener('click', () => {
        let value = document.querySelector('#search-input')
        let textValue = value.value
        searchPeople(textValue, data)
    })
    let cards = document.querySelectorAll('.card')
    for(let i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', () => {
            popUp(data,i)
        })
    }
    
}


nextPerson = (data, index) => {
    //increase the index of the person selected
    let plus = ++index 
    let modal= document.querySelector('.modal-container')
    modal.remove()
    popUp(data, plus)
    return
}

previousPerson = (data, index) => {
    //will subtract from the index of the selected person
    let minus = --index 
    let modal= document.querySelector('.modal-container')
    modal.remove()
    popUp(data, minus)
    return
} 

//add modal
popUp = (data,index) => {
    let gallery = document.querySelector('.gallery')
    gallery.insertAdjacentHTML('afterend', `
            <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${data[index].picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${data[index].name.first}</h3>
                        <p class="modal-text">${data[index].email}</p>
                        <p class="modal-text cap">${data[index].location.city}</p>
                        <hr>
                        <p class="modal-text">${formatPhoneNumber(data[index].phone)}</p>
                        <p class="modal-text">${data[index].location.street.number} ${data[index].location.street.name}, ${data[index].location.city}, ${data[index].location.postcode}</p>
                        <p class="modal-text">Birthday: ${data[index].dob.date.slice(0, 10)}</p>
                    </div>
                </div>

                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`
            )
            //close pop up form
            let body = document.querySelector('body')
            let closeBtn = document.getElementById('modal-close-btn')
            closeBtn.addEventListener('click', () =>{
                let popUp = document.querySelector('.modal-container')
                body.removeChild(popUp)
                
            })
            if(index < 11){
                //next button functionality 
                let next = document.querySelector('#modal-next')
                next.addEventListener('click', () =>{
                    nextPerson(data,index)
                })
            }
            if(index > 0){
                ////prev button functionality 
                let prev = document.querySelector('#modal-prev')
                prev.addEventListener('click', () => {
                    previousPerson(data, index)
                })                
            }
            

}

//loop over data to see if the name from the search matches any on the screen
searchPeople = (value, data) => {
    let name = value.toUpperCase()
    for(let i = 0; i < data.length; i ++){
        let userNames = data[i].name.first.toUpperCase()
        if(name == userNames){ 
            popUp(data, i)
        }
    }
}
