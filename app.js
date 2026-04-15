const fs = require('fs')
const path = './taskList.json'

const command = process.argv[2];
const args = process.argv.slice(3);

function registerTasks(tasks){
    fs.writeFileSync('taskList.json', JSON.stringify(tasks, null, 2));
}
function displayTasks(task){
        console.log("=================================");
        console.log(`ID: ${task.id}`);
        console.log(`Description: ${task.description}`);
        console.log(`Status: ${task.status}`);
        console.log(`Created at: ${task.createdAt}`);
        console.log(`Updated at: ${task.updatedAt}`);
        console.log("=================================\n");
}

function checkId(task,id,tasks){
    if(task.id == id){
        return true
    }else if(task === tasks[tasks.length-1]){
        console.log("ID não encontrado")
        return false
    }
}
function add(args){
    if (!fs.existsSync(path)) {
        const content = "[]"       
        fs.writeFileSync(path, content, 'utf-8')
        console.log(`Arquivo ${path} criado com sucesso!`);
    }

    let tasks = [];
    
    const dados = fs.readFileSync('taskList.json', 'utf-8')
    tasks = JSON.parse(dados);
    
    const novoId = tasks.length > 0
    ? Math.max(...tasks.map(t => t.id)) + 1
    : 1; 
    
    const newTask = {
        id: novoId,
        description: args[0],
        status: "todo",
        createdAt: new Date().toLocaleString('pt-BR'),
        updatedAt: new Date().toLocaleString('pt-BR')        
    }

    tasks.push(newTask)

    registerTasks(tasks)
    
    console.log("Tarefa adicionada com sucesso")
    displayTasks(newTask);
}

function list(args){
    const tasks = JSON.parse(fs.readFileSync(path, 'utf-8'));
    
    const statusValidos = ["todo", "done", "in-progress"];

    if (args[0] && !statusValidos.includes(args[0])) {
        console.log("Status inválido. Use: todo | done | in-progress");
        return;
    }



    for(const task of tasks){

        if(args[0] && task.status !== args[0]) continue;
        
        var found = true;

        displayTasks(task)  
    }

    if(!found){
        console.log("Nenhuma tarefa encontrada.")
    }
}
    
function update(args){
    //node app.js 1 "estudar nodejs"
    //casos onde pode quebrar, id não encontrado
    let tasks = JSON.parse(fs.readFileSync(path, 'utf-8'));

    const id = args[0]
    const newDesc = args[1]

    for (const task of tasks){
        //iterar até encontrar o  id que foi informado
        if(checkId(task, id, tasks)){
            task.description = newDesc
            console.log("Descrição da tarefa alterada com sucesso");
            displayTasks(task);
            break;
        }
    }
    registerTasks(tasks)
    
}

function markInProgress(args){
    let tasks = JSON.parse(fs.readFileSync(path, 'utf-8'));

    const id = args[0]

    for (const task of tasks){
        if(checkId(task, id, tasks)){
            task.status = "In-Progress"
            console.log("Status da tarefa alterado com sucesso");
            displayTasks(task);
            break;
        }
    }

    registerTasks(tasks)
}

function markDone(args){
    let tasks = JSON.parse(fs.readFileSync(path, 'utf-8'));

    const id = args[0]

    for (const task of tasks){
        if(checkId(task, id, tasks)){
            task.status = "Done"
            console.log("Status da tarefa alterado com sucesso");
            displayTasks(task);
            break;
        }
    }

    registerTasks(tasks)
}


const commands = {
    add: add,
    list: list,
    update: update,
    "mark-in-progress": markInProgress,
    "mark-done": markDone
};

if (commands[command]) {
    commands[command](args);
} else {
    console.log("Comando inválido");
}