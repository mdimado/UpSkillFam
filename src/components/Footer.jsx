import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const NavLink = ({ href, children }) => (
    <a
      href={href}
      className="text-gray-600 hover:text-gray-900 transition-colors"
    >
      {children}
    </a>
  );

  return (
    <footer className="bg-white border-t border-gray-200 px-4 md:px-8 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <img src="/logo.png" alt="UpskillFam Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold text-gray-900">UpskillFam</span>
          </div>
          <p className="text-gray-600 mb-4">
            Empowering students and professionals with world-class learning resources and mentorship.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-400 transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-800 transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
          <div className="space-y-2 flex flex-col">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/blogs">Blogs</NavLink>
            <NavLink href="/communityPage">Community</NavLink>
            <NavLink href="/podcasts">Podcasts</NavLink>
            <NavLink href="/job-board">Job Board</NavLink>
            <NavLink href="/resume-evaluator">Resume Evaluator</NavLink>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
          <div className="space-y-2 flex flex-col">
            <NavLink href="/roadmaps">Career Roadmaps</NavLink>
            <NavLink href="/workshops">Workshops</NavLink>
            <NavLink href="/mentorship">Mentorship</NavLink>
            <NavLink href="/webinars">Webinars</NavLink>
            <NavLink href="/learning-paths">Learning Paths</NavLink>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Contact Us</h4>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-center space-x-2">
              <Mail size={20} className="text-gray-700" />
              <span>contact@upskillfam.co.in</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <MapPin size={20} className="text-gray-700" />
              <span>Hyderabad, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright and Legal */}
      <div className="border-t border-gray-200 mt-8 pt-6 text-center">
        <p className="text-gray-600">
          © {currentYear} UpskillFam. All Rights Reserved. 
          <span className="mx-2">|</span>
          <NavLink href="/privacy-policy">Privacy Policy</NavLink>
          <span className="mx-2">|</span>
          <NavLink href="/terms-of-service">Terms of Service</NavLink>
        </p>
      </div>
    </footer>
  );
};

export default Footer;