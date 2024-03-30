
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../Utils/sidenavSlice';
import { useSearchParams } from 'react-router-dom';
import Comment from './Comment';
import Description from './Description'
import Rightvideo from './Rightvideo';
import { setVideoTag } from '../Utils/videoTagSlice';

const Watch = () => {
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get('v');
    const [videoInfo, setVideoInfo] = useState(null);
    

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(closeMenu())
    },[])

    useEffect(() => {
        const fetchVideoInfo = async () => {
            try {
                const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${import.meta.env.VITE_API_KEY}`);
                const data = await response.json();
                setVideoInfo(data.items[0]); // Assuming the response is an array and we want the first item
                const tags = data.items[0].snippet.tags; // Assuming tags are available in the response
                console.log("Tags: ", tags[0])
                dispatch(setVideoTag(tags[0]));
            } catch (error) {
                console.error('Error fetching video info:', error);
            }
        };

        if (videoId) {
            fetchVideoInfo();
        }
    }, [videoId,  dispatch]);
  return (
      <div className='m-3 flex '>
            <div>
                <iframe
                className="w-[60rem] h-[30rem] rounded-xl"
                src={`${"https://www.youtube.com/embed/" +videoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
            <Description video={videoInfo} />
            <Comment videoId={videoId} />
            </div>
            <Rightvideo />
        </div>
  )
}

export default Watch