// function to edit a post when the edit post button is clicked

const updatePostFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#post-title').value;
  const content = document.querySelector('#post-content').value;
  const id = document.querySelector('.edit-post-form').dataset.id;

  if (title && content) {
    const response = await fetch('/api/posts/edit', {
      method: 'PUT',
      body: JSON.stringify({ title, content, id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.edit-post-form').addEventListener('submit', updatePostFormHandler);
