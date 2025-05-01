// ==UserScript==
// @name         Notion Sidebar Tamer Userscript
// @icon       https://github.com/YourLocalCatGirl/notion-sidebar-tamer-userscript/blob/main/images/128.png
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Disable the hover sidebar in Notion. The sidebar in Notion is a great way to navigate between pages, but it can be distracting when you're working between windows. This Chrome extension disables the appearing on hover of the sidebar.
// @author       yourlocalgirl
// @match        https://www.notion.so/*
// @grant        none
// ==/UserScript==

const sidebarInitObserver = new MutationObserver((mutationsList, observer) => {
  const targetElement = document.querySelector(".notion-sidebar");
  if (targetElement) {
    observer.disconnect();
    const expandedObserver = new MutationObserver(expandedObserverCallback);
    expandedObserver.observe(targetElement, {
      subtree: true,
      childList: true,
      attributes: false,
    });
  }
});
let previousExpanded = null;
function expandedObserverCallback(mutationsList, observer) {
  const targetElement = document.querySelector(".notion-sidebar");
  const sidebarData = JSON.parse(
    localStorage.getItem("LRU:KeyValueStore2:sidebar")
  );
  const expanded = sidebarData["value"]["expanded"];
  if (expanded !== previousExpanded) {
    targetElement.style.display = expanded ? "block" : "none";
  }
}
sidebarInitObserver.observe(document.body, { subtree: true, childList: true });
