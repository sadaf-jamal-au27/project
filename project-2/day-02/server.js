const expHbs = require('express-handlebars')
// const cookieParser = require('cookie-parser')
const session = require('express-session')
const myStore = new session.MemoryStore()

const express = require('express');
const app = express();

const user = [
    {
        name: "John Doe",
        email: 'johnDoe@jasper.info',
        password: '123abc'
    },
    {
        name: "Anagram Singh",
        email: 'anagram@jasper.info',
        password: '123abc'
    }
]

app.engine('hbs', expHbs({ extname: 'hbs'  }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

// app.use(cookieParser())
app.use(session({
    secret: "Apple", //asdase1q23axczxc123axcewr34tlvsdf65s472458754687654
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 9000000
    },
    store: myStore
}))

app.use(express.urlencoded({extended: true}))



app.get('/', (req, res) => {

    res.render('home')

})

app.get('/profile', (req,res) => {
    // console.log(req.headers.cookie)
    // console.log(req.cookies)

    console.log(myStore)

    // console.log('IN Profile', req.session)

    if (req.session.isLoggedIn === true) {
        
        res.render('profile', req.session.user)
        return
    }

    res.redirect('/')
    
})

app.post('/login', (req,res) => {
    const {email, password} = req.body

    // console.log('In LOGIN',req.session)

    for (let index = 0; index < user.length; index++) {
        const userObj = user[index];

        if (userObj.email === email && userObj.password === password) {
            

            req.session.isLoggedIn = true
            req.session.user = userObj

            res.redirect('/profile')
            return
        }
        
    }

    res.send("User not found")
})


app.listen(3000, () => console.log('Server Started'))