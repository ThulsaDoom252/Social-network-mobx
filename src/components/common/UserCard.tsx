import React from 'react';

interface NavbarProps {
    url: string,
}

const UserCard: React.FC<NavbarProps> = ({url}) => {
    return (
        <div className="card" style={{maxWidth: '100px'}}>
            <img className="
            card-img-top
            max-w-full
            max-h-full

            " src={url} alt="Card image cap"/>
            <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card's content.</p>
            </div>
        </div>
    );
};

export default UserCard;