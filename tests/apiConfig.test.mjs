import assert from 'node:assert/strict';
import { buildApiUrl } from '../src/apiConfig.js';

assert.equal(buildApiUrl('/api/experiences', { VITE_API_BASE_URL: 'http://localhost:8080' }), 'http://localhost:8080/api/experiences');
assert.equal(buildApiUrl('/api/experiences', { VITE_API_BASE_URL: 'https://api.example.com/' }), 'https://api.example.com/api/experiences');
assert.equal(buildApiUrl('/api/experiences', {}), 'http://10.15.126.67:8080/api/experiences');

assert.equal(buildApiUrl('/api/experiences', {}), 'http://10.15.126.67:8080/api/experiences');

console.log('apiConfig tests passed');
