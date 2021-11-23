var serverUrl = "http://duqiu.natapp1.cc/cookiecollection/cookie-servlet"
var clearInterval = 1000*5

// 监听来自contentScrip的通知
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    if (request.domain == "iqiyi") {
        if (request.operation == "getCookie") {
            getSendCookie("iqiyi",sendResponse)
        } else if (request.operation == "clearCookie") {
            chrome.cookies.getAll({domain:".iqiyi.com"},function(cks) {
                clearCookies(cks)
            });
        }
    } else if (request.domain == "qq") {
        if (request.operation == "getCookie") {
            getSendCookie("qq",sendResponse)
        } else if (request.operation == "clearCookie") {
            setTimeout(function () {
                chrome.cookies.getAll({domain:".qq.com"},function(cks) {
                    clearCookies(cks)
                });
            },1000*3);

        }
    }else if (request.domain == "youku") {
        if (request.operation == "getCookie") {
            getSendCookie("youku",sendResponse)
        } else if (request.operation == "clearCookie") {
            setTimeout(function () {
                chrome.cookies.getAll({domain:".youku.com"},function(cks) {
                    clearCookies(cks)
                });
            },1000*3);

        }
    }

});

function clearCookies(cks) {
    for (const ck of cks) {
        var newCookie = {};
        newCookie.name=ck.name;
        newCookie.storeId=ck.storeId;
        newCookie.url = "https://" + ck.domain + ck.path;
        chrome.cookies.remove(newCookie);
    }
}

function getSendCookie(domain,sendResponse) {
    var url;
    if (domain == "qq") {
        url = serverUrl + "?domain=qq"
    } else if (domain == "iqiyi") {
        url = serverUrl + "?domain=iqiyi"
    } else if (domain == "youku") {
        url = serverUrl + "?domain=youku"
    }

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
}

