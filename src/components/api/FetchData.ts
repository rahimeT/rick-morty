import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'https://rickandmortyapi.com/api';

interface IQuery {
  query: string;
}

const FetchMainData = async (endpoint: string, page: number) => {
  const url = endpoint
    ? `${API_BASE_URL}/${endpoint}/?page=${page}`
    : API_BASE_URL;

  try {
    const response = await axios.get(url);
    return response?.data?.results;
  } catch (error: any) {
    throw new Error('Failed to fetch data', error);
  }
};

const FetchQueryData = async (endpoint: string, query: IQuery) => {
  const url = query
    ? `${API_BASE_URL}/${endpoint}=${query?.query}`
    : API_BASE_URL;

  try {
    const response = await axios.get(url);
    return response?.data?.results;
  } catch (error: any) {
    throw new Error('Failed to fetch data', error);
  }
};

export { FetchMainData, FetchQueryData };
