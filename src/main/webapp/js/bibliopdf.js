
window.onload = iniciar;



function iniciar() {
    
    /*var d = new Date ("2016-06-09");
    var p = new Date (d.getTime());
    console.log(p.toISOString());*/
    
    var ControleDeChecksBusca = function () {
        this.patrimonio = document.getElementById('idcheckpatrimonio');
        this.tituloOU = document.getElementById('idchecktituloOU');
        this.tituloE = document.getElementById('idchecktituloE');
        this.autoriaOU = document.getElementById('idcheckautoriaOU');
        this.autoriaE = document.getElementById('idcheckautoriaE');
        this.veiculoOU = document.getElementById('idcheckveiculoOU');
        this.veiculoE = document.getElementById('idcheckveiculoE');
        this.dataOU = document.getElementById('idcheckdatapublicacaoOU');
        this.dataE = document.getElementById('idcheckdatapublicacaoE');
        this.palchavOU= document.getElementById('idcheckpalchaveOU');
        this.palchavE= document.getElementById('idcheckpalchaveE'); 
    };
    
    var controleBusca = new ControleDeChecksBusca();
    
    controleBusca.patrimonio.addEventListener("click",
            function () {
                controleBusca.tituloE.checked = false;
                controleBusca.tituloOU.checked = false;
                controleBusca.autoriaE.checked = false;
                controleBusca.autoriaOU.checked = false;
                controleBusca.veiculoE.checked = false;
                controleBusca.veiculoOU.checked = false;
                controleBusca.dataE.checked = false;
                controleBusca.dataOU.checked = false;
                controleBusca.palchavOU.checked = false;
                controleBusca.palchavE.checked = false;
            });

    controleBusca.tituloE.addEventListener("click",
            function () {
                controleBusca.patrimonio.checked = false;
                if (controleBusca.tituloE.checked) {
                    controleBusca.tituloOU.checked = false;
                }
            });

    controleBusca.tituloOU.addEventListener("click",
            function () {
                controleBusca.patrimonio.checked = false;
                if (controleBusca.tituloOU.checked) {
                    controleBusca.tituloE.checked = false;
                }
            });

    controleBusca.autoriaE.addEventListener("click",
            function () {
                controleBusca.patrimonio.checked = false;
                if (controleBusca.autoriaE.checked) {
                    controleBusca.autoriaOU.checked = false;
                }
            });

    controleBusca.autoriaOU.addEventListener("click",
            function () {
                controleBusca.patrimonio.checked = false;
                if (controleBusca.autoriaOU.checked) {
                    controleBusca.autoriaE.checked = false;
                }
            });

    controleBusca.veiculoE.addEventListener("click",
            function () {
                controleBusca.patrimonio.checked = false;
                if (controleBusca.veiculoE.checked) {
                    controleBusca.veiculoOU.checked = false;
                }
            });

    controleBusca.veiculoOU.addEventListener("click",
            function () {
                controleBusca.patrimonio.checked = false;
                if (controleBusca.veiculoOU.checked) {
                    controleBusca.veiculoE.checked = false;
                }
            });
            
            controleBusca.dataE.addEventListener("click",
            function () {
                controleBusca.patrimonio.checked = false;
                if (controleBusca.dataE.checked) {
                    controleBusca.dataOU.checked = false;
                }
            });

    controleBusca.dataOU.addEventListener("click",
            function () {
                controleBusca.patrimonio.checked = false;
                if (controleBusca.dataOU.checked) {
                    controleBusca.dataE.checked = false;
                }
            });
            
    controleBusca.palchavE.addEventListener("click",
            function () {
                controleBusca.patrimonio.checked = false;
                if (controleBusca.palchavE.checked) {
                    controleBusca.palchavOU.checked = false;
                }
            });

    controleBusca.palchavOU.addEventListener("click",
            function () {
                controleBusca.patrimonio.checked = false;
                if (controleBusca.palchavOU.checked) {
                    controleBusca.palchavE.checked = false;
                }
            });
    
    
    
    
    document.getElementById('idBuscar').addEventListener("click",
            function () {
                document.getElementById('idTabelaResultados').innerHTML = JSON.stringify(dadosBusca());
                fazerPedidoAJAX(dadosBusca(),'teste');
            }
    );
    
    document.getElementById('idEditar').addEventListener("click",
            function () {
                if (estadoEditando) {
//                document.getElementById('idDialogo').innerHTML = "Só leitura";
                    //dialogo.escreverMensagem('dialogoVerde', 'Só leitura');
                    estadoEditando = false;
                } else {
//                document.getElementById('idDialogo').innerHTML = "Editando";
                   // dialogo.escreverMensagem('dialogoVermelho', 'Editando');
                    estadoEditando = true;
                }
                mudarAtributosEditando(estadoEditando);
            }
                    );
            
    document.getElementById('idSalvarAtual').addEventListener("click",
            function () {
                document.getElementById('idTabelaResultados').innerHTML = JSON.stringify(dadosCatalogo('SalvarAtual'));
            }
    );


    
    var estadoEditando = false;
    
    function mudarAtributosEditando(estado) {
        if (estado) {
            document.getElementById('idpatrimonio3').removeAttribute("readonly");
            document.getElementById('idtitulo3').removeAttribute("readonly");
            document.getElementById('idautoria3').removeAttribute("readonly");
            document.getElementById('idveiculo3').removeAttribute("readonly");
            document.getElementById('iddatapublicacao3').removeAttribute("readonly");
            document.getElementById('idpalchave3').removeAttribute("readonly");
        } else {
            document.getElementById('idpatrimonio3').setAttribute("readonly", true);
            document.getElementById('idtitulo3').setAttribute("readonly", true);
            document.getElementById('idautoria3').setAttribute("readonly", true);
            document.getElementById('idveiculo3').setAttribute("readonly", true);
            document.getElementById('iddatapublicacao3').setAttribute("readonly", true);
            document.getElementById('idpalchave3').setAttribute("readonly", true);
        }
    }
    
    function dadosCatalogo(botaoEscolhido) {
        var resposta = {botaoEscolhido:botaoEscolhido};
        if (document.getElementById('idpatrimonio3').value!=="") resposta.patrimonio = document.getElementById('idpatrimonio3').value;
        if (document.getElementById('idtitulo3').value!=="") resposta.titulo = document.getElementById('idtitulo3').value;
        if (document.getElementById('idautoria3').value!=="") resposta.autoria = document.getElementById('idautoria3').value;
        if (document.getElementById('idveiculo3').value!=="") resposta.veiculo = document.getElementById('idveiculo3').value;
        if (document.getElementById('iddatapublicacao3').value!=="") resposta.data = document.getElementById('iddatapublicacao3').value;
        if (document.getElementById('idpalchave3').value!=="") resposta.palchave = document.getElementById('idpalchave3').value;
        //console.log(resposta);
        return resposta;
    }
    function dadosBusca() {
        var resposta = {botaoEscolhido:"Buscar"};
        if (controleBusca.patrimonio.checked) {
            resposta.patrimonio = document.getElementById('idpatrimonio2').value;
        } else {
            if (controleBusca.tituloE.checked) {
                resposta.titulo = {};
                resposta.titulo.texto = document.getElementById('idtitulo2').value;
                resposta.titulo.modo = "E";
            } else if (controleBusca.tituloOU.checked) {
                resposta.titulo = {};
                resposta.titulo.texto = document.getElementById('idtitulo2').value;
                resposta.titulo.modo = "OU";
            }
            if (controleBusca.autoriaE.checked) {
                resposta.autoria = {};
                resposta.autoria.texto = document.getElementById('idautoria2').value;
                resposta.autoria.modo = "E";
            } else if (controleBusca.autoriaOU.checked) {
                resposta.autoria = {};
                resposta.autoria.texto = document.getElementById('idautoria2').value;
                resposta.autoria.modo = "OU";
            }
            if (controleBusca.autoriaE.checked) {
                resposta.autoria = {};
                resposta.autoria.texto = document.getElementById('idautoria2').value;
                resposta.autoria.modo = "E";
            } else if (controleBusca.autoriaOU.checked) {
                resposta.autoria = {};
                resposta.autoria.texto = document.getElementById('idautoria2').value;
                resposta.autoria.modo = "OU";
            }
            if (controleBusca.veiculoE.checked) {
                resposta.veiculo = {};
                resposta.veiculo.texto = document.getElementById('idveiculo2').value;
                resposta.veiculo.modo = "E";
            } else if (controleBusca.veiculoOU.checked) {
                resposta.veiculo = {};
                resposta.veiculo.texto = document.getElementById('idveiculo2').value;
                resposta.veiculo.modo = "OU";
            }
            if (controleBusca.dataE.checked) {
                resposta.data = {};
                if (document.getElementById('iddatapublicacao21').value!=="") resposta.data.dataDe = (new Date (document.getElementById('iddatapublicacao21').value)).getTime();
                if (document.getElementById('iddatapublicacao22').value!=="") resposta.data.dataAte = (new Date (document.getElementById('iddatapublicacao22').value)).getTime();
                resposta.data.modo = "E";
            } else if (controleBusca.dataOU.checked) {
                resposta.data = {};
                if (document.getElementById('iddatapublicacao21').value!=="") resposta.data.dataDe = (new Date (document.getElementById('iddatapublicacao21').value)).getTime();
                if (document.getElementById('iddatapublicacao22').value!=="") resposta.data.dataAte = (new Date (document.getElementById('iddatapublicacao22').value)).getTime();
                resposta.data.modo = "OU";
            }
            if (controleBusca.palchavE.checked) {
                resposta.palchave = {};
                resposta.palchave.texto = document.getElementById('idpalchave2').value;
                resposta.palchave.modo = "E";
            } else if (controleBusca.palchavOU.checked) {
                resposta.palchave = {};
                resposta.palchave.texto = document.getElementById('idpalchave2').value;
                resposta.palchave.modo = "OU";
            }
        }
        //console.log(resposta);
        return resposta;
    }
   
    
    

function fazerPedidoAJAX(objetoJSON,funcPopularPagina){
    var stringJSON = JSON.stringify(objetoJSON);
    var objPedidoAJAX = new XMLHttpRequest();
    objPedidoAJAX.open("POST", "controller.do");
    objPedidoAJAX.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    // Prepara recebimento da resposta: tipo da resposta JSON!
    objPedidoAJAX.responseType = 'json';
    objPedidoAJAX.onreadystatechange =
        function() {
            if(objPedidoAJAX.readyState===4 && objPedidoAJAX.status===200){
                // A resposta 'response' já é avaliada para json!
                // Ao contraro da resposta responseText.
               // funcPopularPagina(objPedidoAJAX.response);
            };
        };
    // Envio do pedido
    objPedidoAJAX.send(stringJSON);
};

}


