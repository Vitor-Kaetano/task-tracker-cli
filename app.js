const fs = require('fs');
const path = './taskList.json';

const command = process.argv[2];
const args = process.argv.slice(3);

// =========================
// FILESYSTEM
// =========================

function loadTasks() {
    if (!fs.existsSync(path)) return [];
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

function saveTasks(tasks) {
    fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
}

// =========================
// UTIL
// =========================

function displayTask(task) {
    console.log("=================================");
    console.log(`ID: ${task.id}`);
    console.log(`Description: ${task.description}`);
    console.log(`Status: ${task.status}`);
    console.log(`Created at: ${task.createdAt}`);
    console.log(`Updated at: ${task.updatedAt}`);
    console.log("=================================\n");
}

function findTaskById(tasks, id) {
    return tasks.find(task => task.id == id);
}

function generateId(tasks) {
    return tasks.length > 0
        ? Math.max(...tasks.map(t => t.id)) + 1
        : 1;
}

// =========================
// CORE ACTIONS
// =========================

function add(args) {
    const description = args[0];

    if (!description) {
        console.log("Uso: add <descricao>");
        return;
    }

    const tasks = loadTasks();

    const newTask = {
        id: generateId(tasks),
        description,
        status: "todo",
        createdAt: new Date().toLocaleString('pt-BR'),
        updatedAt: new Date().toLocaleString('pt-BR')
    };

    tasks.push(newTask);
    saveTasks(tasks);

    console.log("Tarefa adicionada com sucesso");
    displayTask(newTask);
}

// =========================

function list(args) {
    const tasks = loadTasks();
    const status = args[0];

    const validStatus = ["todo", "done", "in-progress"];

    if (status && !validStatus.includes(status)) {
        console.log("Status inválido. Use: todo | done | in-progress");
        return;
    }

    let found = false;

    for (const task of tasks) {
        if (status && task.status !== status) continue;

        found = true;
        displayTask(task);
    }

    if (!found) {
        console.log("Nenhuma tarefa encontrada.");
    }
}

// =========================

function update(args) {
    const id = args[0];
    const newDesc = args[1];

    if (!id || !newDesc) {
        console.log("Uso: update <id> <descricao>");
        return;
    }

    updateTask(id, task => {
        task.description = newDesc;
    });
}

// =========================

function markInProgress(args) {
    const id = args[0];

    if (!id) {
        console.log("Uso: mark-in-progress <id>");
        return;
    }

    updateTask(id, task => {
        task.status = "in-progress";
    });
}

// =========================

function markDone(args) {
    const id = args[0];

    if (!id) {
        console.log("Uso: mark-done <id>");
        return;
    }

    updateTask(id, task => {
        task.status = "done";
    });
}

// =========================

function deleteTask(args) {
    const id = args[0];

    if (!id) {
        console.log("Uso: delete <id>");
        return;
    }

    const tasks = loadTasks();

    const index = tasks.findIndex(t => t.id == id);

    if (index === -1) {
        console.log("ID não encontrado");
        return;
    }

    const removed = tasks.splice(index, 1)[0];

    saveTasks(tasks);

    console.log("Tarefa deletada com sucesso");
    displayTask(removed);
}

// =========================
// GENERIC UPDATE
// =========================

function updateTask(id, updater) {
    const tasks = loadTasks();

    const task = findTaskById(tasks, id);

    if (!task) {
        console.log("ID não encontrado");
        return;
    }

    updater(task);
    task.updatedAt = new Date().toLocaleString('pt-BR');

    saveTasks(tasks);

    console.log("Tarefa atualizada com sucesso");
    displayTask(task);
}

// =========================
// COMMAND DISPATCH
// =========================

const commands = {
    add,
    list,
    update,
    "mark-in-progress": markInProgress,
    "mark-done": markDone,
    delete: deleteTask
};

if (commands[command]) {
    commands[command](args);
} else {
    console.log("Comando inválido");
}