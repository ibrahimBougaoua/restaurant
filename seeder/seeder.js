/**
* call library
*/
const db = require('../config/database')
const User = require('../models/User')
const Bill = require('../models/Bill')
const booking = require('../models/booking')
const Chef = require('../models/Chef')
const Customer = require('../models/Customer')
const Waiter = require('../models/Waiter')
const Drink = require('../models/Drink')
const Food = require('../models/Food')
const Table = require('../models/Table')

// Users Seeder
let users = [
    new User({
        _id : ("5e946cbe64937321dc961e5e"),
        role : "adminstrator",
        Fname : "ibrahim",
        LName : "bougaoua",
        Contact : "02152145454",
        email : "adminstrator@gmail.com",
        password : "$2a$08$kmk4DRv5jcCRhNKk0OTBhuze6zKitBOSoSoFKQ/qVKinoVbXzVXkm",
        avatar : "profile.png",
        created_at : ("2020-04-13T13:44:30.521Z")
    })
    ,
    new User({
        _id : ("5e946cd664937321dc961e5f"),
        role : "customer",
        Fname : "islam",
        LName : "islam",
        Contact : "02154545454",
        email : "customer@gmail.com",
        password : "$2a$08$kRq56cOKAJ4GVifQ1as5ee0is7mSxfYbaYhmmcQP75z.JUjHfkAVC",
        avatar : "profile.png",
        created_at : ("2020-04-13T13:44:54.420Z")
    })
    ,
    new User({
        _id : ("5e946d1764937321dc961e61"),
        role : "waiter",
        Fname : "lotfi",
        LName : "lotfi",
        Contact : "02154545454",
        email : "waiter@gmail.com",
        password : "$2a$08$VEpgTDBanTLJguLG3rEe9uKy1BChoadSh9W70w.M/8909qsRDKIeG",
        avatar : "profile.png",
        created_at : ("2020-04-13T13:45:59.440Z")
    })
    ,
    new User({
        _id : ("5e946d3064937321dc961e62"),
        role : "chef",
        Fname : "ramiy",
        LName : "rammi",
        Contact : "02484545409",
        email : "chef@gmail.com",
        password : "$2a$08$zbDb.rL3/3ANgtGHTH0Ki.hozLNdUC6l6G0Z7dvpAJtY4R3iud6Su",
        avatar : "profile.png",
        created_at : ("2020-04-13T13:46:24.659Z")
    })
    ,
    new User({
        _id : ("5e946d5b64937321dc961e64"),
        role : "table",
        Fname : "ahmed",
        LName : "mohammed",
        Contact : "02189454544",
        email : "table@gmail.com",
        password : "$2a$08$V5XHYoJt6zTW/pdKd4.6WOjHmidsGCWk4ZYAq3ksoPQrmRioiajfW",
        avatar : "profile.png",
        created_at : ("2020-04-13T13:47:07.391Z")
    })
    ,
    new User({
        _id : ("5e946d8264937321dc961e65"),
        role : "bill",
        Fname : "lamine",
        LName : "amine",
        Contact : "02454584848",
        email : "bill@gmail.com",
        password : "$2a$08$UTKdqO62jSQRJpTygeuzoeUrfvGYONhycDdhhrhg2xIdf2oCOFtCG",
        avatar : "profile.png",
        created_at : ("2020-04-13T13:47:46.847Z")
    })
    ,
    new User({
        _id : ("5e946d9964937321dc961e66"),
        role : "booking",
        Fname : "krimo",
        LName : "karim",
        Contact : "02154512154",
        email : "booking@gmail.com",
        password : "$2a$08$8.9ieB4aL7eoql2cIHXNEeFjcAqVKoFO/LVXUOLH3c6K5VZxsJfPK",
        avatar : "profile.png",
        created_at : ("2020-04-13T13:48:09.694Z")
    })
    ]

