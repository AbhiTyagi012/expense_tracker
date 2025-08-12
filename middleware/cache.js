// const Client = require('../config/');

// exports.get = async (key) => {
//   try {
//     const v = await Client.get(key);
//     return v;
//   } catch (err) {
//     return null;
//   }
// };

// exports.set = async (key, value, ttl = 900) => {
//   try {
//     if (ttl) await Client.setEx(key, ttl, value);
//     else await Client.set(key, value);
//     return true;
//   } catch (err) {
//     return false;
//   }
// };

// exports.del = async (key) => {
//   try {
//     await Client.del(key);
//     return true;
//   } catch (err) {
//     return false;
//   }
// };

// exports.invalidateUserAnalytics = async (userId) => {
//   try {
//     const keys = await Client.keys(`analytics:*:${userId}`);
//     if (keys.length) await Client.del(keys);
//     return true;
//   } catch (err) {
//     return false;
//   }
// };
