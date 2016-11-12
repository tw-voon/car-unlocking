@echo off

if [%1]==[karma] goto karma


choice /C:yn /n /m "Do you want to run Karma? [Y/N]: "
if %errorlevel% EQU 2 (
	set answer=n
) else (
	set answer=y
)

choice /C:yn /n /m "Do you want to run JSHint? [Y/N]: "
if %errorlevel% EQU 2 (
	set answer2=n
) else (
	set answer2=y
)


choice /C:123 /n /m "Generate output? [1. Debug only 2. Production only 3. Both debug and production]"
set answer3=%errorlevel%


choice /C:yn /n /m "Do you want to launch Chrome browser? [Y/N]: "
if %errorlevel% EQU 2 (
	set answer4=n
) else (
	set answer4=y
)



if /i "%answer%" == "Y" (
	start go.bat karma
)

echo Starting gulp...
gulp --showbrowser "%answer4%" --output "%answer3%" --jshint "%answer2%"
pause
exit /B 1


:karma
echo Starting karma ...
karma start
exit /b