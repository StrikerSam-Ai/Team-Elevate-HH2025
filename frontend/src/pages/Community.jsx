import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

// Static fallback data if API fails
const defaultCommunities = [
  {
    id: 1,
    name: "Wisdom Keepers",
    description: "Share life advice and lessons learned",
    members: 142,
    groups: 5,
    icon: "🧠",
    color: "bg-purple-100",
    category: "WISDOM"
  },
  {
    id: 2,
    name: "Storytime Circle", 
    description: "Tell and listen to nostalgic stories",
    members: 208,
    groups: 8,
    icon: "📖",
    color: "bg-blue-100",
    category: "STORY"
  },
  {
    id: 3,
    name: "Harmony Haven",
    description: "Music, poetry and creative expression",
    members: 97,
    groups: 3, 
    icon: "🎵",
    color: "bg-green-100",
    category: "MUSIC"
  },
  {
    id: 4,
    name: "Garden Friends",
    description: "Gardening tips and nature lovers",
    members: 176,
    groups: 6,
    icon: "🌱",
    color: "bg-yellow-100",
    category: "GARDEN"
  },
  {
    id: 5, 
    name: "Memory Lane",
    description: "Historical discussions and reminiscing",
    members: 231,
    groups: 9,
    icon: "🕰️",
    color: "bg-red-100",
    category: "MEMORY"
  },
  {
    id: 6,
    name: "Spiritual Comfort",
    description: "Faith-based support and reflection",
    members: 118,
    groups: 4,
    icon: "🙏",
    color: "bg-indigo-100",
    category: "SPIRITUAL"
  }
];

const quotes = [
  "The afternoon knows what the morning never suspected. - Danish Proverb",
  "Growing old is mandatory, growing up is optional. - Walt Disney",
  "Wisdom comes with winters. - Oscar Wilde",
  "Age is an issue of mind over matter. If you don't mind, it doesn't matter. - Mark Twain"
];

export default function CommunitiesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuote] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get('/api/communities/');
        setCommunities(response.data);
      } catch (error) {
        console.error("Using fallback data", error);
        setCommunities(defaultCommunities);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  const handleJoinCommunity = async (communityId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(`/api/communities/${communityId}/join/`);
      setCommunities(communities.map(c => 
        c.id === communityId 
          ? { ...c, members: c.members + 1, isMember: true } 
          : c
      ));
    } catch (error) {
      console.error("Join failed", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header with Quote */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Our Communities
        </h1>
        <div className="bg-white p-4 rounded-lg shadow-sm max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl italic text-center text-gray-700">
            "{currentQuote}"
          </p>
        </div>
      </header>

      {/* Community Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {communities.map((community) => (
          <div 
            key={community.id}
            className={`${community.color} p-6 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.02]`}
          >
            <div className="flex items-start gap-4 h-full">
              <span className="text-4xl mt-1">{community.icon}</span>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{community.name}</h2>
                <p className="text-gray-700 mb-4">{community.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-white px-3 py-1 rounded-full text-sm">
                    👥 {community.members} members
                  </span>
                  <span className="bg-white px-3 py-1 rounded-full text-sm">
                    🏘️ {community.groups} groups
                  </span>
                </div>

                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => navigate(`/communities/${community.id}`)}
                    className="px-4 py-2 bg-white rounded-lg font-medium"
                  >
                    Explore
                  </button>
                  <button
                    onClick={() => handleJoinCommunity(community.id)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      community.isMember 
                        ? 'bg-gray-200 text-gray-700' 
                        : 'bg-blue-600 text-white'
                    }`}
                    disabled={community.isMember}
                  >
                    {community.isMember ? 'Joined' : 'Join'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <section className="mt-12 bg-white p-6 rounded-xl shadow max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Community Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg hover:bg-gray-50">
            <div className="text-3xl mb-2">🎙️</div>
            <h3 className="text-xl font-semibold mb-1">Voice Stories</h3>
            <p className="text-gray-600">Record memories with one tap</p>
          </div>
          <div className="p-4 border rounded-lg hover:bg-gray-50">
            <div className="text-3xl mb-2">🤖</div>
            <h3 className="text-xl font-semibold mb-1">AI Companions</h3>
            <p className="text-gray-600">Always-available conversation</p>
          </div>
          <div className="p-4 border rounded-lg hover:bg-gray-50">
            <div className="text-3xl mb-2">📅</div>
            <h3 className="text-xl font-semibold mb-1">Event Reminders</h3>
            <p className="text-gray-600">Never miss a gathering</p>
          </div>
        </div>
      </section>
    </div>
  );
}