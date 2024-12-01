import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  updateDoc, 
  doc,
  deleteDoc,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { User, ThumbsUp, MessageCircle, Trash2, Edit } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const CommentSection = ({ blogId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [likedComments, setLikedComments] = useState({});

  useEffect(() => {
    const commentsRef = collection(db, 'comments');
    const q = query(
      commentsRef, 
      where('blogId', '==', blogId), 
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(fetchedComments);
    });

    return () => unsubscribe();
  }, [blogId]);

  // Check user's liked comments when user changes
  useEffect(() => {
    const checkLikedComments = async () => {
      if (!currentUser) {
        setLikedComments({});
        return;
      }

      try {
        const userLikesDoc = await getDoc(doc(db, 'userLikes', currentUser.uid));
        if (userLikesDoc.exists()) {
          setLikedComments(userLikesDoc.data().likedComments || {});
        }
      } catch (error) {
        toast.error('Error fetching liked comments');
      }
    };

    checkLikedComments();
  }, [currentUser]);

  const addComment = async (parentCommentId = null) => {
    if (!currentUser) {
      toast.error('Please log in to comment');
      return;
    }

    const commentText = parentCommentId ? editCommentText : newComment;
    
    if (!commentText.trim()) return;

    try {
      await addDoc(collection(db, 'comments'), {
        blogId,
        text: commentText,
        author: currentUser.displayName || currentUser.email,
        timestamp: new Date(),
        likes: 0,
        parentCommentId,
        userId: currentUser.uid,
        likedBy: [] // Track users who liked this comment
      });

      // Reset states
      setNewComment('');
      setEditingCommentId(null);
      setReplyToCommentId(null);
      setEditCommentText('');
      
      toast.success(parentCommentId ? 'Reply posted!' : 'Comment posted!');
    } catch (error) {
      toast.error('Error adding comment');
    }
  };

  const toggleLike = async (commentId, currentLikes) => {
    if (!currentUser) {
      toast.error('Please log in to like a comment');
      return;
    }

    try {
      const commentRef = doc(db, 'comments', commentId);
      const userLikesRef = doc(db, 'userLikes', currentUser.uid);

      // Get the current comment to check existing likes
      const commentDoc = await getDoc(commentRef);
      const likedBy = commentDoc.data().likedBy || [];

      // Check if user has already liked
      const hasLiked = likedBy.includes(currentUser.uid);

      if (hasLiked) {
        // Unlike the comment
        await updateDoc(commentRef, {
          likes: currentLikes - 1,
          likedBy: likedBy.filter(uid => uid !== currentUser.uid)
        });

        // Remove like from user's liked comments
        const userLikesDoc = await getDoc(userLikesRef);
        const currentLikedComments = userLikesDoc.data()?.likedComments || {};
        delete currentLikedComments[commentId];
        
        await setDoc(userLikesRef, {
          likedComments: currentLikedComments
        }, { merge: true });

        // Update local state
        setLikedComments(prev => {
          const updated = {...prev};
          delete updated[commentId];
          return updated;
        });

        toast.success('Unliked comment');
      } else {
        // Like the comment
        await updateDoc(commentRef, {
          likes: currentLikes + 1,
          likedBy: [...likedBy, currentUser.uid]
        });

        // Update or create user's liked comments
        await setDoc(userLikesRef, {
          [`likedComments.${commentId}`]: true
        }, { merge: true });

        // Update local state
        setLikedComments(prev => ({
          ...prev,
          [commentId]: true
        }));

        toast.success('Liked comment');
      }
    } catch (error) {
      toast.error('Error liking/unliking comment');
    }
  };

  const editComment = async (commentId) => {
    if (!editCommentText.trim()) return;

    const commentRef = doc(db, 'comments', commentId);
    await updateDoc(commentRef, {
      text: editCommentText
    });

    setEditingCommentId(null);
    setEditCommentText('');
  };

  const deleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        // First, delete all replies to this comment
        const repliesToDelete = comments.filter(
          comment => comment.parentCommentId === commentId
        );
        
        for (let reply of repliesToDelete) {
          await deleteDoc(doc(db, 'comments', reply.id));
        }

        // Then delete the main comment
        await deleteDoc(doc(db, 'comments', commentId));
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  };

  const renderComments = (parentId = null) => {
    return comments
      .filter(comment => comment.parentCommentId === parentId)
      .map(comment => (
        <div 
          key={comment.id} 
          className={`mb-4 p-3 ${
            parentId ? 'ml-8 bg-gray-50 rounded' : 'bg-white border-b'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center mb-2">
              <User size={16} className="mr-2 text-gray-600" />
              <span className="font-semibold text-sm">
                {comment.author}
              </span>
              <span className="ml-2 text-xs text-gray-500">
                {comment.timestamp.toDate().toLocaleString()}
              </span>
            </div>
            {currentUser && currentUser.uid === comment.userId && (
              <div className="flex space-x-2">
                <Edit 
                  size={16} 
                  className="text-blue-500 cursor-pointer"
                  onClick={() => {
                    setEditingCommentId(comment.id);
                    setEditCommentText(comment.text);
                  }}
                />
                <Trash2 
                  size={16} 
                  className="text-red-500 cursor-pointer"
                  onClick={() => deleteComment(comment.id)}
                />
              </div>
            )}
          </div>

          {editingCommentId === comment.id ? (
            <div className="mt-2">
              <textarea
                value={editCommentText}
                onChange={(e) => setEditCommentText(e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
              />
              <div className="flex space-x-2 mt-2">
                <button 
                  onClick={() => editComment(comment.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button 
                  onClick={() => {
                    setEditingCommentId(null);
                    setEditCommentText('');
                  }}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700">{comment.text}</p>
          )}

          <div className="flex items-center mt-2 space-x-4">
            <button
              onClick={() => toggleLike(comment.id, comment.likes)}
              className={`flex items-center text-sm ${
                likedComments[comment.id] 
                  ? 'text-black' 
                  : 'text-gray-600'
              }`}
            >
              <ThumbsUp 
                size={16} 
                className="mr-1" 
                fill={likedComments[comment.id] ? 'black' : 'none'}
              />
              {comment.likes}
            </button>
            <button
              onClick={() => setReplyToCommentId(comment.id)}
              className="flex items-center text-sm text-gray-600"
            >
              <MessageCircle size={16} className="mr-1" />
              Reply
            </button>
          </div>

          {replyToCommentId === comment.id && (
            <div className="mt-2">
              <textarea
                value={editCommentText}
                onChange={(e) => setEditCommentText(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Write a reply..."
                rows={3}
              />
              <div className="flex space-x-2 mt-2">
                <button 
                  onClick={() => addComment(comment.id)}
                  className="bg-black text-white px-3 py-1 rounded"
                >
                  Post Reply
                </button>
                <button 
                  onClick={() => {
                    setReplyToCommentId(null);
                    setEditCommentText('');
                  }}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {renderComments(comment.id)}
        </div>
      ));
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      
      {currentUser ? (
        <div className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="Write a comment..."
            rows={4}
          />
          <button 
            onClick={() => addComment()}
            className="mt-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Post Comment
          </button>
        </div>
      ) : (
        <p className="text-gray-600 mb-4">
          Please log in to leave a comment.
        </p>
      )}

      <div className="space-y-4">
        {renderComments()}
      </div>
    </div>
  );
};

export default CommentSection;