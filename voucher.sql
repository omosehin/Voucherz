-- Create a new database called 'voucherz'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already

Drop Database voucherz
-- USE [master];


-- FROM sys.dm_exec_sessions
-- WHERE database_id  = db_id('MyDB')

-- EXEC(@kill);
IF NOT EXISTS (
      SELECT name
            FROM sys.databases
            WHERE name = N'voucherz'
)
CREATE DATABASE voucherz
GO

CREATE TABLE [dbo].[Voucher](
    [Id] Bigint IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Code] nvarchar(30) NOT NULL,
    [VoucherType] NVARCHAR (15)NOT NULL,
    [StartDate] Date ,
	[ExpirationDate] Date NOT NULL,
    [Status] nvarchar(20) DEFAULT 'ACTIVE',
    [Prefix] nvarchar(20) NOT NULL,
    [Postfix]nvarchar(20)NOT NULL,
	[Charset]nvarchar(20) NOT NULL,
    [Length] int NULL,
	CreatedDate DATETIME,
	[Category] NVARCHAR (50),
	[AdditionalInfo] NVARCHAR (255),
	MerchantId BIGINT,
	DeleteStatus BIT DEFAULT 0
)  

GO



CREATE TABLE [dbo].[Gift](
    [Id] Bigint IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[VoucherId] Bigint NOT NULL foreign key references Voucher(id),
    [Value] DECIMAL(18,2) NOT NULL,
    [Balance] DECIMAL(18,2),
	[AmountUsed] DECIMAL(18,2),	 
	RedeemptionCount INT, 
)

CREATE TABLE [dbo].[Discount](
    [Id] Bigint IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [VoucherId] Bigint Not NULL foreign key references Voucher(id),
    [DiscountType] nvarchar (50),
	[DiscountValue] DECIMAL (18,2),
	[DiscountAmount] DECIMAL (13,2),
	[DiscountPercent] DECImal
	
)

CREATE TABLE [dbo].[Value](
    
    [Id] [int] IDENTITY(1,1) PRIMARY KEY NOT NULL,
    [VoucherId] Bigint NOT NULL FOREIGN KEY REFERENCES Voucher(Id),
    [Amount] DECIMAL(18,2) NOT NULL
)
GO
-- Add a new column 'RedeemptionCount' to table 'Value' in schema '[dbo]'
ALTER TABLE [dbo].[Value]
	ADD RedeemptionCount /*new_column_name*/ int /*new_column_datatype*/ NULL /*new_column_nullability*/
GO

CREATE TABLE [dbo].[Redeemption](
	[Id] BIGINT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[VoucherId] BIGINT NOT NULL FOREIGN KEY REFERENCES Voucher(Id),
		[RedeemAmount] DECIMAL(13,2),
		[RedeemDate] DATE
)
GO


-- ==============================================================================================
-- ============================ Stored Procedures for Creating Vouchers  ========================
-- ==============================================================================================
DROP PROCEDURE [dbo].[CreateDiscountVoucher]
GO

CREATE PROCEDURE [dbo].[CreateDiscountVoucher]
@code NVARCHAR(100),
@startDate date,
@expirationDate date,
@Status varchar(20) ,
@prefix nvarchar(20), 
@postfix nvarchar(20),
@Charset nvarchar(20),
@Length int,
@VoucherType NVARCHAR(50),
@Category NVARCHAR(100),
@AdditionalInfo NVARCHAR (255),
@MerchantId BIGINT,
@DiscountValue decimal(13,2)= Null,
@discountType Nvarchar(10)

AS
DECLARE @id int =Null
DECLARE @VoucherId int = 0

			UPDATE Voucher SET [Status] = N'ACTIVE' WHERE Id = @VoucherId 
			insert into voucher(code,CreatedDate, StartDate,ExpirationDate,Prefix,Postfix,Charset,[Length],VoucherType,Category,AdditionalInfo,MerchantId) 
			Values(@code,GETDATE(), @startdate,@expirationDate,@prefix,@postfix,@Charset,@Length,@VoucherType,@Category,@AdditionalInfo,@MerchantId)
			select @VoucherId = SCOPE_IDENTITY()
			if(@VoucherId > 0)
			insert into discount (DiscountValue,voucherid,DiscountType) Values( @DiscountValue, @VoucherId, @discountType)
GO 
	

-- ======================================================================================================================================================
DROP PROCEDURE CreateGiftVoucher
GO
CREATE PROCEDURE [dbo].[CreateGiftVoucher]
@code varchar(100),
@startDate date,
@expirationDate date,
@Status varchar(20),
@prefix nvarchar(20), 
@postfix nvarchar(20),
@Charset nvarchar(20),
@Length int,
@VoucherType NVARCHAR(50),
@Category NVARCHAR(100),
@AdditionalInfo NVARCHAR (255),
@MerchantId BIGINT,
@Value DECIMAL(18,2)

