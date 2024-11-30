import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow px-4 md:px-8 py-12 max-w-4xl mx-auto w-full">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Privacy Policy
          </h1>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Information We Collect
              </h2>
              <p>
                At UpskillFam, we value your privacy and are committed to protecting your personal information. We may collect the following types of information:
              </p>
              <ul className="list-disc list-inside pl-4 mt-2 space-y-2">
                <li>
                  <strong>Personal Information:</strong> Such as your name, email address, and other details you provide during account registration.
                </li>
                <li>
                  <strong>Resume Data:</strong> Information uploaded through our Resume Evaluator feature for analysis and feedback.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about your interactions with the platform, such as pages visited, content accessed, and job applications submitted.
                </li>
                <li>
                  <strong>Technical Data:</strong> IP address, browser type, operating system, and device information.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <p>
                We use your information for the following purposes:
              </p>
              <ul className="list-disc list-inside pl-4 mt-2 space-y-2">
                <li>To provide access to our features, including podcasts, blogs, videos, and job board.</li>
                <li>To analyze and improve resumes using the Resume Evaluator feature.</li>
                <li>To maintain and improve the platform's functionality and user experience.</li>
                <li>To send updates, newsletters, or promotional content (you can opt out anytime).</li>
                <li>To monitor and prevent fraudulent activities or misuse of the platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Sharing Your Information
              </h2>
              <p>
                We do not sell or rent your personal data. However, we may share your data:
              </p>
              <ul className="list-disc list-inside pl-4 mt-2 space-y-2">
                <li>With third-party service providers for analytics, hosting, and platform maintenance.</li>
                <li>To comply with legal obligations or protect the rights and safety of UpskillFam and its users.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside pl-4 mt-2 space-y-2">
                <li>Access, update, or delete your account and personal information.</li>
                <li>Opt-out of marketing communications.</li>
                <li>Request a copy of your personal data or ask us to erase it, subject to applicable laws.</li>
              </ul>
            </section>

            <section className="mt-8">
              <p className="text-gray-600">
                <strong>Last Updated:</strong> 30 November 2024
              </p>
              <p className="text-gray-600 mt-4">
                For any questions about this Privacy Policy, please contact us at: 
                <a 
                  href="mailto:contact@upskillfam.co.in" 
                  className="text-blue-600 hover:underline ml-2"
                >
                  contact@upskillfam.co.in
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default PrivacyPolicy;