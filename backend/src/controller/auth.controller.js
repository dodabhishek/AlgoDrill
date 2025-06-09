import axios from 'axios';

export const contestCalender = async (req, res) => {
  console.log(`Request coming in contestCalender`);
  
  const CLIST_USERNAME = 'dodabhishek';
  const CLIST_API_KEY = '226effbf622f821427cd781fc70d51decf71536e';
  console.log(`${CLIST_USERNAME}  ${CLIST_API_KEY}`);
  
    const allowedHosts = [
    'leetcode.com',
    'atcoder.jp',
    'codechef.com',
    'codeforces.com',
    'geeksforgeeks.org'
  ];

  try {
    const calenderResult = await axios.get('https://clist.by/api/v4/contest/', {
      params: {
        username: CLIST_USERNAME,
        api_key: CLIST_API_KEY,
        order_by: 'start',
        upcoming: true
      }
    });

      // <-- corrected here

    const filtered = [];
    for(const contest of calenderResult.data.objects){
      if(allowedHosts.includes(contest.host)){
        filtered.push(contest);
      }
    }
    console.log(filtered)

    res.json(filtered);
    // res.json(`found data`);

  } catch (error) {
    if (error.response) {
      console.error('API error response:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received from Clist API:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    res.status(500).json({ error: "Failed to fetch contests" });
  }
};



export const submitURL = async (req, res) => {
  const { leetcodeSession, csrfToken } = req.body;

  if (!leetcodeSession || !csrfToken) {
    return res.status(400).json({ error: 'Missing LeetCode session or CSRF token' });
  }

  const query = {
    query: `
      query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
        problemsetQuestionList: questionList(categorySlug: $categorySlug, limit: $limit, skip: $skip, filters: $filters) {
          total: totalNum
          questions: data {
            acRate
            difficulty
            frontendQuestionId: questionFrontendId
            status
            title
            titleSlug
            topicTags { name id slug }
          }
        }
      }
    `,
    variables: {
      categorySlug: "", // You can change this to "algorithms", etc.
      skip: 0,
      limit: 2000, // Max questions to fetch
      filters: {
        status: "AC" // Only accepted questions
      }
    }
  };

  try {
    const response = await axios.post(
      'https://leetcode.com/graphql',
      query,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
          'Referer': 'https://leetcode.com/problemset/all/',
          'Origin': 'https://leetcode.com',
          'Cookie': `LEETCODE_SESSION=${leetcodeSession}; csrftoken=${csrfToken};`
        }
      }
    );

    const questions = response?.data?.data?.problemsetQuestionList?.questions || [];
    res.status(200).json({ total: questions.length, questions });
  } catch (error) {
    console.error('❌ Error fetching problems from LeetCode:', error?.response?.data || error.message);
    res.status(500).json({ error: error?.response?.data || error.message });
  }
};


// ...signup and login controllers unchanged...

export const signup = async (req, res) => {
  console.log(`signup controller`);
  const { name, email, password } = req.body;
  try {
    if (!email || !name || !password) {
      return res.status(400).json({ message: `All fields are mandatory to fill` });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
      name
    });

    if (newUser) {
      generatetoken(newUser, res);
      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(`Error in signup controller ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields are required to fill' });
  res.json({ message: `signup controller` });
  console.log(`login controller`);
};