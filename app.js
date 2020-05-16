// Define UI Vars
const form = document.querySelector("#goal-form");
const goalList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-goals");
const filter = document.querySelector("#filter");
const goalInput = document.querySelector("#goal");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load Event
  document.addEventListener("DOMContentLoaded", getgoals);
  // Add goal event
  form.addEventListener("submit", addgoal);
  // Remove goal event
  goalList.addEventListener("click", removegoal);
  // Clear goal event
  clearBtn.addEventListener("click", cleargoals);
  // Filter goals event
  filter.addEventListener("keyup", filtergoals);
}

// Get goals from LS
function getgoals(e) {
  let goals;
  if (localStorage.getItem("goals") === null) {
    goals = [];
  } else {
    goals = JSON.parse(localStorage.getItem("goals"));
  }

  goals.forEach(function (goal) {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(goal));
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-times"></i>';
    // Append link to li
    li.appendChild(link);

    // Appened li to ul
    goalList.appendChild(li);
  });
}

// Add goal
function addgoal(e) {
  if (goalInput.value === "") {
    alert("Add a goal");
    return;
  }
  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(goalInput.value));
  // Create new link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-times"></i>';
  // Append link to li
  li.appendChild(link);

  // Appened li to ul
  goalList.appendChild(li);

  // Store in LS
  storegoalInLocalStorage(goalInput.value);

  // Clear input
  goalInput.value = "";

  e.preventDefault();
}

// Store goal
function storegoalInLocalStorage(goal) {
  let goals;
  if (localStorage.getItem("goals") === null) {
    goals = [];
  } else {
    goals = JSON.parse(localStorage.getItem("goals"));
  }

  goals.push(goal);

  localStorage.setItem("goals", JSON.stringify(goals));
}

// Remove goal
function removegoal(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removegoalFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removegoalFromLocalStorage(goalItem) {
  if (localStorage.getItem("goals") === null) {
    goals = [];
  } else {
    goals = JSON.parse(localStorage.getItem("goals"));
  }

  goals.forEach(function (goal, index) {
    if (goalItem.textContent === goal) {
      goals.splice(index, 1);
    }
  });

  localStorage.setItem("goals", JSON.stringify(goals));
}

// Clear goals
function cleargoals(e) {
  // goalList.innerHTML = '';

  // Faster
  while (goalList.firstChild) {
    goalList.removeChild(goalList.firstChild);
  }
  // https://jsperf.com/innerhtml-vs-removechild

  //Clear from LS
  cleargoalsFromLocalStorage();
}

// Clear goals from LS
function cleargoalsFromLocalStorage() {
  localStorage.clear();
}

// Filter goals
function filtergoals(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (goal) {
    const item = goal.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      goal.style.display = "block";
    } else {
      goal.style.display = "none";
    }
  });
}
