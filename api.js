
// id select
const meal = document.getElementById("meal-list");
const mealDetails = document.getElementById("meal-details-content");
const closeDetails = document.getElementById("closeButton");
const detailName = document.getElementById("nameDetails");
const detailCategory = document.getElementById("categoryDetails");
const detailsInstructions = document.getElementById("instructionDetails");

// function use for get meal list 
const getMealList = () => {
    let mealInput = document.getElementById("meal-input").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealInput}`)
    .then(response => response.json())
    .then(data => {   
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class="meal-item" data-id = "${meal.idMeal}">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="">
                    </div>
                    <div class="meal-name">
                        <h4>${meal.strMeal}</h4>
                        <a href="#" class="getRecipe">Get recipe</a>
                    </div>
                </div>
                `;
            })
        meal.classList.remove("not-found");
        }

        // not found 
        else{
            html= "Sorry we have to not found this item!";
            meal.classList.add("not-found");
        }
        // meal list input value set
        meal.innerHTML = html;
    })
}

// event handler control get meal list
document.getElementById("submit-meal").addEventListener('click', getMealList);
  
// meal list output style set
    meal.style.display = "grid";
    meal.style.gridTemplateColumns = "repeat(3, 1fr)";
    

// get recipe details
const getMealDetails = (recipe) => {
    recipe.preventDefault();
    if(recipe.target.classList.contains("getRecipe")){
        let mealItem = recipe.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModel(data.meals));
    }
}

const mealRecipeModel = (meal) => {
    meal = meal[0];
    const name = meal.strMeal;
    const category = meal.strCategory;
    const instructionDetails = meal.strInstructions;
    detailName.innerHTML = name;
    detailCategory.innerText = category;
    detailsInstructions.innerText = instructionDetails;
   
}

// event handler details recipe
meal.addEventListener('click', getMealDetails);
meal.addEventListener('click', function(){
    mealDetails.style.display = "block";
    mealDetails.style.width = "60%";
    
})

// event handler close recipe details
closeDetails.addEventListener('click', function(){
    mealDetails.style.display = "none";
})