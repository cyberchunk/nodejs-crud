# nodejs-crud

1. npm init
>> generates package.json
{
  "name": "pradeep",
  "version": "0.0.0",
  "description": "Product Management",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Pradeep G",
  "license": "BSD-2-Clause"
}



2. The following modules are going to be needed to successfully build the app.

express: used to create handle routing and process requests from the client.
express-fileupload: Simple express file upload middleware that wraps around busboy.
body-parser: used to parse incoming request from the client.
mysql: Node JS driver for MySQL.
ejs: templating engine to render html pages for the app.
req-flash: used to send flash messages to the view
nodemon: Installed globally. It is used to watch for changes to files and automatically restart the server.
Type the following command to install the first 7 modules as dependencies.

npm install express express-fileupload body-parser mysql ejs req-flash --save

---done

create folders
