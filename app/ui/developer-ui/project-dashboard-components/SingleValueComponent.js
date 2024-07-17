import React from 'react';

const SingleValueComponent = ({ value, layoutId }) => {
    return (
        <div className="flex items-center justify-center h-full" layoutId={layoutId}>
            <div className="text-3xl font-bold">{value}</div>
        </div>

    );
};

export default SingleValueComponent;
