import { getTagsFromAPI, createTag, updateTag, deleteTag } from './assets/js/tags/api.tags.module.js';
import fetchMock from 'jest-fetch-mock';
import { FetchClass } from './assets/js/lib/FetchClass.js';

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
}

describe('API Tags Module', () => {
  beforeEach(async () => {
    fetchMock.resetMocks();
    await loginUser();
  });

  it('fetches tags successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ id: 1, name: 'Tag1' }]));
    const tags = await getTagsFromAPI();
    expect(tags).toEqual([{ id: 1, name: 'Tag1' }]);
  });

  it('creates a tag successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ id: 1, name: 'Tag1' }));
    const tag = await createTag({ name: 'Tag1' });
    expect(tag).toEqual({ id: 1, name: 'Tag1' });
  });

  it('updates a tag successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ id: 1, name: 'Updated Tag' }));
    const tag = await updateTag(1, { name: 'Updated Tag' });
    expect(tag).toEqual({ id: 1, name: 'Updated Tag' });
  });

  it('deletes a tag successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));
    const response = await deleteTag(1);
    expect(response).toEqual({ success: true });
  });
});
