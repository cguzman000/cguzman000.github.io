document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');

    // Cierra todos los <details> que NO estén dentro del elemento 'exceptEl'
    const closeDetailsOutside = (exceptEl) => {
        document.querySelectorAll('details[open]').forEach(d => {
            if (!exceptEl || !exceptEl.contains(d)) d.removeAttribute('open');
        });
    };

    // Maneja click en links de navegación: activa la clase y cierra detalles del contenedor anterior
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const href = this.getAttribute('href') || '';
            const target = href.startsWith('#') ? document.querySelector(href) : null;
            // cerramos todos los details que no estén dentro del target
            closeDetailsOutside(target);
        });
    });

    // Cuando cambia el hash (navegación por anclas) cerramos los detalles fuera de la sección destino
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash || '';
        const target = hash.startsWith('#') ? document.querySelector(hash) : null;
        closeDetailsOutside(target);
    });

    // Soporte adicional: si tienes botones/controles que cambian 'container', añade el atributo
    // `data-target-section="#ID"` al botón; el script detectará clicks y cerrará los details fuera del target.
    document.querySelectorAll('[data-target-section]').forEach(btn => {
        btn.addEventListener('click', () => {
            const sel = btn.getAttribute('data-target-section');
            const target = sel ? document.querySelector(sel) : null;
            closeDetailsOutside(target);
        });
    });
    
    // Al abrir un <details> en un container, cerrar los <details> abiertos de otros containers
    document.querySelectorAll('details').forEach(detail => {
        detail.addEventListener('toggle', () => {
            if (!detail.open) return; // sólo actuamos al abrir
            const container = detail.closest('.container') || detail.closest('section') || document;
            document.querySelectorAll('details[open]').forEach(d => {
                if (d === detail) return;
                if (!container.contains(d)) d.removeAttribute('open');
            });
        });
    });
});
