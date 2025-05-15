import {searchForMeals,displayMeals,menu,details} from './main.js';

menu;
details;



// $('#searchByNameInput').on('keyup',(e)=>{
//     let query = $(e.target).val().trim();
//     searchForMeals(query)
// })

// $('#searchByFirstLetterInput').on('keyup',(e)=>{
//     let query = $(e.target).val().trim();
//     searchWithFirstLetter(query)

// })

$('#searchByNameInput').on('keyup', async (e) => {
    const query = $(e.target).val().trim();
    $('#loading').removeClass('d-none'); // Show loading
    await searchForMeals(query);
    $('#loading').addClass('d-none'); // Hide loading
});

// Show loader, fetch meals by first letter, then hide loader
$('#searchByFirstLetterInput').on('keyup', async (e) => {
    const query = $(e.target).val().trim();
    $('#loading').removeClass('d-none'); // Show loading
    await searchWithFirstLetter(query);
    $('#loading').addClass('d-none'); // Hide loading
});


let searchWithFirstLetter = async(query="")=>{
    try{
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`);
        const data = await res.json();
        console.log(data);
        const meals=data.meals;
        if(Array.isArray(data.meals)){
            const meals = data.meals;
            displayMeals(meals)
        }


    }catch(error){
        console.log(error);
    }
}