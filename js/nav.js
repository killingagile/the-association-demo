/* ==========================================================================
   Equal Experts Association - Navigation & Routing Guards
   ========================================================================== */

const Nav = {
  /**
   * Initialize navigation on page load
   */
  init() {
    // Initialize the store first
    Store.init();
    
    // Check authentication and redirects
    this.checkAuth();
    
    // Update navigation UI
    this.updateNavUI();
    
    // Setup mobile menu
    this.setupMobileMenu();
    
    // Mark current page as active
    this.markActivePage();
  },

  /**
   * Check authentication and handle redirects
   */
  checkAuth() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const user = Auth.getCurrentUser();
    
    // Protected pages that require login
    const protectedPages = ['dashboard.html', 'account.html', 'admin.html'];
    
    // Pages only for suspended users
    const suspendedOnlyPages = ['suspended.html'];
    
    // Admin only pages
    const adminPages = ['admin.html'];
    
    if (protectedPages.includes(currentPage)) {
      if (!user) {
        // Not logged in, redirect to login
        window.location.href = 'login.html';
        return;
      }
      
      // Check if suspended user trying to access non-allowed pages
      if (user.status === 'suspended' && !['account.html', 'support.html'].includes(currentPage)) {
        window.location.href = 'suspended.html';
        return;
      }
      
      // Check admin access
      if (adminPages.includes(currentPage) && !user.isAdmin) {
        window.location.href = 'dashboard.html';
        return;
      }
    }
    
    // Redirect suspended users to suspended page unless on allowed pages
    if (user && user.status === 'suspended') {
      const allowedForSuspended = ['suspended.html', 'account.html', 'support.html', 'login.html', 'index.html'];
      if (!allowedForSuspended.includes(currentPage)) {
        window.location.href = 'suspended.html';
        return;
      }
    }
    
    // Redirect logged-in users away from login/register pages
    if (user && ['login.html', 'register.html'].includes(currentPage)) {
      if (user.status === 'suspended') {
        window.location.href = 'suspended.html';
      } else {
        window.location.href = 'dashboard.html';
      }
      return;
    }
  },

  /**
   * Update navigation UI based on auth state
   */
  updateNavUI() {
    const user = Auth.getCurrentUser();
    const publicNav = document.getElementById('publicNav');
    const memberNav = document.getElementById('memberNav');
    const suspendedNav = document.getElementById('suspendedNav');
    const adminLink = document.getElementById('adminLink');
    const navActions = document.getElementById('navActions');
    
    if (user) {
      // Show appropriate nav based on status
      if (publicNav) publicNav.style.display = 'none';
      
      if (user.status === 'suspended') {
        if (memberNav) memberNav.style.display = 'none';
        if (suspendedNav) suspendedNav.style.display = 'flex';
      } else {
        if (memberNav) memberNav.style.display = 'flex';
        if (suspendedNav) suspendedNav.style.display = 'none';
      }
      
      // Show admin link if admin
      if (adminLink) {
        adminLink.style.display = user.isAdmin ? 'block' : 'none';
      }
      
      // Show logout button
      if (navActions) {
        navActions.innerHTML = `
          <span class="text-sm text-gray">${user.firstName}</span>
          <button onclick="Auth.logout()" class="btn btn-outline btn-sm">Logout</button>
        `;
      }
    } else {
      // Show public nav
      if (publicNav) publicNav.style.display = 'flex';
      if (memberNav) memberNav.style.display = 'none';
      if (suspendedNav) suspendedNav.style.display = 'none';
      
      // Show login button
      if (navActions) {
        navActions.innerHTML = `
          <a href="login.html" class="btn btn-secondary btn-sm">Login</a>
        `;
      }
    }
  },

  /**
   * Setup mobile menu toggle
   */
  setupMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
      });
    }
  },

  /**
   * Mark current page in navigation
   */
  markActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      }
    });
  },

  /**
   * Get navigation HTML
   */
  getNavHTML() {
    return `
    <nav class="nav">
      <div class="nav-container">
        <a href="index.html" class="nav-logo">
          <div class="nav-logo-icon">EE</div>
          <span>EE Association</span>
        </a>
        
        <button class="nav-toggle" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <!-- Public Navigation -->
        <ul class="nav-menu" id="publicNav">
          <li><a href="index.html" class="nav-link">Home</a></li>
          <li><a href="benefits.html" class="nav-link">Benefits</a></li>
          <li><a href="support.html" class="nav-link">Support</a></li>
        </ul>
        
        <!-- Member Navigation -->
        <ul class="nav-menu" id="memberNav" style="display: none;">
          <li><a href="dashboard.html" class="nav-link">Dashboard</a></li>
          <li><a href="benefits.html" class="nav-link">Benefits</a></li>
          <li><a href="account.html" class="nav-link">Account</a></li>
          <li><a href="support.html" class="nav-link">Support</a></li>
          <li id="adminLink" style="display: none;"><a href="admin.html" class="nav-link">Admin</a></li>
        </ul>
        
        <!-- Suspended Navigation -->
        <ul class="nav-menu" id="suspendedNav" style="display: none;">
          <li><a href="account.html" class="nav-link">Account</a></li>
          <li><a href="support.html" class="nav-link">Support</a></li>
        </ul>
        
        <div class="nav-actions" id="navActions">
          <a href="login.html" class="btn btn-secondary btn-sm">Login</a>
        </div>
      </div>
    </nav>
    `;
  },

  /**
   * Get footer HTML
   */
  getFooterHTML() {
    return `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>About</h4>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="benefits.html">Benefits</a></li>
              <li><a href="support.html">Support</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Legal</h4>
            <ul class="footer-links">
              <li><a href="#">Membership Rules</a></li>
              <li><a href="#">Articles of Association</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Support</h4>
            <ul class="footer-links">
              <li><a href="support.html">FAQs</a></li>
              <li><a href="#">#ask-ee-association</a></li>
              <li><a href="mailto:support@ee-association.com">Email Support</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Contact</h4>
            <ul class="footer-links">
              <li>Slack: #ask-ee-association</li>
              <li>Mon-Fri, 9am-5pm GMT</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} Equal Experts Association Ltd. Company Limited by Guarantee.</p>
        </div>
      </div>
    </footer>
    `;
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  Nav.init();
});

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.Nav = Nav;
}
