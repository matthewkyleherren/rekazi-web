
      if (!window.__ashbyBaseJobBoardUrl) {window.__ashbyBaseJobBoardUrl = "https://jobs.ashbyhq.com/patch.io"} ;
      "use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="fd96eb47-b649-5d1e-83a9-f024b92b618d")}catch(e){}}();
function buildIFrameUrl(container) {
    const urlParams = new URLSearchParams(window.location.search);
    let baseJobBoardUrl = window.__ashbyBaseJobBoardUrl;
    const jobIdParam = container.getAttribute("data-jid") || urlParams.get("ashby_jid");
    if (jobIdParam) {
        const showApplicationForm = container.getAttribute("data-tab") === "application";
        baseJobBoardUrl = `${baseJobBoardUrl}/${encodeURIComponent(jobIdParam)}${showApplicationForm ? "/application" : ""}`;
    }
    const url = new URL(baseJobBoardUrl);
    const utmSourceParam = urlParams.get("utm_source");
    if (utmSourceParam) {
        url.searchParams.set("utm_source", encodeURIComponent(utmSourceParam));
    }
    url.searchParams.set("embed", "js");
    // set to hide chrome elements like back button, headers, and sidebar
    const noChrome = container.getAttribute("data-noChrome") === "true";
    if (noChrome) {
        url.searchParams.set("noChrome", "true");
    }
    return url.href;
}
const loadIFrame = function () {
    if (window.__ashbyAutoLoadIframeTimerID != null) {
        return;
    }
    let previouslyRegisteredPostMessageHandler = null;
    function setJid(jid) {
        const currentUrl = new URL(window.location.href);
        if (jid) {
            currentUrl.searchParams.set("ashby_jid", jid);
        }
        else {
            currentUrl.searchParams.delete("ashby_jid");
        }
        window.history.replaceState(null, null, currentUrl.href);
    }
    function addIFrameIfNotExists() {
        const container = document.getElementById("ashby_embed");
        if (container != null && document.getElementById("ashby_embed_iframe") == null) {
            container.innerHTML = "";
            const iframe = document.createElement("iframe");
            iframe.setAttribute("id", "ashby_embed_iframe");
            iframe.setAttribute("src", buildIFrameUrl(container));
            iframe.setAttribute("title", "Ashby Job Board");
            iframe.setAttribute("width", "100%");
            iframe.setAttribute("height", "1000");
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("scrolling", "no");
            if (window.ResizeObserver == null || window.addEventListener == null) {
                iframe.setAttribute("scrolling", "auto");
            }
            container.appendChild(iframe);
            if (previouslyRegisteredPostMessageHandler) {
                window.removeEventListener("message", previouslyRegisteredPostMessageHandler);
            }
            window.addEventListener("message", handleIncomingMessage);
            previouslyRegisteredPostMessageHandler = handleIncomingMessage;
            function handleIncomingMessage(e) {
                const data = e.data;
                if (typeof data === "string") {
                    if (data === "apply_for_job_tapped" ||
                        data === "job_tapped" ||
                        data === "application_submitted" ||
                        data === "application_errored") {
                        container.scrollIntoView(true);
                    }
                    else if (data === "reset_jid") {
                        setJid(null);
                        iframe.contentWindow.postMessage("ack_reset_jid", "*");
                    }
                    else if (typeof data === "string" && data.startsWith("set_jid=")) {
                        if (!container.getAttribute("data-jid")) {
                            // don't set jid, if it's being set via the data-attribute
                            const jobId = data.slice(8);
                            setJid(jobId);
                            iframe.contentWindow.postMessage(`ack_set_jid=${jobId}`, "*");
                        }
                        container.scrollIntoView(true);
                    }
                }
                else if (typeof data === "number") {
                    // A resize event. Sometimes the height we receive from the resize observer
                    // is lower than the actual iframe height. Having an extra height ensures
                    // we're not cutting the content and rendering the whole iframe.
                    const extraHeight = 32;
                    const height = Number(data) + extraHeight;
                    iframe.setAttribute("height", height.toString());
                }
            }
        }
    }
    window.__ashbyAutoLoadIframeTimerID = window.setInterval(function () {
        addIFrameIfNotExists();
    }, 100);
    addIFrameIfNotExists();
};
(function () {
    if (document.readyState === "complete") {
        loadIFrame();
    }
    else {
        addEventListener("DOMContentLoaded", loadIFrame);
        addEventListener("load", loadIFrame);
    }
})();
//# debugId=fd96eb47-b649-5d1e-83a9-f024b92b618d
//# sourceMappingURL=job_board_embed_script.js.map

      