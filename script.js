var form = document.getElementById('my-form');
form.addEventListener('submit', storeItem);
var itemList = document.getElementById('items');

// Delete event
itemList.addEventListener('click', removeItem);
itemList.addEventListener('click', editItem);

function getItems() {
  axios.get("https://crudcrud.com/api/1d2279ac7feb42a69ab13240aa2a8d70/appointmentData")
    .then((response) => {
      // Assuming the response.data is an array of items
      const items = response.data;

      // Clear the current list
      itemList.innerHTML = "";

      // Iterate through the items and add them to the list
      items.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(item.name + '-' + item.email));
        
        // Create a delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.textContent = 'X';
        
        // Create an edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'edit';
        editBtn.textContent = '-';
        
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        
        itemList.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error fetching items:", error);
    });
}

// Call getItems when the page loads
window.addEventListener('load', getItems);

function storeItem(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const user = {
    name: name,
    email: email
  };

  axios.post("https://crudcrud.com/api/1d2279ac7feb42a69ab13240aa2a8d70/appointmentData", user)
    .then((response) => {
      console.log(response);
      // After successfully adding the item, fetch and display the updated list of items
      getItems();
    })
    .catch((err) => {
      document.body.innerHTML = document.body.innerHTML + "<h4> Something Went Wrong</h4>";
      console.error(err);
    });

  // Clear the name and email input fields
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("number").value = "";

}

  // Remove item
function removeItem(e){
  if(e.target.classList.contains('delete')){
    if(confirm('Are You Sure?')){
      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}

// Remove item
function editItem(e){
  if (e.target.classList.contains('edit')) {
    var li = e.target.parentElement;
    var itemText = li.textContent.trim().split('-');

    var name = itemText[0];
    var email = itemText[1];
    if (email.endsWith('X')) {
      email = email.slice(0, -1);
  }
    
    // Populate the name and email input fields
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;

    console.log(email);

    // Remove the list item
    itemList.removeChild(li);
}
}