const agents = {
    Daniel: "3423218269",
    Daniele: "3491795387",
    Andrea: "3515910955",
    Luca: "3277545377"
};

function contactAgent(name) {
    const phone = agents[name];
    // Messaggio personalizzato in base al consulente
    let msg = `Ciao ${name}, ti contatto dal sito. Vorrei una consulenza per Luce, Gas o Telefonia.`;
    if(name === 'Andrea') msg = `Ciao Andrea, vorrei assistenza per Luce/Gas o per il reparto CAF.`;
    
    window.open(`https://wa.me/39${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}

// Notifiche Live incluse Telefonia e Sky
const actions = [
    "Daniel ha appena attivato un contratto Sky + Wifi in offerta.",
    "Andrea ha terminato una pratica ISEE e inviato un contratto Luce.",
    "Luca ha abbattuto la bolletta di un cliente del 35%.",
    "Daniele ha configurato un impianto Fotovoltaico con detrazione fiscale.",
    "Daniel ha trovato una tariffa Mobile imbattibile per un cliente.",
    "Andrea sta assistendo un cliente per il Bonus Sociale CAF."
];

function showNotification() {
    const notif = document.getElementById('live-notification');
    const body = document.getElementById('notif-body');
    if(!notif) return;
    
    body.innerText = actions[Math.floor(Math.random() * actions.length)];
    notif.classList.add('show');
    setTimeout(() => notif.classList.remove('show'), 5000);
}

setInterval(showNotification, 15000);
setTimeout(showNotification, 3000); // Prima notifica dopo 3 secondi
