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
  let saving = 0;
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
  goal_form.reset();
});
function updating_goal_UI() {
  let goal_list = document.querySelector(".goal-list");
  goal_list.innerHTML = "";
  goals.forEach((goal, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<p id = "name-${index}">${goal.name}</p>
    <div class = "goal_list_item">
    <div id="div-${index}"></div></div> 
    <p id="amount-${index}">${goal.amount}</p>
     / 
   <p  id="saving-${index}">${goal.saving}</p> 
    <button class = "goal_list_add" id ="button-${index}" onclick="visibiliy_num(${index})">+</button>
       <div class = "goal_list_num" ><input type="number " id="input-${index}" >
       <button onclick="updateSaving(${index})">+</button>
      
    </div>
        `;

    goal_list.prepend(li);
  });
}
function visibiliy_num(index) {
  let div = document.querySelector(`#input-${index}`).parentElement;
  console.log(div);
  div.style.visibility = "visible";
  document.addEventListener("click", function hideInput(event) {
    if (!div.contains(event.target) && event.target.tagName !== "BUTTON") {
      div.style.visibility = "hidden";
      document.removeEventListener("click", hideInput);
    }
  });
}
function visibiliy_mun(index) {
  let div = document.querySelector(`#input-${index}`).parentElement;
  console.log(div);
  div.style.visibility = "hidden";
}
function updateSaving(index) {
  let input = document.querySelector(`#input-${index}`);
  let savingDisplay = document.querySelector(`#saving-${index}`);
  let div = document.querySelector(`#div-${index}`);
  let amount1 = document.querySelector(`#amount-${index}`); // Moved this up
  let amountValue = parseInt(amount1.textContent); // Now it's defined properly
  let value = parseInt(input.value);

  let name = document.querySelector(`#name-${index}`).innerHTML
  if (
    !isNaN(value) &&
    value > 0 &&
    goals[index].saving + value <= amountValue
  ) {
    goals[index].saving += value; // Update saving amount
    savingDisplay.textContent = goals[index].saving; // Update UI
    input.value = ""; // Clear input field
    visibiliy_mun(index);
  } else {
    alert("Enter a valid amount");
  }
  let amount = -value;
  console.log(value)
  const transition = {
    name,
    amount,
    expense,
  };
  transitions.push(transition);
  changeamount(transition, income);

  // localStorage.setItem("transactions" ,JSON.stringify(transitions));
  updatingUI();
  div.style.width = (goals[index].saving / amountValue) * 100 + "%"; // Update progress bar

}
