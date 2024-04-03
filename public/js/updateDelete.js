const updateButtons = document.getElementsByClassName("update-button");
const deleteButtons = document.getElementsByClassName("delete-button");
const updatePostElm = document.getElementById("update-post");
const updateTitle = document.getElementById("update-title-text");
const updateContent = document.getElementById("update-content-text");
const submitUpdate = document.getElementById("submit-update");

let updatePostId;

const deletePost = async (e) => {
    e.preventDefault();
    const post_id = e.currentTarget.getAttribute("data-postid");

    if(post_id){
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }).catch((err) => {
            response.json(err);
        });

        if(response.ok){
            document.location.replace('/dashboard');
        }
        else{
            alert(response.statusText);
        }
    }
}

const updatePost = async (e) => {
    e.preventDefault();

    const content = updateContent.value;
    const title = updateTitle.value;

    if(content && title){
        const response = await fetch(`/api/posts/${updatePostId}`, {
            method: 'PUT',
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

const showUpdatePost = async (e) => {
    updatePostElm.style.display = "block";
    newPostButton.style.display = "none";
    updatePostId = e.currentTarget.getAttribute("data-postid");

    const response = await fetch(`/api/posts/${updatePostId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).catch((err) => {
        response.json(err);
    });

    const data = await response.json();
    
    updateTitle.value = data.title;
    updateContent.value = data.content;
}

for(let i = 0; i < deleteButtons.length; i++){
    deleteButtons[i].addEventListener("click", deletePost);
}

for(let i = 0; i < updateButtons.length; i++){
    updateButtons[i].addEventListener("click", showUpdatePost);
}

submitUpdate.addEventListener("click", updatePost);