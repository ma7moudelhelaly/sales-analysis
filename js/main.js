
let management = document.getElementById("management");
let branch = document.getElementById("branch");
let invoiceTotal = document.getElementById("invoiceTotal");
let invoiceNumber = document.getElementById("invoiceNumber");
let date = document.getElementById("date");
let totalSales = document.getElementById("totalSales");
let addBtn = document.getElementById("addBtn");

let invoiceContainer;  // Array to store invoice data.

let tmp;  // Temporary variable to store index during updates (i).

let mode = "create"; // Current mode (create or update).

// Load invoices from localStorage or view an empty array (table body).
if (localStorage.getItem("invoices") === null) {
  invoiceContainer = [];
} else {
  invoiceContainer = JSON.parse(localStorage.getItem("invoices"))
  displayInvoic();
};

// Add a new invoice or update an existing one.
function addInvoice() {

  let invoiceData = {
    managementName: management.value,
    branchName: branch.value, 
    invoiceTotal: invoiceTotal.value,
    invoiceNumber: invoiceNumber.value,
    date: date.value
  }

  if (!management.value || !branch.value || !invoiceTotal.value || !invoiceNumber.value || !date.value) {
    alert("Please fill all fields with valid data!");
    return;
  }

  if (mode === "create" && invoiceContainer.some(invoice => invoice.invoiceNumber === invoiceNumber.value)) {
    alert("Invoice number already exists!");
    return;
  }

  if (mode === "create") {
    invoiceContainer.push(invoiceData);
    localStorage.setItem("invoices", JSON.stringify(invoiceContainer));
    displayInvoic();
    clearInputs();
  } else {
    invoiceContainer[tmp] = invoiceData;
    localStorage.setItem("invoices", JSON.stringify(invoiceContainer));
    addBtn.innerHTML = "Add";
    mode = "create";
    displayInvoic();
    clearInputs();
  };
};

// Add event listener for "Enter" key to trigger invoice addition.
[management, branch, invoiceTotal, invoiceNumber, date].forEach(input => {
  input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      addInvoice();
    }
  });
});

// Display invoices in a table and calculate total Sales.
function displayInvoic() {
  let invoiceList = "";
  let totaly = 0;
    for(let i = 0; i < invoiceContainer.length; i++) {
      totaly += Number(invoiceContainer[i].invoiceTotal)
      invoiceList += `
        <tr>
          <td>${i+1}</td>
          <td>${invoiceContainer[i].managementName}</td>
          <td>${invoiceContainer[i].branchName}</td>
          <td>${invoiceContainer[i].invoiceTotal}</td>
          <td>${invoiceContainer[i].invoiceNumber}</td>
          <td>${invoiceContainer[i].date}</td>
          <td>
            <div class="btns">
              <a class="edite-row" id="editeRow" onclick="editeRow(${i})"><i class="fa-solid fa-pen-to-square"></i></a>
              <a class="delete-row" id="deleteRow" onclick="deleteRow(${i})"><i class="fa-solid fa-trash"></i></a>
          </td>
        </tr>
      `
    };
    document.getElementById("totalSales").innerHTML = totaly;
    document.getElementById("tBody").innerHTML = invoiceList;
};

// Filter by Management or Invoice Numbre
function searchInvoices(query) {
  let filtered = invoiceContainer.filter(invoice =>
    invoice.managementName.toLowerCase().includes(query.toLowerCase()) ||
    invoice.invoiceNumber.toLowerCase().includes(query.toLowerCase())
  );
  displayFilteredInvoices(filtered);
}

function displayFilteredInvoices(filtered) {
  let invoiceList = "";
  let totaly = 0;
  for (let i = 0; i < filtered.length; i++) {
    totaly += Number(filtered[i].invoiceTotal);
    invoiceList += `
      <tr>
        <td>${i + 1}</td>
        <td>${filtered[i].managementName}</td>
        <td>${filtered[i].branchName}</td>
        <td>${filtered[i].invoiceTotal}</td>
        <td>${filtered[i].invoiceNumber}</td>
        <td>${filtered[i].date}</td>
        <td>
          <div class="btns">
            <a class="edite-row" onclick="editeRow(${invoiceContainer.indexOf(filtered[i])})"><i class="fa-solid fa-pen-to-square"></i></a>
            <a class="delete-row" onclick="deleteRow(${invoiceContainer.indexOf(filtered[i])})"><i class="fa-solid fa-trash"></i></a>
          </div>
        </td>
      </tr>
    `;
  }
  document.getElementById("totalSales").innerHTML = totaly;
  document.getElementById("tBody").innerHTML = invoiceList;
}

// Clear all input fields after adding or updating.
function clearInputs() {
  management.value = "";
  branch.value = "";
  invoiceTotal.value = "";
  invoiceNumber.value = "";
  date.value = "";
};

// Delete all invoices after user confirmation.
function deleteAll() {
  if (invoiceContainer.length === 0) {
    alert("You have no data!");
  } else {
    if (confirm("Are you sure?")) {
      invoiceContainer = [];
      localStorage.removeItem("invoices");
      displayInvoic();
    }
  } 
};

// Delete a single invoice based on index
function deleteRow(i) {
  if (confirm("Are you sure you want to delete this invoice?")) {
    invoiceContainer.splice(i, 1);
    localStorage.setItem("invoices", JSON.stringify(invoiceContainer));
    displayInvoic();
    clearInputs();
    mode = "create";
    addBtn.innerHTML = "Add";
  }
};

// Edite an existing invoice based on index.
function editeRow(i){
  management.value = invoiceContainer[i].managementName;
  branch.value = invoiceContainer[i].branchName;
  invoiceTotal.value = invoiceContainer[i].invoiceTotal;
  invoiceNumber.value = invoiceContainer[i].invoiceNumber;
  date.value = invoiceContainer[i].date;
  mode = "update";
  addBtn.innerHTML = "Update";
  tmp = i;
};