// Drinks Seeder
let drinks = [

    new Drink({
            _id : ("5e87404989624917fc83db12"),
            Name : "namemore",
            Alcohol : "alcoholwoman",
            Type : "newwoman",
            Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            created_at : ("2020-04-03T13:55:21.527Z")
    })
,
    new Drink({
            _id : ("5e948006659dd12f6c3f98dd"),
            Name : "nameal",
            Alcohol : "machei",
            Type : "oldgrils",
            Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            created_at : ("2020-04-13T15:06:46.771Z")
    })
,
    new Drink({
            _id : ("5e974d58e028ec5590e73eb3"),
            Name : "cafee",
            Alcohol : "alcoholone",
            Type : "kdimbzf",
            Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            created_at : ("2020-04-15T18:07:20.957Z")
    })
,
    new Drink({
            _id : ("5e974d65e028ec5590e73eb4"),
            Name : "namepa",
            Alcohol : "oldone",
            Type : "gilrs",
            Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            created_at : ("2020-04-15T18:07:33.488Z")
    })
,
    new Drink({
            _id : ("5e974d72e028ec5590e73eb5"),
            Name : "nametow",
            Alcohol : "choyabrk",
            Type : "children",
            Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            created_at : ("2020-04-15T18:07:46.340Z")
    })
,
    new Drink({
            _id : ("5e985e544815552404e93b47"),
            Name : "nameone",
            Alcohol : "nameone",
            Type : "all types",
            Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            created_at : ("2020-04-16T13:32:04.473Z")
    })
]

// Foods Seeder
let foods = [
    new Food({
        _id : ("5e81ba1051d4f6298052d9d1"),
        Name : "hmiss",
        Price : "201.21",
        Type : "khfif",
        Category : "taklidi",
        Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        created_at : ("2020-04-17T13:55:16.968Z")
    })
,
    new Food({
        _id : ("5e8743d2c23dd44304466840"),
        Name : "loubia",
        Price : "15.21",
        Type : "harra",
        Category : "jdida",
        Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        created_at : ("2020-04-17T13:55:25.556Z")
    })
,
    new Food({
        _id : ("5e974face028ec5590e73eb6"),
        Name : "harakima",
        Price : "17.11",
        Type : "kifahbghit",
        Category : "bghtiha",
        Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        created_at : ("2020-04-17T13:56:17.278Z")
    })
,
    new Food({
        _id : ("5e974fbae028ec5590e73eb7"),
        Name : "kimazman",
        Price : "12.55",
        Type : "khmiraga",
        Category : "gambo",
        Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        created_at : ("2020-04-17T13:55:38.135Z")
    })
,
    new Food({
        _id : ("5e974fc9e028ec5590e73eb8"),
        Name : "khmira",
        Price : "14.22",
        Type : "tadar",
        Category : "kbira",
        Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        created_at : ("2020-04-17T13:55:34.410Z")
    })
,
    new Food({
        _id : ("5e985e694815552404e93b48"),
        Name : "elads",
        Price : "26.67",
        Type : "machibzf",
        Category : "taachta",
        Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        created_at : ("2020-04-17T13:55:29.316Z")
    })
]

