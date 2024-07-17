import React from 'react';

const TextComponent = ({ value, layoutId }) => {
    return (
        <div className="flex items-center justify-center h-full" layoutId={layoutId}>
            <div style={{padding:5}}>{value}</div>
        </div>

    );
};

export default TextComponent;
