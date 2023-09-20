function interacao(){
    var nome = prompt("Informe o nome do aluno:");
    window.alert("Olá, " + nome + "! É um prazer te ver!");
    var primeira = parseInt(prompt("Me informe o valor da primeira nota:"));
    var segunda = parseInt(prompt("Me informe o valor da segunda nota:"));
    window.alert("Você tirou " + primeira + " na primeira prova e " + segunda + " na segunda prova!");
    var soma = primeira + segunda;
    var media = soma / 2;
    window.alert("Sua média é: " + media);
    if(media>=7)
        window.alert("Parabéns, você foi aprovado! Sua nota final é " + media);
    else
        window.alert("Poxa, você precisa estudar mais. Você foi reprovado. Sua nota final é " + media)
}

function interacao2(){
    var numero1 = document.getElementById("item1").value;
    var numero2 = document.getElementById("item2").value;
    var numero3 = document.getElementById("item3").value;
    var soma = parseInt(numero1) + parseInt(numero2) + parseInt(numero3);
    var media = soma / 3;

    let med = document.createElement('p');
    med.textContent('A média é: ' + media);
    document.body.appendChild(med);
}