AS
DECLARE @id int =Null
DECLARE @VoucherId int = 0
	
	UPDATE Voucher SET [Status] = N'ACTIVE' WHERE Id = @VoucherId
		insert into voucher(code,CreatedDate, StartDate,ExpirationDate,Prefix,Postfix,Charset,[Length],VoucherType,Category,AdditionalInfo,MerchantId) 
		Values(@code,GETDATE (),@startdate,@expirationDate,@prefix,@postfix,@Charset,@Length,@VoucherType,@Category,@AdditionalInfo,@MerchantId)
		select @VoucherId = SCOPE_IDENTITY()
		if(@VoucherId > 0)
		insert into Gift ([Value],voucherid) Values( @Value, @VoucherId)
GO 
	


-- ========================================================================================================================================================

CREATE PROCEDURE [dbo].[UpdateDiscountVoucher]	
@code varchar(30),
@startDate date,
@expirationDate date,
@Status varchar(20),
@prefix nvarchar(20), 	
@postfix nvarchar(20),
@Charset nvarchar(20),	
@Length int,
@VoucherType NVARCHAR(50),
@Category NVARCHAR(100),
@AdditionalInfo NVARCHAR (255),
@MerchantId BIGINT,
@Amount DECIMAL(18,2)
AS
DECLARE @id int =Null
DECLARE @VoucherId int = 0

	
	-- SELECT @VoucherId = Id FROM Voucher where Code = @code 
	
	-- if(@VoucherId = 0)
	UPDATE Voucher SET [Status] = N'ACTIVE' WHERE Id = @VoucherId
		insert into voucher(code,CreatedDate, StartDate,ExpirationDate,Prefix,Postfix,Charset,[Length],VoucherType,Category,AdditionalInfo,MerchantId) 
		Values(@code,GETDATE(),@startdate,@expirationDate,@prefix,@postfix,@Charset,@Length,@VoucherType,@Category,@AdditionalInfo,@MerchantId)
		select @VoucherId = SCOPE_IDENTITY()
		if(@VoucherId > 0)
		insert into [Value] (Amount,voucherid) Values( @Amount, @VoucherId)
GO 

-- ==============================================================================================
-- ============================ Stored Procedures for Updating Vouchers  ========================
-- ==============================================================================================

CREATE PROCEDURE [dbo].[UpdateValueVoucher]

@startDate date,
@expirationDate date,
@Status varchar(20),
@Category NVARCHAR(100),
@AdditionalInfo NVARCHAR (255),
@Amount DECIMAL(18,2),
@Code NVARCHAR (30),
@VoucherType NVARCHAR(15),
@id BIGINT

AS
	SET NOCOUNT ON
	UPDATE [dbo].[Voucher]
	SET
		[StartDate] = @StartDate,
		[ExpirationDate] = @expirationDate,
		[Category] = @Category,
		[AdditionalInfo] = @AdditionalInfo
		WHERE DeleteStatus = 0 AND Code = @Code
	UPDATE [Value]
	SET
		[Amount] = @Amount
	WHERE id = @id
	SELECT @id = SCOPE_IDENTITY()
    RETURN @@Error
GO
select * from voucher
GO


CREATE PROCEDURE [dbo].[UpdateDiscountVoucher]

@startDate date,
@expirationDate date,
@Category NVARCHAR(100),
@AdditionalInfo NVARCHAR (255),
@Code NVARCHAR (30),
@DiscountValue decimal(13,2)= Null,
@id BIGINT

AS
	SET NOCOUNT ON
	UPDATE [dbo].[Voucher]
	SET
		
		[StartDate] = @StartDate,
		[ExpirationDate] = @expirationDate,
		[Category] = @Category,
		[AdditionalInfo] = @AdditionalInfo
	WHERE DeleteStatus = 0 AND Code = @Code
	UPDATE [Discount]
	SET
		[DiscountValue] = @DiscountValue
	WHERE id = @id 
	SELECT @id = SCOPE_IDENTITY()
    RETURN @@Error
GO


CREATE PROCEDURE [dbo].[UpdateGiftVoucher]

@startDate date,
@expirationDate date,
@Category NVARCHAR(100),
@AdditionalInfo NVARCHAR (255),
@Value DECIMAL(18,2),
@Code NVARCHAR (30),
@id BIGINT

