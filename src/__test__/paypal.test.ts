// @vitest-environment node
import { generateAccessToken } from '../lib/paypal';

//Test for check access token from Paypal

test('generateAccessToken returns a valid access token', async () => {
  const tokenResponse = await generateAccessToken();

  expect(typeof tokenResponse).toBe('string');
  expect(tokenResponse.length).toBeGreaterThan(0);
});
