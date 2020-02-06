let addToy = false

document.addEventListener("DOMContentLoaded",function(){
  console.log("connected")
  fetchAllToys()
  getForm().addEventListener("submit",newToyHandler)
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
})
})
function fetchAllToys(){
  fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then(toyArray=>{
    toyArray.forEach(toy=>buildToyCard(toy))
})
}
function getForm(){
  return document.querySelector(".add-toy-form")
}

function getDiv(){
  return document.getElementById("toy-collection")
}
function buildToyCard(toy){
  let div = getDiv()
  let toyCard = document.createElement('div')
  toyCard.className = "card"
  toyCard.id = toy.id
  
  let toyName = document.createElement('h2')
  toyName.innerText = toy.name

  let toyImage = document.createElement('img')
  toyImage.className = "toy-avatar"
  toyImage.src = toy.image

  let likePar = document.createElement('p')
  likePar.innerText = `${toy.likes} like(s)`
  
  let likeBtn = document.createElement('button')
  likeBtn.className = "like-btn"
  likeBtn.innerText = "Like "
  likeBtn.dataset.id = `${toy.id}`
  likeBtn.addEventListener("click",likeToyHandler)

  let deleteBtn = document.createElement('button')
  deleteBtn.className = "delete-btn"
  deleteBtn.innerText = "Delete me!" 
  deleteBtn.dataset.id = toyCard.id
  deleteBtn.addEventListener("click",deleteToyHandler)

  toyCard.append(toyName,toyImage,likePar,likeBtn,deleteBtn)
  div.appendChild(toyCard)
}

function newToyHandler(e){
    e.preventDefault()
    let newToyName = e.target.name.value
    let newToyImage = e.target.image.value
    let newToy ={name: newToyName,image: newToyImage,likes: 0}
    fetch("http://localhost:3000/toys",{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(newToy)
}).then(res => res.json())
  .then(toy =>buildToyCard(toy))
  e.target.reset()

}
function likeToyHandler(e){
  
   let toyId = e.target.dataset.id
   let likeCount =parseInt(e.target.parentElement.querySelector('p').innerText)
   fetch("http://localhost:3000/toys/"+toyId, {
     method: "PATCH",
     headers: {
       "Content-Type":"application/json"
      },
      body: JSON.stringify({likes:likeCount + 1})
   }).then(res => res.json())
     .then(newToy =>updateLikes(newToy))

}
function updateLikes(newToy){
  
 let cardDiv=  document.getElementById(`${newToy.id}`)
 card = cardDiv.querySelector('p').innerText = newToy.likes + " like(s)"

  
}
function deleteToyHandler(e){
  
  toyID = e.currentTarget.dataset.id
  fetch("http://localhost:3000/toys/"+toyID,{
    method: "DELETE",
  }).then(res =>res.json())
    .then(json =>console.log(json))
    e.currentTarget.parentElement.remove()

 


}















  