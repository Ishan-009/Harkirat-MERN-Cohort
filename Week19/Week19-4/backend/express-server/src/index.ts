import express from 'express';
import { createClient } from 'redis';

const app = express();
app.use(express.json());

const client = createClient();

app.post('/submit', async (req, res) => {
  const { problemId, userId, code, language } = req.body;
  try {
    await client.lPush(
      'submissions',
      JSON.stringify({ problemId, userId, code, language })
    );

    res.json({ message: 'Submission Received Successfully', status: 200 });
  } catch (error) {
    console.log(error);
    res.json({
      message: 'Something Wrong Occurred on Server Side',
      status: 500,
    });
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log('Connected to Redis');

    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  } catch (error) {
    console.error('Failed to connect to Redis', error);
  }
}

startServer();
