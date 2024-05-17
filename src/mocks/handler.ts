// handler.ts
import { rest } from 'msw';
import { mockData } from './data';

export const handlers = [
    rest.get('/problemList', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ problems: mockData.problems }));
    }),
    rest.get('/problemList/done', (req, res, ctx) => {
        const doneProblems = mockData.problems.filter((problem) => problem.done);
        return res(ctx.status(200), ctx.json({ problems: doneProblems }));
    }), // problemList/tier
    rest.get('/problemList/tier', (req, res, ctx) => {
        const tier = req.url.searchParams.get('tier');
        const filteredProblems = tier
            ? mockData.problems.filter((problem) => problem.tier === tier)
            : mockData.problems;
        return res(ctx.status(200), ctx.json({ problems: filteredProblems }));
    }),
    rest.get('/problemList/algorithm', (req, res, ctx) => {
        const type = req.url.searchParams.get('type') || 'Algorithm';
        const algorithmProblems = mockData.problems.filter((problem) => problem.type === type);
        return res(ctx.status(200), ctx.json({ problems: algorithmProblems }));
    }),
    rest.get('/problemList/rate', (req, res, ctx) => {
        const rate = req.url.searchParams.get('rate');
        const filteredProblems = rate
            ? mockData.problems.filter((problem) => problem.successRate === rate)
            : mockData.problems;
        return res(ctx.status(200), ctx.json({ problems: filteredProblems }));
    }),
    // 문제 script
    rest.get('/api/problem/problemId', (req, res, ctx) => {
        const { id } = req.params;
        const problem = mockData.problems.find((p) => p.id === parseInt(id));
        if (!problem) {
            return res(ctx.status(404));
        }
        return res(ctx.status(200), ctx.json(problem));
    }),
    // 즐겨찾기
    rest.post('/problem/{problemId}/favorite', (req, res, ctx) => {
        const { id } = req.params;
        const index = mockData.problems.findIndex((problem) => problem.id === parseInt(id));
        if (index === -1) {
            return res(ctx.status(404), ctx.json({ message: 'Problem not found' }));
        }
        mockData.problems[index].isFavorite = !mockData.problems[index].isFavorite;

        return res(ctx.status(200), ctx.json({ problem: mockData.problems[index] }));
    }),
    rest.get('/problem/{problemId}/favorite', (req, res, ctx) => {
        const favoriteProblems = mockData.problems.filter((problem) => problem.isFavorite);
        return res(ctx.status(200), ctx.json(favoriteProblems));
    }),

    //user api 구현
    rest.get('/api/user/profile', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                user: {
                    level: 100,
                    nickname: '말티푸',
                    posts: 1024,
                    gems: 100002,
                    completedChallenges: 80,
                    avatar: 'https://source.unsplash.com/featured/?{puppy}',
                },
            })
        );
    }),
];

// 위의 설정은 각 필터 옵션에 맞게 요청을 처리하고 해당하는 데이터를 반환.
// 'tier', 'type', 'rate' 각각의 필터링은 쿼리 파라미터를 받아 해당 조건에 맞는 데이터를 필터링.
