// Load tasks from localStorage
window.onload = () => {
  loadTasks();
};

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const prioritySelect = document.getElementById('prioritySelect');
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const taskList = document.getElementById('taskList');

  // Create task item
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item', priority);

  // Add task text
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;
  taskItem.appendChild(taskSpan);

  // Add complete button
  const completeButton = document.createElement('button');
  completeButton.textContent = "✔️";
  completeButton.onclick = () => toggleComplete(taskItem);
  taskItem.appendChild(completeButton);

  // Add delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = "❌";
  deleteButton.onclick = () => deleteTask(taskItem);
  taskItem.appendChild(deleteButton);

  // Add task to the list
  taskList.appendChild(taskItem);

  // Save task to localStorage
  saveTasks();

  // Clear input field
  taskInput.value = '';
}

// Toggle completion status of a task
function toggleComplete(taskItem) {
  taskItem.classList.toggle('complete');
  saveTasks();
}

// Delete a task
function deleteTask(taskItem) {
  taskItem.remove();
  saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
  const taskList = document.getElementById('taskList');
  const tasks = [];

  // Collect tasks
  Array.from(taskList.children).forEach(taskItem => {
    tasks.push({
      text: taskItem.querySelector('span').textContent,
      complete: taskItem.classList.contains('complete'),
      priority: taskItem.classList.contains('low') ? 'low' :
                taskItem.classList.contains('medium') ? 'medium' :
                'high'
    });
  });

  // Store tasks as JSON in localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.getElementById('taskList');

  // Clear existing tasks
  taskList.innerHTML = '';

  // Add tasks from localStorage
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item', task.priority);
    if (task.complete) {
      taskItem.classList.add('complete');
    }

    const taskSpan = document.createElement('span');
    taskSpan.textContent = task.text;
    taskItem.appendChild(taskSpan);

    const completeButton = document.createElement('button');
    completeButton.textContent = "✔️";
    completeButton.onclick = () => toggleComplete(taskItem);
    taskItem.appendChild(completeButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "❌";
    deleteButton.onclick = () => deleteTask(taskItem);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
  });
}
