let inputArea = document.querySelector(".searchArea")
let searchButton = document.querySelector(".searchButton")
let randomButton = document.querySelector(".randomButton")

async function getData(){
    let response = await fetch("https://api.punkapi.com/v2/beers")
    let responseBody = await response.json()
    return responseBody
}    

async function searchBeers(inputValue){
    let data = await getData()
    let matchingBeers = []
    for (let beer of data) {
        // beer = beer.name
        inputValue = inputValue.toLowerCase()
        if(((beer.name).toLowerCase()).includes(inputValue)){
            matchingBeers.push(beer)
        }    
    }   return matchingBeers;    
}    
function createMatchItems(array){
    let ul = document.querySelector("ul")
    for(let item of array){
        let newItem = document.createElement("li");
        newItem.className = "matches";
        newItem.innerText = item.name;
        ul.appendChild(newItem);
        newItem.addEventListener("click", function(event){
            let name = document.querySelector(".name")
            let description = document.querySelector(".description")
            let foodCombination = document.querySelector(".foodCombo")
            let firstBrew = document.querySelector(".firstBrewed")
            let img = document.querySelector(".beerImg")
            let alcohol = document.querySelector(".alcohol")
            img.src = item.image_url
            name.innerText = item.name
            description.innerText = item.description
            alcohol.innerText = item.abv + "\%"
            foodCombination.innerText = item.food_pairing
            firstBrew.innerText = item.first_brewed
            let midTop = document.querySelector(".middle-top")
            let midBot = document.querySelector(".middle-bot")
            midTop.style.opacity = "1"
            midBot.style.opacity = "1"
        })
    }    
}    

searchButton.addEventListener("click", async function(event){
    clearSearch()
    let value = inputArea.value
    let searchItems = await searchBeers(value);
    createMatchItems(searchItems)
})

inputArea.addEventListener("keyup", async function(event){
    let valueRaw = document.querySelector(".searchArea")
    let value = valueRaw.value
    let searchItems = await searchBeers(value);
    // let valueLc = value.toLowerCase()
    clearSearch()
    if (value != ""){
    if (event.keycode === 13){
        let search = document.querySelector(".searchButton")
        search.click()
        inputArea.value = "";
    }   else {
            let value = inputArea.value
            let searchItems = await searchBeers(value);
            createMatchItems(searchItems)
        } 
    }   
}) 

function clearSearch(){
    let li = document.querySelectorAll(".matches");
    for (let items of li) {
        items.remove();
    }
}


randomButton.addEventListener("click", async function(event){
    let data = await getData()
    let randomBeer = data[Math.floor(Math.random() * data.length)]
    let name = document.querySelector(".name")
    let description = document.querySelector(".description")
    let foodCombination = document.querySelector(".foodCombo")
    let firstBrew = document.querySelector(".firstBrewed")
    let img = document.querySelector(".beerImg")
    let alcohol = document.querySelector(".alcohol")
    img.src = randomBeer.image_url
    name.innerText = randomBeer.name
    description.innerText = randomBeer.description
    alcohol.innerText = randomBeer.abv + "\%"
    foodCombination.innerText = randomBeer.food_pairing
    firstBrew.innerText = randomBeer.first_brewed
    let midTop = document.querySelector(".middle-top")
    let midBot = document.querySelector(".middle-bot")
    midTop.style.opacity = "1"
    midBot.style.opacity = "1"
})
