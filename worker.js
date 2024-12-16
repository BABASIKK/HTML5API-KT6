self.onmessage = function(e) {
    const number = parseInt(e.data, 10);
    if (isNaN(number)) {
        self.postMessage('Ошибка: Введено не число');
        return;
    }

    // Сложные вычисления (факториал)
    let result = 1;
    for (let i = 1; i <= number; i++) {
        result *= i;
    }

    self.postMessage(result);
};
