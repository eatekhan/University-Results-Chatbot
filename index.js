
const {Builder, By, Key, util} = require("selenium-webdriver")
const chrome = require('selenium-webdriver/chrome')
const options = new chrome.Options();
options.addArguments('--headless');

async function ex(rollno){
    let driver = new Builder().forBrowser("chrome").setChromeOptions(options).build();
    await driver.get("https://www.osmania.ac.in/res07/20231225.jsp");
    await driver.findElement(By.name('htno')).sendKeys(rollno,Key.RETURN)
    const gpa = await driver.findElement(By.xpath('//*[@id="AutoNumber5"]/tbody/tr[3]/td[3]/b/font'))
    const mygpa = await gpa.getText().then((x)=>{
        return x
    })
    
    await driver.quit()
    console.log(mygpa)
    return mygpa
}

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req, res){
    res.render('index')
})

app.get('/submit', function(req,res){
    res.render('submit')
})

app.post('/', urlencodedParser, function(req, res){
    const rollno = req.body.Rollno
    console.log(rollno)
    async function plswork(){
        var x = await ex(rollno);
        console.log(`this is insidee ${x}`)
        res.render("submit",{x})
    }
    plswork()
    // const x = Math.floor(Math.random()*8 + 5)
    // console.log(x)
    // res.render('submit',{x})
})

app.listen(3000,() =>{
    console.log("Listening")
})