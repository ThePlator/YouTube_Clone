import moment from 'moment/moment';
import React, { useState } from 'react';

const Description = ({ video }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    if (!video) {
        return <div>Loading...</div>; // Placeholder for loading state
    }

    const { snippet } = video;

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    // Function to convert newlines in the description to <br> elements
    const formatDescription = (description) => {
        return description.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <div className="max-w-[60rem] mx-auto my-4 ">
            <h2 className="text-xl font-bold mb-2">{snippet.title}</h2>
            <div className='bg-slate-700 rounded-lg shadow-md p-6'>
                <div className="flex items-center mb-4">
                <span className="text-white mr-2">Views: {snippet.views}</span>
                <span className="text-white mr-2">•</span>
                <span className="text-white mr-2">{moment(snippet.publishedAt).fromNow()}</span>
            </div>
            <div className={`${isCollapsed ? 'h-20 overflow-hidden' : ''}`}>
                <p className="text-white">
                    {formatDescription(snippet.description)}
                </p>
            </div>
            <button
                onClick={toggleCollapse}
                className="text-blue-500 hover:underline focus:outline-none"
            >
                {isCollapsed ? 'Show More' : 'Show Less'}
            </button>
            </div>
            
        </div>
    );
};

export default Description;
