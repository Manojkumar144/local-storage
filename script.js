var form = document.getElementById('my-form');
form.addEventListener('submit', storeItem);

function storeItem(e){
    e.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  
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

  }
