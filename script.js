/*
   ARCHIVO PRINCIPAL DE JAVASCRIPT
   Contiene toda la lógica de la aplicación
*/

// Estado global de la aplicación
const state = {
    currentPage: 'login',
    currentUser: null,
    courseStatus: {},
    currentCourse: null
};

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    // Cargar estados guardados de localStorage
    loadCourseStatus();
    
    // Configurar eventos
    document.getElementById('login-btn').addEventListener('click', loginUser);
    document.getElementById('back-to-curriculum').addEventListener('click', () => showPage('curriculum'));
    
    // Configurar selector de estado
    document.querySelectorAll('.status-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.status-option').forEach(o => o.classList.remove('active'));
            option.classList.add('active');
        });
    });
    
    // Guardar estado
    document.getElementById('save-status-btn').addEventListener('click', saveCourseStatus);
    
    // IMPORTANTE: Event listener para redibujar líneas al cambiar tamaño de ventana
    window.addEventListener('resize', function() {
        if (state.currentPage === 'curriculum') {
            // Usar setTimeout para evitar múltiples llamadas durante el redimensionamiento
            setTimeout(drawPrerequisiteLines, 250);
        }
    });
}

// Función de login
function loginUser() {
    const name = document.getElementById('student-name').value.trim();
    const id = document.getElementById('student-id').value.trim();
    
    if (!name || !id) {
        alert('Por favor ingrese su nombre y número de registro.');
        return;
    }
    
    state.currentUser = { name, id };
    document.getElementById('username-display').textContent = name;
    showPage('curriculum');
    renderConceptMap();
    renderStats();
}

// Mostrar diferentes páginas
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    document.getElementById(`${page}-page`).classList.add('active-page');
    state.currentPage = page;
    
    // Si vamos a la página del currículum, redibujar las líneas
    if (page === 'curriculum') {
        setTimeout(drawPrerequisiteLines, 100);
    }
}

// Cargar estados desde localStorage
function loadCourseStatus() {
    const savedStatus = localStorage.getItem('courseStatus');
    if (savedStatus) {
        state.courseStatus = JSON.parse(savedStatus);
    }
}

// Guardar estado de una materia
function saveCourseStatus() {
    if (!state.currentCourse) return;
    
    const selectedOption = document.querySelector('.status-option.active');
    if (!selectedOption) return;
    
    const status = selectedOption.dataset.status;
    state.courseStatus[state.currentCourse.id] = status;
    localStorage.setItem('courseStatus', JSON.stringify(state.courseStatus));
    
    // Actualizar la visualización en la malla
    renderConceptMap();
    renderStats();
    
    // Volver a la malla
    showPage('curriculum');
}

// Renderizar el mapa conceptual
function renderConceptMap() {
    const container = document.getElementById('concept-map');
    container.innerHTML = '';
    
    curriculumData.forEach((semesterData, semesterIndex) => {
        const semesterColumn = document.createElement('div');
        semesterColumn.className = 'semester-column';
        
        const header = document.createElement('div');
        header.className = 'semester-header';
        header.textContent = semesterData.semester;
        semesterColumn.appendChild(header);
        
        semesterData.courses.forEach((course, courseIndex) => {
            const status = state.courseStatus[course.id] || 'no_inscrita';
            
            const courseNode = document.createElement('div');
            courseNode.className = `course-node ${status}`;
            courseNode.dataset.id = course.id;
            courseNode.innerHTML = `
                <div class="course-code">${course.code}</div>
                <div class="course-name">${course.name}</div>
                <div class="course-meta">
                    <div class="course-credits">${course.credits} CR</div>
                    <div class="course-status ${status}">
                        ${getStatusText(status)}
                    </div>
                </div>
            `;
            
            courseNode.addEventListener('click', () => {
                state.currentCourse = course;
                showCourseDetail();
            });
            
            semesterColumn.appendChild(courseNode);
        });
        
        container.appendChild(semesterColumn);
    });
    
    // Dibujar líneas de prerrequisitos
    drawPrerequisiteLines();
}

/* 
   IMPORTANTE: FUNCIÓN PARA DIBUJAR LÍNEAS DE PRERREQUISITOS
   ==========================================================
   Esta función calcula y dibuja las líneas que conectan las materias
   con sus prerrequisitos. Para hacerla responsive:
   
   1. Se llama cada vez que se renderiza el mapa
   2. Se vuelve a llamar cuando la ventana cambia de tamaño (evento resize)
   3. Usa getBoundingClientRect() para calcular posiciones relativas
   
   PARA HACERLO MÁS RESPONSIVE:
   - Considera usar SVG en lugar de divs para las líneas
   - Podrías implementar un sistema de cuadrícula más flexible
   - En dispositivos muy pequeños, podrías ocultar las líneas
*/

