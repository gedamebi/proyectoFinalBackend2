<h1 align="center">Curso Backend II</h1><br><br>

## Descripción 
Primera pre entrega del modelo 2, Se implementará en el proyecto ecommerce facilitado al inicio del curso un CRUD de usuarios, junto con un sistema de Autorización y Autenticación
***

<br>
<h2 align="center">Lenguaje y Herramientas</h2>
<br><br>
<p align="center"> 
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="Javascript" width="90" height="90"/></a> 
    <a href="https://nodejs.org/en" target="_blank"> <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" alt="Boostrap" width="90" height="90"/></a> 
</p>
<br>
<p align="center"> 
    <a href="https://expressjs.com/" target="_blank"> <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original-wordmark.svg" alt="React" width="90" height="90"/></a>
    <a href="https://www.npmjs.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/npm/npm-original-wordmark.svg" alt="npm" width="90" height="90"/></a>
</p>
<br><br>

## Funcionalidades 

- Respecto al commit anterior de este repo, lo integro al proyecto final del modulo 1

- Crear un modelo User con campos especificados

- Encriptar la contraseña del usuario mediante el paquete bcrypt (Utilizar el método “hashSync”).

- Desarrollar las estrategias de Passport para que funcionen con este modelo de usuarios
 
- Implementar un sistema de login del usuario que trabaje con jwt.

- Desarrollar una estrategia “current” para extraer la cookie que contiene el token y con dicho token obtener el usuario asociado. En caso de tener el token, devolver al usuario asociado al token, caso contrario devolver un error de passport, utilizar un extractor de cookie.

- Agregar al router /api/sessions/ la ruta /current, la cual validará al usuario logueado y devolverá en una respuesta sus datos (Asociados al JWT).

***

---
<br><br>

# Primera pre entrega NodeJS (Germán Medina)

Dependencias incluidas en el proyecto:

  - [express](https://expressjs.com/)
  - [express-handlebars](https://www.npmjs.com/package/express-handlebars)
  - [multer](https://www.npmjs.com/package/multer)
  - [uuid](https://www.npmjs.com/package/uuid)
  - [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2)
  - [socket.io](https://www.npmjs.com/package/socket.io)
  - [moment](https://www.npmjs.com/package/moment)
  - [nodemon](https://www.npmjs.com/package/nodemon)
  - [bcrypt](https://www.npmjs.com/package/bcrypt)
  - [cookie-parser](https://www.npmjs.com/package/cookie-parser)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
  - [mongoose](https://www.npmjs.com/package/mongoose?azure-portal=true)
  - [passport](https://www.npmjs.com/package/passport/v/0.7.0)
  - [passport-jwt](https://www.npmjs.com/package/passport-jwt)


## Ejecturar los siguientes comandos dentro del directorio luego de realizar el clon

```
  - npm install
  - npm run dev
```

<br><br>


---
### Autor: Germán Medina
---