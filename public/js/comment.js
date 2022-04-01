const commentFormHandler = async function (event) {
  event.preventDefault();

  // const post_id = document.querySelector('.new-comment-form').dataset.id;

  const content = document.querySelector('#comment-content').value.trim();

  if (content) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // console.log('it works, kind of' + content);
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};
document.querySelector('.new-comment-form').addEventListener('submit', commentFormHandler);
