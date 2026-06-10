// Menu Mobile Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if(mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if(navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Fermer le menu au clic sur un lien (sur mobile)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if(navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileBtn.querySelector('i').classList.remove('fa-times');
                    mobileBtn.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // Carousel Témoignages
    const testimonials = document.querySelectorAll('.testimonial-slide');
    if(testimonials.length > 0) {
        let currentSlide = 0;
        
        function showSlide(index) {
            testimonials.forEach(slide => slide.style.display = 'none');
            testimonials[index].style.display = 'block';
            testimonials[index].style.animation = 'fadeIn 0.5s ease-in-out';
        }
        
        // Initialiser
        showSlide(currentSlide);
        
        // Auto-rotation toutes les 5 secondes
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // Animations au défilement (Scroll Animations)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
});

// Formatage WhatsApp Formulaire de Réservation
function handleReservationSubmit(event) {
    event.preventDefault();
    
    // Récupérer les valeurs
    const nom = document.getElementById('nom').value;
    const telephone = document.getElementById('telephone').value;
    const email = document.getElementById('email').value;
    const villeDepart = document.getElementById('ville_depart').value;
    const destination = document.getElementById('destination').value;
    const dateAller = document.getElementById('date_aller').value;
    const dateRetour = document.getElementById('date_retour').value || 'Non précisé';
    const nbVoyageurs = document.getElementById('nb_voyageurs').value;
    const typeVoyage = document.getElementById('type_voyage').value;
    const message = document.getElementById('message').value || 'Aucun message supplémentaire';
    
    // Construire le message (format exact exigé)
    const waMessage = `*NOUVELLE DEMANDE DE VOYAGE*

*Nom et Prénoms :*
${nom}

*Téléphone :*
${telephone}

*Email :*
${email}

*Ville de départ :*
${villeDepart}

*Destination :*
${destination}

*Date Aller :*
${dateAller}

*Date Retour :*
${dateRetour}

*Nombre de voyageurs :*
${nbVoyageurs}

*Type de voyage :*
${typeVoyage}

*Message :*
${message}`;

    // Encoder l'URL et rediriger
    const encodedMessage = encodeURIComponent(waMessage);
    const waNumber = "22898337956"; // Numéro choisi par le client (+228 98 33 79 56)
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;
    
    window.open(waUrl, '_blank');
}

// LOGIQUE DE LA MODALE DES BILLETS
function openTicketModal(destinationStr, typeVoyageStr, departStr) {
    const modal = document.getElementById('ticketModal');
    if(modal) {
        // Pré-remplir la destination, le type de voyage et la ville de départ si possible
        const destInput = document.getElementById('m_destination');
        if(destInput && destinationStr) destInput.value = destinationStr;
        
        const typeInput = document.getElementById('m_type_voyage');
        if(typeInput && typeVoyageStr) {
            // Sélectionner la bonne option
            for(let i=0; i<typeInput.options.length; i++) {
                if(typeInput.options[i].value === typeVoyageStr) {
                    typeInput.selectedIndex = i;
                    break;
                }
            }
        }
        
        const departInput = document.getElementById('m_ville_depart');
        if(departInput && departStr) departInput.value = departStr;
        else if (departInput) departInput.value = 'Lomé'; // Valeur par défaut
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêcher le scroll de la page
    }
}

function closeTicketModal() {
    const modal = document.getElementById('ticketModal');
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Réactiver le scroll
    }
}

// Fermer la modale si on clique en dehors du contenu
document.addEventListener('click', (e) => {
    const modal = document.getElementById('ticketModal');
    if(modal && e.target === modal) {
        closeTicketModal();
    }
});

function handleTicketReservation(event) {
    event.preventDefault();
    
    // Récupérer les valeurs du formulaire de la modale
    const nom = document.getElementById('m_nom').value;
    const telephone = document.getElementById('m_telephone').value;
    const email = document.getElementById('m_email').value;
    const villeDepart = document.getElementById('m_ville_depart').value;
    const destination = document.getElementById('m_destination').value;
    const dateAller = document.getElementById('m_date_aller').value;
    const dateRetour = document.getElementById('m_date_retour').value || 'Non précisé';
    const nbVoyageurs = document.getElementById('m_nb_voyageurs').value;
    const typeVoyage = document.getElementById('m_type_voyage').value;
    const message = document.getElementById('m_message').value || 'Aucun message supplémentaire';
    
    // Construire le message
    const waMessage = `*NOUVELLE RÉSERVATION DE BILLET*

*Nom et Prénoms :*
${nom}

*Téléphone :*
${telephone}

*Email :*
${email}

*Ville de départ :*
${villeDepart}

*Destination :*
${destination}

*Date Aller :*
${dateAller}

*Date Retour :*
${dateRetour}

*Nombre de voyageurs :*
${nbVoyageurs}

*Type de voyage :*
${typeVoyage}

*Message :*
${message}`;

    // Encoder l'URL et rediriger
    const encodedMessage = encodeURIComponent(waMessage);
    const waNumber = "22898337956";
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;
    
    window.open(waUrl, '_blank');
    closeTicketModal();
}

// LOGIQUE DE LA MODALE DES SERVICES
function openServiceModal(sujet) {
    const modal = document.getElementById('serviceModal');
    if(modal) {
        const sujetInput = document.getElementById('s_sujet');
        if(sujetInput && sujet) {
            sujetInput.value = sujet;
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Ajouter le clic en dehors pour fermer la modale de service
document.addEventListener('click', (e) => {
    const modal = document.getElementById('serviceModal');
    if(modal && e.target === modal) {
        closeServiceModal();
    }
});

function handleServiceSubmit(event) {
    event.preventDefault();
    
    // Récupérer les valeurs
    const nom = document.getElementById('s_nom').value;
    const prenom = document.getElementById('s_prenom').value;
    const email = document.getElementById('s_email').value;
    const sujet = document.getElementById('s_sujet').value;
    const message = document.getElementById('s_message').value;
    
    // Construire le message
    const waMessage = `*NOUVELLE DEMANDE DE SERVICE*

*Nom :* ${nom}
*Prénom :* ${prenom}
*Email :* ${email}
*Service demandé :* ${sujet}

*Message :*
${message}`;

    // Encoder l'URL et rediriger
    const encodedMessage = encodeURIComponent(waMessage);
    const waNumber = "22898337956";
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;
    
    window.open(waUrl, '_blank');
    closeServiceModal();
}
