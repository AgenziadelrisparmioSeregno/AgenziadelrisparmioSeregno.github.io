let step = 0;
let dati = {};

const messaggi = document.getElementById("messaggi");

const consulenti = {
  "daniel": "393423218269",
  "daniele": "393491795387",
  "andrea": "393515910955",
  "luca": "393277545377"
};

function bot(testo) {
  messaggi.innerHTML += `<div class="bot">${testo}</div>`;
  messaggi.scrollTop = messaggi.scrollHeight;
}

function user(testo) {
  messaggi.innerHTML += `<div class="user">${testo}</div>`;
  messaggi.scrollTop = messaggi.scrollHeight;
}

bot("Ciao 👋 Sono l’assistente digitale.");
bot("Ti aiuto anche quando i consulenti sono in appuntamento.");
bot("Di cosa hai bisogno?");
bot("👉 LUCE / GAS / ENTRAMBI");

function invia() {
  const input = document.getElementById("input");
  const testo = input.value.trim().toLowerCase();
  if (!testo) return;

  user(testo);
  input.value = "";

  // STEP 0 – SERVIZIO
  if (step === 0) {
    dati.servizio = testo;
    bot("Perfetto 👍");
    bot("Con quale consulente vuoi parlare?");
    bot("Daniel | Daniele | Andrea | Luca");
    step++;
  }

  // STEP 1 – CONSULENTE
  else if (step === 1) {
    if (!consulenti[testo]) {
      bot("Scrivi: Daniel, Daniele, Andrea o Luca");
      return;
    }
    dati.consulente = testo;
    bot("Ottima scelta.");
    bot("Scrivi il tuo numero WhatsApp 📱");
    step++;
  }

  // STEP 2 – WHATSAPP
  else if (step === 2) {
    dati.whatsapp = testo;
    bot("Grazie!");
    bot("Che giorno preferisci per l’appuntamento?");
    step++;
  }

  // STEP 3 – GIORNO
  else if (step === 3) {
    dati.giorno = testo;
    bot("In quale fascia oraria?");
    bot("Mattina / Pomeriggio / Sera");
    step++;
  }

  // STEP 4 – CONFERMA
  else if (step === 4) {
    dati.orario = testo;

    const numero = consulenti[dati.consulente];
    const messaggio = encodeURIComponent(
      `Ciao, sono ${dati.whatsapp}. ` +
      `Richiesta per ${dati.servizio}. ` +
      `Appuntamento: ${dati.giorno}, ${dati.orario}.`
    );

    bot("✅ Appuntamento registrato!");
    bot("Scrivi subito al consulente scelto 👇");
    bot(`<a href="https://wa.me/${numero}?text=${messaggio}" target="_blank">
          Apri WhatsApp
        </a>`);

    step++;
  }
}
