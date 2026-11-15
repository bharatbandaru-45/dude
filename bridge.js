
window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data?.type === "DUDE_SEND_COMMAND") {
    chrome.runtime.sendMessage({
      action: "SEND_TO_CHATGPT",
      text: event.data.text
    });
  }
});
