document.addEventListener("DOMContentLoaded", () => {
  // Application Global State Object
  let developersState = [];
  let activeView = "card"; // Track visual presentation mode ('card' | 'table')
  let currentSearchTerm = "";

  // Core DOM Element Selectors
  const cardViewContainer = document.getElementById("cardViewContainer");
  const tableViewContainer = document.getElementById("tableViewContainer");
  const tableBody = document.getElementById("tableBody");
  const searchInput = document.getElementById("searchInput");
  const devCounter = document.getElementById("devCounter");
  const cardViewBtn = document.getElementById("cardViewBtn");
  const tableViewBtn = document.getElementById("tableViewBtn");
  const addDevForm = document.getElementById("addDevForm");

  /**
   * Phase 1: Initialize System Data Engine
   */
  async function initApp() {
    try {
      const response = await fetch("developers.json");
      if (!response.ok) {
        throw new Error(
          `HTTP network error encountered: Status ${response.status}`,
        );
      }
      developersState = await response.json();
      renderDirectory();
    } catch (error) {
      console.error("Error fetching developers data pipeline:", error);
      cardViewContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fa-solid fa-triangle-exclamation text-danger fs-1 mb-3"></i>
                    <p class="text-muted">Failed to safely parse standard corporate developer directory JSON context payload structural layout. Please review active network console assertions.</p>
                </div>`;
    }
  }

  /**
   * Phase 2: Render Engineering Pipeline
   */
  function renderDirectory() {
    // Clear out existing dynamic structural allocations
    cardViewContainer.innerHTML = "";
    tableBody.innerHTML = "";

    // Process search matches across metrics indices safely
    const filteredDevs = developersState.filter((dev) => {
      const query = currentSearchTerm.toLowerCase().trim();
      if (!query) return true;

      const nameMatch = dev.name.toLowerCase().includes(query);
      const roleMatch = dev.role.toLowerCase().includes(query);
      const skillsMatch = dev.skills.some((skill) =>
        skill.toLowerCase().includes(query),
      );

      return nameMatch || roleMatch || skillsMatch;
    });

    // Sync the operational registry metric badge counter counter asset
    devCounter.textContent = filteredDevs.length;

    // Render empty state alert if criteria eliminates full layout target match array
    if (filteredDevs.length === 0) {
      const emptyHtml = `
                <div class="col-12 text-center py-5 bg-white rounded shadow-sm">
                    <i class="fa-solid fa-user-slash text-muted fs-2 mb-2"></i>
                    <p class="text-muted mb-0">No active operational profiles found matching the specific filtering context.</p>
                </div>`;
      if (activeView === "card") {
        cardViewContainer.innerHTML = emptyHtml;
      } else {
        tableBody.innerHTML = `<tr><td colspan="5">${emptyHtml}</td></tr>`;
      }
      return;
    }

    // Build UI nodes according to modern JS rendering patterns
    filteredDevs.forEach((dev) => {
      // Layout Variant A: Grid Presentation Mode Node Logic
      const cardCol = document.createElement("div");
      cardCol.className = "col";
      cardCol.innerHTML = `
                <div class="card h-100 shadow-sm dev-card ${dev.available ? "is-hirable" : ""}" data-id="${dev.id}">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h5 class="card-title fw-bold text-dark mb-0">${dev.name}</h5>
                                <div class="badge-zone">
                                    ${dev.available ? '<span class="badge bg-success"><i class="fa-solid fa-circle-check me-1"></i>Available</span>' : ""}
                                </div>
                            </div>
                            <h6 class="card-subtitle mb-3 text-primary font-monospace small fw-bold">${dev.role}</h6>
                            <div class="mb-3 d-flex flex-wrap gap-1">
                                ${dev.skills.map((skill) => `<span class="badge skill-badge rounded-pill">${skill}</span>`).join("")}
                            </div>
                        </div>
                        <div class="border-top pt-3 mt-2 d-flex justify-content-between align-items-center">
                            <span class="text-muted small"><i class="fa-solid fa-location-dot me-1"></i>${dev.location}</span>
                            <button class="btn btn-sm ${dev.available ? "btn-outline-danger" : "btn-outline-success"} toggle-hire-btn" data-id="${dev.id}">
                                ${dev.available ? "Mark Unavailable" : "Mark Available"}
                            </button>
                        </div>
                    </div>
                </div>`;
      cardViewContainer.appendChild(cardCol);

      // Layout Variant B: Rows Presentation Table Framework Interface Row Node Logic
      const tableRow = document.createElement("tr");
      tableRow.setAttribute("data-id", dev.id);
      tableRow.innerHTML = `
                <td>
                    <div class="fw-bold text-dark">${dev.name}</div>
                </td>
                <td><span class="text-secondary font-monospace small">${dev.role}</span></td>
                <td>
                    <div class="d-flex flex-wrap gap-1">
                        ${dev.skills.map((skill) => `<span class="badge skill-badge rounded-pill">${skill}</span>`).join("")}
                    </div>
                </td>
                <td><span class="text-muted small">${dev.location}</span></td>
                <td class="text-center">
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <div class="badge-zone-table">
                            ${dev.available ? '<span class="badge bg-success">Available</span>' : '<span class="badge bg-secondary">Unavailable</span>'}
                        </div>
                        <button class="btn btn-sm btn-light border toggle-hire-btn p-1 px-2" data-id="${dev.id}" title="Toggle Profile Status">
                            <i class="fa-solid fa-arrows-rotate text-muted"></i>
                        </button>
                    </div>
                </td>`;
      tableBody.appendChild(tableRow);
    });

    // Re-bind listeners down to dynamically initialized execution targets
    bindDynamicInteractionListeners();
  }

  /**
   * Phase 3: Live Input Filtering Controller Engine
   */
  searchInput.addEventListener("input", (e) => {
    currentSearchTerm = e.target.value;
    renderDirectory();
  });

  /**
   * Phase 4: Toggle Display Layout Interface Core Drivers
   */
  cardViewBtn.addEventListener("click", () => {
    if (activeView === "card") return;
    activeView = "card";
    toggleLayoutUIVisibility();
  });

  tableViewBtn.addEventListener("click", () => {
    if (activeView === "table") return;
    activeView = "table";
    toggleLayoutUIVisibility();
  });

  function toggleLayoutUIVisibility() {
    if (activeView === "card") {
      cardViewBtn.classList.add("active");
      tableViewBtn.classList.remove("active");
      cardViewContainer.classList.remove("d-none");
      tableViewContainer.classList.add("d-none");
    } else {
      tableViewBtn.classList.add("active");
      cardViewBtn.classList.remove("active");
      tableViewContainer.classList.remove("d-none");
      cardViewContainer.classList.add("d-none");
    }
    renderDirectory();
  }

  /**
   * Phase 5: Inline Hire Status State Manager
   */
  function bindDynamicInteractionListeners() {
    const toggleButtons = document.querySelectorAll(".toggle-hire-btn");
    toggleButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const devId = parseInt(btn.getAttribute("data-id"), 10);

        // Track item back to core array object references
        const targetDev = developersState.find((d) => d.id === devId);
        if (targetDev) {
          // Update object state
          targetDev.available = !targetDev.available;

          // Client requirement complete: Trigger pure DOM Class Manipulation without redrawing full layout
          applyInlineDOMBadgeToggle(devId, targetDev.available);
        }
      });
    });
  }

  function applyInlineDOMBadgeToggle(id, isAvailable) {
    // Find corresponding element layouts within the memory tree
    const cardElement = cardViewContainer.querySelector(
      `.dev-card[data-id="${id}"]`,
    );
    const rowElement = tableBody.querySelector(`tr[data-id="${id}"]`);

    // Apply mutations across active elements if found
    if (cardElement) {
      const badgeZone = cardElement.querySelector(".badge-zone");
      const actionBtn = cardElement.querySelector(".toggle-hire-btn");

      if (isAvailable) {
        cardElement.classList.add("is-hirable");
        badgeZone.innerHTML =
          '<span class="badge bg-success"><i class="fa-solid fa-circle-check me-1"></i>Available</span>';
        actionBtn.className = "btn btn-sm btn-outline-danger toggle-hire-btn";
        actionBtn.textContent = "Mark Unavailable";
      } else {
        cardElement.classList.remove("is-hirable");
        badgeZone.innerHTML = "";
        actionBtn.className = "btn btn-sm btn-outline-success toggle-hire-btn";
        actionBtn.textContent = "Mark Available";
      }
    }

    if (rowElement) {
      const badgeZoneTable = rowElement.querySelector(".badge-zone-table");
      if (badgeZoneTable) {
        badgeZoneTable.innerHTML = isAvailable
          ? '<span class="badge bg-success">Available</span>'
          : '<span class="badge bg-secondary">Unavailable</span>';
      }
    }

    // Re-evaluate counts across state engine records dynamically
    const matchingDevsCount = developersState.filter((dev) => {
      const query = currentSearchTerm.toLowerCase().trim();
      return (
        !query ||
        dev.name.toLowerCase().includes(query) ||
        dev.role.toLowerCase().includes(query) ||
        dev.skills.some((s) => s.toLowerCase().includes(query))
      );
    }).length;
    devCounter.textContent = matchingDevsCount;
  }

  /**
   * Phase 6: Form Processor & Client Validation Core Engine
   */
  addDevForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Standard Bootstrap 5 programmatic structural form validation confirmation checking metrics
    if (!addDevForm.checkValidity()) {
      e.stopPropagation();
      addDevForm.classList.add("was-validated");
      return;
    }

    // Parse skills from comma-separated input string
    const rawSkills = document.getElementById("devSkills").value;
    const processedSkillsArray = rawSkills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    // Standardize registration packet metadata
    const newDeveloper = {
      id:
        developersState.length > 0
          ? Math.max(...developersState.map((d) => d.id)) + 1
          : 1,
      name: document.getElementById("devName").value.trim(),
      role: document.getElementById("devRole").value.trim(),
      skills: processedSkillsArray,
      location: document.getElementById("devLocation").value.trim(),
      available: document.getElementById("devAvailable").checked,
    };

    // Append new registry payload cleanly without breaking ongoing operations
    developersState.push(newDeveloper);
    renderDirectory();

    // Reset application form input context elements completely
    addDevForm.reset();
    addDevForm.classList.remove("was-validated");
  });

  // Run core engine initial sequence mapping setup routines
  initApp();
});
