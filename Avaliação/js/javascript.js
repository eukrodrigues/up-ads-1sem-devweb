function adicionaLinhaVenda() {
    if (parseInt(document.getElementById("valorProduto").value) > 0) {
        var tabela = document.getElementById("tabelaVendas");
        var linha = tabela.insertRow(1);
        var celula1 = linha.insertCell(0);
        var celula2 = linha.insertCell(1);

        celula1.innerHTML = document.getElementById("produto").value;
        celula2.innerHTML = document.getElementById("valorProduto").value;

        var valorAnterior = parseInt(tabela.rows[tabela.rows.length - 1].cells[1].innerHTML);
        tabela.rows[tabela.rows.length - 1].cells[1].innerHTML = valorAnterior + parseInt(celula2.innerHTML);
    } else {
        window.alert("Informe o valor para prosseguir com a inserção da venda.");
    }
}

function calculaComissao() {
    var tabela = document.getElementById("tabelaVendas");
    if (tabela.rows.length < 7) {
        window.alert("Informe no mínimo 5 vendas para prosseguir");
    } else {
        var nomeVendedor = document.getElementById("vendedor").value
        if (nomeVendedor == "") {
            window.alert("Informe o nome do vendedor para prosseguir.")
        } else {
            var valorTotal = parseInt(tabela.rows[tabela.rows.length - 1].cells[1].innerHTML);
            var percentual;
            var bonus = 0;

            if (valorTotal <= 50000) {
                percentual = 0.1;
            } else {
                if (valorTotal < 70000) {
                    percentual = 0.15;
                } else {
                    percentual = 0.15;
                    bonus = 1000;
                }
            }

            window.alert("Vendedor: " + nomeVendedor + "\n\nValor total da venda: R$" + valorTotal + "\nPercentual de Comissão: " + (percentual * 100) + "%\nTotal da Comissão: R$" + (percentual * valorTotal) + "\nBônus: R$" + bonus + ",00")
        }
    }
}