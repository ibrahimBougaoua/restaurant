# Simple web application using Node js & MongoDb

<h3>installation steps: </h3>

1 -> install library node js by typing [ npm install ]

2 -> create database with mongodb by typing [ use restaurant ]

3 -> Fake Data to using application by typing [ node ./seeder/seeder.js ]

<strong>Password : ddd</strong>

<h3>Mvc concept : </h3>

![stack Overflow](https://2.bp.blogspot.com/-I6bIQMAj-Nc/WWaQAbXnfJI/AAAAAAAABZg/aVDBAFcksSogYYNgWqd1GIkOZgtQuCQ7ACLcBGAs/s320/icon-aspnetmvc.png)

<h3>Database schema :</h3>

<pre> 
// Users schema
User {
        _id : ("5e946cbe64937321dc961e5e"),
        role : "adminstrator",
        Fname : "ibrahim",
        LName : "bougaoua",
        Contact : "02152145454",
        email : "adminstrator@gmail.com",
        password : "$2a$08$kmk4DRv5jcCRhNKk0OTBhuze6zKitBOSoSoFKQ/qVKinoVbXzVXkm",
        avatar : "profile.png",
        created_at : ("2020-04-13T13:44:30.521Z")
}

// Drink schema
Drink {
            _id : ("5e87404989624917fc83db12"),
            Name : "namemore",
            Alcohol : "alcoholwoman",
            Type : "newwoman",
            Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            created_at : ("2020-04-03T13:55:21.527Z")
}

// Food schema
Food {
        _id : ("5e81ba1051d4f6298052d9d1"),
        Name : "hmiss",
        Price : "201.21",
        Type : "khfif",
        Category : "taklidi",
        Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        created_at : ("2020-04-17T13:55:16.968Z")
}

// Table schema
Table {
    _id : ("5e832c1593129439b8f3bdcb"),
    Name : "classic tow",
    NumberPlace : "6",
    Type : "family",
    Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    created_at : ("2020-03-31T11:40:05.990Z")
}

// Chef schema
Chef {
        _id : ("5e833906da8f86227cb61966"),
        Fname : "manal",
        LName : "manal",
        Email : "manal@chef.dz",
        Experience : "10 years of job",
        Type : "all types",
        City : "Illizi",
        Postcode : "35000",
        Salary : "1000",
        Sex : "woman",
        Birthdate : "2020-04-17",
        created_at : ("2020-03-31T12:35:18.391Z")
}

// Waiter schema
Waiter {
            _id : ("5e81ae8260cd552b58714cfc"),
            Fname : "mohammed",
            LName : "mohammed",
            Email : "mohammed@waiter.dz",
            City : "Naama",
            Postcode : "35000",
            Salary : "200",
            Sex : "man",
            Birthdate : "2020-04-25",
            created_at : ("2020-03-30T08:32:02.436Z")
}

// Booking schema
Customer {
        _id : ("5e822f29b0f7790a685ac372"),
        Fname : "younes",
        LName : "younes",
        Contact : "02145121210",
        Email : "younes@mail.dz",
        created_at : ("2020-03-30T17:40:57.452Z")
}

// Booking schema
booking {
        _id : ("5e8626c48b66dd116813b732"),
        Date : "2020-04-16",
        time : "6:00am",
        number_place : "3",
        CustomerID : "5e9864b2b8ffe7594876d724",
        created_at : ("2020-04-17T14:31:08.158Z")
}

// Bills schema
Bill {
        _id : ("5e95f5bbd0315c3d6c25f179"),
        Sub_Total : "88.12",
        Vat : "66.12",
        Total : "900.32",
        drink_id : "5e985e544815552404e93b47",
        food_id : "5e974face028ec5590e73eb6",
        waiter_id : "5e98627d961ec759b0217a69",
        table_id : "5e9719fff6ca344ac449dd20",
        CustomerID : "5e822fd59d92e605285b5396",
        created_at : ("2020-04-14T17:41:15.241Z")
}
</pre> 
