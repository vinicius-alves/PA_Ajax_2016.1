package model.DAO;

import model.DTOs.RespostaCompletaDTO;
import model.DTOs.RespostaDTO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import javax.json.JsonObject;
import utils.Utils;

public class BiblioPDFDAO extends BaseDAO {

//------------------------------------------------------------------------------    
    public RespostaCompletaDTO buscarLista(JsonObject dados){
        RespostaCompletaDTO listaRefsDTO = new RespostaCompletaDTO();
        RespostaDTO umaRefDTO = null;
        String preparedStatement = prepararComandoSQL(dados);
        
        System.out.println("\n\n chegou aqui;" + preparedStatement +"\n\n");
        try(Connection conexao = getConnection()){
            PreparedStatement comandoSQL = conexao.prepareStatement(preparedStatement);
           
            System.out.println("\n\n" +preparedStatement  + "\n\n");
            ResultSet rs = comandoSQL.executeQuery();
            //listaRefsDTO.setNroRows(rs.getInt("nrohits"));
           // rs.next();
            while(rs.next()){
                umaRefDTO = new RespostaDTO();
                umaRefDTO.setPatrimonio(Long.toString(rs.getLong("patrimonio")));
                umaRefDTO.setTitulo(rs.getString("titulo"));
                umaRefDTO.setAutoria(rs.getString("autoria"));
                umaRefDTO.setVeiculo(rs.getString("veiculo"));
                umaRefDTO.setDatapublicacao(rs.getString("data_publicacao"));
                listaRefsDTO.addResposta(umaRefDTO);
                
            }
        }catch(Exception e){
            e.printStackTrace();
            listaRefsDTO.setSucesso(false);
        }
        
        return listaRefsDTO;
    }
//------------------------------------------------------------------------------    
    private String[] extrairPalavrasParaArray(JsonObject dados, String campo){
        String busca = dados.getString(campo);
        busca = Utils.removeDiacriticals(busca);
        String[] temp = busca.split(" ");
        for(int i=0;i<temp.length;i++){
            temp[i] = temp[i].trim();
        }
        return temp;    
    }
    
