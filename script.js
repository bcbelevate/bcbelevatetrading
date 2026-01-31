// CONFIGURATION: PASTE YOUR WEB APP URL HERE
// Example: "https://script.google.com/macros/s/AKfycbx.../exec"
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz0Nzu6cJpzXclbP2C9NIwFogoVZ9zG5g4CD69qjc4zXCgBQZZMbC_jXoVbSIAmtG9H/exec";

// --- FIREBASE CONFIGURATION (Integrated for Local Support) ---
const firebaseConfig = {
    apiKey: "AIzaSyDw0rBOawL8YSgDLrzEopivEBf5A3N7wnc",
    authDomain: "bcb-elevate-website.firebaseapp.com",
    projectId: "bcb-elevate-website",
    storageBucket: "bcb-elevate-website.firebasestorage.app",
    messagingSenderId: "587406099664",
    appId: "1:587406099664:web:659f48763e935b5e56cad5",
    measurementId: "G-21T50C1PSE"
};

// Initialize Firebase (Global Namespace)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements - UI
    const modal = document.getElementById('setup-modal');
    const openBtn = document.getElementById('open-setup-btn');
    const closeBtn = document.querySelector('.close-modal');
    const modeCards = document.querySelectorAll('.mode-card');
    const accountForm = document.getElementById('account-form');
    const selectedModeText = document.getElementById('selected-mode-text');

    // DOM Elements - Auth
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const userProfile = document.getElementById('user-profile');
    const userPic = document.getElementById('user-pic');
    const userDisplayName = document.getElementById('user-display-name');

    let currentMode = 'demo';
    let currentUser = null;

    // --- AUTHENTICATION LOGIC ---

    // Login Modal Elements
    const loginModal = document.getElementById('login-modal');
    const closeLoginBtn = document.querySelector('.close-login');
    const googleLoginBtn = document.getElementById('google-login-btn');
    const phoneLoginBtn = document.getElementById('phone-login-btn');
    const loginOptions = document.getElementById('login-options');
    const phoneAuthSection = document.getElementById('phone-auth-section');
    const backToLoginBtn = document.getElementById('back-to-login');

    const sendOtpBtn = document.getElementById('send-otp-btn');
    const verifyOtpBtn = document.getElementById('verify-otp-btn');
    const phoneInput = document.getElementById('phone-input');
    const otpInput = document.getElementById('otp-input');
    const otpGroup = document.getElementById('otp-group');

    // Open Login Modal
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentUser) return; // Already logged in
            loginModal.style.display = 'flex';
        });
    }

    // Close Login Modal
    if (closeLoginBtn) {
        closeLoginBtn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            resetLoginModal();
        });
    }

    // Switch to Phone Auth
    phoneLoginBtn.addEventListener('click', () => {
        loginOptions.style.display = 'none';
        phoneAuthSection.style.display = 'block';
    });

    // Back to Options
    backToLoginBtn.addEventListener('click', () => {
        phoneAuthSection.style.display = 'none';
        loginOptions.style.display = 'block';
    });

    function resetLoginModal() {
        loginOptions.style.display = 'block';
        phoneAuthSection.style.display = 'none';
        otpGroup.style.display = 'none';
        phoneInput.value = '';
        otpInput.value = '';
    }

    // 1. Google Login
    googleLoginBtn.addEventListener('click', () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                console.log("Logged in via Google:", result.user.displayName);
                loginModal.style.display = 'none';
            }).catch((error) => {
                alert("Google Login Failed: " + error.message);
            });
    });

    // 2. Phone Auth Setup (Recaptcha)
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            console.log("Recaptcha Verified");
        }
    });

    // 3. Send OTP
    sendOtpBtn.addEventListener('click', () => {
        const phoneNumber = phoneInput.value;
        if (!phoneNumber) { alert("Please enter a valid phone number with country code (e.g., +91...)"); return; }

        const appVerifier = window.recaptchaVerifier;

        auth.signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message.
                window.confirmationResult = confirmationResult;
                alert("OTP Sent to " + phoneNumber);

                sendOtpBtn.style.display = 'none';
                otpGroup.style.display = 'block';
            }).catch((error) => {
                console.error("Error sending SMS:", error);
                alert("Error sending SMS. Ensure 'Phone' is enabled in Firebase Console.\n\nError: " + error.message);
                // Reset Recaptcha
                window.recaptchaVerifier.render().then(function (widgetId) {
                    grecaptcha.reset(widgetId);
                });
            });
    });

    // 4. Verify OTP
    verifyOtpBtn.addEventListener('click', () => {
        const code = otpInput.value;
        if (!code) return;

        window.confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log("Phone Login Success:", user.phoneNumber);
            loginModal.style.display = 'none';
        }).catch((error) => {
            alert("Incorrect OTP");
        });
    });

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            auth.signOut();
        });
    }

    // Auth State Listener
    auth.onAuthStateChanged((user) => {
        if (user) {
            currentUser = user;
            // User is signed in
            loginBtn.style.display = 'none';
            userProfile.style.display = 'flex';

            // Handle Phone Users (who might not have a photo or display name)
            userPic.src = user.photoURL || "https://ui-avatars.com/api/?name=User&background=random";
            userDisplayName.textContent = user.displayName ? user.displayName.split(' ')[0] : (user.phoneNumber || "Trader");

            const formNameInput = document.querySelector('input#user-name');
            if (formNameInput && user.displayName) formNameInput.value = user.displayName;

        } else {
            currentUser = null;
            // User is signed out
            loginBtn.style.display = 'inline-block';
            userProfile.style.display = 'none';
        }
    });


    // --- APP LOGIC ---

    // Open Modal
    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        showStep(1);
    });

    // Close Modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        resetForm();
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            resetForm();
        }
    });

    // Step 1: Mode Selection
    modeCards.forEach(card => {
        card.addEventListener('click', () => {
            currentMode = card.dataset.mode;
            selectedModeText.textContent = `Connecting to ${currentMode === 'demo' ? 'Demo' : 'Real'} Server...`;
            showStep(2);
        });
    });

    // Step 2 & 3: Form Submission & Simulation
    accountForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formNameInput = document.querySelector('input#user-name');
        const name = formNameInput ? formNameInput.value : "Unknown";

        const contact = document.getElementById('contact-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const accountId = document.getElementById('account-id').value;
        const serverName = document.getElementById('server-name').value;

        if (accountId && serverName && name && contact && expiryDate) {
            showStep(3); // Show loader

            // 1. Send data to Google Sheet
            if (GOOGLE_SCRIPT_URL) {
                fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        accountId: accountId,
                        mode: currentMode,
                        name: name,
                        contact: contact,
                        expiryDate: expiryDate,
                        server: serverName
                    })
                }).then(() => {
                    console.log("Request sent to Google Sheet");
                }).catch(err => {
                    console.error("Error logging to sheet:", err);
                });
            } else {
                console.log("Google Script URL not set. Data not saved.");
            }

            // 2. Simulate Connection Latency (Visual feedback only)
            setTimeout(() => {
                showStep(4); // Show success
            }, 3000); // 3 seconds delay for realism
        }
    });

    function showStep(stepNumber) {
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
        });
        document.getElementById(`step-${stepNumber}`).classList.add('active');
    }

    function resetForm() {
        accountForm.reset();
    }

    // --- THEME TOGGLE LOGIC ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    // Check local storage (Safe for file://)
    let savedTheme = 'dark';
    try {
        savedTheme = localStorage.getItem('theme') || 'dark';
    } catch (e) { console.warn('LocalStorage blocked'); }

    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (sunIcon && moonIcon) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (sunIcon && moonIcon) {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', newTheme);
            try {
                localStorage.setItem('theme', newTheme);
            } catch (e) { /* Ignore */ }

            if (sunIcon && moonIcon) {
                if (newTheme === 'light') {
                    sunIcon.style.display = 'none';
                    moonIcon.style.display = 'block';
                } else {
                    moonIcon.style.display = 'none';
                    sunIcon.style.display = 'block';
                }
            }
        });
    }

    // --- MOBILE MENU LOGIC ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');
    const dropdownItem = document.querySelector('.dropdown-item');
    const dropdownTrigger = document.querySelector('.dropdown-trigger');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // If it's the dropdown trigger, don't close immediately on mobile
            if (item.classList.contains('dropdown-trigger') && window.innerWidth <= 768) {
                e.preventDefault();
                dropdownItem.classList.toggle('active');
                return;
            }
            if (!item.classList.contains('dropdown-trigger')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
});
