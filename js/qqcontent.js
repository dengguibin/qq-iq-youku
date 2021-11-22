var windowHref = window.location.href;
if (windowHref.indexOf("qq.") != -1) {
    getSetCookie();
}
if (windowHref.indexOf(".qq.com/biu/u") != -1) {
    window.close();
}

// 清理掉cookie即可，无需禁用元素事件
// document.addEventListener('DOMContentLoaded',function () {
window.onload= function(){
    if (window.location.host.indexOf("qq.") != -1) {
        var currentP = document.getElementsByClassName("txp_menuitem txp_current")[0];
        var definition = currentP.firstElementChild.innerText;

        if (definition.indexOf("270") != -1) {
            currentP.previousElementSibling
                    .previousElementSibling
                    .previousElementSibling
                    .click();
        }

        if (definition.indexOf("480") != -1) {
            currentP.previousElementSibling
                    .previousElementSibling
                    .click();
        }

        if (definition.indexOf("720") != -1) {
            currentP.previousElementSibling.click();
        }

        setTimeout(function () {
            clearCookie();
        },1000*5)
    }
};

function clearCookie() {
    chrome.runtime.sendMessage({domain: "qq",operation: "clearCookie"}, function(response) {
        console.log(response);
    });
}

function getSetCookie() {
    chrome.runtime.sendMessage({domain: "qq",operation: "getCookie"}, function(response) {
        console.log(response);
        for (const responseElement of response) {
            var name = responseElement.name;
            var value = responseElement.value;
            var domain = responseElement.domain;
            document.cookie=name + "=" + value + ";domain=" + domain;
        }
    });
}