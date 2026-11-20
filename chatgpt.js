
// ==========================================
// PROJECT DUDE V3
// JARVIS HOLOGRAPHIC FLOATING ASSISTANT
// ==========================================

(function createDudeFloatingUI() {
  if (document.getElementById("dude-floating-host")) return;

  const host = document.createElement("div");
  host.id = "dude-floating-host";

  Object.assign(host.style, {
    position: "fixed",
    left: "auto",
    top: "auto",
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
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 2px solid #00eaff;
      background: radial-gradient(circle, #164b70, #020817 75%);
      color: #00f0ff;
      font-size: 25px;
      font-weight: bold;
      cursor: grab;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 15px #00eaff, 0 0 35px #007bff;
      animation: orbPulse 2s infinite ease-in-out;
      touch-action: none;
      user-select: none;
    }

    #orb:active {
      cursor: grabbing;
    }

    #panel {
      display: none;
      position: fixed;
      width: 340px;
      height: 430px;
      color: white;
      background: radial-gradient(circle at center, #102d49, #020817 75%);
      border: 1px solid rgba(0,234,255,.8);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 0 25px rgba(0,234,255,.35),
                  inset 0 0 30px rgba(0,234,255,.08);
    }

    #header {
      height: 48px;
      padding: 0 14px;
      background: rgba(0,20,40,.8);
      border-bottom: 1px solid rgba(0,234,255,.4);
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: grab;
      touch-action: none;
      user-select: none;
    }

    #header:active {
      cursor: grabbing;
    }

    #title {
      color: #00eaff;
      font-weight: bold;
      font-size: 13px;
      letter-spacing: 2px;
      text-shadow: 0 0 10px #00eaff;
    }

    .controls button {
      background: transparent;
      color: #00eaff;
      border: none;
      font-size: 21px;
      cursor: pointer;
      margin-left: 8px;
    }

    #content {
      height: calc(100% - 48px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    #reactor {
      width: 190px;
      height: 190px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid #00dfff;
      box-shadow: 0 0 12px rgba(0,234,255,.5);
    }

    .ring.one {
      width: 180px;
      height: 180px;
      border-style: dashed;
      animation: rotate 12s linear infinite;
    }

    .ring.two {
      width: 150px;
      height: 150px;
      border-width: 2px;
      border-color: rgba(0,234,255,.6);
      border-left-color: transparent;
      border-right-color: transparent;
      animation: rotateReverse 7s linear infinite;
    }

    .ring.three {
      width: 120px;
      height: 120px;
      border-style: dotted;
      animation: rotate 5s linear infinite;
    }

    #core {
      width: 76px;
      height: 76px;
      border-radius: 50%;
      background: radial-gradient(circle, #9affff, #00bfff 35%, #03416d 75%);
      box-shadow: 0 0 18px #00eaff,
                  0 0 45px #008cff,
                  0 0 75px rgba(0,234,255,.4);
      animation: corePulse 2s infinite ease-in-out;
      z-index: 2;
    }

    .orbit {
      position: absolute;
      width: 195px;
      height: 195px;
      border: 1px solid rgba(0,234,255,.3);
      border-radius: 50%;
      animation: rotateReverse 10s linear infinite;
    }

    .orbit::before {
      content: "";
      position: absolute;
      top: 20px;
      left: 22px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #00f0ff;
      box-shadow: 0 0 12px #00f0ff;
    }

    #status {
      margin-top: 20px;
      color: #00eaff;
      font-size: 13px;
      letter-spacing: 3px;
      text-shadow: 0 0 10px #00eaff;
    }

    #wave {
      height: 35px;
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 12px;
    }

    #wave span {
      width: 3px;
      height: 5px;
      border-radius: 5px;
      background: #00eaff;
      box-shadow: 0 0 8px #00eaff;
      animation: wave 1s infinite ease-in-out;
    }

    #wave span:nth-child(2n) {
      animation-delay: .15s;
    }

    #wave span:nth-child(3n) {
      animation-delay: .3s;
    }

    #description {
      color: #829eb5;
      font-size: 11px;
      letter-spacing: 1px;
      margin-top: 5px;
    }

    @keyframes rotate {
      to { transform: rotate(360deg); }
    }

    @keyframes rotateReverse {
      to { transform: rotate(-360deg); }
    }

    @keyframes corePulse {
      50% {
        transform: scale(1.12);
        box-shadow: 0 0 30px #00eaff, 0 0 85px #008cff;
      }
    }

    @keyframes orbPulse {
      50% { box-shadow: 0 0 30px #00eaff, 0 0 55px #008cff; }
    }

    @keyframes wave {
      0%, 100% { height: 5px; }
      50% { height: 28px; }
    }
  </style>

  <button id="orb" title="Open Project Dude">D</button>

  <section id="panel">
    <div id="header">
      <span id="title">PROJECT DUDE V3</span>
      <div class="controls">
        <button id="minimize" title="Minimize">−</button>
        <button id="close" title="Close panel">×</button>
      </div>
    </div>

    <div id="content">
      <div id="reactor">
        <div class="orbit"></div>
        <div class="ring one"></div>
        <div class="ring two"></div>
        <div class="ring three"></div>
        <div id="core"></div>
      </div>

      <div id="status">SYSTEM READY</div>

      <div id="wave">
        ${Array(17).fill("<span></span>").join("")}
      </div>

      <div id="description">JARVIS INTERFACE INITIALIZED</div>
    </div>
  </section>
  `;

  const orb = shadow.getElementById("orb");
  const panel = shadow.getElementById("panel");
  const header = shadow.getElementById("header");

  let panelPosition = null;
  let dragging = false;
  let moved = false;
  let startX = 0;
  let startY = 0;
  let offsetX = 0;
  let offsetY = 0;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function setHostPosition(x, y) {
    host.style.left = clamp(x, 0, window.innerWidth - 64) + "px";
    host.style.top = clamp(y, 0, window.innerHeight - 64) + "px";
    host.style.right = "auto";
    host.style.bottom = "auto";
  }

  function setPanelPosition(x, y) {
    const maxX = Math.max(0, window.innerWidth - panel.offsetWidth);
    const maxY = Math.max(0, window.innerHeight - panel.offsetHeight);

    panelPosition = {
      x: clamp(x, 0, maxX),
      y: clamp(y, 0, maxY)
    };

    panel.style.left = panelPosition.x + "px";
    panel.style.top = panelPosition.y + "px";
    panel.style.right = "auto";
    panel.style.bottom = "auto";
  }

  function openPanel() {
    const orbRect = orb.getBoundingClientRect();

    panel.style.display = "block";
    orb.style.display = "none";

    if (!panelPosition) {
      setPanelPosition(
        orbRect.right - 340,
        orbRect.top - 442
      );
    } else {
      setPanelPosition(panelPosition.x, panelPosition.y);
    }
  }

  function minimizePanel() {
    if (panel.style.display !== "none") {
      const rect = panel.getBoundingClientRect();
      setHostPosition(rect.right - 64, rect.bottom - 64);
    }

    panel.style.display = "none";
    orb.style.display = "flex";
  }

  orb.addEventListener("click", () => {
    if (moved) {
      moved = false;
      return;
    }
    openPanel();
  });

  shadow.getElementById("minimize")
    .addEventListener("click", minimizePanel);

  shadow.getElementById("close")
    .addEventListener("click", minimizePanel);

  // DRAG FLOATING ORB
  orb.addEventListener("pointerdown", event => {
    dragging = true;
    moved = false;

    const rect = orb.getBoundingClientRect();
    startX = event.clientX;
    startY = event.clientY;
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    orb.setPointerCapture(event.pointerId);
  });

  orb.addEventListener("pointermove", event => {
    if (!dragging) return;

    if (
      Math.abs(event.clientX - startX) > 4 ||
      Math.abs(event.clientY - startY) > 4
    ) {
      moved = true;
    }

    if (moved) {
      setHostPosition(
        event.clientX - offsetX,
        event.clientY - offsetY
      );
    }
  });

  function stopOrbDrag() {
    dragging = false;
  }

  orb.addEventListener("pointerup", stopOrbDrag);
  orb.addEventListener("pointercancel", stopOrbDrag);

  // DRAG FLOATING PANEL
  header.addEventListener("pointerdown", event => {
    if (event.target.closest("button")) return;

    dragging = true;
    moved = false;

    const rect = panel.getBoundingClientRect();

    startX = event.clientX;
    startY = event.clientY;
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    header.setPointerCapture(event.pointerId);
  });

  header.addEventListener("pointermove", event => {
    if (!dragging || panel.style.display === "none") return;

    if (
      Math.abs(event.clientX - startX) > 3 ||
      Math.abs(event.clientY - startY) > 3
    ) {
      moved = true;
    }

    if (moved) {
      setPanelPosition(
        event.clientX - offsetX,
        event.clientY - offsetY
      );
    }
  });

  function stopPanelDrag() {
    dragging = false;
  }

  header.addEventListener("pointerup", stopPanelDrag);
  header.addEventListener("pointercancel", stopPanelDrag);

  // KEEP UI INSIDE SCREEN AFTER RESIZE
  window.addEventListener("resize", () => {
    if (panel.style.display === "block" && panelPosition) {
      setPanelPosition(panelPosition.x, panelPosition.y);
    } else if (orb.style.display !== "none") {
      const rect = orb.getBoundingClientRect();
      setHostPosition(rect.left, rect.top);
    }
  });

})();


// ==========================================
// CHATGPT TEXT INSERTION
// ==========================================

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
console.log("🔥 PROJECT DUDE CONTENT SCRIPT LOADED!");

document.body.insertAdjacentHTML(
  "beforeend",
  '<div id="dude-test" style="position:fixed;bottom:20px;left:20px;z-index:2147483647;background:#061326;color:#00eaff;border:2px solid #00eaff;padding:15px;border-radius:12px;">PROJECT DUDE TEST</div>'
);
