**Docker compose to run the products services all in one**

It runs a mongo db, product service and price engine after running the following command.

`docker-compose up`

In order to create some sample data you just need to run the init.sh script located inside of the postman folder.

`sh postman/init.sh`

If you experience problems with this, you only need to install newman and execute the script.

`npm install -g newman
newman run Initial\ Data.postman_collection.json -d products.json
`
