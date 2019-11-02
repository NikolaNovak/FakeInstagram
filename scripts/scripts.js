document.querySelector("#search-box").addEventListener("keyup", e => {
    let query = e.target.value;
    let postsSelector = document.querySelectorAll(".post");
    let suggestionBoxSelector = document.querySelector(".user-suggestions")
    suggestionBoxSelector.classList.remove("hidden");

    for(let i = 0; i < postsSelector.length; i++){
        let post = postsSelector[i];
        if(post.textContent.indexOf(query) >= 0){
            post.classList.remove("hidden");
        }
        else {
            post.classList.add("hidden");
            suggestionBoxSelector.classList.add("hidden");
        }
    }
});

let heartIcons = document.querySelectorAll(".post .heart-icon");
for(let i = 0; i < heartIcons.length; i++){
    let heartIcon = heartIcons[i];
    heartIcon.addEventListener("click", handleHeartClick);
}
function handleHeartClick (e) {
    let heartIcon = e.target;
    let postSelector = e.target.parentElement.parentElement.parentElement;
    let likeNumber = postSelector.querySelector(".like-number");
    let yourLikes = document.querySelector("#your-likes");

    if (heartIcon.classList.contains("far")) {
        heartIcon.classList.replace("far", "fas");
        heartIcon.classList.add("red");
        likeNumber.textContent++;
        yourLikes.textContent++; 
    } 
    else {
        heartIcon.classList.replace("fas", "far");
        heartIcon.classList.remove("red");
        likeNumber.textContent--; 
        yourLikes.textContent--; 
        document.querySelector("#header-heart-icon").classList.contains("fas") ? postSelector.parentElement.classList.add("hidden") : null;
    }
};

let bookmarkIcons = document.querySelectorAll(".post-icons .bookmark-icon");
bookmarkIcons.forEach(bookmarkIcon => {
  bookmarkIcon.addEventListener("click", handleBookmarkIcon);
});
function handleBookmarkIcon (e) {
  let bookmarkIcon = e.target;
  let bookmarkIconSelector = document.querySelector(".about-me-box #bookmarks");
  if (bookmarkIcon.classList.contains("fas")) {
        bookmarkIcon.classList.replace("fas", "far");
        bookmarkIconSelector.textContent--; 
  } 
  else {
        bookmarkIcon.classList.replace("far", "fas");
        bookmarkIconSelector.textContent++;
  }
};

document.querySelector("#header-heart-icon").addEventListener("click", e => {
    let headerHeart = e.target;
    let postsSelector = document.querySelectorAll(".post");
    if (headerHeart.classList.contains("far")) {
      headerHeart.classList.replace("far", "fas");
      headerHeart.classList.add("red");
      postsSelector.forEach( post => {
        let heart = post.querySelector(".heart-icon");
        heart.classList.contains("far") ? post.classList.add("hidden") : null;
      });
    } 
    else {
        headerHeart.classList.replace("fas", "far");
        headerHeart.classList.remove("red");
        postsSelector.forEach( post => post.classList.remove("hidden"));
    }
});
  
document.querySelector("#header-user-icon").addEventListener("click", e => {
  let posts = document.querySelectorAll(".post");
  if (!e.target.classList.contains("personal-only")) {
        e.target.classList.add("personal-only");
        posts.forEach( post => {
        if (!post.textContent.includes("Novak")) post.classList.add("hidden");
        });
  } 
  else {
        e.target.classList.remove("personal-only");
        posts.forEach( post => {
        post.classList.remove("hidden");
        });
  }
});

let commentIcons = document.querySelectorAll(".comment-icon");
for(let i = 0; i < commentIcons.length; i++){
    let commentIcon = commentIcons[i];
    commentIcon.addEventListener("click", handleCommentIcon);
}
function handleCommentIcon (e) {
    let commentBoxSelector=e.target.parentElement.parentElement.parentElement;
    commentBoxSelector.querySelector(".add-comment").focus();
}

let deleteIcons = document.querySelectorAll(".delete-icon");
deleteIcons.forEach(deleteIcon => {
    deleteIcon.addEventListener("click", e => {
        let card = e.target.parentElement;
        card.classList.add("hidden"); 
        userNumber = card.classList.item(1);
        let rightSuggestionSelector = document.querySelector(`.suggestion.${userNumber}`);
        rightSuggestionSelector.classList.add("hidden");
  });
});

let feedfollowClick = document.querySelectorAll(".follow");
feedfollowClick.forEach(followedUser => {
    followedUser.addEventListener("click", e => {
        let card = e.target.parentElement;
        card.classList.add("hidden"); 
        userNumber = card.classList.item(1);
        let rightSuggestionSelector = document.querySelector(`.suggestion.${userNumber}`);
        rightSuggestionSelector.classList.add("hidden");
        document.querySelector("#followers").textContent++;
  });
});

let personalSpaceFollowClick = document.querySelectorAll(".follow-v2");
personalSpaceFollowClick.forEach(followedUser => {
    followedUser.addEventListener("click", e => {
        let card = e.target.parentElement;
        card.classList.add("hidden"); 
        userNumber = card.classList.item(1);
        let feedSuggestionSelector = document.querySelector(`.user-card.${userNumber}`);
        feedSuggestionSelector.classList.add("hidden");
        document.querySelector("#followers").textContent++;
  });
});

let commentBoxes = document.querySelectorAll(".add-comment");
commentBoxes.forEach(commentBox => commentBox.addEventListener("change", handleCommentSubmit));
function handleCommentSubmit (e) {
    let commentText = e.target.value;
    let newComment = document.createElement("div");
    newComment.innerHTML = `<p><b>Nikola Novak</b> ${commentText}</p>`;
    e.target.parentElement.querySelector(".comments").appendChild(newComment);
    e.target.value = "";
}

let addPost = document.querySelector("#add-new-post-button")
addPost.addEventListener("click", (e) => {
    let location = prompt("Enter Location:", "Solin, Croatia");
    if(!location) { return; }

    let imageUrl = prompt("Enter the URL of the post photo:", "images/default.jpg");
    if(!imageUrl) { return; }

    let tags = prompt("Enter tags", "#tag1 #tag2 #tag3");
    if(!tags) { return; }

    let postTemplate = document.querySelector("#post-template");
    let postElement = document.importNode(postTemplate.content, true);
    postElement.querySelector(".user-location").textContent = location;
    postElement.querySelector(".post-photo img").src = imageUrl;
    postElement.querySelector(".tags").textContent = tags;
    postElement.querySelector(".heart-icon").addEventListener("click", handleHeartClick);
    postElement.querySelector(".bookmark-icon").addEventListener("click", handleBookmarkIcon);
    postElement.querySelector(".comment-icon").addEventListener("click", handleCommentIcon);
    postElement.querySelector(".add-comment").addEventListener("change", handleCommentSubmit);
    let postContainer = document.querySelector(".post-container");
    postContainer.prepend(postElement);
});