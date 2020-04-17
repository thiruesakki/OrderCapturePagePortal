USE [TechPortal_DEV]
GO
/****** Object:  UserDefinedFunction [dbo].[StringSplit]    Script Date: 5/11/2017 2:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
create FUNCTION [dbo].[StringSplit]
(@String  VARCHAR(MAX), @Separator CHAR(1))
RETURNS @RESULT TABLE(Value VARCHAR(MAX))
AS
BEGIN    
 DECLARE @SeparatorPosition INT = CHARINDEX(@Separator, @String ),
        @Value VARCHAR(MAX), @StartPosition INT = 1 

 IF @SeparatorPosition = 0 
  BEGIN
   INSERT INTO @RESULT VALUES(@String)
   RETURN
  END

 SET @String = @String + @Separator

WHILE @SeparatorPosition > 0
  BEGIN
   SET @Value = SUBSTRING(@String , @StartPosition, @SeparatorPosition- @StartPosition)
   IF( @Value <> ''  )
    INSERT INTO @RESULT VALUES(@Value)
   SET @StartPosition = @SeparatorPosition + 1
   SET @SeparatorPosition = CHARINDEX(@Separator, @String , @StartPosition)
  END   
 RETURN
END


GO