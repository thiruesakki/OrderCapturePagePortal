package com.brakepartsinc.project.techportal.client.servlet;

        import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.ResponseCache;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Enumeration;

        import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.brakepartsinc.project.techportal.util.TPUtility;


/**
 * Servlet implementation class OracleApiServlet
 */
@WebServlet("/OracleApiServlet")
public class OracleApiServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public OracleApiServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        System.out.println("working");
        String result=OracleApiServlet.MyGETRequest();
        PrintWriter out = response.getWriter();
        out.println(result);
//     
//        doPost(request,response);
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {



        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Max-Age", "864010");
        String xml_request_data=request.getParameter("xml_data");
        String call_type_data=request.getParameter("call_type");
        String responseString = "";
        String outputString = "";
//        String wsURL = TPUtility.getOracleServiceHostName() + "/webservices/SOAProvider/plsql/xxbpi_customer_online/";
//        System.out.println("OracleAPI Service URL:[" + wsURL + "]");
//        String wsURL = "http://uswodapp013.brakepartsinc.com:8010/webservices/SOAProvider/plsql/xxbpi_customer_online/";//last source code url
        //String wsURL = "http://cloud.tarka.in/wonderla/get_data.php";
//        String wsURL = "https://www.google.com";
        String wsURL = "http://rest-api-demo2.us-e2.cloudhub.io/api/customers";
        URL url = new URL(wsURL);
        URLConnection connection = url.openConnection();
        HttpURLConnection httpConn = (HttpURLConnection)connection;
        ByteArrayOutputStream bout = new ByteArrayOutputStream();
        byte[] buffer = new byte[xml_request_data.length()];
        buffer = xml_request_data.getBytes();
        bout.write(buffer);
        byte[] b = bout.toByteArray();
        String SOAPAction =wsURL;
        // Set the appropriate HTTP parameters.
        System.out.println("Byte:"+Arrays.toString(b));
        System.out.println("b.length=="+b.length);
        httpConn.setRequestProperty("Content-Length",
                String.valueOf(b.length));
        httpConn.setRequestProperty("Content-Type", "text/xml; charset=utf-8");
        httpConn.setRequestProperty("SOAPAction", SOAPAction);
        httpConn.setRequestMethod("POST");
        httpConn.setDoOutput(true);
        httpConn.setDoInput(true);
        OutputStream out = httpConn.getOutputStream();
        //Write the content of the request to the outputstream of the HTTP Connection.
        out.write(b);
        out.close();
        //Ready with sending the request.

        //Read the response.
        InputStreamReader isr =
                new InputStreamReader(httpConn.getInputStream());
        BufferedReader in = new BufferedReader(isr);

        //Write the SOAP message response to a String.
        while ((responseString = in.readLine()) != null) {
            outputString = outputString + responseString;
        }


        // TODO Auto-generated method stub
        //doGet(request,response);
        System.out.println("output: "+outputString);
        PrintWriter out11 = response.getWriter();
        out11.write(outputString);
        out11.close();
        System.out.println("workinsssssssssssg");
    }
    public static String getBody(HttpServletRequest request) throws IOException {

        String body = null;
        StringBuilder stringBuilder = new StringBuilder();
        BufferedReader bufferedReader = null;

        try {
            InputStream inputStream = request.getInputStream();
            if (inputStream != null) {
                bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
                char[] charBuffer = new char[128];
                int bytesRead = -1;
                while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
                    stringBuilder.append(charBuffer, 0, bytesRead);
                }
            } else {
                stringBuilder.append("");
            }
        } catch (IOException ex) {
            throw ex;
        } finally {
            if (bufferedReader != null) {
                try {
                    bufferedReader.close();
                } catch (IOException ex) {
                    throw ex;
                }
            }
        }

        body = stringBuilder.toString();
        return body;
    }

public static String MyGETRequest() throws IOException {
System.out.println("inside get request function");
    URL urlForGetRequest = new URL("http://xxx-env1.us-e2.cloudhub.io/api/Customer?p_operating_unit_id=204&p_ship_to_loction=4946");
    String readLine = null;
    String outputString="";
    HttpURLConnection conection = (HttpURLConnection) urlForGetRequest.openConnection();
    conection.setRequestMethod("GET");
//    p_operating_unit_id=204&p_ship_to_loction=4946
    String p_operating_unit_id="204";
    String p_ship_to_loction="4946";
//    conection.setRequestProperty("p_operating_unit_id", p_operating_unit_id); // set userId its a sample here
//    conection.setRequestProperty("p_ship_to_loction", p_ship_to_loction); 
    int responseCode = conection.getResponseCode();
    System.out.println("before status");
    if (responseCode == HttpURLConnection.HTTP_OK) {
    	System.out.println("before input stream");
        BufferedReader in = new BufferedReader(
            new InputStreamReader(conection.getInputStream()));
        System.out.println("after input stream");
        StringBuffer response = new StringBuffer();
        
        while ((readLine = in .readLine()) != null) {
            response.append(readLine);
        } in .close();
        // print result
        System.out.println("JSON String Result " + response.toString());
        outputString=response.toString();
        //GetAndPost.POSTRequest(response.toString());
       
    } else {
        System.out.println("GET NOT WORKED");
    }
    return outputString;
}
}

