const eTiposAgenda = document.getElementById('tiposDeAgenda');

function montaTiposAgenda() {
    eTiposAgenda.innerHTML = '';

    tiposAgenda.forEach(tipoAgenda => {
        let eTipoAgenda = document.createElement('div');
        let eTextoTipoAgenda = document.createElement('input');
        let eCorTipoAgenda = document.createElement('input');
        let eBotaoDeletarTipoAgenda = document.createElement('div');

        var tituloTipoAgenda = tipoAgenda.titulo;
        var corTipoAgenda = tipoAgenda.cor;

        eTipoAgenda.classList.add('tipoAgenda');
        eTipoAgenda.style.backgroundColor = tipoAgenda.cor;

        eTextoTipoAgenda.type = 'text';
        eTextoTipoAgenda.value = tipoAgenda.titulo;
        eTextoTipoAgenda.style.backgroundColor = tipoAgenda.cor;

        eCorTipoAgenda.value = tipoAgenda.cor;

        eBotaoDeletarTipoAgenda.innerText = 'Deletar';
        eBotaoDeletarTipoAgenda.classList.add('botaoDeletarTipoAgenda');

        eTipoAgenda.appendChild(eTextoTipoAgenda);
        eTipoAgenda.appendChild(eCorTipoAgenda);
        eTipoAgenda.appendChild(eBotaoDeletarTipoAgenda);

        eTextoTipoAgenda.addEventListener('blur', function () {
            if (eTextoTipoAgenda.value !== tituloTipoAgenda) {
                tiposAgenda = tiposAgenda.filter(tipoAgenda => tipoAgenda.titulo !== tituloTipoAgenda);
                tiposAgenda.push({
                    titulo: eTextoTipoAgenda.value,
                    cor: eCorTipoAgenda.value
                });

                setTiposAgenda();
                tituloTipoAgenda = eTextoTipoAgenda.value;
            }
        })

        eCorTipoAgenda.addEventListener('blur', function () {
            if (eCorTipoAgenda.value !== corTipoAgenda) {
                tiposAgenda = tiposAgenda.filter(tipoAgenda => tipoAgenda.titulo !== tituloTipoAgenda);
                tiposAgenda.push({
                    titulo: eTextoTipoAgenda.value,
                    cor: eCorTipoAgenda.value
                });

                setTiposAgenda();
                corTipoAgenda = eTextoTipoAgenda.value;

                eTipoAgenda.style.backgroundColor = corTipoAgenda;
                eTextoTipoAgenda.style.backgroundColor = corTipoAgenda;
            }
        })

        eBotaoDeletarTipoAgenda.addEventListener('click', () => deletarTipoAgenda(tituloTipoAgenda));

        eTiposAgenda.appendChild(eTipoAgenda);
    })

}

function deletarTipoAgenda(tituloTipoAgenda) {
    if (agendas.filter(agenda => agenda.tipo === tituloTipoAgenda).length > 0) {
        alert("Existem agendas criadas com esse tipo, portanto não é possível excluí-lo.");
    } else {
        tiposAgenda = tiposAgenda.filter(tipoAgenda => tipoAgenda.titulo !== tituloTipoAgenda);
        setTiposAgenda();

        montaTiposAgenda();
    }
}

function adicionarTipoAgenda() {
    let eTipoAgenda = document.createElement('div');
    let eTextoTipoAgenda = document.createElement('input');
    let eCorTipoAgenda = document.createElement('input');
    let eBotaoSalvarTipoAgenda = document.createElement('div');

    var tituloTipoAgenda = '';
    var corTipoAgenda = '';

    eTipoAgenda.classList.add('tipoAgenda');

    eTextoTipoAgenda.type = 'text';
    eTextoTipoAgenda.placeholder = 'Título do Tipo da Agenda'

    eCorTipoAgenda.placeholder = 'Cor';

    eBotaoSalvarTipoAgenda.innerText = 'Salvar';
    eBotaoSalvarTipoAgenda.classList.add('botaoSalvarTipoAgenda');

    eBotaoSalvarTipoAgenda.addEventListener('click', function () {
        if (eTextoTipoAgenda.value && eCorTipoAgenda.value) {
            tiposAgenda.push({
                titulo: eTextoTipoAgenda.value,
                cor: eCorTipoAgenda.value
            });

            setTiposAgenda();
            tituloTipoAgenda = eTextoTipoAgenda.value;
            corTipoAgenda = eCorTipoAgenda.value;

            montaTiposAgenda();
        }
    })

    eTipoAgenda.appendChild(eTextoTipoAgenda);
    eTipoAgenda.appendChild(eCorTipoAgenda);
    eTipoAgenda.appendChild(eBotaoSalvarTipoAgenda);

    eTiposAgenda.appendChild(eTipoAgenda);
}