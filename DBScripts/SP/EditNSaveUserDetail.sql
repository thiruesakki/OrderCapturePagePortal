USE [TechPortal_DEV]
GO
/****** Object:  StoredProcedure [dbo].[EditNSaveUserDetail]    Script Date: 5/19/2017 8:21:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  
ALTER PROCEDURE [dbo].[EditNSaveUserDetail](
@UserId int
,@email VARCHAR(100)
,@password VARCHAR(32)
,@firstname  varchar(20)
,@lastname varchar(20) 
,@activeStatus int
,@roleid varchar(200)
,@AccountId varchar(2000)
,@BPI_StatusCode int OUTPUT
,@BPI_StatusText VARCHAR(30) OUTPUT 
)
 AS
 DECLARE @BPI_CheckNewRecord  AS int =0
DECLARE @BPI_CheckUpdateRecord  AS int =0
DECLARE @BPI_StatusCode1 int  
DECLARE @BPI_StatusText1 VARCHAR(30) 
DECLARE @BPI_StatusCode2 int  
DECLARE @BPI_StatusText2 VARCHAR(30) 

DECLARE @BPI_CheckEmptyRecord  AS int =0
DECLARE @BPI_CheckActiveRecord  AS int =0
DECLARE @BPI_CheckUpdateUserRecord  AS int =0
DECLARE @BPI_CheckUpdateRoleRecord  AS int =0
Declare @roleIdUpdate as varchar(200)
 
DECLARE @BPI_StsText AS VARCHAR(30) ='INVALID DATA'  
DECLARE @BPI_StsCode  AS int  = 5 
DECLARE @BPI_FlagCheck  AS int =0
--declare @roleid varchar(200) = '1:2:5'

Declare @eml VARCHAR(100);
Declare @psw VARCHAR(32);
Declare @ftn  varchar(30);
Declare @ltn varchar(30);
Declare @sts INT;
 
DECLARE @ErrorMessage NVARCHAR(4000);  
DECLARE @ErrorSeverity INT;  
DECLARE @ErrorState INT;  

    SET NOCOUNT ON
Begin    
  
	BEGIN TRY 
 
		SET @roleIdUpdate = @roleid 
	--	SET	@AccountId = '1,amazon, B40001, S4001,1: 104,flipkart,300100, , 1:149,kart,Ship23, Bill32, 0'		
	   
		Select 	
			@eml = email,
			@psw = password,	
			@ftn = firstname,	
			@ltn = lastname,
			@sts = status 
		FROM  dbo.bpi_user  usr
		WHERE usr.id = @UserId 
		
		IF (@eml != @email OR @psw != @password  OR @ftn != @firstname  OR @ltn != @lastname OR @sts != @activeStatus)  
			Begin
				UPDATE 
					dbo.bpi_user  
				SET
					email = @email ,  
					password = @password , 
					firstname = @firstname , 
					lastname = @lastname ,	
					status = @activeStatus,					
					timemodified = GETDATE()
				WHERE id  = @UserId   
				
		 	    SET @BPI_CheckUpdateUserRecord = @@ROWCOUNT  
		 	    select 1 where 2=3  
		 	   -- SELECT @BPI_CheckUpdateUserRecord
			END   
	 	--***********************	Role Id starts here **********************  
	 	--  IF (LEN(@roleid) > 0 ) 
	 	--	BEGIN     
	 	EXEC EditNSaveUserDetail_Role @BPI_StatusCode OUTPUT, @BPI_StatusText  OUTPUT, @UserId, @roleid  
	 --	END
	 --	Select @BPI_StatusCode1 = @BPI_StatusCode,@BPI_StatusText1 =  @BPI_StatusText
	 
	    --**********************	Role Id ends here *********************
			
        --**********************	Accounts Id starts here ***************
     --   IF (LEN(@AccountId) > 0 ) 
	 --		BEGIN                     	
 		EXEC EditNSaveUserDetail_Cust @BPI_StatusCode OUTPUT, @BPI_StatusText  OUTPUT, @UserId, @AccountId 
	 --	END
	  --	Select @BPI_StatusCode2 = @BPI_StatusCode,@BPI_StatusText2 =  @BPI_StatusText
	  	
	 	--***********************	Accounts Id end here ****************---------		 
		 
		  IF (@BPI_CheckUpdateUserRecord >=1 )  
			Begin
				 SET @BPI_StatusCode  = 0
				 SET @BPI_StatusText= 'user updated'
			END  
			
		 -- IF (@BPI_CheckUpdateRecord >=1 OR @BPI_CheckNewRecord >=1 OR @BPI_StatusCode=0)  
			--Begin
			--	 SET @BPI_StatusCode  = 0
			--	 SET @BPI_StatusText= 'Record upated'
			--END   			 
   
		END TRY
		BEGIN CATCH 
			SELECT   
			@ErrorMessage = ERROR_MESSAGE(),  
			@ErrorSeverity = ERROR_SEVERITY(),  
			@ErrorState = ERROR_STATE();   
				  RAISERROR (@ErrorMessage,   @ErrorSeverity,  @ErrorState     );  
		END CATCH	  
END  