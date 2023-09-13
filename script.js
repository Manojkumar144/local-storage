var form = document.getElementById('my-form');
form.addEventListener('submit', storeItem);
var itemList = document.getElementById('items');

// Delete event
itemList.addEventListener('click', removeItem);

function storeItem(e){
    e.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;

  var newItem= name+'-'+email;
  
  // Retrieve the existing user details from local storage, or initialize an empty array if none exist
  var userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];

  // Create a new user object with the entered name and email
  var user = {
    name: name,
    email: email
  };


  // Add the new user object to the userDetails array
  userDetails.push(user);
  
  // Store the updated userDetails array in local storage
  localStorage.setItem("userDetails", JSON.stringify(userDetails));

  //create  a new list 
  var li = document.createElement('li');
 
  // create  a delete button
  var deleteBtn = document.createElement('button');

  //create classes
  li.className = 'list-group-item';
  deleteBtn.className = 'delete';

  //append the elements to list 
  li.appendChild(document.createTextNode(newItem));
  deleteBtn.appendChild(document.createTextNode('X'));
  li.appendChild(deleteBtn);

  itemList.appendChild(li);
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