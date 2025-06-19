import axios from 'axios';
import userProfileQuery from '../GQLQueries/userProfile.js';
import contestQuery from '../GQLQueries/contest.js';

const LEETCODE_GRAPHQL_API = 'https://leetcode.com/graphql';

export const fetchLeetCodeStats = async (req, res) => {
  const username = req.params.username;
  console.log(`Fetching LeetCode stats for: ${username}`);

  const profileBody = {
    query: userProfileQuery.replace('#graphql', ''),
    variables: { username }
  };

  const contestBody = {
    query: contestQuery.replace('#graphql', ''),
    variables: { username }
  };

  try {
    // Parallel fetch
    const [profileRes, contestRes] = await Promise.all([
      axios.post(LEETCODE_GRAPHQL_API, profileBody, {
        headers: {
          'Content-Type': 'application/json',
          'Referer': `https://leetcode.com/${username}/`,
          'User-Agent': 'Mozilla/5.0 (compatible; LeetCodeBot/1.0)'
        }
      }),
      axios.post(LEETCODE_GRAPHQL_API, contestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Referer': `https://leetcode.com/${username}/`,
          'User-Agent': 'Mozilla/5.0 (compatible; LeetCodeBot/1.0)'
        }
      })
    ]);

    const profileData = profileRes.data.data;
    const contestData = contestRes.data.data;

    if (!profileData || !profileData.matchedUser) {
      return res.status(404).json({ error: 'User not found or no public profile.' });
    }

    const profile = profileData.matchedUser.profile;
    const submitStats = profileData.matchedUser.submitStats;
    const allQuestionsCount = profileData.allQuestionsCount;
    const recentSubmissions = profileData.recentSubmissionList;

    const stats = {
      username: profileData.matchedUser.username,
      realName: profile.realName,
      avatar: profile.userAvatar,
      ranking: profile.ranking,
      reputation: profile.reputation,
      totalSolved: submitStats.acSubmissionNum.reduce((sum, d) => sum + d.count, 0),
      totalQuestions: allQuestionsCount.reduce((sum, d) => sum + d.count, 0),
      solvedByDifficulty: submitStats.acSubmissionNum.map(d => ({
        difficulty: d.difficulty,
        count: d.count
      })),
      totalByDifficulty: allQuestionsCount.map(d => ({
        difficulty: d.difficulty,
        count: d.count
      })),
      recentSubmissions: recentSubmissions.map(sub => ({
        title: sub.title,
        slug: sub.titleSlug,
        url: `https://leetcode.com/problems/${sub.titleSlug}/`,
        timestamp: sub.timestamp,
        lang: sub.lang,
        status: sub.statusDisplay
      })),
      submissionCalendar: profileData.matchedUser.submissionCalendar,
      contestRanking: contestData.userContestRanking,
      contestHistory: contestData.userContestRankingHistory
    };

    return res.status(200).json(stats);

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: `Failed to fetch LeetCode stats. ${error.message}` });
  }
};
