import { SkeletonComponent, SkeletonContent, SkeletonImage, SkeletonText } from '@/app/home.styled';
import React from 'react';


const Skeleton: React.FC = () => (
  <SkeletonComponent>
    <SkeletonImage />
    <SkeletonContent>x
      <SkeletonText className="h-6 w-3/4 mb-4" />
      <SkeletonText className="h-8 w-1/3 mb-4" />
      <SkeletonText className="h-4 w-1/2 mb-6" />
      <div className="flex gap-3">
        <SkeletonText className="h-10 w-1/2" />
        <SkeletonText className="h-10 w-1/2" />
      </div>
    </SkeletonContent>
  </SkeletonComponent>
);

export default Skeleton;