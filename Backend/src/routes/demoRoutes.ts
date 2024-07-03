import { Request, Response, Router } from 'express';
import { getCatFact } from '../services/demoService.js';

const router = Router();

router.get('/catFact', async (req: Request, res: Response) => {
    try {
        const response = await getCatFact();
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
