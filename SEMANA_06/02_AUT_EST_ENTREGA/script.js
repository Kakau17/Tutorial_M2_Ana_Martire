var nomeId = "#nome";
var nomeCursoId = "#dataCurso1";

$('#formHeader').on('submit', function(event) {
    event.preventDefault();
    let nome = $(novoNome).val();
    $(nomeId).text(nome);
});

$('#formCurso1').on('submit', function(event) {
    event.preventDefault();
    let data = $(novoDataCurso).val();
    $(nomeCursoId).text(data);
});