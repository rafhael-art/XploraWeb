USE master
GO

-- Create the new database if it does not exist already
IF NOT EXISTS (
        SELECT [name]
        FROM sys.databases
        WHERE [name] = N'DB_XPLORA'
        )
    CREATE DATABASE DB_XPLORA
GO

USE DB_XPLORA
GO

--Transact-SQL y Procedimientos Almacenados:
CREATE TABLE SALES (
    SaleID INT PRIMARY KEY IDENTITY(1, 1) NOT NULL
    , ProductID INT NOT NULL
    , CustomerId INT NOT NULL
    , SaleDate DATE NOT NULL
    , Amount DECIMAL(14, 4) NOT NULL
    )
GO

--Calcule las ventas totales por cliente para un período de fechas determinado.
CREATE
    OR

ALTER PROCEDURE dbo.USP_SALES_BY_CUSTOMER @StartDate DATE
    , @EndDate DATE
AS
BEGIN
    SELECT CustomerID
        , SUM(Amount) AS TotalSales
    FROM SALES
    WHERE SaleDate BETWEEN @StartDate AND @EndDate
    GROUP BY CustomerID
END
GO

--•	Permita actualizar la cantidad de una venta específica.
CREATE
    OR

ALTER PROCEDURE dbo.USP_SALES_UPDATE_AMOUNT @SaleID INT
    , @Amount DECIMAL(14, 4)
AS
BEGIN
    UPDATE SALES
    SET Amount = @Amount
    WHERE SaleID = @SaleID
END
GO

--•	Devuelva la lista de ventas ordenada por cantidad en orden descendente.
CREATE
    OR

ALTER PROCEDURE dbo.USP_SALES_GET_ALL
AS
BEGIN
    SELECT SaleID
        , ProductID
        , CustomerId
        , SaleDate
        , Amount
    FROM SALES
    ORDER BY Amount DESC
END
GO

--Creación de Vistas:
--Crea una vista en SQL Server que muestre el total de ventas por producto y por cliente en el último año, agrupando por ProductID y CustomerID.
CREATE VIEW VIEW_SALES_GET_TOTAL_BY_PPRODUCT_AND_CUSTOMER_LAST_YEAR
AS
SELECT CustomerID
    , ProductID
    , SUM(Amount) AS TotalSales
FROM SALES
WHERE YEAR(SaleDate) = (YEAR(GETDATE()) - 1)
GROUP BY ProductID
    , CustomerID
GO

CREATE TABLE USERS (
    UserId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL
    , Nombre VARCHAR(200) NOT NULL
    , Email VARCHAR(50) NOT NULL
    , Telefono VARCHAR(15) NOT NULL
    , Direccion VARCHAR(200) NOT NULL
    , Password VARCHAR(200) NOT NULL
    )
GO

CREATE
    OR

ALTER PROCEDURE dbo.USP_USER_INSERT @UserId INT
    , @Nombre VARCHAR(200)
    , @Email VARCHAR(50)
    , @Telefono VARCHAR(15)
    , @Direccion VARCHAR(200)
    , @Password VARCHAR(200)
AS
BEGIN
    INSERT INTO USERS
    VALUES (
        @Nombre
        , @Email
        , @Telefono
        , @Direccion
        , @Password
        )

    SELECT IDENT_CURRENT('USERS')
END
GO

CREATE
    OR

ALTER PROCEDURE dbo.USP_USER_UPDATE @UserId INT
    , @Nombre VARCHAR(200)
    , @Email VARCHAR(50)
    , @Telefono VARCHAR(15)
    , @Direccion VARCHAR(200)
AS
BEGIN
    UPDATE USERS
    SET Email = @Email
        , Telefono = @Telefono
        , Direccion = @Direccion
        , Nombre = @Nombre
    WHERE UserId = @UserId
END
GO

CREATE
    OR

ALTER PROCEDURE dbo.USP_USER_GET_BY_EMAIL @Email VARCHAR(50)
AS
BEGIN
    SELECT *
    FROM USERS
    WHERE Email = @Email
END
GO

CREATE
    OR

ALTER PROCEDURE dbo.USP_USER_GET_BY_ID @UserId VARCHAR(20)
AS
BEGIN
    SELECT *
    FROM USERS
    WHERE UserId = @UserId
END
GO

CREATE TABLE PRODUCTS (
    ProductId INT PRIMARY KEY IDENTITY(1, 1) NOT NULL
    , Name VARCHAR(200) NOT NULL
    , Sku VARCHAR(100) NOT NULL
    , Descripcion VARCHAR(200) NOT NULL
    , Precio DECIMAL(14, 4) NOT NULL
    )
GO

CREATE
    OR

ALTER PROCEDURE dbo.USP_PRODUCT_GET_ALL
AS
BEGIN
    SELECT *
    FROM PRODUCTS
END
GO

CREATE
    OR

ALTER PROCEDURE dbo.USP_PRODUCT_INSERT @ProductId INT
    , @Name VARCHAR(200)
    , @Sku VARCHAR(100)
    , @Descripcion VARCHAR(200)
    , @Precio DECIMAL(14, 4)
AS
BEGIN
    INSERT INTO PRODUCTS
    VALUES (
        @Name
        , @Sku
        , @Descripcion
        , @Precio
        )

    SELECT IDENT_CURRENT('PRODUCTS')
END
GO

CREATE
    OR

ALTER PROCEDURE dbo.USP_PRODUCT_UPDATE @ProductId INT
    , @Name VARCHAR(200)
    , @Sku VARCHAR(100)
    , @Descripcion VARCHAR(200)
    , @Precio DECIMAL(14, 4)
AS
BEGIN
    UPDATE PRODUCTS
    SET Name = @Name
        , Sku = @Sku
        , Descripcion = @Descripcion
        , Precio = @Precio
    WHERE ProductId = @ProductId
END
GO

CREATE
    OR

ALTER PROCEDURE dbo.USP_PRODUCT_DELETE @ProductId INT
AS
BEGIN
    DELETE
    FROM PRODUCTS
    WHERE ProductId = @ProductId
END
GO

CREATE
    OR

ALTER PROCEDURE dbo.USP_PRODUCT_FIND_BY_NAME @Name VARCHAR(100)
AS
BEGIN
    SELECT *
    FROM PRODUCTS
    WHERE Name LIKE '%' + @Name + '%'
END
GO


