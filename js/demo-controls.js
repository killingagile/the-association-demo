/* ==========================================================================
   Equal Experts Association - Demo Controls
   A floating panel to switch member states and test different scenarios
   ========================================================================== */

const DemoControls = {
  isExpanded: false,
  
  /**
   * Initialize the demo controls panel
   */
  init() {
    // Create the demo controls HTML
    const controlsHTML = `
      <div class="demo-controls" id="demoControls">
        <div class="demo-controls-header" onclick="DemoControls.toggle()">
          <h4>🧪 Demo Controls</h4>
          <button class="demo-controls-toggle">▼</button>
        </div>
        <div class="demo-controls-body">
          <div style="margin-bottom: var(--space-4);">
            <label>Current User</label>
            <select id="demoUserSelect" onchange="DemoControls.switchUser(this.value)">
              <option value="">Not logged in</option>
            </select>
          </div>
          
          <div style="margin-bottom: var(--space-4);" id="demoStatusSection">
            <label>Change Status</label>
            <select id="demoStatusSelect" onchange="DemoControls.changeStatus(this.value)">
              <option value="active">Active</option>
              <option value="past_due">Past Due</option>
              <option value="suspended">Suspended</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <button class="btn btn-sm btn-outline" onclick="DemoControls.resetData()">Reset All Data</button>
          
          <div style="margin-top: var(--space-4); padding-top: var(--space-4); border-top: 1px solid var(--gray-700);">
            <p style="font-size: 10px; color: var(--gray-500); margin: 0;">
              Test accounts (Password123):<br>
              • john.smith@ (Active)<br>
              • jane.doe@ (Past Due)<br>
              • alex.johnson@ (Suspended)<br>
              • sarah.wilson@ (Cancelled)<br>
              • admin@ (Admin - Admin123)
            </p>
          </div>
        </div>
      </div>
    `;
    
    // Insert into body
    document.body.insertAdjacentHTML('beforeend', controlsHTML);
    
    // Populate user select
    this.populateUserSelect();
    
    // Set current state
    this.updateControlsState();
  },
  
  /**
   * Toggle expanded state
   */
  toggle() {
    this.isExpanded = !this.isExpanded;
    const controls = document.getElementById('demoControls');
    controls.classList.toggle('expanded', this.isExpanded);
    
    const toggleBtn = controls.querySelector('.demo-controls-toggle');
    toggleBtn.textContent = this.isExpanded ? '▲' : '▼';
  },
  
  /**
   * Populate the user select dropdown
   */
  populateUserSelect() {
    const select = document.getElementById('demoUserSelect');
    const members = Store.getMembers();
    
    // Keep the "Not logged in" option
    let html = '<option value="">Not logged in</option>';
    
    members.forEach(member => {
      const statusLabel = {
        'active': '🟢',
        'past_due': '🟡',
        'suspended': '🔴',
        'cancelled': '⚫'
      }[member.status] || '⚪';
      
      html += `<option value="${member.id}">${statusLabel} ${member.firstName} ${member.lastName}</option>`;
    });
    
    select.innerHTML = html;
    
    // Set current user if logged in
    const currentUser = Auth.getCurrentUser();
    if (currentUser) {
      select.value = currentUser.id;
    }
  },
  
  /**
   * Update controls state based on current user
   */
  updateControlsState() {
    const currentUser = Auth.getCurrentUser();
    const statusSection = document.getElementById('demoStatusSection');
    const statusSelect = document.getElementById('demoStatusSelect');
    
    if (currentUser) {
      statusSection.style.display = 'block';
      statusSelect.value = currentUser.status;
    } else {
      statusSection.style.display = 'none';
    }
  },
  
  /**
   * Switch to a different user
   */
  switchUser(memberId) {
    if (!memberId) {
      // Log out
      Store.clearCurrentUser();
      window.location.href = 'index.html';
    } else {
      // Log in as selected user
      const member = Store.getMemberById(memberId);
      if (member) {
        Store.setCurrentUser(member);
        
        // Redirect based on status
        if (member.status === 'suspended') {
          window.location.href = 'suspended.html';
        } else {
          window.location.href = 'dashboard.html';
        }
      }
    }
  },
  
  /**
   * Change current user's status
   */
  changeStatus(newStatus) {
    const currentUser = Auth.getCurrentUser();
    if (!currentUser) return;
    
    // Update status using store
    Store.updateMemberStatus(currentUser.id, newStatus);
    
    // Refresh current user
    const updated = Store.getMemberById(currentUser.id);
    Store.setCurrentUser(updated);
    
    // Redirect based on new status
    if (newStatus === 'suspended') {
      window.location.href = 'suspended.html';
    } else {
      // Refresh the current page
      window.location.reload();
    }
  },
  
  /**
   * Reset all data to initial state
   */
  resetData() {
    if (confirm('Reset all demo data? This will log you out and restore initial sample data.')) {
      Store.reset();
      window.location.href = 'index.html';
    }
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  DemoControls.init();
});

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.DemoControls = DemoControls;
}