// Tables Seeder
let tables = [

    new Table({
    _id : ("5e832c1593129439b8f3bdcb"),
    Name : "classic tow",
    NumberPlace : "6",
    Type : "family",
    Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    created_at : ("2020-03-31T11:40:05.990Z")
    })
,
    new Table({
    _id : ("5e860aabd4c6c7185cd7c39b"),
    Name : "classic one",
    NumberPlace : "2",
    Type : "lovers",
    Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    created_at : ("2020-04-02T15:54:19.023Z")
})
,
new Table({
    _id : ("5e860abdd4c6c7185cd7c39d"),
    Name : "top three",
    NumberPlace : "4",
    Type : "family",
    Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    created_at : ("2020-04-02T15:54:37.815Z")
})
,
new Table({
    _id : ("5e87406389624917fc83db14"),
    Name : "top tow",
    NumberPlace : "2",
    Type : "lovers",
    Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    created_at : ("2020-04-03T13:55:47.103Z")
})
,
new Table({
    _id : ("5e9719fff6ca344ac449dd20"),
    Name : "top one",
    NumberPlace : "1",
    Type : "alone",
    Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    created_at : ("2020-04-15T14:28:15.829Z")
})
,
new Table({
    _id : ("5e971c61dc837626ccdbe3d3"),
    Name : "buttom three",
    NumberPlace : "9",
    Type : "family",
    Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    created_at : ("2020-04-15T14:38:25.835Z")
})
,
new Table({
    _id : ("5e973b4420a0d637b833a1bc"),
    Name : "buttom tow",
    NumberPlace : "8",
    Type : "family",
    Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    created_at : ("2020-04-15T16:50:12.893Z")
})
,
new Table({
    _id : ("5e985dc14815552404e93b43"),
    Name : "bottom one",
    NumberPlace : "4",
    Type : "family",
    Description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    created_at : ("2020-04-16T13:29:37.889Z")
})

]

// Chefs Seeder
let chefs = [

        new Chef({
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
        })
        ,
        new Chef({
        _id : ("5e846726ae23043258731a4a"),
        Fname : "katrin",
        LName : "katrin",
        Email : "katrin@chef.dz",
        Experience : "10 years of job",
        Type : "all types",
        City : "Relizane",
        Postcode : "35350",
        Salary : "600",
        Sex : "woman",
        Birthdate : "2020-04-20",
        created_at : ("2020-04-01T10:04:22.865Z")
    })
    ,
    new Chef({
        _id : ("5e846808a9e5731880461f05"),
        Fname : "kahina",
        LName : "kahina",
        Email : "kahina@chef.dz",
        Experience : "10 years of job",
        Type : "all types",
        City : "Alger",
        Postcode : "35350",
        Salary : "500",
        Sex : "woman",
        Birthdate : "2020-04-10",
        created_at : ("2020-04-01T10:08:08.373Z")
    })
    ,
    new Chef({
        _id : ("5e84688ea9e5731880461f07"),
        Fname : "fatma",
        LName : "fatma",
        Email : "fatma@chef.dz",
        Experience : "10 years of job",
        Type : "all types",
        City : "Sétif",
        Postcode : "35350",
        Salary : "900",
        Sex : "woman",
        Birthdate : "2020-04-26",
        created_at : ("2020-04-01T10:10:22.363Z")
    })
    ,
    new Chef({
        _id : ("5e846898a9e5731880461f08"),
        Fname : "fatiha",
        LName : "fatiha",
        Email : "fatiha@chef.dz",
        Experience : "10 years of job",
        Type : "all types",
        City : "El Oued",
        Postcode : "35350",
        Salary : "1000",
        Sex : "man",
        Birthdate : "2020-04-10",
        created_at : ("2020-04-01T10:10:32.230Z")
    })
    ,
    new Chef({
        _id : ("5e8468a4a9e5731880461f09"),
        Fname : "ibrahim",
        LName : "ibrahim",
        Email : "ibrahim@chef.dz",
        Experience : "10 years of job",
        Type : "all types",
        City : "Boumerdès",
        Postcode : "35350",
        Salary : "300",
        Sex : "man",
        Birthdate : "2020-04-10",
        created_at : ("2020-04-01T10:10:44.512Z")
    })
    ,
    new Chef({
        _id : ("5e8468bfa9e5731880461f0b"),
        Fname : "lotfi",
        LName : "lotfi",
        Email : "lotfi@chef.dz",
        Experience : "10 years of job",
        Type : "all types",
        City : "Skikda",
        Postcode : "35000",
        Salary : "700",
        Sex : "man",
        Birthdate : "2020-04-10",
        created_at : ("2020-04-01T10:11:11.177Z")
    })

]

