const REPORTS_PER_PAGE = 12;

const galleryContainer = document.getElementById("report-gallery");
const paginationContainer = document.getElementById("pagination");

let reports = [];
let currentPage = 0;

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function reportUrl(report) {
  return report.report || "#";
}

function imageUrl(report) {
  return report.image || "";
}

function normalizeSignal(signal) {
  const allowed = new Set(["sustainable", "violence"]);

  if (!Array.isArray(signal)) {
    return ["sustainable", "violence", "violence", "violence"];
  }

  const values = signal.filter((value) => allowed.has(value)).slice(0, 4);

  while (values.length < 4) {
    values.push("violence");
  }

  const sustainableCount = values.filter((value) => value === "sustainable").length;

  if (![4, 3, 1].includes(sustainableCount)) {
    return ["sustainable", "violence", "violence", "violence"];
  }

  return values;
}

function signalMarkup(signal) {
  return normalizeSignal(signal)
    .map((value) => {
      if (value === "sustainable") {
        return '<span class="signal-star" aria-hidden="true">★</span>';
      }

      return '<span class="signal-x" aria-hidden="true">✕</span>';
    })
    .join("");
}

function signalLabel(signal) {
  const values = normalizeSignal(signal);
  const sustainableCount = values.filter((value) => value === "sustainable").length;
  const violenceCount = 4 - sustainableCount;

  return `${sustainableCount} sustainable, ${violenceCount} violence`;
}

function readableTags(report) {
  const tags = [];

  if (report.area) {
    tags.push(report.area);
  }

  if (Array.isArray(report.policy)) {
    tags.push(...report.policy);
  }

  if (Array.isArray(report.geography)) {
    const local = report.geography.at(-1);
    if (local) {
      tags.push(local);
    }
  }

  return [...new Set(tags)].slice(0, 4);
}

function reportCard(report) {
  const title = escapeHtml(report.title || "Untitled report");
  const summary = escapeHtml(report.summary || "");
  const identifier = escapeHtml(report.identifier || "");
  const date = escapeHtml(report.updated || report.date || "");
  const url = escapeHtml(reportUrl(report));
  const image = escapeHtml(imageUrl(report));
  const tags = readableTags(report).map(escapeHtml);
  const pinned = report.pinned === true;
  const ariaSignal = escapeHtml(signalLabel(report.signal));

  return `
    <article class="report-card ${pinned ? "report-card-pinned" : ""}">
      <header class="report-card-header">
        <div class="report-card-topline">
          <span class="report-id">${identifier}</span>

          <span
            class="report-signal"
            role="img"
            aria-label="${ariaSignal}"
            title="${ariaSignal}"
          >
            ${signalMarkup(report.signal)}
          </span>
        </div>

        <h2 class="report-title">
          <a href="${url}">${title}</a>
        </h2>

        ${
          summary
            ? `<p class="report-summary">${summary}</p>`
            : ""
        }
      </header>

      <a
        class="report-image-link"
        href="${url}"
        aria-label="Read ${title}"
      >
        ${
          image
            ? `
              <img
                class="report-image"
                src="${image}"
                alt=""
                loading="lazy"
              >
            `
            : `
              <div class="report-image-placeholder" aria-hidden="true">
                ${signalMarkup(report.signal)}
              </div>
            `
        }
      </a>

      <footer class="report-card-footer">
        ${
          tags.length
            ? `<div class="report-tags">${tags.map((tag) => `<span>${tag}</span>`).join("")}</div>`
            : ""
        }

        ${date ? `<span class="report-date">${date}</span>` : ""}
      </footer>
    </article>
  `;
}

function renderGallery(pageReports) {
  if (!pageReports.length) {
    galleryContainer.innerHTML = `
      <p class="empty-message">No reports are available.</p>
    `;
    return;
  }

  galleryContainer.innerHTML = pageReports.map(reportCard).join("");
}

