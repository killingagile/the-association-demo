/* ==========================================================================
   Equal Experts Association - Authentication Module
   ========================================================================== */

const Auth = {
  /**
   * Check if user is logged in
   */
  isLoggedIn() {
    return Store.getCurrentUser() !== null;
  },

  /**
   * Get current user
   */
  getCurrentUser() {
    return Store.getCurrentUser();
  },

  /**
   * Get current user's status
   */
  getUserStatus() {
    const user = this.getCurrentUser();
    return user ? user.status : null;
  },

  /**
   * Check if current user is admin
   */
  isAdmin() {
    const user = this.getCurrentUser();
    return user ? user.isAdmin === true : false;
  },

  /**
   * Login with email and password
   */
  login(email, password) {
    const member = Store.getMemberByEmail(email);
    
    if (!member) {
      return { success: false, error: 'Email address not found.' };
    }
    
    if (member.password !== password) {
      return { success: false, error: 'Incorrect password.' };
    }
    
    // Set current user
    Store.setCurrentUser(member);
    
    return { success: true, user: member };
  },

  /**
   * Logout current user
   */
  logout() {
    Store.clearCurrentUser();
    window.location.href = 'index.html';
  },

  /**
   * Register a new member
   */
  register(formData) {
    // Check allowlist
    if (!Store.isEmailAllowed(formData.email)) {
      return { 
        success: false, 
        error: 'This email address is not eligible for membership. Contact us if you believe this is an error.' 
      };
    }

    // Check if email already registered
    const existing = Store.getMemberByEmail(formData.email);
    if (existing) {
      return { 
        success: false, 
        error: 'An account with this email address already exists.' 
      };
    }

    // Create new member
    const now = new Date();
    const joinDate = now.toISOString().split('T')[0];
    const commitmentEndDate = new Date(now);
    commitmentEndDate.setFullYear(commitmentEndDate.getFullYear() + 1);
    const nextPaymentDate = new Date(now);
    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);

    const newMember = {
      id: Store.generateMemberId(),
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      relationshipToEE: formData.relationshipToEE,
      status: 'active',
      joinDate: joinDate,
      activationDate: joinDate,
      commitmentEndDate: commitmentEndDate.toISOString().split('T')[0],
      nextPaymentDate: nextPaymentDate.toISOString().split('T')[0],
      lastPaymentDate: joinDate,
      lastPaymentAmount: 25.00,
      rulesAccepted: true,
      rulesAcceptanceTimestamp: now.toISOString(),
      rulesAcceptanceIP: '192.168.1.' + Math.floor(Math.random() * 255), // Mock IP
      cancellationDate: null,
      paymentMethod: {
        type: 'card',
        last4: formData.cardNumber.slice(-4),
        brand: this.detectCardBrand(formData.cardNumber),
        expMonth: parseInt(formData.expMonth),
        expYear: parseInt(formData.expYear)
      },
      billingAddress: {
        line1: formData.addressLine1,
        line2: formData.addressLine2 || '',
        city: formData.city,
        postcode: formData.postcode,
        country: formData.country || 'United Kingdom'
      },
      checklist: {
        slack: false,
        benefits: false,
        insurance: false,
        gp: false
      },
      suspensionHistory: [],
      isAdmin: false
    };

    // Save member
    Store.saveMember(newMember);
    
    // Log them in
    Store.setCurrentUser(newMember);
    
    return { success: true, user: newMember };
  },

  /**
   * Detect card brand from number
   */
  detectCardBrand(cardNumber) {
    const num = cardNumber.replace(/\s/g, '');
    if (/^4/.test(num)) return 'Visa';
    if (/^5[1-5]/.test(num)) return 'Mastercard';
    if (/^3[47]/.test(num)) return 'Amex';
    if (/^6(?:011|5)/.test(num)) return 'Discover';
    return 'Card';
  },

  /**
   * Update current user's profile
   */
  updateProfile(updates) {
    const user = this.getCurrentUser();
    if (!user) {
      return { success: false, error: 'Not logged in.' };
    }

    // Apply updates
    Object.assign(user, updates);
    
    // Save
    Store.saveMember(user);
    
    return { success: true, user };
  },

  /**
   * Update password
   */
  updatePassword(currentPassword, newPassword) {
    const user = this.getCurrentUser();
    if (!user) {
      return { success: false, error: 'Not logged in.' };
    }

    if (user.password !== currentPassword) {
      return { success: false, error: 'Current password is incorrect.' };
    }

    user.password = newPassword;
    Store.saveMember(user);
    
    return { success: true };
  },

  /**
   * Cancel membership
   */
  cancelMembership() {
    const user = this.getCurrentUser();
    if (!user) {
      return { success: false, error: 'Not logged in.' };
    }

    Store.updateMemberStatus(user.id, 'cancelled');
    
    // Refresh current user
    const updated = Store.getMemberById(user.id);
    Store.setCurrentUser(updated);
    
    return { success: true, user: updated };
  },

  /**
   * Simulate payment update (for demo)
   */
  updatePaymentMethod(paymentData) {
    const user = this.getCurrentUser();
    if (!user) {
      return { success: false, error: 'Not logged in.' };
    }

    user.paymentMethod = {
      type: 'card',
      last4: paymentData.cardNumber.slice(-4),
      brand: this.detectCardBrand(paymentData.cardNumber),
      expMonth: parseInt(paymentData.expMonth),
      expYear: parseInt(paymentData.expYear)
    };

    // If user was suspended, reactivate them
    if (user.status === 'suspended') {
      user.status = 'active';
      user.failedPaymentDate = null;
      user.failedPaymentAmount = null;
      
      // Update suspension history
      if (user.suspensionHistory && user.suspensionHistory.length > 0) {
        const lastSuspension = user.suspensionHistory[user.suspensionHistory.length - 1];
        if (!lastSuspension.dateReactivated) {
          lastSuspension.dateReactivated = new Date().toISOString().split('T')[0];
          const startDate = new Date(lastSuspension.dateSuspended);
          lastSuspension.duration = Math.ceil((new Date() - startDate) / (1000 * 60 * 60 * 24)) + ' days';
        }
      }
      
      // Set next payment date
      const nextDate = new Date();
      nextDate.setMonth(nextDate.getMonth() + 1);
      user.nextPaymentDate = nextDate.toISOString().split('T')[0];
      user.lastPaymentDate = new Date().toISOString().split('T')[0];
      user.lastPaymentAmount = 25.00;
    }

    Store.saveMember(user);
    
    return { success: true, user };
  },

  /**
   * Check if current page requires authentication
   */
  requiresAuth(page) {
    const protectedPages = ['dashboard', 'account', 'suspended', 'admin'];
    return protectedPages.some(p => page.includes(p));
  },

  /**
   * Check if current page requires admin
   */
  requiresAdmin(page) {
    return page.includes('admin');
  }
};

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.Auth = Auth;
}
