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

  getToys();

})

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
  let newButton = document.createElement('button');
  newButton.className = 'like-btn';
  newButton.innerText = 'Like';

  toyGallery.appendChild(toyCard);
  toyCard.appendChild(newName);
  toyCard.appendChild(newImage);
  toyCard.appendChild(newLikes);
  toyCard.appendChild(newButton);
}