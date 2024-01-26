const fs = require('fs');

function corrigirArquivo(nomeArquivoEntrada, nomeArquivoSaida, caracteresEspeciais) {
    const rawData = fs.readFileSync(nomeArquivoEntrada);
    const data = JSON.parse(rawData);

    const correctedData = data.map(item => {
        const correctedItem = correcaoEspecifica(item, caracteresEspeciais);
        return correctedItem;
    });

    const correctedJson = JSON.stringify(correctedData, null, 2);
    fs.writeFileSync(nomeArquivoSaida, correctedJson);

    console.log(`Arquivo ${nomeArquivoSaida} gerado com sucesso.`);
}

function correcaoEspecifica(item, caracteresEspeciais) {
    const correctedItem = { ...item };

    for (const [character, replacement] of caracteresEspeciais) {
        for (const key in correctedItem) {
            if (typeof correctedItem[key] === 'string') {
                correctedItem[key] = correctedItem[key].replace(new RegExp(character, 'g'), replacement);

                // Converter números no formato de string para number, exceto para a variável 'nome'
                if (!isNaN(correctedItem[key]) && key !== 'nome') {
                    correctedItem[key] = parseFloat(correctedItem[key]);
                }
            }
        }
    }

    return correctedItem;
}

// Corrigir o primeiro arquivo
corrigirArquivo('broken_database_1.json', 'corrigido_banco_1.json', [
    ['ø', 'o'],
    ['æ', 'a'],
]);

// Corrigir o segundo arquivo
corrigirArquivo('broken_database_2.json', 'corrigido_banco_2.json', [
    ['æ', 'a'],
    ['ø', 'o'],
]);

console.log('Correções concluídas nos dois arquivos.');
