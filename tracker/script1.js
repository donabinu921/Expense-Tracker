document.getElementById("expenseForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get expense details
    var description = document.getElementById("expenseDescription").value;
    var amount = parseFloat(document.getElementById("expenseAmount").value);
    var date=new Date();

    // Create new row in the table
    var table = document.getElementById("expenseTable");
    var row = table.insertRow(-1);
    var descriptionCell = row.insertCell(0);
    var amountCell = row.insertCell(1);
    var dateCell = row.insertCell(2);


    // Set values for the new row
    descriptionCell.textContent = description;
    amountCell.textContent = amount.toFixed(2);
    dateCell.textContent=date.toUTCString().slice(5, 16);

    // Clear input fields
    document.getElementById("expenseDescription").value = "";
    document.getElementById("expenseAmount").value = "";
  });