// 监听来自contentScrip的通知
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    if (request.domain == "iqiyi") {
        if (request.operation == "getCookie") {
            var url = "http://duqiu.natapp1.cc/cookiecollection/cookie-servlet?domain=iqiyi";
            let xhr = new XMLHttpRequest();
            // 使用同步
            xhr.open("GET",url,false);
            xhr.onload = function () {
                var responseText = xhr.responseText;
                const arr =  JSON.parse(responseText);
                sendResponse(arr);
            }
            xhr.onerror = function () {
                alert("请求出错");
            }
            xhr.send();
        } else if (request.operation == "clearCookie") {
            chrome.cookies.getAll({domain:".iqiyi.com"},function(cks) {
                for (const ck of cks) {
                    var newCookie = {};
                    newCookie.name=ck.name;
                    newCookie.url="https://www.iqiyi.com/";
                    newCookie.storeId=ck.storeId;
                    chrome.cookies.remove(newCookie);

                    newCookie.url = "https://" + ck.domain + ck.path;
                    chrome.cookies.remove(newCookie);
                }
            });
        }
    } else if (request.domain == "qq") {
        if (request.operation == "getCookie") {
            console.log(request, sender, sendResponse);
            let xhr = new XMLHttpRequest();
            // 使用同步
            xhr.open("GET","http://duqiu.natapp1.cc/cookiecollection/cookie-servlet?domain=qq",false);
            xhr.onload = function () {
                var responseText = xhr.responseText;
                const arr =  JSON.parse(responseText);
                sendResponse(arr);
            }
            xhr.onerror = function () {
                alert("请求出错");
            }
            xhr.send();
        } else if (request.operation == "clearCookie") {
            setTimeout(function () {
                chrome.cookies.getAll({domain:".qq.com"},function(cks) {
                    for (const ck of cks) {
                        var newCookie = {};
                        newCookie.name=ck.name;
                        newCookie.storeId=ck.storeId;

                        newCookie.url = "https://v.qq.com" + ck.path;
                        chrome.cookies.remove(newCookie);

                        newCookie.url = "https://video.qq.com" + ck.path;
                        chrome.cookies.remove(newCookie);

                        newCookie.url = "https://" + ck.domain + ck.path;
                        chrome.cookies.remove(newCookie);
                    }
                });
            },1000*3);

        }
    }else if (request.domain == "youku") {
        if (request.operation == "getCookie") {
            console.log(request, sender, sendResponse);
            let xhr = new XMLHttpRequest();
            // 使用同步
            xhr.open("GET","http://duqiu.natapp1.cc/cookiecollection/cookie-servlet?domain=youku",false);
            xhr.onload = function () {
                var responseText = xhr.responseText;
                // console.log(responseText);
                const arr =  JSON.parse(responseText);
                sendResponse(arr);
            }
            xhr.onerror = function () {
                alert("请求出错");
            }
            xhr.send();
        } else if (request.operation == "clearCookie") {
            setTimeout(function () {
                chrome.cookies.getAll({domain:".youku.com"},function(cks) {
                    for (const ck of cks) {
                        var newCookie = {};
                        newCookie.name=ck.name;
                        newCookie.storeId=ck.storeId;
                        newCookie.url = "https://" + ck.domain + ck.path;
                        chrome.cookies.remove(newCookie);
                    }
                });
            },1000*3);

        }
    }

});



