var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

// var casper = require('casper').create();
// casper.start('http://casperjs.org/');

// casper.then(function() {
//     this.echo('First Page: ' + this.getTitle());
// });


request('http://truyencv.com/pham-nhan-tu-tien-chi-tien-gioi-thien/', function (err, res, body) {
    if(err) {
        console.log('err', err);
    }

    var $ = cheerio.load(body);
    var newestChap = $('.list-overview .item .item-value a').text();
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
                }
                // fs.writeFile('jsonfile.json', json, 'utf8', callback); 
        }
    });
    
    // var rate = $('#myrate');
    // rate.each( (i, e)=>{
    //     console.log(i);
    //     console.log(e.type);
    // });
    // console.log('rating '+rate);

    // var btnContinueReading = $('.btn-truyencv').text();
    // var obj1 = [];
    // $('.btn-truyencv').each( (i , e)=>{    
    //     console.log(e);
    // });
    // console.log('log '+ JSON.stringify(obj1));
    // var json = JSON.stringify(obj1);
    // fs.writeFile('jsonfile.json', json, 'utf8', (err)=>{
    //     if (err) throw err;
    //     console.log('The file has been saved!');
    // });

    // fs.readFile('jsonfile.json', 'utf8', function readFileCallback(err, data)
    // {
    //     if (err)
    //     {
    //          console.log(err);
    //     } 
    //     else 
    //     {
    //         obj = JSON.parse(data); 
    //         obj.table.push({id: 2, square:3}); 
    //         json = JSON.stringify(obj); 
    //         fs.writeFile('jsonfile.json', json, 'utf8', callback); 
    //     }
    // });


    
    // console.log('truyen :' + btnContinueReading) ;

//     console.log('statusCode', res.statusCode);
//     var $ = cheerio.load(body);
//     $('#list_container .row').each(function(index, element) {
//         console.log('index: ', index);
//         // console.log('element: ', element);
//         // var data = $(this).find('dd:nth-of-type(3) > a').map(function() {
//         //     return $(this).text();
//         // }).get().join('');
//         // console.log('data', data);
//         // var author= JSON.stringify(data);
     
//         // fs.appendFileSync('author.json', 
//         //     "{\n" + ' "author": ' + ' " ' + author + ' " ' + '}'
//         // );
//     });
})