    public String[] extrairPalavrasParaArrayUpper(JsonObject dados, String campo){
        String busca = dados.getString(campo);
        busca = Utils.removeDiacriticalsUper(busca);
        String[] temp = busca.split(" ");
        for(int i=0;i<temp.length;i++){
            temp[i] = temp[i].trim();
        }
        return temp;    
    }
//------------------------------------------------------------------------------    
    private String prepararComandoSQL(JsonObject jsonEntrada){
/*
Exemplo:
        
SELECT dadoscatalogo.patrimonio, dadoscatalogo.titulo, dadoscatalogo.autoria, (count(*)) AS nrohits
FROM dadoscatalogo 
INNER JOIN palavrastitulonormal  ON(dadoscatalogo.patrimonio = c.patrimonio) WHERE

dadoscatalogo.palavra_titulo_normal LIKE 'MAVEN'        
OR        
dadoscatalogo.palavra_titulo_normal LIKE 'STYLES'
        
GROUP BY dadoscatalogo.patrimonio, dadoscatalogo.titulo, dadoscatalogo.autoria ORDER BY nrohits DESC, titulo ASC;        
*/      
        String sqlQuery = "SELECT dadoscatalogo.patrimonio, dadoscatalogo.titulo, dadoscatalogo.autoria, dadoscatalogo.veiculo, dadoscatalogo.data_publicacao, (count(*)) AS nrohits FROM dadoscatalogo";
        /*
        if(!(jsonEntrada.getString("patrimonio")).isEmpty()){sqlQuery="SELECT dadoscatalogo.patrimonio, dadoscatalogo.titulo, dadoscatalogo.autoria, dadoscatalogo.veiculo, dadoscatalogo.data_publicacao FROM dadoscatalogo"
                + " WHERE dadoscatalogo.patrimonio = "+jsonEntrada.getString("patrimonio"); return sqlQuery;}
        */
        if(jsonEntrada.getJsonObject("titulo")==null && jsonEntrada.getJsonObject("autoria")==null && jsonEntrada.getJsonObject("veiculo")==null && 
               jsonEntrada.getJsonObject("palchave")==null && jsonEntrada.getJsonObject("data")==null){sqlQuery="SELECT dadoscatalogo.patrimonio, dadoscatalogo.titulo, dadoscatalogo.autoria, dadoscatalogo.veiculo, dadoscatalogo.data_publicacao FROM dadoscatalogo";return sqlQuery;}
        
        
        if( jsonEntrada.getJsonObject("titulo")!=null){sqlQuery+="\n INNER JOIN palavrastitulonormal  ON(dadoscatalogo.patrimonio = palavrastitulonormal.patrimonio) ";}  
        if( jsonEntrada.getJsonObject("autoria")!=null){sqlQuery+="\n INNER JOIN palavrasautorianormal  ON(dadoscatalogo.patrimonio = palavrasautorianormal.patrimonio) ";}
        if( jsonEntrada.getJsonObject("veiculo")!=null){sqlQuery+="\n INNER JOIN palavrasveiculonormal  ON(dadoscatalogo.patrimonio = palavrasveiculonormal.patrimonio) ";}
        if( jsonEntrada.getJsonObject("palchave")!=null){sqlQuery+="\n INNER JOIN palavras_chave  ON(dadoscatalogo.patrimonio = palavras_chave.patrimonio) ";}
        sqlQuery +="\n WHERE ";
        if( jsonEntrada.getJsonObject("titulo")!=null){
            String palavrasTitulo[] = (new BiblioPDFDAO()).extrairPalavrasParaArrayUpper(jsonEntrada.getJsonObject("titulo"),"texto");
            sqlQuery +="(";
            for(String cadaPalavraTitulo: palavrasTitulo){
                sqlQuery += " palavrastitulonormal.palavra_titulo_normal = \'" + cadaPalavraTitulo +"\' ";
                sqlQuery += " "+jsonEntrada.getJsonObject("titulo").getString("modo");
            }
            sqlQuery= sqlQuery.substring(0,sqlQuery.length()-3);
            sqlQuery +=") AND ";
        }
        if( jsonEntrada.getJsonObject("autoria")!=null){
            String palavrasAutoria[] = (new BiblioPDFDAO()).extrairPalavrasParaArrayUpper(jsonEntrada.getJsonObject("autoria"),"texto");
            sqlQuery +="(";
            for(String cadaPalavraAutoria: palavrasAutoria){
                sqlQuery += " palavrasautorianormal.palavra_autoria_normal =\'"  + cadaPalavraAutoria+"\' ";
                sqlQuery += " "+jsonEntrada.getJsonObject("autoria").getString("modo");
            }
            sqlQuery= sqlQuery.substring(0,sqlQuery.length()-3);
            sqlQuery +=") AND ";
        }
        
        if( jsonEntrada.getJsonObject("veiculo")!=null){
            String palavrasVeiculo[] = (new BiblioPDFDAO()).extrairPalavrasParaArrayUpper(jsonEntrada.getJsonObject("veiculo"),"texto");
            sqlQuery +="(";
            for(String cadaPalavraVeiculo: palavrasVeiculo){
                sqlQuery += " palavrasveiculonormal.palavra_veiculo_normal =\'"  + cadaPalavraVeiculo+"\' ";
                sqlQuery += " "+jsonEntrada.getJsonObject("veiculo").getString("modo");
            }
            sqlQuery= sqlQuery.substring(0,sqlQuery.length()-3);
            sqlQuery +=") AND ";
        }
        
         if( jsonEntrada.getJsonObject("palchave")!=null){
            String palavrasPalChave[] = (new BiblioPDFDAO()).extrairPalavrasParaArrayUpper(jsonEntrada.getJsonObject("palchave"),"texto");
            sqlQuery +="(";    
            for(String cadaPalavraPalChave: palavrasPalChave){
                sqlQuery += " palavras_chave.palchavenormal =\'"  + cadaPalavraPalChave+"\' ";
                sqlQuery += " "+jsonEntrada.getJsonObject("palchave").getString("modo");
            }
            
         sqlQuery= sqlQuery.substring(0,sqlQuery.length()-3);
         sqlQuery +=") AND ";
         }
         
         if( jsonEntrada.getJsonObject("data")!=null){
            String dataDe; String dataAte;
            if( jsonEntrada.getJsonObject("data").getString("dataDe")!=null){dataDe=jsonEntrada.getJsonObject("data").getString("dataDe");}    
            else{dataDe="0001-01-01";}
            if( jsonEntrada.getJsonObject("data").getString("dataAte")!=null){dataAte=jsonEntrada.getJsonObject("data").getString("dataAte");}    
            else{dataAte="9999-12-31";}
            
            sqlQuery +="("+ "dadoscatalogo.data_publicacao >= \'" + dataDe +  "\' AND dadoscatalogo.data_publicacao <= \'" + dataAte + "\' )   AND";    
             
         }
        
        sqlQuery= sqlQuery.substring(0,sqlQuery.length()-5); 
        
        sqlQuery += "\n GROUP BY dadoscatalogo.patrimonio, dadoscatalogo.titulo, dadoscatalogo.autoria ORDER BY nrohits DESC, titulo ASC;";
        
        return sqlQuery;
    }    
//------------------------------------------------------------------------------

