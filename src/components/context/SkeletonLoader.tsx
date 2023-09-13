import React, {ReactNode} from 'react';
import ContentLoader from "react-content-loader";


interface SkeletonLoader {
    speed?: number,
    width?: string,
    height?: number,
    viewBox?: string,
    bgColor?: string,
    foreGroundColor?: string,
    children: ReactNode,
}

const SkeletonLoader: React.FC<SkeletonLoader> = (props) => {
    return (
        <ContentLoader
            speed={props.speed || 1}
            width={props.width || '400'}
            height={props.height || '160'}
            viewBox={props.viewBox || '0 0 400 160'}
            backgroundColor={props.bgColor || 'lightgray'}
            foregroundColor={props.foreGroundColor || 'gray'}
        >{props.children}</ContentLoader>
    );
};

export default SkeletonLoader;