var form = document.getElementById('my-form');
form.addEventListener('submit', storeItem);
var itemList = document.getElementById('items');

// Delete event
itemList.addEventListener('click', removeItem);
itemList.addEventListener('click', editItem);

function storeItem(e) {
  e.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;

  // Create a new user object with the entered name and email
  var user = {
      name: name,
      email: email
  };


  
  axios.post("https://crudcrud.com/api/ab055fee9fe64dacb6918b45ed45b698/appointmentData",user)
  .then((response)=>
  {
    console.log(response)
  })
  .catch(err => 
    {
      document.body.innerHTML=document.body.innerHTML+"<h4> Something Went Wrong</h4>"
      console.log(err);
    })

  // Create a new list item
  var li = document.createElement('li');

  // Create a delete button
  var deleteBtn = document.createElement('button');

  // Create an edit button
  var editBtn = document.createElement('button');

  // Add classes
  li.className = 'list-group-item';
  deleteBtn.className = 'delete';
  editBtn.className = 'edit';

  // Append the elements to the list item
  li.appendChild(document.createTextNode(name + '-' + email));
  
  // Set the text content of delete and edit buttons
  deleteBtn.textContent = 'X';
  editBtn.textContent = '-';

  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  itemList.appendChild(li);

  // Clear the name and email input fields
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
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