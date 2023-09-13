var form = document.getElementById('my-form');
form.addEventListener('submit', storeItem);

function storeItem(e){
    e.preventDefault();
  
    // Get input value
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;

    //storing in the local storage
    localStorage.setItem('name',name);
    localStorage.setItem('email',email);
  }