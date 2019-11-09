const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon'
})

connection.connect(function (err) {
    if (err) {
        throw (err)
    }
    makeTable();
    console.log('connection successful');
})

const makeTable = () => {
    connection.query('SELECT * FROM products', (err, res) => {
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].itemid + '|| '
                + res[i].productname + '||'
                + res[i].departmentname + '||'
                + res[i].price + '||'
                + res[i].stockquantity + '||'
                + '\n')
        }
        prompCustomer(res);
    })
}

const prompCustomer = (res) => {
    inquirer.prompt([{
        type: 'input',
        name: 'choice',
        message: 'what would you like to purchase? [QUIT with Q]'
    }]).then((answer) => {
        const correct = false;
        if (answer.choice.toUpperCase() === 'Q') {
            process.exit();
        }
        for (let i = 0; i < res.length; i++) {
            if (res[i].productname === answer.choice) {
                correct = true;
                const products = answer.choice;
                const id = i
                inquirer.prompt({
                    type: 'input',
                    name: 'quant',
                    message: 'how many do you want to buy?',
                    validate: (value) => {
                        if (isNaN(value) === false) {
                            return true;
                        } else {
                            return false
                        }
                    }
                }).then((answer) => {
                    if ((res[id].stockquantity - answer.quant) > 0) {
                        connection.query("UPDATE products SET stockquantity= '" + (res[id].stockquantity - answer.quant)
                            + "' WHERE productname = '" + products + "'", (err, res2) => {
                                console.log('product bought!!!');
                                makeTable();
                            })
                    } else {
                        console.log('wrong selection');
                        prompCustomer(res);
                    }
                })
            }
        }
        if (i == res.length && correct == false) {
            console.log('not a vsalid selection');;
            prompCustomer(res);
        }
    })
}
