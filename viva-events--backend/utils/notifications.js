// utils/notifications.js
const admin = require('firebase-admin');

// initialize Firebase Admin مرة وحدة في app.js
// admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const sendNotification = async (fcmToken, title, body) => {
    try {
        await admin.messaging().send({
            token: fcmToken,
            notification: { title, body },
            webpush: {
                notification: {
                    icon: '/logo.png',
                    badge: '/badge.png'
                }
            }
        });
    } catch (error) {
        console.error('Send notification error:', error);
    }
};

// استخدام في ordersController.js لما ييجي أوردر جديد:
// await sendNotification(adminUser.fcmToken, 'New Order!', `Order #${order._id} received`);

module.exports = { sendNotification };