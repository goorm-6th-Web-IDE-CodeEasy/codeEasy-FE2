// handler.ts
import { rest } from 'msw'
import { AlgorithmData, users } from './data'

export const handlers = [
    rest.get('/problemList', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ problems: AlgorithmData.problems }))
    }),

    // 완료한 문제와 아닌 문제별로
    rest.get('/problemList/done', (req, res, ctx) => {
    rest.get('/problemList/tier', (req, res, ctx) => {
        const tier = req.url.searchParams.get('tier')
        const filteredProblems = tier
            ? AlgorithmData.problems.filter((problem) => problem.tier === tier)
            : AlgorithmData.problems
        return res(ctx.status(200), ctx.json({ problems: filteredProblems }))
    }),

    // 알고리즘 유형별로
    rest.get('/problemList/algorithm', (req, res, ctx) => {
    }),

    // 정답률로 정렬
    rest.get('/problemList/rate', (req, res, ctx) => {
        const rate = req.url.searchParams.get('rate')
        const filteredProblems = rate
            ? mockData.problems.filter((problem) => `${problem.rate}%` === rate) // 예를 들어 '75%'와 같이 문자열 비교
            : mockData.problems;
        return res(ctx.status(200), ctx.json({ problems: filteredProblems }));
    }),

    // 사용자 프로필 정보
    rest.get('/api/user/profile', (req, res, ctx) => {
        const { email } = req.body as { email: string }
        const user = users.find((u) => u.email === email)

        if (!user) {
            return res(ctx.status(404), ctx.json({ errorMessage: '사용자를 찾을 수 없습니다.' }))
        }
        return res(
            ctx.status(200),
            ctx.json({
                user: {
                },
            }),
        )
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
     //login
    rest.post('/api/login', (req, res, ctx) => {
        const { email, password } = req.body as { email: string; password: string }
        const user = users.find((u) => u.email === email && u.password === password)

        if (!user) {
            return res(ctx.status(401), ctx.json({ errorMessage: '이메일 또는 비밀번호가 잘못되었습니다.' }))
        }

        return res(
            ctx.json({
                message: '로그인 성공',
                id: user.id,
                email: user.email,
                nickname: user.nickname,
                tier: user.tier,
                token: 'df',
                completedChallenges: user.completedChallenges,
                avatar: user.avatar,
            }),
        )
    })
];
