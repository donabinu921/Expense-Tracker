document.getElementById("expenseForm").addEventListener("submit", formSubmitHandler);

let editingRow = null;
let totalExpense = 0;

function formSubmitHandler(event) {
  event.preventDefault();

  let description = document.getElementById("expenseDescription").value;
  let amount = parseFloat(document.getElementById("expenseAmount").value);
  let date = new Date();

  if (editingRow) {
    totalExpense -= parseFloat(editingRow.cells[1].textContent);
    editingRow.cells[0].textContent = description;
    editingRow.cells[1].textContent = amount.toFixed(2);
    editingRow = null;
    document.getElementById("expenseDescription").value = "";
    document.getElementById("expenseAmount").value = "";
    totalExpense += amount; // Update total expense when editing an expense
    updateTotalExpense();
  } else {
    let tbody = document.querySelector("tbody");
    let row = tbody.insertRow(-1);
    let descriptionCell = row.insertCell(0);
    let amountCell = row.insertCell(1);
    let dateCell = row.insertCell(2);
    let actionsCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);

    descriptionCell.textContent = description;
    amountCell.textContent = amount.toFixed(2);
    dateCell.textContent = date.toUTCString().slice(5, 16);

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");

    deleteButton.addEventListener("click", function () {
      let row = this.parentNode.parentNode;
      totalExpense -= parseFloat(row.cells[1].textContent);
      tbody.deleteRow(row.rowIndex);
      updateTotalExpense();
    });

    editButton.addEventListener("click", function () {
      let currentRow = this.parentNode.parentNode;
      let description = currentRow.cells[0].textContent;
      let amount = parseFloat(currentRow.cells[1].textContent);

      document.getElementById("expenseDescription").value = description;
      document.getElementById("expenseAmount").value = amount.toFixed(2);

      editingRow = currentRow;
    });

    deleteCell.appendChild(deleteButton);
    actionsCell.appendChild(editButton);

    document.getElementById("expenseDescription").value = "";
    document.getElementById("expenseAmount").value = "";

    totalExpense += amount; // Update total expense when adding a new expense
    updateTotalExpense();
  }
}

// Function to update total expense
function updateTotalExpense() {
  document.getElementById("totalExpense").textContent = "Total Expense: Rs " + totalExpense.toFixed(2);
}

// Initial calculation of total expense
let expenseRows = document.querySelectorAll("#expenseTable tbody tr");
expenseRows.forEach(function (row) {
  let amount = parseFloat(row.cells[1].textContent);
  totalExpense += amount;
});

// Update the total expense display
updateTotalExpense();
