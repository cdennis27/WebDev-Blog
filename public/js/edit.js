const addBoard = async (event) => {
    event.preventDefault();
        
    //console.log(event.target.dataset.id);
    const commentid = event.target.dataset.id;
    const title = document.querySelector('#board-title').value.trim();
    const message = document.querySelector('#board-message').value.trim();
        
    if (message && title) {

        const response = await fetch(`/api/comments/${commentid}`, {
            method: 'PUT',
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
    .addEventListener('submit', addBoard);