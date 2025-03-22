let Transition_Add_Button = document.querySelector(".add_trans");
let Transition_Add_Window = document.querySelector(".add-transition-window");
let Goal_Add_Button = document.querySelector(".add_goal");
let Goal_Add_Window = document.querySelector(".add-goal-window");
let add_form = document.querySelector(".add-transition-window form");
let goal_form = document.querySelector(".add-goal-window form");
let income = document.querySelector(".incomeamt");
let expense = document.querySelector(".expenceamt");
let saving = document.querySelector(".savingamt");
let transitions = [];
let goals = [];

visiblityon(Goal_Add_Button, Goal_Add_Window);
visiblityon(Transition_Add_Button, Transition_Add_Window);

document.addEventListener("click", (event) => {
  // Check if the click is NOT inside the button or the transition window
  if (
    !Transition_Add_Window.contains(event.target) &&
    !Transition_Add_Button.contains(event.target)
  ) {
    Transition_Add_Window.classList.remove("visiblity");
  }
  if (
    !Goal_Add_Window.contains(event.target) &&
    !Goal_Add_Button.contains(event.target)
  ) {
    Goal_Add_Window.classList.remove("visiblity");
  }
});

// submiting button for adding transition

add_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.querySelector("#trans-name").value;
  let amount = document.querySelector("#trans-amount").value;
  let trans_type = document.querySelector("#transaction-type").value;
  if (name == "" || amount == "") {
    alert("data can't be empty");
    return;
  }
  const transition = {
    name,
    amount: trans_type == "income" ? amount : -amount,
    trans_type,
  };
  transitions.push(transition);
  changeamount(transition, income);

  // localStorage.setItem("transactions" ,JSON.stringify(transitions));
  updatingUI();
  add_form.reset();
});

function updatingUI() {
  let trans_list = document.querySelector(".transition-list");

  trans_list.innerHTML = "";
  if (transitions.length > 20) {
    transitions.shift();
  }
  transitions.forEach((transition) => {
    const li = document.createElement("li");
    li.innerHTML = `${transition.name} : <strong>${transition.amount}</strong>`;
    li.style.color = transition.amount > 0 ? "#27AE60" : "#E74C3C";
    trans_list.prepend(li);
  });
}
function changeamount(transaction) {
  if (transaction.trans_type == "income") {
    income.innerHTML =
      parseInt(transaction.amount) + parseInt(income.innerHTML);
  } else {
    expense.innerHTML =
      parseInt(transaction.amount) + parseInt(expense.innerHTML);
  }

  saving.innerHTML = parseInt(income.innerHTML) - parseInt(-expense.innerHTML);
  // saving.innerHTML = saving.innerHTML
  updateChart();
}

// Update Chart.js Pie Chart
function updateChart() {
  myChart.data.datasets[0].data = [
    parseInt(saving.innerHTML) < 0 ? 0 : parseInt(saving.innerHTML),
    parseInt(expense.innerHTML),
  ];
  myChart.update();
}
function visiblityon(button, window) {
  button.addEventListener("click", (event) => {
    window.classList.add("visiblity");
    event.stopPropagation();
  });
}
goal_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.querySelector("#goal-name").value;
  let amount = document.querySelector("#goal-amount").value;
  if (name == "" || amount == "" || amount < 1) {
    alert("data can't be empty");
    return;
  }
  const goal = {
    name,
    amount,
    saving,
  };
  goals.push(goal);
  updating_goal_UI();
});
function updating_goal_UI() {
  let goal_list = document.querySelector(".goal-list");

  goals.forEach((goal) => {
    const li = document.createElement("li");
    li.innerHTML = `${goal.name} <div class = "goal-list-item"></div> ${goal.amount}/${goal.saving} <div class = "goal_list_add">+</div>    <input type="number">`;
    goal_list.prepend(li)
  });

}
