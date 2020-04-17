 USE [TechPortal_DEV]
 GO
 /****** Object:  StoredProcedure [dbo].[create_bpi_user_favorites]    Script Date: 5/30/2017 5:29:40 AM ******/
 SET ANSI_NULLS ON
 GO
 SET QUOTED_IDENTIFIER ON
 GO
  
 ALTER PROCEDURE [dbo].[create_bpi_user_favorites]
 @Userid int,
 @Categoryid int,
 @Resourceid varchar(100),
 @Rating int,
 @Status tinyint,
 @Remarks varchar(100),
 @BPI_StatusCode int OUTPUT,
 @BPI_StatusText VARCHAR(30) OUTPUT
 AS
 BEGIN
 Declare @RowCount int
 DECLARE @ErrorMessage NVARCHAR(4000);  
     DECLARE @ErrorSeverity INT;  
     DECLARE @ErrorState INT;  
 
 	SET NOCOUNT ON;
 	BEGIN TRY
 	    
 		   set @RowCount= (select COUNT(*) from  [dbo].[bpi_user_favorites] where userid=@Userid and categoryid=@Categoryid)
 		   
 			IF(@RowCount>0) 
 				BEGIN
 					Update [dbo].[bpi_user_favorites] set resourceid=@Resourceid,rating=@Rating,savedon=GETDATE(),status=@Status,remarks=@Remarks where userid=@Userid and categoryid=@Categoryid;
 					set @BPI_StatusCode='0'
 					set @BPI_StatusText='Updated Successfully'
 				END
 			ELSE
 				 BEGIN
 					insert into [dbo].[bpi_user_favorites] (userid,categoryid,resourceid,rating,savedon,status,remarks) values (@Userid,@Categoryid,@Resourceid,@Rating,GETDATE(),@Status,@Remarks);
 					set @BPI_StatusCode='0'
 					set @BPI_StatusText='Inserted Successfully'
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
