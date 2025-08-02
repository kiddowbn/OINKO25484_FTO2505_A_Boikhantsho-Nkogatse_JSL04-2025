
const initialTasks = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 2,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
  },
  {
    id: 3,
    title: "Keep on Going 🏆",
    description: "You're almost there",
    status: "doing",
  },

  {
    id: 11,
    title: "Learn Data Structures and Algorithms 📚",
    description:
      "Study fundamental data structures and algorithms to solve coding problems efficiently",
    status: "todo",
  },
  {
    id: 12,
    title: "Contribute to Open Source Projects 🌐",
    description:
      "Gain practical experience and collaborate with others in the software development community",
    status: "done",
  },
  {
    id: 13,
    title: "Build Portfolio Projects 🛠️",
    description:
      "Create a portfolio showcasing your skills and projects to potential employers",
    status: "done",
  },
];
// --- State ---
let currentTask = null; // Holds the task being edited

// --- DOM Elements ---
const todoTasksContainer = document.getElementById('todo-tasks');
const doingTasksContainer = document.getElementById('doing-tasks');
const doneTasksContainer = document.getElementById('done-tasks');
const todoCountEl = document.getElementById('todo-count');
const doingCountEl = document.getElementById('doing-count');
const doneCountEl = document.getElementById('done-count');

const taskModal = document.getElementById('task-modal');
const addTaskModal = document.getElementById('add-task-modal');

const themeToggleBtn = document.getElementById('theme-toggle');
const sidebarToggleBtn = document.getElementById('sidebar-toggle');
const mobileSidebarToggleBtn = document.querySelector('.sidebar-toggle-mobile'); // Added selector
const sideBar = document.getElementById('side-bar');

// --- Utility Functions ---

/**
 * Updates the task count displayed in each column header.
 */
function updateColumnCounts() {
  const todoCount = initialTasks.filter(t => t.status === 'todo').length;
  const doingCount = initialTasks.filter(t => t.status === 'doing').length;
  const doneCount = initialTasks.filter(t => t.status === 'done').length;

  todoCountEl.textContent = todoCount;
  doingCountEl.textContent = doingCount;
  doneCountEl.textContent = doneCount;
}

/**
 * Creates a task DOM element.
 * @param {Object} task - The task object.
 * @returns {HTMLElement} - The task div element.
 */
function createTaskElement(task) {
  const taskDiv = document.createElement('div');
  taskDiv.className = 'task';
  taskDiv.dataset.id = task.id;
  taskDiv.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
  `;
  taskDiv.addEventListener('click', () => openTaskModal(task));
  return taskDiv;
}
// --- Task Rendering ---

/**
 * Renders all tasks to their respective columns.
 */
function renderTasks() {
  // Clear existing tasks
  todoTasksContainer.innerHTML = '';
  doingTasksContainer.innerHTML = '';
  doneTasksContainer.innerHTML = '';
// Render tasks based on status
  initialTasks.forEach(task => {
    const taskElement = createTaskElement(task);
    switch (task.status) {
      case 'todo':
        todoTasksContainer.appendChild(taskElement);
        break;
      case 'doing':
        doingTasksContainer.appendChild(taskElement);
        break;
      case 'done':
        doneTasksContainer.appendChild(taskElement);
        break;
    }
  });

  updateColumnCounts();
}

// --- Modal Handling ---

/**
 * Opens the edit task modal with the given task's data.
 * @param {Object} task - The task to edit.
 */
function openTaskModal(task) {
  currentTask = task;
  document.getElementById('modal-title').value = task.title || '';
  document.getElementById('modal-description').value = task.description || '';
  document.getElementById('modal-status').value = task.status || 'todo';
  taskModal.classList.remove('hidden');
}

/**
 * Closes the edit task modal.
 */
function closeTaskModal() {
  taskModal.classList.add('hidden');
  currentTask = null;
}
/**
 * Saves the changes made in the edit task modal.
 */
function saveTaskChanges() {
  if (!currentTask) return;

  currentTask.title = document.getElementById('modal-title').value;
  currentTask.description = document.getElementById('modal-description').value;
  currentTask.status = document.getElementById('modal-status').value;

  renderTasks(); // Re-render to reflect changes
  closeTaskModal();
}
/**
 * Opens the add new task modal.
 */
function openAddTaskModal() {
    // Reset form fields
    document.getElementById('add-modal-title').value = '';
    document.getElementById('add-modal-description').value = '';
    document.getElementById('add-modal-status').value = 'todo';
    addTaskModal.classList.remove('hidden');
}

/**
 * Closes the add new task modal.
 */
function closeAddTaskModal() {
    addTaskModal.classList.add('hidden');
}
/**
 * Creates a new task from the add task modal form and adds it to the list.
 */
function createNewTask() {
    const title = document.getElementById('add-modal-title').value.trim();
    const description = document.getElementById('add-modal-description').value.trim();
    const status = document.getElementById('add-modal-status').value;

    if (!title) {
        alert("Task title is required.");
        return;
    }

    const newTask = {
        id: Date.now(), // Simple ID generation, consider UUID for production
        title: title,
        description: description,
        status: status
    };

    initialTasks.push(newTask);
    renderTasks(); // Re-render to show new task
    closeAddTaskModal();
}
// --- UI Interactions ---

/**
 * Toggles the dark/light theme.
 */
function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    document.body.removeAttribute('data-theme');
  } else {
    document.body.setAttribute('data-theme', 'dark');
  }
}

/**
 * Toggles the visibility of the sidebar.
 */
function toggleSidebar() {
  sideBar.classList.toggle('show');
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
  renderTasks(); // Initial render

  // Modal Event Listeners
  document.getElementById('close-modal-btn').addEventListener('click', closeTaskModal);
  document.getElementById('save-task-btn').addEventListener('click', saveTaskChanges);
  
  document.getElementById('close-add-modal-btn').addEventListener('click', closeAddTaskModal);
  document.getElementById('create-task-btn').addEventListener('click', createNewTask);
 // UI Control Event Listeners
  themeToggleBtn.addEventListener('click', toggleTheme);
  sidebarToggleBtn.addEventListener('click', toggleSidebar);
  if (mobileSidebarToggleBtn) {
      mobileSidebarToggleBtn.addEventListener('click', toggleSidebar);
  }
  document.getElementById('add-task-btn').addEventListener('click', openAddTaskModal);

  // Close modals if clicked outside of content
  window.addEventListener('click', (event) => {
    if (event.target === taskModal) {
      closeTaskModal();
    }
    if (event.target === addTaskModal) {
        closeAddTaskModal();
    }
  });
});