function realizaOperacao(operacao){
    var valor1 = parseInt(document.getElementById("numero1").value);
    var valor2 = parseInt(document.getElementById("numero2").value);
    var resultado;
    var nomeOperacao;
    
    switch(operacao){
        case "1":
            resultado = valor1 + valor2;
            nomeOperacao = "soma";
            break;
        case "2":
            resultado = valor1 - valor2;
            nomeOperacao = "subtração";
            break;
        case "3":
            resultado = valor1 * valor2;
            nomeOperacao = "multiplicação";
            break;
        case "4":
            resultado = valor1 / valor2;
            nomeOperacao = "divisão";
            break;
        default:
            resultado = null;
    }

    let objResultado = document.createElement('p');
    objResultado.textContent = ("O resultado da " + nomeOperacao + " é " + resultado);
    document.body.appendChild(objResultado);
}