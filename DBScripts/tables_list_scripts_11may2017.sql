USE [TechPortal_DEV]
GO
/****** Object:  Table [dbo].[bpi_category]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_category](
	[Category_id] [int] IDENTITY(1,1) NOT NULL,
	[Catagory_name] [varchar](30) NOT NULL,
	[startdate] [datetime] NOT NULL,
	[enddate] [datetime] NOT NULL,
	[status] [tinyint] NULL,
 CONSTRAINT [PK_bpi_category] PRIMARY KEY CLUSTERED 
(
	[Category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bpi_country]    Script Date: 5/11/2017 2:23:08 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bpi_customer]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_customer](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[account_number] [varchar](1000) NOT NULL,
	[billto_site_id] [varchar](25) NULL,
	[shipto_site_id] [varchar](25) NULL,
	[status] [tinyint] NULL,
 CONSTRAINT [PK_bpi_customer] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bpi_job_user_mapping]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_job_user_mapping](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userid] [int] NOT NULL,
	[jobcategoryid] [int] NOT NULL,
	[status] [tinyint] NOT NULL,
	[remarks] [varchar](1000) NULL,
 CONSTRAINT [PK_bpi_job_user_mapping] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bpi_jobcategory]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_jobcategory](
	[jobcategoryid] [int] IDENTITY(1,1) NOT NULL,
	[JobTitle] [varchar](50) NOT NULL,
	[JobDescription] [varchar](100) NULL,
	[startdate] [date] NOT NULL,
	[endate] [date] NOT NULL,
	[status] [tinyint] NOT NULL,
	[remarks] [varchar](1000) NULL,
 CONSTRAINT [PK_bpi_jobcategory] PRIMARY KEY CLUSTERED 
(
	[jobcategoryid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bpi_organization]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_organization](
	[orgid] [int] IDENTITY(1,1) NOT NULL,
	[orgname] [varchar](50) NOT NULL,
	[phone1] [varchar](20) NULL,
	[phone2] [varchar](20) NULL,
	[email] [varchar](100) NOT NULL,
	[website] [varchar](255) NULL,
	[lang] [varchar](5) NULL,
	[confirmed] [tinyint] NOT NULL,
	[approved] [tinyint] NOT NULL,
	[isdistributor] [tinyint] NOT NULL,
	[status] [tinyint] NOT NULL,
	[remarks] [varchar](1000) NULL,
 CONSTRAINT [PK_bpi_organization] PRIMARY KEY CLUSTERED 
(
	[orgid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bpi_organization_address]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_organization_address](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[address] [varchar](70) NULL,
	[city] [varchar](20) NULL,
	[country] [char](2) NULL,
	[zipcode] [varchar](20) NULL,
	[latitude] [float] NULL,
	[longitude] [float] NULL,
	[status] [tinyint] NOT NULL,
	[remarks] [varchar](1000) NULL,
	[state] [varchar](20) NULL,
 CONSTRAINT [PK_bpi_organization_address] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bpi_organization_address_mapping]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_organization_address_mapping](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[addressid] [int] NOT NULL,
	[organizationid] [int] NOT NULL,
	[status] [tinyint] NOT NULL,
	[remarks] [varchar](1000) NULL,
 CONSTRAINT [PK_bpi_organization_address_mapping] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bpi_role]    Script Date: 5/11/2017 2:23:08 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bpi_scac]    Script Date: 5/11/2017 2:23:08 AM ******/
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

