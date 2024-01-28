/// <reference types="../@types/jquery" />

let openBtn = document.getElementById('openBtn');
let closeBtn = document.getElementById('closeBtn');
let navbarLinks = document.getElementById('navbarLinks');
let dataOfRow = document.getElementById('dataOfRow');
let searchLink = document.getElementById('searchLink');
let searchBox = document.getElementById('searchBox');
let search1chInput = document.getElementById('search1chInput');
let searchMealInput = document.getElementById('searchMealInput');
let categoriesLink = document.getElementById('categoriesLink');
let areaLink = document.getElementById('areaLink');
let ingredientsLink = document.getElementById('ingredientsLink');
let contactLink = document.getElementById('contactLink');
let contactUs = document.getElementById('contactUs');
let nameInput = document.getElementById('nameInput');
let emailInput = document.getElementById('emailInput');
let phoneInput = document.getElementById('phoneInput');
let ageInput = document.getElementById('ageInput');
let passwordInput = document.getElementById('passwordInput');
let repasswordInput = document.getElementById('repasswordInput');


                                        // Nav bar section

openBtn.addEventListener('click' , function(){
 
  navbarLinks.classList.remove('d-none');
    closeBtn.classList.remove('d-none');
    openBtn.classList.add('d-none')

})
closeBtn.addEventListener('click' , function(){
    navbarLinks.classList.add('d-none');
    openBtn.classList.remove('d-none');
    closeBtn.classList.add('d-none');
})


                                        // home section

let data = [];


function displayData(){
    let cols = ``;
    for (let i = 0; i < data.length; i++) {
        cols +=`
        <div class="col-md-3">
                    <div class="meal position-relative overflow-hidden rounded-2 ">
                        <img src="${data[i].strMealThumb}" alt="">
                        <div class="layer-meal p-3">
                            <h3>${data[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `
        
    }
    dataOfRow.innerHTML = cols;
}


async function getMeals(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let finalResponse = await response.json();
     data = finalResponse.meals;
        displayData();
}

getMeals();

                                        // search section

searchLink.addEventListener('click' , function(){
    navbarLinks.classList.add('d-none');
    openBtn.classList.remove('d-none');
    closeBtn.classList.add('d-none');
    searchBox.classList.remove('d-none');
})
search1chInput.addEventListener('input' , function(){
    validationSearchChar();
    getMealsForSearch();
})
searchMealInput.addEventListener('input' , function(){
    validationSearchMeal();
    getMealsByName();
})
async function getMealsForSearch(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search1chInput.value}`);
    let finalResponse = await response.json();
     data = finalResponse.meals;


    if(validationSearchChar){
        displayData();
    }
}
async function getMealsByName(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMealInput.value}`);
    let finalResponse = await response.json();
     data = finalResponse.meals;


    if(validationSearchMeal){
        displayData();
    }
}

// validation function
function validationSearchChar(){
    regex = /^[a-z]$/i;
    if(regex == search1chInput.value){
    }
}
function validationSearchMeal(){
    regex = /^[a-z]/i;
    if(regex == searchMealInput.value){
    }
}



                                        // catergories section

categoriesLink.addEventListener('click' , function(){
    navbarLinks.classList.add('d-none');
    openBtn.classList.remove('d-none');
    closeBtn.classList.add('d-none');;
    getCategoriesMeals()
})

function displayCategoriesData(){
    let cols = ``;
    for (let i = 0; i < data.length; i++) {
        cols +=`
        <div class="col-md-3">
                    <div class="my-meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img src="${data[i].strCategoryThumb}" alt="">
                        <div class="layer-meal position-absolute text-center text-black p-2">
                            <h3>${data[i].strCategory}</h3>
                            <p>${data[i].strCategoryDescription.split(' ').slice(0,20).join(' ')}</p>
                        </div>
                    </div>
                </div>
        `
        
    }
    document.getElementById('dataOfRow').innerHTML = cols;
}

async function getCategoriesMeals(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let finalResponse = await response.json();
     data = finalResponse.categories;
    displayCategoriesData();
}


                                        // Area section


let listArea = ['American' , 'British' , 'Canadian' , 'Chinese' , 'Croatian' , 'Dutch' , 'Egyptian' , 'Filipino' , 'French',
'Greek' , 'Indian' , 'Irish' , 'Italian' , 'Jamaican' , 'Japanese' , 'Kenyan' , 'Malaysian' , 'Mexican',
'Moroccan' , 'Polish' , 'Portuguese' , 'Russian' , 'Spanish' , 'Thai' , 'Tunisian' , 'Turkish' , 'Vietnamese','Unknown'];


