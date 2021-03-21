import { getPicture } from "../src/server/index"

describe("Testing the getPicture values", async () => {
    it("Testing the function getPicture", async () => {
        const data = await getPicture("paris");
        expect(data).toBeDefined();
    })
});
