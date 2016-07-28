
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
        this.palchavOU = document.getElementById('idcheckpalchaveOU');
        this.palchavE = document.getElementById('idcheckpalchaveE');
    };

    var controleBusca = new ControleDeChecksBusca();
    limparDadosBusca();
    var estadoEditando = false;
    limparDadosCatalogacao();
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
    
   /* var objDialogoCatalogo = function () {
        this.elementoDialogo = document.getElementById('idDialogo');
        this.escreverMensagem = function (classeDaCor, texto) {
            this.elementoDialogo.innerHTML = texto;
            this.elementoDialogo.setAttribute('class', classeDaCor);
        };
    };

    dialogo = new objDialogo();*/

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

    document.getElementById('idLimparBusca').addEventListener("click", limparDadosBusca);
    document.getElementById('idLimparCat').addEventListener("click", limparDadosCatalogacao);


    document.getElementById('idBuscar').addEventListener("click",
            function () {
                fazerPedidoAJAX(dadosBusca(), retornoBusca);
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

    document.getElementById('idSalvarNovo').addEventListener("click",
            function () {
                document.getElementById('idTabelaResultados').innerHTML = JSON.stringify(dadosCatalogo('SalvarNovo'));
                fazerPedidoAJAX(dadosCatalogo('SalvarNovo'), retornoCatalogacao);
            }
    );
    
    function retornoBusca (respostaJSON){
        
        var elemento = document.getElementById("idTabelaRespostas");
        while (elemento.firstChild) {
            elemento.removeChild(elemento.firstChild);
        }
        
        var mytable = document.getElementById("idTabelaRespostas");
        var tr = document.createElement("tr");
        var linha = mytable.appendChild(tr);  
        linha.appendChild(document.createElement("th")).appendChild(document.createTextNode("Patrimônio"));
        linha.appendChild(document.createElement("th")).appendChild(document.createTextNode("Titulo"));
        linha.appendChild(document.createElement("th")).appendChild(document.createTextNode("Autor"));
        linha.appendChild(document.createElement("th")).appendChild(document.createTextNode("Veiculo"));
        linha.appendChild(document.createElement("th")).appendChild(document.createTextNode("Data de Publicação"));
        
        var pointer = mytable.firstChild; 
        

        
        for(i=0;i<respostaJSON.arrayDeRespostas.length;i++){
                if(respostaJSON.arrayDeRespostas[i]!==undefined){
                    inserirLinhaNaTabela(respostaJSON,i, pointer);
                    pointer =pointer.nextSibling;
                }
            }     
    }
    
    function inserirLinhaNaTabela(resp,i,pointer){
        var mytable = document.getElementById("idTabelaRespostas");
        var tr = document.createElement("tr");
        var linha = mytable.appendChild(tr);
        
        linha.appendChild(document.createElement("td")).appendChild(document.createTextNode(resp.arrayDeRespostas[i].patrimonio));
        linha.appendChild(document.createElement("td")).appendChild(document.createTextNode(resp.arrayDeRespostas[i].autoria));
        linha.appendChild(document.createElement("td")).appendChild(document.createTextNode(resp.arrayDeRespostas[i].titulo));
        linha.appendChild(document.createElement("td")).appendChild(document.createTextNode(resp.arrayDeRespostas[i].veiculo));
        linha.appendChild(document.createElement("td")).appendChild(document.createTextNode(resp.arrayDeRespostas[i].datapublicacao));

        //console.log(pointer.nextSibling);
        
        pointer.nextSibling.addEventListener("click",catalogar(resp.arrayDeRespostas[i].patrimonio,resp.arrayDeRespostas[i].titulo,resp.arrayDeRespostas[i].autoria,resp.arrayDeRespostas[i].veiculo));
    
        
      //  document.getElementById('iddatapublicacao3').value=resp.arrayDeRespostas[i].datapublicacao;
     
        
        
        
 
}
    function catalogar(id,titulo,autoria,veiculo,datapublicacao){
        document.getElementById('idpatrimonio3').value=id;
        document.getElementById('idtitulo3').value=titulo;
        document.getElementById('idautoria3').value=autoria;
        document.getElementById('idveiculo3').value=veiculo;
        document.getElementById('iddatapublicacao3').value=datapublicacao;
    }
    var retornoCatalogacao=function(objJSONresp){
        document.getElementById('idpatrimonio3').value=objJSONresp.patrimonio;
        
    };

    function mudarAtributosEditando(estado) {
        if (estado) {
            document.getElementById('idtitulo3').removeAttribute("readonly");
            document.getElementById('idautoria3').removeAttribute("readonly");
            document.getElementById('idveiculo3').removeAttribute("readonly");
            document.getElementById('iddatapublicacao3').removeAttribute("readonly");
            document.getElementById('idpalchave3').removeAttribute("readonly");
        } else {
            document.getElementById('idtitulo3').setAttribute("readonly", true);
            document.getElementById('idautoria3').setAttribute("readonly", true);
            document.getElementById('idveiculo3').setAttribute("readonly", true);
            document.getElementById('iddatapublicacao3').setAttribute("readonly", true);
            document.getElementById('idpalchave3').setAttribute("readonly", true);
        }
    }

    /*var d = new Date ("2016-06-09");
     var p = new Date (d.getTime());*/

    function dadosCatalogo(botaoEscolhido) {
        var resposta = {botaoEscolhido: botaoEscolhido};
        if (document.getElementById('idpatrimonio3').value !== "")
        resposta.patrimonio = document.getElementById('idpatrimonio3').value;
        if (document.getElementById('idtitulo3').value !== "")
        resposta.titulo = document.getElementById('idtitulo3').value;
        if (document.getElementById('idautoria3').value !== "")
        resposta.autoria = document.getElementById('idautoria3').value;
        if (document.getElementById('idveiculo3').value !== "")
        resposta.veiculo = document.getElementById('idveiculo3').value;
        if (document.getElementById('iddatapublicacao3').value !== "")
        resposta.data = ((new Date(document.getElementById('iddatapublicacao3').value)).getTime()).toString();
        //if (document.getElementById('idpalchave3').value !== "")
        resposta.palchave = document.getElementById('idpalchave3').value;
        //console.log(resposta);
        return resposta;
    }

    function dadosBusca() {
        var resposta = {botaoEscolhido: "Buscar"};
        if (controleBusca.patrimonio.checked) {
            resposta.patrimonio = document.getElementById('idpatrimonio2').value;
        } else {
            if (controleBusca.tituloE.checked) {
                resposta.titulo = {};
                resposta.titulo.texto = document.getElementById('idtitulo2').value;
                resposta.titulo.modo = "AND";
            } else if (controleBusca.tituloOU.checked) {
                resposta.titulo = {};
                resposta.titulo.texto = document.getElementById('idtitulo2').value;
                resposta.titulo.modo = "OR";
            }
            if (controleBusca.autoriaE.checked) {
                resposta.autoria = {};
                resposta.autoria.texto = document.getElementById('idautoria2').value;
                resposta.autoria.modo = "AND";
            } else if (controleBusca.autoriaOU.checked) {
                resposta.autoria = {};
                resposta.autoria.texto = document.getElementById('idautoria2').value;
                resposta.autoria.modo = "OR";
            }
            if (controleBusca.autoriaE.checked) {
                resposta.autoria = {};
                resposta.autoria.texto = document.getElementById('idautoria2').value;
                resposta.autoria.modo = "AND";
            } else if (controleBusca.autoriaOU.checked) {
                resposta.autoria = {};
                resposta.autoria.texto = document.getElementById('idautoria2').value;
                resposta.autoria.modo = "OR";
            }
            if (controleBusca.veiculoE.checked) {
                resposta.veiculo = {};
                resposta.veiculo.texto = document.getElementById('idveiculo2').value;
                resposta.veiculo.modo = "AND";
            } else if (controleBusca.veiculoOU.checked) {
                resposta.veiculo = {};
                resposta.veiculo.texto = document.getElementById('idveiculo2').value;
                resposta.veiculo.modo = "OR";
            }
            if (controleBusca.dataE.checked) {
                resposta.data = {};
                if (document.getElementById('iddatapublicacao21').value !== "")
                    resposta.data.dataDe = document.getElementById('iddatapublicacao21').value;
                if (document.getElementById('iddatapublicacao22').value !== "")
                    resposta.data.dataAte = document.getElementById('iddatapublicacao22').value;
                resposta.data.modo = "AND";
            } else if (controleBusca.dataOU.checked) {
                resposta.data = {};
                if (document.getElementById('iddatapublicacao21').value !== "")
                    resposta.data.dataDe = document.getElementById('iddatapublicacao21').value;
                if (document.getElementById('iddatapublicacao22').value !== "")
                    resposta.data.dataAte = document.getElementById('iddatapublicacao22').value;
                resposta.data.modo = "OR";
            }
            if (controleBusca.palchavE.checked) {
                resposta.palchave = {};
                resposta.palchave.texto = document.getElementById('idpalchave2').value;
                resposta.palchave.modo = "AND";
            } else if (controleBusca.palchavOU.checked) {
                resposta.palchave = {};
                resposta.palchave.texto = document.getElementById('idpalchave2').value;
                resposta.palchave.modo = "OR";
            }
        }
        //console.log(resposta);
        return resposta;
    }

    function limparDadosBusca() {
        document.getElementById('idpatrimonio2').value = "";
        document.getElementById('idtitulo2').value = "";
        document.getElementById('idautoria2').value = "";
        document.getElementById('idveiculo2').value = "";
        document.getElementById('iddatapublicacao21').value = "";
        document.getElementById('iddatapublicacao22').value = "";
        document.getElementById('idpalchave2').value = "";
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
        controleBusca.patrimonio.checked = true;
        var elemento = document.getElementById("idTabelaRespostas");
        while (elemento.firstChild) {
            elemento.removeChild(elemento.firstChild);
        }
    }

    function limparDadosCatalogacao() {

        document.getElementById('idpatrimonio3').value = "";
        document.getElementById('idtitulo3').value = "";
        document.getElementById('idautoria3').value = "";
        document.getElementById('idveiculo3').value = "";
        document.getElementById('iddatapublicacao3').value = "";
        document.getElementById('idpalchave3').value = "";
        estadoEditando = false;
        mudarAtributosEditando(estadoEditando);

    }


    function fazerPedidoAJAX(objetoJSON, funcPopularPagina) {
        var stringJSON = JSON.stringify(objetoJSON);

        var objPedidoAJAX = new XMLHttpRequest();
        objPedidoAJAX.open("POST", "controller.do");
        objPedidoAJAX.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // Prepara recebimento da resposta: tipo da resposta JSON!
        objPedidoAJAX.responseType = 'json';
        objPedidoAJAX.onreadystatechange =
                function () {
                    if (objPedidoAJAX.readyState === 4 && objPedidoAJAX.status === 200) {
                        // A resposta 'response' já é avaliada para json!
                        // Ao contraro da resposta responseText.
                        funcPopularPagina(objPedidoAJAX.response);
                        //console.log(objPedidoAJAX.response);

                    }
                    ;
                };
        // Envio do pedido
        objPedidoAJAX.send(stringJSON);
    }
    ;

}


