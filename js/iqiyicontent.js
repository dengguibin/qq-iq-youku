var windowHref = window.location.href;
if (windowHref.indexOf("iqiyi.") != -1) {
    getSetCookie();
}
if (windowHref.indexOf("iqiyi.com/u/record") != -1) {
    window.close();
}

// 禁止浏览私人信息
// 设置高清
// 清理cookie
document.addEventListener('DOMContentLoaded', function(){
    if (windowHref.indexOf("iqiyi.") != -1) {
        var flag = setInterval(function () {
            if (document.getElementById("nav_renewBtn")) {
                document.getElementById("nav_renewBtn").style.cssText="pointer-events:none;"
            }
            if (document.getElementById("J-nav-login")) {
                document.getElementById("J-nav-login").style.cssText="pointer-events:none;"
            }
            if (document.getElementById("nav_game")) {
                document.getElementById("nav_game").style.cssText="pointer-events:none;"
            }
            if (document.getElementById("J-nav-upload")) {
                document.getElementById("J-nav-upload").style.cssText="pointer-events:none;"
            }
            if (document.getElementById("nav_appDown")) {
                document.getElementById("nav_appDown").style.cssText="pointer-events:none;"
            }
            if (document.getElementById("nav_message")) {
                document.getElementById("nav_message").style.cssText="pointer-events:none;"
            }
            if (document.getElementById("J-header-play-history-wrap")) {
                document.getElementById("J-header-play-history-wrap").style.cssText="pointer-events:none;"
            }
            if (document.getElementById("J-nav-login")) {
                document.getElementById("J-nav-login").style.cssText="pointer-events:none;"
            }
        },1000);

        setTimeout(function () {
            clearInterval(flag);
        },1000*5);

        setTimeout(function () {
            if (document.getElementsByClassName("iqp-txt-stream")
                && document.getElementsByClassName("iqp-txt-stream")[1]) {

                document.getElementsByClassName("iqp-txt-stream")[1].click();
                setTimeout(function () {
                    clearCookie();
                    setTimeout(function () {
                        clearCookie();
                    },1000*5);
                },1000*10);
            }
        },1000*15);
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
