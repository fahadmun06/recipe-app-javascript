(async function () {
  const response = await fetch("./recipes.json");
  const recipes = await response.json();
  console.log(recipes)
  const inputElement = document.getElementById("searchInput");
  const butnElement = document.getElementById("searchBtn");
  const listElem = document.getElementById("recipe-list");
  const detailsElem = document.getElementById("recipeDetailsContainer")

  function loadRecipeDetails(recipe) {
    detailsElem.innerHTML = `
            <h2 class="title">${recipe.title}</h2>
            <h3>Ingredients:</h3>
            <ul>${recipe.ingredients.map(function (ingredient) {
      return "<li>" + ingredient + "</li>"
    }).join("")}</ul>
            <h3>Instruction:</h3>
            <div>${recipe.instructions}</div>
        `;
  }

  function displaySearchResults(results) {
    listElem.innerHTML = "";
    results.forEach(function (recipe) {
      const li = document.createElement("li");
      const listItem = `
              <h2 class="title">${recipe.title}</h2>
              <div class="description">${recipe.description}</div>
          `;
      li.innerHTML = listItem;
      li.addEventListener("click", function () {
        loadRecipeDetails(recipe);
      });
      listElem.appendChild(li);
    })
  }
  const search = () => {
    const querry = inputElement.value;
    // console.log(querry)
    const results = recipes.filter(function (recipes) {
      return (recipes.title.toLowerCase().includes(querry) ||
        recipes.ingredients.join(" ").toLowerCase().includes(querry));
    })
    // console.log(results)

    displaySearchResults(results);
  }


  butnElement.addEventListener("click", search)


  // console.log(recipes);
})();