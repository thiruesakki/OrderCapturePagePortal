USE [Test_TechPortal]
GO
/****** Object:  StoredProcedure [dbo].[create_bpi_chevytruckpromo_businessrecord]    Script Date: 14-03-2018 16:51:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Author,,Name>
-- Create date: <Create Date,,>
-- Description: <Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[create_bpi_chevytruckpromo_businessrecord] 
-- Add the parameters for the stored procedure here
    @BPI_StatusCode int OUTPUT,
    @BPI_StatusText VARCHAR(1000) OUTPUT,
    @PromoID varchar(100),
    @PromoName varchar(1000),
    @FirstName varchar(50),
    @LastName varchar(50),
    @Email varchar(100),
    @BusinessName varchar(1000),
    @OwnersName varchar(100),
    @Address1 varchar(1000),
    @Address2 varchar(1000),
    @City varchar(50),
    @State varchar(50),
    @Zipcode varchar(20),
    @Country varchar(50),
    @PhoneNumber varchar(20),
    @Website varchar(1000),
	@HomeAddress1 varchar(1000),
	@HomeAddress2 varchar(1000),
	@HomeCity varchar(50),
	@HomeState varchar(50),
	@HomeZipCode varchar(20),
	@HomeCountry varchar(50),
	@HomePhoneNo varchar(20),
    @ReceiveCommunication tinyint,  
    @Jobtitle varchar(100),
    @Remarks varchar(1000),  
    @UniqueCode varchar(10),
    @Points int 
AS
BEGIN
-- SET NOCOUNT ON added to prevent extra result sets from
-- interfering with SELECT statements.
SET NOCOUNT ON;

    DECLARE @DayEntryCheck int;
    DECLARE @UniqueCodeCheck int;
    DECLARE @UniqueCodeStatus int;    
    DECLARE @UniqueCodeId int;
    DECLARE @CurrentId int;
	DECLARE @CurrDate date;

	SET @CurrDate=(select CONVERT (date,GETDATE()));
    
    SET @DayEntryCheck = (select COUNT(*) from  dbo.bpi_chevytruckpromodetails where Email=@Email and convert(date, SubmittedOn)= @CurrDate);     
    
    IF(@DayEntryCheck > 0) 
    BEGIN
set @BPI_StatusCode= 1
set @BPI_StatusText='Already entered today'
END
ELSE
    BEGIN
        IF(@UniqueCode ! = '')
            BEGIN
                SET @UniqueCodeCheck = (select COUNT(*) from dbo.bpi_chevytruckpromocodes where chevytruck_unique_code=@UniqueCode);                
                IF(@UniqueCodeCheck > 0)                     
                    BEGIN
                        SET @UniqueCodeStatus = (select status from dbo.bpi_chevytruckpromocodes where chevytruck_unique_code=@UniqueCode);                         
                        IF(@UniqueCodeStatus = 0)
                            BEGIN
                                SET @UniqueCodeId = (select id from dbo.bpi_chevytruckpromocodes where chevytruck_unique_code=@UniqueCode);
                            END
                        ELSE
                        BEGIN
                            set @BPI_StatusCode= 2
                            set @BPI_StatusText='Sweepstakes code already used'
                            RETURN
                        END                     
                    END
                ELSE
                   BEGIN
                       set @BPI_StatusCode= 3
                       set @BPI_StatusText='Sweepstakes code invalid'
                       RETURN
                   END                  
            END         
        
        INSERT INTO [dbo].[bpi_chevytruckpromodetails]
           ([PromoID]
           ,[PromoName]
           ,[FirstName]
           ,[LastName]
           ,[Email]
           ,[BusinessName]
           ,[OwnersName]
           ,[Address1]
           ,[Address2]
           ,[City]
           ,[State]
           ,[Zipcode]
           ,[Country]
           ,[PhoneNumber]
           ,[Website]
           ,[Home_Address1]
           ,[Home_Address2]
		   ,[Home_City]
           ,[Home_State]
           ,[Home_Zipcode]
           ,[Home_Country]
           ,[Home_PhoneNumber]
           ,[ReceiveFutureCommunications]
           ,[SubmittedOn]
           ,[Jobtitle]
           ,[Remarks]
           ,[Points]
   )
     VALUES
           (@PromoID,
            @PromoName,
            @FirstName,
            @LastName, 
            @Email,
            @BusinessName,
            @OwnersName,
            @Address1,
            @Address2,
            @City,
            @State,
            @Zipcode,
            @Country,
            @PhoneNumber,
            @Website,
			@HomeAddress1,
			@HomeAddress2,
			@HomeCity,
			@HomeState,
			@HomeZipCode,
			@HomeCountry,
			@HomePhoneNo,
            @ReceiveCommunication,
            @CurrDate,
            @Jobtitle,
            @Remarks, 
            @Points
    )     
	IF(@UniqueCodeId != '')
        BEGIN
            UPDATE [dbo].[bpi_chevytruckpromocodes]
                SET
            status = 1,usedby = @UniqueCodeId
                WHERE
            id = @UniqueCodeId
            set @BPI_StatusCode= 0
            set @BPI_StatusText='Successful entry with special sweepstakes code'
        END
    set @BPI_StatusCode= 0
    set @BPI_StatusText='Successful entry'
    END           
END


GO
/****** Object:  Table [dbo].[bpi_chevytruckpromocodes]    Script Date: 14-03-2018 16:51:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_chevytruckpromocodes](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[chevytruck_unique_code] [varchar](10) NOT NULL,
	[status] [int] NOT NULL,
	[usedby] [int] NULL,
	[remarks] [varchar](1000) NULL,
 CONSTRAINT [PK_bpi_chevytruckpromocodes] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[chevytruck_unique_code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bpi_chevytruckpromodetails]    Script Date: 14-03-2018 16:51:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_chevytruckpromodetails](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[PromoID] [varchar](100) NOT NULL,
	[PromoName] [varchar](1000) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[BusinessName] [varchar](1000) NOT NULL,
	[OwnersName] [varchar](100) NOT NULL,
	[Address1] [varchar](1000) NOT NULL,
	[Address2] [varchar](1000) NULL,
	[City] [varchar](50) NOT NULL,
	[State] [varchar](50) NOT NULL,
	[Zipcode] [varchar](20) NOT NULL,
	[Country] [varchar](50) NOT NULL,
	[PhoneNumber] [varchar](20) NOT NULL,
	[Website] [varchar](1000) NOT NULL,
	[Home_Address1] [varchar](1000) NULL,
	[Home_Address2] [varchar](1000) NULL,
	[Home_City] [varchar](50) NULL,
	[Home_State] [varchar](50) NULL,
	[Home_Zipcode] [varchar](20) NULL,
	[Home_Country] [varchar](50) NULL,
	[Home_PhoneNumber] [varchar](20) NULL,
	[ReceiveFutureCommunications] [tinyint] NOT NULL,
	[SubmittedOn] [datetime] NOT NULL,
	[Jobtitle] [varchar](100) NOT NULL,
	[Remarks] [varchar](1000) NOT NULL,
	[Points] [int] NULL,
 CONSTRAINT [PK_bpi_chevytruckpromodetails] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[bpi_chevytruckpromocodes]  WITH CHECK ADD  CONSTRAINT [FK_bpi_chevytruckpromocodes_bpi_chevytruckpromodetails] FOREIGN KEY([usedby])
REFERENCES [dbo].[bpi_chevytruckpromodetails] ([id])
GO
ALTER TABLE [dbo].[bpi_chevytruckpromocodes] CHECK CONSTRAINT [FK_bpi_chevytruckpromocodes_bpi_chevytruckpromodetails]
GO