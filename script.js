// Навигация по истории браузера
document.getElementById('backButton').addEventListener('click', function() {
    window.history.back();
});

document.getElementById('forwardButton').addEventListener('click', function() {
    window.history.forward(); 
});

document.getElementById('backButton').addEventListener('click', function() {
    history.pushState({ page: 'page1' }, 'Page 1', '#page1'); 
});

document.getElementById('forwardButton').addEventListener('click', function() {
    history.pushState({ page: 'page2' }, 'Page 2', '#page2'); 
});

window.addEventListener('popstate', function(event) {
    if (event.state) {
        alert('Навигация к состоянию: ' + event.state.page);
    }
});

// Canvas анимация , код не мой, взял с интернета, бывает :)
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let circles = [];
let mouse = { x: null, y: null };

canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Circle {
    constructor(x, y, radius, color, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.alpha = 1; 
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
        ctx.fill();
    }

    update() {
        if (this.alpha <= 0) return;

        this.x += this.velocityX;
        this.y += this.velocityY;

        this.alpha -= 0.01;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.velocityX = -this.velocityX;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.velocityY = -this.velocityY;
        }

        this.draw();
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { r, g, b };
}

function generateCircles() {
    let color = getRandomColor();
    let radius = Math.random() * 30 + 10; 
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let y = Math.random() * (canvas.height - radius * 2) + radius;
    let velocityX = (Math.random() - 0.5) * 5;
    let velocityY = (Math.random() - 0.5) * 5;

    circles.push(new Circle(x, y, radius, color, velocityX, velocityY));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    generateCircles();

    circles.forEach((circle, index) => {
        circle.update();
    });

    requestAnimationFrame(animate); 
}

animate();

canvas.addEventListener('mousemove', function (e) {
    let radius = Math.random() * 10 + 5;
    let color = getRandomColor();
    let velocityX = (Math.random() - 0.5) * 5;
    let velocityY = (Math.random() - 0.5) * 5;

    circles.push(new Circle(e.x, e.y, radius, color, velocityX, velocityY));
});


// Веб-воркеры
const worker = new Worker('worker.js');

document.getElementById('startWorker').addEventListener('click', function() {
    const inputValue = document.getElementById('workerInput').value;
    if (inputValue) {
        worker.postMessage(inputValue);
        document.getElementById('workerResult').textContent = 'Результат: Ожидаем...';
    } else {
        alert('Введите число для расчета.');
    }
});

worker.onmessage = function(e) {
    document.getElementById('workerResult').textContent = 'Результат: ' + e.data;
};

worker.onerror = function(e) {
    alert('Ошибка в веб-воркере: ' + e.message);
};
