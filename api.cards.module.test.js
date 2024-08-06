import { getCardsFromList, createCard, updateCard, deleteCard } from './assets/js/cards/api.cards.module.js';
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

describe('API Cards Module', () => {
  beforeEach(async () => {
    fetchMock.resetMocks();
    await loginUser();
  });

  it('fetches cards successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ id: 1, content: 'Card1', list_id: 1 }]));
    const cards = await getCardsFromList(1);
    expect(cards).toEqual([{ id: 1, content: 'Card1', list_id: 1 }]);
  });

  it('creates a card successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ id: 1, content: 'Card1' }));
    const card = await createCard({ content: 'Card1', list_id: 1 });
    expect(card).toEqual({ id: 1, content: 'Card1' });
  });

  it('updates a card successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ id: 1, content: 'Updated Card' }));
    const card = await updateCard(1, { content: 'Updated Card' });
    expect(card).toEqual({ id: 1, content: 'Updated Card' });
  });

  it('deletes a card successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));
    const response = await deleteCard(1);
    expect(response).toEqual({ success: true });
  });
});
