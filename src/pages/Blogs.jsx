import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, Clock } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [availableCategories, setAvailableCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      // Fetch blogs
      const blogsQuery = query(collection(db, 'blogs'), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(blogsQuery);
      const blogsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogs(blogsList);

      // Extract unique categories
      const uniqueCategories = [...new Set(blogsList.map(blog => blog.category))];
      setAvailableCategories(uniqueCategories);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      alert('Error fetching blogs. Please try again.');
      setLoading(false);
    }
  };

  const handleBlogClick = (blog) => {
    navigate(`/blog/${blog.id}`);
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === '' || blog.category === filterCategory)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blogs</h1>
      
      <div className="flex flex-col sm:flex-row mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full p-2 pl-10 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <select
          className="p-2 border rounded-md"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {availableCategories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        {filteredBlogs.map(blog => (
          <div key={blog.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden" onClick={() => handleBlogClick(blog)}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <img 
                  src={blog.imageUrl} 
                  alt={blog.title}
                  className="h-48 md:h-full w-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex flex-col h-full">
                  <div>
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-3">
                      {blog.category}
                    </span>
                    <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                      {blog.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <User size={16} className="mr-1" />
                        {blog.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {new Date(blog.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {blog.readTime}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{blog.summary}</p>
                  </div>
                  <div className="mt-auto">
                    <button className="bg-black text-white py-2 px-6 rounded-full hover:bg-gray-800 transition duration-300" onClick={() => handleBlogClick(blog)}>
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;