# 📌 Task Tracker CLI

Uma aplicação simples de linha de comando (CLI) para gerenciamento de tarefas, desenvolvida com Node.js. Este projeto foi baseado no desafio Task Tracker do roadmap.sh e tem como objetivo praticar manipulação de arquivos, entrada de dados via terminal e organização de código.

---

## 🚀 Funcionalidades

* Adicionar novas tarefas
* Atualizar descrição de tarefas
* Deletar tarefas
* Marcar tarefas como:

  * `todo` (a fazer)
  * `in-progress` (em andamento)
  * `done` (concluída)
* Listar:

  * Todas as tarefas
  * Tarefas filtradas por status

---

## 🧱 Estrutura do Projeto

```
.
├── app.js
├── taskList.json
└── README.md
```

* `app.js` → Aplicação principal (CLI)
* `taskList.json` → Arquivo de persistência das tarefas
* `README.md` → Documentação do projeto

---

## ⚙️ Requisitos

* Node.js instalado (versão 14 ou superior recomendada)

---

## ▶️ Como Executar

Execute os comandos no terminal utilizando:

```bash
node app.js <comando> [argumentos]
```

---

## 📖 Uso

### ➕ Adicionar uma nova tarefa

```bash
node app.js add "Comprar comida"
```

### ✏️ Atualizar uma tarefa

```bash
node app.js update 1 "Comprar comida e cozinhar"
```

### ❌ Deletar uma tarefa

```bash
node app.js delete 1
```

### 🔄 Atualizar status da tarefa

#### Marcar como em andamento

```bash
node app.js mark-in-progress 1
```

#### Marcar como concluída

```bash
node app.js mark-done 1
```

### 📋 Listar tarefas

#### Listar todas

```bash
node app.js list
```

#### Filtrar por status

```bash
node app.js list todo
node app.js list in-progress
node app.js list done
```

---

## 🗂️ Estrutura da Tarefa

```json
{
  "id": 1,
  "description": "Comprar comida",
  "status": "todo",
  "createdAt": "data e hora",
  "updatedAt": "data e hora"
}
```

---

## 🧠 Conceitos Praticados

* Manipulação de arquivos com `fs`
* Persistência de dados em JSON
* Leitura de argumentos via CLI (`process.argv`)
* Operações CRUD
* Organização e refatoração de código
* Uso de funções de ordem superior (higher-order functions)
* Tratamento de erros e validação de entrada

---

## ⚠️ Tratamento de Erros

A aplicação trata cenários como:

* Argumentos ausentes
* Comandos inválidos
* IDs inexistentes
* Filtros de status inválidos
* Arquivo JSON inexistente ou vazio

---

## 📌 Decisões de Projeto

* **JSON como banco de dados**: solução simples para aprendizado
* **Filesystem síncrono**: simplifica o fluxo do programa
* **Dispatcher de comandos**: evita múltiplos condicionais
* **Função genérica de atualização**: reduz duplicação de código

---

## 🔧 Melhorias Futuras

* Migrar para operações assíncronas
* Adicionar testes automatizados
* Melhorar UX no terminal (cores, formatação)
* Transformar em CLI instalável via npm
* Implementar busca e ordenação
* Adicionar categorias/tags

---

## 📚 Referência

[https://roadmap.sh/projects/task-tracker](https://roadmap.sh/projects/task-tracker)

---

## 📝 Licença

Este projeto está disponível sob a licença MIT.