function renderPagination() {
  const totalPages = Math.ceil(reports.length / REPORTS_PER_PAGE);

  if (totalPages <= 1) {
    paginationContainer.innerHTML = "";
    return;
  }

  const previousDisabled = currentPage === 0;
  const nextDisabled = currentPage >= totalPages - 1;

  paginationContainer.innerHTML = `
    <button
      class="pagination-button"
      id="previous-page"
      type="button"
      ${previousDisabled ? "disabled" : ""}
    >
      Previous
    </button>

    <span class="pagination-status">
      ${currentPage + 1} / ${totalPages}
    </span>

    <button
      class="pagination-button"
      id="next-page"
      type="button"
      ${nextDisabled ? "disabled" : ""}
    >
      Next
    </button>
  `;

  document.getElementById("previous-page")?.addEventListener("click", () => {
    renderPage(currentPage - 1);
  });

  document.getElementById("next-page")?.addEventListener("click", () => {
    renderPage(currentPage + 1);
  });
}

function updatePageUrl() {
  const url = new URL(window.location.href);

  if (currentPage === 0) {
    url.searchParams.delete("page");
  } else {
    url.searchParams.set("page", String(currentPage + 1));
  }

  window.history.replaceState({}, "", url);
}

function renderPage(pageNumber) {
  const totalPages = Math.max(1, Math.ceil(reports.length / REPORTS_PER_PAGE));

  currentPage = Math.min(Math.max(pageNumber, 0), totalPages - 1);

  const start = currentPage * REPORTS_PER_PAGE;
  const pageReports = reports.slice(start, start + REPORTS_PER_PAGE);

  renderGallery(pageReports);
  renderPagination();
  updatePageUrl();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function initialPageFromUrl() {
  const parameters = new URLSearchParams(window.location.search);
  const requestedPage = Number.parseInt(parameters.get("page"), 10);

  if (!Number.isInteger(requestedPage) || requestedPage < 1) {
    return 0;
  }

  return requestedPage - 1;
}

function randomizeFourReadingPoints() {
  const target = document.getElementById("four-reading-points");

  if (!target) {
    return;
  }

  const variants = [
    "★ □    □ ★    ★ ★    ★ ★\n★ ★    ★ ★    □ ★    ★ □",
    "□ ★    ★ ★    ★ □    ★ ★\n★ ★    □ ★    ★ ★    ★ ★",
    "★ ★    ★ □    □ ★    ★ ★\n★ □    ★ ★    ★ ★    □ ★",
    "★ ★    ★ ★    □ ★    ★ □\n□ ★    ★ □    ★ ★    ★ ★"
  ];

  target.textContent = variants[Math.floor(Math.random() * variants.length)];
}

function installCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const targetId = button.dataset.copy;
      const target = document.getElementById(targetId);

      if (!target) {
        return;
      }

      const text = target.textContent.trim();

      try {
        await navigator.clipboard.writeText(text);
        button.dataset.copied = "true";
        button.textContent = "✓";

        window.setTimeout(() => {
          button.dataset.copied = "false";
          button.textContent = "⧉";
        }, 1200);
      } catch (error) {
        console.error("Could not copy text.", error);
      }
    });
  });
}

randomizeFourReadingPoints();
installCopyButtons();

fetch("data/reports.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not load reports.json: ${response.status}`);
    }

    return response.json();
  })
  .then((data) => {
    if (!Array.isArray(data)) {
      throw new Error("reports.json must contain an array.");
    }

    const validReports = data.filter((report) => report && report.report);
    const pinned = validReports.filter((report) => report.pinned === true);
    const chronological = validReports
      .filter((report) => report.pinned !== true)
      .sort((a, b) => {
        return String(b.updated || b.date || "").localeCompare(
          String(a.updated || a.date || "")
        );
      });

    reports = [...pinned, ...chronological];
    renderPage(initialPageFromUrl());
  })
  .catch((error) => {
    galleryContainer.innerHTML = `
      <p class="error-message">Could not load the reports.</p>
    `;

    paginationContainer.innerHTML = "";
    console.error(error);
  });
