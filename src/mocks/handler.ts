// handler.ts
import { rest } from 'msw';
import { mockData } from './data';

export const handlers = [
    rest.get('/problemList', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockData.problems));
    }),
    rest.get('/problemList/done', (req, res, ctx) => {
        const completedProblems = mockData.problems.filter(p => p.successRate.slice(0, -1) > 70);
        return res(ctx.status(200), ctx.json(completedProblems));
    }),
    rest.get('/problemList/tier', (req, res, ctx) => {
        const tier = req.url.searchParams.get('tier') || 'Easy';
        const filteredProblems = mockData.problems.filter(p => p.difficulty === tier);
        return res(ctx.status(200), ctx.json(filteredProblems));
    }),
    rest.get('/problemList/algorithm', (req, res, ctx) => {
        const type = req.url.searchParams.get('type') || 'Algorithm';
        const algorithmProblems = mockData.problems.filter(p => p.type === type);
        return res(ctx.status(200), ctx.json(algorithmProblems));
    }),
    rest.get('/problemList/rate', (req, res, ctx) => {
        const rate = req.url.searchParams.get('rate') || '50%';
        const filteredProblems = mockData.problems.filter(p => p.successRate === rate);
        return res(ctx.status(200), ctx.json(filteredProblems));
    }),
];
