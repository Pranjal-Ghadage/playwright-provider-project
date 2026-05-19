const email = `anjali${Date.now()}@test.com`;

const mobile = `98${Math.floor(Math.random() * 100000000)}`;

const aadhar = `${Math.floor(
  100000000000 + Math.random() * 900000000000
)}`;

module.exports = {
  email,
  mobile,
  aadhar,
};