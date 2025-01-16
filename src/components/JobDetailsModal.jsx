import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { 
  X, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Calendar, 
  LogIn,
  BookOpenText,
  ChartNoAxesColumn,
  Share2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const JobDetailsModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobDoc = await getDoc(doc(db, 'jobs', id));
        if (jobDoc.exists()) {
          setJob({ id: jobDoc.id, ...jobDoc.data() });
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleClose = () => {
    navigate('/');
  };

  const handleApplyClick = (applyLink) => {
    if (!auth.currentUser) {
      toast.error('Please Register or Login to continue', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#FF6B6B',
          color: 'white',
        }
      });
      navigate('/signup', { state: { returnUrl: applyLink } });
    } else {
      window.open(applyLink, '_blank');
    }
  };

  const handleShareClick = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: job?.title || 'Job Opportunity',
        url: shareUrl
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(shareUrl)
        .then(() => toast.success('Link copied to clipboard!'))
        .catch((error) => console.log('Error copying link:', error));
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 rounded-lg w-full max-w-sm mx-auto">
          <h2 className="text-xl font-bold mb-3">Job Not Found</h2>
          <p className="text-gray-600 mb-4 text-sm">This job posting may have been removed or is no longer available.</p>
          <button
            onClick={handleClose}
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 text-sm"
          >
            Back to Job Board
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-0 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full sm:rounded-lg max-w-2xl sm:my-8 min-h-screen sm:min-h-0">
        {/* Sticky header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 sm:px-6 flex justify-between items-center z-10">
          <h2 className="text-lg sm:text-xl font-bold truncate flex-1 mr-2">{job.title}</h2>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={handleShareClick}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Share job"
            >
              <Share2 className="h-5 w-5" />
            </button>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="p-4 sm:p-6">
          <div className="space-y-3 mb-6">
            <p className="flex items-center text-gray-600 text-sm sm:text-base">
              <Briefcase className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              {job.company}
            </p>
            <p className="flex items-center text-gray-600 text-sm sm:text-base">
              <MapPin className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              {job.location}
            </p>
            <p className="flex items-center text-gray-600 text-sm sm:text-base">
              <DollarSign className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              {job.salary}
            </p>
            {job.jobType && (
              <p className="flex items-center text-gray-600 text-sm sm:text-base">
                <BookOpenText className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                {job.jobType}
              </p>
            )}
            {job.experienceLevel && (
              <p className="flex items-center text-gray-600 text-sm sm:text-base">
                <ChartNoAxesColumn className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                {job.experienceLevel}
              </p>
            )}
            <p className="flex items-center text-gray-600 text-sm sm:text-base">
              <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              Posted: {job.postDate}
            </p>
          </div>

          {job.description && (
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-semibold mb-2">Job Description</h3>
              <div className="prose max-w-none text-sm sm:text-base">
                {job.description}
              </div>
            </div>
          )}
        </div>

        {/* Sticky footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 sm:p-6">
          <button
            onClick={() => handleApplyClick(job.applyLink)}
            className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 flex items-center justify-center text-sm sm:text-base"
          >
            <LogIn className="mr-2 h-4 w-4" /> Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;