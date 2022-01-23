import resizeImage from '../../helpers/processingHelper'

describe('Resize Functonality Check', () => {
    const filename = 'test'
    const height = 200

    it('check if resizing does not throw error', async () => {
        const width = 500
        const file = await resizeImage(filename, width, height)
        expect(file instanceof Error).toBeFalse()
    })

    it('check if it throws error if too large', async () => {
        const width = 5000000
        const file = await resizeImage(filename, width, height)
        expect(file instanceof Error).toBeTrue()
    })
})
