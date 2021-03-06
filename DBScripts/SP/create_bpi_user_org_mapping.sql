USE [techportal_dev]
GO
 
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create PROCEDURE [dbo].[create_bpi_user_org_mapping]     
	(	 
	@userId int ,
	@orgid varchar(1000)  
	) 
AS
		DECLARE @SPUserId int ;
		DECLARE @ErrorMessage NVARCHAR(4000);  
		DECLARE @ErrorSeverity int;  
		DECLARE @ErrorState int;  
		SET NOCOUNT ON 
BEGIN
	BEGIN TRY 
	BEGIN TRANSACTION   
	  
  		Begin  
  		
  				UPDATE dbo.bpi_user_organization_mapping SET status=0  where userid = @UserId
  		 
				WHILE LEN(@orgid) > 0
					BEGIN
					
						DECLARE @RecordCheck int
						DECLARE @oid VARCHAR(100)
						IF CHARINDEX(':',@orgid) > 0
							SET  @oid = SUBSTRING(@orgid,0,CHARINDEX(':',@orgid))
							
						ELSE
							BEGIN
								SET  @oid = @orgid
								SET @orgid = '' 
							END 
						Select @RecordCheck = COUNT(userid) 
						from  dbo.bpi_user_organization_mapping 
						where userid = @UserId AND orgid = @oid 
					 
						IF  (@RecordCheck  != 1 )  
							Begin  
								INSERT INTO dbo.bpi_user_organization_mapping(userid,orgid,status) VALUES (@UserId,cast(@oid as int) ,1 ) 
								--SET @BPI_CheckInsertRoleRecord = @@ROWCOUNT ; 
							END
						IF  (@RecordCheck  = 1 )  
							Begin 
								 UPDATE dbo.bpi_user_organization_mapping SET status=1  where userid = @UserId
							END
						
						SET @orgid = REPLACE(@orgid,@oid + ':' , '')
						--SET @BPI_StsText = 'USER NEW ROLE ADDED'   
						--SET @BPI_StsCode = 0 
						--SET @BPI_FlagCheck = 1 	
				 
				END  
			END  
			COMMIT  
		END TRY
		BEGIN CATCH 
		SELECT   
        @ErrorMessage = ERROR_MESSAGE(),  
        @ErrorSeverity = ERROR_SEVERITY(),  
        @ErrorState = ERROR_STATE();  
        
			IF @@TRANCOUNT > 0
				ROLLBACK 
			-- SELECT 'Rollback Done : ERROR is' + ERROR_MESSAGE()
			  RAISERROR (@ErrorMessage,   @ErrorSeverity,  @ErrorState     );  
		END CATCH

	
END

 --exec [create_bpi_user_org_mapping]  1,'1:2:3'
 