import { atom, selector } from 'recoil';
import api from '../../components/Api/Api';

// 로그인 상태를 나타내는 atom
export const loggedInState = atom({
    key: 'loggedInState',
    default: false,
});

// 사용자 정보를 나타내는 atom
export const userState = atom({
    key: 'userState',
    default: null,
});

// 사용자 정보를 가져오는 selector
export const fetchUserState = selector({
    key: 'fetchUserState',
    get: async ({ get }) => {
        const loggedIn = get(loggedInState);
        if (!loggedIn) {
            return null;
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
            return null;
        }

        try {
            const response = await api.get('/me', {
                headers: {
                    Authorization: `${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    },
});
