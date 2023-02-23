const addMessage = async (event) => {
    event.preventDefault();
    
    const user_name = event.target.dataset.user_name;
    const userid = event.target.dataset.userid;
    const title = document.querySelector('#board-title').value.trim();
    const message = document.querySelector('#board-message').value.trim();
    console.log("Comment.js = " + user_name + " " + message + " " + title + " " + userid + " ");

    if (message && title) {

        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ message, title }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.ok) {
            document.location.replace(`/dashboard`);
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.board-form')
    .addEventListener('submit', addMessage);