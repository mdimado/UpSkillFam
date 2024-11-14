import { Component } from 'react';
import './index.css'; 
import InfiniteCarousel from '../InfiniteCarousel';
import FAQSection from '../FaqSection';

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="relative font-medium text-black transition-colors before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-900 before:transition-transform hover:text-gray-900 hover:before:scale-x-100 dark:text-black dark:before:bg-white"
  >
    {children}
  </a>
);


class Home extends Component {
  state = {
    isDarkMode: false,
    activeIndex: null,
  };

  toggleDarkMode = () => {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode,
    }));
  };

  toggleFAQ = (index) => {
    this.setState((prevState) => ({
      activeIndex: prevState.activeIndex === index ? null : index,
    }));
  };


  
  

  render() {

    const carouselItems = [
      { src: "/hlogo.png", alt: "Company 1" },
      { src: "/mlogo.jpg", alt: "Company 2" },
      { src: "/nlogo.png", alt: "Company 3" },
      { src: "/alogo.jpeg", alt: "Company 4" },
      { src: "/ilogo.png", alt: "Company 5" },
      { src: "/ologo.png", alt: "Company 6" },
      { src: "/iglogo.jpg", alt: "Company 7" },
    ];


    const { isDarkMode, activeIndex } = this.state;
   

    return (
      <div className="home-container">
        <video className="bg-video" src="bgvid.mp4" loop muted autoPlay></video>
        <div className="hero-section">
          <div>
            <div className="text-section">
              <div className='cover-container'>
                <h1 className='main-heading'>
                  Find
                  <div className='podcast-container'>
                    <video src="/podcastvid.mp4" loop muted autoPlay></video>
                  </div>
                  seminars<br />
                  <div className='line2'>
                    trainings
                    <span className='ampersand-container'>
                      <div className='ampersand'>&</div>
                      <div className='bag-icon'><i className="fas fa-shopping-bag"></i></div>
                    </span>
                    <div>
                      trainers
                      <div className='trainer-container'>
                        <video src="/trainingvid.mp4" loop muted autoPlay></video>
                      </div>
                    </div>
                  </div>
                </h1>
              </div>
              <p className="text-lg md:text-xl lg:text-2xl">
                Everything you need to succeed in any domain is all right here with our world class mentors.
              </p>
             <NavLink href='/signup'> <button className="get-started-btn">Get Started</button></NavLink>
              <span className="request-demo">Who are we?</span>
            </div>
          </div>
        </div>

        <div className="w-full mt-16">
          <p className="mentor-text text-center text-xl font-semibold mb-8">
            OUR COMMUNITY MENTORS COME FROM
          </p>
          <InfiniteCarousel items={carouselItems} />
        </div>


        <hr className="my-16 border-gray-200" />

        <div className='overview-container px-4 md:px-8 max-w-7xl mx-auto'>
          <h1 className='overview-heading text-3xl md:text-4xl font-bold text-center mb-12'>
            Things you can do on UpskillFam👇
          </h1>
          
          <div className='space-y-16'>
            <div className='feature-box1 flex flex-col md:flex-row items-center gap-8'>
              <div className='feature-box-layout flex-1'>  
                <p className='overview-h text-xl md:text-2xl font-semibold mb-4'>
                  Learn by doing and getting insights from industry leaders.
                </p>
                <p className='overview-para mb-2'>
                  Talk about CS, Electrical, Design, Biotech, Chemical, and various other streams.
                </p>
                <p className='overview-para'>
                  Take part in podcasts, webinars, workshops, live events and much more.
                </p>
              </div>
              <img src="/fbox1.jpg" className='feature-box-img w-full md:w-1/2 rounded-lg' alt="feature" />
            </div>

            <div className='feature-box2 flex flex-col md:flex-row-reverse items-center gap-8'>
              <div className='feature-box-layout flex-1'>  
                <p className='overview-h text-xl md:text-2xl font-semibold mb-4'>
                  Network with like-minded individuals across the country.
                </p>
                <p className='overview-para mb-2'>
                  Big things happen when people come together. It's magic!
                </p>
                <p className='overview-para'>
                  Get in touch with a diverse community of creative minds to network, bounce off ideas, and gain amazing insights in your work.
                </p>
              </div>
              <img src="/fbox2.jpg" className='feature-box-img w-full md:w-1/2 rounded-lg' alt="feature" />
            </div>

            <div className='feature-box1 flex flex-col md:flex-row items-center gap-8'>
              <div className='feature-box-layout flex-1'>  
                <p className='overview-h text-xl md:text-2xl font-semibold mb-4'>
                  Boost your Resume with expert tips and make it super ATS-compliant.
                </p>
                <p className='overview-para mb-2'>
                  Get personalized tips to make your Resume appealing to recruiters.
                </p>
                <p className='overview-para'>
                  Learn from recruiters what they look for in a Resume and plan accordingly.
                </p>
              </div>
              <img src="/fbox3.jpg" className='feature-box-img w-full md:w-1/2 rounded-lg' alt="feature" />
            </div>
          </div>
        </div>

        <FAQSection />
      </div>
    );
  }
}

export default Home;