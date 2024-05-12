import { atom } from 'recoil'

export const loggedInState = atom({
    key: 'loggedInState', // 고유 key
    default: false, // 기본값 (로그인X)
})

export const userState = atom({
    key: 'userState',
    default: null,
})
