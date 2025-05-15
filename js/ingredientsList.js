import { menu } from "./main.js";

menu;

$(window).on('load',()=>{
    listAllAIngredients()
})
const listAllAIngredients= async ()=>{
    try{
        $('#loading').removeClass('d-none');
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        const data = await res.json();
        const ingredients = data.meals;
        const first20Ingredients = ingredients.slice(0,20);
        displayAllIngredients(first20Ingredients);        
    }catch(error){
        console.log(error);
    }finally{
         $('#loading').addClass('d-none'); 
    }
}

const displayAllIngredients=(ingredients)=>{
    let cartona='';
    for(const ingredient of ingredients){
        cartona+=`
        <div class="col-md-3">
            <div class="ingredient rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${ingredient.strIngredient}</h3>
            </div>
        </div>
        `
    }

    $('#ingredientsRowData').html(cartona);
}

$('#ingredientsRowData').on('click','.ingredient',(e)=>{
    let ingredientName = $(e.currentTarget).find('h3').text();
    console.log(ingredientName);
    localStorage.setItem('ingredientName',ingredientName);
    window.location.href = '../ingredient.html';
})