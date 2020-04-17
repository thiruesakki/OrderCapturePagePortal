USE [TechPortal_DEV]
GO
/****** Object:  StoredProcedure [dbo].[getMatchingUserForBilltoShipto]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getMatchingUserForBilltoShipto]     
	(@B_Or_S char(1)
		,@billOrShiptoVal varchar(20) 
		,@UserId int OUTPUT
		,@email VARCHAR(50) OUTPUT
		,@status tinyint OUTPUT
		,@password VARCHAR(50) OUTPUT
		,@firstname VARCHAR(50) OUTPUT
		,@lastname VARCHAR(50) OUTPUT
	 )  
AS

	    
	SET NOCOUNT ON 
BEGIN  
--  declare @B_Or_S char(1)
-- declare @billOrShiptoVal varchar(20)
--set @B_Or_S = 's'
----set @billOrShiptoVal = '19053'
--SET @billorshiptoval = 'Z6302'
 
	IF @B_OR_S is null or len(@b_or_s) <= 0
	return
 
	IF @B_OR_S = 'B'
		BEGIN
			select 
				@UserId = u.id, 
				@email = u.email, 
				@status = u.status, 
				@password = u.password, 
				@firstname =  u.firstname, 
				@lastname = u.lastname
			from bpi_user u
			join bpi_customer c on c.user_id = u.id
			where c.billto_site_id = @billOrShiptoVal
		END
	ELSE IF @B_Or_S = 'S'
		BEGIN
			select  @UserId = u.id, 
			@email = u.email, 
			@status = u.status, 
			@password = u.password, 
			@firstname =  u.firstname, 
			@lastname = u.lastname
			from bpi_user u
			join bpi_customer c on c.user_id = u.id
			where c.SHIPTO_SITE_ID = @billOrShiptoVal
		END
END 
 

GO