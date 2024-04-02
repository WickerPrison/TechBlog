const login = async (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    console.log(password);
    if(username && password){
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                name: username,
                password: password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok){
            document.location.replace('/');
        }
        else{
            alert(response.statusText);
        }
    }
}

document.getElementById("login-button").addEventListener("click", login);