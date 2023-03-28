@setlocal enableextensions enabledelayedexpansion
@echo off
CALL ember build --environment=development --watch --output-path="E:\tomcat\apache-tomcat-9.0.71\webapps\sample-app"
date /T 
time /T