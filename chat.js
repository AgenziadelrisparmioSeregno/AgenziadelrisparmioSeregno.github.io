// 1. SCIA DEL MOUSE (Effetto Cyberpunk)
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
    ctx.strokeStyle = '#00f3ff'; // Colore Neon Blue
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

// 2. SIMULAZIONE SCANNER BOLLETTA IA
function simulateScan() {
    const ui = document.getElementById('scan-ui');
    const result = document.getElementById('scan-result');
    ui.innerHTML = "<p class='tech-font' style='color:var(--neon-blue); font-size:0.8rem;'>CRITTOGRAFIA E ANALISI IN CORSO...⚡</p>";
    
    setTimeout(() => {
        ui.style.display = "none";
        result.style.display = "block";
    }, 3000);
}

// 3. PROGRESS BAR SCROLL (Top Bar)
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
};

// 4. NOTIFICHE SOCIAL PROOF DINAMICHE
const notifications = [
    "🚀 Daniel ha appena fatto risparmiare 200€ a un'azienda di Seregno",
    "📱 Daniele ha attivato una Fibra 2.5GB a un nuovo cliente",
    "🔥 Luca ha ottimizzato i costi Gas di un condominio",
    "📋 Andrea ha completato con successo una pratica CAF",
    "☀️ Nuovo impianto Fotovoltaico pianificato oggi a Meda"
];

function showNotification() {
    const note = document.createElement('div');
    const randomText = notifications[Math.floor(Math.random() * notifications.length)];
    
    note.style = "position:fixed; bottom:20px; left:20px; background:rgba(0,0,0,0.9); border:1px solid var(--neon-blue); color:white; padding:15px; border-radius:10px; font-size:0.75rem; z-index:10000; transition:0.5s; opacity:0; transform:translateY(20px); font-family:'Inter', sans-serif;";
    note.innerHTML = randomText;
    document.body.appendChild(note);
    
    setTimeout(() => { note.style.opacity = "1"; note.style.transform = "translateY(0)"; }, 100);
    setTimeout(() => { 
        note.style.opacity = "0"; 
        setTimeout(() => note.remove(), 500);
    }, 4500);
}
setInterval(showNotification, 15000); // Una notifica ogni 15 secondi

// 5. FUNZIONE CONTATTO (WhatsApp) - Numeri Personali Aggiornati
function contactAgent(name) {
    const numbers = {
        'Daniel': '393423218269',
        'Daniele': '393491795387',
        'Luca': '393277545377',
        'Andrea': '393515910955'
    };
    
    // Messaggio personalizzato: per Andrea aggiungiamo il CAF, per tutti gli altri consulenza generale
    let baseMsg = `Ciao ${name}, ho visto il sito ADR e vorrei una consulenza per Luce, Gas, Telefonia o Fotovoltaico.`;
    if (name === 'Andrea') {
        baseMsg = `Ciao Andrea, vorrei una consulenza per Luce, Gas, Telefonia o per una pratica CAF.`;
    }

    window.location.href = `https://wa.me/${numbers[name]}?text=${encodeURIComponent(baseMsg)}`;
}

// 6. FAQ TOGGLE (Per l'index)
function toggleFaq(element) {
    const answer = element.querySelector('.faq-answer');
    if (answer) {
        const isHidden = answer.style.display === "none" || answer.style.display === "";
        answer.style.display = isHidden ? "block" : "none";
        element.querySelector('span:last-child').innerText = isHidden ? "-" : "+";
    }
}
