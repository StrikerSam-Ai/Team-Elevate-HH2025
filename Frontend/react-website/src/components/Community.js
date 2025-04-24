import React, { useEffect, useState } from 'react';

const Community = () => {
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/community/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch communities');
                }
                return response.json();
            })
            .then(data => {
                setCommunities(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading communities...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="community-page">
            <h1>Community</h1>
            <div className="community-list">
                {communities.map(community => (
                    <div key={community.id} className="community-card">
                        <h2>{community.name}</h2>
                        <p>{community.description}</p>
                        <button onClick={() => window.location.href = `/community/${community.id}`}>
                            View Details
                        </button>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .community-page {
                    padding: 20px;
                }
                
                .community-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 20px;
                    margin-top: 20px;
                }
                
                .community-card {
                    background: white;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .community-card h2 {
                    margin-top: 0;
                    color: #333;
                }
                
                .community-card button {
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 10px;
                }
                
                .community-card button:hover {
                    background: #0056b3;
                }
            `}</style>
        </div>
    );
};

export default Community;