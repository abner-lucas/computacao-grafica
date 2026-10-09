const fs = require('fs');
let content = fs.readFileSync('src/components/Step3Codes.tsx', 'utf8');
content = content.replace(/Cont.*m os 5 arquivos na raiz do ZIP/g, 'Contém os 4 arquivos na raiz do ZIP');
content = content.replace(/Os arquivos.*modelo1\.glb.*e.*modelo2\.glb.*inclu.*dos no download s.*o/g, 'O arquivo <code className=\"font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-blue-800\">aviaozinho.glb</code> incluído no download é um');
content = content.replace(/substitu.*-los pelos modelos/g, 'substituí-lo pelos modelos');
content = content.replace(/renderizar.*modelo1\.glb.*e.*modelo2\.glb/g, 'renderizar os arquivos .glb');
content = content.replace(/N.*o altere os nomes dos arquivos.*modelo1\.glb.*e.*modelo2\.glb.*no final do script, para evitar que o carregador falhe\./g, 'Lembre-se de alterar o nome de \"./aviaozinho.glb\" para o nome do seu arquivo real na hora de testar!');
fs.writeFileSync('src/components/Step3Codes.tsx', content, 'utf8');
