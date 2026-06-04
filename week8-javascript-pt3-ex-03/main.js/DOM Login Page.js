// Wait for the DOM to fully load before running scripts
document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // PART 1: LOGIN PAGE FUNCTIONALITY
  // ==========================================

  // Get login DOM elements
  const loginForm = document.getElementById("loginForm");
  const modal = document.getElementById("loginModal");
  const tryAgainBtn = document.getElementById("tryAgainBtn");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent page from refreshing on form submission
      validateLogin();
    });
  }

  if (tryAgainBtn) {
    tryAgainBtn.addEventListener("click", dismissModal);
  }

  /**
   * Validates the entered username and password
   */
  function validateLogin() {
    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();

    // Target credentials required by the assignment
    const correctUsername = "admin";
    const correctPassword = "password123";

    if (
      usernameInput === correctUsername &&
      passwordInput === correctPassword
    ) {
      console.log("Login successful! Redirecting...");
      window.location.href = "index.html";
    } else {
      // Bonus Challenge: Debugging log
      console.log("Invalid credentials");

      // Show the modal
      if (modal) {
        modal.style.display = "block";
      }
    }
  }

  /**
   * Hides the error modal
   */
  function dismissModal() {
    if (modal) {
      modal.style.display = "none";
    }
  }

  // ==========================================
  // PART 2: HOME PAGE NAVIGATION TOGGLE
  // ==========================================

  const menuToggleBtn = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");

  if (menuToggleBtn && sidebar) {
    menuToggleBtn.addEventListener("click", toggleNav);
  }

  /**
   * Toggles the width and visibility of the sidebar menu
   */
  function toggleNav() {
    // Toggles the width between open (250px) and closed (0px)
    if (sidebar.style.width === "250px") {
      sidebar.style.width = "0px";
      console.log("Sidebar collapsed");
    } else {
      sidebar.style.width = "250px";
      console.log("Sidebar expanded");
    }
  }
});
