const editFormHandler = async (event) => {
  event.preventDefault();

  // Collect the values from the edit post form
  const post_title = document.querySelector('#post-title').value;
  const post_content = document.querySelector('#post-content').value;
  const post_id = document.querySelector('.edit-post-form').dataset.id;

  console.log(post_title);
  console.log(post_content);
  console.log(post_id);
  if (post_title && post_content) {
    const response = await fetch('./post/' + post_id, {
      method: 'PUT',
      body: JSON.stringify({
        title: post_title,
        content: post_content,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
