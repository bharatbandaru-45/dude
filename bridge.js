
(() => {
  let extensionAvailable = true;

  window.addEventListener("message", (event) => {
    if (event.source !== window) return;

    if (event.data?.type !== "DUDE_SEND_COMMAND") return;

    const command = event.data.text?.trim();

    if (!command) return;

    if (!extensionAvailable) {
      console.error(
        "DUDE CONNECT: Extension disconnected. Refresh this page."
      );
      return;
    }

    try {
      chrome.runtime.sendMessage(
        {
          action: "SEND_TO_CHATGPT",
          text: command
        },
        (response) => {
          try {
            const error = chrome.runtime.lastError;

            if (error) {
              console.error(
                "DUDE CONNECT:",
                error.message
              );

              if (
                error.message.includes("context invalidated") ||
                error.message.includes("Extension context")
              ) {
                extensionAvailable = false;
              }

              return;
            }

            console.log("DUDE CONNECT:", response);

          } catch (error) {
            extensionAvailable = false;
            console.error("DUDE CONNECT:", error.message);
          }
        }
      );

    } catch (error) {
      extensionAvailable = false;
      console.error("DUDE CONNECT:", error.message);
    }
  });
})();