/****** Object:  Table [dbo].[bpi_state]    Script Date: 5/11/2017 2:23:08 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bpi_user]    Script Date: 5/11/2017 2:23:08 AM ******/
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
	[country] [char](2) NULL,
	[lang] [varchar](5) NULL,
	[remarks] [varchar](1000) NULL,
	[interest_in_communication] [tinyint] NOT NULL,
	[timezone] [varchar](6) NOT NULL,
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
	[mailformat] [tinyint] NOT NULL,
	[maildisplay] [tinyint] NOT NULL,
	[htmleditor] [tinyint] NOT NULL,
	[autosubscribe] [tinyint] NOT NULL,
	[timemodified] [datetime] NOT NULL,
	[nickname] [varchar](20) NULL,
	[keepShopPrivate] [tinyint] NOT NULL,
	[KeepEmployeePrivate] [tinyint] NOT NULL,
	[iscustomer] [tinyint] NOT NULL,
	[verificationlinksenttime] [datetime] NOT NULL,
	[referedby] [varchar](20) NULL,
	[state] [varchar](50) NULL,
 CONSTRAINT [PK_bpi_user] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bpi_user_dashboard_Preference]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_user_dashboard_Preference](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NOT NULL,
	[categoryID] [int] NOT NULL,
	[sortorder] [int] NOT NULL,
	[savedon] [datetime] NOT NULL,
	[remarks] [varchar](100) NULL,
 CONSTRAINT [PK_bpi_user_dashboard_Preference] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bpi_user_favorites]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_user_favorites](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userid] [int] NOT NULL,
	[categoryid] [int] NOT NULL,
	[resourceid] [varchar](100) NOT NULL,
	[rating] [int] NULL,
	[savedon] [datetime] NOT NULL,
	[status] [tinyint] NOT NULL,
	[remarks] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bpi_user_organization_mapping]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_user_organization_mapping](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userid] [int] NOT NULL,
	[orgid] [int] NOT NULL,
	[status] [tinyint] NOT NULL,
	[remarks] [varchar](1000) NULL,
 CONSTRAINT [PK_bpi_user_organization_mapping] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bpi_user_resetpassword]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_user_resetpassword](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userid] [int] NOT NULL,
	[resetLinkCode] [varchar](20) NOT NULL,
	[resetLinkSentTime] [datetime] NOT NULL,
	[status] [tinyint] NOT NULL,
	[Remarks] [varchar](1000) NULL,
 CONSTRAINT [PK_bpi_user_resetpassword] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[bpi_user_role_mapping]    Script Date: 5/11/2017 2:23:08 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[bpi_user_video_view]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[bpi_user_video_view](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NOT NULL,
	[resourceID] [varchar](100) NOT NULL,
	[percentageviewed] [int] NOT NULL,
	[viewedon] [datetime] NOT NULL,
	[status] [tinyint] NOT NULL,
	[remarks] [varchar](100) NULL,
 CONSTRAINT [PK_bpi_user_video_view] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Crystal_External]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Crystal_External](
	[div_ship_no] [nvarchar](255) NULL,
	[user_id] [nvarchar](255) NULL,
	[user_login_id] [nvarchar](255) NULL,
	[ldap_grp_name] [nvarchar](255) NULL,
	[display_name] [nvarchar](255) NULL,
	[div_bill_no] [nvarchar](255) NULL,
	[div_ship_no1] [nvarchar](255) NULL,
	[Bill Customer] [nvarchar](255) NULL,
	[Ship Customer] [nvarchar](255) NULL,
	[count] [nvarchar](255) NULL
) ON [PRIMARY]

GO




