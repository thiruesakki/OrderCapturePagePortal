<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="bpionline-mexico/js/jquery-1.12.4.js"></script>
<script src="bpionline-mexico/js/jquery.cookie.js"></script>
<script src="bpionline-mexico/js/moment-with-locales.js"></script>
<!-- <script src="bpionline-mexico/plugins/jquery.validate.min.js"></script> -->
<!-- <script src="bpionline-mexico/plugins/jquery.validate.js"></script> -->
<script src="bpionline-mexico/js/bpicc_common_mexico.js"></script>
<script src="bpionline-mexico/js/index.js"></script>
<script>
    
</script>
</head>
<body>
<!-- 	<form name="login" action="LoginServlet" method="post"> -->
<form id="loginform" name="loginform" method="post">
		<center>
			<h1>
				<FONT SIZE="22" face="Arial">Technician Portal - Test
					Application</font>
			</h1>

			<TABLE ALIGN="center" BORDER=0 CELLSPACING=2 CELLPADDING=2
				WIDTH="100%" height="100%">
				<TR ALIGN="left" VALIGN="middle">
					<TD></TD>

					<TD>
						<TABLE ALIGN="center" BORDER=4 Bordercolor=#ff8823 CELLSPACING=2
							CELLPADDING=2 WIDTH="300" height="250" bgcolor="white">
							<TR ALIGN="center" VALIGN="middle">
								<TD colspan=2><B> <FONT SIZE="6" face="Arial">Login </FONT></TD>

							</TR>
							<TR ALIGN="center" VALIGN="middle">
								<TD><FONT SIZE="4" face="Arial">Login Name </FONT></TD>
								<TD><input type="text" id="mgnlUserId" name="mgnlUserId" size="15"></TD>
							</TR>
							<TR ALIGN="center" VALIGN="middle">
								<TD><FONT SIZE="4" face="Arial"> Password</FONT></TD>
								<TD><input type="Password" id="mgnlUserPSWD" name="mgnlUserPSWD" size="15"></TD>
							</TR>
							<TR ALIGN="center" VALIGN="middle">
								<TD colspan=2 align="right">&nbsp; &nbsp;<B><FONT
										SIZE="4" face="Arial"><a href="#"
											style="text-decoration: None"> Forget Password</a></FONT> </B></TD>
							</TR>
							<TR ALIGN="center" VALIGN="middle">
								<TD colspan=2><input type="button" id="loginButton" value="Login"
									name="loginButton"> &nbsp;
									&nbsp; <input type="Button" id="cancel" name="cancel" value="Clear">
							</TR>
						</TABLE>
					</TD>

					<TD align="right" valign="top"></TD>

				</TR>
			</Table>
			<br> <br>
	</form>
</body>
</html>
