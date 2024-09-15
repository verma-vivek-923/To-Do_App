let addBtn=document.querySelector(".add-btn");
let formBtn=document.querySelector("form");
let formInput=document.querySelector("form input");
let list=document.querySelector(".todos");

let alltodo=getTasks();

createlist();

formBtn.addEventListener('submit',(e)=>{
    e.preventDefault();
    let todotext=formInput.value.trim();
    // alert(todotext);
    addtodo(todotext);
})

function addtodo(text){
    if(text!==""){

        textobj={
            text:text,
            complete:false
        }

        alltodo.unshift(textobj);
        formInput.value="";
        createlist();
        saveTask();
    }
}
// //console.log(alltodo);
function createlist(){
    // let listitem=document.createElement("li");
    // list.appendChild(listitem);
        //console.log(alltodo)
        list.innerHTML="";


        alltodo.forEach((key,idx)=>{
            let listli=document.createElement("li");

            listli.className="todo-items";

            listli.innerHTML+=`
            <input type="checkbox" id="ch-${idx}">
            <label class="check" for="ch-${idx}">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
            </label>
            <label class="tasks" for="ch-${idx}">${key.text}</label>
            <button class="dlt-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>
            `
            list.append(listli);

            const deltask=listli.querySelector(".dlt-btn");
            const checkbox=listli.querySelector("input");
    
            deltask.addEventListener("click",()=>{
                //console.log("outded")
                deleteTask(idx);
            })

            checkbox.addEventListener("change",()=>{
                //console.log("cjecked")
                alltodo[idx].complete=checkbox.checked;
                saveTask();
            })
            checkbox.checked = key.complete;
        })
}

function deleteTask(idx){
//   alltodo=alltodo.filter((_,i)=>i!==idx);
alltodo.splice(idx,1);
  saveTask();
    createlist();
    
}

let saveTask=()=>{
    const jsonitem=JSON.stringify(alltodo);
 
    localStorage.setItem("task_list",jsonitem);
}

function getTasks(){
    const alltasks=localStorage.getItem("task_list") || "[]";

    return JSON.parse(alltasks);
}