INICIO DEL PROYECTO APLICATIVO WEB PARA SEMILLEROS UNICAUCA


Estudiantes:

- Edinsson Lopez
- Alexander Davila
- Carlos Huila
- Oscar Ordoñez
- Alejandro Méndez




Pasos para descargar y desplegar el aplicativo por primera vez
1.  Abrir una terminal de Git en el directorio donde se desee descargar el codigo fuente.

2.  En la terminal, ingresar el siguiente comando: "git clone https://github.com/victoralemendez/AppWebSemilleros.git" y esperar a que finalice la descarga.

3.  Al interior del directorio descargado deben existir los directorios "api" y "client" si el proceso se completó sin errores.

4.  Abrir una terminal dentro del directorio "api" y ejecutar el comando "npm install", lo anterior descargará las dependencias del proyecto.

5.  Abrir una terminal dentro del directorio "client" y ejecutar el comando "npm install", lo anterior descargará las dependencias del proyecto.

6.  Para la ejecución del proyecto se deben seguir los siguientes pasos ordenadamente. Iniciando por la ejecución del demonio de mongo y para ello se debe ejecutar "mongod.exe" y mantener en ejecución mientras se despliegue el servidor de forma local, la ubicación de este archivo dependerá del directorio donde se realizo la instalación, video de ejemplo (https://www.youtube.com/watch?v=EhZTEA-hF3U)

7.  Abrir una terminal dentro del directorio "api" ejecutar el comando "npm start" y mantener la ventana abierta.

8.  Abrir una terminal dentro del directorio "client" ejecutar el comando "ng serve" y mantener la ventana abierta.

9.  Abrir el navegador y digitar la dirección "http://localhost:4200/config-content".

