import React from 'react';
import Skeleton from 'react-loading-skeleton';

const ShimmerVideoCard = () => (
  <div className="flex flex-col gap-1 w-[320px] h-[260px] rounded-xl text-white mt-6">
    <div>
      <Skeleton height={180} style={{ borderRadius: '8px' }} />
    </div>
    <ul className="flex flex-col p-2 w-full">
      <li className="font-semibold text-md truncate overflow-hidden">
        <Skeleton width={200} />
      </li>
      <li className="text-sm text-gray-500 truncate">
        <Skeleton width={150} />
      </li>
      <ul className="flex gap-3 text-xs">
        <li><Skeleton width={60} /></li>
        <li><Skeleton width={80} /></li>
      </ul>
    </ul>
  </div>
);

export default ShimmerVideoCard;
