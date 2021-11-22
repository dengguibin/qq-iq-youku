$(function () {
    $('#money').click(function () {
        window.open(chrome.extension.getURL("img/money.png"));
    });

    $('#profile').click(function () {
        chrome.tabs.create({
            url:"https://gitee.com/deng-bin-red-rabbit-in-horse/qqvipclient/"
        },function(tab){
            console.log(tab)
        });
    });
})