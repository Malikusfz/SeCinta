const API_URL = '/api';
const isDev = import.meta.env.DEV;

/**
 * Register a new user
 * @param {object} data - { name, email, password, photoUrl }
 */
export async function register(data) {
    if (isDev) {
        return { inviteCode: 'dev-invite-code' };
    }
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const text = await res.text();
    if (!text) {
        throw new Error(`Empty response from register`);
    }
    return JSON.parse(text);
}

/**
 * Login a user
 * @param {object} data - { email, password }
 */
export async function login(data) {
    if (isDev) {
        return { message: 'User logged in', token: 'dev-token' };
    }
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const text = await res.text();
    if (!text) {
        throw new Error(`Empty response from login`);
    }
    return JSON.parse(text);
}

/**
 * Accept an invite code
 * @param {string} inviteCode
 */
export async function acceptInvite(inviteCode) {
    if (isDev) {
        return { message: 'Invite accepted' };
    }
    const res = await fetch(`${API_URL}/invite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inviteCode }),
    });
    const text = await res.text();
    if (!text) {
        throw new Error(`Empty response from acceptInvite`);
    }
    return JSON.parse(text);
}

/**
 * Fetch goals for the user/family
 */
export async function fetchGoals() {
    if (isDev) {
        return [
            { id: 1, title: 'Contoh Goal Pertama', date: '2025-05-20' },
            { id: 2, title: 'Goal Kedua', date: '2025-06-10' }
        ];
    }
    const res = await fetch(`${API_URL}/goals`);
    const text = await res.text();
    if (!text) {
        return [];
    }
    try {
        return JSON.parse(text);
    } catch {
        return [];
    }
}

/**
 * Create a new goal
 * @param {object} data - { title, description, date }
 */
export async function createGoal(data) {
    if (isDev) {
        return { message: 'Goal created' };
    }
    const res = await fetch(`${API_URL}/goals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const text = await res.text();
    if (!text) {
        throw new Error(`Empty response from createGoal`);
    }
    return JSON.parse(text);
} 