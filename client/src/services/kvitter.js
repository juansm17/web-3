import axios from 'axios';
const BASE_URL = 'http://localhost:4040/api/tweets';

/*****
 * Makes a request to kvitter API and fetches all kvitters from database
 * Parameters: none
 * Return: returns an array of kvitters
 *****/

export const getAllKvitter = async () => {
  try {
    const response = await axios.get(BASE_URL);
    console.log(response.data);
    return {
      data: response.data,
      error: null
    }
  } catch(error) {
    console.error(error);
    return {
      data: null,
      error: error.message
    }
  }
}