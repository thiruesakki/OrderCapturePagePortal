USE [techportal_dev]
GO
 
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[bpi_user_favorites_place](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userid] [int] NOT NULL,
	[favoriteplace] [varchar](200) NULL,
	[status] [tinyint] NULL,
	[remarks] [varchar](100) NULL
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[bpi_user_favorites_place] ADD  DEFAULT ((1)) FOR [status]
GO


