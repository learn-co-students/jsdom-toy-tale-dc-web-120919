
// * When a user clicks on the add new toy button, a `POST` request is sent to
// `http://localhost:3000/toys` and the new toy is added to Andy's Toy Collection.
// * The toy should conditionally render to the page.



let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  
  renderAllToys()
  toyForm().addEventListener('submit', newToyHandler)

  const addBtn = document.querySelector('#new-toy-btn')
  const formContain = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      formContain.style.display = 'block'
    } else {
      formContain.style.display = 'none'
    }
  })

})


function toyForm() {
  return document.querySelector('form')
}


function newToyHandler(event){
  event.preventDefault()

  let newName = event.target.name.value
  let newImg = event.target.image.value
 

  let newToy = {name: newName, image: newImg, likes:0}
  fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(newToy)
  }).then(response => response.json())
  .then(newToy =>buildToyCard(newToy))

}

// as a user we need to see a full list of toys
// when the page load we want to make a get fetch and render toy cards to the DOM

function renderAllToys(){
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toyArray => {
    toyArray.forEach(toy => {

      buildToyCard(toy)})
    })
  }

  function buildToyCard(toy){
    const toyCollection = document.getElementById('toy-collection')
    const toyCard= document.createElement('div')
    toyCard.className = "card"
    toyCard.dataset.id = toy.id


    const toyName = document.createElement('h2')
    toyName.className = "toy-name"
    toyName.innerText = toy.name
    toyCard.appendChild(toyName)

    const toyImg = document.createElement('img')
    toyImg.className = "toy-avatar"
    toyImg.src = toy.image
    toyCard.appendChild(toyImg)

    const likeStatus = document.createElement('p')
    likeStatus.className ="like-status"
    likeStatus.innerText = toy.likes

    toyCard.appendChild(likeStatus)




    const likeBtn = document.createElement('button')

    likeBtn.addEventListener('click', likeCounter)
    likeBtn.className ="like-btn"
    likeBtn.innerHTML = "Like"
    likeBtn.dataset.likes = toy.likes
    likeBtn.dataset.id = toy.id

    toyCard.appendChild(likeBtn)


    toyCollection.appendChild(toyCard)
    // When a user clicks on a toy's like button, two things should happen:
    //   * Conditional increase to the toy's like count
    //   * A patch request sent to the server at `http://localhost:3000/toys/:id`
    // * updating the number of likes that the specific toy has
    const deleteBtn = document.createElement('button')
    deleteBtn.dataset.id = toy.id
    deleteBtn.dataset = toy


    deleteBtn.className = 'delete'
    deleteBtn.innerText ="DIE"
    deleteBtn.addEventListener("click", dieToy)
    toyCard.appendChild(deleteBtn)

  }



  function likeCounter(e){
    let toyId = e.target.dataset.id
    // let toyLikes = e.target.dataset.likes
    let toyParent = e.target.parentElement
    let likeToDom = toyParent.querySelector('p')
    let toyLikes = likeToDom.innerText
    let toyInt = parseInt(toyLikes);
    fetch("http://localhost:3000/toys/" + toyId, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({likes: toyInt+1})
      }).then(resp => resp.json())
        .then(data => {
          

          likeToDom.innerText = data.likes

        })
}

function dieToy(e) {

  let card = e.target.parentElement


  let toyId = e.currentTarget.dataset.id
  
  fetch("http://localhost:3000/toys/" + toyId, {
    method: 'DELETE',
  }).then(response => response.json()).then(json => console.log(json))
  debugger
  card.remove()
}