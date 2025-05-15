import { menu ,displayMeals,details} from "./main.js";

menu;
details;

const selectedArea= localStorage.getItem('areaName');
console.log(selectedArea);  


$(window).on('load',()=>{
    searchByArea(selectedArea);
})

let searchByArea = async(selectedArea)=>{
    try{
        $('#loading').removeClass('d-none');
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`);
        const data = await res.json();
        const meals = data.meals;
        console.log(meals);
        displayMeals(meals)
    }catch(error){
        console.log(error);
    }
    finally{
         $('#loading').addClass('d-none'); 
    }
}
