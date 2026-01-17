// 1. SCIA DEL MOUSE
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

// 2. SIMULAZIONE SCANNER
function simulateScan() {
    const ui = document.getElementById('scan-ui');
    const result = document.getElementById('scan-result');
    ui.innerHTML = "<p class='tech-font' style='color:var(--neon-blue)'>CRITTOGRAFIA E ANALISI...⚡</p>";
    
    setTimeout(() => {
        ui.style.display = "none";
        result.style.display = "block";
    }, 3000);
}

// 3. PROGRESS BAR SCROLL
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
};

// 4. NOTIFICHE SOCIAL PROOF
function showNotification() {
    const note = document.createElement('div');
    note.style = "position:fixed; bottom:20px; left:20px; background:rgba(0,0,0,0.9); border:1px solid var(--neon-blue); color:white; padding:15px; border-radius:10px; font-size:0.7rem; z-index:10000; transition:0.5s; opacity:0; transform:translateY(20px);";
    note.innerHTML = "🚀 Daniel ha appena fatto risparmiare 200€ a un cliente di Seregno";
    document.body.appendChild(note);
    
    setTimeout(() => { note.style.opacity = "1"; note.style.transform = "translateY(0)"; }, 100);
    setTimeout(() => { 
        note.style.opacity = "0"; 
        setTimeout(() => note.remove(), 500);
    }, 4000);
}
setInterval(showNotification, 20000);

// 5. FUNZIONE CONTATTO (WhatsApp)
function contactAgent(name) {
    const numbers = {
        'Daniel': '393423218269',
        'Daniele': '393491795387',
        'Luca': '393277545377',
        'Andrea': '393515910955'
    };
    window.location.href = `https://wa.me/${numbers[name]}?text=Ciao%20${name},%20ho%20visto%20il%20vostro%20sito...`;
}
