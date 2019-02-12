// document.addEventListener('DOMContentLoaded', () => {
//   console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  // let imageId = 1955 //Enter the id from the fetched image here
  const baseUrl = 'http://localhost:3000'
  let imageId = 1;
  const imageURL = baseUrl + `/images/${imageId}`
  const likeURL = baseUrl + `/likes/`
  const commentsURL = baseUrl + `/comments`
  // const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  //
  // const likeURL = `https://randopic.herokuapp.com/likes/`
  //
  // const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageEl = document.querySelector('#image')
  const imageDiv = document.querySelector('#image_card')
  const imageName = document.querySelector('#name')
  const likeButton = document.querySelector('#like_button')
  const likeSpan = document.querySelector('#likes')
  const form = document.querySelector('#comment_form')
  const commentInput = document.querySelector('#comment_input')
  const commentList = document.querySelector('#comments')

// state

const state = {
  selectedImg: null,
}

// render single Image

function renderSingleImage(image) {
  imageTag.src = image.url;
  imageTag.dataset.id = image.id;
  imageName.innerText = image.name;
  likeSpan.innerText = image.like_count;
  const commentsHTML = state.selectedImg.comments.map(comment => `<li>${comment.content}</li>`).join('')
  commentList.innerHTML = commentsHTML;
}

// adding an event listener
document.addEventListener('click', event => {
  if (event.target.id === 'like_button')
    // const id = parseInt(event.target.parentElement.previousElementSibling)
    // const foundImage = state.selectedImg
    likeSpan.innerText = (parseInt(likeSpan.innerText) + 1);
    state.selectedImg.like_count += 1;
    updateImage(state.selectedImg)
    // .then(initialize)
})

// function addACommentToAnImage(content, )
  form.addEventListener('submit', event => {
    // state.comments.push({content: content, })
    event.preventDefault();
    addComment()
    // comment = {content: content, image_id: imageId}
    // state.comments.push(comment);
    //
    // showComment(content)
    // addAComment(content)
      // .then(initialize)
  })
// }



function addComment() {
  const content = commentInput.value
  form.reset()
  createCommentOnServer(content)
  .then(comment => {
    state.selectedImg.comments.push(comment)
    renderSingleImage();
  })
}

// render multiple images
//
// function renderMultipleImages() {
//
// }


//
// <img src="" id="image" data-id=""/>
// <h4 id="name">Title of image goes here</h4>
// <span>Likes:
//   <span id="likes">Likes Go Here</span>
// </span>
// <button id="like_button">Like</button>
// <form id="comment_form">
//   <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
//   <input type="submit" value="Submit"/>
// </form>
// <ul id="comments">
//      <!-- <li> for each comment goes here -->
// </ul>


// initializer

function initialize() {
  getImage()
    .then(image => {state.selectedImg = image
      renderSingleImage(state.selectedImg)
})
}

// server stuff
function getImage() {
  return fetch(imageURL)
    .then(resp => resp.json())
}

function updateImage(image) {
  // state.selectedImg.like_count = image.like_count
  // const image = state.selectedImg
  return fetch(likeURL, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type' : 'application/json' },
    body: JSON.stringify({image_id: imageId})
  }).then(resp => resp.json)

}

function createCommentOnServer(content) {
  // state.comments.push({content: content})
  return fetch(commentsURL, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify({image_id: imageId, content: content })
  }).then(resp => resp.json())
}



// })

initialize()
