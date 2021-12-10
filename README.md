# NATOURS APPLICATION 
- Application built using MongoDB / Mongoose / Express.js 

## HOW TO RUN 

**Install the application**
```
npm install 
```

**Run the application**
```
npm run start:dev
```

## Visit localhost:8000/api/v1/tours

*Endpoints of interest

- api/v1/tours/tour-stats
- api/v1/tours/top-5-cheap

# Querying

**pagination example**
- api/v1/tours?page=1&limit=10

**sort example**
- api/v1/tours?sort=price

**filter examples**

- the following can be passed after keywords: [gte, lte, ge, le]

- api/v1/tours&price[gte]=500 // for great than or equal to
- api/v1/tours&price[lte]=500 // for less than or equal to
- api/v1/tours&price[gt]=500 // for greater than 
api/v1/tours&price[lt]=500 // for less than
