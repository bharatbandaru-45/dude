
window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data?.type !== "DUDE_SEND_COMMAND") return;

  const command = event.data.text?.trim();

  if (!command) {
    console.warn("DUDE CONNECT: Empty command");
    return;
  }

  try {
    if (!chrome?.runtime?.id) {
      console.error(
        "DUDE CONNECT: Extension context unavailable. Reload the extension and refresh this page."
      );
      return;
    }

    chrome.runtime.sendMessage(
      {
        action: "SEND_TO_CHATGPT",
        text: command
      },
      (response) => {
        const error = chrome.runtime.lastError;

        if (error) {
          console.error(
            "DUDE CONNECT:",
            error.message
          );
          return;
        }

        if (!response) {
          console.warn(
            "DUDE CONNECT: No response from background.js"
          );
          return;
        }

        console.log("DUDE CONNECT SUCCESS:", response);
      }
    );

  } catch (error) {
    console.error(
      "DUDE CONNECT ERROR:",
      error.message
    );
  }
});
