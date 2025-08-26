const mensajes = [
  "Estoy aprendiendo JavaScript y java",
  "Me llama la atencion el diseño web ",
  "La práctica hace al maestro "
];

function cambiarMensaje() {
  const mensajeEl = document.getElementById('mensaje');
  const nuevo = mensajes[Math.floor(Math.random() * mensajes.length)];
  mensajeEl.textContent = nuevo;
}

function aplicarTemaGuardado() {
  const tema = localStorage.getItem('tema') || 'claro';
  const esOscuro = tema === 'oscuro';
  document.body.classList.toggle('oscuro', esOscuro);
  const btn = document.getElementById('temaBtn');
  btn.setAttribute('aria-pressed', String(esOscuro));
  btn.textContent = esOscuro ? 'Modo claro' : 'Modo oscuro';
}

function toggleTema() {
  const esOscuro = !document.body.classList.contains('oscuro');
  document.body.classList.toggle('oscuro', esOscuro);
  localStorage.setItem('tema', esOscuro ? 'oscuro' : 'claro');
  aplicarTemaGuardado();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("anio").textContent = new Date().getFullYear();

  aplicarTemaGuardado();

  // 🔹 Cargar datos dinámicos desde JSON
  fetch("datos.json")
    .then(res => res.json())
    .then(data => {
      document.getElementById("nombre").textContent = data.nombre;
      document.getElementById("nombre2").textContent = data.nombre;
      document.getElementById("mensaje").textContent = data.sobreMi;

      // Habilidades
      const lista = document.getElementById("listaHabilidades");
      lista.innerHTML = "";
      data.habilidades.forEach(hab => {
        const li = document.createElement("li");
        li.textContent = hab;
        lista.appendChild(li);
      });

      // Contacto
      const correo = document.getElementById("correo");
      correo.textContent = data.contacto;
      correo.href = "mailto:" + data.contacto;
    })
    .catch(err => console.error("Error cargando datos:", err));
});
