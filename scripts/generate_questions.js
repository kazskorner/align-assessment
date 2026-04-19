const fs = require('fs');

const questionsData = JSON.parse(fs.readFileSync('/Users/adamkazinec/.gemini/antigravity/brain/013d7a00-cc4d-425a-acad-6844867a3e62/.system_generated/steps/192/output.txt', 'utf8'));
const optionsData = JSON.parse(fs.readFileSync('/Users/adamkazinec/.gemini/antigravity/brain/013d7a00-cc4d-425a-acad-6844867a3e62/.system_generated/steps/200/output.txt', 'utf8'));

questionsData.sort((a, b) => a.sort_order - b.sort_order);

let output = 'export const QUESTIONS = [\n';

let currentBlock = -1;

for (const q of questionsData) {
  if (q.block !== currentBlock) {
    output += `  // Block ${q.block} — ${q.block_label}\n`;
    currentBlock = q.block;
  }
  
  let optionsStr = '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]';
  let extra = '';
  
  if (q.type !== 'likert') {
    const opts = optionsData.filter(o => o.question_id === q.id).sort((a, b) => a.sort_order - b.sort_order);
    if (opts.length > 0) {
      if (q.type === 'dropdown' || q.id === 'q36') {
        optionsStr = '[]';
        extra = ', isDropdown: true';
      } else {
        optionsStr = '[' + opts.map(o => `"${o.label}"`).join(', ') + ']';
      }
    }
  }

  output += `  { id: ${q.num}, text: "${q.text.replace(/"/g, '\\"')}", options: ${optionsStr}${extra} },\n`;
}

output += '] as const;\n';

fs.writeFileSync('generated_questions.ts', output);
console.log('Done');
