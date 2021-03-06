USE [techportal_dev]
GO
/****** Object:  StoredProcedure [dbo].[updateUserProfile]    Script Date: 05/12/2017 19:30:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  
CREATE PROCEDURE [dbo].[updateUserProfile](
@BPI_StatusCode int OUTPUT
,@BPI_StatusText VARCHAR(30) OUTPUT 
,@UserId int
,@email VARCHAR(30)
,@password VARCHAR(30)
,@firstname  varchar(20)
,@lastname varchar(20)
,@phone1 varchar(20)
,@phone2 varchar(20)
,@address varchar(70)
,@city  varchar(20)
,@country  varchar(20)   
,@nickname  varchar(20)
,@picture tinyint
,@url varchar(255)  
,@years_of_experience varchar(20)
,@area_of_speciality varchar(100)
,@interestincommunication tinyint
,@bays_in_shop	varchar(20)
,@brake_jobs_in_a_month varchar(20)
,@list_in_find_a_shop  tinyint
,@currently_using_raybestos_products tinyint
,@keepshopprivate int
,@keepemployeeprivate int
,@state  varchar(50)
,@jobTitleId   varchar(1000) 
,@orgId  varchar(1000 )
)
 AS
DECLARE @BPI_CheckEmptyRecord  AS int =0
DECLARE @BPI_CheckActiveRecord  AS int =0
DECLARE @BPI_CheckUpdateUserRecord  AS int =-1
DECLARE @BPI_CheckUpdateJobRecord  AS int =-1
DECLARE @BPI_CheckUpdateOrgRecord  AS int =-1
 
DECLARE @BPI_StsText AS VARCHAR(30) ='INVALID DATA'  
DECLARE @BPI_StsCode  AS int  = 5 
DECLARE @BPI_FlagCheck  AS int =0
   
DECLARE @ErrorMessage NVARCHAR(4000);  
DECLARE @ErrorSeverity INT;  
DECLARE @ErrorState INT;  

    SET NOCOUNT ON
Begin   
	BEGIN TRY 
  
		SELECT  @BPI_CheckActiveRecord =  usr.status, 
			@BPI_CheckEmptyRecord =  count(usr.id) 
		FROM  dbo.bpi_user  usr
		WHERE usr.id = @UserId  group by usr.status 
 		 	  
		 ----   User records update or  condition
		IF ( @BPI_CheckEmptyRecord >= 1)  
			Begin
				UPDATE dbo.bpi_user  SET
						email = @email   
						,password = @password
						,firstname = @firstname  						
						,lastname = @lastname 						
						,phone1 = @phone1
						,phone2 = @phone2
						,address = @address
						,city = @city						
						,country = @country 
						,nickname = @nickname
						,picture = @picture
						,url = @url  
						,years_of_experience = @years_of_experience 
						,area_of_speciality = @area_of_speciality
						,interest_in_communication = @interestincommunication
						,bays_in_shop = @bays_in_shop
						,brake_jobs_in_a_month = @brake_jobs_in_a_month
						,list_in_find_a_shop  = @list_in_find_a_shop
						,currently_using_raybestos_products = @currently_using_raybestos_products
						,keepshopprivate=  @keepshopprivate 
						,keepemployeeprivate  = @keepemployeeprivate  
						,timemodified = GETDATE()
						,state = @state
						WHERE id  = @UserId 
						
						SELECT @BPI_CheckUpdateUserRecord =  @@ROWCOUNT ;  -- update record status  
			END  
		
			IF  (@BPI_CheckUpdateUserRecord  >= 1 )  
			Begin 
				SET @BPI_StsText = 'RECORD UPDATED'   
				SET @BPI_StsCode = 0  
			END	
			 
			----   Jobtitle records update or insert condition
		 Begin  
			declare @tempJobId table  ( datarw varchar(5000)) 
			
				insert into @tempJobId(datarw)
				Select *  FROM dbo.StringSplit(@jobTitleId, ':') 
				
				WHILE LEN(@jobTitleId) > 0
					BEGIN 
						DECLARE @RecordCheck int
						DECLARE @jid VARCHAR(100)
						IF CHARINDEX(':',@jobTitleId) > 0
							SET  @jid = SUBSTRING(@jobTitleId,0,CHARINDEX(':',@jobTitleId))
							
						ELSE
							BEGIN
								SET  @jid = @jobTitleId
								SET @jobTitleId = '' 
							END 
						Select @RecordCheck = COUNT(userid) 
						from  dbo.bpi_job_user_mapping 
						where userid = @UserId AND jobcategoryid = @jid 
					 
						IF  (@RecordCheck  != 1 )  
							Begin  
								INSERT into dbo.bpi_job_user_mapping(userid, jobcategoryid, status, remarks)
								VALUES (@UserId,cast(@jid as int) ,1 ,'') 
								 
							--	SET @BPI_CheckInsertRoleRecord = @@ROWCOUNT ; 
							END   
						SET @jobTitleId = REPLACE(@jobTitleId,@jid + ':' , '')  
					END  
				
				UPDATE dbo.bpi_job_user_mapping SET status = 1
				where userid  = @UserId and  jobcategoryid IN (SELECT datarw FROM @tempJobId ) 
				
				UPDATE dbo.bpi_job_user_mapping SET status = 0
				where userid  = @UserId and  jobcategoryid NOT IN (SELECT datarw FROM @tempJobId )
				
				SELECT @BPI_CheckUpdateJobRecord = @@ROWCOUNT
				
			IF  (@BPI_CheckUpdateJobRecord  >= 1 )  
			Begin 
				SET @BPI_StsText = 'JOB RECORD UPDATED'   
				SET @BPI_StsCode = 0  
			END	   
		END    

		----   Organization records update or insert condition
		Begin  
			declare @tempOrgId table  ( datarw varchar(5000)) 
				insert into @tempOrgId(datarw)
				Select *  FROM dbo.StringSplit(@orgId, ':') 
				
				WHILE LEN(@orgId) > 0
					BEGIN 
						DECLARE @RecordCheckOrg int
						DECLARE @oid VARCHAR(100)
						IF CHARINDEX(':',@orgId) > 0
							SET  @oid = SUBSTRING(@orgId,0,CHARINDEX(':',@orgId)) 
						ELSE
							BEGIN
								SET  @oid = @orgId
								SET @orgId = '' 
							END 
						Select @RecordCheckOrg = COUNT(userid) 
						from  dbo.bpi_user_organization_mapping 
						where userid = @UserId AND orgid = @oid 
					 
						IF  (@RecordCheckOrg  != 1 )  
							Begin  
								insert into dbo.bpi_user_organization_mapping(userid, orgid, status, remarks)
								VALUES (@UserId,cast(@oid as int) ,1 ,'')  
								--	SET @BPI_CheckInsertRoleRecord = @@ROWCOUNT ; 
							END   
						SET @orgId = REPLACE(@orgId,@oid + ':' , '')  
					END  
				
				UPDATE dbo.bpi_user_organization_mapping SET status = 1
				where userid  = @UserId and  orgid IN (SELECT datarw FROM @tempOrgId ) 
				
				UPDATE dbo.bpi_user_organization_mapping SET status = 0
				where userid  = @UserId and  orgid NOT IN (SELECT datarw FROM @tempOrgId )
								
				SELECT @BPI_CheckUpdateOrgRecord = @@ROWCOUNT
				
				IF  (@BPI_CheckUpdateOrgRecord  >= 1 )  
				Begin 
					SET @BPI_StsText = 'ORG RECORD UPDATED'   
					SET @BPI_StsCode = 0  
				END	   
			END    
		END TRY
		BEGIN CATCH 
			SELECT   
			@ErrorMessage = ERROR_MESSAGE(),  
			@ErrorSeverity = ERROR_SEVERITY(),  
			@ErrorState = ERROR_STATE();   
				  RAISERROR (@ErrorMessage,   @ErrorSeverity,  @ErrorState     );  
		END CATCH	  
END  