var page = require('webpage').create();
var url = 'http://truyencv.com/pham-nhan-tu-tien-chi-tien-gioi-thien/';


// page.onResourceRequested = function(request) {
//   console.log('Request ' + JSON.stringify(request, undefined, 4));
// };
// page.onResourceReceived = function(response) {
//   console.log('Receive ' + JSON.stringify(response, undefined, 4));
// };
page.viewportSize = {
    width: 1024,
	height: 768
}
page.clipRect = {
    top: 0,
    left: 0,
    width: 1024,
    height: 768 
  };
page.open(url, function(status) {
    if(status !== 'success')
    {
        console.log('Connected Err!!');
        phantom.exit();
    }
    console.log('Connected!!');
    page.render('pntt.png');
    var title = page.evaluate(function() {
        return document.title;
      });
    let btnTruyen = page.evaluate(function() {
        return document.getElementsByClassName('btn-truyencv').length;
      });
    console.log('btnTruyen '+ btnTruyen);
    console.log('title '+title);
    // var el = document.getElementsByClassName(".btn-truyencv");
    // var el = document.querySelector(".btn-truyencv");
    // page.evaluate(function() {
    //     el.initMouseEvent(
    //         "click",
    //         true /* bubble */, true /* cancelable */,
    //         window, null,
    //         0, 0, 0, 0, /* coordinates */
    //         false, false, false, false, /* modifier keys */
    //         0 /*left*/, null
    //     );
    //     page.render('pntt2.png');
    // })
    // var ua = page.evaluate(function() {
    // return document.getElementById('qua').textContent;
    // });
    // console.log(ua);
    // page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
    // page.evaluate(function() {
    //     console.log('Inclued js');
    // });
    // });
    // page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js',(cb)=>{
    //     console.log('kiki');
    //     page.evaluate(function() {
    //         $("#f_ua").click();
    //         console.log('Clicked');
    //       });
    //     page.evaluate(function(){
    //         let lstChap = document.getElementById('list_container').textContent;
    //         console.log('lstChap' + JSON.stringify(lstChap));

    //     })
    // });

    phantom.exit();
});

// var webpage = require('webpage'), page = webpage.create(), system  = require('system'), webadd = null, fileName = '', t;
// webadd = 'http://google.com';
// fileName = 'image';
//    t = Date.now();
// page.settings.userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3";
// page.open(webadd,function(status){
//     if (status === "success") {
//         t = Date.now() - t;
//         console.log('Loading Time is '+ t +' msec');
//         page.render(fileName +'.jpg');
//         console.log('iPhone Screen captures is done!');
//         phantom.exit();
//     }
// });