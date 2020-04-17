USE [TechPortal_DEV]
GO


/****** Object:  StoredProcedure [dbo].[create_bpi_organization_details]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[create_bpi_organization_details]     
	(@orgname varchar(50)
		,@phone1 varchar(20)
		,@phone2 varchar(20)
		,@email varchar(100)
		,@website varchar(255)
		,@lang varchar(5) 
		,@address varchar(70) 
		,@city varchar(20) 
		,@state varchar(30) 
		,@country char(2) 
		,@zipcode varchar(20) 
		,@isdistributor int
		,@confirmed int
		,@approved int
		,@status int
		,@remarks varchar(1000)
	--	,@latitude varchar(20) 
	--	,@longitude varchar(20) 
	 )  
AS
		DECLARE @SPOrgId int ;
	    DECLARE  @SPaddressId int ;
		DECLARE @ErrorMessage NVARCHAR(4000);  
		DECLARE @ErrorSeverity INT;  
		DECLARE @ErrorState INT;  
	    
	SET NOCOUNT ON 
BEGIN 

	BEGIN TRY
		BEGIN TRANSACTION 
		    
			 INSERT INTO  dbo.bpi_organization
				   (orgname
				   ,phone1
				   ,phone2
				   ,email
				   ,website
				   ,lang
				   ,confirmed
				   ,approved 
				   ,isdistributor
				   ,status
				   ,remarks)
			 VALUES (	
     				@orgname
					,@phone1
					,@phone2
					,@email
					,@website
					,@lang
					,@confirmed   
					,@approved
	 				,@isdistributor
					,@status
					,@remarks) 
				
			SET @SPOrgId  = @@IDENTITY
		--		 select @@ROWCOUNT
				 
			INSERT INTO dbo.bpi_organization_address
			   (address
			   ,city
			   ,state
			   ,country
			   ,zipcode 
			   ,status
			   ,remarks)
			 VALUES
			   (@address ,
				@city,
				@state,
				@country ,
				@zipcode , 
				@status ,
				@remarks )
		           
			SET @SPaddressId  = @@IDENTITY
					---	   select @@ROWCOUNT  
		      
			 INSERT INTO dbo.bpi_organization_address_mapping
			   (addressid
			   ,organizationid
			   ,status
			   ,remarks)
			 VALUES
      			(@SPaddressId ,
				@SPOrgId ,
				@status ,
				@remarks ) 
				
			COMMIT
			--SELECT 'Commit done'
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



GO