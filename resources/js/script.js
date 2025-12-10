// --- LOGICA DE CARGA (Preloader) ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if(preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                // reset index and start typewriter only if element exists
                if(document.getElementById('typewriter-text')) { typeIndex = 0; typeWriter(); }
            }, 800);
        }, 800);
    }
});

// --- EFECTO TYPEWRITER ---
const textToType = "Estudiante de Ingeniería en Computación | Dev & Design";
let typeIndex = 0;
function typeWriter() {
    const typeContainer = document.getElementById('typewriter-text');
    if(!typeContainer) return; // nothing to do on pages without the element
    if (typeIndex < textToType.length) {
        typeContainer.innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 50);
    }
}

// --- MODAL DE PROYECTOS Y GATOS ---
function openModal(title, textOrHtml) {
    const titleEl = document.getElementById('mTitle');
    const descEl = document.getElementById('mDesc');
    const modalEl = document.getElementById('modalV2');
    
    if(titleEl && descEl && modalEl) {
        titleEl.innerText = title;
        descEl.innerHTML = textOrHtml;
        modalEl.style.display = 'flex';
    }
}
function closeModal() { 
    const modal = document.getElementById('modalV2');
    if(modal) modal.style.display = 'none'; 
}
window.onclick = function(e) { 
    const modal = document.getElementById('modalV2');
    if(e.target == modal) closeModal(); 
}

function openCatsModal() {
    const catsData = [
        { name: "Becario", role: "Becario", img: "resources/images/Becario.jpg" },
        { name: "CEO", role: "CEO", img: "resources/images/CEO.jpg" },
        { name: "Tester", role: "Tester", img: "resources/images/Tester.jpg" },
        { name: "Backend", role: "Backend", img: "resources/images/Backend.jpg" },
        { name: "Diseño", role: "Diseño", img: "resources/images/Diseño.jpg" },
        { name: "Soporte", role: "Soporte", img: "resources/images/Soporte.jpg" },
        { name: "RH", role: "RH", img: "resources/images/RH.jpg" },
        { name: "Manager", role: "Manager", img: "resources/images/Manager.jpg" },
        { name: "Seguridad", role: "Seguridad", img: "resources/images/Seguridad.jpg" }
    ];
    let html = '<div class="cat-grid">';
    catsData.forEach(cat => {
        html += `<div class="cat-item"><img src="${cat.img}" class="cat-img" alt="${cat.name}"><span class="cat-name">${cat.name}</span><span class="cat-role">${cat.role}</span></div>`;
    });
    html += '</div>';
    openModal('La Junta Directiva 🐱', html);
}

// --- FORMULARIO ---
const form = document.getElementById('contactForm');
if(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); alert("¡Mensaje enviado! 🚀"); e.target.reset();
    });
}

// --- CHAT IA ---
function toggleChat() { 
    const chat = document.getElementById('aiChat');
    if(chat) chat.classList.toggle('open'); 
}
function handleEnter(e) { if (e.key === 'Enter') sendMessage(); }
function sendMessage() {
    const input = document.getElementById('chatInput');
    const body = document.getElementById('chatBody');
    if(!input || !body) return;
    
    const txt = input.value.trim().toLowerCase();
    if(!txt) return;

    const userDiv = document.createElement('div');
    userDiv.className = 'msg user'; userDiv.innerText = input.value;
    body.appendChild(userDiv); input.value = ''; body.scrollTop = body.scrollHeight;

    setTimeout(() => {
        let reply = "Miau... aún estoy aprendiendo. 😿 Prueba: 'proyectos', 'contacto' o 'gatos'.";
        if (txt.includes('hola') || txt.includes('hi')) reply = "¡Prrr! ¡Hola humano! 🐾";
        else if (txt.includes('gato') || txt.includes('michi')) reply = "¡Somos 9 en total! Los verdaderos jefes. Mira la sección 'Acerca de Mí'. 😻";
        else if (txt.includes('proyecto') || txt.includes('trabajo')) reply = "Olga ha creado MonsterDolls, una web de congreso y MichiCafé. ¡Ve a 'Proyectos'! 💻";
        else if (txt.includes('contacto') || txt.includes('correo')) reply = "Escríbele a: michelleolgacerati@gmail.com 📧";
        else if (txt.includes('habilidad') || txt.includes('saber')) reply = "Frontend, UI y Liderazgo. ¡Una crack! ⚡";
        
        const botDiv = document.createElement('div');
        botDiv.className = 'msg bot'; botDiv.innerHTML = reply;
        body.appendChild(botDiv); body.scrollTop = body.scrollHeight;
    }, 600);
}