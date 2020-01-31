let addToy = false
document.addEventListener("DOMContentLoaded", ()=>{
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
  getToys(); //displays all toys when DOM is loaded 
  const formButton = getToyForm();
  formButton.addEventListener('submit', newToyHandler)
})
function getToyForm(){
  // return document.getElementsByClassName('add-toy-form')
  return document.querySelector('.add-toy-form')
}
function getToyCollection(){
  return document.getElementById('toy-collection');
}
function getToys(){
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => {
    console.log(toys);
    toys.forEach(toy => buildToyCard(toy));
  })
}
function buildToyCard(toy){
  let toyGallery = getToyCollection();
  let toyCard = document.createElement('div');
  toyCard.classList += "card";
  toyCard.dataset.id = toy.id;
  let newName = document.createElement('h2');
  newName.innerHTML = toy.name;
  let newImage = document.createElement('img');
  newImage.className = "toy-avatar";
  newImage.src = toy.image;
  let newLikes = document.createElement('p');
  newLikes.innerText = `${toy.likes} Likes`;
  newLikes.dataset.id = `like-${toy.id}`;
  newLikes.id = `like-${toy.id}`;
  let newButton = document.createElement('button');
  newButton.className = 'like-btn';
  newButton.innerText = 'Like';
  newButton.dataset.id = toy.id;
  newButton.id = `like-button-${toy.id}`;
  toyGallery.appendChild(toyCard);
  toyCard.appendChild(newName);
  toyCard.appendChild(newImage);
  toyCard.appendChild(newLikes);
  toyCard.appendChild(newButton);
  newButton.addEventListener('click', currentLikes);
}
function currentLikes(event){
  console.log("I'm clicked!");
  let currentLikes = event.target.dataset.id;
  let toyID = parseInt(currentLikes);
  //fetches the current likes 
  fetch(`http://localhost:3000/toys/${toyID}`)
  .then(response => response.json())
  .then(toy => {
    console.log(toy);
    // debugger;
    let likeCounter = toy.likes;
    let toyID = toy.id;
    likeCounter++;
    //updates the likes
    patchLikes(likeCounter, toyID);
  });
  // let stringLikes = String(likeCounter);
}
function patchLikes(likeCounter, toyID){
  fetch(`http://localhost:3000/toys/${toyID}`, {
    method: 'PATCH',
    body: JSON.stringify({
      likes: likeCounter
       }), //variable likes here
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    })
    .then(response => response.json())
    .then(json => {console.log(json)
      let currentLikes = json.likes;
      let likeP = document.getElementById(`like-${toyID}`)
      likeP.innerText = `${currentLikes} Likes`
      // debugger;
    })
    // window.location.reload();
}
function newToyHandler(event){
  event.preventDefault();
  console.log(event);
  let toyName = event.target.name.value;
  let toyImage = event.target.image.value;
  let newToy = {likes: 0, name: toyName, image: toyImage}
  //post this info to the JSON server 
  let newPost = fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  }).then(response => response.json())
    .then(newToy => buildToyCard(newToy));
}