/****** Object:  Index [unique_org]    Script Date: 5/11/2017 2:23:08 AM ******/
ALTER TABLE [dbo].[bpi_organization] ADD  CONSTRAINT [unique_org] UNIQUE NONCLUSTERED 
(
	[orgname] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [unique_user]    Script Date: 5/11/2017 2:23:08 AM ******/
ALTER TABLE [dbo].[bpi_user] ADD  CONSTRAINT [unique_user] UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[bpi_category] ADD  DEFAULT (getdate()) FOR [startdate]
GO
ALTER TABLE [dbo].[bpi_category] ADD  DEFAULT (getdate()) FOR [enddate]
GO
ALTER TABLE [dbo].[bpi_category] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[bpi_country] ADD  DEFAULT ('') FOR [country_desc]
GO
ALTER TABLE [dbo].[bpi_country] ADD  DEFAULT ((1)) FOR [active]
GO
ALTER TABLE [dbo].[bpi_customer] ADD  DEFAULT ((0)) FOR [user_id]
GO
ALTER TABLE [dbo].[bpi_customer] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[bpi_job_user_mapping] ADD  DEFAULT ((0)) FOR [userid]
GO
ALTER TABLE [dbo].[bpi_job_user_mapping] ADD  DEFAULT ((0)) FOR [jobcategoryid]
GO
ALTER TABLE [dbo].[bpi_job_user_mapping] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[bpi_jobcategory] ADD  DEFAULT ((0)) FOR [JobTitle]
GO
ALTER TABLE [dbo].[bpi_jobcategory] ADD  DEFAULT (getdate()) FOR [startdate]
GO
ALTER TABLE [dbo].[bpi_jobcategory] ADD  DEFAULT (getdate()) FOR [endate]
GO
ALTER TABLE [dbo].[bpi_jobcategory] ADD  DEFAULT ((0)) FOR [status]
GO
ALTER TABLE [dbo].[bpi_organization] ADD  DEFAULT ((0)) FOR [orgname]
GO
ALTER TABLE [dbo].[bpi_organization] ADD  DEFAULT ('en') FOR [lang]
GO
ALTER TABLE [dbo].[bpi_organization] ADD  DEFAULT ((0)) FOR [confirmed]
GO
ALTER TABLE [dbo].[bpi_organization] ADD  DEFAULT ((0)) FOR [approved]
GO
ALTER TABLE [dbo].[bpi_organization] ADD  DEFAULT ((0)) FOR [isdistributor]
GO
ALTER TABLE [dbo].[bpi_organization] ADD  DEFAULT ((0)) FOR [status]
GO
ALTER TABLE [dbo].[bpi_organization_address] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[bpi_organization_address_mapping] ADD  DEFAULT ((0)) FOR [addressid]
GO
ALTER TABLE [dbo].[bpi_organization_address_mapping] ADD  DEFAULT ((0)) FOR [organizationid]
GO
ALTER TABLE [dbo].[bpi_organization_address_mapping] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[bpi_role] ADD  CONSTRAINT [DF_bpi_role_isActive]  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[bpi_scac] ADD  DEFAULT ((0)) FOR [status]
GO
ALTER TABLE [dbo].[bpi_state] ADD  DEFAULT ('') FOR [state_desc]
GO
ALTER TABLE [dbo].[bpi_state] ADD  DEFAULT ((1)) FOR [active]
GO
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [confirmed]
GO
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [approved]
GO
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ('en') FOR [lang]
GO
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [interest_in_communication]
GO
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ('+05:30') FOR [timezone]
GO
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [currently_using_raybestos_products]
GO
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [mailformat]
GO
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [maildisplay]
GO
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [htmleditor]
GO
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [autosubscribe]
GO
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [timemodified]
GO
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [keepShopPrivate]
GO
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [KeepEmployeePrivate]
GO
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT ((0)) FOR [iscustomer]
GO
ALTER TABLE [dbo].[bpi_user] ADD  DEFAULT (getdate()) FOR [verificationlinksenttime]
GO
ALTER TABLE [dbo].[bpi_user_dashboard_Preference] ADD  DEFAULT ((0)) FOR [userID]
GO
ALTER TABLE [dbo].[bpi_user_dashboard_Preference] ADD  DEFAULT (getdate()) FOR [savedon]
GO
ALTER TABLE [dbo].[bpi_user_favorites] ADD  DEFAULT ((0)) FOR [userid]
GO
ALTER TABLE [dbo].[bpi_user_favorites] ADD  DEFAULT (getdate()) FOR [savedon]
GO
ALTER TABLE [dbo].[bpi_user_favorites] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[bpi_user_organization_mapping] ADD  DEFAULT ((0)) FOR [userid]
GO
ALTER TABLE [dbo].[bpi_user_organization_mapping] ADD  DEFAULT ((0)) FOR [orgid]
GO
ALTER TABLE [dbo].[bpi_user_organization_mapping] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[bpi_user_resetpassword] ADD  DEFAULT ((0)) FOR [userid]
GO
ALTER TABLE [dbo].[bpi_user_resetpassword] ADD  DEFAULT (getdate()) FOR [resetLinkSentTime]
GO
ALTER TABLE [dbo].[bpi_user_resetpassword] ADD  DEFAULT ((0)) FOR [status]
GO
ALTER TABLE [dbo].[bpi_user_role_mapping] ADD  DEFAULT ((0)) FOR [user_id]
GO
ALTER TABLE [dbo].[bpi_user_role_mapping] ADD  DEFAULT ((0)) FOR [role_id]
GO
ALTER TABLE [dbo].[bpi_user_role_mapping] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[bpi_user_video_view] ADD  DEFAULT ((0)) FOR [userID]
GO
ALTER TABLE [dbo].[bpi_user_video_view] ADD  DEFAULT (getdate()) FOR [viewedon]
GO
ALTER TABLE [dbo].[bpi_user_video_view] ADD  DEFAULT ('1') FOR [status]
GO
ALTER TABLE [dbo].[bpi_customer]  WITH CHECK ADD  CONSTRAINT [FK_bpi_customer_bpi_user] FOREIGN KEY([user_id])
REFERENCES [dbo].[bpi_user] ([id])
GO
ALTER TABLE [dbo].[bpi_customer] CHECK CONSTRAINT [FK_bpi_customer_bpi_user]
GO
ALTER TABLE [dbo].[bpi_state]  WITH CHECK ADD  CONSTRAINT [FK_bpi_state_bpi_country] FOREIGN KEY([country_id])
REFERENCES [dbo].[bpi_country] ([id])
GO
ALTER TABLE [dbo].[bpi_state] CHECK CONSTRAINT [FK_bpi_state_bpi_country]
GO
ALTER TABLE [dbo].[bpi_user_role_mapping]  WITH CHECK ADD  CONSTRAINT [FK_bpi_user_role_mapping_bpi_role] FOREIGN KEY([role_id])
REFERENCES [dbo].[bpi_role] ([role_id])
GO
ALTER TABLE [dbo].[bpi_user_role_mapping] CHECK CONSTRAINT [FK_bpi_user_role_mapping_bpi_role]
GO
ALTER TABLE [dbo].[bpi_user_role_mapping]  WITH CHECK ADD  CONSTRAINT [FK_bpi_user_role_mapping_bpi_user] FOREIGN KEY([user_id])
REFERENCES [dbo].[bpi_user] ([id])
GO
ALTER TABLE [dbo].[bpi_user_role_mapping] CHECK CONSTRAINT [FK_bpi_user_role_mapping_bpi_user]
GO
