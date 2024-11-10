document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
  
    if (username && password) {
   
      window.location.href = 'main.html'; 
    } else {
     
      errorMessage.style.display = 'block';
    }
  });