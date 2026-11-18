
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action !== "SEND_TO_CHATGPT") return;

  const text = message.text?.trim();

  if (!text) {
    sendResponse({
      success: false,
      error: "Empty command"
    });
    return;
  }

  chrome.tabs.query(
    { url: "https://chatgpt.com/*" },
    (tabs) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          success: false,
          error: chrome.runtime.lastError.message
        });
        return;
      }

      if (!tabs || tabs.length === 0) {
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
          text: text
        },
        (response) => {
          if (chrome.runtime.lastError) {
            sendResponse({
              success: false,
              error: chrome.runtime.lastError.message
            });
            return;
          }

          sendResponse(
            response || {
              success: false,
              error: "No response from chatgpt.js"
            }
          );
        }
      );
    }
  );

  return true;
});
