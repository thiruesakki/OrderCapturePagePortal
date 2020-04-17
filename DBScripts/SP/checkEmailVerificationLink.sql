USE [TechPortal_DEV]
GO
/****** Object:  StoredProcedure [dbo].[checkEmailVerificationLink]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[checkEmailVerificationLink](
@secretkey  VARCHAR(50) , @BPI_StatusCode int OUTPUT, @BPI_StatusText VARCHAR(30) OUTPUT)
 AS
DECLARE @BPI_SecretKey VARCHAR(50)='01'
DECLARE @BPI_LinkSetDate AS Datetime
DECLARE @BPI_AlreadyConfirmed AS int
DECLARE @BPI_StsText AS VARCHAR(30) ='INVALID DATA'  
DECLARE @BPI_StsCode  AS int  = 5 
DECLARE @BPI_FlagCheck  AS int =0
  
Begin 
		   SELECT	
				@BPI_AlreadyConfirmed = confirmed, 
				@BPI_LinkSetDate  = verificationlinksenttime ,
				@BPI_SecretKey =  secret 
		   FROM dbo.bpi_user 
		   WHERE secret = @secretkey 
		  
		IF  @BPI_SecretKey != @secretkey 
			Begin
				SET @BPI_StsText = 'VERFICATION LINK INVALID'  -- SECTRT KEY
				SET @BPI_StsCode = 1 
				SET @BPI_FlagCheck = 1 				
			end		 
			
		IF  (@BPI_AlreadyConfirmed = 1 AND @BPI_FlagCheck = 0)
			Begin
				SET @BPI_StsText = 'EMAIL VERFICATION ALREADY DONE'  -- ALREADY CONFIRMED
				SET @BPI_StsCode = 2 
				SET @BPI_FlagCheck = 1	
			end 
			
		IF (@BPI_LinkSetDate < (GETDATE()-7) AND @BPI_FlagCheck = 0) -- Default to yesterday if nothing selected by user 
			Begin
				SET @BPI_StsText = 'EMAIL VERFICATION LINK INVALID'  -- one space is the error
				SET @BPI_StsCode = 3 
				SET @BPI_FlagCheck = 1
			END
		 
		IF (@BPI_LinkSetDate > (GETDATE()-7) AND @BPI_FlagCheck = 0) 
			Begin 
				SET @BPI_StsText = ''   --  EMAIL VERFICATION SUCCESSFUL
				SET @BPI_StsCode = 0 
				UPDATE  [dbo].bpi_user SET timemodified=GETDATE(), confirmed = 1 Where secret =@BPI_SecretKey  
			END  
			 
		 SELECT  @BPI_StatusCode = @BPI_StsCode     ,@BPI_StatusText  = @BPI_StsText    
		  
	--declare @BPI_StatusCode1 int  ,@BPI_StatusText1 Varchar(30)
 --   exec [dbo].[checkEmailVerificationLink]'1008', @BPI_StatusCode1 output, @BPI_StatusText1 output 
 --   Select  @BPI_StatusCode1 , @BPI_StatusText1	 
end  
GO