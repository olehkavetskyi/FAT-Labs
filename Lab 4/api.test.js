const axios = require('axios');
const BASE_URL = 'https://jsonplaceholder.typicode.com';

describe('JSONPlaceholder API Tests', () => {
    test('GET /posts should return a list of posts', async () => {
        const response = await axios.get(`${BASE_URL}/posts`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBeTruthy();
    });

    test('GET /posts/:id should return a single post', async () => {
        const response = await axios.get(`${BASE_URL}/posts/1`);
        expect(response.status).toBe(200);
        expect(response.data.id).toBe(1);
    });

    test('POST /posts should create a new post', async () => {
        const newPost = {
            title: 'Test Post',
            body: 'This is a test post.',
            userId: 1
        };
        const response = await axios.post(`${BASE_URL}/posts`, newPost);
        expect(response.status).toBe(201);
        expect(response.data.title).toBe(newPost.title);
    });

    test('PUT /posts/:id should update an existing post', async () => {
        const updatedPost = {
            id: 1,
            title: 'Updated Title',
            body: 'Updated body content.',
            userId: 1
        };
        const response = await axios.put(`${BASE_URL}/posts/1`, updatedPost);
        expect(response.status).toBe(200);
        expect(response.data.title).toBe(updatedPost.title);
    });

    test('DELETE /posts/:id should delete a post', async () => {
        const response = await axios.delete(`${BASE_URL}/posts/1`);
        expect(response.status).toBe(200);
    });
});
