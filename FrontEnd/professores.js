let professoresLista = []; 
let currentProfessoresId = null;

function openModal(modalId){
    document.getElementById(modalId).style.display = 'block';
}  

function closeModal(modalId){
    document.getElementById(modalId).style.display = 'none';
}  

const btAddProfessores = document.getElementById('addProfessores');
btAddProfessores.addEventListener('click', function(){
    currentProfessoresId = null;
    document.getElementById('professorForm').reset();
    openModal('professorModal');
})

document.querySelectorAll('.close').forEach(function(closeBtn){
    closeBtn.addEventListener('click', function(){
        closeModal('professorModal')
    })
})

function renderProfessores(){
    const tbody = document.querySelector("#professoresTable tbody");
    tbody.innerHTML = '';

    fetch('http://localhost:3000/professores')
        .then(response => response.json())
        .then(dadosRecebidos => {
            professoresLista = dadosRecebidos; 
            console.log(professoresLista);

            professoresLista.forEach((prof, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${prof.nomeProfessor}</td>
                    <td>${prof.email}</td>
                    <td>${prof.sala}</td>
                    <td>${prof.cursoInscrito}</td>
                    <td>
                        <button onclick="editProfessor(${index})">Editar</button>
                        <button onclick="deleteProfessor(${index})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error("Erro ao buscar professores:", error));
}

document.addEventListener('DOMContentLoaded', function(){
    renderProfessores();
});

function editProfessor(index){
    const professor = professoresLista[index]; 
    document.getElementById('codigo').value = professor.codigo;
    document.getElementById('nomeProfessor').value = professor.nomeProfessor;
    document.getElementById('email').value = professor.email;
    document.getElementById('sala').value = professor.sala;
    document.getElementById('cursoInscrito').value = professor.cursoInscrito;

    currentProfessoresId = index;
    openModal('professorModal');
}

function deleteProfessor(index) {
    if (confirm('Tem certeza que quer prosseguir com a exclusão?')) {
        fetch(`http://localhost:3000/professores/${index}`, {
            method: 'DELETE'
        })
        .then(() => {
            renderProfessores(); // Recarregar 
        })
        .catch(error => console.error("Erro ao excluir:", error));
    }
}

function addProfessor(codigo, nomeProfessor, email, sala, cursoInscrito){
    let professor = {codigo, nomeProfessor, email, sala, cursoInscrito}
    
    fetch('http://localhost:3000/professores', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(professor)
    })
    .then(() => {
        renderProfessores(); // Recarregar 
    })
    .catch(error => console.error("Erro ao inserir:", error));
}

const professorForm = document.getElementById('professorForm');
professorForm.addEventListener('submit', function (e){
    e.preventDefault();
    const codigo = document.getElementById('codigo').value;
    const nomeProfessor = document.getElementById('nomeProfessor').value;
    const email = document.getElementById('email').value;
    const sala = document.getElementById('sala').value;
    const cursoInscrito = document.getElementById('cursoInscrito').value;

    let professor = {codigo, nomeProfessor, email, sala, cursoInscrito};

    // Editar
    if (currentProfessoresId !== null) {
        fetch(`http://localhost:3000/professores/${currentProfessoresId}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(professor)
        })
        .then(() => {
            currentProfessoresId = null; 
            closeModal('professorModal');
            renderProfessores(); 
        })
        .catch(error => console.error("Erro ao editar:", error));
    } else {
        // inserir
        addProfessor(codigo, nomeProfessor, email, sala, cursoInscrito);
        closeModal('professorModal');
    }
});