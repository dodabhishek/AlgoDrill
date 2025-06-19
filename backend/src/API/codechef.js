import axios from 'axios';
import * as cheerio from 'cheerio';

export const fetchCodechefStats = async (req, res) => {
  const username = req.params.username;
  const url = `https://www.codechef.com/users/${username}`;

  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    console.log(html);

    // Extract stars (rank)
    const stars = $('.rating-star').text().trim() || 'Unrated';

    // Extract rating
    const rating = Number($('.rating-number').text().trim()) || 0;

    // Extract fully solved problems
    let fullySolved = 0;
    const fullySolvedText = $('.content h5:contains("Fully Solved")').text();
    if (fullySolvedText) {
      const match = fullySolvedText.match(/Fully Solved:\s*(\d+)/);
      if (match) fullySolved = Number(match[1]);
    }

    // Extract global and country rank
    let globalRank = '';
    let countryRank = '';
    const rankItems = $('section.rating-ranks ul li');
    if (rankItems.length >= 2) {
      globalRank = $(rankItems[0]).text().replace('Global Rank:', '').trim();
      countryRank = $(rankItems[1]).text().replace('Country Rank:', '').trim();
    }

    // ✅ Extract contest history from the rating-table
    const contestHistory = [];
    $('table.rating-table tbody tr').each((index, element) => {
      const tds = $(element).find('td');
      if (tds.length >= 6) {
        const oldRating = parseInt($(tds[4]).text().trim());
        const newRating = parseInt($(tds[5]).text().trim());
        contestHistory.push({
          name: $(tds[0]).text().trim(),
          date: $(tds[1]).text().trim(),
          division: $(tds[2]).text().trim(),
          rank: $(tds[3]).text().trim(),
          oldRating: isNaN(oldRating) ? null : oldRating,
          newRating: isNaN(newRating) ? null : newRating,
          ratingChange: isNaN(oldRating) || isNaN(newRating) ? null : newRating - oldRating
        });
      }
    });


    res.status(200).json({
      username,
      rating,
      rank: stars,
      fullySolved,
      globalRank,
      countryRank,
      contestHistory
    });

  } catch (error) {
    console.error('❌ Failed to fetch CodeChef stats:', error.message);
    return res.status(500).json({
      error: 'Failed to scrape CodeChef profile',
      message: error.message
    });
  }
};