    public Long salvarNovo(JsonObject dados) {
        ResultSet rst = null;
        Utils util = new Utils();
        long patrimonio = 0L;
        
        try (Connection conexao = getConnection()) {
            // BEGIN TRANSACTION
            conexao.setAutoCommit(false);
            // PRIMEIRA TABELA
            PreparedStatement comandoSQL = conexao.prepareStatement(
            "INSERT INTO dadoscatalogo (titulo,autoria,veiculo,data_publicacao) VALUES(?,?,?,?) "+
            "RETURNING patrimonio;");
            
            if(dados.getString("titulo")!=null) comandoSQL.setString(1, dados.getString("titulo").replaceAll("\\s+", " "));
            else comandoSQL.setString(1,"");
            if(dados.getString("autoria")!=null) comandoSQL.setString(2, dados.getString("autoria").replaceAll("\\s+", " "));
            else comandoSQL.setString(2,"");
            if(dados.getString("veiculo")!=null) comandoSQL.setString(3, dados.getString("veiculo").replaceAll("\\s+", " "));
            else comandoSQL.setString(3,"");
            comandoSQL.setTimestamp(4, new Timestamp(Long.parseLong(dados.getString("data"))));

            rst = comandoSQL.executeQuery();
            rst.next();
            patrimonio = rst.getLong("patrimonio");
            // SEGUNDA TABELA
            if(dados.getString("titulo")!=null){
            String[] palavrasDoTitulo = extrairPalavrasParaArray(dados,"titulo");
            for (String cadaPalavraTitulo : palavrasDoTitulo) {
                comandoSQL = conexao.prepareStatement(
            "INSERT INTO palavrastitulonormal (palavra_titulo_normal,patrimonio) "+
            "VALUES(?,?);");
                comandoSQL.setString(1, util.removeDiacriticalsUper(cadaPalavraTitulo));
                comandoSQL.setLong(2, patrimonio);
                comandoSQL.executeUpdate();
            }
            }
            if(dados.getString("autoria")!=null){
            String[] palavrasDeAutoria = extrairPalavrasParaArray(dados,"autoria");
            for (String cadaPalavraAutoria : palavrasDeAutoria) {
                comandoSQL = conexao.prepareStatement(
            "INSERT INTO palavrasautorianormal (palavra_autoria_normal,patrimonio) "+
            "VALUES(?,?);");
                comandoSQL.setString(1, util.removeDiacriticalsUper(cadaPalavraAutoria));
                comandoSQL.setLong(2, patrimonio);
                comandoSQL.executeUpdate();               
            }}
            if(dados.getString("veiculo")!=null){
            String[] palavrasDeVeiculo = extrairPalavrasParaArray(dados,"veiculo");
            for (String cadaPalavraVeiculo : palavrasDeVeiculo) {
                comandoSQL = conexao.prepareStatement(
            "INSERT INTO palavrasveiculonormal (palavra_veiculo_normal,patrimonio) "+
            "VALUES(?,?);");
                comandoSQL.setString(1, util.removeDiacriticalsUper(cadaPalavraVeiculo));
                comandoSQL.setLong(2, patrimonio);
                comandoSQL.executeUpdate();               
            }}
            
            if(dados.getString("palchave")!=null){
            String[] palavrasDePalavraChave = extrairPalavrasParaArray(dados,"palchave");
            for (String cadaPalavraChave : palavrasDePalavraChave) {
                comandoSQL = conexao.prepareStatement(
            "INSERT INTO palavras_chave (palchave, patrimonio,palchavenormal) "+
            "VALUES(?,?,?);");
                comandoSQL.setString(1, cadaPalavraChave);
                comandoSQL.setLong(2, patrimonio);
                comandoSQL.setString(3, util.removeDiacriticals(cadaPalavraChave).toUpperCase());
                comandoSQL.executeUpdate();               
            }}
            
            // COMMIT TRANSACTION
            conexao.commit();
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return patrimonio;
    }

//------------------------------------------------------------------------------
}
