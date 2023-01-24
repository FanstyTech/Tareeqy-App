import React from "react";

import "./show-more.scss";

interface ShowMoreIconProps {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const ShowMoreIcon: React.FC<ShowMoreIconProps> = ({ onClick }) => (
    <div className="show-more-container">
        <div className="chevron"></div>
        <div className="chevron"></div>
        <div className="chevron"></div>
    </div>
);

export default ShowMoreIcon;
