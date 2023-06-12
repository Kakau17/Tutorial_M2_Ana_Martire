var nomeId = "#nome";
var nomeCursoId = "#dataCurso1";
var resumoAlterado = "#resumoAlterado";
$('#formHeader').on('submit', function(event){
    event.preventDefault();
    let nome = $(novoNome).val();
    $(nomeId).text(nome);
});

$('#formCurso1').on('submit', function(event) {
    event.preventDefault();
    let data = $(novoDataCurso).val();
    $(nomeCursoId).text(data);
});

function resumoAleatorio() {
    let random_number = Math.floor(Math.random() * (200 - 1) + 1)
    var url = (`https://jsonplaceholder.typicode.com/todos/${random_number}`);

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();
    let resposta = JSON.parse(xhttp.responseText)
    $(resumoAlterado).text(resposta.title);
}