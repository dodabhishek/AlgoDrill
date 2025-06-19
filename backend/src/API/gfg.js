import axios from 'axios';
import * as cheerio from 'cheerio';

export const fetchGFGStats = async (req,res) => {
  const username = req.params.username;
  console.log(`fetching gfg stats for ${username}`);
  const BASE_URL = `https://auth.geeksforgeeks.org/user/${username}/practice/`;

  try {
    const { data: html } = await axios.get(BASE_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const $ = cheerio.load(html);

    // Extract embedded JSON data from script tag
    const scriptTag = $("script#__NEXT_DATA__[type='application/json']");
    if (!scriptTag.length) {
      return { error: 'Could not find embedded user data.' };
    }

    let jsonData;
    try {
      jsonData = JSON.parse(scriptTag.html());
    } catch {
      return { error: 'Failed to parse JSON data from script tag.' };
    }

    const user_info = jsonData?.props?.pageProps?.userInfo;
    const user_submissions = jsonData?.props?.pageProps?.userSubmissionsInfo;

    if (!user_info || !user_submissions) {
      return { error: 'Incomplete user data found in GFG profile.' };
    }

    // Basic user profile
    const generalInfo = {
      userName: username,
      fullName: user_info.name || '',
      profilePicture: user_info.profile_image_url || '',
      institute: user_info.institute_name || '',
      instituteRank: user_info.institute_rank || '',
      currentStreak: user_info.pod_solved_longest_streak || '0',
      maxStreak: user_info.pod_solved_global_longest_streak || '0',
      codingScore: user_info.score || 0,
      monthlyScore: user_info.monthly_score || 0,
      totalProblemsSolved: user_info.total_problems_solved || 0,
    };

    // Solved problems stats by difficulty
    const solvedStats = {};
    for (const [difficulty, problems] of Object.entries(user_submissions)) {
      const questions = Object.values(problems).map(details => ({
        question: details.pname,
        questionUrl: `https://practice.geeksforgeeks.org/problems/${details.slug}`,
      }));

      solvedStats[difficulty.toLowerCase()] = {
        count: questions.length,
        questions,
      };
    }
    res.status(200).json({
      info: generalInfo,
      solvedStats,
    });

    return {
      info: generalInfo,
      solvedStats,
    };
  } catch (error) {
    console.error('❌ GFG Scrape Error:', error.message);
    return { error: 'Failed to fetch or process GFG data.' };
  }
}
