let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  renderToys()
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', ()=> {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
    toyForm.addEventListener('submit', newToyHandler)
  })


  function newToyHandler(event){
    let newName = event.target.name.value
    let newImg = event.target.image.value
    let newToy = {name: newName, image: newImg, likes: 0}
    debugger
    fetch('http://localhost:3000/toys', 
    {
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json",
        // Accept: "application/json"
      },
      body: JSON.stringify(newToy)
    })
      .then(response => {
        debugger
        return response.json()})
        .then(newToy => {
        debugger
        console.log("The response is " + newToy)})
  }
  function renderToys(){
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then (toyArray => {
      toyArray.forEach( toy => buildToys(toy))
    })
  }
    
    // debugger
    function buildToys(toy){
      let likeBtn = document.createElement('button')
      likeBtn.innerText = "Like"
      let container = document.getElementById("toy-collection")
      let toyCard = document.createElement("div")
      
      toyCard.classList += "card"
      
      let toyName = document.createElement("h2")
      toyName.className = "name"
      toyName.innerText = toy.name
      toyCard.appendChild(toyName)
      let toyImg = document.createElement("img")
      toyImg.className = "toy-avatar"
      toyImg.src = toy.image
      toyCard.appendChild(toyImg)
      let toyLikes = document.createElement("p")
      toyLikes.innerText = "Likes: " + toy.likes
      toyCard.appendChild(toyLikes)
      container.appendChild(toyCard)
      toyCard.appendChild(likeBtn)
      likeBtn.addEventListener('click', likeToy)
      likeBtn.id = toy.id
    }
      function likeToy(event){ 
        let likes = event.target.previousElementSibling.innerText.slice(7)
        let addedlike = parseInt(likes) + 1
        fetch("http://localhost:3000/toys/" + event.target.id, {
          method: 'PATCH',
          headers:  
          { "Content-Type": "application/json",
          Accept: "application/json"},
          body: JSON.stringify({
            "likes": addedlike
          })
        })
          .then(response => response.json())
          .then(resp => event.target.previousElementSibling.innerText = "Likes: " + addedlike)
        }


  })