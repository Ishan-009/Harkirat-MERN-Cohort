import { createClient } from 'redis';

const client = createClient({
  url: 'redis://localhost:6379', // Explicitly set Redis URL
});

interface Submission {
  problemId: number;
  userId: number;
  code: string;
  language: string;
}

async function processSubmission(submission: string) {
  const { problemId, code, language }: Submission = JSON.parse(submission);

  console.log(`Processing submission for problemId ${problemId}...`);
  console.log(`Code: ${code}`);
  console.log(`Language: ${language}`);
  // Here you would add your actual processing logic

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`Finished processing submission for problemId ${problemId}.`);
}

async function startWorker() {
  try {
    await client.connect();
    console.log('Worker connected to Redis.');

    // Main loop
    while (true) {
      try {
        console.log('Waiting for new submission...');
        const submission = await client.brPop('submissions', 0);
        if (submission) {
          console.log('Received new submission');

          await processSubmission(submission?.element);
        }
      } catch (error) {
        console.error('Error processing submission:', error);
      }
    }
  } catch (error) {
    console.error('Failed to connect to Redis', error);
  } finally {
    await client.quit();
  }
}

startWorker().catch(console.error);
