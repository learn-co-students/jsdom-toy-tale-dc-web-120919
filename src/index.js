let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const formContainer = document.querySelector('.container')
  renderToys()
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      formContainer.style.display = 'block'
    } else {
      formContainer.style.display = 'none'
    }
  })
  toyForm().addEventListener('submit', newForm )

})

function toyForm() { 
 return  document.querySelector('form')
}
function renderToys() { 
  fetch('http://localhost:3000/toys') 
  .then(response => response.json() )
  .then(toyArray => { 
    toyArray.forEach( 
      toy => buildToyCard(toy)
    )
  })

}


function buildToyCard(toy) { 

  let toyCollection = document.getElementById("toy-collection")
  let card = document.createElement("div")
  card.className = "card"
  toyCollection.appendChild(card)

  let toyName = document.createElement('h2')
  toyName.innerText = toy.name
  card.appendChild(toyName) 

  let toyImage = document.createElement('img')
  toyImage.src = toy.image
  toyImage.classList += "toy-avatar"
  card.appendChild(toyImage) 

  
  let toyLikes = document.createElement('p')
  toyLikes.innerText = toy.likes  + " likes"
  card.appendChild(toyLikes) 
   
  let likeButton = document.createElement('button')
  likeButton.classList += 'like-btn'
  likeButton.innerText = "Like <3"
    card.appendChild(likeButton)
  likeButton.dataset.id = toy.id
  likeButton.addEventListener("click", likeToy)
}
    
function newForm(event) { 
   event.preventDefault()
   let newToyName = event.target.name.value 
   let newToyImage = event.target.image.value
   let newToyLikes = event.target.likes
    let newToy = {name: newToyName, image: newToyImage, likes: "0"}
    event.target.reset()
      fetch('http://localhost:3000/toys',{ 
        method: "POST", 
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newToy)
      }).then(response => response.json())
      .then(toy => buildToyCard(toy))
      
}


function likeToy(event) {
  console.log(event)
  let newLikes = {likes: incrementHandler(event)}
  let cardId = event.target.dataset.id 
  fetch("http://localhost:3000/toys/" + cardId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newLikes)

  }).then(response => response.json()).then(json => console.log(json.likes))
  window.location.reload()

}

function incrementHandler(event){
   let  hope = event.target.previousElementSibling.innerText.split(" ")
  let please  =  parseInt(hope[0])
  
  return ++please
  
   

  
}