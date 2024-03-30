import React, { useState, useEffect } from 'react';
import moment from "moment/moment";
import ShimmerVideoCard from './Shimmer/ShimmerVideoCard';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openMenu } from '../Utils/sidenavSlice';

const VideoCard = ({ video }) => {
  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }

  return (

     <div className="flex flex-col gap-1  w-[320px] h-[260px] rounded-xl text-white  mt-6 ">
      <div>
        <img className="rounded-xl " src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
      </div>
      <ul className="flex flex-col  p-2 w-full">
        <li className="font-semibold text-md   truncate overflow-hidden">
          {video.snippet.title}
        </li>
        <li className="text-sm text-gray-500 truncate">{video.snippet.channelTitle}</li>
        <ul className="flex gap-3 text-xs">
          <li>{numFormatter(video.statistics.viewCount)} views</li>
          <li>{moment(video.snippet.publishedAt).fromNow()}</li>
        </ul>
      </ul>
    </div>
  );
};

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(openMenu())
  },[])

  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!pageToken) return;

    const loadMoreVideos = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&pageToken=${pageToken}&key=${import.meta.env.VITE_API_KEY}`);
        const data = await response.json();
        setVideos(prevVideos => [...prevVideos, ...data.items]);
        setPageToken(data.nextPageToken);
      } catch (error) {
        console.error('Error fetching more videos:', error);
      }
      setLoading(false);
    };

    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
      loadMoreVideos();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageToken, loading]);

  const fetchVideos = async () => {
    try {
      const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${import.meta.env.VITE_API_KEY}`);
      const data = await response.json();
      setVideos(data.items);
      setPageToken(data.nextPageToken);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <div className="flex flex-wrap justify-evenly bg-gray-800 ">
      {loading && <ShimmerVideoCard/>}
      {videos.map((video, index) => (
        <Link key={index}  to={'/watch?v='+ video.id }><VideoCard video={video} />
        </Link>
      ))}
      {loading && <ShimmerVideoCard />}
    </div>
  );
};

export default VideoList;
