USE [TechPortal_DEV]
GO
/****** Object:  StoredProcedure [dbo].[EditNSaveUserDetail_Role]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  
Create PROCEDURE [dbo].[EditNSaveUserDetail_Role](
@BPI_StatusCode int OUTPUT
,@BPI_StatusText VARCHAR(30) OUTPUT 
, @UserId int =169
,@roleid varchar(200)  --= '1:2:5'
)
 AS
DECLARE @BPI_CheckUpdateRoleRecord  AS int =0
DECLARE  @BPI_CheckInsertRoleRecord as int =0
Declare @roleIdUpdate as varchar(200)
 
--DECLARE @BPI_StsText AS VARCHAR(30) ='INVALID DATA'  
--DECLARE @BPI_StsCode  AS int  = 5 
--DECLARE @BPI_FlagCheck  AS int =0 
    
		SET NOCOUNT ON
Begin    
		SET @roleIdUpdate = @roleid   
		  
			Begin  
				WHILE LEN(@roleid) > 0
					BEGIN
					
						DECLARE @RecordCheck int
						DECLARE @rid VARCHAR(100)
						IF CHARINDEX(':',@roleid) > 0
							SET  @rid = SUBSTRING(@roleid,0,CHARINDEX(':',@roleid))
							
						ELSE
							BEGIN
								SET  @rid = @roleid
								SET @roleid = '' 
							END 
						Select @RecordCheck = COUNT(user_id) 
						from  dbo.bpi_user_role_mapping 
						where user_id = @UserId AND role_id = @rid 
					 
						IF  (@RecordCheck  != 1 )  
							Begin  
								INSERT INTO dbo.bpi_user_role_mapping(user_id,role_id,status) VALUES (@UserId,cast(@rid as int) ,1 ) 
								SET @BPI_CheckInsertRoleRecord = @@ROWCOUNT ; 
							END
						
						SET @roleid = REPLACE(@roleid,@rid + ':' , '')
						--SET @BPI_StsText = 'USER NEW ROLE ADDED'   
						--SET @BPI_StsCode = 0 
						--SET @BPI_FlagCheck = 1 	
				 
				END  
			END   
				declare @tempRoleId table  ( datarw varchar(5000))
				 
			--	WHILE LEN(@roleIdUpdate) > 0
					-- Select *  FROM dbo.StringSplit('1:2:5', ':')
						insert into @tempRoleId(datarw)
						Select *  FROM dbo.StringSplit(@roleIdUpdate, ':')
						
					--	SELECT * FROM @tempRoleId 						
					-- Select role_id from dbo.bpi_user_role_mapping where  role_id not in  (SELECT datarw FROM @tempRoleId )
				--		SET @roleid =  replace(@roleid,':', ',')  
					 
						UPDATE  dbo.bpi_user_role_mapping SET  STATUS = 0 
						WHERE user_id = @UserId	AND role_id NOT IN (SELECT datarw FROM @tempRoleId ) 
						
						UPDATE  dbo.bpi_user_role_mapping SET  STATUS = 1 
						WHERE user_id = @UserId	AND role_id  IN (SELECT datarw FROM @tempRoleId ) 
						--AND 
					--	   (user_id,role_id,status) VALUES(@UserId,cast(@drid as int) ,1 )  
						--SET @BPI_StsText = 'USER ROLE REMOVED'   
						--SET @BPI_StsCode = 0 
						--SET @BPI_FlagCheck = 1 	
						SELECT @BPI_CheckUpdateRoleRecord =  @@ROWCOUNT ; 
			 
			
			IF  (@BPI_CheckInsertRoleRecord  >= 1 OR @BPI_CheckUpdateRoleRecord >= 1 )  
				Begin 
					SET @BPI_StatusCode =  0 -- RECORD UPDATED
					SET @BPI_StatusText = 'USER ROLE RECORD UPDATED'
				end	
			--ELSE 
			--	Begin 
			--		SET @BPI_StsText = 'USER ROLE RECORD NOT UPDATED'   
			--		SET @BPI_StsCode = 1 
			--		SET @BPI_FlagCheck = 1 	
			--	end 
			
		-- SP testing script
--			USE [technicianportal_dev]
--GO
--DECLARE	@return_value int
--EXEC	@return_value = [dbo].[EditNSaveUserDetail_Role	@UserId = 169,@roleid = '1'
--SELECT	'Return Value' = @return_value
END  


GO