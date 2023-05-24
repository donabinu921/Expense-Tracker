document
  .getElementById("expenseForm")
  .addEventListener("submit", formSubmitHandler);

let editingRow = null;

function formSubmitHandler(event) {
  event.preventDefault();

  let description = document.getElementById("expenseDescription").value;
  let amount = parseFloat(document.getElementById("expenseAmount").value);
  let date = new Date();

  if (editingRow) {
    editingRow.cells[0].textContent = description;
    editingRow.cells[1].textContent = amount.toFixed(2);
    editingRow = null;
    document.getElementById("expenseDescription").value = "";
    document.getElementById("expenseAmount").value = "";
  } else {
    let table = document.getElementById("expenseTable");
    let row = table.insertRow(-1);
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
      table.deleteRow(row.rowIndex);
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
  }
}
