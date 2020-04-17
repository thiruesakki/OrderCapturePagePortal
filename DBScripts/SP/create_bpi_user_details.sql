USE [TechPortal_DEV]
GO

/****** Object:  StoredProcedure [dbo].[create_bpi_user_details]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[create_bpi_user_details]     
	(	 
	@confirmed tinyint ,
	@approved tinyint ,
	@status tinyint ,
	@email varchar(100) ,
	@password varchar(32) ,
	@firstname varchar(20) ,
	@lastname varchar(20) ,
	@phone1 varchar(20),
	@phone2 varchar(20),
	@address varchar(70),
	@city varchar(20),
	@country char(2),
	@lang varchar(5),
	@remarks varchar(1000),
	@interest_in_communication tinyint ,
	@timezone  varchar(6),--  float ,   -- decimal(4,4)
	@firstaccess datetime ,
	@lastaccess datetime ,
	@lastlogin datetime ,
	@currentlogin datetime ,
	@lastip varchar(15),
 	@secret varchar(20),    
	@picture tinyint,
	@url varchar(255),
	@description text,
	@years_of_experience varchar(20),
	@area_of_speciality varchar(100),
	@bays_in_shop varchar(20),
	@brake_jobs_in_a_month varchar(20),
	@list_in_find_a_shop tinyint,
	@currently_using_raybestos_products tinyint,
 	@mailformat tinyint ,  --
 	@maildisplay tinyint ,  --
 	@htmleditor tinyint ,  --
 	@autosubscribe tinyint , --
	@timemodified datetime ,
	@nickname varchar(20),
	@keepShopPrivate tinyint ,
	@KeepEmployeePrivate tinyint,
	@iscustomer  tinyint,
	@referedby varchar(20),
	@orgid varchar(100) ,		--- Org id   mapping
	@jobcategoryid  varchar(100)  	--- job user job mapping 
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
	 
	INSERT INTO dbo.bpi_user
           (
            confirmed
           ,approved
           ,status
           ,email
           ,password
           ,firstname
           ,lastname
           ,phone1
           ,phone2
           ,address
           ,city
           ,country
           ,lang
           ,remarks
           ,interest_in_communication
           ,timezone
           ,firstaccess
           ,lastaccess
           ,lastlogin
           ,currentlogin
           ,lastip
           ,secret
           ,picture
           ,url
           ,description
           ,years_of_experience
           ,area_of_speciality
           ,bays_in_shop
           ,brake_jobs_in_a_month
           ,list_in_find_a_shop
           ,currently_using_raybestos_products
           ,mailformat
           ,maildisplay
           ,htmleditor
           ,autosubscribe
           ,timemodified
           ,nickname
           ,keepShopPrivate
           ,KeepEmployeePrivate
           ,	iscustomer
			,referedby
           )
     VALUES
           (@confirmed,
			@approved,
			@status,
			@email,
			@password ,
			@firstname,
			@lastname,
			@phone1,
			@phone2,
			@address,
			@city,
			@country,
			@lang,
			@remarks,
			@interest_in_communication,
			@timezone ,
			GETDATE(),  --@firstaccess  ,   --  GETDATE() -1,	--
			@lastaccess  ,	-- GETDATE() -2,	--	
			@lastlogin  ,	-- GETDATE() -3,	--
			@currentlogin  ,  --  GETDATE() -1,	--
			@lastip,
			@secret,
			@picture,
			@url,
			@description ,
			@years_of_experience,
			@area_of_speciality,
			@bays_in_shop,
			@brake_jobs_in_a_month,
			@list_in_find_a_shop,
			@currently_using_raybestos_products,
			@mailformat,
			@maildisplay,
			@htmleditor,
			@autosubscribe,
			GETDATE(),  -- @timemodified  ,   --  GETDATE() -4,	--
			@nickname,
			@keepShopPrivate,
			@KeepEmployeePrivate,
			@iscustomer,
			@referedby
			)
 
  SET @SPUserId  = @@IDENTITY
	 
  	---org user mapping 
	
		WHILE LEN(@orgid) > 0
			BEGIN
				DECLARE @Oid VARCHAR(100)
				IF CHARINDEX(':',@orgid) > 0
					SET  @Oid = SUBSTRING(@orgid,0,CHARINDEX(':',@orgid))
				ELSE
					BEGIN
					SET  @Oid = @orgid
					SET @orgid = ''
					END
			--  INSERT INTO  #Temp VALUES (@TDay)
			
			INSERT INTO dbo.bpi_user_organization_mapping
			   (userid,orgid,status,remarks) VALUES(@SPUserId,cast(@Oid as int) ,1 ,'')
			 SET @orgid = REPLACE(@orgid,@Oid + ':' , '')
			 END  
	 
	 ------		 --  job user mapping
			    
		WHILE LEN(@jobcategoryid) > 0
			BEGIN
				DECLARE @Jid VARCHAR(100)
				IF CHARINDEX(':',@jobcategoryid) > 0
					SET  @Jid = SUBSTRING(@jobcategoryid,0,CHARINDEX(':',@jobcategoryid))
				ELSE
					BEGIN
						SET  @Jid = @jobcategoryid
						SET @jobcategoryid = ''
					END   
			 INSERT INTO dbo.bpi_job_user_mapping  (userid ,jobcategoryid ,status ,remarks)
			 VALUES(@SPUserId,cast(@Jid as int) ,1 ,'' )   
			   
			 SET @jobcategoryid = REPLACE(@jobcategoryid,@Jid + ':' , '')
			END
			COMMIT
	-- 	SELECT 'Commit done'  
	 
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


  --  exec [create_bpi_user_details]  1,1,1, 'email1@sen.com'  ,'pwd' ,'sen',	 'mu',	
	 --'13131',	'54654',	'srp',	'chennai',	'inda',	'en', 		'' ,0	, 
	 --'YYT53' , '2017-03-31 20:29:02.880'  ,'2017-03-31 20:29:02.880'  ,'2017-03-31 20:29:02.880'  ,'2017-03-31 20:29:02.880'  ,
	 --	  '192.168.1.1', 	 	 'ffds',	0,	  'ew',	'we',	'0',	'0',	'0',	'0', 
	 --0,0,	0,	0,	0,	0,	'2017-03-31 20:29:02.880'  , '' ,1,1,1,'', '1' ,'5'
 
END


GO