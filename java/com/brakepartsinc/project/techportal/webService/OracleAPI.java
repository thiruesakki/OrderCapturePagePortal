package com.brakepartsinc.project.techportal.webService;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/OracleApi")
public class OracleAPI {

	@GET
	@Path(value = "/TestOracleAPI")
	public String TestOracleAPI(@Context HttpServletResponse response) {
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Methods",
				"POST, GET, OPTIONS, PUT, DELETE, HEAD");
		response.addHeader("Access-Control-Allow-Headers",
				"X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept");
		response.addHeader("Access-Control-Max-Age", "1728000");
		return "Working";
	}

	@POST
	@Path(value = "/GetOracleAPIData")
	@Produces(MediaType.APPLICATION_XML)
	public Response GetOracleAPIData(@Context HttpServletResponse response,
			@Context HttpServletRequest request, InputStream requestBody)
			throws IOException {

		BufferedReader reader = new BufferedReader(new InputStreamReader(
				requestBody));
		StringBuilder out1 = new StringBuilder();
		String line;
		while ((line = reader.readLine()) != null) {
			out1.append(line);
		}
		String xml_request_data = "";
		xml_request_data = out1.toString(); // Prints the string content read
											// from input stream
		reader.close();
		// System.out.println(out1.toString()); //Prints the string content read
		// from input stream

		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Methods",
				"POST, GET, OPTIONS, PUT, DELETE, HEAD");
		response.addHeader("Access-Control-Allow-Headers",
				"X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept");
		response.addHeader("Access-Control-Max-Age", "1728000");
		// Code to make a webservice HTTP request
		String responseString = "";
		String outputString = "";
		String wsURL = "http://uswodapp013.brakepartsinc.com:8010/webservices/SOAProvider/plsql/xxbpi_customer_online/";
		// String wsURL = "http://cloud.tarka.in/wonderla/get_data.php";
		URL url = new URL(wsURL);
		URLConnection connection = url.openConnection();
		HttpURLConnection httpConn = (HttpURLConnection) connection;
		ByteArrayOutputStream bout = new ByteArrayOutputStream();
		byte[] buffer = new byte[xml_request_data.length()];
		buffer = xml_request_data.getBytes();
		bout.write(buffer);
		byte[] b = bout.toByteArray();
		String SOAPAction = wsURL;
		// Set the appropriate HTTP parameters.

		System.out.println("b.length==" + b.length);
		httpConn.setRequestProperty("Content-Length", String.valueOf(b.length));
		httpConn.setRequestProperty("Content-Type", "text/xml; charset=utf-8");
		httpConn.setRequestProperty("SOAPAction", SOAPAction);
		httpConn.setRequestMethod("POST");
		httpConn.setDoOutput(true);
		httpConn.setDoInput(true);
		OutputStream out = httpConn.getOutputStream();
		// Write the content of the request to the outputstream of the HTTP
		// Connection.
		out.write(b);
		out.close();
		// Ready with sending the request.

		// Read the response.
		InputStreamReader isr = new InputStreamReader(httpConn.getInputStream());
		BufferedReader in = new BufferedReader(isr);

		// Write the SOAP message response to a String.
		while ((responseString = in.readLine()) != null) {
			outputString = outputString + responseString;
		}
		Response web_response = Response.status(200).type(MediaType.TEXT_XML)
				.entity(outputString).build();
		// Parse the String output to a org.w3c.dom.Document and be able to
		// reach every node with the org.w3c.dom API.
		return web_response;

	}

}
