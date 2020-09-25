
// Selecionar os Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Nome das Classes
const CHECK= "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variáveis
let LIST, id;

// Pegar item do localStorage
let data = localStorage.getItem("TODO");

// Checar se a data não está vazia
if(data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadToDo(LIST);
}else {
    LIST = [];
    id = 0;
}

// Limpar o localStorage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// Carregar items na UI 
function loadToDo(array) {
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Mostrar a data de hoje
let options = { weekday:"long", month:"short", day:"numeric" };
let today = new Date();

dateElement.innerHTML = today.toLocaleDateString("pt-BR", options);

// Função para adicionar na lista
function addToDo(toDo, id, done, trash) {

    if(trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

     const text = `<li class="item">
                     <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                     <p class="text ${LINE} "> ${toDo} </p>
                     <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                 `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, text);

}

// Adicionar evento para a tecla Enter
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13) {
        const toDo = input.value;

        // Se o input ficar vazio
        if(toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            // Adicionar item no localStorage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }

});
// Completar To Do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}
// Remover To Do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}
// Criar items dinâmicamente
list.addEventListener("click", function(event){
    const element = event.target; // retorna o clique dentro de uma lista
    const elementJOB = element.attributes.job.value; // completar ou deletar

    if(elementJOB == "complete") {
        completeToDo(element);
    } else if(elementJOB == "delete"){
        removeToDo(element);
    }
    // Adicionar item no localStorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});