import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Razorpay from 'razorpay';

admin.initializeApp();

const razorpay = new Razorpay({
  key_id: 'YOUR_KEY_ID',
  key_secret: 'YOUR_KEY_SECRET',
});

// Define the shape of your input data
interface OrderData {
  amount: number;
  currency: string;
  receipt?: string;
}

export const createOrder = functions.https.onCall(
  async (request: functions.https.CallableRequest<OrderData>, context) => {
    const { amount, currency, receipt } = request.data;

    if (!amount || !currency) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Amount and currency are required'
      );
    }

    const options = {
      amount: amount * 100, // in paise
      currency: currency,
      receipt: receipt || 'receipt_' + new Date().getTime(),
    };

    const order = await razorpay.orders.create(options);
    return order;
  }
);
