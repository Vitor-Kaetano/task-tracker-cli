const fs = require('fs')
const path = './taskList.json'

const command = process.argv[2];
const args = process.argv.slice(3);

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

    fs.writeFileSync('taskList.json', JSON.stringify(tasks, null, 2));
    
    console.log("Tarefa adicionada com sucesso")
}

function list(args){
    const dados = fs.readFileSync(path, 'utf-8')
    let tasks = JSON.parse(dados);

    


    
    for(const task of tasks){

        if(task.status !== args[0])
            continue

        console.log("=================================");
        console.log(`ID: ${task.id}`);
        console.log(`Description: ${task.description}`);
        console.log(`Status: ${task.status}`);
        console.log(`Created at:: ${task.createdAt}`);
        console.log(`Updated at:: ${task.updatedAt}`);
        console.log("=================================\n");
        
    
    }
}
    




const commands = {
    add: add,
    list: list,
};

if (commands[command]) {
    commands[command](args);
} else {
    console.log("Comando inválido");
}