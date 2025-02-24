'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Define types for our user data
interface UserStats {
  totalMatches: number;
  apiUsage: number;
  averageMatchQuality: number;
}

interface Match {
  id: string;
  status: string;
  details: string;
  createdAt: string;
}

interface UserData {
  stats: UserStats;
  recentMatches: Match[];
  totalMatchCount: number;
  currentPage: number;
  totalPages: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    stats: {
      totalMatches: 0,
      apiUsage: 0,
      averageMatchQuality: 0
    },
    recentMatches: [],
    totalMatchCount: 0,
    currentPage: 1,
    totalPages: 1
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }

    // Fetch user data when session is available
    if (status === 'authenticated' && session?.user) {
      setApiKey((session.user as any).apiKey || 'No API key found');
      
      // Fetch user-specific data from our API
      fetchUserData();
    }
  }, [status, session, router]);

  // Function to fetch user data from our API
  const fetchUserData = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/user?page=${page}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching user data: ${response.statusText}`);
      }
      
      const data = await response.json();
      setUserData(data);
      setCurrentPage(data.currentPage);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch user data:', err);
      setError('Failed to load your dashboard data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to copy API key to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('API key copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  // Function to generate a new API key
  const generateNewApiKey = async () => {
    try {
      setIsGeneratingKey(true);
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error generating API key: ${response.statusText}`);
      }
      
      const data = await response.json();
      setApiKey(data.apiKey);
      alert('New API key generated successfully!');
    } catch (err: any) {
      console.error('Failed to generate new API key:', err);
      alert('Failed to generate new API key. Please try again later.');
    } finally {
      setIsGeneratingKey(false);
    }
  };

  // Function to handle pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= userData.totalPages) {
      fetchUserData(newPage);
    }
  };

  // Format date to relative time (e.g., "2 hours ago")
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  if (isLoading && !userData.recentMatches.length) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Loading your dashboard...</h2>
          <div className="mt-4 w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => fetchUserData()}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Generate pagination items
  const paginationItems = [];
  for (let i = 1; i <= userData.totalPages; i++) {
    if (
      i === 1 || 
      i === userData.totalPages || 
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      paginationItems.push(i);
    } else if (
      (i === 2 && currentPage > 3) || 
      (i === userData.totalPages - 1 && currentPage < userData.totalPages - 2)
    ) {
      paginationItems.push('ellipsis');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Circuit Dashboard</h1>
          <div className="flex items-center">
            <span className="mr-4 text-gray-600">
              Welcome, {session?.user?.name || session?.user?.email || 'User'}
            </span>
            <button 
              onClick={() => router.push('/api/auth/signout')}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>
      
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Your Total Matches
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {userData.stats.totalMatches}
                  </dd>
                </dl>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Your API Usage
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {userData.stats.apiUsage.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Your Average Match Quality
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {userData.stats.averageMatchQuality}%
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          
          {/* API Keys */}
          <div className="mb-8 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Your API Keys
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Your personal API key for integrating with Circuit.
                </p>
              </div>
              <button
                type="button"
                onClick={generateNewApiKey}
                disabled={isGeneratingKey}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${isGeneratingKey ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isGeneratingKey ? 'Generating...' : 'Generate New Key'}
              </button>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Your API Key
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex items-center">
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded mr-2 overflow-x-auto max-w-xs">
                        {apiKey}
                      </span>
                      <button 
                        onClick={() => copyToClipboard(apiKey || '')}
                        className="text-indigo-600 hover:text-indigo-900 whitespace-nowrap"
                      >
                        Copy
                      </button>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          
          {/* Recent Matches */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Your Recent Matches
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Your most recent matching requests.
              </p>
            </div>
            {isLoading && (
              <div className="flex justify-center items-center py-8">
                <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
              </div>
            )}
            {!isLoading && userData.recentMatches.length === 0 ? (
              <div className="px-4 py-6 text-center text-gray-500">
                You haven't created any matches yet.
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {userData.recentMatches.map((match) => (
                  <li key={match.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          Your Match #{match.id.split('-').pop()}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {match.status}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {match.details}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>
                            Created {formatRelativeTime(match.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === userData.totalPages}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === userData.totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{' '}
                    <span className="font-medium">{userData.recentMatches.length}</span> of{' '}
                    <span className="font-medium">{userData.totalMatchCount}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {userData.totalPages <= 5 ? (
                      // Show all pages if there are 5 or fewer
                      Array.from({ length: userData.totalPages }).map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => handlePageChange(i + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === i + 1
                              ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))
                    ) : (
                      // Show pagination with ellipsis for more than 5 pages
                      <>
                        <button
                          onClick={() => handlePageChange(1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === 1
                              ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          1
                        </button>
                        
                        {currentPage > 3 && (
                          <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            ...
                          </span>
                        )}
                        
                        {currentPage !== 1 && currentPage !== userData.totalPages && (
                          <button
                            className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                          >
                            {currentPage}
                          </button>
                        )}
                        
                        {currentPage < userData.totalPages - 2 && (
                          <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            ...
                          </span>
                        )}
                        
                        {userData.totalPages > 1 && (
                          <button
                            onClick={() => handlePageChange(userData.totalPages)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === userData.totalPages
                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {userData.totalPages}
                          </button>
                        )}
                      </>
                    )}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === userData.totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 ${currentPage === userData.totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 