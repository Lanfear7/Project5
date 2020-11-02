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
    let gallery =document.getElementById('gallery')
    let search = document.querySelector('.search-container')
    search.innerHTML= `                       
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`
    search.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            let value = e.target.value
            searchPeople(value, data)
        }
    })    
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

formatPhoneNumber = (phoneNumberString) => {
    var cleaned = phoneNumberString.replace(/\D/g, '')
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}

addEvent = (data) =>{
    let body = document.querySelector('body')
    let cards = document.querySelectorAll('.card')
    for(let i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', () => {
            popUp(data,i)
            let next = document.querySelector('#modal-next')
            next.addEventListener('click', () =>{
                nextPerson(data,i)
                console.log('back from nextPerson')
                
            })
            
            //close pop up form
            let closeBtn = document.getElementById('modal-close-btn')
            closeBtn.addEventListener('click', () =>{
                let popUp = document.querySelector('.modal-container')
                body.removeChild(popUp)
                
            })
        })
    }
    
}
nextPerson = (data, index) =>{
    let plus = ++index 
    let nextPerson = data[plus]
    console.log(nextPerson)
    let modal= document.querySelector('.modal-container')
    let gallery = document.querySelector('.gallery')
    modal.remove()
    gallery.insertAdjacentHTML('afterend', popUp(data, plus))
    console.log('before return')
    return
}

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
}
searchPeople = (value, data) => {
    let name = value.toUpperCase()
    let body = document.querySelector('body')
    for(let i = 0; i < data.length; i ++){
        let userNames = data[i].name.first.toUpperCase()
        if(name == userNames){ 
            popUp(data, i)
            //remove pop up
            let closeBtn = document.getElementById('modal-close-btn')
            closeBtn.addEventListener('click', () =>{
                let popUp = document.querySelector('.modal-container')
                body.removeChild(popUp)
                
            })
        }else{
            console.log('not in list')
        }
    }
}
