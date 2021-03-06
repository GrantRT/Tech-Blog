const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts
router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data and comments
    const postData = await Post.findAll({});

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Post a blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Edit a blog post
router.put('/edit', withAuth, async (req, res) => {
  try {
    await Post.update(req.body, { where: { id: req.body.id } });
    res.status(200).render('dashboard', { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a blog post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this ID!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
