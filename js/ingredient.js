import { menu ,displayMeals, details} from "./main.js";

menu;
details;

const selectedIngredient= localStorage.getItem('ingredientName');
console.log(selectedIngredient);  


$(window).on('load',()=>{
    searchByIngredient(selectedIngredient);
})

let searchByIngredient = async(selectedIngredient)=>{
    try{
        $('#loading').removeClass('d-none');
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`);
        const data = await res.json();
        const meals = data.meals;
        console.log(meals);
        displayMeals(meals)
    }catch(error){
        console.log(error);
    }finally{
         $('#loading').addClass('d-none'); 
    }
}