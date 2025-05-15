export let menu =$('#closeIcon').on('click',()=>{
    $('nav').toggleClass('show');
    $('#closeIcon').toggleClass('fa-bars fa-x');
})

// $(window).on('load',()=>{
//     searchForMeals("");
// })
export const searchForMeals = async (query)=>{
    // try{
    //     const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    //     const data = await res.json();
    //     const meals = data.meals;
       
    //     displayMeals(meals);
    
    // }catch(error){
    //     console.log(error);
    // }

   try {
        $('#loading').removeClass('d-none'); // Show loading

        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await res.json();
        const meals = data.meals;

        displayMeals(meals);

    } catch (error) {
        console.log(error);
    } finally {
        $('#loading').addClass('d-none'); // Always hide loading after success/fail
    }
}

export const displayMeals =  (meals)=>{
    let cartona = '';
        for(const meal of meals){
            cartona+=`
            <div class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer"  data-id="${meal.idMeal}">
                    <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="name position-absolute top-100 w-100 h-100 d-flex align-items-center p-3">
                        <h3 class="text-black ">${meal.strMeal}</h3>
                    </div>
                </div>
            </div>
            `
        }
    
    $('#rowData').html(cartona);
} 

export let details=$('#rowData').on('click', '.meal', function() {
    const mealId = $(this).data('id');    
    localStorage.setItem('mealId', mealId);
    window.location.href = '../mealDetails.html';
});

// export let loading=()=>{
//     jQuery(()=>{
//     $('#loading').fadeOut(5000,()=>{
//         $('body').css('overflow','visible');
//     })  
// })
// }