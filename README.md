# React Tea & Coffee Shop PoC


### IMPORTANT

This is a DEMO project only, do not run this code in production.

The API "backend" is using json-server-auth which is not secure by default so it should never be run in a production environment.

Please do not take this code for granted, this is my first JS React project and while I am trying to learn and use best practices this project is my first try at using JavaScript so I am very well aware most of the implementations I did can be done better, optimized etc.

---
### How to run the project
Prepare your environment:
```
git clone https://github.com/dd-marius/rtc.git
cd rtc
npm i
```

To start the project in your dev environment use:
```
npm run dev
```
To start the json-server in your dev environment use:
```
npm run dev:server
```


The list of users can be found in "./data/db.json".
The password for all users is "parola".
Only admin users with "role = 1" have access to edit shop items and view all orders.

---
Thank you!
