// Initial References
const result = document.getElementById("result");
const searchBtn = document.getElementById('search-btn');
const userInp = document.getElementById('user-inp').value;
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

fetch(url + "big mac").then(res => res.json()).then(data => {
    console.log(data)
    const myMeal = data.meals[0];
    let count = 1;
    let ingredients = []
    for (let i in myMeal) {
        let ingredient = "";
        let measure = "";
        if (i.startsWith("strIngredient") && myMeal[i]) {
            ingredient = myMeal[i];
            measure = myMeal[`strMeasure` + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`)

        }
    }
    console.log(ingredients);
    result.innerHTML = `
    <img src=${myMeal.strMealThumb} />
<div class='details'>
<h2>${myMeal.strMeal}</h2>
<h2>${myMeal.strArea}</h2>
</div>
<div id='ingredient-con'>

</div>
<div id="recipe">
<button id='hide-recipe'>X</button>
<pre id='instructions'>${myMeal.strInstructions}</pre>
</div>
    `

})