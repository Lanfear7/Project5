//make a request to get a user and the info
fetchData = (url) => {
    return fetch(url)
        .then(data => data.json())
        .then(data => jsonData = data.results)
        .then(data => createHTML(data)) //will return the json of the data we have requested from the url provided
}
fetchData('https://randomuser.me/api/?results=12')

//format gallery markup
createHTML = (data) => {
    for(let i = 0; i < data.length; i++){
        console.log(data[i])
        //HTML creation
        let gallery =document.getElementById('gallery')
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


    
}
