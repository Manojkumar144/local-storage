var form = document.getElementById('my-form');
form.addEventListener('submit', storeItem);

function storeItem(e){
    e.preventDefault();
  
    // Get input value
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;


    // localStorage.setItem('name',name);
    // localStorage.setItem('email',email);

        //storing in the local storage
  let myObj =
  {
    name:name,
    age:email
  };

  let myObj_serialized =JSON.stringify(myObj);

  localStorage.setItem("myObj", myObj_serialized);

  let myObj_deserialized =JSON.parse(localStorage.getItem("myObj"));

  
  }
