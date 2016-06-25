
window.onload = iniciar;

var controle;

var dialogo;

function iniciar() {
    
    var enviar = function (){
    // Preparacao do pedido
    var sendData = {
        "campo1" : document.getElementsByName('campo1')[0].value,
        "campo2" : document.getElementsByName('campo2')[0].value,
        "campo3" : document.getElementsByName('campo3')[0].value,
        "campo4" : document.getElementsByName('campo4')[0].value
    };
   // fazerPedidoAJAX(sendData,popularCamposComRespostaJSON);
};

function popularCamposComRespostaJSON(objJSONresp){
    document.getElementsByName('campo1')[0].value = objJSONresp.campo1;
    document.getElementsByName('campo2')[0].value = objJSONresp.campo2;
    document.getElementsByName('campo3')[0].value = objJSONresp.campo3;
    document.getElementsByName('campo4')[0].value = objJSONresp.campo4;
};

function fazerPedidoAJAX(objetoJSON,funcPopularPagina){
    var stringJSON = JSON.stringify(objetoJSON);
    var objPedidoAJAX = new XMLHttpRequest();
    objPedidoAJAX.open("POST", "controller");
    objPedidoAJAX.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    // Prepara recebimento da resposta: tipo da resposta JSON!
    objPedidoAJAX.responseType = 'json';
    objPedidoAJAX.onreadystatechange =
        function() {
            if(objPedidoAJAX.readyState===4 && objPedidoAJAX.status===200){
                // A resposta 'response' já é avaliada para json!
                // Ao contraro da resposta responseText.
                funcPopularPagina(objPedidoAJAX.response);
            };
        };
    // Envio do pedido
    objPedidoAJAX.send(stringJSON);
};

    var objDialogo = function () {
        this.elementoDialogo = document.getElementById('idDialogo');
        this.escreverMensagem = function (classeDaCor, texto) {
            this.elementoDialogo.innerHTML = texto;
            this.elementoDialogo.setAttribute('class', classeDaCor);
        };
    };

    dialogo = new objDialogo();

    var ControleDeChecks = function () {
        this.patrimonio = document.getElementById('idcheckpatrimonio');
        this.tituloOU = document.getElementById('idchecktituloOU');
        this.tituloE = document.getElementById('idchecktituloE');
        this.autoriaOU = document.getElementById('idcheckautoriaOU');
        this.autoriaE = document.getElementById('idcheckautoriaE');
        this.veiculoOU = document.getElementById('idcheckveiculoOU');
        this.veiculoE = document.getElementById('idcheckveiculoE');
    };

    controle = new ControleDeChecks();

    controle.patrimonio.addEventListener("click",
            function () {
                controle.tituloE.checked = false;
                controle.tituloOU.checked = false;
                controle.autoriaE.checked = false;
                controle.autoriaOU.checked = false;
                controle.veiculoE.checked = false;
                controle.veiculoOU.checked = false;
            });

    controle.tituloE.addEventListener("click",
            function () {
                controle.patrimonio.checked = false;
                if (controle.tituloE.checked) {
                    controle.tituloOU.checked = false;
                }
            });

    controle.tituloOU.addEventListener("click",
            function () {
                controle.patrimonio.checked = false;
                if (controle.tituloOU.checked) {
                    controle.tituloE.checked = false;
                }
            });

    controle.autoriaE.addEventListener("click",
            function () {
                controle.patrimonio.checked = false;
                if (controle.autoriaE.checked) {
                    controle.autoriaOU.checked = false;
                }
            });

    controle.autoriaOU.addEventListener("click",
            function () {
                controle.patrimonio.checked = false;
                if (controle.autoriaOU.checked) {
                    controle.autoriaE.checked = false;
                }
            });

    controle.veiculoE.addEventListener("click",
            function () {
                controle.patrimonio.checked = false;
                if (controle.veiculoE.checked) {
                    controle.veiculoOU.checked = false;
                }
            });

    controle.veiculoOU.addEventListener("click",
            function () {
                controle.patrimonio.checked = false;
                if (controle.veiculoOU.checked) {
                    controle.veiculoE.checked = false;
                }
            });

    function dadosEscolhidos() {
        var resposta = {};
        if (controle.patrimonio.checked) {
            resposta.patrimonio = document.getElementById('idpatrimonio').value;
        } else {
            if (controle.tituloE.checked) {
                resposta.titulo = {};
                resposta.titulo.texto = document.getElementById('idtitulo').value;
                resposta.titulo.modo = "E";
            } else if (controle.tituloOU.checked) {
                resposta.titulo = {};
                resposta.titulo.texto = document.getElementById('idtitulo').value;
                resposta.titulo.modo = "OU";
            }
            if (controle.autoriaE.checked) {
                resposta.autoria = {};
                resposta.autoria.texto = document.getElementById('idautoria').value;
                resposta.autoria.modo = "E";
            } else if (controle.autoriaOU.checked) {
                resposta.autoria = {};
                resposta.autoria.texto = document.getElementById('idautoria').value;
                resposta.autoria.modo = "OU";
            }
            if (controle.autoriaE.checked) {
                resposta.autoria = {};
                resposta.autoria.texto = document.getElementById('idautoria').value;
                resposta.autoria.modo = "E";
            } else if (controle.autoriaOU.checked) {
                resposta.autoria = {};
                resposta.autoria.texto = document.getElementById('idautoria').value;
                resposta.autoria.modo = "OU";
            }
            if (controle.veiculoE.checked) {
                resposta.veiculo = {};
                resposta.veiculo.texto = document.getElementById('idveiculo').value;
                resposta.veiculo.modo = "E";
            } else if (controle.veiculoOU.checked) {
                resposta.veiculo = {};
                resposta.veiculo.texto = document.getElementById('idveiculo').value;
                resposta.veiculo.modo = "OU";
            }
        }
        return resposta;
    }

    document.getElementById('idENVIAR').addEventListener("click",
            function () {
                document.getElementById('idResposta').innerHTML = JSON.stringify(dadosEscolhidos());
            }
    );

    var estadoEditando = false;
//    document.getElementById('idDialogo').innerHTML = "Só leitura";
    dialogo.escreverMensagem('dialogoVerde', 'Só leitura');

    function mudarAtributosEditando(estado) {
        if (estado) {
            document.getElementById('idpatrimonio').removeAttribute("readonly");
            document.getElementById('idtitulo').removeAttribute("readonly");
            document.getElementById('idautoria').removeAttribute("readonly");
            document.getElementById('idveiculo').removeAttribute("readonly");
        } else {
            document.getElementById('idpatrimonio').setAttribute("readonly", true);
            document.getElementById('idtitulo').setAttribute("readonly", true);
            document.getElementById('idautoria').setAttribute("readonly", true);
            document.getElementById('idveiculo').setAttribute("readonly", true);
        }
    }

    document.getElementById('idEditar').addEventListener("click",
            function () {
                if (estadoEditando) {
//                document.getElementById('idDialogo').innerHTML = "Só leitura";
                    dialogo.escreverMensagem('dialogoVerde', 'Só leitura');
                    estadoEditando = false;
                } else {
//                document.getElementById('idDialogo').innerHTML = "Editando";
                    dialogo.escreverMensagem('dialogoVermelho', 'Editando');
                    estadoEditando = true;
                }
                mudarAtributosEditando(estadoEditando);
            }
    );

    document.getElementById('idLimpar').addEventListener("click",
            function () {
                document.getElementById('idpatrimonio').value = "";
                document.getElementById('idtitulo').value = "";
                document.getElementById('idautoria').value = "";
                document.getElementById('idveiculo').value = "";
            }
    );

}


