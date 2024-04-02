const signUp = async (e) => {
    e.preventDefault();
    const username = document.getElementById("sign-up-username").value;
    const password = document.getElementById("sign-up-password").value;
    if(username && password){
        const response = await fetch('/api/users/signUp', {
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

document.getElementById("sign-up-button").addEventListener("click", signUp);