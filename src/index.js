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
}
    
function newForm(event) { 
   event.preventDefault()
   let newToyName = event.target.name.value 
   let newToyImage = event.target.image.value
    let newToy = {name: newToyName, image: newToyImage}
    
      fetch('http://localhost:3000/toys',{ 
        method: "POST", 
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newToy)
      }).then(response => response.json())
      .then(toy => buildToyCard(toy))

}
