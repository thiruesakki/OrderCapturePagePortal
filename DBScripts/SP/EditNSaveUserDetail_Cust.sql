 USE [TechPortal_DEV]
 GO
 /****** Object:  StoredProcedure [dbo].[EditNSaveUserDetail_Cust]    Script Date: 5/19/2017 8:21:15 AM ******/
 SET ANSI_NULLS ON
 GO
 SET QUOTED_IDENTIFIER ON
 GO
   
 ALTER PROCEDURE [dbo].[EditNSaveUserDetail_Cust](
 @BPI_StatusCode int OUTPUT
 ,@BPI_StatusText VARCHAR(30) OUTPUT 
 , @UserId int  
 ,@AccountId varchar(2000)  
 )
  AS
 
 DECLARE @BPI_CheckNewRecord  AS int =0
 DECLARE @BPI_CheckUpdateRecord  AS int =0
 Declare @roleIdUpdate as varchar(200)
  
 DECLARE @BPI_StsText AS VARCHAR(30) ='INVALID DATA'  
 DECLARE @BPI_StsCode  AS int  = 5 
 DECLARE @BPI_FlagCheck  AS int =0 
   
     SET NOCOUNT ON
 	Begin      
 		--	SET	@AccountId = '1,amazon, B40001, S4001,1: 104,flipkart,300100, , 1:149,kart,Ship23, Bill32, 0'
 			declare @target table  ( id int, sname varchar(200), billto varchar(20), shipto varchar(20), sts int)
 			declare @temp table  ( datarow varchar(5000))
 
 			insert into @temp(datarow)
 			Select *  FROM dbo.StringSplit(@AccountId, ':')
 
 			--select * from @temp 
 			
 			insert into @target(id, sname, billto, shipto, sts)
 			select  [dbo].ufn_separates_columns(datarow,1,'~') ,
 			 [dbo].ufn_separates_columns(datarow,2,'~'),
 			 [dbo].ufn_separates_columns(datarow,3,'~'),
 			 [dbo].ufn_separates_columns(datarow,4,'~') ,
 			 [dbo].ufn_separates_columns(datarow,5,'~') 
 			from @temp 
 			 
 		 	--   SELECT * FROM @target  
 			 
 	  		INSERT INTO dbo.bpi_customer(user_id, account_number, billto_site_id, shipto_site_id, status)
 			SELECT distinct
 				B.id ,
 				B.sname, 
 				B.billto, 
 				B.shipto, 
 				B.sts
 			from  dbo.bpi_customer A 
 			Inner JOIN @target B ON A.user_id = B.id 
 			WHERE  B.billto NOT IN ( select distinct billto_site_id from dbo.bpi_customer where user_id = @UserId)			
 			OR  B.shipto  NOT IN ( select distinct shipto_site_id from dbo.bpi_customer where user_id = @UserId)		
 			and   B.id !=  0
 			
 		--	SET @BPI_CheckUpdateRecord   = @@ROWCOUNT ; 
 			
 			INSERT INTO dbo.bpi_customer(user_id, account_number, billto_site_id, shipto_site_id, status)
 			SELECT 
 				B.id ,
 				B.sname, 
 				B.billto, 
 				B.shipto, 
 				B.sts
 			from  @target B 
 			WHERE  B.id not in (Select distinct user_id from  dbo.bpi_customer)  
 			and   B.id !=  0
 			
 		--	SET 	@BPI_CheckNewRecord = @@ROWCOUNT ; 
 			
 			UPdate A SET A.status=0 FROM  dbo.bpi_customer A 
 			INNER JOIN @target B ON A.user_id = B.id 
 			WHERE A.billto_site_id NOT IN (select distinct billto from @target where id = @UserId)
 			OR  A.shipto_site_id NOT IN (select distinct shipto from @target where id = @UserId) 
 			and B.id != 0
 			 
 			SET @BPI_CheckUpdateRecord   = @@ROWCOUNT ; 
 			select @BPI_CheckUpdateRecord  as rowcountCheck
 			
 		--	IF (@BPI_CheckUpdateRecord = 0)
 		--	BEgin
 				UPdate A SET A.status=0 FROM  dbo.bpi_customer A  Where  user_id = @UserId 
 				and (select COUNT(id) from  @target where id = @UserId ) =0
 				-- select COUNT(id) as updateCount from  @target where id = @UserId 
 		--	END
 					SET @BPI_StatusCode  = 0
 					SET @BPI_StatusText= 'Customer Details updated' 
 		
 			--IF (@BPI_CheckUpdateRecord = 0)
 			--	BEgin
 			--		UPdate A SET A.status=0 FROM  dbo.bpi_customer A  Where  user_id = @UserId
 			--		SET @BPI_StatusCode  = 0
 			--		SET @BPI_StatusText= 'Customer updated' 
 			--END
 	 
 			--IF (@BPI_CheckUpdateRecord >=1 OR @BPI_CheckNewRecord >=1 )  
 			--	Begin
 			--		 SET @BPI_StatusCode  = 0
 			--		 SET @BPI_StatusText= 'Customer updated'
 			--END  
END  