var User = require('../models/user');

var adminEmail = process.env.ADMIN_EMAIL;
var adminPassword = process.env.ADMIN_PASSWORD;

User.findOne({ email: adminEmail })
    .then(user => {
        if (!user) {
            let admin = new User();
            admin.password = admin.hashPassword(adminPassword);
            admin.email = adminEmail;
            admin.name = "Admin";
            admin.admin = true;
            admin.save()
                // .then(data => {
                //     console.log(data)
                // })
                .catch(err => {
                    console.log(err)
                })
        }
    })
    .catch(err => {
        console.log(err);
    })