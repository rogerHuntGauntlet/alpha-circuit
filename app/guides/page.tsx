import React from 'react';
import Link from 'next/link';

const GuidesPage = () => {
  // Mock data for guides
  const featuredGuide = {
    id: 'getting-started',
    title: 'Getting Started with Circuit API',
    description: 'Learn how to set up your first project with Circuit API, from authentication to making your first API call.',
    category: 'Beginner',
    readTime: '10 min read',
    author: {
      name: 'Priya Patel',
      role: 'Developer Advocate',
      avatar: '/images/avatars/priya-patel.jpg'
    },
    date: 'Updated June 15, 2023'
  };

  const guides = [
    {
      id: 'authentication',
      title: 'Authentication and Authorization',
      description: 'Learn about the different authentication methods supported by Circuit API and how to implement them securely in your application.',
      category: 'Security',
      readTime: '8 min read',
      difficulty: 'Beginner'
    },
    {
      id: 'webhooks',
      title: 'Setting Up Webhooks',
      description: 'Understand how to configure and use webhooks to receive real-time updates from Circuit API.',
      category: 'Integration',
      readTime: '12 min read',
      difficulty: 'Intermediate'
    },
    {
      id: 'rate-limiting',
      title: 'Understanding Rate Limits',
      description: 'Learn about Circuit API rate limits, how to monitor your usage, and strategies to avoid hitting limits in production.',
      category: 'Best Practices',
      readTime: '7 min read',
      difficulty: 'Beginner'
    },
    {
      id: 'error-handling',
      title: 'Error Handling Best Practices',
      description: 'Implement robust error handling for Circuit API responses to create resilient applications.',
      category: 'Best Practices',
      readTime: '9 min read',
      difficulty: 'Intermediate'
    },
    {
      id: 'ai-matching-algorithms',
      title: 'Optimizing AI Matching Algorithms',
      description: 'Deep dive into how to fine-tune the AI matching algorithms to get the most relevant results for your specific use case.',
      category: 'Advanced',
      readTime: '15 min read',
      difficulty: 'Advanced'
    },
    {
      id: 'batch-processing',
      title: 'Batch Processing for High Volume',
      description: 'Learn how to use batch processing endpoints to efficiently handle high volumes of data.',
      category: 'Performance',
      readTime: '11 min read',
      difficulty: 'Intermediate'
    },
    {
      id: 'caching-strategies',
      title: 'Caching Strategies',
      description: 'Implement effective caching strategies to improve performance and reduce API calls.',
      category: 'Performance',
      readTime: '10 min read',
      difficulty: 'Intermediate'
    },
    {
      id: 'testing',
      title: 'Testing Your Integration',
      description: 'Best practices for testing your Circuit API integration, including using the sandbox environment and mocking responses.',
      category: 'Testing',
      readTime: '13 min read',
      difficulty: 'Intermediate'
    },
    {
      id: 'monitoring',
      title: 'Monitoring and Observability',
      description: 'Set up comprehensive monitoring for your Circuit API integration to track performance, errors, and usage.',
      category: 'Operations',
      readTime: '14 min read',
      difficulty: 'Advanced'
    }
  ];

  const categories = [
    'All Guides',
    'Beginner',
    'Intermediate',
    'Advanced',
    'Security',
    'Integration',
    'Performance',
    'Best Practices',
    'Testing',
    'Operations'
  ];

  return (
    <div className="bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B] min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Circuit API <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">Guides</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-purple-100">
            Comprehensive tutorials and best practices to help you get the most out of Circuit API.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mt-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search guides..."
                  className="w-full px-4 py-3 rounded-md border-purple-500/30 bg-[#1B0B3B] text-purple-100 focus:border-[#FF6B6B] focus:ring-[#FF6B6B] pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <select className="px-4 py-3 rounded-md border-purple-500/30 bg-[#1B0B3B] text-purple-100 focus:border-[#FF6B6B] focus:ring-[#FF6B6B]">
                <option>Sort by: Newest</option>
                <option>Sort by: Oldest</option>
                <option>Sort by: Most Popular</option>
                <option>Sort by: Difficulty (Beginner to Advanced)</option>
                <option>Sort by: Difficulty (Advanced to Beginner)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  category === 'All Guides'
                    ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] text-[#1B0B3B]'
                    : 'bg-[#1F0940] text-purple-100 hover:bg-[#2D0B5A] border border-purple-500/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Guide */}
        <div className="mt-12">
          <div className="bg-[#1F0940] rounded-xl overflow-hidden border border-purple-500/20">
            <div className="p-8 md:p-10">
              <div className="flex items-center space-x-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B]/30">
                  Featured Guide
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#2D0B5A] text-purple-100 border border-purple-500/20">
                  {featuredGuide.category}
                </span>
                <span className="text-purple-300 text-sm">{featuredGuide.readTime}</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                {featuredGuide.title}
              </h2>
              <p className="text-purple-100 text-lg mb-6">
                {featuredGuide.description}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="h-10 w-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-medium">
                    {featuredGuide.author.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-medium">{featuredGuide.author.name}</p>
                    <p className="text-purple-300 text-sm">{featuredGuide.date}</p>
                  </div>
                </div>
                <Link 
                  href={`/guides/${featuredGuide.id}`}
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-[#1B0B3B] bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
                >
                  Read Guide
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* All Guides */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8">All Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <Link 
                key={guide.id} 
                href={`/guides/${guide.id}`}
                className="bg-[#1F0940] rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    guide.difficulty === 'Beginner' 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                      : guide.difficulty === 'Intermediate'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    {guide.difficulty}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2D0B5A] text-purple-100 border border-purple-500/20">
                    {guide.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {guide.title}
                </h3>
                <p className="text-purple-100 mb-6 flex-grow">
                  {guide.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-purple-300 text-sm">{guide.readTime}</span>
                  <span className="text-[#FF6B6B] hover:text-[#FFE66D] text-sm font-medium">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Learning Paths */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Learning Paths</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-purple-100">
              Structured learning paths to help you master Circuit API from beginner to expert.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Getting Started',
                description: 'Perfect for newcomers to Circuit API. Learn the basics and build your first integration.',
                guides: 5,
                time: '2-3 hours',
                level: 'Beginner',
                color: 'from-green-400 to-blue-500'
              },
              {
                title: 'Building Production Apps',
                description: 'Take your integration to the next level with advanced features, optimizations, and best practices.',
                guides: 8,
                time: '4-5 hours',
                level: 'Intermediate',
                color: 'from-blue-400 to-indigo-500'
              },
              {
                title: 'Advanced Techniques',
                description: 'Master advanced concepts like custom AI models, high-volume processing, and enterprise integrations.',
                guides: 6,
                time: '5-6 hours',
                level: 'Advanced',
                color: 'from-purple-400 to-pink-500'
              }
            ].map((path, index) => (
              <div key={index} className="bg-[#1F0940] rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                <div className={`h-2 bg-gradient-to-r ${path.color}`}></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{path.title}</h3>
                  <p className="text-purple-100 mb-4">{path.description}</p>
                  <div className="flex items-center justify-between text-sm text-purple-300 mb-6">
                    <span>{path.guides} guides</span>
                    <span>•</span>
                    <span>{path.time}</span>
                    <span>•</span>
                    <span>{path.level}</span>
                  </div>
                  <Link 
                    href={`/learning-paths/${path.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-[#1B0B3B] bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
                  >
                    Start Learning Path
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Tutorials */}
        <div className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Video Tutorials</h2>
            <Link 
              href="/videos"
              className="text-[#FF6B6B] hover:text-[#FFE66D] text-sm font-medium"
            >
              View all videos →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Getting Started with Circuit API',
                duration: '12:34',
                thumbnail: '/images/videos/getting-started.jpg'
              },
              {
                title: 'Advanced Matching Techniques',
                duration: '18:22',
                thumbnail: '/images/videos/advanced-matching.jpg'
              },
              {
                title: 'Optimizing API Performance',
                duration: '15:47',
                thumbnail: '/images/videos/performance.jpg'
              }
            ].map((video, index) => (
              <div key={index} className="bg-[#1F0940] rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                <div className="relative h-48 bg-purple-900">
                  {/* Placeholder for video thumbnail */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-[#3D1B6A] to-[#1B0B3B] flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-[#FF6B6B]/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Resources */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Community Resources</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-purple-100">
              Explore resources created by our community of developers.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Open Source SDKs',
                description: 'Explore community-maintained SDKs for various programming languages and frameworks.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                ),
                link: '/community/sdks'
              },
              {
                title: 'Sample Projects',
                description: 'Browse sample projects that demonstrate how to use Circuit API in real-world applications.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                ),
                link: '/community/projects'
              },
              {
                title: 'Community Forum',
                description: 'Join our community forum to ask questions, share knowledge, and connect with other developers.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                ),
                link: '/community/forum'
              },
              {
                title: 'Contribute',
                description: 'Learn how you can contribute to our documentation, sample projects, and community resources.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                ),
                link: '/community/contribute'
              }
            ].map((resource, index) => (
              <Link 
                key={index} 
                href={resource.link}
                className="bg-[#1F0940] rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 flex items-start"
              >
                <div className="h-12 w-12 rounded-lg bg-[#2D0B5A] flex items-center justify-center mr-4 flex-shrink-0">
                  {resource.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{resource.title}</h3>
                  <p className="text-purple-100">{resource.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-24 bg-[#1F0940] rounded-xl p-8 md:p-12 border border-purple-500/20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Stay Updated</h2>
            <p className="mt-2 text-purple-100 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive new guides, tutorials, and updates directly in your inbox.
            </p>
            <div className="mt-6 max-w-md mx-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 rounded-md border-purple-500/30 bg-[#1B0B3B] text-purple-100 focus:border-[#FF6B6B] focus:ring-[#FF6B6B]"
                />
                <button
                  type="submit"
                  className="px-6 py-2 border border-transparent rounded-md text-[#1F0940] font-bold bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidesPage; 