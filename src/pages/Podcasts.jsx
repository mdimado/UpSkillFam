import React, { useState, useEffect } from 'react';
import { Mic, Headphones, Users, Mail, CheckCircle } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Podcasts = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'podcasts'));
        const podcastList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPodcasts(podcastList);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Career Podcasts
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Listen to inspiring stories and expert advice from tech industry leaders.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 py-12">
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">Expert Interviews</h3>
            <p className="text-gray-600 text-center">Weekly conversations with industry leaders</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">Community Stories</h3>
            <p className="text-gray-600 text-center">Real experiences from successful tech professionals</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headphones className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">Career Insights</h3>
            <p className="text-gray-600 text-center">Actionable advice for career growth</p>
          </div>
        </div>

        {/* Podcast Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          ) : podcasts.map((podcast) => (
            <div key={podcast.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
              <img 
                src={podcast.imageUrl || '/api/placeholder/400/200'} 
                alt={podcast.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{podcast.title}</h3>
                <p className="text-gray-600 text-sm mb-2">with {podcast.speakerName}</p>
                <p className="text-gray-700 mb-4 line-clamp-2">{podcast.description}</p>
                <a
                  href={podcast.podcastLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Listen Now
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe Form */}
        <div className="max-w-md mx-auto text-center">
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-gray-700 mb-4">
              Subscribe to get notified about new episodes.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 p-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </div>
            {isSubmitted && (
              <p className="text-green-600 flex items-center justify-center gap-1">
                <CheckCircle className="h-4 w-4" />
                You're subscribed!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Podcasts;