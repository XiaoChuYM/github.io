// fileUploadTime.js

function getCurrentFileName() {
    var url = window.location.href;
    var index = url.lastIndexOf('/');
    var fileName = url.substring(index + 1);
    if (fileName.endsWith(".html")) {
      return fileName;
    } else {
      return fileName + ".html";
    }
  }
  
  function getFileUploadTime(fileName) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var lastModified = JSON.parse(xhr.responseText)[0].commit.committer.date;
        var uploadTime = new Date(lastModified);
        var formattedTime = formatTimeDifference(uploadTime);
        document.getElementById('upload-time').innerHTML = '&#128337; ' + formattedTime;
      }
    };
    xhr.open('GET', 'https://api.github.com/repos/xiaochuym/github.io/commits?path=' + fileName, true);
    xhr.send();
  }
  
  function formatTimeDifference(date1) {
    var currentTimeMillis = Date.now();
    var date2 = new Date(currentTimeMillis);
    var diffMillis = Math.abs(date2 - date1);
  
    if (diffMillis < 3600000) {
      var minutes = Math.floor(diffMillis / 60000);
      if (minutes == 0) minutes = 1;
      return minutes + ' 分钟前';
    }
  
    if (diffMillis < 86400000) {
      var hours = Math.floor(diffMillis / 3600000);
      return hours + ' 小时前';
    }
  
    if (diffMillis < 259200000) {
      var days = Math.floor(diffMillis / 86400000);
      return days + ' 天前';
    }
  
    var year = date1.getFullYear();
    var month = ('0' + (date1.getMonth() + 1)).slice(-2);
    var day = ('0' + date1.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  }
  
  function initUploadTime() {
    var fileName = getCurrentFileName();
    getFileUploadTime(fileName);
  }
  
  window.onload = function () {
    initUploadTime();
  };
  