class Particle {
    constructor(canvas, color, size) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = size;  // 使用传入的大小参数
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = color;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

class ParticleSystem {
    constructor() {
        console.log('ParticleSystem initializing...');
        this.canvas = document.getElementById('particleCanvas');
        console.log('Canvas element:', this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.color = '#ffffff';
        this.count = 50;

        this.countSlider = document.getElementById('particleCount');
        this.countValue = document.getElementById('countValue');
        this.colorPicker = document.getElementById('particleColor');
        this.size = 3;  // 添加默认大小
        this.sizeSlider = document.getElementById('particleSize');
        this.sizeValue = document.getElementById('sizeValue');
        
        console.log('Controls:', {
            slider: this.countSlider,
            value: this.countValue,
            color: this.colorPicker
        });

        this.init();
        this.setupEventListeners();
        this.animate();
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());

        if (this.countSlider) {
            console.log('Setting up slider events');
            // 使用多种事件监听方式
            ['input', 'change', 'mousedown', 'mousemove'].forEach(eventType => {
                this.countSlider.addEventListener(eventType, (e) => {
                    console.log(`${eventType} event:`, e.target.value);
                    this.count = parseInt(e.target.value);
                    this.countValue.textContent = this.count;
                    this.createParticles();
                });
            });
        } else {
            console.error('找不到滑动条元素！');
        }

        // 添加粒子大小滑动条的事件监听
        if (this.sizeSlider) {
            ['input', 'change', 'mousedown', 'mousemove'].forEach(eventType => {
                this.sizeSlider.addEventListener(eventType, (e) => {
                    console.log(`Size ${eventType}:`, e.target.value);
                    this.size = parseFloat(e.target.value);
                    this.sizeValue.textContent = this.size;
                    this.createParticles();
                });
            });
        }

        if (this.colorPicker) {
            ['input', 'change'].forEach(eventType => {
                this.colorPicker.addEventListener(eventType, (e) => {
                    console.log(`Color ${eventType}:`, e.target.value);
                    this.color = e.target.value;
                    this.createParticles();
                });
            });
        }
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        console.log('Creating particles:', this.count);
        this.particles = [];
        for (let i = 0; i < this.count; i++) {
            this.particles.push(new Particle(this.canvas, this.color, this.size));
        }
        console.log('Particles created:', this.particles.length);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// 在文件最上方添加
console.log('Renderer script loaded');

// 修改初始化方式
window.onload = () => {
    console.log('Window loaded');
    try {
        const system = new ParticleSystem();
        console.log('ParticleSystem created successfully');
    } catch (error) {
        console.error('Error creating ParticleSystem:', error);
    }
};