// Waiters Seeder
let waiters = [

    new Waiter({
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
        })
,
new Waiter({
            _id : ("5e8331b902974e08c421dcfb"),
            Fname : "soufian",
            LName : "soufian",
            Email : "soufian@waiter.dz",
            City : "El Tarf",
            Postcode : "35000",
            Salary : "300",
            Sex : "man",
            Birthdate : "2020-04-17",
            created_at : ("2020-03-31T12:04:09.333Z")
        })
,
new Waiter({
            _id : ("5e8332a409607d33b4f03d33"),
            Fname : "boualam",
            LName : "boualam",
            Email : "boualam@waiter.dz",
            City : "Aïn Témouchent",
            Postcode : "35000",
            Salary : "800",
            Sex : "man",
            Birthdate : "2020-04-10",
            created_at : ("2020-03-31T12:08:04.201Z")
        })
,
new Waiter({
            _id : ("5e8332d8f4c16214a87614b5"),
            Fname : "rachid",
            LName : "rachid",
            Email : "rachid@waiter.dz",
            City : "Bouira",
            Postcode : "35350",
            Salary : "200",
            Sex : "man",
            Birthdate : "2020-04-19",
            created_at : ("2020-03-31T12:08:56.224Z")
        })
,
new Waiter({
            _id : ("5e9755a9e028ec5590e73ebb"),
            Fname : "tarek",
            LName : "tarek",
            Email : "tarek@waiter.dz",
            City : "Guelma",
            Postcode : "35000",
            Salary : "700",
            Sex : "man",
            Birthdate : "2020-04-23",
            created_at : ("2020-04-15T18:42:49.407Z")
        })
,
new Waiter({
            _id : ("5e98627d961ec759b0217a69"),
            Fname : "karim",
            LName : "karim",
            Email : "karim@waiter.dz",
            City : "El Bayadh",
            Postcode : "35000",
            Salary : "400",
            Sex : "man",
            Birthdate : "2020-04-15",
            created_at : ("2020-04-16T13:49:49.621Z")
    })

]

let cstomers = [

    new Customer({
        _id : ("5e822f29b0f7790a685ac372"),
        Fname : "younes",
        LName : "younes",
        Contact : "02145121210",
        Email : "younes@mail.dz",
        created_at : ("2020-03-30T17:40:57.452Z")
    })
,
new Customer({
        _id : ("5e822f2eb0f7790a685ac373"),
        Fname : "smail",
        LName : "smail",
        Contact : "02150049734",
        Email : "smail@mail.dz",
        created_at : ("2020-03-30T17:41:02.440Z")
    })
,
new Customer({
        _id : ("5e822f44b0f7790a685ac374"),
        Fname : "farouk",
        LName : "farouk",
        Contact : "02100212154",
        Email : "farouk@mail.dz",
        created_at : ("2020-03-30T17:41:24.076Z")
    })
,
new Customer({
        _id : ("5e822f8e1b630833f8163fb7"),
        Fname : "alilou",
        LName : "alilou",
        Contact : "02155215146",
        Email : "alilou@mail.dz",
        created_at : ("2020-03-30T17:42:38.003Z")
    })
,
new Customer({
        _id : ("5e822fa01b630833f8163fb8"),
        Fname : "hicham",
        LName : "hicham",
        Contact : "02454042442",
        Email : "hicham@mail.com",
        created_at : ("2020-03-30T17:42:56.887Z")
    })
,
new Customer({
        _id : ("5e822fd59d92e605285b5396"),
        Fname : "lotfi",
        LName : "lotfi",
        Contact : "02777845127",
        Email : "lotfi@mail.com",
        created_at : ("2020-03-30T17:43:49.826Z")
    })
,
new Customer({
        _id : ("5e823669a9e25a2a189dfd7d"),
        Fname : "mohammed",
        LName : "mohammed",
        Contact : "02874512145",
        Email : "mohammed@mail.dz",
        created_at : ("2020-03-30T18:11:53.279Z")
    })
,
new Customer({
        _id : ("5e95eda2e3b07d1f2441245f"),
        Fname : "ibrahim",
        LName : "ibrahim",
        Contact : "02154245454",
        Email : "ibrahim@mail.com",
        created_at : ("2020-04-14T17:06:42.329Z")
    })
,
new Customer({
        _id : ("5e97381b21b9df33a8e492b9"),
        Fname : "karim",
        LName : "karim",
        Contact : "02152140211",
        Email : "karim@mail.dz",
        created_at : ("2020-04-15T16:36:43.689Z")
    })
,
new Customer({
        _id : ("5e9864b2b8ffe7594876d724"),
        Fname : "hakim",
        LName : "hakim",
        Contact : "02135545544",
        Email : "hakim@mail.dz",
        created_at : ("2020-04-16T13:59:14.863Z")
})

]

