const commentFormHandler = async (event) => {
  event.preventDefault();

  const post_id = document.querySelector('.new-comment-form').dataset.id;

  const comment_content = document.querySelector('#comment-content').value.trim();

  if (comment_content) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ post_id: post_id, content: comment_content }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};
document.querySelector('.new-comment-form').addEventListener('submit', commentFormHandler);
