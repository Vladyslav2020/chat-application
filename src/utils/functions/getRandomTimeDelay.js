function getRandomTimeDelay(minValue = 0, maxValue = 100000){
    return Math.floor(Math.random() * (maxValue - minValue) + minValue);
}

module.exports = getRandomTimeDelay;