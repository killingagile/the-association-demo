/* ==========================================================================
   Equal Experts Association - Data Store (localStorage persistence)
   ========================================================================== */

const STORE_KEYS = {
  MEMBERS: 'eea_members',
  CURRENT_USER: 'eea_current_user',
  ALLOWLIST: 'eea_allowlist',
  INITIALIZED: 'eea_initialized'
};

const Store = {
  /**
   * Initialize the store with sample data if not already initialized
   */
  init() {
    if (!localStorage.getItem(STORE_KEYS.INITIALIZED)) {
      // Copy sample data to localStorage
      if (window.EEAData) {
        localStorage.setItem(STORE_KEYS.MEMBERS, JSON.stringify(window.EEAData.SAMPLE_MEMBERS));
        localStorage.setItem(STORE_KEYS.ALLOWLIST, JSON.stringify(window.EEAData.EMAIL_ALLOWLIST));
      }
      localStorage.setItem(STORE_KEYS.INITIALIZED, 'true');
    }
  },

  /**
   * Reset the store to initial sample data
   */
  reset() {
    localStorage.removeItem(STORE_KEYS.INITIALIZED);
    localStorage.removeItem(STORE_KEYS.MEMBERS);
    localStorage.removeItem(STORE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORE_KEYS.ALLOWLIST);
    this.init();
  },

  /**
   * Get all members
   */
  getMembers() {
    const data = localStorage.getItem(STORE_KEYS.MEMBERS);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Get a member by ID
   */
  getMemberById(id) {
    const members = this.getMembers();
    return members.find(m => m.id === id) || null;
  },

  /**
   * Get a member by email
   */
  getMemberByEmail(email) {
    const members = this.getMembers();
    return members.find(m => m.email.toLowerCase() === email.toLowerCase()) || null;
  },

  /**
   * Save/Update a member
   */
  saveMember(member) {
    const members = this.getMembers();
    const index = members.findIndex(m => m.id === member.id);
    
    if (index >= 0) {
      members[index] = member;
    } else {
      members.push(member);
    }
    
    localStorage.setItem(STORE_KEYS.MEMBERS, JSON.stringify(members));
    
    // Update current user if it's the same member
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === member.id) {
      this.setCurrentUser(member);
    }
    
    return member;
  },

  /**
   * Generate next member ID
   */
  generateMemberId() {
    const members = this.getMembers();
    const year = new Date().getFullYear();
    const maxNum = members
      .filter(m => m.id.startsWith(`EEA-${year}`))
      .map(m => parseInt(m.id.split('-')[2]))
      .reduce((max, num) => Math.max(max, num), 0);
    
    const nextNum = (maxNum + 1).toString().padStart(4, '0');
    return `EEA-${year}-${nextNum}`;
  },

  /**
   * Get the email allowlist
   */
  getAllowlist() {
    const data = localStorage.getItem(STORE_KEYS.ALLOWLIST);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Update the email allowlist
   */
  updateAllowlist(emails) {
    localStorage.setItem(STORE_KEYS.ALLOWLIST, JSON.stringify(emails));
    return emails;
  },

  /**
   * Check if email is on allowlist
   */
  isEmailAllowed(email) {
    const allowlist = this.getAllowlist();
    return allowlist.some(e => e.toLowerCase() === email.toLowerCase());
  },

  /**
   * Get current logged in user
   */
  getCurrentUser() {
    const data = localStorage.getItem(STORE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },

  /**
   * Set current logged in user
   */
  setCurrentUser(user) {
    if (user) {
      localStorage.setItem(STORE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORE_KEYS.CURRENT_USER);
    }
  },

  /**
   * Clear current user (logout)
   */
  clearCurrentUser() {
    localStorage.removeItem(STORE_KEYS.CURRENT_USER);
  },

  /**
   * Update member status
   */
  updateMemberStatus(memberId, status) {
    const member = this.getMemberById(memberId);
    if (member) {
      member.status = status;
      
      // Handle status-specific updates
      if (status === 'cancelled') {
        member.cancellationDate = new Date().toISOString().split('T')[0];
        // Set access end date to end of current billing period (next payment date or 30 days from now)
        const accessEnd = member.nextPaymentDate || 
          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        member.accessEndsDate = accessEnd;
        member.nextPaymentDate = null;
      }
      
      if (status === 'suspended') {
        // Add to suspension history
        if (!member.suspensionHistory) {
          member.suspensionHistory = [];
        }
        member.suspensionHistory.push({
          dateSuspended: new Date().toISOString().split('T')[0],
          dateReactivated: null,
          reason: 'Payment failure',
          duration: null
        });
      }
      
      if (status === 'active') {
        // If reactivating from suspended, update suspension history
        if (member.suspensionHistory && member.suspensionHistory.length > 0) {
          const lastSuspension = member.suspensionHistory[member.suspensionHistory.length - 1];
          if (!lastSuspension.dateReactivated) {
            lastSuspension.dateReactivated = new Date().toISOString().split('T')[0];
            const startDate = new Date(lastSuspension.dateSuspended);
            const endDate = new Date();
            lastSuspension.duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + ' days';
          }
        }
        // Reset failed payment info
        member.failedPaymentDate = null;
        member.failedPaymentAmount = null;
        // Set next payment date if not set
        if (!member.nextPaymentDate) {
          const nextDate = new Date();
          nextDate.setMonth(nextDate.getMonth() + 1);
          member.nextPaymentDate = nextDate.toISOString().split('T')[0];
        }
      }
      
      this.saveMember(member);
    }
    return member;
  },

  /**
   * Update member checklist
   */
  updateChecklist(memberId, checklistItem, value) {
    const member = this.getMemberById(memberId);
    if (member && member.checklist) {
      member.checklist[checklistItem] = value;
      this.saveMember(member);
    }
    return member;
  },

  /**
   * Export members to CSV format
   */
  exportToCSV() {
    const members = this.getMembers();
    const headers = [
      'Member ID',
      'Name',
      'Email',
      'Status',
      'Join Date',
      'Activation Date',
      'Commitment End Date',
      'Plan',
      'Next Payment Date',
      'Cancellation Date'
    ];
    
    const rows = members.map(m => [
      m.id,
      `${m.firstName} ${m.lastName}`,
      m.email,
      m.status,
      m.joinDate,
      m.activationDate,
      m.commitmentEndDate,
      'Professional Membership - £25/month',
      m.nextPaymentDate || '',
      m.cancellationDate || ''
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(v => `"${v}"`).join(','))
    ].join('\n');
    
    return csvContent;
  },

  /**
   * Download CSV file
   */
  downloadCSV() {
    const csv = this.exportToCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `eea-members-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  }
};

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.Store = Store;
}
