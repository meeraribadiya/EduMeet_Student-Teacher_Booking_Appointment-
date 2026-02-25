import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB49ZsoYZR0KxIFqzEj5aBAXMqQKznK3Bg",
    authDomain: "student-teacher-booking-bb81a.firebaseapp.com",
    projectId: "student-teacher-booking-bb81a",
    storageBucket: "student-teacher-booking-bb81a.appspot.com",
    messagingSenderId: "537650428593",
    appId: "1:537650428593:web:d0e5a2310abf7748c7c090"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const DB_PREFIX = 'booking_app_';

/**
 * ==========================================
 * AUTHENTICATION HELPERS
 * ==========================================
 */

export function getCurrentUser() {
    const data = localStorage.getItem(DB_PREFIX + 'currentUser');
    return data ? JSON.parse(data) : null;
}

export function requireAuth(requiredRole = null) {
    const user = getCurrentUser();
    const prefix = getBasePrefix();

    if (!user) {
        window.location.href = `${prefix}auth/login.html`;
        return;
    }

    if (requiredRole && user.role.toLowerCase() !== requiredRole.toLowerCase()) {
        alert("Unauthorized Access!");
        window.location.href = `${prefix}auth/login.html`;
    }
}

export async function handleLogin(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();

            localStorage.setItem(DB_PREFIX + 'currentUser', JSON.stringify({ id: user.uid, ...userData }));

            const role = userData.role.toLowerCase().trim();
            window.location.href = `../roles/${role}/${role}.html`;
        } else {
            throw new Error("User profile not found in database.");
        }
    } catch (error) {
        throw error;
    }
}

export function logoutUser() {
    signOut(auth).then(() => {
        localStorage.removeItem(DB_PREFIX + 'currentUser');
        const prefix = getBasePrefix();
        window.location.href = `${prefix}auth/login.html`;
    }).catch((err) => console.error("Logout failed:", err));
}

/**
 * ==========================================
 * DATA FETCHING HELPERS
 * ==========================================
 */

