import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { selectVideoTag } from '../Utils/videoTagSlice';

const RightVideo = () => {
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState('');
    const [loading, setLoading] = useState(false);
    const videoTag = useSelector((state) => state.videoTag.tagName);

    useEffect(() => {
        fetchVideos();
    }, [videoTag]);

    useEffect(() => {
        if (!nextPageToken) return;

        const loadMoreVideos = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&regionCode=IN&q=${videoTag}&key=${import.meta.env.VITE_API_KEY}&pageToken=${nextPageToken}`
                );
                const data = await response.json();
                setVideos((prevVideos) => [...prevVideos, ...data.items]);
                setNextPageToken(data.nextPageToken);
            } catch (error) {
                console.error('Error fetching more videos:', error);
            }
            setLoading(false);
        };

        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop !==
                    document.documentElement.offsetHeight ||
                loading
            )
                return;
            loadMoreVideos();
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [nextPageToken, loading, videoTag]);

    const fetchVideos = async () => {
        try {
            const response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&regionCode=IN&q=${videoTag}&key=${import.meta.env.VITE_API_KEY}`
            );
            const data = await response.json();
            setVideos(data.items);
            setNextPageToken(data.nextPageToken);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    return (
        <div className="mx-2">
            {videos.map((video) => (
                <Link key={video.id.videoId} to={`/watch?v=${video.id.videoId}`}>
                    <div key={video.id.videoId} className="flex w-[25rem] h-[7rem] rounded-lg overflow-hidden my-3">
                        <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="w-2/5" />
                        <div className="px-2">
                            <div className="font-bold text-lg mb-1/2 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{video.snippet.title}</div>
                            <p className="text-zinc-50 text-base">{video.snippet.channelTitle}</p>
                            <p className="text-zinc-50 text-base">{moment(video.snippet.publishedAt).fromNow()}</p>
                        </div>
                    </div>
                </Link>
            ))}
            {loading && <p>Loading more videos...</p>}
        </div>
    );
};

export default RightVideo;
