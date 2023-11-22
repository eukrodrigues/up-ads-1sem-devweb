
let indexNavegacao = 0;
const eCalendario = document.getElementById('calendario');

const eExibeAgendaModal = document.getElementById('exibeAgenda');
const eNovaAgendaModal = document.getElementById('novaAgenda');
const eFundoModal = document.getElementById('fundoModal');

const eTituloAgendaMExibe = document.getElementById('inputTituloAgendaMExibe');
const eTituloAgendaMInsere = document.getElementById('inputTituloAgendaMInsere');
const eLabelTituloAgendaMExibe = document.getElementById('tituloAgendaMExibe');
const eLabelTituloAgendaMInsere = document.getElementById('tituloAgendaMInsere');

var dataSelecionada = null;

eTituloAgendaMExibe.addEventListener('input', function () {
    eLabelTituloAgendaMExibe.innerText = eTituloAgendaMExibe.value;
})

eTituloAgendaMInsere.addEventListener('input', function () {
    eLabelTituloAgendaMInsere.innerText = eTituloAgendaMInsere.value;
    if (!eTituloAgendaMInsere.value) {
        eLabelTituloAgendaMInsere.innerText = 'Nova Agenda';
    }
})

function abreModalAgenda(data) {
    dataSelecionada = data;
    agenda = agendas.find((agenda) => agenda.data === data)
    if (agenda) {
        document.getElementById('inputTituloAgendaMExibe').value = agenda.titulo
        document.getElementById('tituloAgendaMExibe').innerText = agenda.titulo

        const radioTiposAgendas = document.querySelectorAll('input[type=radio][name=opcaoAgendaMExibe]');
        radioTiposAgendas.forEach(opcao => {
            if (opcao.value === agenda.tipo) {
                opcao.checked = true;
            }
        })

        eExibeAgendaModal.style.display = 'block';
    } else {
        eNovaAgendaModal.style.display = 'block';
    }

    eFundoModal.style.display = 'block';
}

function atualizarAgenda() {
    let eRadioSelecionado = document.querySelector('input[type=radio][name=opcaoAgendaMExibe]:checked');
    if (eTituloAgendaMExibe.value && eRadioSelecionado) {
        gravarAgenda(eTituloAgendaMExibe.value, eRadioSelecionado.value);
        fechaModalExibe();
    } else {
        if (!eTituloAgendaMExibe.value) {
            eTituloAgendaMExibe.classList.add('erro');
        }

        if (!eRadioSelecionado) {
            let eLabelTipoAgenda = document.getElementById('tituloTipoAgendaMInsere')
            eLabelTipoAgenda.classList.add('erroTexto')
        }
    }
}

function criarAgenda() {
    let eTituloAgendaMInsere = document.getElementById('inputTituloAgendaMInsere');
    let eRadioSelecionado = document.querySelector('input[type=radio][name=opcaoAgendaMInsere]:checked');
    if (eTituloAgendaMInsere.value && eRadioSelecionado) {
        gravarAgenda(eTituloAgendaMInsere.value, eRadioSelecionado.value);
        fechaModalInsere();
    } else {
        if (!eTituloAgendaMInsere.value) {
            eTituloAgendaMInsere.classList.add('erro');
        }

        if (!eRadioSelecionado) {
            let eLabelTipoAgenda = document.getElementById('tituloTipoAgendaMInsere')
            eLabelTipoAgenda.classList.add('erroTexto')
        }
    }
}

function gravarAgenda(tituloAgenda, tipoAgenda) {
    agendas = agendas.filter(agenda => agenda.data !== dataSelecionada);
    agendas.push({
        data: dataSelecionada,
        titulo: tituloAgenda,
        tipo: tipoAgenda
    })
    setAgenda(agendas);
    montaCalendario();
}

function deletarAgenda() {
    agendas = agendas.filter(agenda => agenda.data !== dataSelecionada);
    setAgenda(agendas);
    montaCalendario();
    fechaModalExibe();
}

function fechaModalExibe() {
    const eTituloAgenda = document.getElementById('inputTituloAgendaMExibe');
    const eLabelTipoAgenda = document.getElementById('tituloTipoAgendaMExibe');

    dataSelecionada = null;
    eFundoModal.style.display = 'none';
    eExibeAgendaModal.style.display = 'none';
    eTituloAgenda.classList.remove('erro');
    eLabelTipoAgenda.classList.remove('erroTexto');
}

