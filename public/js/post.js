const newPostButton = document.getElementById("new-post-button");
const newPost = document.getElementById("new-post");

const submit = async (e) => {
    e.preventDefault();
    const content = document.getElementById('content-text').value;
    const title = document.getElementById("title-text").value;
    if(content && title){
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                content: content,
                title: title
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok){
            document.location.replace('/dashboard');
        }
        else{
            alert(response.statusText);
        }
    }
}

const showNewPost = () => {
    newPost.style.display = "block";
    newPostButton.style.display = "none";
}

newPostButton.addEventListener("click", showNewPost);
document.getElementById("submit-post").addEventListener("click", submit);