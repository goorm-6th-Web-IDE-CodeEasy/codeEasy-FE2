// handler.ts
import { rest } from 'msw'
import { AlgorithmData, users } from './data'

export const handlers = [
    rest.get('/problemList', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ problems: AlgorithmData.problems }))
    }),
    rest.get('/problemList/done', (req, res, ctx) => {
        const doneProblems = AlgorithmData.problems.filter((problem) => problem.done)
        return res(ctx.status(200), ctx.json({ problems: doneProblems }))
    }), // problemList/tier
    rest.get('/problemList/tier', (req, res, ctx) => {
        const tier = req.url.searchParams.get('tier')
        const filteredProblems = tier
            ? AlgorithmData.problems.filter((problem) => problem.tier === tier)
            : AlgorithmData.problems
        return res(ctx.status(200), ctx.json({ problems: filteredProblems }))
    }),
    rest.get('/problemList/algorithm', (req, res, ctx) => {
        const type = req.url.searchParams.get('type') || 'Algorithm'
        const algorithmProblems = AlgorithmData.problems.filter((problem) => problem.type === type)
        return res(ctx.status(200), ctx.json({ problems: algorithmProblems }))
    }),
    rest.get('/problemList/rate', (req, res, ctx) => {
        const rate = req.url.searchParams.get('rate')
        const filteredProblems = rate
            ? AlgorithmData.problems.filter((problem) => problem.successRate === rate)
            : AlgorithmData.problems
        return res(ctx.status(200), ctx.json({ problems: filteredProblems }))
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
                posts: user.posts,
                completedChallenges: user.completedChallenges,
                avatar: user.avatar,
            }),
        )
    }),
    //user/profile
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
                    tier: user.tier,
                    nickname: user.nickname,
                    posts: user.posts,
                    completedChallenges: user.completedChallenges,
                    avatar: user.avatar,
                },
            }),
        )
    }),
]

// 위의 설정은 각 필터 옵션에 맞게 요청을 처리하고 해당하는 데이터를 반환.
// 'tier', 'type', 'rate' 각각의 필터링은 쿼리 파라미터를 받아 해당 조건에 맞는 데이터를 필터링.
