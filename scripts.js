let listcontainer = document.querySelector('.list-container');
let input = document.querySelector('.input');
let listItems = document.querySelectorAll('ul li');

loadData();

function addTodo(){
    if (input.value === ''){
        alert('please type something');
    }
    else{
        let item = document.createElement("li");
        item.innerHTML = input.value;
        listcontainer.appendChild(item);
        input.value = "";
        item.addEventListener('click', function() {
            item.classList.toggle('checked');
            saveData();
        });
        
        let x = document.createElement('span');
        x.className = "icon-x";
        item.appendChild(x);
        x.addEventListener('click', function(){
            listcontainer.removeChild(item);
            saveData();
        });
        
        saveData();
    }
}

function clearList(){
    listcontainer.innerHTML = '';
    saveData();
}

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

function saveData(){
    localStorage.setItem("data", listcontainer.innerHTML);
}

function loadData(){
    const savedData = localStorage.getItem("data");
    if (savedData) {
        listcontainer.innerHTML = savedData;
        listItems = document.querySelectorAll('ul li');
        
        listItems.forEach(item => {
            item.addEventListener('click', function() {
                item.classList.toggle('checked');
                saveData();
            });
            
            let x = document.createElement('span');
            x.className = "icon-x";
            item.appendChild(x);
            x.addEventListener('click', function(){
                listcontainer.removeChild(item);
                saveData();
            });
        });
    }
}