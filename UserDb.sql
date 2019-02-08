USE [master]
GO
/****** Object:  Database [UserDb]    Script Date: 2/8/2019 6:14:04 PM ******/
CREATE DATABASE [UserDb]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'UserDb', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\UserDb.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'UserDb_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\UserDb_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [UserDb] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [UserDb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [UserDb] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [UserDb] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [UserDb] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [UserDb] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [UserDb] SET ARITHABORT OFF 
GO
ALTER DATABASE [UserDb] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [UserDb] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [UserDb] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [UserDb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [UserDb] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [UserDb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [UserDb] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [UserDb] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [UserDb] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [UserDb] SET  DISABLE_BROKER 
GO
ALTER DATABASE [UserDb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [UserDb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [UserDb] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [UserDb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [UserDb] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [UserDb] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [UserDb] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [UserDb] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [UserDb] SET  MULTI_USER 
GO
ALTER DATABASE [UserDb] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [UserDb] SET DB_CHAINING OFF 
GO
ALTER DATABASE [UserDb] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [UserDb] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [UserDb] SET DELAYED_DURABILITY = DISABLED 
GO
USE [UserDb]
GO
/****** Object:  Schema [Users]    Script Date: 2/8/2019 6:14:06 PM ******/
CREATE SCHEMA [Users]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 2/8/2019 6:14:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](15) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[User_role]    Script Date: 2/8/2019 6:14:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User_role](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Userid] [int] NOT NULL,
	[Roleid] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UserRegistrationDetail_Tbl]    Script Date: 2/8/2019 6:14:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRegistrationDetail_Tbl](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](50) NOT NULL,
	[PhoneNumber] [nvarchar](50) NOT NULL,
	[CompanySize] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Users]    Script Date: 2/8/2019 6:14:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](100) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[CompanySize] [int] NOT NULL,
	[Role] [nvarchar](10) NOT NULL,
	[resetToken] [nvarchar](30) NULL,
	[status] [nvarchar](30) NULL,
 CONSTRAINT [PK__Users__3214EC0797FC0AFA] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [Users].[flyway_schema_history]    Script Date: 2/8/2019 6:14:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Users].[flyway_schema_history](
	[installed_rank] [int] NOT NULL,
	[version] [nvarchar](50) NULL,
	[description] [nvarchar](200) NULL,
	[type] [nvarchar](20) NOT NULL,
	[script] [nvarchar](1000) NOT NULL,
	[checksum] [int] NULL,
	[installed_by] [nvarchar](100) NOT NULL,
	[installed_on] [datetime] NOT NULL DEFAULT (getdate()),
	[execution_time] [int] NOT NULL,
	[success] [bit] NOT NULL,
 CONSTRAINT [flyway_schema_history_pk] PRIMARY KEY CLUSTERED 
(
	[installed_rank] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Index [flyway_schema_history_s_idx]    Script Date: 2/8/2019 6:14:07 PM ******/
CREATE NONCLUSTERED INDEX [flyway_schema_history_s_idx] ON [Users].[flyway_schema_history]
(
	[success] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[User_role]  WITH CHECK ADD FOREIGN KEY([Roleid])
REFERENCES [dbo].[Roles] ([id])
GO
ALTER TABLE [dbo].[User_role]  WITH CHECK ADD  CONSTRAINT [FK__User_role__Useri__37703C52] FOREIGN KEY([Userid])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[User_role] CHECK CONSTRAINT [FK__User_role__Useri__37703C52]
GO
/****** Object:  StoredProcedure [dbo].[usp_Create_User]    Script Date: 2/8/2019 6:14:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_Create_User]
	   @UserID int = NULL OUTPUT,
	   @FirstName nvarchar(50),
	   @LastName nvarchar(50),
	   @Email nvarchar(50),
	   @Password nvarchar(50),
	   @PhoneNumber nvarchar(50),
	   @CompanySize int
	 
AS
BEGIN
INSERT INTO UserRegistrationDetail_Tbl(
	   [FirstName],
	   [LastName],
	   [Email],
	   [password],
	   [PhoneNumber],
	   [CompanySize]
	   )
    VALUES (
	   @FirstName,
	   @LastName,
	   @Email,
	   @Password,
	   @PhoneNumber,
	   @CompanySize
	   )
 
SET @UserID = SCOPE_IDENTITY()
 
SELECT 
	   FirstName = @FirstName,
	   Email =@Email
FROM UserRegistrationDetail_Tbl
WHERE UserID= @UserID
END

GO
/****** Object:  StoredProcedure [dbo].[usp_Find_A_Merchant_With_Id ]    Script Date: 2/8/2019 6:14:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_Find_A_Merchant_With_Id ]
    (
        @MerchantId int
    )
AS
    SET NOCOUNT ON
    SELECT * FROM [dbo].[Merchant] WHERE MerchantId = @MerchantId

    RETURN @@Error
GO
/****** Object:  StoredProcedure [dbo].[uspCreateUser]    Script Date: 2/8/2019 6:14:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[uspCreateUser]
@FirstName nVARCHAR(50),
@LastName nVARCHAR(50),
@Email nVARCHAR(50),
@Password nVARCHAR(100),
@PhoneNumber VARCHAR(20),
@CompanySize int
AS
Set NOCOUNT ON
BEGIN TRANSACTION
DECLARE @id int

SELECT @id = 0
--CHECK IF EXIST

SELECT @id = UserID from Users where Email = @Email
--if yes, update, else start
if(@id > 0)
UPDATE Users
 set 
 FirstName = @FirstName, 
 LastName = @LastName, 
 [Password]=@Password, 
 PhoneNumber=@PhoneNumber, 
 CompanySize=@CompanySize where UserId = @id
ELSE
BEGIN
INSERT INTO Users (FirstName, LastName, Email, [Password], PhoneNumber, CompanySize)
 Values 
 (@FirstName, @LastName, @Email, @Password, @PhoneNumber, @CompanySize)
END
COMMIT

GO
/****** Object:  StoredProcedure [dbo].[uspCreateUser1]    Script Date: 2/8/2019 6:14:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[uspCreateUser1]
@FirstName nVARCHAR(50),
@LastName nVARCHAR(50),
@Email nVARCHAR(50),
@Password nVARCHAR(100),
@PhoneNumber VARCHAR(20),
@CompanySize int,
@name nVarchar(15),
@Role nVarchar(10)
AS
BEGIN TRANSACTION
DECLARE @id int = NULL
DECLARE @UserId int = NULL
DECLARE @RoleId int =NULL

BEGIN 
	INSERT INTO Users (FirstName, LastName, Email, PhoneNumber, CompanySize, [role]) Values (@FirstName, @LastName, @Email,@PhoneNumber, @CompanySize,@role)
	INSERT INTO Roles(name) Values(@name)
END
BEGIN
	SELECT @id = UserID from Users where Email = @Email
	SELECT @Id = id from  roles where name = @name
if(@id > 0)
	UPDATE Users set FirstName = @FirstName, LastName = @LastName, Email = @Email, PhoneNumber=@PhoneNumber, CompanySize=@CompanySize, [role]=@role where UserId = @id
ELSE
	INSERT INTO User_role (UserId, RoleId) Values (@UserId, @RoleId)
	select @id = SCOPE_IDENTITY()
END
GO
/****** Object:  StoredProcedure [dbo].[uspCreateUser2]    Script Date: 2/8/2019 6:14:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[uspCreateUser2]
@FirstName nVARCHAR(50),
@LastName nVARCHAR(50),
@Email nVARCHAR(50),
@Password nVARCHAR(100),
@CompanySize int,
--@name nVarchar(15),
@Role nVarchar(10)
AS
BEGIN TRANSACTION
DECLARE @id int = NULL
DECLARE @UserId int = NULL
DECLARE @RoleId int =NULL

BEGIN 
	--select @RoleId = id from roles where name = 'USER_ROLE'
	select @id = UserId from Users where email = @email
	if (@id > 0)
	begin 
	UPDATE Users set FirstName = @FirstName, LastName = @LastName, [Password]=@password, CompanySize=@CompanySize where UserId = @id
	end
	Else
	begin
	insert into users(Firstname, LastName, Email,[Password], companysize, [role] ) Values (@firstname, @lastname, @email,@Password, @companysize, @role)
	Select @UserId=SCOPE_IDENTITY()
	--insert into User_role (Userid, Roleid) values (@UserId, @RoleId)
	end
	END
commit
GO
/****** Object:  StoredProcedure [dbo].[uspDisableUser]    Script Date: 2/8/2019 6:14:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[uspDisableUser]
@Email nVARCHAR(50),
@Status nvarchar(30)

AS
Set NOCOUNT ON
DECLARE @id int
UPDATE[dbo].Users
SET 
[Status]=N'ACTIVE'
WHERE   UserId =@id AND Email=@Email
SELECT @Id = SCOPE_IDENTITY()

GO
/****** Object:  StoredProcedure [dbo].[uspFindAllUser]    Script Date: 2/8/2019 6:14:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[uspFindAllUser]
AS
    SET NOCOUNT ON
    SELECT * FROM [dbo].[Users]
	
	RETURN @@Error

GO
/****** Object:  StoredProcedure [dbo].[uspFindUser]    Script Date: 2/8/2019 6:14:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[uspFindUser]
    (
        @Email nvarchar(50)
    )
AS
    SET NOCOUNT ON
    SELECT * FROM [dbo].[Users] WHERE Email = @Email

    RETURN @@Error

GO
/****** Object:  StoredProcedure [dbo].[uspFindUserbyid]    Script Date: 2/8/2019 6:14:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[uspFindUserbyid]
    (
        @UserId int
    )
AS
    SET NOCOUNT ON
    SELECT * FROM [dbo].[Users] WHERE UserId = @UserId

    RETURN @@Error


GO
/****** Object:  StoredProcedure [dbo].[uspFindUserbyresetToken]    Script Date: 2/8/2019 6:14:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[uspFindUserbyresetToken]
    (
        @resetToken nvarchar(30)
    )
AS
    SET NOCOUNT ON
    SELECT * FROM [dbo].[Users] WHERE resetToken = @resetToken

    RETURN @@Error


GO
USE [master]
GO
ALTER DATABASE [UserDb] SET  READ_WRITE 
GO
