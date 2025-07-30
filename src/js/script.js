// Variables globales para idiomas
let currentLanguage = 'es';
let translations = {};

document.addEventListener('DOMContentLoaded', async () => {
    await loadLanguage(currentLanguage);
    renderContent();
});

// Función para cargar archivo de idioma
async function loadLanguage(lang) {
    try {
        const response = await fetch(`src/js/languages/${lang}.json`);
        translations = await response.json();
        currentLanguage = lang;
    } catch (error) {
        console.error('Error loading language file:', error);
        // Fallback a español si hay error
        if (lang !== 'es') {
            await loadLanguage('es');
        }
    }
}

// Función para actualizar el estado visual de los botones de idioma
function updateLanguageButtons() {
    // Quitar clase active de todos los botones
    document.querySelectorAll('.language-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Agregar clase active al botón del idioma actual
    const activeButton = document.getElementById(currentLanguage);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Función para cambiar idioma
async function changeLanguage(lang) {
    await loadLanguage(lang);
    renderContent();
}

document.addEventListener('click', (e) => {
    switch (true) {
        case e.target.matches('.home'):
            renderHome();
            break;
        case e.target.matches('.details'):
            renderDetails();
            break;
        case e.target.matches('.story'):
            renderStory();
            break;
        case e.target.matches('.logistics'):
            renderLogistics();
            break;
        case e.target.matches('.confirm-form'):
            renderConfirmForm();

            document.getElementById('whatsappForm').addEventListener('submit', function(event) {
                event.preventDefault(); // Evita que se envíe el formulario
            
                // Obtener datos del formulario
                let name = document.getElementById("name").value;
                let lastname = document.getElementById("lastname").value;
                let email = document.getElementById("email").value;
                let phone = document.getElementById("phone").value;
            
                // Número de WhatsApp (cambiar por el tuyo sin + ni espacios)
                let numeroWhatsApp = "638476592";
            
                // Construir el enlace de WhatsApp
                let url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent("Nombre: " + name + "\nApellidos: " + lastname + "\nEmail: " + email + "\nTeléfono: " + phone)}`;
            
                // Abrir WhatsApp en una nueva ventana
                window.open(url, "_blank");
            });
        break;
        case e.target.matches('#es') || e.target.closest('#es'):
            changeLanguage('es');
            break;
        case e.target.matches('#nl') || e.target.closest('#nl'):
            changeLanguage('nl');
            break;
    }
});

function renderContent() {
    const content = `<header>
                        <div class="menu-toggle">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="header-language">
                            <button class="language-button" id="es">
                                <p>ES</p>
                                <img class="flag" src="assets/icons/spain.svg" alt="ES">
                            </button>
                            <button class="language-button" id="nl">
                                <p>NL</p>
                                <img class="flag" src="assets/icons/netherlands.svg" alt="NL">
                            </button>
                        </div>
                        <div class="logo-container">
                            <img class="logo" src="assets/logo.png" alt="Logo">
                        </div>
                        <nav class="navbar">
                            <ul>
                                <li class="home">${translations.navigation?.home || 'Inicio'}</li>
                                <li class="details">${translations.navigation?.details || 'Detalles del evento'}</li>
                                <li class="story">${translations.navigation?.story || 'Nuestra historia'}</li>
                                <li class="logistics">${translations.navigation?.logistics || 'Aportaciones'}</li>
                                <li class="confirm-form">${translations.navigation?.confirmForm || 'Confirma tu asistencia'}</li>
                            </ul>
                        </nav>
                    </header>
                    <main>
                    </main>`;

    document.body.innerHTML = content;
    
    // Añadir funcionalidad al menú hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarUl = document.querySelector('.navbar ul');
    
    menuToggle.addEventListener('click', () => {
        navbarUl.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.style.overflow = navbarUl.classList.contains('active') ? 'hidden' : '';
    });
    
    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.navbar ul li').forEach(link => {
        link.addEventListener('click', () => {
            navbarUl.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Actualizar el estado visual de los botones de idioma
    updateLanguageButtons();

    renderHome();
}

function renderHome() {
    const content = `   <div class="img-container">
                            <img src="assets/img/main-img.jpeg" alt="Logo" class="main-img">
                        </div>
                        <div class="countdown-container">
                            <div class="countdown-title">
                                <h2>${translations.home?.date || 'Sábado 01 de noviembre de 2025'}</h2>
                            </div>
                            <div class="countdown">
                                <div class="countdown-items">
                                    <div class="countdown-item">
                                        <h3 class="countdown-time" id="days">00</h3>
                                        <p class="countdown-text">${translations.home?.countdown?.days || 'Días'}</p>
                                    </div>
                                    <div class="countdown-item">
                                        <h3 class="countdown-time" id="hours">00</h3>
                                        <p class="countdown-text">${translations.home?.countdown?.hours || 'Horas'}</p>
                                    </div>
                                    <div class="countdown-item">
                                        <h3 class="countdown-time" id="minutes">00</h3>
                                        <p class="countdown-text">${translations.home?.countdown?.minutes || 'Minutos'}</p>
                                    </div>
                                    <div class="countdown-item">
                                        <h3 class="countdown-time" id="seconds">00</h3>
                                        <p class="countdown-text">${translations.home?.countdown?.seconds || 'Segundos'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="map-container">
                            <h1>${translations.home?.venue || 'Te esperamos en'}</h1>
                            <div class="map-items">
                                <img src="assets/img/finca.png" alt="finca">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.2052169693425!2d-3.598316623459536!3d40.691477788870856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd43d1cf11b79e15%3A0xa1dd3c3c5335e75!2sFinca%20Monteviejo!5e0!3m2!1ses!2ses!4v1737985939698!5m2!1ses!2ses" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>`;

    const main = document.querySelector('main');
    main.innerHTML = content;
    countdown();
    setInterval(countdown, 1000);
}

function countdown() {
    const weddingDate = new Date('2025-11-01');
    const now = new Date();
    const timeDifference = weddingDate - now;

    if (timeDifference <= 0) {
        document.getElementById('countdown').innerHTML = translations.home?.weddingDay || "¡Es el gran día! 🎉";
        return;
    }
    
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

function renderDetails() {
    const content = `<div class="details-container">
                        <div class="details-date-container">
                            <h1>${translations.details?.title || 'Detalles del evento'}</h1>
                            <div class="details-date-container-items">  
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.2052169693425!2d-3.598316623459536!3d40.691477788870856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd43d1cf11b79e15%3A0xa1dd3c3c5335e75!2sFinca%20Monteviejo!5e0!3m2!1ses!2ses!4v1737985939698!5m2!1ses!2ses" width="400" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                <div class="details-date-container-items-text">
                                    <h3>${translations.details?.weddingDate || 'Nuestra boda se celebrará el'}</h3>
                                    <h2>${translations.details?.date || 'Sábado 01 de noviembre de 2025'}</h2>
                                </div>
                            </div>
                            <div class="dropdown">
                                <button>${translations.details?.addToCalendar || 'Agregar al calendario'}</button>
                                <div class="dropdown-content">
                                    <a href="https://www.google.com/calendar/render?action=TEMPLATE&text=Boda%20Victoria%20y%20Dani&dates=20251101T180000Z/20251101T240000Z&details=Boda%20de%20Victoria%20y%20Dani%20en%20la%20finca%20de%20Monteviejo%2C%20Madrid.&location=Finca%20de%20Monteviejo%2C%20Madrid" target="_blank">
                                        Google Calendar
                                    </a>
                                    <a href="data:text/calendar;charset=utf-8,BEGIN:VCALENDAR%0D%0AVERSION:2.0%0D%0ABEGIN:VEVENT%0D%0ASUMMARY:Boda%20Victoria%20y%20Dani%0D%0ADTSTART:20251101T180000Z%0D%0ADTEND:20251101T240000Z%0D%0ADESCRIPTION:Boda%20de%20Victoria%20y%20Dani%20en%20la%20finca%20de%20Monteviejo%2C%20Madrid.%0D%0ALOCATION:Finca%20de%20Monteviejo%2C%20Madrid%0D%0AEND:VEVENT%0D%0AEND:VCALENDAR" download="boda_victoria_dani.ics">
                                        Apple Calendar
                                    </a>
                                    <a href="data:text/calendar;charset=utf-8,BEGIN:VCALENDAR%0D%0AVERSION:2.0%0D%0ABEGIN:VEVENT%0D%0ASUMMARY:Boda%20Victoria%20y%20Dani%0D%0ADTSTART:20251101T180000Z%0D%0ADTEND:20251101T240000Z%0D%0ADESCRIPTION:Boda%20de%20Victoria%20y%20Dani%20en%20la%20finca%20de%20Monteviejo%2C%20Madrid.%0D%0ALOCATION:Finca%20de%20Monteviejo%2C%20Madrid%0D%0AEND:VEVENT%0D%0AEND:VCALENDAR" download="boda_victoria_dani.ics">
                                        Outlook Calendar
                                    </a>
                                </div>
                             </div>
                        </div>

                        <div class="details-timeline-container">
                            <h1>${translations.details?.program || 'Programa'}</h1>
                            <div class="details-timeline">
                                <div class="details-timeline-item">
                                    <div class="details-timeline-item-img border-right">
                                        <img src="assets/icons/recepcion.png" alt="details-timeline-1">
                                    </div>
                                    <div class="details-timeline-item-text p-left">
                                        <h2>${translations.details?.timeline?.reception?.title || 'Recepción'}</h2>
                                        <p>${translations.details?.timeline?.reception?.description || 'Recibimiento de invitados y bienvenida para comenzar este día tan especial.'}</p>
                                    </div>
                                </div>
                                <div class="details-timeline-item">
                                    <div class="details-timeline-item-text p-right">
                                        <h2>${translations.details?.timeline?.ceremony?.title || 'Ceremonia'}</h2>
                                        <p>${translations.details?.timeline?.ceremony?.description || 'Celebración de la ceremonia rodeados de nuestros seres queridos en un entorno único.'}</p>
                                    </div>
                                    <div class="details-timeline-item-img border-left">
                                        <img src="assets/icons/ceremony.png" alt="details-timeline-1">
                                    </div>
                                </div>
                                <div class="details-timeline-item">
                                    <div class="details-timeline-item-img border-right">
                                        <img src="assets/icons/coctel.png" alt="details-timeline-1">
                                    </div>
                                    <div class="details-timeline-item-text p-left">
                                        <h2>${translations.details?.timeline?.cocktail?.title || 'Cóctel'}</h2>
                                        <p>${translations.details?.timeline?.cocktail?.description || 'Aperitivo de bienvenida donde podremos compartir los primeros momentos juntos.'}</p>
                                    </div>
                                </div>
                                <div class="details-timeline-item">
                                    <div class="details-timeline-item-text p-right">
                                        <h2>${translations.details?.timeline?.meal?.title || 'Comida'}</h2>
                                        <p>${translations.details?.timeline?.meal?.description || 'Banquete nupcial donde disfrutaremos de una cuidada selección gastronómica.'}</p>
                                    </div>
                                    <div class="details-timeline-item-img border-left">
                                        <img src="assets/icons/food.png" alt="details-timeline-1">
                                    </div>
                                </div>
                                <div class="details-timeline-item">
                                    <div class="details-timeline-item-img border-right">
                                        <img src="assets/icons/dance.png" alt="details-timeline-1">
                                    </div>
                                    <div class="details-timeline-item-text p-left">
                                        <h2>${translations.details?.timeline?.dance?.title || 'Baile'}</h2>
                                        <p>${translations.details?.timeline?.dance?.description || '¡Que empiece la fiesta! Música y baile para celebrar juntos este día tan especial.'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

    const main = document.querySelector('main');
    main.innerHTML = content;
}
function renderStory() {
    const content = `<div class="story-page">
                        <div class="story-container">
                            <div class="story-item">
                                <img src="assets/img/1.jpg" alt="vicky&dani">
                                <p>${translations.story?.paragraphs?.[0] || 'Esta bonita historia comienza a finales de 2020, un año complicado para todos, y que supuso un antes y un después en nuestras vidas.'}</p>
                            </div>
                            <div class="story-item reverse">
                                <img src="assets/img/2.jpeg" alt="vicky&dani">
                                <p>${translations.story?.paragraphs?.[1] || 'A partir de entonces empezamos a construir a base del respeto, admiración, compromiso y amor, nuestra relación, que se celebra cada 29 de octubre, y que cuando celebremos juntos está unión, ¡ya llevaremos 5 años!'}</p>
                            </div>
                            <div class="story-item">
                                <img src="assets/img/3.jpeg" alt="vicky&dani">
                                <p>${translations.story?.paragraphs?.[2] || 'Todo este tiempo hemos vivido muchas cosas, principalmente buenas, y si no eran del todo positivas… siempre le poníamos buena cara. 😁'}</p>
                            </div>
                            <div class="story-item reverse">
                                <img src="assets/img/4.jpeg" alt="vicky&dani">
                                <p>${translations.story?.paragraphs?.[3] || 'Queremos haceros participar en nuestra historia que todavía tiene muchos capítulos por escribir.'}</p>
                            </div>
                            <div class="story-item">
                                <img src="assets/img/5.jpeg" alt="vicky&dani">
                                <p>${translations.story?.paragraphs?.[4] || 'Gracias por estar en nuestras vidas ❤️'}</p>
                            </div>
                        </div>
                    </div>`;

    const main = document.querySelector('main');
    main.innerHTML = content;
}
function renderLogistics() {
    const content = `<div class="logistics-page">
                        <div class="logistics-container">
                            <img src="assets/img/6.jpeg" alt="vicky&dani">
                            <div class="logistics-item">
                                <p>${translations.logistics?.paragraphs?.[0] || 'Para nosotros lo más importante y sin ninguna duda es que todos podáis estar este día tan especial para nosotros. Sois nuestros amigos y familiares, ¡celebrar este día sin vosotros no tendría sentido!'}</p>
                                <p>${translations.logistics?.paragraphs?.[1] || 'Si bien es cierto que todo el que quiera ayudar será recibido con mucha gratitud.'}</p>
                                <p>${translations.logistics?.paragraphs?.[2] || 'Así que recordad, ¡asistencia obligatoria, regalo opcional!'}</p>
                            </div>
                            <div class="money">
                                <p>${translations.logistics?.paragraphs?.[3] || 'Preferimos que el dinero se entregue en efectivo, pero si no es posible, se puede hacer por transferencia.'}</p>
                                <button id="copyButton" class="copy-button">
                                    <span id="accountNumber">ES28 2100 6178 8102 0024 8187</span>
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                            <div class="logistics-item">
                                <p>${translations.logistics?.paragraphs?.[4] || 'De nuevo, recalcamos que lo más importante es vuestra asistencia, pero como anfitriones hemos pensado que para garantizar el disfrute del evento y teniendo en cuenta las horas en las que se va llevar a cabo la celebración, a no ser que sea imprescindible, aconsejamos y preferimos que los más pequeños no nos acompañen este día.'}</p>
                                <p>${translations.logistics?.paragraphs?.[5] || 'Como decimos, si no es posible que queden al cuidado de otros, son más que bienvenidos, y cualquier duda estamos aquí para lo que necesitéis.'}</p>
                            </div>
                        </div>
                    </div>`;

    const main = document.querySelector('main');
    main.innerHTML = content;

    // Añadir la funcionalidad de copiado
    const copyButton = document.getElementById('copyButton');
    
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(accountNumber.textContent);
        copyButton.classList.add('copied');
        setTimeout(() => {
            copyButton.classList.remove('copied');
        }, 1500);
    });
}
function renderConfirmForm() {
    const content = `<div class="confirm-form-container">
                        <form id="whatsappForm">
                            <h1>${translations.form?.title || 'Confirma tu asistencia'}</h1>
                            <div class="form-group">
                                <label for="name">${translations.form?.fields?.name?.label || 'Nombre'}</label>
                                <input type="text" placeholder="${translations.form?.fields?.name?.placeholder || 'Tu nombre'}" id="name" required>
                            </div>
                            <div class="form-group">
                                <label for="lastname">${translations.form?.fields?.lastname?.label || 'Apellidos'}</label>
                                <input type="text" placeholder="${translations.form?.fields?.lastname?.placeholder || 'Tus apellidos'}" id="lastname" required>
                            </div>
                            <div class="form-group">
                                <label for="email">${translations.form?.fields?.email?.label || 'Email'}</label>
                                <input type="email" placeholder="${translations.form?.fields?.email?.placeholder || 'tu@email.com'}" id="email" required>
                            </div>
                            <div class="form-group">
                                <label for="phone">${translations.form?.fields?.phone?.label || 'Teléfono'}</label>
                                <input type="tel" placeholder="${translations.form?.fields?.phone?.placeholder || '+34 XXX XXX XXX'}" id="phone" required>
                            </div>
                            <button type="submit" class="form-submit">${translations.form?.submit || 'Confirmar asistencia'}</button>
                        </form>
                    </div>`;

    const main = document.querySelector('main');
    main.innerHTML = content;
}