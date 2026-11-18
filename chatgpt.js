
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action !== "TYPE_MESSAGE") return;

  try {
    const editor =
      document.querySelector("#prompt-textarea") ||
      document.querySelector('[contenteditable="true"]');
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action !== "TYPE_MESSAGE") return;

  try {
    const text = message.text?.trim();

    if (!text) {
      sendResponse({ success: false, error: "Empty message" });
      return;
    }

    const editor =
      document.querySelector("#prompt-textarea") ||
      document.querySelector(
        '[contenteditable="true"].ProseMirror'
      ) ||
      document.querySelector('[contenteditable="true"]');

    if (!editor) {
      sendResponse({
        success: false,
        error: "ChatGPT editor not found"
      });
      return;
    }

    editor.focus();

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    editor.replaceChildren(paragraph);

    editor.dispatchEvent(new InputEvent("input", {
      bubbles: true,
      inputType: "insertText",
      data: text
    }));

    sendResponse({
      success: true,
      message: "Text inserted"
    });

  } catch (error) {
    console.error("DUDE ERROR:", error);

    sendResponse({
      success: false,
      error: error.message
    });
  }
});


    if (!editor) {
      sendResponse({
        success: false,
        error: "ChatGPT message box not found"
      });
      return;
    }

    editor.focus();

    if (editor.tagName === "TEXTAREA") {
      const setter = Object.getOwnPropertyDescriptor(
        HTMLTextAreaElement.prototype,
        "value"
      ).set;

      setter.call(editor, message.text);

      editor.dispatchEvent(
        new Event("input", { bubbles: true })
      );
    } else {
      editor.replaceChildren();

      const paragraph = document.createElement("p");
      paragraph.textContent = message.text;
      editor.appendChild(paragraph);

      editor.dispatchEvent(
        new InputEvent("input", {
          bubbles: true,
          inputType: "insertText",
          data: message.text
        })
      );
    }

    sendResponse({
      success: true,
      message: "Text inserted into ChatGPT"
    });

  } catch (error) {
    console.error("DUDE CHATGPT ERROR:", error);

    sendResponse({
      success: false,
      error: error.message
    });
  }
});
