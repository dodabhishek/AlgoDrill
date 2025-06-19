import express from 'express';
import { fetchAtcoderContestHistory } from '../API/atcoder.js';
import { fetchCodeforcesStats } from '../API/codeforces.js';
import { fetchCodechefStats } from '../API/codechef.js';
import { fetchGFGStats } from '../API/gfg.js';
import { fetchLeetCodeStats } from '../API/leetcode.js';

const router = express.Router();

router.get('/gfg/:username', fetchGFGStats);
router.post('/leetcode/:username', fetchLeetCodeStats);
router.post('/codeforces/:username', fetchCodeforcesStats);
router.get('/atcoder/:username', fetchAtcoderContestHistory);
router.get('/codechef/:username', fetchCodechefStats);

export default router;