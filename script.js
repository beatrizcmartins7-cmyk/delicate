// Dicionário de cores
const coresDisponiveis = {
    'rosa': '#FF69B4',
    'marrom': '#8B4513',
    'verde': '#228B22',
    'azul': '#4169E1',
    'amarelo': '#FFD700',
    'laranja': '#FF8C00',
    'roxo': '#9370DB',
    'preto': '#000000',
    'branco': '#FFFFFF',
    'vermelho': '#DC143C',
    'cinza': '#808080',
    'bege': '#d8c9b1ff',
};

// Função para detectar todas as cores no texto
function detectarCores(texto) {
    const textoMinusculo = texto.toLowerCase();
    const coresEncontradas = [];
    
    for (let cor in coresDisponiveis) {
        if (textoMinusculo.includes(cor)) {
            coresEncontradas.push(coresDisponiveis[cor]);
        }
    }
    
    return coresEncontradas;
}

// Função para remover palavras de cor do texto
function removerCoresDoTexto(texto) {
    let textoLimpo = texto;
    
    for (let cor in coresDisponiveis) {
        const regex = new RegExp(cor, 'gi');
        textoLimpo = textoLimpo.replace(regex, '').trim();
    }
    
    // Limpar espaços duplos e barras extras
    textoLimpo = textoLimpo.replace(/\s+/g, ' ').replace(/\/\s*\//g, '/').trim();
    
    return textoLimpo;
}

// Abrir o modal
function abrirModal(foto) {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('fotoModal').src = foto.src;
    
    const legenda = document.getElementById('legenda');
    const textoOriginal = foto.alt;
    const coresDetectadas = detectarCores(textoOriginal);
    const textoSemCores = removerCoresDoTexto(textoOriginal);
    
    // Criar legenda com marcadores de cor
    if (coresDetectadas.length > 0) {
        const marcadores = coresDetectadas.map(cor => 
            `<span class="marcador-cor" style="background-color: ${cor};"></span>`
        ).join('');
        
        legenda.innerHTML = `
            ${marcadores}
            <span>${textoSemCores}</span>
        `;
    } else {
        legenda.innerHTML = textoSemCores;
    }
}

// Fechar o modal
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

// Fechar com ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        fecharModal();
    }
});