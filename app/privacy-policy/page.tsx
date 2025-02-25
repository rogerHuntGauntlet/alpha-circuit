import React from 'react';
import Link from 'next/link';

const PrivacyPolicyPage = () => {
  const lastUpdated = 'June 15, 2023';

  return (
    <div className="bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B] min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">Policy</span>
          </h1>
          <p className="mt-4 text-purple-100">
            Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="bg-[#1F0940] rounded-xl p-8 border border-purple-500/20">
          <div className="prose prose-lg prose-invert max-w-none">
            <p>
              At Circuit API, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our API service, website, and related services (collectively, the "Service").
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using our Service, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the Service.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We collect information in several ways when you use our Service:
            </p>
            <h3>1. Information You Provide to Us</h3>
            <ul>
              <li><strong>Account Information:</strong> When you register for an account, we collect your name, email address, company name, and other contact information.</li>
              <li><strong>Billing Information:</strong> If you subscribe to a paid plan, we collect payment information, billing address, and other details necessary for payment processing.</li>
              <li><strong>Communications:</strong> When you communicate with us via email, contact forms, or other channels, we collect the information you provide in those communications.</li>
              <li><strong>Support Requests:</strong> Information you provide when seeking technical support or customer service.</li>
            </ul>

            <h3>2. Information We Collect Automatically</h3>
            <ul>
              <li><strong>API Usage Data:</strong> We collect data about how you use our API, including request patterns, volumes, and performance metrics.</li>
              <li><strong>Log Data:</strong> Our servers automatically record information that your browser or device sends whenever you access our Service, such as your IP address, browser type, operating system, referring/exit pages, and timestamps.</li>
              <li><strong>Device Information:</strong> We collect information about the device you use to access our Service, including device type, operating system, and unique device identifiers.</li>
              <li><strong>Cookies and Similar Technologies:</strong> We use cookies, web beacons, and similar technologies to collect information about how you interact with our Service and to improve your experience.</li>
            </ul>

            <h3>3. Information from Third Parties</h3>
            <p>
              We may receive information about you from third parties, such as business partners, data providers, and analytics providers. This information helps us improve our Service and provide a better user experience.
            </p>

            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect for various purposes, including:
            </p>
            <ul>
              <li>Providing, maintaining, and improving our Service</li>
              <li>Processing transactions and sending related information</li>
              <li>Responding to your comments, questions, and requests</li>
              <li>Sending technical notices, updates, security alerts, and administrative messages</li>
              <li>Monitoring and analyzing trends, usage, and activities in connection with our Service</li>
              <li>Detecting, preventing, and addressing technical issues, fraud, and other illegal activities</li>
              <li>Personalizing your experience and providing content and features that match your profile and interests</li>
              <li>Communicating with you about products, services, offers, promotions, and events</li>
            </ul>

            <h2>How We Share Your Information</h2>
            <p>
              We may share your information in the following circumstances:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> We share information with third-party vendors, consultants, and other service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting, and customer service.</li>
              <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, financing, or sale of assets, your information may be transferred as part of that transaction.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</li>
              <li><strong>Protection of Rights:</strong> We may disclose information to protect the safety, rights, or property of Circuit API, our users, or others.</li>
              <li><strong>With Your Consent:</strong> We may share information with third parties when you have given us your consent to do so.</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>

            <h2>Your Rights and Choices</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>The right to access personal information we hold about you</li>
              <li>The right to request correction of inaccurate personal information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to object to processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
            </p>

            <h2>International Data Transfers</h2>
            <p>
              Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction. If you are located outside the United States and choose to provide information to us, please note that we transfer the information to the United States and process it there.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our Service is not directed to children under the age of 16, and we do not knowingly collect personal information from children under 16. If we learn that we have collected personal information from a child under 16, we will take steps to delete such information as quickly as possible.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Email: <a href="mailto:privacy@circuitapi.com" className="text-[#FF6B6B] hover:text-[#FFE66D]">privacy@circuitapi.com</a><br />
              Address: 123 Tech Street, San Francisco, CA 94107, USA
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-purple-100 mb-4">
            For more information about our data practices, please see our:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/terms-of-service"
              className="inline-flex items-center px-4 py-2 border border-purple-500/50 rounded-md text-sm font-medium text-white hover:bg-[#2D0B5A] transition-all duration-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookie-policy"
              className="inline-flex items-center px-4 py-2 border border-purple-500/50 rounded-md text-sm font-medium text-white hover:bg-[#2D0B5A] transition-all duration-300"
            >
              Cookie Policy
            </Link>
            <Link
              href="/sla"
              className="inline-flex items-center px-4 py-2 border border-purple-500/50 rounded-md text-sm font-medium text-white hover:bg-[#2D0B5A] transition-all duration-300"
            >
              Service Level Agreement
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 