// 1. SCIA DEL MOUSE CANVAS
const canvas = document.createElement('canvas');
canvas.id = 'mouse-canvas';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
let points = [];

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
window.dispatchEvent(new Event('resize'));

window.addEventListener('mousemove', (e) => {
    points.push({ x: e.clientX, y: e.clientY, age: 0 });
});

function animateMouse() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    if (points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
    }
    for (let i = 0; i < points.length; i++) {
        points[i].age++;
        if (points[i].age > 15) { points.splice(i, 1); i--; }
    }
    requestAnimationFrame(animateMouse);
}
animateMouse();

// 2. SIMULATORE SCANNER BOLLETTA
function simulateScan() {
    const ui = document.getElementById('scan-ui');
    const result = document.getElementById('scan-result');
    const btn = ui.querySelector('button');
    
    btn.innerHTML = "ANALIZZANDO DATA-PACK... ⚡";
    btn.style.opacity = "0.5";
    
    setTimeout(() => {
        ui.style.display = "none";
        result.style.display = "block";
        if(navigator.vibrate) navigator.vibrate(200);
    }, 3000);
}

// 3. NOTIFICHE LIVE (SOCIAL PROOF)
const cities = ["Seregno", "Meda", "Giussano", "Lissone", "Carate Brianza"];
const services = ["una bolletta Luce", "un contratto Fibra", "una pratica ISEE", "una consulenza Gas"];
const agents = ["Daniel", "Daniele", "Luca", "Andrea"];

function showNotification() {
    const note = document.createElement('div');
    const city = cities[Math.floor(Math.random()*cities.length)];
    const service = services[Math.floor(Math.random()*services.length)];
    const agent = agents[Math.floor(Math.random()*agents.length)];

    note.style = `
        position: fixed; bottom: 20px; left: 20px; 
        background: rgba(0,0,0,0.95); border: 1px solid #00f3ff;
        padding: 15px; border-radius: 12px; font-size: 0.75rem;
        z-index: 10000; box-shadow: 0 0 20px rgba(0,243,255,0.2);
        transition: 0.5s; transform: translateY(100px); opacity: 0;
    `;
    
    note.innerHTML = `🚀 <b>${agent}</b> ha appena ottimizzato ${service} a <b>${city}</b>.`;
    document.body.appendChild(note);

    setTimeout(() => { note.style.transform = "translateY(0)"; note.style.opacity = "1"; }, 100);
    setTimeout(() => { 
        note.style.opacity = "0"; 
        note.style.transform = "translateY(20px)";
        setTimeout(() => note.remove(), 500);
    }, 5000);
}

setInterval(showNotification, 12000); // Mostra una notifica ogni 12 secondi
