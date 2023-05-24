document
  .getElementById("expenseForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var description = document.getElementById("expenseDescription").value;
    var amount = parseFloat(document.getElementById("expenseAmount").value);
    var date = new Date();

    var table = document.getElementById("expenseTable");
    var row = table.insertRow(-1);
    var descriptionCell = row.insertCell(0);
    var amountCell = row.insertCell(1);
    var dateCell = row.insertCell(2);

    descriptionCell.textContent = description;
    amountCell.textContent = "Rs " + amount.toFixed(2);
    dateCell.textContent = date.toUTCString().slice(5, 16);

    document.getElementById("expenseDescription").value = "";
    document.getElementById("expenseAmount").value = "";
  });