function drawPrerequisiteLines() {
    const mapContainer = document.getElementById('concept-map');
    if (!mapContainer) return;
    
    // Eliminar líneas anteriores
    const existingLines = document.querySelectorAll('.prerequisite-line');
    existingLines.forEach(line => line.remove());
    
    curriculumData.forEach((semesterData, semesterIndex) => {
        semesterData.courses.forEach(course => {
            course.prerequisites.forEach(prereqName => {
                // Buscar el curso prerrequisito
                const prereqCourse = findCourseByName(prereqName);
                if (!prereqCourse) return;
                
                // Buscar elementos DOM
                const prereqElement = document.querySelector(`.course-node[data-id="${prereqCourse.id}"]`);
                const courseElement = document.querySelector(`.course-node[data-id="${course.id}"]`);
                
                if (!prereqElement || !courseElement) return;
                
                // Calcular posiciones relativas al contenedor
                const prereqRect = prereqElement.getBoundingClientRect();
                const courseRect = courseElement.getBoundingClientRect();
                const mapRect = mapContainer.getBoundingClientRect();
                
                // IMPORTANTE: Para responsive, considerar el scroll del contenedor
                const scrollLeft = mapContainer.scrollLeft;
                const scrollTop = mapContainer.scrollTop;
                
                const startX = prereqRect.left - mapRect.left + scrollLeft + prereqRect.width;
                const startY = prereqRect.top - mapRect.top + scrollTop + (prereqRect.height / 2);
                const endX = courseRect.left - mapRect.left + scrollLeft;
                const endY = courseRect.top - mapRect.top + scrollTop + (courseRect.height / 2);
                
                // Calcular distancia y ángulo
                const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
                
                // Crear línea
                const line = document.createElement('div');
                line.className = 'prerequisite-line';
                line.style.width = `${distance}px`;
                line.style.left = `${startX}px`;
                line.style.top = `${startY}px`;
                line.style.transform = `rotate(${angle}deg)`;
                
                mapContainer.appendChild(line);
            });
        });
    });
}

// Buscar curso por nombre
function findCourseByName(name) {
    for (const semester of curriculumData) {
        for (const course of semester.courses) {
            if (course.name === name) {
                return course;
            }
        }
    }
    return null;
}

// Renderizar estadísticas
function renderStats() {
    const statsContainer = document.getElementById('stats-container');
    statsContainer.innerHTML = '';
    
    let totalCourses = 0;
    let approvedCount = 0;
    let registeredCount = 0;
    let failedCount = 0;
    
    curriculumData.forEach(semester => {
        totalCourses += semester.courses.length;
        semester.courses.forEach(course => {
            const status = state.courseStatus[course.id] || 'no_inscrita';
            if (status === 'aprobada') approvedCount++;
            if (status === 'registrada') registeredCount++;
            if (status === 'aplazada') failedCount++;
        });
    });
    
    const stats = [
        { value: totalCourses, label: "Total Materias", className: "total-courses" },
        { value: approvedCount, label: "Aprobadas", className: "approved-courses" },
        { value: registeredCount, label: "Registradas", className: "registered-courses" },
        { value: failedCount, label: "Aplazadas", className: "failed-courses" }
    ];
    
    stats.forEach(stat => {
        const statCard = document.createElement('div');
        statCard.className = `stat-card ${stat.className}`;
        statCard.innerHTML = `
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
        `;
        statsContainer.appendChild(statCard);
    });
}

// Mostrar detalles de una materia
function showCourseDetail() {
    if (!state.currentCourse) return;
    
    const course = state.currentCourse;
    const status = state.courseStatus[course.id] || 'no_inscrita';
    
    // Encontrar el semestre
    let semester = '';
    curriculumData.forEach(s => {
        if (s.courses.some(c => c.id === course.id)) {
            semester = s.semester;
        }
    });
    
    // Actualizar datos en la página
    document.getElementById('course-detail-title').textContent = course.name;
    document.getElementById('course-code').textContent = course.code;
    document.getElementById('course-name').textContent = course.name;
    document.getElementById('course-semester').textContent = semester;
    document.getElementById('course-credits').textContent = `${course.credits} créditos`;
    document.getElementById('course-prerequisites').textContent = course.prerequisites.join(', ') || 'Ninguno';
    
    // Actualizar selector de estado
    document.querySelectorAll('.status-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.status === status) {
            option.classList.add('active');
        }
    });
    
    showPage('course-detail');
}

// Obtener texto del estado
function getStatusText(status) {
    const statusTexts = {
        'no_inscrita': 'No Inscrita',
        'registrada': 'Registrada',
        'aprobada': 'Aprobada',
        'aplazada': 'Aplazada'
    };
    return statusTexts[status] || 'No Inscrita';
}
}
