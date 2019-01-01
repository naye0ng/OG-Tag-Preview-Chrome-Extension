/* 
    version : 1.0
    background script 없이 현재 탭의 링크 받아오기 
    링크의 dom객체를 한번에 받아와서 meta태그 중 og태그를 파싱하여 배열로 저장 
    popup.html에 og태그 출력
*/

// 현재 탭의 링크 받기 
function getCurrentTabUrl(callback) {
    var queryInfo = {
      active: true,
      currentWindow: true
    };
  
    chrome.tabs.query(queryInfo, function(tabs) {
      var tab = tabs[0];
      var url = tab.url;
  
      callback(url);
  
    });
}
  
function renderURL(statusText) {
    document.getElementById('urls').textContent = statusText;
}
  
document.addEventListener('DOMContentLoaded', function() {
  
    // when click, get current page link
    var link = document.getElementById('getUrl');
  
    link.addEventListener('click', function() {
      getCurrentTabUrl(function(url) {
        renderURL(url);
      });
    });

});

