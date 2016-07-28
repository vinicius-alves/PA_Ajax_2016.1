package model.DAO;



import java.sql.Connection;
import javax.naming.InitialContext;
import javax.sql.DataSource;


public class BaseDAO {

    private DataSource ds;

//------------------------------------------------------------------------------------------------------------
    public BaseDAO() {
        try {
            InitialContext cxt = new InitialContext();
            ds = (DataSource) cxt.lookup("java:comp/env/jdbc/bibliopdf");
        } catch (Exception e) {
            System.out.println("[BaseDAO.constructor] Excessão: " + e.getMessage());
        }
    }
//------------------------------------------------------------------------------------------------------------
    public Connection getConnection(){
        try{
            if(ds!=null){
                return ds.getConnection();
            }else{
                return null;
            }
        }catch(Exception e){
            System.out.println("[BaseDAO.getConnection] Excessão : " + e.getMessage());
        }
        return null;
    }
//------------------------------------------------------------------------------------------------------------
}
