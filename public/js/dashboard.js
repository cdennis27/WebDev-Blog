
var sectionElement = $(".section-comments");
var commentid;
var message;

function saveComment(event) {
  event.preventDefault();

  commentid = $(this).attr("data-comment_id");

  //console.log((`.board${commentid}`));
  message = $(event.currentTarget).parent().find(`.board${commentid}`).val();
  //console.log(message);
  saveIt();

}
const saveIt = async (event) => {
  if (message && commentid) {

    var response = await fetch('/api/messages', {
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
}

const delButtonHandler = async (event) => {

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });
    console.log(`responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`);
    console.log(response);

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete comment');
    }
  }
};

sectionElement.on("click", '.submit-comment', saveComment);






