const url = '/coletores';
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((coletores) => {
                var saida = '<table border=5>';
                coletores.forEach((elemento) => {
                    saida += "<tr><td>" + elemento.NOME_COLETOR + "</td></tr>";
                });
                saida += "</table>"
                document.getElementById('lista_coletores').innerHTML = saida;
            });