document.addEventListener('DOMContentLoaded', function() {

    // --- User Data ---
    const usuarios = [
        ["usuario1", "cont1"],
        ["usuario2", "cont2"],
        ["usuario3", "cont3"],
        ["usuario4", "cont4"],
        ["usuario5", "cont5"]
    ];

    // --- Login Form Logic ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const usuario = document.getElementById('usuario').value;
            const contrasenya = document.getElementById('contrasenya').value;
            const cancelarBtn = document.getElementById('cancelarBtn');

            if (usuarios.some(u => u[0] === usuario && u[1] === contrasenya)) {
                if (cancelarBtn) {
                    cancelarBtn.click(); // This is for closing the modal
                }
                alert("Has iniciado sesión correctamente");
            } else {
                alert("El usuario no existe, prueba con: " + usuarios.map(u => u[0]).join(', '));
            }
        });
    }

    // --- Nav Logo Reload ---
    const navLogo = document.getElementById('nav-logo');
    if (navLogo) {
        navLogo.addEventListener('click', function() {
            window.location.href = './index.html';
        });
    }

    // --- Combined Scroll Logic ---
    const navbar = document.querySelector('.navbar');
    const parallaxContainers = document.querySelectorAll('.container-sliders-parallax');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;

        // Navbar scroll effect
        if (navbar) {
            if (scrolled > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }

        // Parallax effect
        if (parallaxContainers.length > 0) {
            const speed = 0.7;
            parallaxContainers.forEach(function(container) {
                const yPos = -(scrolled * speed);
                container.style.backgroundPosition = 'center ' + yPos + 'px';
            });
        }
    });

    // --- jQuery dependent scripts ---
    function initializeJQueryPlugins() {
        if (window.jQuery && $.fn.lightSlider) {
            // Light-Slider Initialization
            const sliderOptions = {
                gallery: false,
                pager: false,
                item: 1,
                loop: true,
                slideMargin: 0,
                thumbItem: 5,
                galleryMargin: 5,
                thumbMargin: 5,
                adaptiveHeight: true,
                auto: true,
                pause: 2000,
                speed: 1000
            };
            const sliderIds = ["#lightSlider1", "#lightSlider2"];
            sliderIds.forEach(id => {
                if ($(id).length) {
                    $(id).lightSlider(sliderOptions);
                }
            });
        } else {
            setTimeout(initializeJQueryPlugins, 100);
        }
    }
    initializeJQueryPlugins();

    // --- Library Initializations ---

    // AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis();

        // Sync AOS with Lenis scroll to fix animation timing
        lenis.on('scroll', AOS.refresh);

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }
});