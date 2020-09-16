// ==UserScript==
// @name        New script - taylorjacksoncourses.com
// @namespace   Violentmonkey Scripts
// @match       https://www.taylorjacksoncourses.com/courses/*
// @grant       none
// @version     1.0
// @author      -
// @description 9/16/2020, 8:19:26 AM
// ==/UserScript==

// https://github.com/sehlceris/wistia-downloader

function getWistiaVideoId() {
  const scriptTagList = document.head.querySelectorAll("script[type='application/ld+json']");
  const lastScriptTag = scriptTagList[scriptTagList.length - 1];
  const scriptTagText = lastScriptTag.innerText;
  // console.log(`wistia-downloader: scriptTagText ${scriptTagText}`);
  const embedUrl = JSON.parse(scriptTagText).embedUrl;
  const videoId = /.*\/(\S+)/.exec(embedUrl)[1];
  console.log(`wistia-downloader: video id ${videoId}`);
  return videoId;
}


function showWistiaVideoId(videoId) {
  let notificationDiv = document.querySelector('.wistia-downloader-output');
  if (!notificationDiv) {
    notificationDiv = document.createElement('div');
    document.body.appendChild(notificationDiv);
    notificationDiv.classList.add('.wistia-downloader-output');
    notificationDiv.style.position = 'fixed';
    notificationDiv.style.right = 0;
    notificationDiv.style.bottom = 0;
    notificationDiv.style.padding = '0.5em';
    notificationDiv.style.fontSize = '1.5em';
    notificationDiv.style.color = 'white';
    notificationDiv.style.backgroundColor = 'darkgray';
    notificationDiv.style.fontWeight = 'bold';
    notificationDiv.style.fontFamily = 'sans-serif';
    notificationDiv.onclick = () => {
        const input = document.createElement('input');
          document.body.appendChild(input);
          input.value = notificationDiv.innerText;
          input.select();
          document.execCommand('copy');
        notificationDiv.parentNode.removeChild(input);
        notificationDiv.parentNode.removeChild(notificationDiv);
      }
  }
  notificationDiv.innerText = videoId;
}

window.addEventListener('load', () => {
  console.log('wistia-downloader: load');
  let currentLocation = window.location.href;
  setInterval(() => {
    if (window.location.href != currentLocation) {
      console.log(`wistia-downloader: performing interval video id get`);
      currentLocation = window.location.href;
      setTimeout(() => {
        showWistiaVideoId(getWistiaVideoId());
      }, 1000);
    }
  }, 1000);
  setTimeout(() => {
    console.log(`wistia-downloader: performing initial video id get`);
    const videoId = getWistiaVideoId();
    showWistiaVideoId(videoId);
  }, 2000);
  // window.addEventListener('popstate', (e) =>{
  //   console.log('wistia-downloader: popstate');
  // });
  // window.addEventListener('pushstate', (e) =>{
  //   console.log('wistia-downloader: pushstate');
  // });
  // window.addEventListener('hashchange', (e) =>{
  //   console.log('wistia-downloader: hashchange');
  // });
});
