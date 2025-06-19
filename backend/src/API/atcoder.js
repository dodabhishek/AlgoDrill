import axios from 'axios';
import * as cheerio from 'cheerio';

export const fetchAtcoderContestHistory = async (req, res) => {
  const username = req.params.username;
  const url = `https://atcoder.jp/users/${username}/history`;

  try {
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    });

    const $ = cheerio.load(html);
    const history = [];

    $('table tbody tr').each((index, element) => {
      const cells = $(element).find('td');

      if (cells.length >= 7) {
        const contestName = $(cells[0]).text().trim();
        const contestLink = `https://atcoder.jp${$(cells[0]).find('a').attr('href')}`;
        const date = $(cells[1]).text().trim();
        const rank = $(cells[2]).text().trim();
        const performance = $(cells[3]).text().trim();
        const oldRating = $(cells[4]).text().trim();
        const newRating = $(cells[5]).text().trim();
        const diff = $(cells[6]).text().trim();

        history.push({
          contestName,
          contestLink,
          date,
          rank: parseInt(rank),
          performance: parseInt(performance),
          oldRating: parseInt(oldRating),
          newRating: parseInt(newRating),
          diff,
        });
      }
    });

    return res.status(200).json({
      username,
      contestHistory: history,
    });
  } catch (error) {
    console.error('❌ Failed to fetch AtCoder contest history:', error.message);
    return res.status(500).json({
      error: 'Failed to scrape AtCoder contest history',
      message: error.message,
    });
  }
};
