import React, { useState, useEffect } from 'react';
import { Search, FileText, Download, Calendar, User } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, getDownloadURL } from 'firebase/storage';

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const resourcesQuery = query(collection(db, 'resources'), orderBy('uploadDate', 'desc'));
      const querySnapshot = await getDocs(resourcesQuery);
      const resourcesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setResources(resourcesList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resources:', error);
      alert('Error fetching resources. Please try again.');
      setLoading(false);
    }
  };

  const handleDownload = async (resource) => {
    try {
      const fileRef = ref(storage, resource.filePath);
      const url = await getDownloadURL(fileRef);
      
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', resource.fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error downloading file. Please try again.');
    }
  };

  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === '' || resource.fileType === filterType)
  );

  const getFileIcon = (fileType) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return '📄';
      case 'ppt':
      case 'pptx':
        return '📊';
      case 'doc':
      case 'docx':
        return '📝';
      default:
        return '📁';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Learning Resources</h1>
      
      <div className="flex flex-col sm:flex-row mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full p-2 pl-10 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <select
          className="p-2 border rounded-md"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="pdf">PDF</option>
          <option value="ppt">PowerPoint</option>
          <option value="doc">Word Document</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map(resource => (
          <div key={resource.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{getFileIcon(resource.fileType)}</span>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {resource.fileType.toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <User size={16} className="mr-1" />
                <span className="mr-4">{resource.uploadedBy}</span>
                <Calendar size={16} className="mr-1" />
                <span>{new Date(resource.uploadDate).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-500">{resource.fileSize}</span>
                <button
                  onClick={() => handleDownload(resource)}
                  className="flex items-center bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800 transition duration-300"
                >
                  <Download size={16} className="mr-2" />
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;