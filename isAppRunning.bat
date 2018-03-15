tasklist /FI "IMAGENAME eq itunes.exe" 2>NUL | find /I /N "itunes.exe">NUL
if "%ERRORLEVEL%"=="0" echo Program is running