AS
	SET NOCOUNT ON
	UPDATE [dbo].[Voucher]
	SET
		[StartDate] = @StartDate,
		[ExpirationDate] = @expirationDate,
		[Category] = @Category,
		[AdditionalInfo] = @AdditionalInfo
	WHERE DeleteStatus = 0 AND Code = @Code
	UPDATE [Gift]
	SET
		[Value] = @Value
	WHERE id = @id 
	SELECT @id = SCOPE_IDENTITY()
    RETURN @@Error
GO

-- ==============================================================================================
-- ========================= Stored Procedures for Finding Vouchers By Code  ====================
-- ==============================================================================================

CREATE PROCEDURE [dbo].[findDiscountVoucherByCode]
(
	@code NVARCHAR (30)

)
AS
	SET NOCOUNT ON
	SELECT code,CreatedDate, VoucherType,StartDate,ExpirationDate,[status],[Length],Category,AdditionalInfo,MerchantId,DeleteStatus

	 FROM [dbo].[Voucher_DiscountView] WHERE  code = @code
GO

-- ==============================================================================================

CREATE PROCEDURE [dbo].[findGiftVoucherByCode]
(
	@code NVARCHAR (100)
)
AS
	SET NOCOUNT ON
	SELECT * FROM [dbo].[Voucher_GiftView] WHERE  code = @code
GO

-- ==============================================================================================

CREATE PROCEDURE [dbo].[findValueVoucherByCode]
(
	@code NVARCHAR (100)
)
AS
	SET NOCOUNT ON
	SELECT * FROM [dbo].[Voucher_DiscountView] WHERE  code = @code
GO

Select *from voucher
GO
-- ==============================================================================================
-- =================== Stored Procedures for Finding Vouchers By Voucher Type  ==================
-- ==============================================================================================
CREATE PROCEDURE [dbo].[findVoucherByDiscount]

@VoucherType NVARCHAR(50) = N'Discount'
AS
	SET NOCOUNT ON
	
	SELECT * FROM [dbo].[Voucher_DiscountView] WHERE VoucherType = N'Discount'
	
GO 
EXECUTE [dbo].findVoucherByDiscount Discount
GO

CREATE PROCEDURE [dbo].[findVoucherByGift]

@voucherType NVARCHAR(50) = N'Gift'

AS
	SET NOCOUNT ON
	SELECT * FROM [dbo].[Voucher_GiftView] WHERE voucherType = N'Gift'
	
GO 

CREATE  PROCEDURE [dbo].[findVoucherByValue]

@voucherType NVARCHAR(50) = N'Value'

AS
	SET NOCOUNT ON
	SELECT * FROM [dbo].[Voucher_ValueView] WHERE voucherType = N'Value'
	
GO 

EXECUTE [dbo].[findVoucherByGift]
-- ==============================================================================================

select count(*) from voucher
GO
-- ==========================================================================================================================================================

-- ==============================================================================================
-- ===============================        CREATING VIEWS          ===============================
-- ==============================================================================================
CREATE  PROCEDURE [dbo].[getValuevoucherByStartDate]

@startDate DATE

AS
	SET NOCOUNT ON
	SELECT * FROM [dbo].[Voucher_ValueView] WHERE startDate = @startDate
	
GO 



CREATE PROCEDURE [dbo].[GetAllVoucher]
AS
SET NOCOUNT ON
    SELECT * from Voucher as v,
	Discount as d, Gift as g, [Value] as va
	JOIN Discount  on v.Id = d.VoucherId
	JOIN Gift  ON v.Id = g.VoucherId
	JOIN [Value] on v.Id = va.VoucherId

	GO



CREATE View [dbo].[Voucher_GiftView]
AS
SELECT v.Id,code,CreatedDate,StartDate, ExpirationDate, [status], prefix, postfix, Charset, [Length], VoucherType,Category,AdditionalInfo
	MerchantId,DeleteStatus,g.AmountUsed, g.Value, g.Balance, g.VoucherId
	FROM Voucher as v, Gift as G
	WHERE v.Id = G.VoucherId
GO

select *from Voucher_GiftView
GO

CREATE VIEW [dbo].[Voucher_ValueView]
AS
SELECT v.Id,code,CreatedDate,StartDate,ExpirationDate,[status], prefix, postfix, Charset, [Length] VoucherType,StartDate,ExpirationDate,[status],Category,AdditionalInfo,MerchantId,DeleteStatus,
vv.Amount, vv.VoucherId
	FROM Voucher as v, [Value] as vv
	WHERE v.Id = vv.VoucherId
GO


CREATE VIEW [dbo].[Voucher_DiscountView]
AS
SELECT v.Id,code,CreatedDate,VoucherType,StartDate,ExpirationDate,[status], Category,AdditionalInfo,MerchantId,DeleteStatus,
d.DiscountType, d.DiscountValue, d.VoucherId
	FROM Voucher as v, Discount as D
	WHERE v.ID = D.VoucherId
