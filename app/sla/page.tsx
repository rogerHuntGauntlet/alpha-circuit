import React from 'react';
import Link from 'next/link';

const SLAPage = () => {
  const lastUpdated = 'June 15, 2023';

  return (
    <div className="bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B] min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Service Level <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">Agreement</span>
          </h1>
          <p className="mt-4 text-purple-100">
            Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="bg-[#1F0940] rounded-xl p-8 border border-purple-500/20">
          <div className="prose prose-lg prose-invert max-w-none">
            <p>
              This Service Level Agreement ("SLA") is part of the agreement between Circuit API ("we", "us", or "our") and the entity or person ("Customer", "you", or "your") that uses our API services. This SLA describes the levels of service you will receive from us.
            </p>
            <p>
              We recognize that our API is critical to your business operations. This SLA sets forth our commitment to provide you with reliable and available service.
            </p>

            <h2>1. Definitions</h2>
            <p>
              The following definitions apply to this SLA:
            </p>
            <ul>
              <li><strong>"Downtime"</strong> means the total minutes in a calendar month during which the Circuit API service is unavailable. Downtime does not include planned maintenance, force majeure events, or issues with your systems or third-party systems.</li>
              <li><strong>"Monthly Uptime Percentage"</strong> means the total number of minutes in a calendar month minus the number of minutes of Downtime in that month, divided by the total number of minutes in that month.</li>
              <li><strong>"Error Rate"</strong> means the number of Valid Requests that result in a response with an HTTP status code of 5xx (Server Error), divided by the total number of Valid Requests during that period.</li>
              <li><strong>"Valid Request"</strong> means a request that conforms to the Documentation, is received by a healthy instance of the Circuit API service, and has a valid authentication token.</li>
              <li><strong>"Service Credit"</strong> means a credit applied to your account calculated as a percentage of the monthly service fees you paid for the affected service.</li>
            </ul>

            <h2>2. Service Commitment</h2>
            <p>
              Circuit API commits to provide a Monthly Uptime Percentage of at least:
            </p>
            <ul>
              <li><strong>99.9%</strong> for Standard and Professional plans</li>
              <li><strong>99.99%</strong> for Enterprise plans</li>
            </ul>
            <p>
              If we do not meet the Service Commitment, you will be eligible to receive a Service Credit as described below.
            </p>

            <h2>3. Service Credits</h2>
            <p>
              Service Credits are calculated as a percentage of the total charges paid by you for the applicable service for the monthly billing cycle in which the Downtime occurred, as follows:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-[#2D0B5A] rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider border-b border-purple-500/20">Monthly Uptime Percentage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider border-b border-purple-500/20">Service Credit (Standard/Professional)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider border-b border-purple-500/20">Service Credit (Enterprise)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/20">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">Less than 99.9% but equal to or greater than 99.0%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">10%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">15%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">Less than 99.0% but equal to or greater than 95.0%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">25%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">30%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">Less than 95.0%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">50%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              For Enterprise customers, we also provide Service Credits for Error Rate as follows:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-[#2D0B5A] rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider border-b border-purple-500/20">Average Error Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider border-b border-purple-500/20">Service Credit (Enterprise)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/20">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">Greater than 0.1% but less than or equal to 1.0%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">10%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">Greater than 1.0% but less than or equal to 5.0%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">25%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">Greater than 5.0%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">50%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>4. Credit Request and Payment Procedures</h2>
            <p>
              To receive a Service Credit, you must submit a claim by sending an email to <a href="mailto:support@circuitapi.com" className="text-[#FF6B6B] hover:text-[#FFE66D]">support@circuitapi.com</a>. To be eligible, the credit request must:
            </p>
            <ul>
              <li>Include "SLA Credit Request" in the subject line</li>
              <li>Include the dates and times of each Downtime incident that you are claiming</li>
              <li>Include your request logs that document the errors and corroborate your claimed outage (any confidential or sensitive information in these logs should be removed or replaced with asterisks)</li>
              <li>Be received by us within 30 days of the end of the billing cycle in which the Downtime occurred</li>
            </ul>
            <p>
              If the Monthly Uptime Percentage of such request is confirmed by us and is less than the Service Commitment, then we will issue the Service Credit to you within one billing cycle following the month in which your request is confirmed by us. Your failure to provide the request and other information as required above will disqualify you from receiving a Service Credit.
            </p>

            <h2>5. SLA Exclusions</h2>
            <p>
              The Service Commitment does not apply to any unavailability, suspension, or termination of Circuit API, or any other performance issues:
            </p>
            <ul>
              <li>That result from a suspension or remedial action, as described in the Terms of Service</li>
              <li>Caused by factors outside of our reasonable control, including any force majeure event, Internet access issues, or related problems beyond the demarcation point of Circuit API</li>
              <li>That result from any actions or inactions of you or any third party</li>
              <li>That result from your equipment, software, or other technology and/or third-party equipment, software, or other technology (other than third-party equipment within our direct control)</li>
              <li>That result from failures of individual instances not attributable to Downtime</li>
              <li>That result from any maintenance as provided for pursuant to the Terms of Service</li>
              <li>Arising from our suspension or termination of your right to use Circuit API in accordance with the Terms of Service</li>
            </ul>
            <p>
              If availability is impacted by factors other than those used in our calculation of Monthly Uptime Percentage, then we may issue a Service Credit considering such factors at our discretion.
            </p>

            <h2>6. Response Time SLA (Enterprise Only)</h2>
            <p>
              For Enterprise customers, we also commit to the following response times for support requests:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-[#2D0B5A] rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider border-b border-purple-500/20">Severity Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider border-b border-purple-500/20">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-100 uppercase tracking-wider border-b border-purple-500/20">Response Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/20">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">Critical (P1)</td>
                    <td className="px-6 py-4 text-sm text-purple-100">Service is down or unavailable. Business operations are severely impacted.</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">1 hour (24/7)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">High (P2)</td>
                    <td className="px-6 py-4 text-sm text-purple-100">Service is operational but highly degraded. Business operations are significantly impacted.</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">4 hours (24/7)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">Normal (P3)</td>
                    <td className="px-6 py-4 text-sm text-purple-100">Service is operational with minor issues. Business operations are minimally impacted.</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">8 business hours</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">Low (P4)</td>
                    <td className="px-6 py-4 text-sm text-purple-100">General questions, feature requests, or documentation clarification.</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-100">24 business hours</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>7. Sole Remedy</h2>
            <p>
              Service Credits are your sole and exclusive remedy for any failure by Circuit API to meet the Service Commitment. The total amount of Service Credits awarded in any monthly billing cycle will not, under any circumstance, exceed the monthly service fees paid by you for the applicable service during the billing cycle in which the Downtime occurred.
            </p>

            <h2>8. Changes to SLA</h2>
            <p>
              We reserve the right to change the terms of this SLA in accordance with the Terms of Service. If we make any material adverse changes to this SLA, we will provide at least 30 days' advance notice to you.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this SLA, please contact us at <a href="mailto:support@circuitapi.com" className="text-[#FF6B6B] hover:text-[#FFE66D]">support@circuitapi.com</a>.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-purple-100 mb-4">
            For more information about our policies, please see our:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/terms-of-service"
              className="inline-flex items-center px-4 py-2 border border-purple-500/50 rounded-md text-sm font-medium text-white hover:bg-[#2D0B5A] transition-all duration-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="inline-flex items-center px-4 py-2 border border-purple-500/50 rounded-md text-sm font-medium text-white hover:bg-[#2D0B5A] transition-all duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookie-policy"
              className="inline-flex items-center px-4 py-2 border border-purple-500/50 rounded-md text-sm font-medium text-white hover:bg-[#2D0B5A] transition-all duration-300"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SLAPage; 