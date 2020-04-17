USE [techportal_dev]
GO
 
/****** Object:  StoredProcedure [dbo].[create_bpi_Tips_Tricks]    Script Date: 5/30/2017 7:33:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[create_bpi_Tips_Tricks] 
@BPI_StatusCode int OUTPUT,
@BPI_StatusText VARCHAR(30) OUTPUT ,
@Userid int,
@Categoryid int,
@Tipstricks text,
@Submitteddon datetime,
@SubmittedBy int,
@Approvedon datetime,
@Approvedby int,
@Remarks varchar(100)
AS
BEGIN
Declare @RowCount int; 
DECLARE @ErrorMessage NVARCHAR(4000);  
DECLARE @ErrorSeverity INT;  
DECLARE @ErrorState INT; 
SET NOCOUNT ON;
	BEGIN TRY
	   set @RowCount= (select COUNT(*) from  [dbo].[bpi_Tips_Tricks] where userid=@Userid and categoryid=@Categoryid)
	   IF(@RowCount<1) 
			BEGIN
				insert into [dbo].[bpi_Tips_Tricks] (userid,categoryid,tipstricks,submittedon,submittedBy,approvedon,approvedby,remarks,CreatedBy,CreatedDate,Status) values (@Userid,@Categoryid,@Tipstricks,@Submitteddon,@SubmittedBy,@Approvedon,@Approvedby,@Remarks,@Userid,GETDATE(),1);
				set @BPI_StatusCode='0'
				set @BPI_StatusText='Inserted Successfully'
			END
		IF(@RowCount>0) 
			BEGIN
				set @BPI_StatusCode='1'
				set @BPI_StatusText='Tips Already Inserted'
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
