document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    const form = document.querySelector('.input-area');

    const emptyImage = document.querySelector('.empty-image');

    const todosContainer = document.querySelector('.todos-container');

    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
        todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
    };

    const addTask = (text, completed = false) => {
        const taskText = text || taskInput.value.trim();
        if(!taskText){
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}/>
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const editButton = li.querySelector('.edit-btn');

        if (completed){
            li.classList.add('completed');
            editButton.disabled = true;
            editButton.computedStyleMap.opacity = '0.5';
            editButton.computedStyleMap.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editButton.disabled = isChecked;
            editButton.style.opacity = isChecked ? '0.5' : '1';
            editButton.style.pointerEvents = isChecked ? 'none' : 'auto';
        });

        

        editButton.addEventListener('click', () => {
            if (!checkbox.checked){
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                toggleEmptyState();
            }
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmptyState();
    };

    addTaskButton.addEventListener('click', () =>
        addTask());
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter'){
        e.preventDefault();
            addTask();
        }
    });
});