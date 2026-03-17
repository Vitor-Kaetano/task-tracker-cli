function Task(id, description, status, createdAt, updatedAt){
    this.id = id;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
}

//Função criar task
//Função apagar task
//função atualizar task
//função listar todas as tasks concluídas, não concluidas e em progresso

const id = 1;
const description = "Lavar louça";
add(id, description);
console.log("dados");

function add(id, description){
    let myTask = new Task(id, description);
    let dados = myTask;
    let taskList = dados.json;
    
};

/*function remove(id){

};

function update(id, description){

};

function list(){

};

function mark-in-progress(id){

};

function mark-document(id){

};*/

