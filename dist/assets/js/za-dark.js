/*
  Za Dark – Best Dark Theme for Zalo Web
  Made by NCDAi
  Version 1.2
*/

document.body.classList.add("za-dark-chrome-extension");

console.log('\n');
console.log('Za Dark – Best Dark Theme for Zalo Web');
console.log('Made by NCDAi');
console.log('\n');

chrome.storage.sync.get("theme", ({ theme }) => {
  console.log('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
});
