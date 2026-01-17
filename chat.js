const agents = {
    Daniel: "3423218269",
    Daniele: "3491795387",
    Andrea: "3515910955",
    Luca: "3277545377"
};

function contactAgent(name) {
    const phone = agents[name];
    alert(`Il sistema sta verificando la disponibilità di ${name}...`);
    window.open(`https://wa.me/39${phone}?text=Ciao%20${name},%20vengo%20dal%20sito%20e%20vorrei%20informazioni.`, '_blank');
}

// Notifiche Live Punto 4
const actions = [
    "Daniel ha appena salvato 450€ ad un cliente.",
    "Andrea ha avviato un nuovo cantiere Fotovoltaico.",
    "Luca ha terminato con successo una pratica CAF.",
    "Daniele sta analizzando una bolletta Business."
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
