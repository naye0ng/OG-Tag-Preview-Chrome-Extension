/* 
    [version : 1.0]
    Content Scripts, background script 없이 현재 탭의 링크 받아오기 
    링크의 dom객체를 한번에 받아와서 meta태그 중 og태그를 파싱하여 배열로 저장 
    popup.html에 og태그 출력

    [version : 1.1]
    popup.html의 버튼 클릭 없이 icon 클릭시 바로 로딩 
    (추가) http://d2campusfest.kr/6th/의 og:image에 파일경로가 들어가 있는 경우

    [version : 2.0]
    (선택) Facebook,Naver,Twitter 등 각 서비스별로 최적화된 미리보기 제공

*/

var xhr;
var url;
var show_btn;

// 현재 탭의 링크 받기 
function getCurrentTabUrl(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        var tab = tabs[0];
        url = tab.url;

        callback(url);

    });
}

// 해딩 URL의 객체들 받아오기 
function parse(html) {
    var el = document.createElement('div');
    el.innerHTML = html;

    try {
        var title = el.querySelector('meta[property="og:title"]').getAttribute('content');

    } catch{
        //facebook과 naver의 경우, title 태그 찾기
        try {
            var title = el.querySelector('title').innerText;
        } catch{
            var title = 'x';
        }

    }
    try {//url을 굳이 가져올 필요가 있음?엥>??
        var og_url = el.querySelector('meta[property="og:url"]').getAttribute('content');
    } catch{
        //현재탭의 url할당
        var og_url = url;
    }
    try {
        var description = el.querySelector('meta[property="og:description"]').getAttribute('content');
    } catch{
        //description생략시 뭘 가져올까?...
        var description = 'x';

    }
    try {
        var image = el.querySelector('meta[property="og:image"]').getAttribute('content');
        //이미지의 url이 경로로 나와있는 경우, url 유효성검사
        var checkURL = checkDetailUrl(image);

        if (!checkURL) image = url+image;
    
    } catch{
        var image = './not-found.png';
    }

    //버튼에 따라 다르게 넣어야 하는거 추가
    //카드에 넣기
    document.querySelector('#title_box').innerText = title;
    document.querySelector('#url_box').innerText = og_url;
    document.querySelector('#description_box').innerText = description;
    document.querySelector('#img_box').innerHTML = "<img src='" + image + "'>"

    
    document.querySelector('#og_title').innerText = title;
    document.querySelector('#og_url').innerText = og_url;
    document.querySelector('#og_description').innerText = description;
    document.querySelector('#og_image').innerHTML = "<img src='" + image + "'>"

}

//URL유효성검사
function checkDetailUrl(strUrl) {
    var expUrl = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi;
    return expUrl.test(strUrl);
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

    var naver = document.getElementById('naver');
    var facebook = document.getElementById('facebook');

    show_btn = 'naver';
    naver.addEventListener('click', function () {
        show_btn = 'naver';
        alert('n')
    })
    facebook.addEventListener('click', function () {
        show_btn = 'facebook'
        alert('f')
    })

    getCurrentTabUrl(function (url) {
        getURLDom(url);
    });
});

//객체 프로퍼티 가져와서 할당하는 함수



