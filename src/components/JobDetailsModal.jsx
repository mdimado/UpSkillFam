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
        .then(() => alert('Link copied to clipboard!'))
        .catch((error) => console.log('Error copying link:', error));
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-white"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg max-w-lg w-full mx-4">
          <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-4">This job posting may have been removed or is no longer available.</p>
          <button
            onClick={handleClose}
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
          >
            Back to Job Board
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleShareClick}
                className="text-gray-500 hover:text-black p-2"
                title="Share job"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-black p-2"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <p className="flex items-center text-gray-600">
              <Briefcase className="mr-2 h-5 w-5" />
              {job.company}
            </p>
            <p className="flex items-center text-gray-600">
              <MapPin className="mr-2 h-5 w-5" />
              {job.location}
            </p>
            <p className="flex items-center text-gray-600">
              <DollarSign className="mr-2 h-5 w-5" />
              {job.salary}
            </p>
            {job.jobType && (
              <p className="flex items-center text-gray-600">
                <BookOpenText className="mr-2 h-5 w-5" />
                {job.jobType}
              </p>
            )}
            {job.experienceLevel && (
              <p className="flex items-center text-gray-600">
                <ChartNoAxesColumn className="mr-2 h-5 w-5" />
                {job.experienceLevel}
              </p>
            )}
            <p className="flex items-center text-gray-600">
              <Calendar className="mr-2 h-5 w-5" />
              Posted: {job.postDate}
            </p>
          </div>

          {job.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Job Description</h3>
              <div className="prose max-w-none">
                {job.description}
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={() => handleApplyClick(job.applyLink)}
              className="flex-1 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 flex items-center justify-center"
            >
              <LogIn className="mr-2 h-4 w-4" /> Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;