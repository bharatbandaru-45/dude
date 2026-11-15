
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action !== "TYPE_MESSAGE") return;

  const editor =
    document.querySelector("#prompt-textarea") ||
    document.querySelector('[contenteditable="true"]');

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
      window.HTMLTextAreaElement.prototype,
      "value"
    ).set;

    setter.call(editor, message.text);
    editor.dispatchEvent(new Event("input", {
      bubbles: true
    }));
  } else {
    editor.textContent = message.text;
    editor.dispatchEvent(new InputEvent("input", {
      bubbles: true,
      inputType: "insertText",
      data: message.text
    }));
  }

  sendResponse({ success: true });
});
