import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, User, LogOut } from 'lucide-react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './index.css';

const NavHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const UserSection = () => {
    if (!user) {
      return (
        <NavLink href='/signup'>
          <button className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors">
            Register
          </button>
        </NavLink>
      );
    }

    return (
      <div className="relative">
        <div onClick={() => setShowDropdown(!showDropdown)} className="cursor-pointer">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="User profile"
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <div className="p-2 rounded-full bg-gray-100">
              <User className="h-5 w-5 text-gray-700" />
            </div>
          )}
        </div>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu">
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                {user.email}
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="UpskillFam Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold text-gray-900">
                UpskillFam
              </span>
            </a>
          </div>

          <nav className="nav-list hidden md:flex items-center space-x-8">
            <NavLink href="/about" className="nav-link">About</NavLink>
            <NavLink href="/blogs" className="nav-link">Blogs</NavLink>
            <NavLink href="/resources" className="nav-link">Resources</NavLink>
            <NavLink href="/podcasts" className="nav-link">Podcasts</NavLink>
            <NavLink href="/job-board" className="nav-link">Job Board</NavLink>
            <NavLink href="/resume-evaluator" className="nav-link">Resume Evaluator</NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>

            <UserSection />

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex md:hidden items-center justify-center rounded-lg p-2 text-black transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="divide-y divide-gray-200">
              <nav className="flex flex-col space-y-1 py-3">
                <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>
                  About
                </MobileNavLink>
                <MobileNavLink href="/blogs" onClick={() => setIsMenuOpen(false)}>
                  Blogs
                </MobileNavLink>
                <MobileNavLink href="/podcasts" onClick={() => setIsMenuOpen(false)}>
                  Podcasts
                </MobileNavLink>
                <MobileNavLink href="/jobs" onClick={() => setIsMenuOpen(false)}>
                  Job Board
                </MobileNavLink>
                <MobileNavLink href="/resume-evaluator" onClick={() => setIsMenuOpen(false)}>
                  Resume Evaluator
                </MobileNavLink>
              </nav>
              <div className="py-4">
                {!user && (
                  <NavLink href='/signup'>
                    <button className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors">
                      Register
                    </button>
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="relative font-medium text-black transition-colors before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-gray-900 before:transition-transform hover:text-gray-900 hover:before:scale-x-100 dark:text-black dark:before:bg-white"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, onClick, children }) => (
  <a
    href={href}
    onClick={onClick}
    className="flex w-full items-center rounded-lg px-4 py-2 text-gray-700"
  >
    {children}
  </a>
);

export default NavHeader;