document.addEventListener("DOMContentLoaded", () => {

    // 1. Selecciona todos los elementos que tienen la clase que creamos
    const cuadrosAnimados = document.querySelectorAll('.cuadro-animado');

    // 2. Define la función de "vigilancia"
    const callback = (entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento entra en el campo de visión...
            if (entry.isIntersecting) {
                // ... le añade la clase que lo hace visible y grande
                entry.target.classList.add('is-visible');
            } else {
                // Si el elemento sale del campo de visión (al hacer scroll hacia arriba o abajo)...
                // ... le quita la clase para que el efecto se revierta.
                entry.target.classList.remove('is-visible');
            }
        });
    };

    // 3. Opciones: dispara la animación cuando el 10% del elemento es visible
    const options = {
        threshold: 0.1 
    };

    // 4. Crea y ejecuta el observador
    const observer = new IntersectionObserver(callback, options);

    // 5. Asigna el observador a cada uno de los elementos
    cuadrosAnimados.forEach(cuadro => {
        observer.observe(cuadro);
    });

});
