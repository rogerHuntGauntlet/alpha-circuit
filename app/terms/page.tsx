import React from 'react';
import Link from 'next/link';

const TermsPage = () => {
  const lastUpdated = 'January 15, 2023';

  return (
    <div className="bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B] min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-purple-100">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="mt-12 bg-[#1F0940] rounded-xl p-8 border border-purple-500/20">
          <div className="prose prose-invert prose-purple max-w-none">
            <p>
              Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Circuit API service operated by Circuit, Inc. ("us", "we", "our").
            </p>
            
            <p>
              Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
            
            <p>
              By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">1. Accounts</h2>
            
            <p>
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            
            <p>
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
            </p>
            
            <p>
              You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">2. API Usage</h2>
            
            <p>
              Our Service provides access to the Circuit API, which allows you to integrate matchmaking functionality into your applications. You agree to use the API in accordance with the following guidelines:
            </p>
            
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>You will not exceed the rate limits specified in your plan.</li>
              <li>You will not attempt to circumvent any security measures or access restrictions.</li>
              <li>You will not use the API to transmit any malware, viruses, or other harmful code.</li>
              <li>You will not use the API to collect personal information from users without their consent.</li>
              <li>You will comply with all applicable laws and regulations when using the API.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8">3. Service Availability and SLAs</h2>
            
            <p>
              We strive to provide a reliable and available service, but we do not guarantee 100% uptime. Service Level Agreements (SLAs) vary by plan and are detailed in our <Link href="/sla" className="text-[#FF6B6B] hover:text-[#FFE66D]">SLA documentation</Link>.
            </p>
            
            <p>
              We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time, with or without notice. We shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the Service.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">4. Billing and Payments</h2>
            
            <p>
              Certain aspects of the Service are provided on a paid subscription basis. You will be billed in advance on a recurring basis, depending on the subscription plan you select.
            </p>
            
            <p>
              You may cancel your subscription at any time. Upon cancellation, your subscription will remain active until the end of the current billing period. We do not provide refunds for partial subscription periods.
            </p>
            
            <p>
              We reserve the right to change our subscription fees at any time, upon reasonable notice. Such notice may be provided by email or by posting the changes to our website or the Service itself.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">5. Intellectual Property</h2>
            
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of Circuit, Inc. and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
            </p>
            
            <p>
              Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Circuit, Inc.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">6. Limitation of Liability</h2>
            
            <p>
              In no event shall Circuit, Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Your access to or use of or inability to access or use the Service;</li>
              <li>Any conduct or content of any third party on the Service;</li>
              <li>Any content obtained from the Service; and</li>
              <li>Unauthorized access, use or alteration of your transmissions or content.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8">7. Indemnification</h2>
            
            <p>
              You agree to defend, indemnify and hold harmless Circuit, Inc. and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of:
            </p>
            
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Your use and access of the Service;</li>
              <li>Your violation of any term of these Terms;</li>
              <li>Your violation of any third-party right, including without limitation any copyright, property, or privacy right; or</li>
              <li>Any claim that your content caused damage to a third party.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8">8. Governing Law</h2>
            
            <p>
              These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
            </p>
            
            <p>
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">9. Changes to Terms</h2>
            
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            
            <p>
              By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8">10. Contact Us</h2>
            
            <p>
              If you have any questions about these Terms, please <Link href="/contact" className="text-[#FF6B6B] hover:text-[#FFE66D]">contact us</Link>.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-purple-100">
            For more information about how we handle your data, please see our{' '}
            <Link href="/privacy" className="text-[#FF6B6B] hover:text-[#FFE66D]">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage; 