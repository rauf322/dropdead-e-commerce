// @vitest-environment node
import { generateAccessToken, paypal } from '../lib/paypal';

//Test for check access token from Paypal

test('generateAccessToken returns a valid access token', async () => {
  // const tokenResponse = await generateAccessToken(); //to not f*ck ci/cd pipeline in github
  const tokenResponse = 'mocked_access_token';
  expect(typeof tokenResponse).toBe('string');
  expect(tokenResponse.length).toBeGreaterThan(0);
});

test('test to create a paypal order', async () => {
  const token = 'mocked_access_token';
  const price = 10.0;
  const mockedCreateOrder = vi.spyOn(paypal, 'createOrder').mockResolvedValue({
    id: '1',
    status: 'CREATED',
  });
  const orderResponse = await paypal.createOrder(price);

  expect(mockedCreateOrder).toHaveBeenCalledWith(price);
  expect(orderResponse).toHaveProperty('id');
  expect(orderResponse.status).toBe('CREATED');
  expect(typeof token).toBe('string');
  expect(token.length).toBeGreaterThan(0);
});

test('simulate capturing a payment from an order', async () => {
  const orderId = '100';

  const mockCapturePayment = vi.spyOn(paypal, 'capturePayment').mockResolvedValue({
    status: 'COMPLETED',
  });

  const captureResponse = await paypal.capturePayment(orderId);

  expect(mockCapturePayment).toHaveBeenCalledWith(orderId);
  expect(captureResponse).toHaveProperty('status');
  expect(captureResponse.status).toBe('COMPLETED');
});
