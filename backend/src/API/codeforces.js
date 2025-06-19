import axios from 'axios';

const CODEFORCES_API = 'https://codeforces.com/api';

export const fetchCodeforcesStats = async (req, res) => {
  const username = req.params.username;
  console.log(`📊 Fetching Codeforces stats for: ${username}`);

  try {
    // 1. Fetch user profile
    const { data: userData } = await axios.get(`${CODEFORCES_API}/user.info`, {
      params: { handles: username }
    });

    if (userData.status !== 'OK') {
      return res.status(404).json({ error: 'User not found on Codeforces.' });
    }

    const user = userData.result[0];

    // 2. Fetch user contest history
    const { data: contestData } = await axios.get(`${CODEFORCES_API}/user.rating`, {
      params: { handle: username }
    });

    if (contestData.status !== 'OK') {
      return res.status(500).json({ error: 'Failed to fetch contest history.' });
    }

    const contestHistory = contestData.result.map((entry) => ({
      contestId: entry.contestId,
      contestName: entry.contestName,
      rank: entry.rank,
      oldRating: entry.oldRating,
      newRating: entry.newRating,
      ratingChange: entry.newRating - entry.oldRating,
      time: new Date(entry.ratingUpdateTimeSeconds * 1000).toLocaleString(),
    }));

    // ✅ Build the final response
    const profile = {
      handle: user.handle,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      country: user.country || '',
      organization: user.organization || '',
      rating: user.rating || 'Unrated',
      rank: user.rank || 'Unrated',
      maxRating: user.maxRating || null,
      maxRank: user.maxRank || null,
      contribution: user.contribution,
      friendOfCount: user.friendOfCount,
      avatar: user.avatar,
      registrationTime: new Date(user.registrationTimeSeconds * 1000).toLocaleString()
    };

    return res.status(200).json({
      profile,
      contestHistory
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    return res.status(500).json({ error: `Failed to fetch Codeforces stats: ${error.message}` });
  }
};
