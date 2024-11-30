import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { 
  Briefcase, 
  Map, 
  DollarSign, 
  Calendar, 
  Edit, 
  Trash2, 
  LogIn, 
  FolderX,
  LogOut 
} from 'lucide-react';
import { db, auth } from '../firebase';



const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const results = jobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(results);
  }, [searchTerm, jobs]);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, 'jobs'));
      const jobsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setJobs(jobsList);
      setFilteredJobs(jobsList);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // No Jobs Found Component
  const NoJobsFound = ({ isSearching }) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {isSearching ? <Search className="h-16 w-16 text-gray-400 mb-4" /> : <FolderX className="h-16 w-16 text-gray-400 mb-4" />}
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        {isSearching ? "No Jobs Found" : "No Jobs Available"}
      </h2>
      <p className="text-gray-500">
        {isSearching 
          ? "Try a different search term or browse all jobs." 
          : "Check back later for new job opportunities."
        }
      </p>
      {isSearching && (
        <button 
          onClick={() => setSearchTerm('')}
          className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          Reset Search
        </button>
      )}
    </div>
  );

  // Loading State Component
  const LoadingState = () => (
    <div className="flex justify-center items-center py-16">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-black"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      
      {/* Search Input */}
      <div className="mb-6">
        <input 
          type="text"
          placeholder="Search jobs by title, company, or location"
          className="w-full p-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Conditional Rendering */}
      {isLoading ? (
        <LoadingState />
      ) : filteredJobs.length === 0 ? (
        <NoJobsFound isSearching={searchTerm.length > 0} />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <div 
              key={job.id} 
              className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Existing job card content */}
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <div className="space-y-2 text-gray-600 mb-4">
                <p className="flex items-center">
                  <Briefcase className="mr-2 h-4 w-4" />
                  {job.company}
                </p>
                <p className="flex items-center">
                  <Map className="mr-2 h-4 w-4" />
                  {job.location}
                </p>
                <p className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  {job.salary}
                </p>
                <p className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Posted: {job.postDate}
                </p>
              </div>
              <a 
                href={job.applyLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 flex items-center justify-center"
              >
                <LogIn className="mr-2 h-4 w-4" /> Apply Now
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// The rest of the previous code remains unchanged

export default JobBoard;