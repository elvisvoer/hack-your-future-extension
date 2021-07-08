console.log('I am the background script');

const processMessage = (message) => {
  console.log('we received a message', message);
}

chrome.runtime.onConnect.addListener((port) => {
  // port.postMessage({
  //   id: null,
  //   type: "rpc-init",
  //   data: { rpcVersion },
  // });

  port.onMessage.addListener((message) => {
    const result = processMessage(message);
    port.postMessage(result);
  });
});