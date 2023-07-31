create DB

# use classes;

see number of database avaiable;

# show database

create collection in current db

# db.createCollection("student")

to see the avialable collection

# show collections

insert record

# db.student.insertOne({name:"gautam",email:"gautam@gmail.com",country:"India" , result:78})

insert many

# db.student.insertMany([

    {name:"atul",email:"atul@gmail.com",country:"UK" , result:78},
    {name:"sourabh",email:"sourabh@gmail.com",country:"Landaon" , result:78},{name:"mohan",email:"mohan@gmail.com",country:"America" , result:78}

])

Find all query

# db.student.find({country:"UK"})

find one

# db.student.find({country:"atul@gmail.com"})

fetch only name

# db.student.find({},{name:1})

fetch only name result from collection

# db.student.find({},{name:1,result:1})

fetch only name result from collection without \_id

# db.student.find({},{name:1,result:1 ,\_id:0})

update some data
updateOne and updatemany

updateOne record

# db.student.updateOne({email:"atul@gmail.com"} , {$set:{name:"atul patel"}})

update name = atul patel where email = atul@gmail.com

updateMany record

# db.student.updateMany({},{$inc:{result:10}})

update all student by incrementing their marks by 10

====================================================
Operator in MongoDB ( all operators in mongodb starts with $ symbol )

$gt greater than

# db.student.find({result:{$gt:70}})

$lt less then

# db.student.find({result:{$lt:70}})

$eq equal

# db.student.find({result:{$eq:70}})

$ne not equal

# db.student.find({result:{$ne:70}})

$get greater than equal and $lte less then equal


================================
$in  and $nin
===  ( compare more than one value based on  that return results)
