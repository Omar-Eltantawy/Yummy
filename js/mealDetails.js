import {menu} from './main.js';

menu;
$(window).on('load',async()=>{
    const mealId = localStorage.getItem('mealId');
    console.log(mealId);
    if(!mealId) return;
    $('#loading').removeClass('d-none');
    try{
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data =await res.json();
        const meal = data.meals[0];
        console.log(meal);

        let ingredientsHTML = "";
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                ingredientsHTML += `<li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>`;
            }
        }

        let tagsHTML = "";
        if (meal.strTags) {
            const tags = meal.strTags.split(",");
            tagsHTML = tags.map(tag => `<li class="alert alert-danger m-2 p-1">${tag}</li>`).join("");
        }


        $('#DetailsrowData').html(`
        <div class="col-md-4">
                <img id="mealImg" src="${meal.strMealThumb}" alt="meal image" class="w-100 rounded-3">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredientsHTML}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                     ${tagsHTML}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>

               
            </div>    
            `)

             $('#rowData').html(html); 
        
    }catch(error){
        console.log(error);
    }finally{
         $('#loading').addClass('d-none'); 
    }
})