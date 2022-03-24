# Product reviews challenge

## Set up instructions

1. git clone this repository onto your machine
`git clone https://github.com/Coops023/adichallenge.git`
2. ensure you have docker installed and run `docker-compose up` in root directory 
3. `cd challenge` to change diretory to the react-app.
4. `npm install` to install dependecies. 
5. `npm run start` to start the react-app
This will let you use the app and the api locally.

## Main challenges

#### CORS Error's when making request's to API
My initial solution to these errors was to use a google chrome extension called allow CORS. However after coming to the conclusion that these errors maybe intentional, i realised a google chrome extension is not a suitable solution. This is because when running the app on other browsers the error's would still show. So my next solution was to use the [http-proxy-middleware package](https://www.npmjs.com/package/http-proxy-middleware#install). This package allowed me to create a middleware that proxies both API end points, and therefor resulted in no CORS error's.


### Duplicate data
When making a GET request to the `/product` API endpoint, data sent back contained duplicates. I solved this by passing the data received through a variable called `uniqueItems` on line 29 of `ProductList.jsx`. 
After referring to the mdn documentation i found that `Map` maintains key uniqueness, meaning that there can be no more than one key-value pair with the same key. Airing on the side of caution i chose this approach rather than to use the API endpoint `delete` `/product/{id}` to delete duplicates. I believe deleting data this way in a real world application could result in unwanted data loss.
=======
`cd challenge` to change directory to the react-app.


## What i would improve with more time

### Design
I chose to try to mimic the design of the adidas webpage in terms of colour's and spacing. Though due to time restraints this resulted in a fairly basic design as i took a functionality first approach to the project. Given more time i would add more content suitable for an eCommerce platform and replace the page pagination for a product carosel.

### Reviews
Currently when making a review the newest review gets pushed to the last page of the reviews. given more time i would fix this by either using the `Array.reverse()` method or another potential solution.

