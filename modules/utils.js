const crypto = require('crypto');

const getId = ({ id = '' }) => crypto.createHash('sha1').update(id.toString()).digest('hex').slice(0, 18);
/* based on realmyst/gist:1262561
   Alexander Shcherbinin */
const declOfNum = (num, titles) => {
  const absNum = Math.abs(num);
  const cases = [0, 1];
  const absNum0 = absNum % 100 > 4 && absNum % 100 < 20;
  const absNumInner = absNum % 10 > 1 ? 1 : 0;
  return titles[absNum0
    ? 0 : cases[(absNum % 10 < 2) ? absNumInner : 1]];
};

const declOfNum3 = (num, titles) => {
  const absNum = Math.abs(num);
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(absNum % 100 > 4 && absNum % 100 < 20) ? 2 : cases[(absNum % 10 < 5) ? absNum % 10 : 5]];
};

const getName = (user) => {
  if (user && user.username) {
    return user.username;
  }
  return `${user.first_name} ${(user.last_name || '')}`;
};

module.exports = {
  getId, getName, declOfNum, declOfNum3
};