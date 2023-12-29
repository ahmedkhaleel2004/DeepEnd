
import * as admin from 'firebase-admin';
import fetch from 'node-fetch';

admin.initializeApp();

interface GitHubRepo {
    id: number;
    name: string;
    // Add other properties as needed
}

async function getGitHubToken(userId: string): Promise<string | null> {
    const db = admin.firestore();
    const doc = await db.collection('users').doc(userId).get();
    if (doc.exists) {
        const userData = doc.data() as { githubToken: string };
        return userData.githubToken;
    }
    return null;
}

async function listGitHubRepos(githubToken: string): Promise<GitHubRepo[]> {
    const response = await fetch('https://api.github.com/user/repos', {
        headers: {
            'Authorization': `token ${githubToken}`
        }
    });
    if (!response.ok) {
        throw new Error(`GitHub API responded with status: ${response.status}`);
    }
    return response.json();
}