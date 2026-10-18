import axios from 'axios';
import type {
  FetchPersonsRequest,
  FetchPersonsResponse,
  FetchPersonTotalPagesResponse,
  Person,
} from '../components/types/Person';

export async function fetchPerson(person: number = 1): Promise<Person> {
  const response = await axios.get<Person>(
    `https://swapi.dev/api/people/${person}`,
  );
  return response.data;
}

export async function fetchPersonTotalPages(): Promise<FetchPersonTotalPagesResponse> {
  const response = await axios.get<FetchPersonTotalPagesResponse>(
    'https://swapi.dev/api/people/',
  );
  console.log(response.data);
  return response.data;
}

export async function fetchPersons({ page }: FetchPersonsRequest) {
  const response = await axios.get<FetchPersonsResponse>(
    'https://swapi.dev/api/people/',
    {
      params: { page },
    },
  );
  return response.data;
}
