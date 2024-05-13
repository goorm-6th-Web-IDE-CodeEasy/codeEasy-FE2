// handler.ts
import { rest } from 'msw';
import { mockData } from './data';

export const handlers = [
    rest.get('/problemList', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ problems: mockData.problems }));
    }),

    // 완료한 문제와 아닌 문제별로
    rest.get('/problemList/done', (req, res, ctx) => {
        const doneProblems = mockData.problems.filter((problem) => problem.done);
        return res(ctx.status(200), ctx.json({ problems: doneProblems }));
    }),

    // 티어별로
    rest.get('/problemList/tier', (req, res, ctx) => {
        const tier = req.url.searchParams.get('tier');
        const filteredProblems = tier
            ? mockData.problems.filter((problem) => problem.tier === tier)
            : mockData.problems;
        return res(ctx.status(200), ctx.json({ problems: filteredProblems }));
    }),

    // 알고리즘 유형별로
    rest.get('/problemList/algorithm', (req, res, ctx) => {
        const algorithm = req.url.searchParams.get('algorithm') || 'Algorithm';
        const algorithmProblems = mockData.problems.filter((problem) => problem.algorithm === algorithm);
        return res(ctx.status(200), ctx.json({ problems: algorithmProblems }));
    }),

    // 정답률로 정렬
    rest.get('/problemList/rate', (req, res, ctx) => {
        const rate = req.url.searchParams.get('rate');
        const filteredProblems = rate
            ? mockData.problems.filter((problem) => `${problem.rate}%` === rate) // 예를 들어 '75%'와 같이 문자열 비교
            : mockData.problems;
        return res(ctx.status(200), ctx.json({ problems: filteredProblems }));
    }),

    // 사용자 프로필 정보
    rest.get('/api/user/profile', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                user: {
                    nickname: '말티푸',
                    tier: 'Bronze',
                    doneProblem: 80,
                    avatar: 'https://source.unsplash.com/featured/?{puppy}',
                },
            })
        );
    }),

    // Handler for fetching chat messages
    rest.get('/chats', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ messages: mockData.chatMessages }));
    }),

    // Handler for sending messages
    rest.post('/chats/send', (req, res, ctx) => {
        const { message } = req.body as { message: string };
        const newMessage = {
            sender: 'CurrentUser',
            message: message,
            timestamp: new Date().toISOString(),
        };
        mockData.chatMessages.push(newMessage);
        return res(ctx.status(201), ctx.json(newMessage));
    }),

    // Handler for searching messages (simulated by filtering content)
    rest.get('/chats/search', (req, res, ctx) => {
        const query = req.url.searchParams.get('query');
        const filteredMessages = mockData.chatMessages.filter((msg) => msg.message.includes(query));
        return res(ctx.status(200), ctx.json({ messages: filteredMessages }));
    }),
];
