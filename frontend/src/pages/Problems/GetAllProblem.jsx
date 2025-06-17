import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../../lib/axios.js';

const GetAllProblem = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState('All Topics');

    const topics = [
        { id: 'all', name: 'All Topics' },
        { id: 'array', name: 'Array', count: '1934' },
        { id: 'string', name: 'String', count: '797' },
        { id: 'hash-table', name: 'Hash Table', count: '707' },
        { id: 'dp', name: 'Dynamic Programming', count: '597' },
        { id: 'math', name: 'Math', count: '588' }
    ];

    useEffect(() => {
        console.log('Making API request...');
        axiosInstance.get('/auth/problems')
            .then((res) => {
                console.log('API Response:', res.data);
                setProblems(res.data.questions);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching problems:', error.response || error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy':
                return 'bg-[#1a1a1a] text-[#00b8a3] border border-[#00b8a3] hover:bg-[#00b8a3] hover:text-[#1a1a1a]';
            case 'medium':
                return 'bg-[#1a1a1a] text-[#ffc01e] border border-[#ffc01e] hover:bg-[#ffc01e] hover:text-[#1a1a1a]';
            case 'hard':
                return 'bg-[#1a1a1a] text-[#ff375f] border border-[#ff375f] hover:bg-[#ff375f] hover:text-[#1a1a1a]';
            default:
                return 'bg-[#1a1a1a] text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-[#1a1a1a]';
        }
    };

    const getDifficultyText = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy':
                return 'Easy';
            case 'medium':
                return 'Medium';
            case 'hard':
                return 'Hard';
            default:
                return 'Unknown';
        }
    };

    const getDifficultyBgColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy':
                return 'bg-[#00b8a3] bg-opacity-10';
            case 'medium':
                return 'bg-[#ffc01e] bg-opacity-10';
            case 'hard':
                return 'bg-[#ff375f] bg-opacity-10';
            default:
                return 'bg-gray-100';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#1a1a1a] text-white">
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#1a1a1a] text-white">
                <div className="flex justify-center items-center h-screen">
                    <div className="text-red-500">Error: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white">
            <div className="container mx-auto px-4 py-8">
                {/* Topic filters */}
                <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                    {topics.map((topic) => (
                        <button
                            key={topic.id}
                            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                                selectedTopic === topic.name
                                    ? 'bg-[#2cbb5d] text-white'
                                    : 'bg-[#2d2d2d] text-gray-300 hover:bg-[#3e3e3e]'
                            }`}
                            onClick={() => setSelectedTopic(topic.name)}
                        >
                            {topic.name}
                            {topic.count && <span className="ml-2 text-gray-400">{topic.count}</span>}
                        </button>
                    ))}
                </div>

                {/* Problems Table */}
                <div className="bg-[#282828] rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-[#323232]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Difficulty
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                        Acceptance
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {problems.map((problem) => (
                                    <tr key={problem.questionFrontendId} className="hover:bg-[#323232] transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className={`h-4 w-4 rounded-full border ${
                                                    problem.status === 'ac' 
                                                        ? 'bg-[#2cbb5d] border-[#2cbb5d]' 
                                                        : 'border-gray-600'
                                                }`}></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center group">
                                                <span className="text-gray-400 mr-2 group-hover:text-[#2cbb5d]">{problem.questionFrontendId}.</span>
                                                <a href={`https://leetcode.com/problems/${problem.titleSlug}`} 
                                                   target="_blank"
                                                   rel="noopener noreferrer" 
                                                   className="text-[#2cbb5d] hover:text-[#3cc76d] font-medium transition-colors duration-200">
                                                    {problem.title}
                                                </a>
                                                {problem.paidOnly && (
                                                    <span className="ml-2 text-yellow-500 group-hover:text-yellow-400">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    </span>
                                                )}
                                                {problem.hasSolution && (
                                                    <span className="ml-2 text-[#2cbb5d]">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-4 py-[3px] rounded-full text-xs font-medium cursor-pointer transition-all duration-200 ${getDifficultyColor(problem.difficulty)}`}>
                                                {getDifficultyText(problem.difficulty)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                                            {problem.acRate ? `${problem.acRate.toFixed(1)}%` : '0%'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetAllProblem;