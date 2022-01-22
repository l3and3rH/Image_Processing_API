import request from 'supertest'
import processing from '../../../index'

describe('GET /test?height=200&width=200', function () {
    it('check Endpoint', async () => {
        const result = await request(processing)
            .get('/image/processing/test?height=200&width=200')
            .send()
        expect(result.status).toBe(200)
    })
})
