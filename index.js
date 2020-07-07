var todoList = document.getElementById('todo-list');
var todoInput = document.getElementById('todo-input');
var btnAddToDo = document.getElementById('btn-add-todo');


function intializeToDoList() {
   var storedList = localStorage.getItem('todoList');
if(storedList === null){
    localStorage.setItem('todoList',JSON.stringify([]));   // so that intially we get a empty array
}
else{
    storedList = JSON.parse(storedList);
    for(var i=0; i<storedList.length;i++ ){
        todoList.appendChild(createTodoCard(storedList[i].id, storedList[i].message));
    }

}
}

intializeToDoList();




function createTodoCard(id,enteredText){
    var todoCard = document.createElement('div');
    todoCard.classList.add('todo-card');
    todoCard.id =  id;                           //'todo' + new Date().getMilliseconds();

    var todoInfo = document.createElement('p');
    var todoText = document.createTextNode(enteredText)

    var deleteBtn = document.createElement('i');
    deleteBtn.classList.add('fas', 'fa-trash');

    var checkBx = document.createElement('INPUT');
    checkBx.type = "checkbox";
    checkBx.id = 'check' + new Date().getMilliseconds();

   

   checkBx.addEventListener('click', function(){
    var currentCard = document.getElementById(todoCard.id);
    var currentCheck = document.getElementById(checkBx.id);
    if(currentCheck.checked){
        currentCard.style.textDecoration= "line-through";
        currentCard.style.background= "#455D5C";
        deleteBtn.style.display= "none";
        
    }
    else{
        currentCard.style.textDecoration= "none";
        deleteBtn.style.display= "block";
        currentCard.style.background= "#fff"
    }
   })

   

    



    deleteBtn.addEventListener('click', function(){
        var storedList = JSON.parse(localStorage.getItem('todoList'));
        var removeAtPos = -1;
        for(var i = 0; i<storedList.length; i++){
            if(storedList[i].id === todoCard.id ){
                removeAtPos = i;
                break;
            }
        }
        storedList.splice(removeAtPos,1);//remoing from array
        localStorage.setItem('todoList', JSON.stringify(storedList));//updating local storage
        var currentCard = document.getElementById(todoCard.id);
        currentCard.remove();
    })


    todoInfo.appendChild(todoText);
    todoCard.appendChild(todoInfo)
    todoCard.appendChild(deleteBtn);
    todoCard.appendChild(checkBx);
    todoList.appendChild(todoCard);



    return todoCard;
    



}

function handleTODOCreation(){
    var enteredText = todoInput.value;
    if(enteredText !== null && enteredText !== ''){
        var todoCard = createTodoCard('todo' + new Date().getMilliseconds(),enteredText);
        todoList.appendChild(todoCard);
        var todoData = {
            id:todoCard.id,
            message: enteredText
        };
        var storedList =JSON.parse(localStorage.getItem('todoList'));   //to get local storage items and parsing
        storedList.push(todoData);  //adding new obj to the stored array
        //console.log(storedList);

       localStorage.setItem('todoList', JSON.stringify(storedList));  //to send item to local storage
        todoInput.value = '';
    }
    else{
        alert('Kindly Enter Someting')
    }
}


btnAddToDo.addEventListener('click', function(){
    handleTODOCreation()
})

todoInput.addEventListener('keyup', function(e){
    if(e.which === 13){
    handleTODOCreation();
    }
   })




//    checkBox.onclick=function(){
//     if(window.getComputedStyle(checkBox).color === "rgb(128, 128, 128)"){
//     checkBox.style.color = "lightgreen"
//     taskPara.classList.add('para-text')
//     closeButton.style.display = "none"
//     dustSpan.style.display = "flex"
//     var lastEle = document.getElementById(itemWrapper.id);
//     list.removeChild(lastEle);
//     list.appendChild(lastEle);
//     }
//     else{
//       checkBox.style.color = "grey";
//       closeButton.style.display = "flex"
//       taskPara.classList.remove('para-text');
//       dustSpan.style.display = "none"
//     }
//   }