var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
const nodemailer = require('nodemailer');
const http = require('http');
const port = 3003;

var count = 0;
var timer = setInterval(function() {
        if(count++ < 1) {
            return Crawler();
        }
        clearTimeout(timer);
    
    }, 1000);
function Crawler()
{
    request('http://truyencv.com/pham-nhan-tu-tien-chi-tien-gioi-thien/', function (err, res, body) 
    {
        var $ = cheerio.load(body);
        var newestChap = $('.list-overview .item .item-value a').text();
        var detailUrl = $('.list-overview .item .item-value a').attr('href');
        console.log(detailUrl);
        request(detailUrl, (err, res, body)=>{
            let cheerioDetail = cheerio.load(body);
            let contentDetail = cheerioDetail('.truyencv-read-content .content').text();
            console.log('content '+ content);
            sendEmail(newestChap,contentDetail);
        });
    
        var obj = {
            'newestChap' : newestChap
        }
        var json = JSON.stringify(obj);
        fs.readFile('newchap.json', function readFileCallback(err, data)
        {
            if (err)
            {
                console.log(err);
                fs.writeFile('newchap.json', json, 'utf8', (err)=>{
                    if (err) throw err;
                    console.log('Đã có chương mới!');
                    console.log('Cập nhật db thành công!');
                });
                sendEmail();
            } 
            else 
            {
                obj = JSON.parse(data); 
                var dbChap = obj.newestChap;
                if(newestChap !== dbChap)
                {
                    fs.writeFile('newchap.json', json, 'utf8', (err)=>{
                        if (err) throw err;
                        console.log('Đã có chương mới!');
                        console.log('Cập nhật db thành công!');
                    });
                    
                    sendEmail();
                }
                else{
                    console.log('Chưa có chương mới!');
                }
            }
        });
    })
}

function sendEmail(subject, content)
{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user : 'hungfeck@gmail.com',
            pass: 'Hungfeck7640'
        }
      });
    var mailOptions = {
        from : 'hungfeck@gmail.com',
        to: 'quochung4@vtvcab.vn',
        subject : 'Pham nhan tu tien ra chuong moi ' + subject,
        text : content
    }
    transporter.sendMail(mailOptions, function(err, info){
        if(err) 
        {
            console.log('err', err);
        }
        else 
        {
            console.log('Đã gửi email: ' + info.response);
        }
    });
}
