console.log('starting pre-commit');

const fs = require('fs');
const filename = 'README.md';

fs.readFile(filename, 'utf8', (err, data) => {
  if (err) throw err;
  console.log('Sorting: ' + filename);
  const matchListToArray = /^\*[^]+?(?=^\*)|^\*[^]+/gms;
  const matchFullList = /____((?:.*\r?\n?)*)____/;
  const selectedList = data.match(matchListToArray);
  selectedList.sort((a, b) => a.localeCompare(b));
  let sortedList = selectedList
    .toString()
    .replace(/[,]+/g, "")
    .replace(/[____]+/g, "")
    .trim();
  sortedList = '____\n'.concat(sortedList, '\n____');
  const fullySorted = data.replace(matchFullList, sortedList);
  console.log('List has been sorted');
  fs.writeFile(filename, fullySorted, (err) => {
    if (err) throw err;
    console.log('README.md saved');
  });
});