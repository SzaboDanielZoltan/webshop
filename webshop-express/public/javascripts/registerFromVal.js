do {
  text += "The number is " + i;
  i++;
}
while (i < 5);


function validateFirstName() {
  let regName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõőøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕŐØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  const formNode = document.forms["registerForm"];
  const firstName = formNode["firstName"].value;


  if (firstName) {

    if (regName.test(firstName) == false) {
      document.querySelector('input.fname').classList.add("invalid");
      document.querySelector('.message-fname').setAttribute("style", "display : block");
      return false;
    } else {
      document.querySelector('input.fname').classList.remove("class", "invalid");
      document.querySelector('input.fname').classList.add("class", "valid");
      document.querySelector('.message-fname').setAttribute("style", "display : none");
      return true;
    }
  }

}

function validateLastName() {
  let regName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõőøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕŐØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  const formNode = document.forms["registerForm"];
  const lastName = formNode["lastName"].value;

  if (lastName) {
    if (regName.test(lastName) == false) {
      document.querySelector('input.lname').classList.add("invalid");
      document.querySelector('.message-lname').setAttribute("style", "display : block");
      return false;
    }
    document.querySelector('input.lname').classList.remove("class", "invalid");
    document.querySelector('input.lname').classList.add("class", "valid");
    document.querySelector('.message-lname').setAttribute("style", "display : none");
    return true;
  }
}

function validateEmail() {
  const reqEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const formNode = document.forms["registerForm"];
  const email = formNode["email"].value;


  if (email) {

    if (reqEmail.test(email) == false) {
      document.querySelector('input.registerEmail').classList.add("invalid");
      document.querySelector('.message-email').setAttribute("style", "display : block");
      return false;
    } else {
      document.querySelector('input.registerEmail').classList.remove("class", "invalid");
      document.querySelector('input.registerEmail').classList.add("class", "valid");
      document.querySelector('.message-email').setAttribute("style", "display : none");
      return true;
    }
  }

}

function validateAddress() {
  const regAddress = /^$|\s+/ ;
  const formNode = document.forms["registerForm"];
  const address = formNode["address"].value;

  if (address){
    if (regAddress.test(address) != false) {
        document.querySelector('input.registerAddress').classList.add("invalid");
        document.querySelector('.message-address').setAttribute("style", "display : block");
        return false;
      } else {
        document.querySelector('input.registerAddress').classList.remove("class", "invalid");
        document.querySelector('input.registerAddress').classList.add("class", "valid");
        document.querySelector('.message-address').setAttribute("style", "display : none");
        return true;
      }
  }
  }

  function formCheckValidation(ev) {

    let everythingVerified = true;
    validateAddress();
    validateEmail();
    validateFirstName();
    validateLastName();
    validatePassword();
  
    const inputs = document.querySelectorAll('.registration-form input');
  
    for (let i = 0; i < inputs.length; i += 1) {
      if (inputs[i].getAttribute("class").includes("invalid")) {
        everythingVerified = false
        break;
      };
    }
    if (!everythingVerified) {
      ev.preventDefault();
    }
  }
function validatePassword() {
  const strength = {
    0: 'Worst',
    1: 'Bad',
    2: 'Weak',
    3: 'Good',
    4: 'Strong'
  };
  const password = document.getElementById('password');
  const meter = document.getElementById('password-strength-meter');
  const text = document.getElementById('password-strength-text');

  password.addEventListener('input', function () {
    document.querySelector('meter').setAttribute('style', 'display : block');
    const val = password.value;
    const result = zxcvbn(val);

    // Update the password strength meter
    meter.value = result.score;

    // Update the text indicator
    if (val !== "") {
      text.innerHTML = "Strength: " + strength[result.score];
    } else {
      text.innerHTML = "";
    }
  });

  // Validation 
  if (password) {
    if (meter.value <= 2) {
      document.querySelector('input.registerPassword').classList.add("invalid");
      document.querySelector('.message-password').setAttribute("style", "display : block");
      return false;
    } else {
      document.querySelector('input.registerPassword').classList.remove("class", "invalid");
      document.querySelector('input.registerPassword').classList.add("class", "valid");
      document.querySelector('.message-password').setAttribute("style", "display : none");
      return true;
    }
  }
}