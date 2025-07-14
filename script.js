let currentUser = '';
let subjectsData = [];

async function loadSubjects() {
  const res = await fetch('materias.json');
  subjectsData = await res.json();
}

function startApp() {
  const ruInput = document.getElementById('ru-input').value.trim();
  if (!ruInput) {
    alert('Por favor ingresa un número de RU válido.');
    return;
  }
  currentUser = ruInput;
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('current-ru').innerText = 'Usuario actual: ' + currentUser;

  loadSubjects().then(() => {
    renderCurriculum();
    restoreState();
  });
}

function changeUser() {
  currentUser = '';
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('app').classList.add('hidden');
}

function renderCurriculum() {
  const container = document.getElementById('curriculum-grid');
  container.innerHTML = '';

  for (const semester in subjectsData) {
    const semDiv = document.createElement('div');
    semDiv.className = 'semester';

    const title = document.createElement('h3');
    title.textContent = semester;
    semDiv.appendChild(title);

    subjectsData[semester].forEach(subject => {
      const subDiv = document.createElement('div');
      subDiv.className = 'subject state-pending';
      subDiv.setAttribute('data-code', subject.codigo);
      subDiv.innerHTML = `
        <strong>${subject.nombre}</strong>
        <div class="info">
          <span>Créditos: <input type="number" min="1" max="10" value="${subject.creditos || 4}" onchange="updateCredit('${subject.codigo}', this.value)" /></span>
          <span>Nota: <input type="number" step="0.1" min="0" max="10" value="${subject.nota || ''}" onchange="updateNote('${subject.codigo}', this.value)" /></span>
        </div>
      `;
      subDiv.addEventListener('click', () => toggleSubjectState(subDiv));

      semDiv.appendChild(subDiv);
    });

    container.appendChild(semDiv);
  }
}

function updateCredit(code, value) {
  const userState = JSON.parse(localStorage.getItem(`user_${currentUser}`)) || {};
  userState[code] = userState[code] || {};
  userState[code].creditos = parseInt(value);
  localStorage.setItem(`user_${currentUser}`, JSON.stringify(userState));
}

function updateNote(code, value) {
  const userState = JSON.parse(localStorage.getItem(`user_${currentUser}`)) || {};
  userState[code] = userState[code] || {};
  userState[code].nota = parseFloat(value);
  localStorage.setItem(`user_${currentUser}`, JSON.stringify(userState));
}

function toggleSubjectState(element) {
  const code = element.getAttribute('data-code');

  let userState = JSON.parse(localStorage.getItem(`user_${currentUser}`)) || {};

  const states = ['state-pending', 'state-approved', 'state-delayed'];
  const currentClass = Array.from(element.classList).find(cls => states.includes(cls));
  let newIndex = (states.indexOf(currentClass) + 1) % states.length;

  element.classList.remove(...states);
  element.classList.add(states[newIndex]);

  userState[code] = userState[code] || {};
  userState[code].estado = states[newIndex];
  localStorage.setItem(`user_${currentUser}`, JSON.stringify(userState));
}

function restoreState() {
  const userState = JSON.parse(localStorage.getItem(`user_${currentUser}`)) || {};
  Object.keys(userState).forEach(code => {
    const element = document.querySelector(`[data-code="${code}"]`);
    if (element) {
      const estado = userState[code].estado || 'state-pending';
      const nota = userState[code].nota !== undefined ? userState[code].nota : '';
      const creditos = userState[code].creditos !== undefined ? userState[code].creditos : 4;

      // Actualizar clase visual
      const classes = ['state-pending', 'state-approved', 'state-delayed'];
      element.classList.remove(...classes);
      element.classList.add(estado);

      // Actualizar inputs
      const inputs = element.querySelectorAll('input');
      inputs[0].value = creditos;
      inputs[1].value = nota;
    }
  });
}
