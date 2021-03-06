USE [TechPortal_Staging]
GO
/****** Object:  Table [dbo].[bpi_scac]    Script Date: 03/17/2017 16:01:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_scac](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ship_method_code] [varchar](50) NOT NULL,
	[freight_code] [varchar](50) NULL,
	[display] [varchar](50) NULL,
	[status] [tinyint] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[bpi_scac] ON
INSERT [dbo].[bpi_scac] ([id], [ship_method_code], [freight_code], [display], [status]) VALUES (1, N'000001_BEST_L_GND', N'BEST', N'Best-Truck', 1)
INSERT [dbo].[bpi_scac] ([id], [ship_method_code], [freight_code], [display], [status]) VALUES (2, N'000001_CUSTOMER P_L_GND', N'CUSTOMER PICK-UP', N'Customer Pick-up', 1)
INSERT [dbo].[bpi_scac] ([id], [ship_method_code], [freight_code], [display], [status]) VALUES (3, N'000001_UPS_P_1DA', N'UPS', N'UPS Next Day Air', 1)
INSERT [dbo].[bpi_scac] ([id], [ship_method_code], [freight_code], [display], [status]) VALUES (4, N'000001_UPS_P_2DA', N'UPS', N'UPS 2nd Day Air', 1)
INSERT [dbo].[bpi_scac] ([id], [ship_method_code], [freight_code], [display], [status]) VALUES (5, N'000001_UPS_P_2DM', N'UPS', N'UPS 2nd Day Air AM', 1)
INSERT [dbo].[bpi_scac] ([id], [ship_method_code], [freight_code], [display], [status]) VALUES (6, N'000001_UPS_P_3DS', N'UPS', N'UPS 3 Day Select', 1)
INSERT [dbo].[bpi_scac] ([id], [ship_method_code], [freight_code], [display], [status]) VALUES (7, N'000001_UPS_P_GND', N'UPS', N'UPS Ground', 1)
SET IDENTITY_INSERT [dbo].[bpi_scac] OFF
/****** Object:  Table [dbo].[bpi_role]    Script Date: 03/17/2017 16:01:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_role](
	[role_id] [int] IDENTITY(1,1) NOT NULL,
	[role_name] [varchar](100) NOT NULL,
	[role_desc] [varchar](500) NULL,
	[isActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [int] NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_bpi_role] PRIMARY KEY CLUSTERED 
(
	[role_id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[bpi_role] ON
INSERT [dbo].[bpi_role] ([role_id], [role_name], [role_desc], [isActive], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (1, N'StockOrder', N'Place Stock Order', 1, NULL, CAST(0x0000A739010472C7 AS DateTime), NULL, NULL)
INSERT [dbo].[bpi_role] ([role_id], [role_name], [role_desc], [isActive], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (2, N'EmergencyOrder', N'Place Emergency Order', 1, NULL, CAST(0x0000A739010472D5 AS DateTime), NULL, NULL)
INSERT [dbo].[bpi_role] ([role_id], [role_name], [role_desc], [isActive], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (3, N'DropShip', N'Drop Ship', 1, NULL, CAST(0x0000A739010472E3 AS DateTime), NULL, NULL)
INSERT [dbo].[bpi_role] ([role_id], [role_name], [role_desc], [isActive], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (4, N'StockCheck', N'Check Stock', 1, NULL, CAST(0x0000A739010472F1 AS DateTime), NULL, NULL)
INSERT [dbo].[bpi_role] ([role_id], [role_name], [role_desc], [isActive], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (5, N'ViewOrderStatus', N'View Order Status', 1, NULL, CAST(0x0000A739010472FF AS DateTime), NULL, NULL)
INSERT [dbo].[bpi_role] ([role_id], [role_name], [role_desc], [isActive], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (6, N'ViewPricesheets_5450', N'Raybestos Pricesheets', 1, NULL, CAST(0x0000A7390104730D AS DateTime), NULL, NULL)
INSERT [dbo].[bpi_role] ([role_id], [role_name], [role_desc], [isActive], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (7, N'ViewPricesheets_2480', N'Federated Pricesheets', 1, NULL, CAST(0x0000A7390104731B AS DateTime), NULL, NULL)
INSERT [dbo].[bpi_role] ([role_id], [role_name], [role_desc], [isActive], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (8, N'ViewPricesheets_300', N'Aimco Pricesheets', 1, NULL, CAST(0x0000A73901047329 AS DateTime), NULL, NULL)
SET IDENTITY_INSERT [dbo].[bpi_role] OFF
/****** Object:  Table [dbo].[bpi_customer]    Script Date: 03/17/2017 16:01:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_customer](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[account_number] [varchar](20) NOT NULL,
	[billto_site_id] [varchar](25) NULL,
	[shipto_site_id] [varchar](25) NULL,
	[status] [tinyint] NULL,
 CONSTRAINT [PK_bpi_customer] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[bpi_customer] ON
INSERT [dbo].[bpi_customer] ([id], [user_id], [account_number], [billto_site_id], [shipto_site_id], [status]) VALUES (1, 1, N'23612', N'20766', N'23612', 1)
INSERT [dbo].[bpi_customer] ([id], [user_id], [account_number], [billto_site_id], [shipto_site_id], [status]) VALUES (2, 2, N'23612', N'20766', N'23612', 1)
SET IDENTITY_INSERT [dbo].[bpi_customer] OFF
/****** Object:  Table [dbo].[bpi_country]    Script Date: 03/17/2017 16:01:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_country](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[country_name] [varchar](100) NOT NULL,
	[country_desc] [varchar](500) NULL,
	[active] [tinyint] NOT NULL,
 CONSTRAINT [PK_bpi_country] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[bpi_country] ON
INSERT [dbo].[bpi_country] ([id], [country_name], [country_desc], [active]) VALUES (1, N'US', N'USA', 1)
INSERT [dbo].[bpi_country] ([id], [country_name], [country_desc], [active]) VALUES (2, N'CA', N'CAN', 1)
SET IDENTITY_INSERT [dbo].[bpi_country] OFF
/****** Object:  Table [dbo].[bpi_user]    Script Date: 03/17/2017 16:01:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_user](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[confirmed] [tinyint] NOT NULL,
	[approved] [tinyint] NOT NULL,
	[status] [tinyint] NOT NULL,
	[email] [varchar](100) NOT NULL,
	[password] [varchar](32) NOT NULL,
	[firstname] [varchar](20) NOT NULL,
	[lastname] [varchar](20) NOT NULL,
	[phone1] [varchar](20) NULL,
	[phone2] [varchar](20) NULL,
	[address] [varchar](70) NULL,
	[city] [varchar](20) NULL,
	[state] [varchar](50) NULL,
	[country] [char](2) NULL,
	[lang] [varchar](5) NULL,
	[timezone] [varchar](6) NULL,
	[interest_in_communication] [tinyint] NOT NULL,
	[remarks] [varchar](1000) NULL,
	[firstaccess] [datetime] NOT NULL,
	[lastaccess] [datetime] NULL,
	[lastlogin] [datetime] NULL,
	[currentlogin] [datetime] NULL,
	[lastip] [varchar](15) NULL,
	[secret] [varchar](20) NULL,
	[picture] [tinyint] NULL,
	[url] [varchar](255) NULL,
	[description] [varchar](1000) NULL,
	[years_of_experience] [varchar](20) NULL,
	[area_of_speciality] [varchar](100) NULL,
	[bays_in_shop] [varchar](20) NULL,
	[brake_jobs_in_a_month] [varchar](20) NULL,
	[list_in_find_a_shop] [tinyint] NULL,
	[currently_using_raybestos_products] [tinyint] NULL,
	[mailformat] [tinyint] NULL,
	[maildisplay] [tinyint] NULL,
	[htmleditor] [tinyint] NULL,
	[autosubscribe] [tinyint] NULL,
	[timemodified] [datetime] NOT NULL,
	[nickname] [varchar](20) NULL,
	[keepShopPrivate] [tinyint] NOT NULL,
	[KeepEmployeePrivate] [tinyint] NOT NULL,
	[iscustomer] [tinyint] NOT NULL,
	[verificationlinksenttime] [datetime] NULL,
	[referedby] [varchar](20) NULL,
 CONSTRAINT [PK_bpi_user] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
 CONSTRAINT [unique_user] UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[bpi_user] ON
INSERT [dbo].[bpi_user] ([id], [confirmed], [approved], [status], [email], [password], [firstname], [lastname], [phone1], [phone2], [address], [city], [state], [country], [lang], [timezone], [interest_in_communication], [remarks], [firstaccess], [lastaccess], [lastlogin], [currentlogin], [lastip], [secret], [picture], [url], [description], [years_of_experience], [area_of_speciality], [bays_in_shop], [brake_jobs_in_a_month], [list_in_find_a_shop], [currently_using_raybestos_products], [mailformat], [maildisplay], [htmleditor], [autosubscribe], [timemodified], [nickname], [keepShopPrivate], [KeepEmployeePrivate], [iscustomer], [verificationlinksenttime], [referedby]) VALUES (1, 1, 1, 1, N'Crystal.Pace@brakepartsinc.com', N'bpi@1234', N'Crystal', N'Pace', N'+18003230354', N'+18153639000', N'4400 Prime Parkway', N'McHenry', N'IL', N'US', N'en', N'', 0, N'', CAST(0x0000A7390102F4B3 AS DateTime), NULL, NULL, NULL, N'', N'', NULL, N'', N'', N'', N'', N'', N'', NULL, 0, 0, 0, 0, 0, CAST(0x0000A7390102F4B3 AS DateTime), N'', 0, 0, 1, CAST(0x0000A73901044366 AS DateTime), N'')
INSERT [dbo].[bpi_user] ([id], [confirmed], [approved], [status], [email], [password], [firstname], [lastname], [phone1], [phone2], [address], [city], [state], [country], [lang], [timezone], [interest_in_communication], [remarks], [firstaccess], [lastaccess], [lastlogin], [currentlogin], [lastip], [secret], [picture], [url], [description], [years_of_experience], [area_of_speciality], [bays_in_shop], [brake_jobs_in_a_month], [list_in_find_a_shop], [currently_using_raybestos_products], [mailformat], [maildisplay], [htmleditor], [autosubscribe], [timemodified], [nickname], [keepShopPrivate], [KeepEmployeePrivate], [iscustomer], [verificationlinksenttime], [referedby]) VALUES (2, 1, 1, 1, N'Monir.Islam@Brakepartsinc.com', N'bpi@4321', N'Crystal', N'Pace', N'+18003230354', N'+18153639000', N'4400 Prime Parkway', N'McHenry', N'IL', N'US', N'en', N'', 0, N'', CAST(0x0000A7390102F4B3 AS DateTime), NULL, NULL, NULL, N'', N'', NULL, N'', N'', N'', N'', N'', N'', NULL, 0, 0, 0, 0, 0, CAST(0x0000A7390102F4B3 AS DateTime), N'', 0, 0, 1, CAST(0x0000A7390104439E AS DateTime), N'')
SET IDENTITY_INSERT [dbo].[bpi_user] OFF
/****** Object:  Table [dbo].[bpi_user_role_mapping]    Script Date: 03/17/2017 16:01:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bpi_user_role_mapping](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[role_id] [int] NOT NULL,
	[status] [int] NOT NULL,
 CONSTRAINT [PK_bpi_user_role_mapping] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[bpi_user_role_mapping] ON
INSERT [dbo].[bpi_user_role_mapping] ([id], [user_id], [role_id], [status]) VALUES (1, 1, 1, 1)
INSERT [dbo].[bpi_user_role_mapping] ([id], [user_id], [role_id], [status]) VALUES (2, 1, 2, 1)
INSERT [dbo].[bpi_user_role_mapping] ([id], [user_id], [role_id], [status]) VALUES (3, 1, 3, 1)
INSERT [dbo].[bpi_user_role_mapping] ([id], [user_id], [role_id], [status]) VALUES (4, 1, 4, 1)
INSERT [dbo].[bpi_user_role_mapping] ([id], [user_id], [role_id], [status]) VALUES (5, 1, 5, 1)
INSERT [dbo].[bpi_user_role_mapping] ([id], [user_id], [role_id], [status]) VALUES (6, 1, 6, 1)
INSERT [dbo].[bpi_user_role_mapping] ([id], [user_id], [role_id], [status]) VALUES (7, 1, 7, 1)
INSERT [dbo].[bpi_user_role_mapping] ([id], [user_id], [role_id], [status]) VALUES (8, 1, 8, 1)
INSERT [dbo].[bpi_user_role_mapping] ([id], [user_id], [role_id], [status]) VALUES (9, 2, 1, 1)
INSERT [dbo].[bpi_user_role_mapping] ([id], [user_id], [role_id], [status]) VALUES (10, 2, 2, 1)
INSERT [dbo].[bpi_user_role_mapping] ([id], [user_id], [role_id], [status]) VALUES (11, 2, 3, 1)
INSERT [dbo].[bpi_user_role_mapping] ([id], [user_id], [role_id], [status]) VALUES (12, 2, 4, 1)
INSERT [dbo].[bpi_user_role_mapping] ([id], [user_id], [role_id], [status]) VALUES (13, 2, 5, 1)
INSERT [dbo].[bpi_user_role_mapping] ([id], [user_id], [role_id], [status]) VALUES (14, 2, 6, 1)
INSERT [dbo].[bpi_user_role_mapping] ([id], [user_id], [role_id], [status]) VALUES (15, 2, 7, 1)
INSERT [dbo].[bpi_user_role_mapping] ([id], [user_id], [role_id], [status]) VALUES (16, 2, 8, 1)
SET IDENTITY_INSERT [dbo].[bpi_user_role_mapping] OFF
/****** Object:  Table [dbo].[bpi_state]    Script Date: 03/17/2017 16:01:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_state](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[country_id] [int] NOT NULL,
	[state_name] [varchar](100) NOT NULL,
	[state_desc] [varchar](500) NULL,
	[active] [tinyint] NOT NULL,
 CONSTRAINT [PK_state] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[bpi_state] ON
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (1, 1, N'AL', N'Alabama', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (2, 1, N'AK', N'Alaska', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (3, 1, N'AS', N'American Samoa', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (4, 1, N'AZ', N'Arizona', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (5, 1, N'AR', N'Arkansas', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (6, 1, N'AF', N'Armed Forces Africa', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (7, 1, N'AA', N'Armed Forces Americas', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (8, 1, N'AC', N'Armed Forces Canada', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (9, 1, N'AE', N'Armed Forces Europe', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (10, 1, N'AM', N'Armed Forces Middle East', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (11, 1, N'AP', N'Armed Forces Pacific', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (12, 1, N'CA', N'California', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (13, 1, N'CO', N'Colorado', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (14, 1, N'CT', N'Connecticut', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (15, 1, N'DE', N'Delaware', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (16, 1, N'DC', N'District of Columbia', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (17, 1, N'FM', N'Federated States Of Micronesia', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (18, 1, N'FL', N'Florida', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (19, 1, N'GA', N'Georgia', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (20, 1, N'GU', N'Guam', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (21, 1, N'HI', N'Hawaii', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (22, 1, N'ID', N'Idaho', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (23, 1, N'IL', N'Illinois', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (24, 1, N'IN', N'Indiana', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (25, 1, N'IA', N'Iowa', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (26, 1, N'KS', N'Kansas', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (27, 1, N'KY', N'Kentucky', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (28, 1, N'LA', N'Louisiana', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (29, 1, N'ME', N'Maine', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (30, 1, N'MH', N'Marshall Islands', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (31, 1, N'MD', N'Maryland', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (32, 1, N'MA', N'Massachusetts', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (33, 1, N'MI', N'Michigan', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (34, 1, N'MN', N'Minnesota', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (35, 1, N'MS', N'Mississippi', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (36, 1, N'MO', N'Missouri', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (37, 1, N'MT', N'Montana', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (38, 1, N'NE', N'Nebraska', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (39, 1, N'NV', N'Nevada', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (40, 1, N'NH', N'New Hampshire', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (41, 1, N'NJ', N'New Jersey', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (42, 1, N'NM', N'New Mexico', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (43, 1, N'NY', N'New York', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (44, 1, N'NC', N'North Carolina', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (45, 1, N'ND', N'North Dakota', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (46, 1, N'MP', N'Northern Mariana Islands', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (47, 1, N'OH', N'Ohio', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (48, 1, N'OK', N'Oklahoma', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (49, 1, N'OR', N'Oregon', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (50, 1, N'PW', N'Palau', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (51, 1, N'PA', N'Pennsylvania', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (52, 1, N'PR', N'Puerto Rico', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (53, 1, N'RI', N'Rhode Island', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (54, 1, N'SC', N'South Carolina', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (55, 1, N'SD', N'South Dakota', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (56, 1, N'TN', N'Tennessee', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (57, 1, N'TX', N'Texas', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (58, 1, N'UT', N'Utah', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (59, 1, N'VT', N'Vermont', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (60, 1, N'VI', N'Virgin Islands', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (61, 1, N'VA', N'Virginia', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (62, 1, N'WA', N'Washington', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (63, 1, N'WV', N'West Virginia', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (64, 1, N'WI', N'Wisconsin', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (65, 1, N'WY', N'Wyoming', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (66, 2, N'AB', N'Alberta', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (67, 2, N'BC', N'British Columbia', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (68, 2, N'MB', N'Manitoba', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (69, 2, N'NL', N'Newfoundland and Labrador', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (70, 2, N'NB', N'New Brunswick', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (71, 2, N'NS', N'Nova Scotia', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (72, 2, N'NT', N'Northwest Territories', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (73, 2, N'NU', N'Nunavut', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (74, 2, N'ON', N'Ontario', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (75, 2, N'PE', N'Prince Edward Island', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (76, 2, N'QC', N'Quebec', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (77, 2, N'SK', N'Saskatchewan', 1)
INSERT [dbo].[bpi_state] ([id], [country_id], [state_name], [state_desc], [active]) VALUES (78, 2, N'YT', N'Yukon Territory', 1)
SET IDENTITY_INSERT [dbo].[bpi_state] OFF
/****** Object:  Default [DF__bpi_count__count__0BC6C43E]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_country] ADD  DEFAULT ('') FOR [country_desc]
GO
/****** Object:  Default [DF__bpi_count__activ__0CBAE877]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_country] ADD  DEFAULT ((1)) FOR [active]
GO
/****** Object:  Default [DF_bpi_role_isActive]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_role] ADD  CONSTRAINT [DF_bpi_role_isActive]  DEFAULT ((1)) FOR [isActive]
GO
/****** Object:  Default [DF__bpi_role__Create__0EA330E9]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_role] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF__bpi_scac__status__0F975522]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_scac] ADD  DEFAULT ((0)) FOR [status]
GO
/****** Object:  Default [DF__bpi_state__state__108B795B]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_state] ADD  DEFAULT ('') FOR [state_desc]
GO
/****** Object:  Default [DF__bpi_state__activ__117F9D94]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_state] ADD  DEFAULT ((1)) FOR [active]
GO
/****** Object:  Default [DF__bpi_user__confir__787EE5A0]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [confirmed]
GO
/****** Object:  Default [DF__bpi_user__approv__797309D9]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [approved]
GO
/****** Object:  Default [DF__bpi_user__status__7A672E12]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((1)) FOR [status]
GO
/****** Object:  Default [DF__bpi_user__lang__7B5B524B]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ('en') FOR [lang]
GO
/****** Object:  Default [DF__bpi_user__timezo__7C4F7684]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ('+05:30') FOR [timezone]
GO
/****** Object:  Default [DF__bpi_user__intere__7D439ABD]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [interest_in_communication]
GO
/****** Object:  Default [DF__bpi_user__curren__7E37BEF6]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [currently_using_raybestos_products]
GO
/****** Object:  Default [DF__bpi_user__mailfo__7F2BE32F]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [mailformat]
GO
/****** Object:  Default [DF__bpi_user__maildi__00200768]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [maildisplay]
GO
/****** Object:  Default [DF__bpi_user__htmled__01142BA1]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [htmleditor]
GO
/****** Object:  Default [DF__bpi_user__autosu__02084FDA]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [autosubscribe]
GO
/****** Object:  Default [DF__bpi_user__timemo__02FC7413]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [timemodified]
GO
/****** Object:  Default [DF__bpi_user__keepSh__03F0984C]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [keepShopPrivate]
GO
/****** Object:  Default [DF__bpi_user__KeepEm__04E4BC85]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [KeepEmployeePrivate]
GO
/****** Object:  Default [DF__bpi_user__iscust__05D8E0BE]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [iscustomer]
GO
/****** Object:  Default [DF__bpi_user__verifi__06CD04F7]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT (getdate()) FOR [verificationlinksenttime]
GO
/****** Object:  Default [DF__bpi_user___user___10566F31]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user_role_mapping] ADD  DEFAULT ((0)) FOR [user_id]
GO
/****** Object:  Default [DF__bpi_user___role___114A936A]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user_role_mapping] ADD  DEFAULT ((0)) FOR [role_id]
GO
/****** Object:  Default [DF__bpi_user___statu__123EB7A3]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user_role_mapping] ADD  DEFAULT ((1)) FOR [status]
GO
/****** Object:  ForeignKey [FK_bpi_state_bpi_country]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_state]  WITH CHECK ADD  CONSTRAINT [FK_bpi_state_bpi_country] FOREIGN KEY([country_id])
REFERENCES [dbo].[bpi_country] ([id])
GO
ALTER TABLE [dbo].[bpi_state] CHECK CONSTRAINT [FK_bpi_state_bpi_country]
GO
/****** Object:  ForeignKey [FK_bpi_user_role_mapping_bpi_user]    Script Date: 03/17/2017 16:01:20 ******/
ALTER TABLE [dbo].[bpi_user_role_mapping]  WITH CHECK ADD  CONSTRAINT [FK_bpi_user_role_mapping_bpi_user] FOREIGN KEY([user_id])
REFERENCES [dbo].[bpi_user] ([id])
GO
ALTER TABLE [dbo].[bpi_user_role_mapping] CHECK CONSTRAINT [FK_bpi_user_role_mapping_bpi_user]
GO
