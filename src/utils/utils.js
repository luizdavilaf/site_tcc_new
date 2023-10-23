function generateSequentialColors(num) {
    const predefinedColors = [
        'rgba(33, 150, 243, 0.6)',    // Azul
        'rgba(192, 192, 192, 0.6)',   // Cinza                                
        'rgba(255, 0, 0, 0.6)',      // Vermelho
        'rgba(255, 165, 0, 0.6)',    // Laranja
        'rgba(0, 255, 0, 0.6)',      // Verde
        'rgba(0, 0, 255, 0.6)',      // Azul
        'rgba(0, 128, 128, 0.6)',    // Verde-azulado
        'rgba(255, 0, 255, 0.6)',    // Magenta
        'rgba(0, 128, 0, 0.6)',      // Verde escuro
        'rgba(64, 0, 128, 0.6)',     // Roxo escuro
        'rgba(128, 0, 64, 0.6)',     // Vermelho mais escuro
        'rgba(128, 128, 0, 0.6)',    // Verde-oliva
        'rgba(64, 128, 128, 0.6)',   // Azul mais escuro
        'rgba(192, 0, 192, 0.6)',    // Roxo mais escuro
        'rgba(192, 192, 0, 0.6)',    // Amarelo-oliva
        'rgba(128, 0, 0, 0.6)',      // Vermelho mais escuro
        'rgba(128, 128, 192, 0.6)',  // Azul mais claro
        'rgba(0, 192, 192, 0.6)'     // Verde mais claro
    ];

    const index = num % predefinedColors.length; // Loop através das cores
    const selectedColor = predefinedColors[index];
    return selectedColor

}

module.exports = {
    generateSequentialColors
}