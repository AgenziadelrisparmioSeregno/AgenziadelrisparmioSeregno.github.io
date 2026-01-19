<?php
/**
 * ADR Seregno - Sistema Gestione Bollette v2.0
 * Performante, sicuro e conforme alle best practices.
 */

// 1. Configurazione (Personalizza queste email)
$config = [
    'email_destinatario' => 'agenziadelrisparmioseregno@gmail.com', // La tua email aziendale
    'email_mittente'      => 'system@adrseregno.it',     // Email del server (evita spam)
    'dimensione_max'      => 10 * 1024 * 1024,           // 10 Megabyte
    'estensioni_permesse' => ['pdf', 'jpg', 'jpeg', 'png']
];

// 2. Controllo Metodo POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Accesso non consentito.");
}

// 3. Sanificazione Dati Testuali
$email_cliente = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$telefono      = htmlspecialchars($_POST['telefono'] ?? 'Non fornito');

if (!filter_var($email_cliente, FILTER_VALIDATE_EMAIL)) {
    die("Errore: Indirizzo email non valido.");
}

// 4. Gestione File Allegato
if (isset($_FILES['bolletta']) && $_FILES['bolletta']['error'] === UPLOAD_ERR_OK) {
    
    $file_tmp   = $_FILES['bolletta']['tmp_name'];
    $file_name  = $_FILES['bolletta']['name'];
    $file_size  = $_FILES['bolletta']['size'];
    $file_ext   = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

    // Controllo Dimensione
    if ($file_size > $config['dimensione_max']) {
        die("Errore: Il file è troppo grande. Massimo 10MB.");
    }

    // Controllo Estensione
    if (!in_array($file_ext, $config['estensioni_permesse'])) {
        die("Errore: Formato file non supportato. Usa PDF, JPG o PNG.");
    }

    // 5. Preparazione Email (Struttura Multipart per allegati)
    $boundary = md5(time());
    $headers  = "From: " . $config['email_mittente'] . "\r\n";
    $headers .= "Reply-To: " . $email_cliente . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"\r\n";

    // Corpo del messaggio
    $body = "--" . $boundary . "\r\n";
    $body .= "Content-Type: text/plain; charset=\"UTF-8\"\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= "Nuova richiesta di analisi bolletta riceva dal sito ADR Seregno.\n\n";
    $body .= "Email Cliente: $email_cliente\n";
    $body .= "Telefono: $telefono\n\n";
    $body .= "Il file è allegato alla presente email.\r\n";

    // Allegato
    $file_content = file_get_contents($file_tmp);
    $encoded_content = chunk_split(base64_encode($file_content));

    $body .= "--" . $boundary . "\r\n";
    $body .= "Content-Type: application/octet-stream; name=\"" . $file_name . "\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"" . $file_name . "\"\r\n\r\n";
    $body .= $encoded_content . "\r\n";
    $body .= "--" . $boundary . "--";

    // 6. Invio
    if (mail($config['email_destinatario'], "Analisi Bolletta: $email_cliente", $body, $headers)) {
        // Successo: Reindirizza a una pagina di ringraziamento o mostra messaggio
        echo "<h1>Invio completato!</h1><p>Grazie, analizzeremo la tua bolletta entro 24 ore.</p>";
    } else {
        echo "Errore critico nell'invio dell'email. Riprova più tardi.";
    }

} else {
    echo "Errore nel caricamento del file.";
}
?>
