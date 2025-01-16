import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Map, 
  DollarSign, 
  Calendar, 
  Filter, 
  X, 
  Search,
  LogIn, 
  FolderX,
  ChartNoAxesColumn,
  BookOpenText,
  MapPin,
  Share2
} from 'lucide-react';
import { db, auth } from '../firebase';
import { Outlet } from 'react-router-dom';

// Helper function to check salary range (moved outside the component)
const checkSalaryRange = (salary, range) => {
  if (!salary) return false;
  const numericSalary = parseFloat(salary.replace(/[^0-9.-]+/g,""));
  switch(range) {
    case '0-50000': return numericSalary <= 50000;
    case '50000-100000': return numericSalary > 50000 && numericSalary <= 100000;
    case '100000-150000': return numericSalary > 100000 && numericSalary <= 150000;
    case '150000+': return numericSalary > 150000;
    default: return true;
  }
};

const JobBoard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // New filter states
  const [locationFilter, setLocationFilter] = useState('');
  const [salaryRangeFilter, setSalaryRangeFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [experienceLevelFilter, setExperienceLevelFilter] = useState('');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  // Unique filter options (unchanged)
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [uniqueJobTypes, setUniqueJobTypes] = useState([]);
  const [uniqueExperienceLevels, setUniqueExperienceLevels] = useState([]);

  // Handle job application click
  const handleApplyClick = (applyLink) => {
    if (!auth.currentUser) {
      navigate('/login', { state: { returnUrl: applyLink } });
    } else {
      window.open(applyLink, '_blank');
    }
  };

  const handleShareClick = (jobId) => {
    const shareUrl = `${window.location.origin}/jobs/${jobId}`;
    if (navigator.share) {
      navigator.share({
        title: 'Job Opportunity',
        url: shareUrl
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(shareUrl)
        .then(() => alert('Link copied to clipboard!'))
        .catch((error) => console.log('Error copying link:', error));
    }
  };

  // Loading State Component
  const LoadingState = () => (
    <div className="flex justify-center items-center py-16">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-black"></div>
    </div>
  );

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
          onClick={resetFilters}
          className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          Reset Search
        </button>
      )}
    </div>
  );

  useEffect(() => {
    fetchJobs();
  }, []);

  // Comprehensive filtering logic
  const applyFilters = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = 
        searchTerm === '' || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation = 
        locationFilter === '' || 
        job.location === locationFilter;

      const matchesSalaryRange = 
        salaryRangeFilter === '' || 
        checkSalaryRange(job.salary, salaryRangeFilter);

      const matchesJobType = 
        jobTypeFilter === '' || 
        job.jobType === jobTypeFilter;

      const matchesExperienceLevel = 
        experienceLevelFilter === '' || 
        job.experienceLevel === experienceLevelFilter;

      return matchesSearch && 
             matchesLocation && 
             matchesSalaryRange && 
             matchesJobType && 
             matchesExperienceLevel;
    });
  }, [
    jobs, 
    searchTerm, 
    locationFilter, 
    salaryRangeFilter, 
    jobTypeFilter, 
    experienceLevelFilter
  ]);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, 'jobs'));
      const jobsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setJobs(jobsList);

      // Extract unique filter options
      setUniqueLocations([...new Set(jobsList.map(job => job.location).filter(Boolean))]);
      setUniqueJobTypes([...new Set(jobsList.map(job => job.jobType || '').filter(Boolean))]);
      setUniqueExperienceLevels([...new Set(jobsList.map(job => job.experienceLevel || '').filter(Boolean))]);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setSalaryRangeFilter('');
    setJobTypeFilter('');
    setExperienceLevelFilter('');
    setIsFilterDrawerOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      
      {/* Search and Filter Section */}
      <div className="mb-6 flex items-center space-x-2">
        <div className="flex-grow">
          <input 
            type="text"
            placeholder="Search jobs by title, company, or location"
            className="w-full p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
          className="bg-black text-white p-2 rounded-md hover:bg-gray-800 flex items-center"
        >
          <Filter className="mr-2 h-4 w-4" /> 
          Filters
        </button>
      </div>

      {/* Advanced Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select 
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">All Locations</option>
                {uniqueLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Salary Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
              <select 
                value={salaryRangeFilter}
                onChange={(e) => setSalaryRangeFilter(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">All Salaries</option>
                <option value="0-50000">$0 - $50,000</option>
                <option value="50000-100000">$50,000 - $100,000</option>
                <option value="100000-150000">$100,000 - $150,000</option>
                <option value="150000+">$150,000+</option>
              </select>
            </div>

            {/* Job Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
              <select 
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">All Job Types</option>
                {uniqueJobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Experience Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
              <select 
                value={experienceLevelFilter}
                onChange={(e) => setExperienceLevelFilter(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">All Levels</option>
                {uniqueExperienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="mt-4 flex justify-end space-x-2">
            <button 
              onClick={resetFilters}
              className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 flex items-center"
            >
              <X className="mr-2 h-4 w-4" /> Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Job Listing Rendering Logic */}
      {isLoading ? (
        <LoadingState />
      ) : applyFilters.length === 0 ? (
        <NoJobsFound isSearching={
          searchTerm || 
          locationFilter || 
          salaryRangeFilter || 
          jobTypeFilter || 
          experienceLevelFilter
        } />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applyFilters.map(job => (
            <div 
              key={job.id} 
              className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <button
                  onClick={() => handleShareClick(job.id)}
                  className="text-gray-500 hover:text-black"
                  title="Share job"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-2 text-gray-600 mb-4">
                <p className="flex items-center">
                  <Briefcase className="mr-2 h-4 w-4" />
                  {job.company}
                </p>
                <p className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  {job.location}
                </p>
                <p className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  {job.salary}
                </p>
                {job.jobType && (
                  <p className="flex items-center">
                    <BookOpenText className="mr-2 h-4 w-4" />
                    {job.jobType}
                  </p>
                )}
                {job.experienceLevel && (
                  <p className="flex items-center">
                    <ChartNoAxesColumn className="mr-2 h-4 w-4" />
                    {job.experienceLevel}
                  </p>
                )}
                <p className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Posted: {job.postDate}
                </p>
              </div>
              <button 
                onClick={() => handleApplyClick(job.applyLink)}
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 flex items-center justify-center"
              >
                <LogIn className="mr-2 h-4 w-4" /> Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default JobBoard;