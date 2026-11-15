
window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data?.type === "DUDE_SEND_COMMAND") {
    window.postMessage({
      type: "DUDE_EXTENSION_COMMAND",
      text: event.data.text
    }, window.location.origin);
  }
});
