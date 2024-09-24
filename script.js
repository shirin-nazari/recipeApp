// Initial References
const result = document.getElementById("result");
const searchBtn = document.getElementById('search-btn');

const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener('click', () => {
    const userInp = document.getElementById('user-inp').value;
    if (userInp.length == 0) {
        result.innerHTML = `
        <h3>Input Field Connot Be Empty</h3>
        `
    } else {
        fetch(url + userInp).then(res => res.json()).then(data => {
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
<h4>${myMeal.strArea}</h4>
</div>
<div id='ingredient-con'>

</div>
<div id="recipe">
<button id='hide-recipe'>X</button>
<pre id='instructions'>${myMeal.strInstructions}</pre>
</div>
<button id='show-recipe'>View Recipe</button>
    `
            let ingredientCon = document.getElementById('ingredient-con');
            let parent = document.createElement('ul');
            const recipe = document.getElementById('recipe');
            const hideRecipe = document.getElementById('hide-recipe');
            const showRecipe = document.getElementById('show-recipe');
            ingredients.forEach(i => {
                let child = document.createElement('li')
                child.innerText = i;
                parent.appendChild(child)
                ingredientCon.appendChild(parent)
            })
            hideRecipe.addEventListener('click', () => {
                recipe.style.display = 'none'
            })
            showRecipe.addEventListener('click', () => {
                recipe.style.display = 'block'
            })
        }).catch(() => {
            result.innerHTML = `<h3>Invalid Input</h3>`
        })
    }

})
