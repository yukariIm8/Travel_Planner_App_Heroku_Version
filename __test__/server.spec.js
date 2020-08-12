const app = require('../src/server/server')
const supertest = require('supertest')
const request = supertest(app)

it("Testing the endopoint", async done => {
    const res = await request.get('/all')
    expect(res.status).toBe(200);
    done();
});