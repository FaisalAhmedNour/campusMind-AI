import { Request, Response } from 'express';
import { generateContent } from '../services/geminiService';

const handleAiRequest = async (res: Response, prompt: string) => {
    try {
        const result = await generateContent(prompt);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error('Error in aiController:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const generateResponse = async (req: Request, res: Response) => {
    const { prompt } = req.body;
    if (!prompt) {
        res.status(400).json({ error: 'Prompt is required' });
        return;
    }
    await handleAiRequest(res, prompt);
};

export const summarizeAssignment = async (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) {
        res.status(400).json({ error: 'Text input is required' });
        return;
    }
    const prompt = `Summarize this academic assignment in 5 bullet points.\nExtract key concepts.\nProvide difficulty level (Easy/Medium/Hard).\n\nAssignment: ${text}`;
    await handleAiRequest(res, prompt);
};

export const generateViva = async (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) {
        res.status(400).json({ error: 'Text input is required' });
        return;
    }
    const prompt = `Generate 10 viva questions from this assignment.\n5 basic\n3 medium\n2 advanced.\n\nAssignment: ${text}`;
    await handleAiRequest(res, prompt);
};

export const autoGrade = async (req: Request, res: Response) => {
    const { question, modelAnswer, studentAnswer } = req.body;
    if (!question || !modelAnswer || !studentAnswer) {
        res.status(400).json({ error: 'Question, Model Answer, and Student Answer are required' });
        return;
    }
    const prompt = `Compare student answer with model answer.\nGive score out of 10.\nExplain deductions briefly.\n\nQuestion: ${question}\nModel Answer: ${modelAnswer}\nStudent Answer: ${studentAnswer}`;
    await handleAiRequest(res, prompt);
};

export const simplifyNotice = async (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) {
        res.status(400).json({ error: 'Text input is required' });
        return;
    }
    const prompt = `Convert this official university notice into simple language.\nExtract 3 key deadlines.\nList action steps clearly.\n\nNotice: ${text}`;
    await handleAiRequest(res, prompt);
};

export const chatWithAI = async (req: Request, res: Response) => {
    const { prompt } = req.body;
    if (!prompt) {
        res.status(400).json({ error: 'Prompt is required' });
        return;
    }
    const fullPrompt = `You are a helpful university academic assistant. Answer clearly and concisely.\n\nUser: ${prompt}`;
    await handleAiRequest(res, fullPrompt);
};
