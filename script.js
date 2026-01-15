const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

canvas.width = 800;
canvas.height = 500;

let score = 0;
let birds = [];

// Bird Object
class Bird {
    constructor() {
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - 50);
        this.radius = 20;
        this.speed = Math.random() * 3 + 2;
        this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x -= this.speed;
    }
}

// Goli chalne ka effect
function shoot(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check agar goli kisi bird ko lagi
    birds.forEach((bird, index) => {
        const dist = Math.hypot(mouseX - bird.x, mouseY - bird.y);
        if (dist < bird.radius) {
            // Bird mar gaya
            score += 10;
            scoreElement.innerText = score;
            birds.splice(index, 1); // Bird ko list se hatao
        }
    });
}

canvas.addEventListener('mousedown', shoot);

function spawnBird() {
    if (Math.random() < 0.03) {
        birds.push(new Bird());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    spawnBird();
    
    birds.forEach((bird, index) => {
        bird.update();
        bird.draw();

        // Agar bird screen ke bahar nikal jaye
        if (bird.x + bird.radius < 0) {
            birds.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

animate();