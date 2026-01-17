// 1. EFFETTO MOUSE
const canvas = document.createElement('canvas');
canvas.id = 'mouse-canvas';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
let points = [];
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
window.dispatchEvent(new Event('resize'));
window.addEventListener('mousemove', (e) => { points.push({ x: e.clientX, y: e.clientY, age: 0 }); });

function animateMouse() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 2;
    if (points.length > 1) {
        ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) { ctx.lineTo(points[i].x, points[i].y); }
        ctx.stroke();
    }
    for (let i = 0; i < points.length; i++) {
        points[i].age++;
        if (points[i].age > 15) { points.splice(i, 1); i--; }
    }
    requestAnimationFrame(animateMouse);
}
animateMouse();

// 2. FUNZIONE CARICAMENTO FILE E ANALISI
function startAnalysis() {
    const fileInput = document.getElementById('bill-upload');
    const fileNameDisplay = document.getElementById('file-name');
    const ui = document.getElementById('scan-ui');
    const result = document.getElementById('scan-result');
    const dropZone = document.getElementById('drop-zone');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        
        // Aggiorna interfaccia con nome file
        fileNameDisplay.innerHTML = `<span style="color:var(--neon-green)">FILE RICEVUTO:</span><br>${file.name}`;
        dropZone.style.borderColor = "var(--neon-green)";

        // Avvia simulazione
        ui.innerHTML = "<p class='tech-font' style='color:var(--neon-blue); font-size:0.7rem; margin-top:20px;'>ANALISI AI IN CORSO...⚡</p>";
        
        setTimeout(() => {
            ui.style.display = "none";
            result.style.display = "block";
        }, 3000);
    }
}

// 3. WHATSAPP
function contactAgent(name) {
    const numbers = {
        'Daniel': '393423218269',
        'Daniele': '393491795387',
        'Luca': '393277545377',
        'Andrea': '393515910955'
    };
    let msg = `Ciao ${name}, ho caricato la bolletta sul sito ADR e vorrei un'analisi gratuita.`;
    window.location.href = `https://wa.me/${numbers[name]}?text=${encodeURIComponent(msg)}`;
}

// 4. FAQ TOGGLE
function toggleFaq(element) {
    const answer = element.querySelector('.faq-answer');
    const isHidden = answer.style.display === "none" || answer.style.display === "";
    answer.style.display = isHidden ? "block" : "none";
}

// 5. PROGRESS BAR
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
};