// Booking Seeder
let Booking = [

    new booking({
        _id : ("5e8626c48b66dd116813b732"),
        Date : "2020-04-16",
        time : "6:00am",
        number_place : "3",
        CustomerID : "5e9864b2b8ffe7594876d724",
        created_at : ("2020-04-17T14:31:08.158Z")
})
,
new booking({
        _id : ("5e8626d18b66dd116813b733"),
        Date : "2020-04-07",
        time : "3:00pm",
        number_place : "1",
        CustomerID : "5e822f29b0f7790a685ac372",
        created_at : ("2020-04-17T14:32:38.467Z")
    })
    ,
    new booking({
        _id : ("5e8626d78b66dd116813b734"),
        Date : "2020-04-07",
        time : "8:30am",
        number_place : "5",
        CustomerID : "5e823669a9e25a2a189dfd7d",
        created_at : ("2020-04-17T14:31:30.795Z")        
    })
    ,
    new booking({
        _id : ("5e8626dd8b66dd116813b735"),
        Date : "2020-04-07",
        time : "8:00pm",
        number_place : "5",
        CustomerID : "5e822f44b0f7790a685ac374",
        created_at : ("2020-04-17T14:31:41.845Z")
    })
    ,
    new booking({
        _id : ("5e8626e08b66dd116813b736"),
        Date : "2020-04-07",
        time : "11:30am",
        number_place : "2",
        CustomerID : "5e822fa01b630833f8163fb8",
        created_at : ("2020-04-17T14:31:53.519Z")
    })
    ,
    new booking({
        _id : ("5e8743316b11b8141425d1fa"),
        Date : "2020-04-19",
        time : "7:00am",
        number_place : "2",
        CustomerID : "5e822fd59d92e605285b5396",
        created_at : ("2020-04-17T14:32:08.019Z")
    })
    ,
    new booking({
        _id : ("5e936340c22ba0333c6b6acd"),
        Date : "2020-04-05",
        time : "2:00pm",
        number_place : "3",
        CustomerID : "5e822f2eb0f7790a685ac373",
        created_at : ("2020-04-17T14:32:19.911Z")
    })
    ,
    new booking({
        _id : ("5e96092c3d82114fe85b004c"),
        Date : "2020-04-15",
        time : "10:00am",
        number_place : "2",
        CustomerID : "5e95eda2e3b07d1f2441245f",
        created_at : ("2020-04-17T14:32:29.392Z")
    })
    ,
    new booking({
        _id : ("5e9870374288ab5fc0505e19"),
        Date : "2020-04-01",
        time : "11:00am",
        number_place : "3",
        CustomerID : "5e97381b21b9df33a8e492b9",
        created_at : ("2020-04-17T14:31:19.091Z")
})

]

