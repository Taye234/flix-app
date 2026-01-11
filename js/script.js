// 005f7817efc6e4863db0ed7aab6781e5    API KEY FOR TMDB

const { createElement } = require("react");

//Ftech Data form TMDB API
async function fetchApiData(endpoint) {
const authOptions= {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDVmNzgxN2VmYzZlNDg2M2RiMGVkN2FhYjY3ODFlNSIsIm5iZiI6MTc2NzYxNjc4Mi4wOTcsInN1YiI6IjY5NWJiMTBlODUyODU0ZTUwOGMzNzZkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-cJXTEIy6Zpp23eJZt5rlLGBTfAr-1cCfcsoV2LEg7E'
  }
};
const API_KEY="005f7817efc6e4863db0ed7aab6781e5"
const API_URL='https://api.themoviedb.org/3/'
const res=await fetch(`${API_URL}${endpoint}`,authOptions)

const Data=await res.json()
return Data
}
//Fetch and display  popular movies
async function fetchDisplayPopular() {
    const {results}=await fetchApiData("movie/popular")
   let card=createElement("div")

}



const global={
currentPage:window.location.pathname  
}



function ActiveFileColor(){
let Node=document.querySelectorAll("li .nav-link")
Node.forEach(element=>{
    let atr=element.getAttribute("href")

    console.log(atr,global.currentPage);
    if(global.currentPage.slice(1,global.currentPage.length)===atr || global.currentPage===atr)
        element.style.color=`var(--color-secondary)`
    })
}
//Init App



function init(){
    switch (global.currentPage){
        case "/index.html":
            console.dir("Home")
            displayPopular()
            break
        case "/shows.html":
        console.dir("Shows");
        break
        case "/movie-details.html":
            console.dir("movie Details");
            break
        case "/tv-details.html":
            console.dir("Tv Details");
            break
        case "/search.html":
            console.dir("Search");
    }
ActiveFileColor()

}



document.addEventListener("DOMContentLoaded",init)




/*
 <div class="card">
          <a href="movie-details.html?id=1">
            <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
            />
          </a>
          <div class="card-body">
            <h5 class="card-title">Movie Title</h5>
            <p class="card-text">
              <small class="text-muted">Release: XX/XX/XXXX</small>
            </p>
          </div>
        </div>

 */