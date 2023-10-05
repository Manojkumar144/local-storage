var form = document.getElementById('my-form');
form.addEventListener('submit', storeItem);
var itemList = document.getElementById('items');

// Delete event
itemList.addEventListener('click', deleteItem);
itemList.addEventListener('click', updateItem);

function getItems() {
  axios.get("https://crudcrud.com/api/8fd01c1312064d54837ddc636a5da5ee/appointmentData")
    .then((response) => {
      const items = response.data;
      itemList.innerHTML = "";

      // Iterate through the items and add them to the list
      items.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
    
        // Create a delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.textContent = 'X';

        deleteBtn.addEventListener('click', () => {
          deleteItem(item._id); 
        });

        // Create an edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'edit';
        editBtn.textContent = '-';

        editBtn.addEventListener('click', (e) => {
          const li = e.target.parentElement;
          const itemText = li.textContent.trim().split('-');
          const name = itemText[0];
          const email = itemText[1];

          document.getElementById("name").value = name;
          document.getElementById("email").value = email;

          const updatedName = document.getElementById("name").value;
          const updatedEmail = document.getElementById("email").value;
          const updatedUser = {
            name: updatedName,
            email: updatedEmail
          };
          deleteItem(item._id);
          updateItem(item._id, updatedUser);
        });
      
        li.appendChild(document.createTextNode(item.name + '-' + item.email));
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

  axios.post("https://crudcrud.com/api/8fd01c1312064d54837ddc636a5da5ee/appointmentData", user)
    .then((response) => {
      console.log(response);
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
function deleteItem(itemId) {
  if (confirm('Are You Sure?')) {
  axios.delete(`https://crudcrud.com/api/8fd01c1312064d54837ddc636a5da5ee/appointmentData/${itemId}`)
    .then((response) => {
      console.log(`Item with ID ${itemId} deleted successfully`);
      getItems();
    })
    .catch((error) => {
      console.error(`Error deleting item with ID ${itemId}:`, error);
    });
  }
}

//update item
function updateItem(itemId, updatedUser) {
  axios.put(`https://crudcrud.com/api/8fd01c1312064d54837ddc636a5da5ee/appointmentData/${itemId}`, updatedUser)
    .then((response) => {
      console.log(`Item with ID ${itemId} updated successfully`);
    })
    .catch((error) => {
      console.error(`Error updating item with ID ${itemId}:`, error);
    });
}