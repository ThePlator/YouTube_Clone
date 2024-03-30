import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openMenu } from '../Utils/sidenavSlice';

const VideoResults = () => {
    const [searchParams] = useSearchParams();

    const searchQuery = searchParams.get('search_query')

    const [videoResults, setVideoResults] = useState([]);


    const dispatch = useDispatch()

  useEffect(() => {
    dispatch(openMenu())
  },[])

    useEffect(() => {
        const fetchVideoResults = async () => {
            try {
                const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchQuery}&key=${import.meta.env.VITE_API_KEY}`);
                const data = await response.json();
                console.log(searchQuery)
                setVideoResults(data.items);
            } catch (error) {
                console.error('Error fetching video results:', error);
            }
        };

        fetchVideoResults();
    }, [searchQuery]);

    return (
          <div className="container mx-auto py-8">
            <h2 className="text-xl font-semibold mb-4">Video Results: <span className="text-blue-600">{searchQuery}</span></h2>
            <div className="grid grid-cols-1 gap-4">
                {videoResults.map(video => (
                    <Link key={video.id.videoId} to={'/watch?v='+ video.id.videoId }>
                    <div key={video.id.videoId} className=" p-4 rounded-lg  flex mb-4">
                        <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className="w-[22rem] h-auto mr-4 rounded-md" />
                        <div className="flex-1">
                            <h3 className="text-2xl font-medium">{video.snippet.title}</h3>
                            <p className="text-sm text-gray-500 mb-2 py-4">{video.snippet.channelTitle}</p>
                            <p className="text-sm text-gray-500 py-5">{video.snippet.description}</p>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default VideoResults;
