 
@echo off
setlocal enabledelayedexpansion

REM Get a list of directories in the current directory
for /D %%i in (*) do (
    cd %%i
    mklink /D node_modules ..\..\node_modules
    cd ..
)