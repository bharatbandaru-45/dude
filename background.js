
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.action === "SEND_TO_CHATGPT") {

    chrome.tabs.query(
      { url: "https://chatgpt.com/*" },
      (tabs) => {

        if (tabs.length === 0) {
          sendResponse({
            success: false,
            error: "ChatGPT is not open"
          });
          return;
        }

        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            action: "TYPE_MESSAGE",
            text: message.text
          },
          (response) => {
            if (chrome.runtime.lastError) {
              sendResponse({
                success: false,
                error: "ChatGPT tab is not ready"
              });
            } else {
              sendResponse(response);
            }
          }
        );
      }
    );

    return true;
  }
});
