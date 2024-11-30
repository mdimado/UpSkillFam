import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow px-4 md:px-8 py-12 max-w-4xl mx-auto w-full">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Terms of Service
          </h1>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Eligibility
              </h2>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>You must be at least 13 years old to use the platform.</li>
                <li>If under 18, you confirm parental or guardian consent to these Terms.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Account Responsibilities
              </h2>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                <li>Notify us immediately if you suspect unauthorized access to your account.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Use of Platform
              </h2>
              <p>You agree to:</p>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>Use the platform for lawful purposes only.</li>
                <li>Avoid disrupting or attempting to compromise the platform's functionality.</li>
                <li>Respect intellectual property rights and avoid unauthorized use of content.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Content Ownership
              </h2>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  Content created and shared by UpskillFam (e.g., blogs, podcasts) is our intellectual property. 
                  You may not copy, distribute, or modify it without permission.
                </li>
                <li>
                  Content you upload (e.g., resumes) remains yours, but you grant us a license to analyze and 
                  process it for platform features.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Job Board Disclaimer
              </h2>
              <p>
                UpskillFam is not responsible for the accuracy, legitimacy, or availability of job postings. 
                Applying to jobs is at your discretion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Liability Limitations
              </h2>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>UpskillFam is provided "as is" without warranties of any kind.</li>
                <li>
                  We are not liable for any damages arising from your use of the platform, 
                  including loss of data or inability to access resources.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Governing Law
              </h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of India. 
                Any disputes arising from or in connection with these Terms shall be subject to 
                the exclusive jurisdiction of the courts in Hyderabad, Telangana.
              </p>
            </section>

            <section className="mt-8">
              <p className="text-gray-600">
                <strong>Last Updated:</strong> 30 November 2024
              </p>
              <p className="text-gray-600 mt-4">
                For any questions or concerns about these Terms, please contact us at: 
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

export default TermsOfService;