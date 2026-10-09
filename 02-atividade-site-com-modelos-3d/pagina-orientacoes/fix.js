const fs = require('fs');
let text = fs.readFileSync('src/components/Step3Codes.tsx', 'utf8');
text = text.replace(/Cont\\ufffdm os 4 arquivos/, 'Contém os 4 arquivos');
text = text.replace(/inclu\\ufffddo no download \\ufffd umcê testar a página imediatamente/, 'incluído no download é um modelo demonstrativo para você testar a página imediatamente');
text = text.replace(/substitu\\ufffd-lo/, 'substituí-lo');
fs.writeFileSync('src/components/Step3Codes.tsx', text, 'utf8');
