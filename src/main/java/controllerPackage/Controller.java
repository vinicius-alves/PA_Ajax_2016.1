package controllerPackage;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringReader;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.json.*;

public class Controller extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        //Inicialização
        BufferedReader br = new BufferedReader(
                new InputStreamReader(
                        request.getInputStream(), "UTF8"));
        String textoDoJson = br.readLine();
        JsonObject jsonEntrada = null;
        try (JsonReader readerDoTextoDoJson
                = Json.createReader(new StringReader(textoDoJson))) {
            jsonEntrada = readerDoTextoDoJson.readObject();
        } catch (Exception e) {
            e.printStackTrace();
        }
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();
        JsonObject jsonSaida;

        // Fim da inicialização
        //System.out.println("\n\n\n" + jsonEntrada.getString("botaoEscolhido") + "\n\n\n"); jsonEntrada.getString("botaoEscolhido");
        switch (jsonEntrada.getString("botaoEscolhido")) {

            case "Buscar": {
                 jsonSaida = Json.createObjectBuilder()
                .add("nome", "nomeFantasia")/*
                .add("endereco", Json.createObjectBuilder()
                        .add("logradouro","Avenida Atlântica")
                        .add("numero","13")
                        .add("complementos","bloco C apto 601 fundos")
                        )
                .add("telefones", Json.createArrayBuilder()
                        .add("1-1234")
                        .add("2-1234")
                        .add("3-1234")
                        .add("4-1234")
                        .add("5-1234")
                        .add("6-1234")
                        .add("7-1234")
                        .add("8-1234")
                        .add("9-1234")
                        )*/
                .build();
            }

            case "SalvarNovo": {
                    
            }
            
            default :{
            jsonSaida = Json.createObjectBuilder()
                .add("Status", "Botão não programado").build();
            }

        }

       

        out.print(jsonSaida.toString());
        out.flush();
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
