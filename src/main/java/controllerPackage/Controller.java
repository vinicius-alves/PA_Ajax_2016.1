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
import model.DAO.*;
import model.DTOs.RespostaCompletaDTO;

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
            System.out.println("\n\n Json entrada = " + jsonEntrada.toString() + "\n\n"); 
   
        } catch (Exception e) {
            e.printStackTrace();
        }

        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();
        JsonObject jsonSaida;

        // Fim da inicialização
        
      
        switch (jsonEntrada.getString("botaoEscolhido")) {

            case "Buscar": {
                
                 jsonSaida = ((new BiblioPDFDAO()).buscarLista(jsonEntrada)).toJSON();
                
            }   break;

            case "SalvarNovo": {
                Long p =    (new BiblioPDFDAO()).salvarNovo(jsonEntrada);
                    jsonSaida = Json.createObjectBuilder()
                .add("patrimonio", p ).build();
            }  break;
            
            default :{ 
            jsonSaida = Json.createObjectBuilder()
                .add("Status", "Botão não programado").build();
            }

        }
        
        System.out.println("\n\n JsonSaida = " +jsonSaida.toString() +"\n\n");
        
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
