@setlocal enableextensions enabledelayedexpansion
@echo off
CALL ember build --environment=development --watch --output-path="D:\tomcat\webapps\sample-app"
date /T 
time /T