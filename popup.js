/* 
    version : 1.0
    background script 없이 현재 탭의 링크 받아오기 
    링크의 dom객체를 한번에 받아와서 meta태그 중 og태그를 파싱하여 배열로 저장 
    popup.html에 og태그 출력
*/

var xhr;

// 현재 탭의 링크 받기 
function getCurrentTabUrl(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        var tab = tabs[0];
        var url = tab.url;

        callback(url);

    });
}

function renderURL(statusText) {
    document.getElementById('urls').textContent = statusText;
}


// 해딩 URL의 객체들 받아오기 
function parse(html) {
    var el = document.createElement('div');
    el.innerHTML = html;

    try{
        var title = el.querySelector('meta[property="og:title"]').getAttribute('content');
        var url = el.querySelector('meta[property="og:url"]').getAttribute('content');
        var description = el.querySelector('meta[property="og:description"]').getAttribute('content');
        var image = el.querySelector('meta[property="og:image"]').getAttribute('content');

    }catch{//og태그가 없는 경우
        var title = 'x';
        var url = 'x';
        var description = 'x';
    }

    document.querySelector('#og_title').innerText = title;
    document.querySelector('#og_url').innerText = url;
    document.querySelector('#og_description').innerText = description;
    document.querySelector('#og_image').innerHTML = "<img src='"+image+"'>"

    

}

function handleStateChange() {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            parse(xhr.responseText);
            //alert("성공 : "+xhr.responseText);
        }
        else {
            alert("실패 : " + xhr.status);
        }
    }
}

function getURLDom(targetURL) {

    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handleStateChange;
    xhr.open('GET', targetURL, true);
    //xhr.setRequestHeader("content-Type","application/json;charset=utf-8");
    //xhr.send(JSON.stringify(msg));
    xhr.send();

}


document.addEventListener('DOMContentLoaded', function () {

    // when click, get current page link
    var link = document.getElementById('getUrl');

    link.addEventListener('click', function () {
        getCurrentTabUrl(function (url) {
            renderURL(url);
            getURLDom(url);
        });
    });

});

