const fetchAllCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    // destructure object ****
    const { data } = await res.json();
    categoryButton(data);
}

// implement category button

const categoryButton = (data) => {

    const categoryContainer = document.getElementById('category-container');

    //console.log(data);
    data.forEach(element => {
        console.log(element);
        const btn = document.createElement('a');
        btn.innerHTML = `
        <a id="${element.category}" onclick = "fetchSpecificCategory('${element.category_id}','${element.category}')" class="btn btn-ghost text-xl">${element.category}</a>
        `
        categoryContainer.appendChild(btn);
    });
}



const fetchSpecificCategory = async (categoryId = 1000, id) => {

    const allBtn = document.querySelectorAll('.btn');
    for (const button of allBtn) {
        button.classList.remove('bg-red-600');
    }
    //console.log(id);
    const btnId = document.getElementById(id);
    //console.log(btnId);
    //btnId.classList.add('bg-red-600');
    if (btnId) {
        btnId.classList.add('bg-red-600');
    }


    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const { data } = await res.json();
    console.log(data);

    
    createCard(data);

    const sortByViewButton = document.querySelector('#sort-by-view-button');
    sortByViewButton.addEventListener("click", function(){createCard(data, true)});
}





const createCard = (data, sortByViews) => {

    //console.log(data.length);
  
        const cardContainer = document.getElementById('card-container');
        const hiddenContainer = document.getElementById('hidden-container');
    cardContainer.innerHTML = '';
    //console.log(data);

    // sort the data if sort-by-view button clicked
    //console.log(sortByViews)
    if(sortByViews)
    {
        data.sort((a,b) =>{
            const totalViewStringOne = a.others?.views;
            const totalViewStringTwo = b.others?.views;
    
            const totalViewNumberOne = parseFloat(totalViewStringOne.replace("k", '')) || 0 ;
            const totalViewNumberTwo = parseFloat(totalViewStringTwo.replace("k", '')) || 0 ;
    
            return totalViewNumberTwo - totalViewNumberOne ;
        }) 
    }



      if(data.length !== 0)
    {
       hiddenContainer.classList.add('hidden'); 

    data.forEach(element => {
        //console.log(element);
        const newCard = document.createElement('div');
        newCard.className = `card card-compact bg-base-100 shadow-xl`;

        newCard.innerHTML = `
        <figure>
            <img src="${element.thumbnail}" alt="Shoes" />
        </figure>
    <div class="card-body">
        <div class="flex gap-3">
            <div>
            <img src="./images/Ellipse1.png" alt="">
            <!-- <img src="${element.authors[0].profile_picture}" alt=""> -->
            </div>
            <div>
                <h1 class="text-lg font-bold">${element.title}</h1>
                <p class="text-base flex gap-2">${element.authors[0].profile_name} <span><img src="./images/Group.png" alt=""></span></p>
                <h3>${element?.others?.views} views</h3>
            </div>
        </div>
    </div>
        `
        cardContainer.appendChild(newCard);
    });

    }
    else{
        hiddenContainer.classList.remove('hidden');
    }
    
}


fetchAllCategory();

fetchSpecificCategory();