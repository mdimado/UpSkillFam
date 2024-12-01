import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowLeft, User, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CommentSection from '../components/CommentSection';
import { auth } from '../firebase';


const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchBlog();
  }, [id]);


  const fetchBlog = async () => {
    try {
      const blogDoc = await getDoc(doc(db, 'blogs', id));
      if (blogDoc.exists()) {
        setBlog(blogDoc.data());
        setLoading(false);
      } else {
        console.error('Blog not found');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      alert('Error fetching blog. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/blogs" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4">
        <ArrowLeft size={20} className="mr-2" />
        Back to Blogs
      </Link>
      <div className="bg-white rounded-lg shadow-md">
        <img src={blog.imageUrl} alt={blog.title} className="h-64 w-full object-cover rounded-t-lg" />
        <div className="p-6">
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-3">
            {blog.category}
          </span>
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 mb-4">
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
          <div className="prose max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <CommentSection 
        blogId={id} 
        currentUser={currentUser} 
      />
    </div>
  );
};

export default BlogPage;