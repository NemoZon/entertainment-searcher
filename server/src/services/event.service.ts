import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.AWS_API_URL!;
const API_TOKEN = process.env.AWS_API_TOKEN!;

export const fetchExternalEvents = async (body: any) => {
  // console.log(body)
  const response = await axios.post(
    API_URL,
    body,
    {
      headers: {
        'x-api-key': API_TOKEN,
      },
    }
  );
  // console.log(response.data)
  return response.data;
};
