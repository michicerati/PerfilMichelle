// --- LOGICA DE CARGA (Preloader) ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if(preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                
                // Iniciar máquina de escribir si existe
                if(document.getElementById('typewriter-text')) { 
                    typeIndex = 0; 
                    typeWriter(); 
                }
                
                // Iniciar Carrusel de Gatos si existe
                if(document.getElementById('widgetCatImg')) {
                    startCatCarousel();
                }
                
                // Iniciar Observador de Fondo
                initBgObserver();
            }, 800);
        }, 800);
    }
});

// --- EFECTO TYPEWRITER ---
const textToType = "Estudiante de Ingeniería en Computación | Dev & Design";
let typeIndex = 0;
function typeWriter() {
    const typeContainer = document.getElementById('typewriter-text');
    if(!typeContainer) return; 
    if (typeIndex < textToType.length) {
        typeContainer.innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 50);
    }
}

// --- MODAL GENERAL ---
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
    stopModalGallery(); // Detener galería si estaba abierta
}
window.onclick = function(e) { 
    const modal = document.getElementById('modalV2');
    if(e.target == modal) closeModal(); 
}

// --- MODAL DE PASIONES (CON GALERÍA) ---
let modalGalleryInterval;

function openPassionModal(title, desc, img1, img2) {
    const htmlContent = `
        <p style="margin-bottom: 20px; font-size: 1.1rem; line-height: 1.6;">${desc}</p>
        <div class="modal-gallery">
            <img src="${img1}" class="modal-img active" alt="${title} 1">
            <img src="${img2}" class="modal-img" alt="${title} 2">
        </div>
        <p style="margin-top: 10px; font-size: 0.8rem; color: #888; text-align: center;">Mostrando imágenes de referencia...</p>
    `;
    
    openModal(title, htmlContent);
    startModalGallery();
}

function startModalGallery() {
    stopModalGallery(); 
    modalGalleryInterval = setInterval(() => {
        const images = document.querySelectorAll('.modal-gallery .modal-img');
        if(images.length > 1) {
            images[0].classList.toggle('active');
            images[1].classList.toggle('active');
        }
    }, 3000); 
}

function stopModalGallery() {
    if(modalGalleryInterval) clearInterval(modalGalleryInterval);
}

// --- DATOS DE LOS GATOS ---
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

function openCatsModal() {
    let html = '<div class="cat-grid">';
    catsData.forEach(cat => {
        // En tu versión local, recuerda usar las rutas correctas si no cargan
        // Aquí asumo que tienes las imágenes en resources/images/
        html += `<div class="cat-item"><img src="${cat.img}" class="cat-img" alt="${cat.name}"><span class="cat-name">${cat.name}</span><span class="cat-role">${cat.role}</span></div>`;
    });
    html += '</div>';
    openModal('La Junta Directiva 🐱', html);
}

let currentCatIndex = 0;
function startCatCarousel() {
    updateCatWidget();
    setInterval(() => {
        currentCatIndex = (currentCatIndex + 1) % catsData.length;
        updateCatWidget();
    }, 3000); 
}

function updateCatWidget() {
    const cat = catsData[currentCatIndex];
    const imgEl = document.getElementById('widgetCatImg');
    const nameEl = document.getElementById('widgetCatName');
    const roleEl = document.getElementById('widgetCatRole');
    const barEl = document.getElementById('catProgressBar');

    if(imgEl && nameEl && roleEl && barEl) {
        imgEl.style.opacity = 0; 
        nameEl.style.opacity = 0;
        
        setTimeout(() => {
            imgEl.src = cat.img;
            nameEl.innerText = cat.name;
            roleEl.innerText = cat.role;
            
            imgEl.style.opacity = 1; 
            nameEl.style.opacity = 1;
            
            barEl.classList.remove('animate-bar');
            void barEl.offsetWidth; 
            barEl.classList.add('animate-bar');
        }, 200);
    }
}

// --- OBSERVADOR DE FONDO ---
function initBgObserver() {
    const trigger = document.querySelector('.trigger-bg-change');
    if(!trigger) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.body.classList.add('mode-deep');
            } else {
                document.body.classList.remove('mode-deep');
            }
        });
    }, { threshold: 0.2 });

    observer.observe(trigger);
}

// --- TRACKER MOUSE (SPOTLIGHT) ---
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.glow-card, .project-glass, .passion-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

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