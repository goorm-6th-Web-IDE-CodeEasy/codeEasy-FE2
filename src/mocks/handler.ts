import { Users, Problems, SolvedProblems } from './data'
import { rest } from 'msw'

export const handlers = [
    //로그인 처리
    rest.post('/api/login', (req, res, ctx) => {
        const { email, password } = req.body as { email: string; password: string }
        const user = Users.find((u) => u.email === email && u.password === password)

        if (!user) {
            return res(ctx.status(401), ctx.json({ errorMessage: '이메일 또는 비밀번호가 잘못되었습니다.' }))
        }
        return res(
            ctx.json({
                message: '로그인 성공',
                id: user.id,
                email: user.email,
                nickname: user.nickname,
                avatar: user.avatar,
                tier: user.tier,
                solvedproblems: user.solvedproblems,
            }),
        )
    }),

    // 문제 목록 조회
    rest.get('/api/problems', (req, res, ctx) => {
        const userId = req.headers.get('X-User-ID') // 클라이언트에서 보낸 사용자 ID를 헤더에서 읽어옴
        if (userId) {
            const solvedByUser = SolvedProblems.filter((sp) => sp.userID === parseInt(userId))
            const problemsWithDoneFlag = Problems.map((problem) => {
                const isSolved = solvedByUser.some((sp) => sp.problemID === problem.problemID)
                return { ...problem, done: isSolved }
            })

            return res(ctx.json({ problems: problemsWithDoneFlag }))
        } else {
            // 로그인하지 않은 사용자의 경우, 문제의 'done' 상태 없이 반환
            return res(ctx.json({ problems: Problems }))
        }
    }),

    //현재 사용하고 있지 않음......
    //문제 상세 조회
    rest.get('/api/problem/:problemId', (req, res, ctx) => {
        const { problemId } = req.params
        const problem = Problems.find((p) => p.problemID.toString() === problemId)

        if (!problem) {
            return res(ctx.status(404), ctx.json({ errorMessage: '문제를 찾을 수 없습니다.' }))
        }

        return res(ctx.json(problem))
    }),

    //마이페이지에서 사용자가 최근에 푼 문제 목록 반환
    rest.get('/api/recent-solved/:userId', (req, res, ctx) => {
        const { userId } = req.params
        const userSolvedProblems = SolvedProblems.filter((sp) => sp.userID === parseInt(userId))
            .sort((a, b) => b.solvedDate.localeCompare(a.solvedDate)) // 최신 날짜 순으로 정렬
            .slice(0, 4) // 최근 4개만 반환

        const recentProblemsWithDetails = userSolvedProblems.map((sp) => {
            const problemDetails = Problems.find((p) => p.problemID === sp.problemID)
            return {
                problemID: sp.problemID,
                title: problemDetails?.title,
                solvedDate: sp.solvedDate,
            }
        })

        return res(ctx.json(recentProblemsWithDetails))
    }),
]
