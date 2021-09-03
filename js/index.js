const inputEmpty = document.getElementById('input-empty');
const spinnerId = document.getElementById('spinner-id');
const inputText = document.getElementById('input-search');
const inputButton = document.getElementById('search-btn');

// search value and handling error empty string
const searchText =() =>{
    error.textContent = ''; 
    spinnerId.classList.remove('d-none');
    const inputValue = inputText.value;
    displayResult.textContent = '';
    totalFound.textContent = ''; 
    if(inputValue ===''){
        inputText.value = ''; 
        inputEmpty.classList.remove('d-none');       
        spinnerId.classList.add('d-none');

    }
    else{
        inputEmpty.classList.add('d-none'); 
        displayResultURL(`https://openlibrary.org/search.json?q=${inputValue}`);  
    }     
}

//  Fetch URL
const searchUrl =async url=>{
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
const totalFound = document.getElementById('total-found'); 
const displayResult = document.getElementById('visible-card');
const error = document.getElementById('error-msg');

// Display Result and error handling
const displayResultURL = url =>{
    searchUrl(url).then((data)=>{
        if(data.numFound===0){
            spinnerId.classList.add('d-none');
            error.innerText = `"${inputText.value}" : No Result found`;
            displayResult.textContent = '';
            totalFound.textContent = '';
            inputText.value = ''; 
        }
        else{
        inputText.value = ''; 
        displayResult.textContent = '';
        totalFound.textContent = '';
        spinnerId.classList.add('d-none')
        inputText.value = '';
        const h1 = document.createElement('h1');
        h1.innerHTML = `<h1 class="m-5 fs-1">Total Book Found : ${data.numFound}</h1>`;
        totalFound.appendChild(h1);
        data.docs.slice(0,30).forEach((element)=>{
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML =`
            <div class="card h-100">
              <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top img" alt="...">
              <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">by ${element.author_name ? element.author_name[0] : "N/A"}</p>
                <p class="card-text"><small class="text-muted">Publisher ${element.publisher ? element.publisher[0] : "N/A"}</small></p>
                <p class="card-text"><small class="text-muted">First published in ${element.first_publish_year ? element.first_publish_year : "N/A"}</small></p>
              </div>
            </div>
            `;
            displayResult.appendChild(div);
        });
        }; 
    });
};


// Call function
inputButton.addEventListener('click',function(){
    searchText();
});
