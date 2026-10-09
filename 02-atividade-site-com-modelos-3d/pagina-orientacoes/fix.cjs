const fs = require('fs');
let text = fs.readFileSync('src/components/Step3Codes.tsx', 'utf8');
text = text.replace(/Cont\\ufffdm/g, 'Contém');
text = text.replace(/inclu\\ufffddo no download \\ufffd umcê testar a página imediatamente/g, 'incluído no download é um modelo demonstrativo para você testar a página imediatamente');
text = text.replace(/substitu\\ufffd-lo/g, 'substituí-lo');
fs.writeFileSync('src/components/Step3Codes.tsx', text, 'utf8');
