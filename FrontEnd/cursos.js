let cursos = [];
let currentCursoId = null;

function openModal(modalId){
    document.getElementById(modalId).style.display = 'block';
}  

function closeModal(modalId){
    document.getElementById(modalId).style.display = 'none';
}  

const btAddCurso = document.getElementById('addCurso');
btAddCurso.addEventListener('click', function(){
    currentCursoId = null;
    document.getElementById('cursoForm').reset();
    openModal('cursoModal');
})

document.querySelectorAll('.close').forEach(function(closeBtn){
    closeBtn.addEventListener('click', function(){
        closeModal('cursoModal')
    })
})

function renderCursos(){
    const tbody = document.querySelector("#cursosTable tbody")
    tbody.innerHTML= '';

    fetch('http://localhost:3000/cursos')
        .then(response => response.json())
        .then(dadosRecebidos => {
            cursos = dadosRecebidos; 
            console.log(cursos);

            cursos.forEach ((curso, index) => {
                const row = document.createElement ('tr');
                row.innerHTML = `
                    <td>${curso.nomeCurso}</td>
                    <td>${curso.semestres}</td>
                    <td>${curso.coordenador}</td>
                    <td>
                        <button onclick = "editCurso(${index})">Editar</button>
                        <button onclick = "deleteCurso(${index})">Excluir</button>
                    </td>
                `;
                tbody.appendChild (row);
            });
        })
        .catch(error => console.error("Erro ao buscar cursos:", error));
}

document.addEventListener('DOMContentLoaded', function(){
    renderCursos();
});

function editCurso(index){
    const curso = cursos[index];
    document.getElementById('codigo').value = curso.codigo;
    document.getElementById('nomeCurso').value = curso.nomeCurso;
    document.getElementById('semestres').value = curso.semestres;
    document.getElementById('coordenador').value = curso.coordenador;
    
    currentCursoId = index;
    openModal('cursoModal')
}

function deleteCurso (index) {
    if (confirm('Tem certeza que quer prosseguir com a exclusão?')){
        fetch(`http://localhost:3000/cursos/${index}`, {
            method: 'DELETE'
        })
        .then(() => {
            renderCursos(); // Recarregr
        })
        .catch(error => console.error("Erro ao eliminar curso:", error));
    }
}

function addCurso (codigo, nomeCurso, semestres, coordenador){
    let curso = {codigo, nomeCurso, semestres, coordenador};
    console.log(curso);

    fetch('http://localhost:3000/cursos', {
        method: 'POST',
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(curso)
    })
    .then(() => {
        renderCursos(); // Recarregar
    })
    .catch(error => console.error("Erro ao adicionar curso:", error));
}

const cursoForm = document.getElementById('cursoForm');
cursoForm.addEventListener ('submit', function (e){
    e.preventDefault();
    const codigo = document.getElementById ('codigo').value;
    const nomeCurso = document.getElementById ('nomeCurso').value;
    const semestres = document.getElementById ('semestres').value;
    const coordenador = document.getElementById ('coordenador').value;
    
    let curso = {codigo, nomeCurso, semestres, coordenador};

    // Editar
    if (currentCursoId !== null) {
        fetch(`http://localhost:3000/cursos/${currentCursoId}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(curso)
        })
        .then(() => {
            currentCursoId = null; 
            closeModal('cursoModal');
            renderCursos(); // Recarregar
        })
        .catch(error => console.error("Erro ao editar curso:", error));
    } else {
        addCurso (codigo, nomeCurso, semestres, coordenador);
        closeModal ('cursoModal');
    }
});