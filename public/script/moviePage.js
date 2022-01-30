
const url = document.location + '';
const movieId = url.split('/').filter(e => e).slice(-1);
let reviewPageId = 0; 

(async function loadReview () {
    const res = await fetch("http://localhost:5080/api/movies/"+ movieId + "/reviews/" +reviewPageId); 
    const payload = await res.json();
    let arrayLength = payload.metaArrayData; 
    let pageNumber = reviewPageId + 1; 

    const reviewTotal = document.querySelector(".reviewTotal");
    if(arrayLength >= 1) {
        reviewTotal.innerHTML = "Review page " +pageNumber + "/ " +arrayLength;
    } else {
        reviewTotal.innerHTML = "There are currently no reviews for the selected movie, so you could be the first one to review it ;)"
    }
    
    
    const nextReviewButton = document.querySelector(".nextReviewButton");
    nextReviewButton.onclick = function nextReviewPage () {
        if(reviewPageId +1 < arrayLength){
            reviewPageId++;  
        } else { 
            reviewPageId;
        } 
        loadReview(); 
    }

    const previousReviewButton = document.querySelector(".previousReviewButton");
    previousReviewButton.onclick = function previousReviewPage () {
        if(reviewPageId -1 +arrayLength >= arrayLength){
            reviewPageId--;   
        } else {
            reviewPageId;  
        } 
        loadReview(); 
    }
  
    document.querySelector(".movie-review").innerHTML = ""; 

    if(arrayLength >= 1) {
        payload.data.forEach(review => {
            const li = document.createElement("li");
            const author = document.createElement("span");
            author.innerText = review.author + " "; 
            const rating = document.createElement("a");
            rating.innerText = "Rating: " + review.rating + " "; 
            const comment = document.createElement("a");
            comment.innerText = "comment: " + review.comment; 
            
            if(author) {li.append(author)}; 
            if(rating) {li.append(rating)}; 
            if(comment) {li.append(comment)}; 
            document.querySelector(".movie-review").append(li);
        });    
    }     
  })();

  
  
 fetch("https://imdb8.p.rapidapi.com/title/get-ratings?tconst=tt0468569", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "imdb8.p.rapidapi.com",
		"x-rapidapi-key": "67baa3e498mshe9d27c22177b7a4p13141bjsnbc2fd5344d9d"
	}
})
.then(response => {	
    return response.json();
})
.then(data => {
    let imdbRating = data.rating;
    let imdb = imdbRating / 2;
    document.querySelector(".movie-rating").innerHTML = "There is no ratings from users. IMDB's rating is: " + imdb; 
})

.catch(err => {
	console.error(err);
});


// /movies("https://imdb8.p.rapidapi.com/title/get-ratings?tconst=" + imdbTitle )



  

  