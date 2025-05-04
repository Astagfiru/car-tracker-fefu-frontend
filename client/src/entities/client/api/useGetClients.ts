import axios from 'axios';

export async function getAllClients() {
  try {
    const response = await axios.get('/clients');

    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const clients = response.data;

    return clients;

  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
}
