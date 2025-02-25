import React from 'react';
import Link from 'next/link';

const CookiePolicyPage = () => {
  const lastUpdated = 'June 15, 2023';

  return (
    <div className="bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B] min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Cookie <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">Policy</span>
          </h1>
          <p className="mt-4 text-purple-100">
            Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="bg-[#1F0940] rounded-xl p-8 border border-purple-500/20">
          <div className="prose prose-lg prose-invert max-w-none">
            <p>
              This Cookie Policy explains how Circuit API ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website and use our services. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>

            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, Circuit API) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
            </p>

            <h2>Why Do We Use Cookies?</h2>
            <p>
              We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website and services to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our website and services. Third parties serve cookies through our website for advertising, analytics, and other purposes.
            </p>

            <h2>Types of Cookies We Use</h2>
            <p>
              The specific types of first and third-party cookies served through our website and the purposes they perform are described below:
            </p>

            <h3>1. Essential Cookies</h3>
            <p>
              These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our website functions.
            </p>
            <ul>
              <li><strong>Session Cookies:</strong> These cookies are temporary and expire once you close your browser.</li>
              <li><strong>Persistent Cookies:</strong> These cookies remain on your device until you delete them or they expire.</li>
              <li><strong>Authentication Cookies:</strong> These cookies help us identify you when you are logged into our services.</li>
            </ul>

            <h3>2. Performance and Functionality Cookies</h3>
            <p>
              These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
            </p>
            <ul>
              <li><strong>Preference Cookies:</strong> These cookies remember your preferences and settings.</li>
              <li><strong>Language Cookies:</strong> These cookies remember your language preference.</li>
            </ul>

            <h3>3. Analytics and Customization Cookies</h3>
            <p>
              These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.
            </p>
            <ul>
              <li><strong>Google Analytics:</strong> We use Google Analytics to understand how visitors interact with our website.</li>
              <li><strong>Mixpanel:</strong> We use Mixpanel to track user interactions with our services.</li>
              <li><strong>Hotjar:</strong> We use Hotjar to understand how users interact with our website through heatmaps and session recordings.</li>
            </ul>

            <h3>4. Advertising Cookies</h3>
            <p>
              These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.
            </p>
            <ul>
              <li><strong>Google Ads:</strong> We use Google Ads cookies to track conversions and retarget users with relevant advertisements.</li>
              <li><strong>LinkedIn Ads:</strong> We use LinkedIn Ads cookies to track conversions and target professionals with relevant advertisements.</li>
              <li><strong>Facebook Pixel:</strong> We use Facebook Pixel to track conversions and retarget users with relevant advertisements on Facebook and Instagram.</li>
            </ul>

            <h3>5. Social Media Cookies</h3>
            <p>
              These cookies are used to enable you to share pages and content that you find interesting on our website through third-party social networking and other websites. These cookies may also be used for advertising purposes.
            </p>
            <ul>
              <li><strong>Twitter:</strong> We use Twitter cookies to enable sharing functionality and track interactions.</li>
              <li><strong>LinkedIn:</strong> We use LinkedIn cookies to enable sharing functionality and track interactions.</li>
              <li><strong>Facebook:</strong> We use Facebook cookies to enable sharing functionality and track interactions.</li>
            </ul>

            <h2>How Can You Control Cookies?</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie table above.
            </p>
            <p>
              You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.
            </p>
            <p>
              In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit <a href="http://www.aboutads.info/choices/" className="text-[#FF6B6B] hover:text-[#FFE66D]">http://www.aboutads.info/choices/</a> or <a href="http://www.youronlinechoices.com" className="text-[#FF6B6B] hover:text-[#FFE66D]">http://www.youronlinechoices.com</a>.
            </p>

            <h2>Do Not Track</h2>
            <p>
              Some browsers have a "Do Not Track" feature that lets you tell websites that you do not want to have your online activities tracked. These features are not yet uniform, so we are currently not set up to respond to such signals.
            </p>

            <h2>Changes to Our Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
            <p>
              The date at the top of this Cookie Policy indicates when it was last updated.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please email us at <a href="mailto:privacy@circuitapi.com" className="text-[#FF6B6B] hover:text-[#FFE66D]">privacy@circuitapi.com</a> or contact us at:
            </p>
            <p>
              Circuit API<br />
              123 Tech Street<br />
              San Francisco, CA 94107<br />
              USA
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-purple-100 mb-4">
            For more information about our data practices, please see our:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/privacy-policy"
              className="inline-flex items-center px-4 py-2 border border-purple-500/50 rounded-md text-sm font-medium text-white hover:bg-[#2D0B5A] transition-all duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="inline-flex items-center px-4 py-2 border border-purple-500/50 rounded-md text-sm font-medium text-white hover:bg-[#2D0B5A] transition-all duration-300"
            >
              Terms of Service
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

export default CookiePolicyPage; 