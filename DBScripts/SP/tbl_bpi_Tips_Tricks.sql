USE [techportal_dev]
GO

/****** Object:  Table [dbo].[bpi_Tips_Tricks]    Script Date: 05/30/2017 19:01:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[bpi_Tips_Tricks](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userid] [int] NOT NULL,
	[categoryid] [int] NOT NULL,
	[tipstricks] [text] NULL,
	[submittedon] [datetime] NULL,
	[submittedBy] [int] NULL,
	[approved] [int] NULL,
	[approvedon] [datetime] NULL,
	[approvedby] [int] NULL,
	[remarks] [varchar](100) NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL,
	[Status] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[bpi_Tips_Tricks] ADD  DEFAULT ((0)) FOR [Status]
GO


