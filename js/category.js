import { displayMeals,menu,details } from "./main.js";
menu;
details;
const selectedCategory = localStorage.getItem('categoryName');
console.log(selectedCategory);

$(window).on('load',()=>{
    searchByCategory(selectedCategory);
})

let searchByCategory = async(selectedCategory)=>{
    try{
        $('#loading').removeClass('d-none');
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
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

