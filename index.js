require('chromedriver')
const {Builder, By, Key, util} = require("selenium-webdriver")

async function ex(rollno){
    let driver = new Builder().forBrowser("chrome").build();
    await driver.get("https://www.osmania.ac.in/res07/20220625.jsp");
    await driver.findElement(By.name('htno')).sendKeys(rollno,Key.RETURN)
    const gpa = await driver.findElement(By.xpath('//*[@id="AutoNumber5"]/tbody/tr[3]/td[2]/b'))
    const mygpa = await gpa.getText().then((x)=>{
        return x
    })
    
    await driver.quit()
    console.log(mygpa)
    return mygpa
}


    // await driver.takeScreenshot().then(
    //     function(image, err) {
    //         require('fs').writeFile('out.png', image, 'base64', function(err) {
    //             console.log(err);
    //         });
    //     }
    // );

function testing(string){
    return `${string}`;
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
    const sendreq = ex(rollno)
    async function plswork(){
        var x = await ex(rollno);
        console.log(`this is insidee ${x}`)
        res.render("submit",{x})
    }
    plswork();
})

app.listen(3000,() =>{
    console.log("Listening")
})