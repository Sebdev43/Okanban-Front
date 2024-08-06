import { FetchClass } from '../assets/js/lib/FetchClass.js';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const userCredentials = {
  email: 'testuser1@example.com',
  password: 'TestPassword123!',
};

async function loginUser() {
  fetchMock.mockResponseOnce(JSON.stringify({ csrfToken: 'test-token' }));
  const fetchClass = new FetchClass('http://localhost:5000/token');
  await fetchClass.getCSRFToken();

  fetchMock.mockResponseOnce(
    JSON.stringify({ success: true }),
    {
      headers: {
        'Set-Cookie': 'session=mock-session-token',
      },
    }
  );

  await fetchClass.make('POST');
  await fetchClass.send(userCredentials);

  // Set the session cookie for future requests
  fetchClass.req.headers.set('cookie', 'session=mock-session-token');
  return fetchClass;
}

describe('FetchClass', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches CSRF token successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ csrfToken: 'test-token' }));
    const fetchClass = new FetchClass('http://localhost:5000/token');
    await fetchClass.getCSRFToken();
    expect(fetchClass.token).toBe('test-token');
  });

  it('logs in user successfully', async () => {
    const fetchClass = await loginUser();
    const cookies = fetchClass.req.headers.get('cookie');
    expect(cookies).toContain('session=mock-session-token');
  });

  it('prepares request with CSRF token', async () => {
    const fetchClass = await loginUser();
    fetchMock.mockResponseOnce(JSON.stringify({ csrfToken: 'test-token' }));
    await fetchClass.make('POST', 'http://localhost:5000/test');
    expect(fetchClass.req.headers.get('x-csrf-token')).toBe('test-token');
  });

  it('sends data successfully', async () => {
    const fetchClass = await loginUser();
    fetchMock.mockResponseOnce(JSON.stringify({ data: 'test-data' }));
    await fetchClass.make('POST', 'http://localhost:5000/test');
    const response = await fetchClass.send({ key: 'value' });
    expect(response.data).toBe('test-data');
  });
});