areaLink.addEventListener('click' , function(){
    navbarLinks.classList.add('d-none');
    openBtn.classList.remove('d-none');
    closeBtn.classList.add('d-none');;
    
    for(let i=0; i<listArea.length; i++){
        getAreaMeals(listArea[i]);
    }
})

function displayAreaData(){
    let cols = ``;
    for (let i = 0; i < data.length; i++) {
        cols +=`
        <div class="col-md-3">
                    <div class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3 class="cursor-pointer">${listArea[i]}</h3>
                    </div>
                </div>
        `
        
    }
    document.getElementById('dataOfRow').innerHTML = cols;
}

async function getAreaMeals(area){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let finalResponse = await response.json();
     data = finalResponse.meals;
    console.log(finalResponse);
    displayAreaData();
}

                                        // ingredients  section

ingredientsLink.addEventListener('click' , function(){
   navbarLinks.classList.add('d-none');
    openBtn.classList.remove('d-none');
    closeBtn.classList.add('d-none');
    getIngredientsMeals();
})

function displayIngredientsData(){
    let cols = ``;
    for (let i = 0; i < data.length; i++) {
        cols +=`
        <div class="col-md-3">
                    <div class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription.split(' ').slice(0,20).join(' ')}</p>
                    </div>
                </div>
        `
        
    }
    document.getElementById('dataOfRow').innerHTML = cols;
}

async function getIngredientsMeals(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let finalResponse = await response.json();
     data = finalResponse.meals;
    displayIngredientsData();
}



                                        // contact section


contactLink.addEventListener('click' , function(){
    navbarLinks.classList.add('d-none');
    openBtn.classList.remove('d-none');
    closeBtn.classList.add('d-none');
    contactUs.classList.remove('d-none');
    document.getElementById('myContainer').classList.add('d-none')
    getContactData();
})


nameInput.addEventListener('input' , function(){
    validationName();
} )
emailInput.addEventListener('input' , function(){
    validationEmail();
} )
phoneInput.addEventListener('input' , function(){
    validationPhone();
} )
ageInput.addEventListener('input' , function(){
    validationAge();
} )
passwordInput.addEventListener('input' , function(){
    validationPassword();
} )
repasswordInput.addEventListener('input' , function(){
    validationRepassword();
} )


function validationName(){
    let text = nameInput.value;
    let regexName = /[0-9 -!@$%^&*()_+|~=`\\#{}\[\]:";'<>?,.\/]/;
    if (regexName.test(text)){
        document.getElementById('nameAlert').classList.remove('visually-hidden');

    }else{
        document.getElementById('nameAlert').classList.add('visually-hidden');
    }}


function validationEmail(){
    let text = emailInput.value;
    let regexEmail = /^[a-z]{3,7}[0-9]{2,4}@[a-z]{3,7}\.com$/i;
    if (regexEmail.test(text)){
        document.getElementById('emailAlert').classList.add('d-none');

    }else{
        document.getElementById('emailAlert').classList.remove('d-none');
    }

}
function validationPhone(){
    let text = phoneInput.value;
    let regexPhone = /^01(0|1|2|5)[0-9]{8}$/;
    if (regexPhone.test(text)){
        document.getElementById('phoneAlert').classList.add('d-none');

    }else{
        document.getElementById('phoneAlert').classList.remove('d-none');
    }

}
function validationAge(){
    let text = ageInput.value;
    let regexAge = /^[1-9][0-9]$/;
    if (regexAge.test(text)){
        document.getElementById('ageAlert').classList.add('d-none');

    }else{
        document.getElementById('ageAlert').classList.remove('d-none');
    }

}
function validationPassword(){
    let text = passwordInput.value;
    let regexPassword = /^([a-z]{3,}[0-9]{2,}|[0-9]{2,}[a-z]{3,})$/;
    if (regexPassword.test(text)){
        document.getElementById('passwordAlert').classList.add('d-none');

    }else{
        document.getElementById('passwordAlert').classList.remove('d-none');
    }

}
function validationRepassword(){
    let text = repasswordInput.value;
    if (text == passwordInput.value){
        document.getElementById('repasswordAlert').classList.add('d-none');

    }else{
        document.getElementById('repasswordAlert').classList.remove('d-none');
    }

}


function getContactData(){
    if(validationName() && validationEmail() && validationPhone() 
    && validationAge() && validationPassword()&& validationRepassword()){
        document.getElementById('contactBtn').classList.remove('disabled');
    }
}