export async function getTeachersList() {
    try {
        const q = query(collection(db, "users"), where("role", "==", "teacher"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return [];
    }
}

/**
 * ==========================================
 * UI & PATH HELPERS
 * ==========================================
 */

function getBasePrefix() {
    const p = window.location.pathname.replace(/\\/g, '/');
    if (p.includes('/roles/')) return '../../';
    if (p.includes('/auth/')) return '../';
    return './';
}

export function updateWelcomeUI() {
    const user = getCurrentUser();
    const welcomeElements = document.querySelectorAll('.welcome-name');
    if (user && user.name) {
        welcomeElements.forEach(el => {
            el.textContent = user.name;
        });
    }
}

export function renderNavbar() {
    const user = getCurrentUser();
    const navContainer = document.getElementById('navbar-container');
    if (!navContainer) return;

    const p = getBasePrefix();
    let navLinksHtml = '';
    let navActionsHtml = '';

    const homeUrl = `${p}index.html`;
    const aboutUrl = `${p}about.html`;
    const contactUrl = `${p}contact.html`;

    if (user) {
        const role = user.role.toLowerCase();
        if (role === 'student') {
            navLinksHtml = `
                <a href="${p}roles/student/student.html" class="nav-link">Dashboard</a>
                <a href="${p}roles/student/search-teacher.html" class="nav-link">Search Teacher</a>
                <a href="${p}roles/student/view-appointments.html" class="nav-link">My Appointments</a>
            `;
        } else if (role === 'teacher') {
            navLinksHtml = `
                <a href="${p}roles/teacher/teacher.html" class="nav-link">Dashboard</a>
                <a href="${p}roles/teacher/all-appointments.html" class="nav-link">All Appointments</a>
                <a href="${p}roles/teacher/schedule-appointment.html" class="nav-link">Schedule</a>
                <a href="${p}roles/teacher/profile-settings.html" class="nav-link">Settings</a>
            `;
        } else if (role === 'admin') {
            navLinksHtml = `
                <a href="${p}roles/admin/admin.html" class="nav-link">Dashboard</a>
                <a href="${p}roles/admin/manage-teacher.html" class="nav-link">Manage Teachers</a>
            `;
        }
        navActionsHtml = `<button class="btn btn-outline logout-btn-nav" style="width:100%">Logout</button>`;
    } else {
        navLinksHtml = `
            <a href="${homeUrl}" class="nav-link">Home</a>
            <a href="${aboutUrl}" class="nav-link">About</a>
        `;
        navActionsHtml = `
            <a href="${p}auth/login.html" class="btn btn-outline" style="width:100%; justify-content:center;">Login</a>
            <a href="${p}auth/register.html" class="btn btn-primary" style="width:100%; justify-content:center;">Signup</a>
        `;
    }

    navContainer.innerHTML = `
        <nav class="navbar">
            <div class="container nav-content" style="display: flex; justify-content: space-between; align-items: center;">
                <a href="${p}index.html" class="logo">EduMeet</a>
                <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
                    <span></span><span></span><span></span>
                </button>
                <div class="nav-menu">
                    <div class="nav-links-wrapper">${navLinksHtml}</div>
                    <div class="nav-actions-wrapper">${navActionsHtml}</div>
                </div>
            </div>
        </nav>
        <style>
            .nav-menu { display: flex; align-items: center; gap: 20px; }
            .nav-links-wrapper { display: flex; gap: 20px; align-items: center; }
            .nav-actions-wrapper { display: flex; gap: 10px; align-items: center; }
            @media (max-width: 768px) {
                .nav-toggle { display: flex !important; margin-left: auto; z-index: 1002; }
                .nav-menu { display: none; position: absolute; top: 100%; left: 0; width: 100%; background: white; flex-direction: column; padding: 1.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 1px solid #eee; z-index: 1001; }
                .nav-menu.open { display: flex !important; }
                .nav-links-wrapper { flex-direction: column; width: 100%; align-items: flex-start; gap: 15px; }
                .nav-link { display: block; width: 100%; padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
                .nav-actions-wrapper { flex-direction: column; width: 100%; margin-top: 1rem; gap: 10px; }
            }
        </style>
    `;

    const logoutBtns = document.querySelectorAll('.logout-btn-nav');
    logoutBtns.forEach(btn => btn.addEventListener('click', logoutUser));

    const toggle = navContainer.querySelector('.nav-toggle');
    const menu = navContainer.querySelector('.nav-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('open');
            toggle.classList.toggle('open', isOpen);
            toggle.setAttribute('aria-expanded', isOpen);
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && menu.classList.contains('open')) {
                if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                    menu.classList.remove('open');
                    toggle.classList.remove('open');
                }
            }
        });
    }
}

/**
 * Renders a standardized, responsive footer at the bottom of the page.
 */
export function renderFooter() {
    const existing = document.querySelector('.site-footer');
    if (existing) existing.remove();

    const p = getBasePrefix();
    const footer = document.createElement('footer');
    footer.className = 'site-footer';

    footer.innerHTML = `
        <div class="container footer-content">
            <div class="footer-brand">
                <a href="${p}index.html" class="logo">EduMeet</a>
                <p class="tagline">Connecting students and teachers through smart scheduling. Accessible education for everyone.</p>
            </div>
            <div class="footer-groups">
                <div class="footer-group">
                    <h4>Platform</h4>
                    <a href="${p}index.html">Home</a>
                    <a href="${p}about.html">About Us</a>
                    <a href="${p}contact.html">Contact Us</a>
                </div>
                <div class="footer-group">
                    <h4>Legal</h4>
                    <a href="${p}privacy.html">Privacy Policy</a>
                    <a href="${p}terms.html">Terms & Conditions</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <p>&copy; 2026 EduMeet. All Rights Reserved.</p>
            </div>
        </div>
    `;

    // FIX: Check if 'main' exists and is a child of body before using insertBefore
    const main = document.querySelector('main');
    if (main && main.parentNode === document.body) {
        document.body.insertBefore(footer, main.nextSibling);
    } else {
        // Fallback: Append directly to body
        document.body.appendChild(footer);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('navbar-container')) {
        renderNavbar();
    }
    renderFooter();
    updateWelcomeUI();
});