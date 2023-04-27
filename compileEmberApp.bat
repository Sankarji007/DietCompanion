@setlocal enableextensions enabledelayedexpansion
@echo off
CALL ember build --environment=development --watch --output-path="C:\Program Files\Apache Software Foundation\Tomcat 9.0\webapps\sample-app"
date /T 
time /T