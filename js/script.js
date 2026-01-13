"use-strict"
// 005f7817efc6e4863db0ed7aab6781e5    API KEY FOR TMDB


let current_movie_or_tv;

const URLs='https://www.themoviedb.org/'
//Ftech Data form TMDB API
async function fetchApiData(endpoint) {
    const spinner=document.querySelector(".spinner")
    const API_KEY="005f7817efc6e4863db0ed7aab6781e5"
const API_URL='https://api.themoviedb.org/3/'
const authOptions= {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDVmNzgxN2VmYzZlNDg2M2RiMGVkN2FhYjY3ODFlNSIsIm5iZiI6MTc2NzYxNjc4Mi4wOTcsInN1YiI6IjY5NWJiMTBlODUyODU0ZTUwOGMzNzZkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-cJXTEIy6Zpp23eJZt5rlLGBTfAr-1cCfcsoV2LEg7E'
  }
};
spinner.classList.add("show")
const res=await fetch(`${API_URL}${endpoint}`,authOptions)

const Data=await res.json()
spinner.classList.remove("show")
return Data
}
//Change date format from xxxx-xx-xx to xx/xx/xxxx
function changeDate(fisrtDate){
let actualDate=new Date(fisrtDate)
let day=String(actualDate.getDate()).padStart(2,"0")
let month=String(actualDate.getMonth()).padStart(2,"0")
let year=String(actualDate.getFullYear())

return`${day}/${month}/${year}`

}
function handle_details(e){
  console.dir(e.currentTarget.datas)
  localStorage.setItem("clickedMovie", JSON.stringify({id:e.currentTarget.datas.id,type:e.currentTarget.datas.type}));
}

async function getDisplaySpecific(type){
let movie_data=JSON.parse(localStorage.getItem("clickedMovie"))

res=await fetchApiData(`${movie_data.type}/${movie_data.id}`)
console.log(res);
let body=document.querySelector("#movie-details")||document.querySelector("#show-details")
body.innerHTML=`
 
        <div class="details-top">
          <div>
            <img
              src="https://image.tmdb.org/t/p/w1280${res.backdrop_path}"
              class="card-img-top"
              alt="${res.original_title}"
            />
          </div>
          <div>
            <h2>${res.original_title||res.original_name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              8 / 10
            </p>
            <p class="text-muted">Release Date:${changeDate(res.release_date||res.first_air_date)}</p>
            <p>
            ${res.overview}
              
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              <li>${res.genres[0].name}</li>
              <li>${res.genres[1].name}</li>
              <li>${res.genres[2].name}</li>
            </ul>
            <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          ${ `<h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> 50</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> Last
              Aired Show Episode
            </li>
            <li><span class="text-secondary">Status:</span> Released</li>
          </ul>`?type==="tv":` <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $1,000,000</li>
            <li><span class="text-secondary">Revenue:</span> $2,000,000</li>
            <li><span class="text-secondary">Runtime:</span> 90 minutes</li>
            <li><span class="text-secondary">Status:</span> Released</li>
          </ul>`}
          <h4>Production Companies</h4>
          <div class="list-group">Company 1, Company 2, Company 3</div>
        </div>
     
`
}

//MOVIES LOGIC 
//Display popular movies to the DOM 
function displayPopular(body,type){
    
    let container;
    if (type==="movie"){
        
        container=document.querySelector("#popular-movies")
    }  else if(type==="tv"){
 container=document.querySelector("#popular-shows")
    }

body.forEach(obj=>{
    let card=document.createElement("div")
card.classList.add("card")
obj.type=type
card.datas=obj // attach each movie data to it element 



    card.innerHTML=`
<a href="${"/movie-details.html"?type==="movie":"/tv-details.html"}">
            <img
              src="https://image.tmdb.org/t/p/w1280${obj.backdrop_path}" 
              class="card-img-top"
              alt="${obj.original_title||obj.original_name}"
            />
          </a>
          <div class="card-body">
            <h5 class="card-title">${obj.original_title||obj.original_name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired:${changeDate(obj.release_date||obj.first_air_date)}</small>
            </p>
          </div>
        `
        
card.addEventListener("click",handle_details)
container.appendChild(card)


})
}


//Fetch and display  popular movies
async function fetchDisplayPopular(type) {
   const {results}=await fetchApiData(`${type}/popular`)
 
   displayPopular(results,type)
}




const global={
currentPage:window.location.pathname  
}



function ActiveFileColor(){
let Node=document.querySelectorAll("li .nav-link")
Node.forEach(element=>{
    let atr=element.getAttribute("href")

  
    if(global.currentPage.slice(1,global.currentPage.length)===atr || global.currentPage===atr)
        element.style.color=`var(--color-secondary)`
    })
}
//Init App



function init(){
    ActiveFileColor()
   
    switch (global.currentPage){
        case "/index.html":
            
            fetchDisplayPopular("movie")
         
            break
        case "/shows.html":
       
        fetchDisplayPopular("tv")
        break
        case "/movie-details.html":
            console.dir("movie Details");
           getDisplaySpecific("movie")
            break
        case "/tv-details.html":
            console.dir("Tv Details");
            getDisplaySpecific("tv")
            break
        case "/search.html":
            console.dir("Search");
    }



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
//${URL}t/p/w500$