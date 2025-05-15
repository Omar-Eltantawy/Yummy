import {menu} from './main.js';

menu;
$(window).on('load',()=>{
    listAllCategories();
})

const listAllCategories= async ()=>{
    try{
        $('#loading').removeClass('d-none');
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        const data = await res.json();
        if(Array.isArray(data.categories)){
            const categories = data.categories;
            displayAllCategories(categories);
        }   
        
    }catch(error){
        console.log(error);
    }finally{
         $('#loading').addClass('d-none'); 
    }
}

const displayAllCategories=(categories)=>{
    let cartona = '';
    for(const category of categories){
        cartona+=`
        <div class="col-md-3">
            <div class="meal position-relative overflow-hidden rounded-2 text-center cursor-pointer">
                <img class="w-100 " src="${category.strCategoryThumb}" alt="${category.strCategory}">
                <div class="name position-absolute top-100 w-100 h-100 d-flex flex-column align-items-center p-3">
                    <h3 class="text-black ">${category.strCategory}</h3>
                    <p class="text-black">
                    ${category.strCategoryDescription.length > 100 
                        ? category.strCategoryDescription.slice(0, 100) + '...' 
                        : category.strCategoryDescription}
                    </p>
                </div>
            </div>
        </div>
        `  
    }
    $("#categoriesRowData" ).html(cartona);

}



$("#categoriesRowData").on('click', '.meal', (e)=>{
    let categoryName = $(e.currentTarget).find('h3').text();
    console.log(categoryName);
    localStorage.setItem('categoryName',categoryName);
    window.location.href = '../category.html';
});

