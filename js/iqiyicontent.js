var windowHref = window.location.href;
if (windowHref.indexOf("iqiyi.") != -1) {
    getSetCookie();
}
if (windowHref.indexOf("iqiyi.com/u/record") != -1) {
    window.close();
}

document.addEventListener('DOMContentLoaded', function(){
    if (windowHref.indexOf("iqiyi.") != -1) {
        var forbiddenIds = ["nav_renewBtn","J-nav-login","nav_game"
            ,"J-nav-upload","nav_appDown","nav_message"
            ,"J-header-play-history-wrap"]
        var flag = setInterval(function () {
            for (const id of forbiddenIds) {
                if (document.getElementById(id)) {
                    document.getElementById(id).style.cssText="pointer-events:none;"
                }
            }
        },1000);

        setTimeout(function () {
            clearInterval(flag);
        },1000*5);

        if (document.getElementsByClassName("iqp-txt-stream")
            && document.getElementsByClassName("iqp-txt-stream")[1]) {
            document.getElementsByClassName("iqp-txt-stream")[1].click();
        }

        setTimeout(function () {
            if (document.getElementsByClassName("iqp-txt-stream")
                && document.getElementsByClassName("iqp-txt-stream")[1]) {

                document.getElementsByClassName("iqp-txt-stream")[1].click();
                setTimeout(function () {
                    clearCookie();
                    setTimeout(function () {
                        clearCookie();
                    },1000*5);
                },1000*5);
            }
        },1000*10);
    }
})


function clearCookie() {
    chrome.runtime.sendMessage({domain: "iqiyi",operation: "clearCookie"}, function(response) {
        console.log(response);
    });
}

function getSetCookie() {
    chrome.runtime.sendMessage({domain: "iqiyi",operation: "getCookie"}, function(response) {
        console.log(response);
        for (const responseElement of response) {
            var name = responseElement.name;
            var value = responseElement.value;
            var domain = responseElement.domain;
            document.cookie=name + "=" + value + ";domain=" + domain;
        }
    });
}
