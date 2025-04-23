// Clase Alumno
class Alumno {
    constructor(nombre, edad, curso, email, notas, asignaturas) {
        this.nombre = nombre;
        this.edad = edad;
        this.curso = curso;
        this.email = email;
        this.notas = notas;
        this.asignaturas = asignaturas;
    }

    // Método para calcular la nota media
    calcularMedia() {
        const suma = this.notas.reduce((acc, nota) => acc + nota, 0);
        return (suma / this.notas.length).toFixed(2);
    }
}

// Crear objetos de tipo Alumno
const alumno1 = new Alumno(
    "Mario Pérez",
    20,
    "2º Bachillerato",
    "mario.perez@example.com",
    [8, 7.5, 9, 6],
    ["Matemáticas", "Física", "Química", "Historia"]
);

const alumno2 = new Alumno(
    "Laura Gómez",
    19,
    "1º Bachillerato",
    "laura.gomez@example.com",
    [9, 8.5, 7, 8],
    ["Lengua", "Inglés", "Biología", "Geografía"]
);

const alumno3 = new Alumno(
    "Carlos Ruiz",
    21,
    "3º ESO",
    "carlos.ruiz@example.com",
    [6, 7, 8, 7.5],
    ["Filosofía", "Arte", "Música", "Educación Física"]
);

// Función para crear una ficha de alumno
function crearFichaAlumno(alumno) {
    const ficha = document.createElement("div");
    ficha.style.border = "1px solid #ccc";
    ficha.style.borderRadius = "8px";
    ficha.style.padding = "16px";
    ficha.style.margin = "16px";
    ficha.style.backgroundColor = "#f9f9f9";

    ficha.innerHTML = `
        <h2>${alumno.nombre}</h2>
        <p><strong>Edad:</strong> ${alumno.edad}</p>
        <p><strong>Curso:</strong> ${alumno.curso}</p>
        <p><strong>Email:</strong> ${alumno.email}</p>
        <h3>Asignaturas y Notas:</h3>
        <ul>
            ${alumno.asignaturas
                .map((asignatura, index) => `<li>${asignatura}: ${alumno.notas[index]}</li>`)
                .join("")}
        </ul>
        <p><strong>Nota Media:</strong> ${alumno.calcularMedia()}</p>
    `;

    document.body.appendChild(ficha);
}

// Mostrar fichas de los alumnos creados
crearFichaAlumno(alumno1);
crearFichaAlumno(alumno2);
crearFichaAlumno(alumno3);

// Formulario para añadir nuevos alumnos
const formulario = document.createElement("form");
formulario.innerHTML = `
    <h3>Añadir Nuevo Alumno</h3>
    <label>Nombre: <input type="text" id="nombre" required></label><br>
    <label>Edad: <input type="number" id="edad" required></label><br>
    <label>Curso: <input type="text" id="curso" required></label><br>
    <label>Email: <input type="email" id="email" required></label><br>
    <label>Asignaturas (separadas por coma): <input type="text" id="asignaturas" required></label><br>
    <label>Notas (separadas por coma): <input type="text" id="notas" required></label><br>
    <button type="submit">Añadir Alumno</button>
`;

document.body.appendChild(formulario);

// Manejar el envío del formulario
formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const edad = parseInt(document.getElementById("edad").value);
    const curso = document.getElementById("curso").value;
    const email = document.getElementById("email").value;
    const asignaturas = document.getElementById("asignaturas").value.split(",");
    const notas = document.getElementById("notas").value.split(",").map(Number);

    const nuevoAlumno = new Alumno(nombre, edad, curso, email, notas, asignaturas);
    crearFichaAlumno(nuevoAlumno);

    formulario.reset();
});