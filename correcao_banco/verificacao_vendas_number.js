const fs = require('fs');

function verificarVendasNoArquivo(nomeArquivo) {
    const rawData = fs.readFileSync(nomeArquivo);
    const data = JSON.parse(rawData);

    const linhasComVendasInvalidas = data.filter((item, index) => {
        if (typeof item.vendas === 'string' && isNaN(item.vendas)) {
            return true;
        }
        return false;
    });

    if (linhasComVendasInvalidas.length > 0) {
        const mensagemErro = `Foram encontradas vendas em formato de string no arquivo ${nomeArquivo} nas seguintes linhas:\n\n`;
        const linhasInvalidasTexto = linhasComVendasInvalidas.map((item, index) => `Linha ${index + 1}: ${JSON.stringify(item)}`).join('\n');
        
        const arquivoErro = mensagemErro + linhasInvalidasTexto;
        fs.writeFileSync('erro_vendas.txt', arquivoErro);
        
        console.log(`Algumas linhas em ${nomeArquivo} contêm valores inválidos em 'vendas'. As informações foram salvas em 'erro_vendas.txt'.`);
    } else {
        console.log(`Todas as vendas no arquivo ${nomeArquivo} estão no formato correto (number).`);
    }
}

// Verificar vendas no primeiro arquivo corrigido
verificarVendasNoArquivo('corrigido_banco_1.json');
