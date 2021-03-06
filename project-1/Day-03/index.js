const fileUpload = require('express-fileupload')
const expHbs = require('express-handlebars')
const express = require('express');
const app = express();


app.engine('hbs', expHbs({ extname: 'hbs'  }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
// limitHandler: function(req, res, next){

//     if (req.files.testFile && req.files.testFile.size <= 34000) {
//         next()
//     }else{
//         res.send({limitCrossed: true})
//     }
// }
app.use(fileUpload({
    // debug: true,
    // abortOnLimit: true,
    // limits: {
    //     fileSize: 34000
    // },

})) //express to use express-fileupload

app.use(express.urlencoded({extended: true}))



app.get('/', (req, res) => {

    res.render('home')

})

app.post('/profile', (req, res) => {

    console.log(req.body)
    const {name, email, password} = req.body
    
    res.render('profile')
    
})



/////////////////////////////////
app.get('/uploadDemo', (req, res) => {
    res.render('uploadDemo')
})


app.post('/handleUpload', (req, res) => {

    console.log(req.body)
    console.log(req.files)
    let myFile = req.files.testFile

    myFile.mv(`./public/uploads/${myFile.md5}-${myFile.name}`, (err) => {
        if (err) {
            res.send({uploaded: false})
            return
        }
        res.send({uploaded: true})
    })
})

const user = [{
    email: 'johnDoe@jasper.info',
    password: '123abc'
},
{
    email:'abc@def.com',
    password: '654def'
}]

app.post('/login', (req, res => {
    const {email, password} = req.body
    for (let index = 0; index <user.length; index++){
        const userObj = array[index];

        if(userObj.email === email && userobj.password === password){
            res.cookies('userIdentified', userObj.email)
            res.redirect('/profile')
            break

        }
    }

    res.json("User not found")

}))


app.listen(3000, () => console.log('Server Started'))