import axios from 'axios';

export const submitURL = async (req, res) => {
  const { leetcodeSession, csrfToken } = req.body;

  const query = {
    query: `query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
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
    }`,
    variables: {
      categorySlug: "",
      skip: 0,
      limit: 2000,
      filters: { status: "AC" }
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
          'Cookie': `LEETCODE_SESSION=${leetcodeSession}; csrftoken=${csrfToken};`
        }
      }
    );
    // Use the correct path to questions
    const questions = response?.data?.data?.problemsetQuestionList?.questions || [];
    console.log(questions);
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching problems:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
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