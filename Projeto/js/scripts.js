
let indexNavegacao = 0;
const eCalendario = document.getElementById('calendario');
let agendas = localStorage.getItem('agendas') ? JSON.parse(localStorage.getItem('agendas')) : [];
let tiposAgenda = localStorage.getItem('tiposAgenda') ? JSON.parse(localStorage.getItem('tipoAgenda')) : [{ titulo: 'Reunião', cor: '#DAA520' }, { titulo: 'Compromisso', cor: '#BDB76B' }, { titulo: 'Indisponibilidade', cor: '#FF6347' }];

const eExibeAgendaModal = document.getElementById('exibeAgenda');
const eNovaAgendaModal = document.getElementById('novaAgenda');
const eFundoModal = document.getElementById('fundoModal');

function abreModalAgenda(data) {
    agenda = agendas.find((agenda) => agenda.data === data)

    if (agenda) {
        document.getElementById('tituloAgenda').innerText = agenda.titulo

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

function montaCalendario() {
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
        const idData = `${mes}/${i - indexSemanaPrimeiroDia}/${ano}`;
        if (i > indexSemanaPrimeiroDia) {
            eDia.innerText = i - indexSemanaPrimeiroDia;

            const agendaDoDia = agendas.find(agenda => agenda.id === idData)

            if (agendaDoDia) {
                const eAgendaDoDia = document.createElement('div');
                eAgendaDoDia.classList.add('agenda');
                eAgendaDoDia.innerText = agendaDoDia.titulo;
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
    const radioTiposAgendas = document.querySelectorAll('input[type=radio][name=opcaoAgendaMExibe], input[type=radio][name=opcaoAgendaMInsere]');
    radioTiposAgendas.forEach(radio => {
        radio.remove();
    })

    let containerAgenda = document.getElementById('tipoAgendaContainerMExibe');
    var radioHTML = '';
    tiposAgenda.forEach(tipoAgenda => {
        radioHTML = radioHTML + `<input type='radio' name='opcaoAgendaMExibe' value='${tipoAgenda.titulo}'> ${tipoAgenda.titulo}</input><br>`
        containerAgenda.innerHTML = radioHTML;
    })

    containerAgenda = document.getElementById('tipoAgendaContainerMInsere');
    radioHTML = '';
    tiposAgenda.forEach(tipoAgenda => {
        radioHTML = radioHTML + `<input type='radio' name='opcaoAgendaMInsere' value='${tipoAgenda.titulo}'> ${tipoAgenda.titulo}</input><br>`
        containerAgenda.innerHTML = radioHTML;
    })
}