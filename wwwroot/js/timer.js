class Timer {
    constructor(duration) {
        this.duration = duration;
        this.startTime = localStorage.getItem('escapeStartTime');
        this.pauseTime = localStorage.getItem('escapePauseTime');
        this.timerElement = null;
        this.interval = null;
        this.initialDuration = duration;
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

    start() {
        this.createTimerElement();
        
        // Si estaba pausado, ajustar el tiempo de inicio
        if (this.pauseTime) {
            const pauseDuration = Date.now() - parseInt(this.pauseTime);
            this.startTime = (parseInt(this.startTime) + pauseDuration).toString();
            localStorage.setItem('escapeStartTime', this.startTime);
            localStorage.removeItem('escapePauseTime');
            this.pauseTime = null;
        } else if (!this.startTime) {
            this.startTime = Date.now().toString();
            localStorage.setItem('escapeStartTime', this.startTime);
        }

        if (this.interval) {
            clearInterval(this.interval);
        }
        
        this.timerElement.style.display = 'block';
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    }

    pause() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }

        // Guardar el momento en que se pausó
        this.pauseTime = Date.now().toString();
        localStorage.setItem('escapePauseTime', this.pauseTime);
        
        if (this.timerElement) {
            this.timerElement.style.display = 'none';
        }
    }

    reset() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.duration = this.initialDuration;
        this.startTime = Date.now().toString();
        localStorage.setItem('escapeStartTime', this.startTime);
        localStorage.removeItem('escapePauseTime');
        this.pauseTime = null;
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    }

    setDuration(newDuration) {
        this.duration = newDuration;
        this.startTime = Date.now().toString();
        localStorage.setItem('escapeStartTime', this.startTime);
        localStorage.removeItem('escapePauseTime');
        this.pauseTime = null;
        this.update();
    }

    update() {
        const now = Date.now();
        const elapsedTime = now - parseInt(this.startTime);
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
        localStorage.removeItem('escapePauseTime');
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
        localStorage.removeItem('escapePauseTime');
    }
}

// Variable global para el timer
let globalTimer = null;

// Función para manejar la visibilidad del timer
function handleTimerVisibility() {
    const path = window.location.pathname;
    const isIndexPage = path === '/' || path === '/Home' || path === '/Home/Index';
    
    if (!globalTimer) {
        globalTimer = new Timer(3600000); // 1 hora en milisegundos
    }

    if (isIndexPage) {
        globalTimer.pause();
    } else {
        globalTimer.start();
    }
}

// Inicializar el timer cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    handleTimerVisibility();

    // Agregar eventos de teclado globales
    document.addEventListener('keydown', (event) => {
        if (!globalTimer) return;
        
        const key = event.key.toLowerCase();
        if (key === 't') {
            globalTimer.setDuration(301000); // 5 minutos y 1 segundo en milisegundos
        } else if (key === 'r') {
            globalTimer.reset(); // Reiniciar el timer a su duración inicial
        }
    });
}); 