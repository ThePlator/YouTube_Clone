import moment from 'moment/moment';
import React, { useState, useEffect } from 'react';

const Comment = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!nextPageToken) return;

    const loadMoreComments = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=AIzaSyC_gh7xyNJwNwqzqaDwJSLlqGFjMOEzt4A&pageToken=${nextPageToken}`);
        const data = await response.json();
        setComments(prevComments => [...prevComments, ...data.items]);
        setNextPageToken(data.nextPageToken);
      } catch (error) {
        console.error('Error fetching more comments:', error);
      }
      setLoading(false);
    };

    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
      loadMoreComments();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [videoId, nextPageToken, loading]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${import.meta.env.VITE_API_KEY}`);
      const data = await response.json();
      setComments(data.items);
      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
 <div className="max-w-[60rem] mx-auto">
      {comments.map(comment => (
        <div key={comment.id} className='flex items-start border-b border-gray-200 py-4'>
          <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt='' className='w-8 h-8 rounded-full mr-2' />
          <div>
            <div className='flex justify-start items-center'>
                <p className='font-semibold'>{comment.snippet.topLevelComment.snippet.authorDisplayName}</p>
            <p className='text-gray-500 text-sm mx-2'>{moment(comment.snippet.topLevelComment.snippet.publishedAt).fromNow()}</p>
            </div>
            <p>{comment.snippet.topLevelComment.snippet.textOriginal}</p>
            <div className="flex items-center mt-2">
              <button onClick={() => handleLike(comment.id)} className="mr-2 flex items-center">
                <i className="far fa-thumbs-up mr-1"></i> Like <span className="text-gray-500 ml-1">{comment.snippet.topLevelComment.snippet.likeCount}</span>
              </button>
              <button onClick={() => handleDislike(comment.id)} className="flex items-center">
                <i className="far fa-thumbs-down mr-1"></i> Dislike <span className="text-gray-500 ml-1">{comment.snippet.topLevelComment.snippet.dislikeCount}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      {loading && <p>Loading more comments...</p>}
    </div>
  );
};

export default Comment;
