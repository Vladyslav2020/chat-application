function generateRandomText(length){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    const charsLength = characters.length;
    let text = '';
    for (let i = 0; i < length; i++){
        text += characters[Math.floor(Math.random() * charsLength)];
    }
    return text;
}

module.exports = generateRandomText;