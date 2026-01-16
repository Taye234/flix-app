"use-strict"
// 005f7817efc6e4863db0ed7aab6781e5    API KEY FOR TMDB


let current_movie_or_tv;
let pageStart;
let pageEnd;
const URLs='https://www.themoviedb.org/'
let pageCount=document.querySelector(".page-counter")
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
//Display slider
function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

async function displaySlider() {
  const { results } = await fetchApiData('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    console.log(movie.id);
movie.type="movie"
div.datas=movie

    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>
    `;
div.addEventListener("click",handle_details)
    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
}
async function getNextPage(){
  let prev=document.querySelector("#prev")
   let next=document.querySelector("#next")
    let cont=document.querySelector("#search-results")

   next.addEventListener("click",(e)=>{
if(pageStart<pageEnd){
  pageStart++
getDisplaySearch(pageStart)
}
   })
   prev.addEventListener('click',(e)=>{
if (pageStart>1){
  pageStart--
  getDisplaySearch(pageStart)
}
   })
}

async function  getDisplaySearch(page=1){
    let movie_data=JSON.parse(localStorage.getItem("formData"))
    let fetchData=await fetchApiData(`search/${movie_data.type}?query=${movie_data.searchItem}&page=${page}`)
    pageEnd=fetchData.total_pages
    console.log(pageEnd);
console.log(fetchData);
    let cont=document.querySelector("#search-results")

    fetchData.results.forEach(each=>{
    
let card=document.createElement("div")
  card.classList.add("card")
  card.innerHTML=`
   <a href="/${movie_data.type}-details.html">
            <img src="${each.backdrop_path!==null?`https://image.tmdb.org/t/p/w1280${each.backdrop_path}`:"images/no-image.jpg"}" class="card-img-top" alt="" />
          </a>
          <div class="card-body">
            <h5 class="card-title">${each.original_title||each.original_name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${changeDate(each.release_date||each.first_air_date)}</small>
            </p>
          </div>
  `
  cont.appendChild(card)
card.addEventListener("click",handle_details)
})
console.log(pageCount.textContent);
pageCount.textContent=`${pageStart} of ${pageEnd}`
c
   
  


}

 function getSearch() {
 let form= document.querySelector(".search-form")
    form.addEventListener("submit",handleSerach)
    function handleSerach(e){
  let data=new FormData(form)
       localStorage.setItem("formData", JSON.stringify({type:data.get("type"),searchItem:data.get('search-term')}));
       
      
}





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
              
               ${res.genres.map(item => `<li>${item.name}</li>`).join('')}
            </ul>
            <a href="/index.html" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          ${type==="tv" ?`<h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${res.number_of_episodes}</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${res.last_episode_to_air.name}</li>
            <li><span class="text-secondary">Status:</span> ${res.status}</li>
          </ul>`:` <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> ${res.budget}</li>
            <li><span class="text-secondary">Revenue:</span> ${res.revenue}</li>
            <li><span class="text-secondary">Runtime:</span> ${res.runtime}</li>
            <li><span class="text-secondary">Status:</span> ${res.status}</li>
          </ul>`}
          <h4>Production Companies</h4>
          <div class="list-group">  ${res.production_companies.map(movie => ` ${movie.name}`).join(", ")}</div>
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
<a href="/${type}-details.html">
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
             
           displaySlider()
            fetchDisplayPopular("movie")
             getSearch()
         
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
            getDisplaySearch()
              getSearch()
            pageStart=1
         
            getNextPage()
         
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