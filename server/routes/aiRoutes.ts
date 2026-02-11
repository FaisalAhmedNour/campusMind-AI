import express, { Router } from 'express';
import { generateResponse, summarizeAssignment, generateViva, autoGrade, simplifyNotice, chatWithAI } from '../controllers/aiController';

const router: Router = express.Router();

// Define routes
router.post('/generate', generateResponse);
router.post('/summarize', summarizeAssignment);
router.post('/viva', generateViva);
router.post('/grade', autoGrade);
router.post('/simplify', simplifyNotice);
router.post('/chat', chatWithAI);

export default router;