// Bills Seeder
let bills = [

    new Bill({
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
    }),
    new Bill({
        _id : ("5e96fd97284c955f9413dad2"),
        Sub_Total : "96.62",
        Vat : "50.11",
        Total : "400.22",
        drink_id : "5e974d65e028ec5590e73eb4",
        food_id : "5e81ba1051d4f6298052d9d1",
        waiter_id : "5e8332d8f4c16214a87614b5",
        table_id : "5e973b4420a0d637b833a1bc",
        CustomerID : "5e822fd59d92e605285b5396",
        created_at : ("2020-04-15T12:27:03.389Z")
    }),
    new Bill({
        _id : ("5e974b7de028ec5590e73eb2"),
        Sub_Total : "99.12",
        Vat : "44.33",
        Total : "500.22",
        drink_id : "5e974d72e028ec5590e73eb5",
        food_id : "5e974fc9e028ec5590e73eb8",
        waiter_id : "5e9755a9e028ec5590e73ebb",
        table_id : "5e87406389624917fc83db14",
        CustomerID : "5e822f8e1b630833f8163fb7",
        created_at : ("2020-04-15T17:59:25.592Z")
    }),
    new Bill({
        _id : ("5e97634f67d1c44b0c17ec39"),
        Sub_Total : "45.12",
        Vat : "55.22",
        Total : "152.22",
        drink_id : "5e974d65e028ec5590e73eb4",
        food_id : "5e974face028ec5590e73eb6",
        waiter_id : "5e8332a409607d33b4f03d33",
        table_id : "5e860abdd4c6c7185cd7c39d",
        CustomerID : "5e822f44b0f7790a685ac374",
        created_at : ("2020-04-15T19:41:03.714Z")
    }),
    new Bill({
        _id : ("5e985e3d4815552404e93b46"),
        Sub_Total : "88.22",
        Vat : "14.12",
        Total : "50.15",
        drink_id : "5e974d58e028ec5590e73eb3",
        food_id : "5e974face028ec5590e73eb6",
        waiter_id : "5e8332a409607d33b4f03d33",
        table_id : "5e87406389624917fc83db14",
        CustomerID : "5e97381b21b9df33a8e492b9",
        created_at : ("2020-04-16T13:31:41.371Z")
    }),
    new Bill({
        _id : ("5e99770eedfeb95ed0fbae20"),
        Sub_Total : "15.12",
        Vat : "10.22",
        Total : "200.25",
        drink_id : "5e974d65e028ec5590e73eb4",
        food_id : "5e974fbae028ec5590e73eb7",
        waiter_id : "5e81ae8260cd552b58714cfc",
        table_id : "5e971c61dc837626ccdbe3d3",
        CustomerID : "5e9864b2b8ffe7594876d724",
        created_at : ("2020-04-17T09:29:50.809Z")
})

]

// excute loop all objects
users.forEach( (users)=> {
    users.save( (err)=> {
        if (err) {
            console.log(err)
        }
    })
})

// excute loop all objects
drinks.forEach( (drinks)=> {
    drinks.save( (err)=> {
        if (err) {
            console.log(err)
        }
    })
})

// excute loop all objects
foods.forEach( (foods)=> {
    foods.save( (err)=> {
        if (err) {
            console.log(err)
        }
    })
})

// excute loop all objects
tables.forEach( (tables)=> {
    tables.save( (err)=> {
        if (err) {
            console.log(err)
        }
    })
})

// excute loop all objects
chefs.forEach( (chefs)=> {
    chefs.save( (err)=> {
        if (err) {
            console.log(err)
        }
    })
})

// excute loop all objects
waiters.forEach( (waiters)=> {
    waiters.save( (err)=> {
        if (err) {
            console.log(err)
        }
    })
})

// excute loop all objects
cstomers.forEach( (cstomers)=> {
    cstomers.save( (err)=> {
        if (err) {
            console.log(err)
        }
    })
})

// excute loop all objects
Booking.forEach( (Booking)=> {
    Booking.save( (err)=> {
        if (err) {
            console.log(err)
        }
    })
})

// excute loop all objects
bills.forEach( (bills)=> {
    bills.save( (err)=> {
        if (err) {
            console.log(err)
        }
    })
})