/* ==========================================================================
   OPERACIÓN FIREWALL - LÓGICA INTERACTIVA Y GAMIFICACIÓN
   ========================================================================== */

// Estado global de la aplicación
let currentStep = 0;
let agentName = "Agente Anónimo";

// Iniciar la misión
function startMission() {
    const nameInput = document.getElementById("agent-name").value.trim();
    if (nameInput !== "") {
        agentName = nameInput;
    }
    
    // Actualizar nombre visible
    document.getElementById("display-name").textContent = agentName;
    document.getElementById("diploma-agent-name").textContent = agentName.toUpperCase();
    
    // Ocultar login y mostrar agente activo
    document.getElementById("login-zone").classList.add("hidden");
    document.getElementById("active-agent-display").classList.remove("hidden");
    
    // Transición de pantallas
    document.getElementById("story-brief").classList.add("hidden");
    goToNextReto(1);
}

// Navegación entre retos
function goToNextReto(nextRetoNumber) {
    // Ocultar todos los retos
    for (let i = 1; i <= 6; i++) {
        const el = document.getElementById(`reto-${i}`);
        if (el) el.classList.add("hidden");
    }
    
    // Mostrar el reto correspondiente o el diploma si terminó
    if (nextRetoNumber <= 6) {
        const target = document.getElementById(`reto-${nextRetoNumber}`);
        if (target) target.classList.remove("hidden");
    } else {
        showDiploma();
    }
}

// Actualizar barra de progreso, evidencias e insignias
function unlockProgress(step) {
    currentStep = step;
    
    // Actualizar Porcentaje y Barra
    const percentage = Math.round((step / 6) * 100);
    document.getElementById("progress-bar").style.width = `${percentage}%`;
    document.getElementById("progress-text").textContent = `${percentage}% (${step}/6 Evidencias)`;
    
    // Desbloquear Evidencia en el panel
    const eviItem = document.getElementById(`evi-${step}`);
    if (eviItem) {
        eviItem.classList.remove("locked");
        eviItem.classList.add("unlocked");
        eviItem.querySelector(".status-icon").textContent = "🔓";
    }
    
    // Desbloquear Insignia
    const badgeItem = document.getElementById(`badge-${step}`);
    if (badgeItem) {
        badgeItem.classList.remove("locked");
        badgeItem.classList.add("unlocked");
    }
}

/* ==========================================================================
   RETOS ESPECÍFICOS
   ========================================================================== */

// RETO 1: Contraseñas Seguras
function evaluatePassword() {
    const val = document.getElementById("pass-input").value;
    const bar = document.getElementById("strength-bar");
    const feedback = document.getElementById("pass-feedback");
    const btn = document.getElementById("btn-reto-1");
    
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[!@#$%^&*]/.test(val)) score++;
    
    if (score <= 1) {
        bar.style.width = "25%";
        bar.style.backgroundColor = "var(--neon-red)";
        feedback.textContent = "Contraseña muy débil. Cumple con los requisitos.";
        feedback.className = "feedback error";
        btn.classList.add("hidden");
    } else if (score < 4) {
        bar.style.width = "60%";
        bar.style.backgroundColor = "var(--neon-orange)";
        feedback.textContent = "Contraseña media. Agrega más variedad de caracteres.";
        feedback.className = "feedback error";
        btn.classList.add("hidden");
    } else {
        bar.style.width = "100%";
        bar.style.backgroundColor = "var(--neon-green)";
        feedback.textContent = "¡Contraseña Robusta! Bloqueo listo para ejecutarse.";
        feedback.className = "feedback success";
        btn.classList.remove("hidden");
    }
}

function solveReto1() {
    unlockProgress(1);
    goToNextReto(2);
}

// RETO 2: Phishing
function solveReto2(isCorrect) {
    const feedback = document.getElementById("feedback-2");
    if (isCorrect) {
        feedback.textContent = "¡Correcto! La dirección del remitente y el enlace son falsos.";
        feedback.className = "feedback success";
        setTimeout(() => {
            unlockProgress(2);
            goToNextReto(3);
        }, 1500);
    } else {
        feedback.textContent = "Incorrecto. Examina bien la dirección del remitente y el dominio de la URL.";
        feedback.className = "feedback error";
    }
}

// RETO 3: Huella Digital
function solveReto3(isCorrect) {
    const feedback = document.getElementById("feedback-3");
    if (isCorrect) {
        feedback.textContent = "¡Correcto! Publicar documentos con datos personales expone información privada.";
        feedback.className = "feedback success";
        setTimeout(() => {
            unlockProgress(3);
            goToNextReto(4);
        }, 1500);
    } else {
        feedback.textContent = "Incorrecto. Busca la opción que expone información personal sensible públicamente.";
        feedback.className = "feedback error";
    }
}

// RETO 4: Ciberacoso
function solveReto4(isCorrect) {
    const feedback = document.getElementById("feedback-4");
    if (isCorrect) {
        feedback.textContent = "¡Correcto! La prevención exige documentar, bloquear y reportar a las autoridades.";
        feedback.className = "feedback success";
        setTimeout(() => {
            unlockProgress(4);
            goToNextReto(5);
        }, 1500);
    } else {
        feedback.textContent = "Incorrecto. Responder con agresividad o ignorar el abuso nunca es el protocolo correcto.";
        feedback.className = "feedback error";
    }
}

// RETO 5: Fake News
function solveReto5(isCorrect) {
    const feedback = document.getElementById("feedback-5");
    if (isCorrect) {
        feedback.textContent = "¡Correcto! Siempre se debe contrastar con fuentes oficiales y confiables.";
        feedback.className = "feedback success";
        setTimeout(() => {
            unlockProgress(5);
            goToNextReto(6);
        }, 1500);
    } else {
        feedback.textContent = "Incorrecto. La popularidad o el formato del mensaje no garantizan veracidad.";
        feedback.className = "feedback error";
    }
}

// RETO 6: Investigación Forense (Reto Final)
function solveReto6(option) {
    const feedback = document.getElementById("feedback-6");
    if (option === 'A') {
        feedback.textContent = "¡ANÁLISIS CORRECTO! El atacante engañó al operador con Phishing para obtener la contraseña.";
        feedback.className = "feedback success";
        setTimeout(() => {
            unlockProgress(6);
            goToNextReto(7); // Ir a pantalla final / diploma
        }, 2000);
    } else {
        feedback.textContent = "Análisis incorrecto. Revisa las evidencias A y B para identificar el vector inicial.";
        feedback.className = "feedback error";
    }
}

/* ==========================================================================
   DESBLOQUEO Y MUESTRA DEL DIPLOMA
   ========================================================================== */

function showDiploma() {
    // Generar código aleatorio de certificación
    const randomCode = "UNRD-" + Math.floor(100000 + Math.random() * 900000);
    document.getElementById("diploma-code").textContent = randomCode;
    
    // Mostrar sección del diploma
    document.getElementById("diploma-section").classList.remove("hidden");
}