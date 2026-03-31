import { emitter } from "./modules/event-emitter.js";
import { DataService } from "./modules/data-service.js";

const state = {
  count: 0,
};

function renderList() {
  const log = document.querySelector("#log-list");
  if (!log) return;

  if (state.count >= 1) {
    log.innerHTML += `<li>Updated to: ${state.count}</li>`;
  }
}

function renderProgress() {
  const progress = document.querySelector("#progress-fill");
  if (!progress) return;

  progress.style.width = `${state.count}%`;
}

function renderDisplay() {
  const badge = document.querySelector(".badge");
  if (!badge) return;

  badge.textContent = `Count: ${state.count}`;
}

function render() {
  renderList();
  renderDisplay();
  renderProgress();
}

emitter.on("count:changed", (count) => {
  state.count = count;
  render();
});

const button = document.querySelector("#btn-increment");
if (button) {
  button.addEventListener("click", () => {
    DataService.fetchCount();
  });
}

render();