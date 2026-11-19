
// ======================================
// PROJECT DUDE V3 - CHATGPT CONTENT SCRIPT
// FLOATING ORB + MOVABLE PANEL
// ======================================

// ---------- FLOATING UI ----------
(function createDudeFloatingUI() {

  if (document.getElementById("dude-floating-host")) return;

  const host = document.createElement("div");
  host.id = "dude-floating-host";

  Object.assign(host.style, {
    position: "fixed",
    right: "25px",
    bottom: "25px",
    zIndex: "2147483647"
  });

  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: "open" });

  shadow.innerHTML = `
    <style>
      * {
        box-sizing: border-box;
        font-family: Arial, sans-serif;
      }

      #orb {
        width: 62px;
        height: 62px;
        border-radius: 50%;
        border: 2px solid #00eaff;
        background: radial-gradient(circle, #123b60, #050b1e);
        color: #00f0ff;
        font-size: 23px;
        cursor: pointer;
        box-shadow: 0 0 15px #00eaff,
                    0 0 35px rgba(0,240,255,.5);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: .25s;
      }

      #orb:hover {
        transform: scale(1.1);
      }

      #panel {
        display: none;
        position: fixed;
        right: 25px;
        bottom: 100px;
        width: 300px;
        color: white;
        background: #071326;
        border: 1px solid #00eaff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 0 25px rgba(0,234,255,.35);
      }

      #header {
        padding: 15px;
        background: #0b2038;
        border-bottom: 1px solid #00eaff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: move;
        user-select: none;
      }

      #title {
        color: #00eaff;
        font-weight: bold;
        letter-spacing: 2px;
      }

      .controls button {
        background: transparent;
        color: white;
        border: none;
        font-size: 19px;
        cursor: pointer;
        margin-left: 8px;
      }

      #content {
        padding: 22px 16px;
        text-align: center;
      }

      #miniOrb {
        width: 75px;
        height: 75px;
        margin: auto;
        border-radius: 50%;
        background: radial-gradient(circle, #12618a, #061020);
        border: 2px solid #00eaff;
        box-shadow: 0 0 22px #00eaff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
      }

      #status {
        color: #00eaff;
        margin-top: 18px;
        font-size: 14px;
      }

      #description {
        color: #9aafc4;
        font-size: 12px;
        margin-top: 9px;
        line-height: 1.5;
      }
    </style>

    <button id="orb" title="Open Project Dude">D</button>

    <section id="panel">
      <div id="header">
        <span id="title">PROJECT DUDE</span>

        <div class="controls">
          <button id="minimize" title="Minimize">−</button>
          <button id="close" title="Close panel">×</button>
        </div>
      </div>

      <div id="content">
        <div id="miniOrb">D</div>
        <div id="status">DUDE CONNECTED</div>
        <div id="description">
          Floating assistant panel is ready.<br>
          Voice controls integration is the next step.
        </div>
      </div>
    </section>
  `;

  const orb = shadow.getElementById("orb");
  const panel = shadow.getElementById("panel");
  const header = shadow.getElementById("header");

  function openPanel() {
    panel.style.display = "block";
    orb.style.display = "none";
  }

  function minimizePanel() {
    panel.style.display = "none";
    orb.style.display = "flex";
  }

  orb.addEventListener("click", openPanel);

  shadow.getElementById("minimize")
    .addEventListener("click", minimizePanel);

  shadow.getElementById("close")
    .addEventListener("click", minimizePanel);

  // ---------- DRAG PANEL ----------
  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  header.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;

    dragging = true;

    const rect = panel.getBoundingClientRect();

    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    panel.style.right = "auto";
    panel.style.bottom = "auto";

    header.setPointerCapture(event.pointerId);
  });

  header.addEventListener("pointermove", (event) => {
    if (!dragging) return;

    const x = Math.max(
      0,
      Math.min(window.innerWidth - panel.offsetWidth,
      event.clientX - offsetX)
    );

    const y = Math.max(
      0,
      Math.min(window.innerHeight - panel.offsetHeight,
      event.clientY - offsetY)
    );

    panel.style.left = x + "px";
    panel.style.top = y + "px";
  });

  header.addEventListener("pointerup", () => {
    dragging = false;
  });

})();


// ---------- CHATGPT TEXT INSERTION ----------
chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {

    if (message.action !== "TYPE_MESSAGE") return;

    try {

      const text = message.text?.trim();

      if (!text) {
        sendResponse({
          success: false,
          error: "Empty message"
        });
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

      if (editor.tagName === "TEXTAREA") {

        const setter = Object.getOwnPropertyDescriptor(
          HTMLTextAreaElement.prototype,
          "value"
        ).set;

        setter.call(editor, text);

        editor.dispatchEvent(
          new Event("input", { bubbles: true })
        );

      } else {

        const paragraph = document.createElement("p");
        paragraph.textContent = text;

        editor.replaceChildren(paragraph);

        editor.dispatchEvent(
          new InputEvent("input", {
            bubbles: true,
            inputType: "insertText",
            data: text
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

  }
);
