const fs = require('fs');
const path = require('path');

// Test to parse frontmatter
const file = fs.readFileSync('/Users/alexander/Desktop/min-test-sajt/src/content/sidor/kapitello.md', 'utf8');
console.log('File content (first 200 chars):');
console.log(file.substring(0, 200));
console.log('\n---\n');

// Check for special characters
const frontmatterMatch = file.match(/^---\n([\s\S]*?)\n---/);
if (frontmatterMatch) {
  console.log('Frontmatter found:');
  console.log(frontmatterMatch[1]);
  console.log('\n---\n');
  console.log('Byte representation:');
  console.log(Buffer.from(frontmatterMatch[1]).toString('hex').match(/.{1,2}/g).join(' '));
}
