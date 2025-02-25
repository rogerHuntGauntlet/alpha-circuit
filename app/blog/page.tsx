import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BlogPage = () => {
  // Mock data for blog posts
  const featuredPost = {
    id: 'circuit-api-v2',
    title: 'Introducing Circuit API v2.0: Faster, Smarter, More Powerful',
    excerpt: "Today, we're excited to announce the release of Circuit API v2.0, our biggest update yet. This new version brings significant performance improvements, new features, and enhanced developer experience.",
    date: 'June 15, 2023',
    author: {
      name: 'Alex Chen',
      role: 'CTO',
      avatar: '/images/avatars/alex-chen.jpg'
    },
    category: 'Product Updates',
    readTime: '5 min read',
    image: '/images/blog/circuit-api-v2.jpg'
  };

  const blogPosts = [
    {
      id: 'scaling-to-millions',
      title: 'How We Scaled Circuit API to Handle Millions of Requests',
      excerpt: 'Learn about our journey scaling the Circuit API infrastructure to handle millions of concurrent requests while maintaining sub-100ms response times.',
      date: 'May 28, 2023',
      author: {
        name: 'Sarah Johnson',
        role: 'Lead Infrastructure Engineer',
        avatar: '/images/avatars/sarah-johnson.jpg'
      },
      category: 'Engineering',
      readTime: '8 min read',
      image: '/images/blog/scaling.jpg'
    },
    {
      id: 'ai-matchmaking-algorithms',
      title: 'The Science Behind Our AI-Powered Matchmaking Algorithms',
      excerpt: 'A deep dive into how our AI-powered matchmaking algorithms work and how they help businesses connect with the right customers at the right time.',
      date: 'May 15, 2023',
      author: {
        name: 'Dr. Michael Wong',
        role: 'Head of AI Research',
        avatar: '/images/avatars/michael-wong.jpg'
      },
      category: 'Technology',
      readTime: '10 min read',
      image: '/images/blog/ai-algorithms.jpg'
    },
    {
      id: 'case-study-fintech',
      title: 'Case Study: How FinTech Startup Increased Conversion by 200%',
      excerpt: 'See how a leading fintech startup used Circuit API to match customers with financial products, resulting in a 200% increase in conversion rates.',
      date: 'April 30, 2023',
      author: {
        name: 'Emily Rodriguez',
        role: 'Customer Success Manager',
        avatar: '/images/avatars/emily-rodriguez.jpg'
      },
      category: 'Case Studies',
      readTime: '6 min read',
      image: '/images/blog/fintech-case-study.jpg'
    },
    {
      id: 'security-best-practices',
      title: 'Security Best Practices for API Integration',
      excerpt: 'Learn about the security best practices you should follow when integrating with any API, including authentication, encryption, and data protection.',
      date: 'April 22, 2023',
      author: {
        name: 'David Kim',
        role: 'Security Engineer',
        avatar: '/images/avatars/david-kim.jpg'
      },
      category: 'Security',
      readTime: '7 min read',
      image: '/images/blog/security.jpg'
    },
    {
      id: 'webhooks-guide',
      title: 'A Comprehensive Guide to Using Webhooks with Circuit API',
      excerpt: 'Everything you need to know about setting up and using webhooks with Circuit API to build real-time applications and integrations.',
      date: 'April 10, 2023',
      author: {
        name: 'Priya Patel',
        role: 'Developer Advocate',
        avatar: '/images/avatars/priya-patel.jpg'
      },
      category: 'Tutorials',
      readTime: '9 min read',
      image: '/images/blog/webhooks.jpg'
    },
    {
      id: 'future-of-apis',
      title: 'The Future of APIs: Trends and Predictions for 2024',
      excerpt: 'Our team shares insights on the future of API development, including trends like GraphQL, serverless architectures, and AI-powered APIs.',
      date: 'March 28, 2023',
      author: {
        name: 'James Wilson',
        role: 'CEO',
        avatar: '/images/avatars/james-wilson.jpg'
      },
      category: 'Industry Insights',
      readTime: '6 min read',
      image: '/images/blog/future-apis.jpg'
    },
  ];

  const categories = [
    'All',
    'Product Updates',
    'Engineering',
    'Technology',
    'Case Studies',
    'Security',
    'Tutorials',
    'Industry Insights'
  ];

  return (
    <div className="bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B] min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Circuit <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">Blog</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-purple-100">
            Insights, updates, and stories from the Circuit API team.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  category === 'All'
                    ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] text-[#1B0B3B]'
                    : 'bg-[#1F0940] text-purple-100 hover:bg-[#2D0B5A] border border-purple-500/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        <div className="mt-12">
          <div className="relative rounded-xl overflow-hidden bg-[#1F0940] border border-purple-500/20">
            <div className="lg:flex">
              <div className="lg:w-1/2 relative h-64 lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1F0940] to-transparent z-10 lg:hidden"></div>
                <div className="relative h-full w-full bg-purple-900">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-[#3D1B6A] to-[#1B0B3B] flex items-center justify-center">
                      <span className="text-purple-300 text-lg">Featured Post Image</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B]/30">
                    {featuredPost.category}
                  </span>
                  <span className="text-purple-300 text-sm">{featuredPost.date}</span>
                  <span className="text-purple-300 text-sm">•</span>
                  <span className="text-purple-300 text-sm">{featuredPost.readTime}</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-purple-100 mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center mb-6">
                  <div className="h-10 w-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-medium">
                    {featuredPost.author.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-medium">{featuredPost.author.name}</p>
                    <p className="text-purple-300 text-sm">{featuredPost.author.role}</p>
                  </div>
                </div>
                <Link 
                  href={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-[#1B0B3B] bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
                >
                  Read Article
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-[#1F0940] rounded-xl overflow-hidden border border-purple-500/20 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl">
                <div className="h-48 relative bg-purple-900">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-[#3D1B6A] to-[#1B0B3B] flex items-center justify-center">
                      <span className="text-purple-300 text-sm">{post.title} Image</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1B0B3B] text-purple-100 border border-purple-500/20">
                      {post.category}
                    </span>
                    <span className="text-purple-300 text-xs">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {post.title}
                  </h3>
                  <p className="text-purple-100 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-purple-700 flex items-center justify-center text-white text-xs font-medium">
                        {post.author.name.charAt(0)}
                      </div>
                      <div className="ml-2">
                        <p className="text-white text-sm font-medium">{post.author.name}</p>
                        <p className="text-purple-300 text-xs">{post.date}</p>
                      </div>
                    </div>
                    <Link 
                      href={`/blog/${post.id}`}
                      className="text-[#FF6B6B] hover:text-[#FFE66D] text-sm font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-20 bg-[#1F0940] rounded-xl p-8 md:p-12 border border-purple-500/20">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-white mb-4">Subscribe to our newsletter</h2>
              <p className="text-purple-100 mb-6 md:mb-0">
                Get the latest articles, tutorials, and updates from the Circuit API team delivered straight to your inbox.
              </p>
            </div>
            <div className="md:w-1/3">
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

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-purple-500/30 bg-[#1F0940] text-sm font-medium text-purple-100 hover:bg-[#2D0B5A]"
            >
              Previous
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border-t border-b border-purple-500/30 bg-[#2D0B5A] text-sm font-medium text-white"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border-t border-b border-purple-500/30 bg-[#1F0940] text-sm font-medium text-purple-100 hover:bg-[#2D0B5A]"
            >
              2
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border-t border-b border-purple-500/30 bg-[#1F0940] text-sm font-medium text-purple-100 hover:bg-[#2D0B5A]"
            >
              3
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-purple-500/30 bg-[#1F0940] text-sm font-medium text-purple-100 hover:bg-[#2D0B5A]"
            >
              Next
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BlogPage; 