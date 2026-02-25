export const USERS = {
    admins: [
        { id: 'a1', name: 'Admin User', email: 'admin@school.com', password: 'password123', role: 'admin' }
    ],
    teachers: [
        { id: 't1', name: 'Mr. John Smith', email: 'john@school.com', password: 'password123', department: 'Mathematics', subject: 'Calculus', role: 'teacher' },
        { id: 't2', name: 'Ms. Sarah Connor', email: 'sarah@school.com', password: 'password123', department: 'Science', subject: 'Physics', role: 'teacher' }
    ],
    students: [
        { id: 's1', name: 'Alice Wonderland', email: 'alice@student.com', password: 'password123', department: 'Science', role: 'student', isApproved: true },
        { id: 's2', name: 'Bob Builder', email: 'bob@student.com', password: 'password123', department: 'Mathematics', role: 'student', isApproved: false }
    ]
};

export const APPOINTMENTS = [
    { id: 'ap1', teacherId: 't1', studentId: 's1', date: '2023-11-15', time: '10:00', description: 'Help with Calculus homework', status: 'approved' },
    { id: 'ap2', teacherId: 't1', studentId: 's1', date: '2023-11-16', time: '14:00', description: 'Exam preparation', status: 'pending' },
    { id: 'ap3', teacherId: 't2', studentId: 's1', date: '2023-11-17', time: '09:00', description: 'Physics lab report', status: 'cancelled' }
];



// Lightweight enhancement for the home page only: make "View Profile" buttons work
// without modifying index.html. This runs only when the teachers section exists.
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const p = window.location.pathname.replace(/\\/g, '/');
        const base = p.includes('/roles/') ? '../../' : (p.includes('/auth/') ? '../' : '');
        // Fix navbar/hero/footer links across pages without editing HTML






        // 3) Footer links: route to new static pages if present
        document.querySelectorAll('.footer .footer-link').forEach(a => {
            const text = (a.textContent || '').trim();
            if (text === 'About') a.setAttribute('href', base + 'about.html');
            if (text === 'Contact') a.setAttribute('href', base + 'contact.html');
            if (text === 'Privacy Policy') a.setAttribute('href', base + 'privacy.html');
            if (text === 'Terms') a.setAttribute('href', base + 'terms.html');
        });

        // 4) Home page only: make "View Profile" buttons open a simple modal
        const onHome = !!document.querySelector('.teachers-section .teacher-card');
        if (onHome) {
            const modal = document.createElement('div');
            modal.id = 'profile-modal';
            modal.style.display = 'none';
            modal.style.position = 'fixed';
            modal.style.inset = '0';
            modal.style.background = 'rgba(0,0,0,0.5)';
            modal.style.zIndex = '100';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.innerHTML = `
                <div class="card" style="width:100%; max-width:520px;">
                    <div class="flex justify-between items-center mb-2">
                        <h3 id="profile-title">Teacher Profile</h3>
                        <button id="profile-close" style="font-size:1.5rem;">&times;</button>
                    </div>
                    <p id="profile-subject" class="text-muted" style="margin-bottom: 0.5rem;"></p>
                    <p style="font-size:0.95rem;">This is a quick profile preview. For booking and full details, please login.</p>
                    <div class="flex gap-2 mt-4">
                        <a href="login.html" class="btn btn-primary">Login to Book</a>
                        <button id="profile-ok" class="btn btn-secondary">Close</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            const close = () => { modal.style.display = 'none'; };
            modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
            modal.querySelector('#profile-close').addEventListener('click', close);
            modal.querySelector('#profile-ok').addEventListener('click', close);

            document.querySelectorAll('.teacher-card .view-profile-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const card = e.currentTarget.closest('.teacher-card');
                    const name = card.querySelector('.teacher-name')?.textContent?.trim() || 'Teacher';
                    const subject = card.querySelector('.teacher-subject')?.textContent?.trim() || '';
                    modal.querySelector('#profile-title').textContent = name;
                    modal.querySelector('#profile-subject').textContent = subject;
                    modal.style.display = 'flex';
                });
            });
        }
    });
}