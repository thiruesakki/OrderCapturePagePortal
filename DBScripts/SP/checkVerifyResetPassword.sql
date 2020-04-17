USE [TechPortal_DEV]
GO
/****** Object:  StoredProcedure [dbo].[checkVerifyResetPassword]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[checkVerifyResetPassword](
@secretkey  VARCHAR(50) , @BPI_StatusCode int OUTPUT, @BPI_StatusText VARCHAR(30) OUTPUT)
 AS
DECLARE @BPI_SecretKey int =  -1
DECLARE @BPI_LinkSetDate AS Datetime = NULL 
DECLARE @BPI_StsText AS VARCHAR(30) ='INVALID DATA'  
DECLARE @BPI_StsCode  AS int  = 5 
DECLARE @BPI_FlagCheck  AS int =0
  
Begin  
	SELECT  
		@BPI_SecretKey = count(resetLinkCode) 
		FROM  dbo.bpi_user_resetpassword  
		WHERE resetLinkCode = @secretkey and status=1 
		 
		IF  @BPI_SecretKey = 0
			Begin
				SET @BPI_StsText = 'NO RECORDS FOUND'  -- SECTRT KEY
				SET @BPI_StsCode = 1 
				SET @BPI_FlagCheck = 1 				
			end		 
 
 		IF  (@BPI_SecretKey  = 1 AND @BPI_FlagCheck = 0)  
			Begin 
				SELECT @BPI_LinkSetDate = resetLinkSentTime    
				FROM dbo.bpi_user_resetpassword 
				where status=1 
				and resetLinkCode =  @secretkey  
			end		 
		
	-----	   SELECT (GETDATE()-7)  as systemdate , @BPI_LinkSetDate as mailsent 
		 
		IF (@BPI_LinkSetDate < (GETDATE()-2) AND @BPI_FlagCheck = 0) -- Default to yesterday if nothing selected by user 
			Begin
				SET @BPI_StsText = 'RESET PASSWORD INVALID'
				SET @BPI_StsCode = 3 
				SET @BPI_FlagCheck = 1
			--	select @BPI_StsText , @BPI_StsCode, @BPI_FlagCheck
			END 
		IF (@BPI_LinkSetDate > (GETDATE()-2) AND @BPI_FlagCheck = 0) 
			Begin 
				SET @BPI_StsText = ''		-- RESET PASSWORD VALID
				SET @BPI_StsCode = 0  
			END   
		 SELECT  @BPI_StatusCode = @BPI_StsCode     ,@BPI_StatusText  = @BPI_StsText    
		  
--declare @BPI_StatusCode1 int  ,@BPI_StatusText1 Varchar(30)
--   exec [dbo].[checkVerifyResetPassword]'Test123', @BPI_StatusCode1 output, @BPI_StatusText1 output 
--   Select  @BPI_StatusCode1 , @BPI_StatusText1	 
     
end  
GO