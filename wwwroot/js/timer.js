class Timer {
    constructor(duration) {
        this.duration = duration;
        this.startTime = localStorage.getItem('escapeStartTime');
        this.timerElement = null;
        this.interval = null;
    }

    start() {
        if (!this.startTime) {
            this.startTime = Date.now();
            localStorage.setItem('escapeStartTime', this.startTime);
        }

        this.createTimerElement();
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    }

    createTimerElement() {
        if (!this.timerElement) {
            this.timerElement = document.createElement('div');
            this.timerElement.id = 'globalTimer';
            this.timerElement.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.8);
                color: #00ffff;
                padding: 15px;
                border-radius: 10px;
                font-family: 'Courier New', monospace;
                font-size: 24px;
                z-index: 9999;
                border: 2px solid #00ffff;
                text-shadow: 0 0 5px #00ffff;
            `;
            document.body.appendChild(this.timerElement);
        }
    }

    update() {
        const now = Date.now();
        const elapsedTime = now - this.startTime;
        const remainingTime = this.duration - elapsedTime;

        if (remainingTime <= 0) {
            clearInterval(this.interval);
            this.gameOver();
            return;
        }

        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);

        this.timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Cambiar color cuando quede poco tiempo
        if (remainingTime < 300000) { // menos de 5 minutos
            this.timerElement.style.color = '#ff0000';
            this.timerElement.style.borderColor = '#ff0000';
            this.timerElement.style.textShadow = '0 0 5px #ff0000';
            
            if (remainingTime % 2000 < 1000) { // Parpadeo cada segundo
                this.timerElement.style.opacity = '0.5';
            } else {
                this.timerElement.style.opacity = '1';
            }
        }
    }

    gameOver() {
        localStorage.removeItem('escapeStartTime');
        const gameOverScreen = document.createElement('div');
        gameOverScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            color: #ff0000;
            font-family: 'Courier New', monospace;
        `;

        gameOverScreen.innerHTML = `
            <h1 style="font-size: 48px; margin-bottom: 20px;">TIEMPO AGOTADO</h1>
            <p style="font-size: 24px;">La misión ha fallado.</p>
            <button onclick="window.location.href='/'" style="
                margin-top: 30px;
                padding: 15px 30px;
                font-size: 20px;
                background: #ff0000;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            ">Volver a intentar</button>
        `;

        document.body.appendChild(gameOverScreen);
    }

    static resetTimer() {
        localStorage.removeItem('escapeStartTime');
    }
}

// Iniciar el temporizador cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    const timer = new Timer(3600000); // 1 hora en milisegundos
    timer.start();
}); 