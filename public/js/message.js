const addComment = async (event) => {
    event.preventDefault();
   
    const commentid = event.target.dataset.comment_id;
    const user_name = event.target.dataset.user_name;
    const userid = event.target.dataset.userid;
    const message = document.querySelector('#comment-box').value.trim();
    
    console.log(commentid + " MESSAGE SAVE " + message);
    
    if(!message) {
        message = document.querySelector(`board${commentid}`).value.trim();
    };

    if (message && commentid) {

        const response = await fetch('/api/messages', {
            method: 'POST',
            body: JSON.stringify({ message, commentid }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {

            document.location.replace(`/board/${commentid}`);
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', addComment);
    
