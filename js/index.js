
const inputEmpty = document.getElementById('input-empty');
const spinnerId = document.getElementById('spinner-id');
const searchText =() =>{
    const inputValue = inputText.value;
    
    if(inputValue ===''){
        inputEmpty.classList.remove('d-none');
        error.classList.add('d-none');
        inputText.value = '';
        spinnerId.classList.add('d-none');
        displayResult.textContent = '';
        totalFound.textContent = '';
        
        
    }
    else{
        displayResultURL(`http://openlibrary.org/search.json?q=${inputValue}`);  
    }     
}

const searchUrl =async url=>{
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
const totalFound = document.getElementById('total-found'); 
const displayResult = document.getElementById('visible-card');
const error = document.getElementById('error-msg')
const displayResultURL = url =>{
    searchUrl(url).then((data)=>{
        if(data.numFound===0){
            error.classList.remove('d-none')
            inputEmpty.classList.add('d-none');
            spinnerId.classList.add('d-none');
            inputText.value = '';
            displayResult.textContent = '';
            totalFound.textContent = '';
        }
        else{
        displayResult.textContent = '';
        totalFound.textContent = '';
        spinnerId.classList.add('d-none')
        inputText.value = '';
        inputEmpty.classList.add('d-none');
        error.classList.add('d-none')
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
const inputText = document.getElementById('input-search');
const inputButton = document.getElementById('search-btn');
inputButton.addEventListener('click',function(){
    searchText();
    spinnerId.classList.remove('d-none');
});
