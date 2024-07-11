const Blog = require('../models/Blog');

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const { email,title, content } = req.body;
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

    const newBlog = new Blog({
        email,
      title,
      content,
      imageUrl,
    });

    await newBlog.save();

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog post', error });
  }
};
exports.getBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      res.status(200).json(blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      res.status(500).json({ message: 'Error fetching blogs', error: error.message });
    }
  };
  





  exports.getBlogById = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.json(blog);
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
      res.status(500).json({ message: 'Error fetching blog', error: error.message });
    }
  };