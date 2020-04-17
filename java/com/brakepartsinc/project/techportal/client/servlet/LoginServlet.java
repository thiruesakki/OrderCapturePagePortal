package com.brakepartsinc.project.techportal.client.servlet;

 

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.brakepartsinc.project.techportal.client.util.TestService;
import com.brakepartsinc.project.techportal.util.TPUtility;

public class LoginServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	    /**
	     * Handles the HTTP <code>POST</code> method.
	     *
	     * @param request servlet request
	     * @param response servlet response
	     * @throws ServletException if a servlet-specific error occurs
	     * @throws IOException if an I/O error occurs
	     */
	    @Override
	    protected void doPost(HttpServletRequest request, HttpServletResponse resp)
	            throws ServletException, IOException {
	    	
//	    	TPLogin login = new TPLogin();
//			LoginResult result = login.handle(request, resp);
//			System.out.println("In Servlet - Login Result:" + result);
			
	    	// BPI Online services
	    	int loginStatus=TestService.testVerifyLoginService(request.getParameter("mgnlUserId"), request.getParameter("mgnlUserPSWD"));
	    	if(loginStatus>0){
		    	String htmlurl = "http://localhost:8080/BPITechnicianPortal/bpionline-mexico/selectAccount.html";
				resp.sendRedirect(htmlurl);
	    	}else{
	    		resp.sendRedirect("http://localhost:8080/BPITechnicianPortal/");
	    	}
//			TestService.testChangePswdWithOldPswdService();
//			TestService.testGetUserRolenCustomerDetailsService();
//			TestService.testCountriesService();
//			TestService.testShippingMethodTypesService();
//	    	TestService.testGetAllCAPUsersService();
//	    	TestService.testGetAllCAPRolesService();
//	    	TestService.testAddCAPUser();
//	    	TestService.testGetCAPUserForEmailSearchService();
//	    	TestService.testGetCAPUserForBilltoShipToSearchService();
	    	
	    	
	    	// Test encrypt code
//			String value = "bpi@1234";
//			String encryptedPassword = new Base64().encodeAsString(value.getBytes());
//			String value1 = "bpi@4321";
//			String encryptedPassword1 = new Base64().encodeAsString(value1.getBytes());
//			System.out.println("Value:" + encryptedPassword + ";Value1:" + encryptedPassword1);
		   	
			// Decrypt Code
//	    	String value = "YnBpQDEyMzQ=";
//	    	String decryptedValue = TPUtility.decodePassword(value);
//	    	String value1 = "dGVzdA==";
//	    	String decryptedValue1 = TPUtility.decodePassword(value1);
//	    	System.out.println("Value:" + decryptedValue + ";Value1:" + decryptedValue1);
			
	    	// Tech Portal services
	    	
//	    	TestService.testCreateOrg();
//	    	TestService.testCreateUser();
//	    	TestService.testVerifyOrganizationService();
	    	
//	    	TestService.testOrganizationService();
//	    	TestService.testJobService();
	    	
//	    	TestService.testGetUserProfileService();
//	    	TestService.testGetRoleDetailsService();
//	    	TestService.testCategoryListService();
//	    	TestService.testUserFavoritesListService();
//	    	TestService.testGetDashboardPreferenceService();
//	    	TestService.testGetVideoViewDetailsService();
//	    	TestService.testSaveVideoDetailService();
//	    	TestService.testSetOrganizationApprovalService();
//	    	TestService.testSetUserApprovalService();
//	    	TestService.testSaveUserFavoritesService();
 
	    	
//	    	TestService.testSaveDashboardPreferenceService();
//	    	TestService.testGetDistributorsService();
//	    	TestService.testGetDistributor();
//	    	TestService.testUserFavoritesDistributorsService();
	    	
//	    	TestService.testChangePswdService();
//	    	TestService.testEmailVerificationService();
//	    	TestService.testResetPswdKeySaveService();
//	    	TestService.testResetPswdVerificationService();
//	    	TestService.testResetPswdUpdateService();
//	    	TestService.testUpdateUserLoginInfoService();
//    		TestService.testUpdateUserLogoutInfoService();
//	    	TestService.testGetAllJobTitleForSingleUser();
//		   	TestService.testGetAllOrganizationForSingleUser();
//	    	TestService.testVerifyEmailService();
	    	
//		 	TestService.testUpdateUserOrganizationMapping();
//		   	TestService.testGetUnapprovedTCUsersService();
	      	
//	   	 	TestService.testGetAllDistributorByCity(); 	
//	   	 	TestService.testGetAllDistributorByZipcode();
	    	
//	    	TestService.testSaveTipsAndTricksService();
//	     	TestService.testgetUnapprovedTipsNTricks();
//	   	  	TestService.testGetUserFavoritesTipsnTricksService();
// 	    	TestService.testTipsAndTricksApproval();
// 	   	 	TestService.testGetTipsAndTricksService();
//	   	 	TestService.testUpdateTipsAndTricksService();  // TODO Check if this is needed  	 		
	   	
//	    	TestService.testGETAllTPActiveUsers();
//	    	TestService.testGetUnapprovedTCUsersService();
//	    	TestService.testGetUserProfileService();
//	    	TestService.testUpdateUserProfileService();
//	   	    TestService.testSaveDashboardPreferenceService(); 
	   	    	
//	    	TestService.testSaveUserFavoritePlaceService();
//	    	TestService.testGetUserFavoritePlaceService();
	    	
//	    	TestService.testSaveRewardProgramService();
//	    	TestService.testGetRewardProgramService();

//	    	TestService.testSaveRewardEventsService();
//	    	TestService.testGetRewardEventsService();

//	    	TestService.testSaveRewardsTransactionService();
//			TestService.testSaveRewardsApprovalService();

//			TestService.testGetRewardsPendingApprovalService();
			
//			TestService.testGetRewardTransactionForPeriodService();  
//	    	TestService.testGetRewardsSummaryService();
	    	
//	    	TestService.testAddPromoBusinessDetail();
//	    	TestService.testAddPRIPromoDetail();
//	    	TestService.testChevyTruckpromoDetails();//last uncommand
	    	
	    	// Shekar Oracle API Test
	    	/*Client restClient = Client.create();
			com.sun.jersey.api.client.WebResource resource = restClient
					.resource(TPConstants.GET_ORACLE_API_SERVLET);
			ClientResponse response = resource.accept("application/json").get(
					ClientResponse.class);

			if (response.getStatus() == 200) {
				String output = response.getEntity(String.class);
				System.out.println("Response from Webservice .... \n");
				System.out.println(output);
			}*/
	    	
	    	/*Client restClient = Client.create();
			com.sun.jersey.api.client.WebResource resource = restClient
					.resource(TPConstants.GET_SHIPPING_METHOD_TYPES_SERVICE);
			ClientResponse response = resource.accept("application/json").get(
					ClientResponse.class);

			if (response.getStatus() == 200) {
				String output = response.getEntity(String.class);
				System.out.println("Response from Webservice .... \n");
				System.out.println(output);
				
				JsonParser parser = new JsonParser();
				JsonObject json = (JsonObject) parser.parse(output);
				int status = json.get("status").getAsInt();
				System.out.println("*** Status:" + status);
				if(status == 0){
					JsonArray obj = json.get("object").getAsJsonArray();
					List<String> methods = new ArrayList<String>();
					for(int i=0; i<obj.size();i++){
						JsonObject object = obj.get(i).getAsJsonObject();
						String name = object.get("description").getAsString();
						methods.add(name);
						System.out.println("Name:" + name);
					}
					System.out.println("*** Shipping Methods:" + methods);
				}
			} else {
				System.out.println("Failed : HTTP error code : "
						+ response.getStatus());
			}*/
	    }

	    @Override
	    protected void doGet(HttpServletRequest request, HttpServletResponse resp)
	            throws ServletException, IOException {
	    	TestService.testDBConnectivity();
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
