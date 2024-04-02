const newCommentButton = document.getElementById("new-comment-button");
const newComment = document.getElementById("new-comment");

const submit = async (e) => {
    e.preventDefault();
    const content = document.getElementById('new-comment-text').value;
    const post_id = document.getElementById("post-data").className;
    if(content){
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                content: content,
                post_id: post_id
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok){
            document.location.replace(`/posts/${post_id}`);
        }
        else{
            alert(response.statusText);
        }
    }
}

const showNewComment = () => {
    newComment.style.display = "flex";
    newCommentButton.style.display = "none";
}

newCommentButton.addEventListener("click", showNewComment);
document.getElementById("submit-comment").addEventListener("click", submit);