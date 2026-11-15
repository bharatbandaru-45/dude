
window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data?.type === "DUDE_SEND_COMMAND") {
    chrome.runtime.sendMessage({
      action: "SEND_TO_CHATGPT",
      text: event.data.text
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(
          "DUDE CONNECT:",
          chrome.runtime.lastError.message
        );
        return;
      }

      console.log("DUDE CONNECT:", response);
    });
  }
});
