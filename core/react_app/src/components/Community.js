import React, { useEffect, useState } from 'react';

const Community = () => {
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        // Fetch communities from backend
        fetch('/community/')
            .then(response => response.json())
            .then(data => setCommunities(data))
            .catch(error => console.error('Error fetching communities:', error));
    }, []);

    return (
        <div className="community-page">
            <h1>Community Page</h1>
            <div className="community-list">
                {communities.map(community => (
                    <div key={community.id} className="community-card">
                        <h2>{community.name}</h2>
                        <p>{community.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Community;