document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').innerText,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
                <button class="complete">Complete</button>
            </div>
        `;
        li.querySelector('.edit').addEventListener('click', () => editTask(li));
        li.querySelector('.delete').addEventListener('click', () => deleteTask(li));
        li.querySelector('.complete').addEventListener('click', () => completeTask(li));
        taskList.appendChild(li);
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        addTaskToDOM({ text: taskText, completed: false });
        taskInput.value = '';
        saveTasks();
    };

    const editTask = (li) => {
        const span = li.querySelector('span');
        const newTaskText = prompt('Edit task:', span.innerText);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            span.innerText = newTaskText.trim();
            saveTasks();
        }
    };

    const deleteTask = (li) => {
        li.remove();
        saveTasks();
    };

    const completeTask = (li) => {
        li.classList.toggle('completed');
        saveTasks();
    };

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    loadTasks();
});
