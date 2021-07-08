function initIPCProxy(port, windowObj) {
  port.onMessage.addListener((message) => {
    windowObj.postMessage({ type: "IPC_TO_PAGE", message }, "*");
  });

  windowObj.addEventListener(
    "message",
    function (event) {
      // We only accept messages from ourselves
      if (event.source !== windowObj) {
        return;
      }

      if (event.data.type && event.data.type === "IPC_FROM_PAGE") {
        port.postMessage(event.data.message);
      }
    },
    false
  );
}

const port = chrome.runtime.connect();
initIPCProxy(port, window);