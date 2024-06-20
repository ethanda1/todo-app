let listcontainer = document.querySelector('.list-container');
let input = document.querySelector('.input');
let listItems = document.querySelectorAll('ul li');
let deadlineItem = document.getElementById('appt');

loadData();

function addTodo(){
    if (input.value === ''){
        alert('please type something');
    }
    else{
        let deadlineValue = deadlineItem.value;
        if (!deadlineValue) {
            alert('please select a deadline');
            return;
        }
        let deadlineTime = new Date(`1970-01-01T${deadlineValue}:00`);
        let currentTime = new Date();
        
        console.log(Notification.permission);
        if (Notification.permission == "granted"){
            alert('we have permission');
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                notificationPermission = permission;
                localStorage.setItem('notificationPermission', permission);
            })
        }


        let item = document.createElement("li");
        item.innerHTML = input.value;
        listcontainer.appendChild(item);
        input.value = "";
        item.addEventListener('click', function() {
            item.classList.toggle('checked');
            saveData();
        });
        
        let deadline = document.createElement("p");
        deadline.className = "deadline-item";
        deadline.innerHTML = deadlineItem.value;
        item.appendChild(deadline);
        deadlineItem.value = ""; 

        let timeDifference = deadlineTime - currentTime;
        let notificationTime = timeDifference - (30 * 60 * 1000);

        setTimeout(function() {
            showNotification(item);
        }, notificationTime);

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

function showNotification(input) {
    const notification = new Notification("Todo List", {
        body: `Your task, ${input.value} is due in 30 minutes!`
    });
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