GO



IF EXISTS (
SELECT *
	FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'[dbo]'
	AND SPECIFIC_NAME = N'GetVoucherByCode'
)
DROP PROCEDURE [dbo].[GetVoucherByCode]
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE [dbo].GetVoucherByCode
	@code	NVARCHAR (30)
-- add more stored procedure parameters here
AS
	-- body of the stored procedure
	SELECT Id,VoucherType,code,CreatedDate,StartDate,ExpirationDate,[status],Category,AdditionalInfo,DeleteStatus 
	FROM Voucher WHERE code = @code
GO
-- example to execute the stored procedure we just created
EXECUTE [dbo].GetVoucherByCode ValxD7a5S7j
GO


CREATE PROCEDURE [dbo].[DisableVoucher]
-- @Status NVARCHAR(20),
-- @DeleteStatus BIT,
@Code NVARCHAR(30)
-- @MerchantId BIGINT,
-- @Id BIGINT

AS
	SET NOCOUNT ON
	UPDATE [dbo].[Voucher]
	SET
		[Status] = N'INACTIVE',
		[DeleteStatus] = 1
	WHERE Code = @Code
	-- SELECT @Id = SCOPE_IDENTITY()
GO

select * from voucher 

-- Create a new stored procedure called 'GetVoucherByCode' in schema '[dbo]'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
	FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'[dbo]'
	AND SPECIFIC_NAME = N'GetVoucherByCode'
)
DROP PROCEDURE [dbo].[GetVoucherByCode]
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE [dbo].GetVoucherByCode
	@code	NVARCHAR (30)
-- add more stored procedure parameters here
AS
	-- body of the stored procedure
	SELECT Id,VoucherType,code,CreatedDate,StartDate,ExpirationDate,[status],Category,AdditionalInfo,DeleteStatus 
	FROM Voucher WHERE code = @code
GO
-- example to execute the stored procedure we just created
EXECUTE [dbo].GetVoucherByCode ValxD7a5S7j
GO


-- Create a new stored procedure called 'UpdateVoucherStatus' in schema '[dbo]'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
	FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'[dbo]'
	AND SPECIFIC_NAME = N'UpdateVoucherStatus'
)
DROP PROCEDURE [dbo].UpdateVoucherStatus
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE [dbo].[UpdateVoucherStatus]
	@code /*parameter name*/ NVARCHAR /*datatype_for_param1*/(30)  /*default_value_for_param1*/
	-- @param2 /*parameter name*/ int /*datatype_for_param1*/ = 0 /*default_value_for_param2*/
-- add more stored procedure parameters here
AS
	-- body of the stored procedure
	-- Update rows in table '[dbo].[Voucher]'
	UPDATE [dbo].[Voucher]
	SET
		[Status] = N'USED',
		[RedeemptionDate] = GETDATE()
		-- add more columns and values here
	WHERE code = @Code	/* add search conditions here */
GO
-- example to execute the stored procedure we just created
EXECUTE [dbo].UpdateVoucherStatus ValxD7a5S7j
GO



-- Create a new stored procedure called 'GetGiftVoucher' in schema '[dbo]'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
	FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'[dbo]'
	AND SPECIFIC_NAME = N'GetGiftVoucher'
)
DROP PROCEDURE [dbo].GetGiftVoucher
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE [dbo].GetGiftVoucher
	@VoucherId /*parameter name*/ NVARCHAR(15)
-- add more stored procedure parameters here
AS
	-- body of the stored procedure
	SELECT * FROM Gift WHERE VoucherId = @VoucherId
GO
-- example to execute the stored procedure we just created
-- EXECUTE [dbo].GetGiftVoucher 1 /*value_for_param1*/, 2 /*value_for_param2*/
-- GO
-- Create a new stored procedure called 'RedeemGiftVoucher' in schema '[dbo]'
-- Drop the stored procedure if it already exists


IF EXISTS (
SELECT *
	FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'[dbo]'
	AND SPECIFIC_NAME = N'RedeemGiftVoucher'
)
DROP PROCEDURE [dbo].RedeemGiftVoucher
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE [dbo].RedeemGiftVoucher
	@amount	/*parameter name*/ Decimal(13,2)
	@VoucherId BIGINT,
-- add more stored procedure parameters here
AS
	-- body of the stored procedure
	-- Update rows in table 'Gift'
	UPDATE Gift
	SET
		[usedValue] = usedvalue + @amount		
		-- add more columns and values here
	WHERE VoucherId =@VoucherId
	INSERT INTO Redeemption ()
GO
-- example to execute the stored procedure we just created
EXECUTE [dbo].RedeemGiftVoucher 1 /*value_for_param1*/, 2 /*value_for_param2*/
GO



















