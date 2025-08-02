
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