function fechaModalInsere() {
    const eTituloAgenda = document.getElementById('inputTituloAgendaMInsere');
    const eLabelTipoAgenda = document.getElementById('tituloTipoAgendaMInsere');

    dataSelecionada = null;
    eFundoModal.style.display = 'none';
    eNovaAgendaModal.style.display = 'none';
    eTituloAgenda.classList.remove('erro');
    eLabelTipoAgenda.classList.remove('erroTexto');
}

function montaCalendario() {
    eCalendario.innerHTML = '';

    var dataAtual = new Date();
    dataAtual.setMonth(dataAtual.getMonth() + indexNavegacao);

    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth();
    const ano = dataAtual.getFullYear();

    const ultimoDiaMes = new Date(ano, mes + 1, 0).getDate();
    const primeiroDiaMes = new Date(ano, mes, 1);

    const indexSemanaPrimeiroDia = primeiroDiaMes.getDay();

    //Setando mês selecionado na div
    var strMes = dataAtual.toLocaleDateString('pt-br', { month: 'long' });
    strMes = strMes.charAt(0).toUpperCase() + strMes.slice(1);

    document.getElementById('mesSelecionado').innerText = `${strMes} de ${ano}`;

    for (let i = 1; i <= indexSemanaPrimeiroDia + ultimoDiaMes; i++) {
        let eDia = document.createElement('div');
        eDia.classList.add('dia');
        const idData = `${i - indexSemanaPrimeiroDia}/${mes}/${ano}`;
        if (i > indexSemanaPrimeiroDia) {
            eDia.innerText = i - indexSemanaPrimeiroDia;

            const agendaDoDia = agendas.find(agenda => agenda.data === idData)
            if (agendaDoDia) {
                const eAgendaDoDia = document.createElement('div');
                eAgendaDoDia.classList.add('agenda');
                eAgendaDoDia.innerText = agendaDoDia.titulo;

                const corAgenda = tiposAgenda.find(tipoAgenda => tipoAgenda.titulo === agendaDoDia.tipo);
                console.log(tiposAgenda);
                console.log(agendaDoDia);
                if (corAgenda) {
                    eAgendaDoDia.style.backgroundColor = corAgenda.cor
                }

                eDia.appendChild(eAgendaDoDia);
            }

            eDia.addEventListener('click', () => abreModalAgenda(idData));

            if (i - indexSemanaPrimeiroDia === dia && indexNavegacao === 0) {
                eDia.id = 'diaAtual';
            }

        } else {
            eDia.classList.add('foraDoMes');
        }

        eCalendario.appendChild(eDia);
    }

    setaModais()

}

function setaModais() {
    //Modal Exibe
    let radioTiposAgendas = document.querySelectorAll('input[type=radio][name=opcaoAgendaMExibe], input[type=radio][name=opcaoAgendaMExibe]');
    radioTiposAgendas.forEach(radio => {
        radio.remove();
    })

    let containerAgenda = document.getElementById('tipoAgendaContainerMExibe');
    var radioHTML = '';
    tiposAgenda.forEach(tipoAgenda => {
        radioHTML = radioHTML + `<input type='radio' name='opcaoAgendaMExibe' value='${tipoAgenda.titulo}'> ${tipoAgenda.titulo}</input><br>`
        containerAgenda.innerHTML = radioHTML;
    })

    //Modal Insere
    radioTiposAgendas = document.querySelectorAll('input[type=radio][name=opcaoAgendaMInsere], input[type=radio][name=opcaoAgendaMInsere]');
    radioTiposAgendas.forEach(radio => {
        radio.remove();
    })

    containerAgenda = document.getElementById('tipoAgendaContainerMInsere');
    radioHTML = '';
    tiposAgenda.forEach(tipoAgenda => {
        radioHTML = radioHTML + `<input type='radio' name='opcaoAgendaMInsere' value='${tipoAgenda.titulo}'> ${tipoAgenda.titulo}</input><br>`
        containerAgenda.innerHTML = radioHTML;
    })
}

function proximoMes() {
    indexNavegacao++;
    montaCalendario();
}

function mesAnterior() {
    indexNavegacao--;
    montaCalendario();
}