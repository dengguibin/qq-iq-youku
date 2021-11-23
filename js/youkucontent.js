var windowHref = window.location.href;

if (windowHref.indexOf("com/profile") != -1
    || windowHref.indexOf("mp.youku") != -1
    || windowHref.indexOf("com/page/msg") != -1
    || windowHref.indexOf("user.youku") != -1) {
    window.close();
}

if (windowHref.indexOf("youku.") != -1) {
    getSetCookie();
}



// document.addEventListener('DOMContentLoaded',function () {
window.onload= function(){
    if (windowHref.indexOf("youku.") != -1) {
        document.getElementById("uerCenter").style.cssText="pointer-events:none;"

        document.getElementsByClassName("settings-item quality-item q1080p")[0].click()

        clearCookie();
    }
};

function clearCookie() {
    chrome.runtime.sendMessage({domain: "youku",operation: "clearCookie"}, function(response) {
        console.log(response);
    });
}

function getSetCookie() {
    chrome.runtime.sendMessage({domain: "youku",operation: "getCookie"}, function(response) {
        console.log(response);
        for (const responseElement of response) {
            var name = responseElement.name;
            var value = responseElement.value;
            var domain = responseElement.domain;
            var path = responseElement.path;
            document.cookie=name + "=" + value + ";domain=" + domain + ";path=" + path;
        }
    });
}