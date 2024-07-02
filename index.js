
function abrirModal(){
    overlay.classList.add("active");
    criarTarefa.classList.add("active");
}
function fecharModal(){
    overlay.classList.remove("active");
    criarTarefa.classList.remove("active");
}

function buscarTarefas(){
    fetch("http://localhost:3000/tarefas")
    .then(res => res.json())
    .then(res => {
        lista.innerHTML = ""; 
        inserirTarefas(res);
    })
} buscarTarefas();

function inserirTarefas(listaDeTarefas){
        listaDeTarefas.innerHTML = ""
        listaDeTarefas.map(tarefa => {
            lista.innerHTML += `<li><h5>${tarefa.titulo}</h5><p>${tarefa.descricao}</p><div class='actions'><i class='bx bx-trash bx-sm' onclick="deletarTarefas(${tarefa.id})"></i></div></li>`;
        })
}

function deletarTarefas(id){
    if(confirm("Tem certeza de que deseja deletar a tarefa?")){
        fetch(`http://localhost:3000/tarefas/${id}`, {
            method: "DELETE"
        })
        .then(res => {
            if (res.ok) {
                const tarefaElement = document.querySelector(`li[data-id="${id}"]`);
                tarefaElement.remove();
                buscarTarefas();
            }
        })
        .catch(error => {
            console.error("Erro ao deletar tarefa:", error);
            buscarTarefas();
        });
    }
}

document.getElementById('busca').addEventListener('input', filtrarTarefas);
function filtrarTarefas(){  
    const termoBusca = document.getElementById('busca').value.toLowerCase();
    const tarefas = document.querySelectorAll('#lista li');
    encontrouTarefa = false;

    tarefas.forEach(tarefa => {
        const titulo = tarefa.querySelector('h5').textContent.toLowerCase();
        if (titulo.includes(termoBusca)) {
            tarefa.style.display = '';
            encontrouTarefa = true;
        } else {
            tarefa.style.display = 'none';
        }
    });
    if (encontrouTarefa) {
        resulttext.style.display = 'none';
    } else {
        resulttext.style.display = 'block';
    }
}

function novaTarefa(){
    event.preventDefault();
    event.stopPropagation();
    let tarefa = {
        titulo: titulo.value,
        descricao: descricao.value
    }
    fetch("http://localhost:3000/tarefas", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(tarefa)
    })
    .then(res => res.json())
    .then(res => {
        fecharModal();
        buscarTarefas();
    })
}
