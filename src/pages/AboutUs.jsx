import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobeIcon, UsersIcon, SparklesIcon } from 'lucide-react';

const TeamMember = ({ name, role, image, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="bg-white rounded-3xl shadow-xl overflow-hidden group border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      <div className="flex flex-col md:flex-row items-center p-6 sm:p-8 relative">
        <motion.div 
          className="w-40 h-40 sm:w-56 sm:h-56 mb-6 md:mb-0 md:mr-8 rounded-2xl overflow-hidden mx-auto md:mx-0 relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover grayscale"
          />
        </motion.div>
        <div className="text-center md:text-left w-full">
          <motion.h3 
            className="text-2xl sm:text-3xl font-bold text-black mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {name}
          </motion.h3>
          <motion.p 
            className="text-lg sm:text-xl font-medium text-gray-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {role}
          </motion.p>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div 
          className="absolute inset-0 z-10" 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </div>
    </motion.div>
  );
};

const Feature = ({ icon: Icon, title, description }) => (
  <motion.div 
    className="flex flex-col items-center p-6 text-center"
    whileHover={{ y: -5 }}
  >
    <div className="w-16 h-16 mb-4 rounded-full bg-black p-4 text-white">
      <Icon className="w-full h-full" />
    </div>
    <h3 className="text-xl font-bold mb-2 text-black">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Nihith Tallapalli",
      role: "Founder & Head of Growth",
      image: "https://via.placeholder.com/300",
      description: "A visionary entrepreneur with over 15 years of experience in education technology. Sarah's passion is bridging the gap between learning and real-world skills."
    },
    {
      name: "Mohammed Imaduddin",
      role: "Co-Founder & Tech Lead",
      image: "https://via.placeholder.com/300",
      description: "An expert in curriculum design with a background in corporate training. Michael ensures our learning paths are cutting-edge and industry-relevant."
    },
    {
      name: "Ajith Sai Chekka",
      role: "Co-Founder & Head of Outreach - Tech",
      image: "https://via.placeholder.com/300",
      description: "A community builder who believes in the power of networking. Elena manages our global network of mentors and ensures meaningful connections."
    },
    {
      name: "Lakshyaa Kansagara",
      role: "Head of Outreach - Design",
      image: "https://via.placeholder.com/300",
      description: "A senior software engineer who drives our platform's technological innovation. David ensures our users get the most seamless learning experience."
    }
  ];

  const features = [
    {
      icon: GlobeIcon,
      title: "Global Reach",
      description: "Connect with mentors and learners from around the world"
    },
    {
      icon: UsersIcon,
      title: "Community Driven",
      description: "Join a thriving community of passionate learners"
    },
    {
      icon: SparklesIcon,
      title: "Innovation First",
      description: "Experience cutting-edge learning methodologies"
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-center mb-6 text-black"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Who Are We?
        </motion.h1>
        
        <motion.p
          className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          We're a team of passionate individuals dedicated to transforming the future of education
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </motion.div>
        
        <motion.div 
          className="space-y-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {teamMembers.map((member, index) => (
            <TeamMember 
              key={index}
              {...member}
            />
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center bg-black text-white p-8 sm:p-12 rounded-3xl shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-6 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Our Mission
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            We believe in democratizing learning by connecting passionate learners with world-class mentors. Our platform is more than just a learning tool - it's a community dedicated to personal and professional growth.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUs;