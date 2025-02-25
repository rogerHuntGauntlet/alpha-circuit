import React from 'react';
import Link from 'next/link';

const CareersPage = () => {
  // Mock data for job openings
  const jobOpenings = [
    {
      id: 'senior-backend-engineer',
      title: 'Senior Backend Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA (Remote Available)',
      type: 'Full-time',
      description: 'We are looking for a Senior Backend Engineer to help us build and scale our API infrastructure. You will be responsible for designing, implementing, and maintaining high-performance, reliable, and secure API services.',
      requirements: [
        "Bachelor's degree in Computer Science or equivalent experience",
        '5+ years of experience in backend development',
        'Strong proficiency in Node.js, Python, or Go',
        'Experience with distributed systems and microservices architecture',
        'Knowledge of database technologies (SQL and NoSQL)',
        'Experience with cloud platforms (AWS, GCP, or Azure)',
        'Strong understanding of API design principles and best practices'
      ],
      benefits: [
        'Competitive salary and equity package',
        'Comprehensive health, dental, and vision insurance',
        'Unlimited PTO policy',
        'Remote-friendly work environment',
        'Professional development budget',
        'Home office stipend',
        '401(k) matching'
      ]
    },
    {
      id: 'frontend-engineer',
      title: 'Frontend Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA (Remote Available)',
      type: 'Full-time',
      description: 'We are seeking a talented Frontend Engineer to join our team and help build beautiful, intuitive, and responsive user interfaces for our dashboard and developer tools. You will work closely with our design and backend teams to create seamless user experiences.',
      requirements: [
        "Bachelor's degree in Computer Science or equivalent experience",
        '3+ years of experience in frontend development',
        'Strong proficiency in React, TypeScript, and modern JavaScript',
        'Experience with responsive design and CSS frameworks',
        'Knowledge of state management solutions (Redux, Context API, etc.)',
        'Understanding of web performance optimization techniques',
        'Experience with testing frameworks (Jest, React Testing Library, etc.)'
      ],
      benefits: [
        'Competitive salary and equity package',
        'Comprehensive health, dental, and vision insurance',
        'Unlimited PTO policy',
        'Remote-friendly work environment',
        'Professional development budget',
        'Home office stipend',
        '401(k) matching'
      ]
    },
    {
      id: 'devops-engineer',
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'San Francisco, CA (Remote Available)',
      type: 'Full-time',
      description: 'We are looking for a DevOps Engineer to help us build and maintain our cloud infrastructure. You will be responsible for designing, implementing, and maintaining our CI/CD pipelines, monitoring systems, and cloud resources.',
      requirements: [
        "Bachelor's degree in Computer Science or equivalent experience",
        '3+ years of experience in DevOps or SRE roles',
        'Strong proficiency in infrastructure as code (Terraform, CloudFormation, etc.)',
        'Experience with containerization technologies (Docker, Kubernetes)',
        'Knowledge of cloud platforms (AWS, GCP, or Azure)',
        'Experience with CI/CD tools (GitHub Actions, Jenkins, etc.)',
        'Understanding of monitoring and observability tools (Prometheus, Grafana, etc.)'
      ],
      benefits: [
        'Competitive salary and equity package',
        'Comprehensive health, dental, and vision insurance',
        'Unlimited PTO policy',
        'Remote-friendly work environment',
        'Professional development budget',
        'Home office stipend',
        '401(k) matching'
      ]
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      department: 'Product',
      location: 'San Francisco, CA (Remote Available)',
      type: 'Full-time',
      description: 'We are seeking a Product Manager to help us define and execute our product roadmap. You will work closely with our engineering, design, and business teams to identify customer needs, prioritize features, and deliver a world-class API product.',
      requirements: [
        "Bachelor's degree in a relevant field or equivalent experience",
        '3+ years of experience in product management',
        'Experience with API or developer tools products',
        'Strong analytical and problem-solving skills',
        'Excellent communication and collaboration abilities',
        'Understanding of software development lifecycle',
        'Ability to translate business requirements into technical specifications'
      ],
      benefits: [
        'Competitive salary and equity package',
        'Comprehensive health, dental, and vision insurance',
        'Unlimited PTO policy',
        'Remote-friendly work environment',
        'Professional development budget',
        'Home office stipend',
        '401(k) matching'
      ]
    },
    {
      id: 'developer-advocate',
      title: 'Developer Advocate',
      department: 'Developer Relations',
      location: 'San Francisco, CA (Remote Available)',
      type: 'Full-time',
      description: 'We are looking for a Developer Advocate to help us build and nurture our developer community. You will create technical content, speak at events, engage with developers, and gather feedback to improve our API product.',
      requirements: [
        "Bachelor's degree in Computer Science or equivalent experience",
        '3+ years of experience in software development or developer relations',
        'Strong technical writing and communication skills',
        'Experience with public speaking and community engagement',
        'Familiarity with API technologies and developer tools',
        'Active presence in developer communities',
        'Passion for teaching and helping developers succeed'
      ],
      benefits: [
        'Competitive salary and equity package',
        'Comprehensive health, dental, and vision insurance',
        'Unlimited PTO policy',
        'Remote-friendly work environment',
        'Professional development budget',
        'Home office stipend',
        '401(k) matching'
      ]
    }
  ];

  // Mock data for company values
  const companyValues = [
    {
      title: 'Innovation',
      description: "We push the boundaries of what's possible and constantly seek new ways to solve problems.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Collaboration',
      description: 'We believe the best work happens when diverse perspectives come together toward a common goal.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Customer Focus',
      description: 'We put our customers at the center of everything we do and strive to exceed their expectations.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: 'Integrity',
      description: 'We act with honesty, transparency, and ethical responsibility in all our interactions.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B] min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">Team</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-purple-100">
            Help us build the future of API technology and empower developers around the world.
          </p>
          <div className="mt-10">
            <a
              href="#openings"
              className="inline-flex items-center px-8 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-[#1B0B3B] bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
            >
              View Open Positions
            </a>
          </div>
        </div>

        {/* About Our Company */}
        <div className="mt-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white">About Our Company</h2>
              <p className="mt-4 text-lg text-purple-100">
                Circuit API is a leading provider of AI-powered matchmaking APIs that help businesses connect with the right customers at the right time. Our mission is to make powerful AI technology accessible to developers of all sizes.
              </p>
              <p className="mt-4 text-lg text-purple-100">
                Founded in 2020, we've grown from a small team of passionate engineers to a diverse company of over 50 talented individuals across engineering, product, design, marketing, and customer success.
              </p>
              <p className="mt-4 text-lg text-purple-100">
                We're backed by top-tier investors and are growing rapidly as businesses increasingly rely on our API to power their matchmaking needs. Join us on our journey to transform how businesses connect with customers through the power of AI.
              </p>
            </div>
            <div className="mt-10 lg:mt-0 bg-[#1F0940] rounded-xl p-8 border border-purple-500/20">
              <h3 className="text-xl font-bold text-white mb-6">Why Join Us?</h3>
              <ul className="space-y-4">
                {[
                  'Work on cutting-edge AI technology that impacts millions of users',
                  'Collaborate with a talented and diverse team of engineers, designers, and product managers',
                  'Flexible work environment with remote options',
                  'Competitive compensation and benefits',
                  'Opportunities for growth and professional development',
                  'Make a meaningful impact on businesses around the world'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6B6B] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-purple-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Our Values</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-purple-100">
              These core principles guide everything we do and define our company culture.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {companyValues.map((value, index) => (
              <div key={index} className="bg-[#1F0940] rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                <div className="h-12 w-12 rounded-lg bg-[#2D0B5A] flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-purple-100">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div id="openings" className="mt-24 scroll-mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Open Positions</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-purple-100">
              Join our team and help us build the future of API technology.
            </p>
          </div>

          {/* Department Filter */}
          <div className="mt-10 flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-2">
              {['All Departments', 'Engineering', 'Product', 'Infrastructure', 'Developer Relations'].map((department) => (
                <button
                  key={department}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    department === 'All Departments'
                      ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] text-[#1B0B3B]'
                      : 'bg-[#1F0940] text-purple-100 hover:bg-[#2D0B5A] border border-purple-500/20'
                  }`}
                >
                  {department}
                </button>
              ))}
            </div>
          </div>

          {/* Job Listings */}
          <div className="mt-10 space-y-6">
            {jobOpenings.map((job) => (
              <div key={job.id} className="bg-[#1F0940] rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">{job.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2D0B5A] text-purple-100 border border-purple-500/20">
                          {job.department}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2D0B5A] text-purple-100 border border-purple-500/20">
                          {job.location}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2D0B5A] text-purple-100 border border-purple-500/20">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Link
                        href={`/careers/${job.id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-[#1B0B3B] bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                  <p className="mt-4 text-purple-100">
                    {job.description}
                  </p>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium text-white mb-3">Requirements</h4>
                      <ul className="space-y-2">
                        {job.requirements.slice(0, 4).map((requirement, index) => (
                          <li key={index} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B6B] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-purple-100 text-sm">{requirement}</span>
                          </li>
                        ))}
                        {job.requirements.length > 4 && (
                          <li className="text-[#FF6B6B] text-sm ml-7">+ {job.requirements.length - 4} more</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-3">Benefits</h4>
                      <ul className="space-y-2">
                        {job.benefits.slice(0, 4).map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFE66D] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-purple-100 text-sm">{benefit}</span>
                          </li>
                        ))}
                        {job.benefits.length > 4 && (
                          <li className="text-[#FFE66D] text-sm ml-7">+ {job.benefits.length - 4} more</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Our Application Process</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-purple-100">
              We've designed our hiring process to be thorough yet efficient, typically taking 2-3 weeks from application to offer.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Application Review',
                description: 'Our recruiting team reviews your application and resume to assess your qualifications and experience.',
                duration: '1-3 days'
              },
              {
                step: '02',
                title: 'Initial Interview',
                description: 'A 30-minute call with a recruiter to discuss your background, experience, and interest in the role.',
                duration: '30 minutes'
              },
              {
                step: '03',
                title: 'Technical Assessment',
                description: 'A take-home assignment or live coding session to evaluate your technical skills and problem-solving abilities.',
                duration: 'Varies by role'
              },
              {
                step: '04',
                title: 'Final Interviews',
                description: 'A series of interviews with team members, including technical, behavioral, and cultural fit assessments.',
                duration: '2-3 hours'
              }
            ].map((step, index) => (
              <div key={index} className="bg-[#1F0940] rounded-xl p-6 border border-purple-500/20 relative">
                <div className="absolute top-6 right-6 text-2xl font-bold text-[#FF6B6B]/30">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-purple-100 mb-4">{step.description}</p>
                <div className="text-sm text-purple-300">
                  <span className="font-medium">Duration:</span> {step.duration}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Employee Testimonials */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">What Our Team Says</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-purple-100">
              Hear directly from our team members about their experience working at Circuit API.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Working at Circuit API has been the most rewarding experience of my career. The problems we solve are challenging and impactful, and the team is incredibly supportive and collaborative.",
                name: "Sarah Johnson",
                role: "Lead Infrastructure Engineer",
                tenure: "2 years at Circuit API"
              },
              {
                quote: "What I love most about Circuit API is the culture of innovation and continuous learning. We're encouraged to experiment, take risks, and grow both personally and professionally.",
                name: "Michael Wong",
                role: "Senior Backend Engineer",
                tenure: "1.5 years at Circuit API"
              },
              {
                quote: "The leadership team truly cares about our wellbeing and growth. They've created an environment where everyone's voice is heard and valued, regardless of their role or tenure.",
                name: "Emily Rodriguez",
                role: "Product Manager",
                tenure: "1 year at Circuit API"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-[#1F0940] rounded-xl p-6 border border-purple-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF6B6B]/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-purple-100 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="text-white font-medium">{testimonial.name}</p>
                  <p className="text-purple-300 text-sm">{testimonial.role}</p>
                  <p className="text-purple-300 text-sm">{testimonial.tenure}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 bg-gradient-to-r from-[#3D1B6A] to-[#2D0B5A] rounded-xl p-8 md:p-12 border border-purple-500/20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Don't See the Right Role?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-purple-100">
              We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <div className="mt-8">
              <a
                href="mailto:careers@circuitapi.com"
                className="inline-flex items-center px-8 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-[#1B0B3B] bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
              >
                Contact Our Recruiting Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage; 