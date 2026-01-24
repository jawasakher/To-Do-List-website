const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// تحميل المهام من localStorage عند فتح الصفحة
window.addEventListener('load', loadTasks);

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) {
        alert("Please enter a task");
        return;
    }

    const li = createTaskElement(taskText);
    taskList.appendChild(li);

    saveTask(taskText, false);

    taskInput.value = '';
    taskInput.focus();
}

function createTaskElement(text, done = false) {
    const li = document.createElement('li');
    li.textContent = text;
    if(done) li.classList.add('done');

    li.addEventListener('click', function() {
        li.classList.toggle('done');
        updateTaskInStorage(text, li.classList.contains('done'));
    });

    const del = document.createElement('span');
    del.textContent = '✖';
    del.className = 'delete';
    del.addEventListener('click', function(e) {
        e.stopPropagation();
        li.remove();
        deleteTaskFromStorage(text);
    });

    li.appendChild(del);
    return li;
}

// localStorage functions
function saveTask(text, done) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push({text, done});
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => {
        const li = createTaskElement(task.text, task.done);
        taskList.appendChild(li);
    });
}

function updateTaskInStorage(text, done) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.map(t => t.text === text ? {...t, done} : t);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTaskFromStorage(text) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.filter(t => t.text !== text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}