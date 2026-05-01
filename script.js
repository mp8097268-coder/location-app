let Chart;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
const firebaseConfig = {
  apiKey: "AIzaSyAZzJDB1OMxH2RF13m1FdqHEQ_k1uNieNw",
  authDomain: "expense-tractor-app.firebaseapp.com",
  projectId: "expense-tractor-app"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function signup() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Signup successful"))
    .catch(err => alert(err.message));
}
function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => alert("Login successful"))
    .catch(err => alert(err.message));
}
function logout() {
  auth.signOut();
  alert("Logged out");
}
// ADD
function addExpense() {
list.innerHTML += `
  <li class="flex justify-between items-center bg-gray-100 p-2 rounded">
    <span>
      📅 ${exp.date} | ${exp.title} | ₹${exp.amount}
    </span>
    <div>
      <button onclick="editExpense(${index})">✏️</button>
      <button onclick="deleteExpense(${index})">❌</button>
    </div>
  </li>
`;
  let title = document.getElementById("title").value.trim();
  let amount = document.getElementById("amount").value.trim();
  let date = document.getElementById("date").value;

  if (title === "" || amount === "" || date === "") {
    alert("Sab fill karo!");
    return;
   showChart();
}

  let expense = {
    title: title,
    amount: Number(amount),
    date: date
  };

  expenses.push(expense);

  // SAVE
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // CLEAR input
  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";

  displayExpenses(expenses);
  totalExpense(expenses);
}

// DISPLAY
function displayExpenses(data) {
  let list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach((exp, index) => {
    list.innerHTML += `
      <li>
        📅 ${exp.date} | ${exp.title} | ₹${exp.amount}
        <button onclick="editExpense(${index})">✏️</button>
        <button onclick="deleteExpense(${index})">❌</button>
      </li>
    `;
  });
}

// TOTAL
function totalExpense(data) {
  let total = 0;

  data.forEach(e => total += e.amount);

  document.getElementById("total").innerText = total;
}

// FILTER
function filterByDate() {
  let selectedDate = document.getElementById("filterDate").value;

  let filtered = expenses.filter(e => e.date === selectedDate);

  displayExpenses(filtered);
  totalExpense(filtered);
}

function deleteExpense(index) {
  expenses.splice(index, 1);

  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayExpenses(expenses);
  totalExpense(expenses);
  showChart();
}
function editExpense(index) {
  let exp = expenses[index];

  document.getElementById("title").value = exp.title;
  document.getElementById("amount").value = exp.amount;
  document.getElementById("date").value = exp.date;

  expenses.splice(index, 1);

  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayExpenses(expenses);
  totalExpense(expenses);
}
function filterByDate() {
  let selectedDate = document.getElementById("filterDate").value;

  let filtered = expenses.filter(e => e.date === selectedDate);

  displayExpenses(filtered);
  totalExpense(filtered);
}
function filterByRange() {
  let from = document.getElementById("fromDate").value;
  let to = document.getElementById("toDate").value;

  let filtered = expenses.filter(e => {
    return e.date >= from && e.date <= to;
  });

  displayExpenses(filtered);
  totalExpense(filtered);
}
function resetData() {
  displayExpenses(expenses);
  totalExpense(expenses);
}
function showChart() {
  let data = {};

  expenses.forEach(e => {
    data[e.title] = (data[e.title] || 0) + Number(e.amount);
  });

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(document.getElementById("myChart"), {
    type: 'pie',
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data)
      }]
    }
  });
}
// LOAD
window.onload = function () {
  displayExpenses(expenses);
  totalExpense(expenses);
  showChart();
};