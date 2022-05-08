import { useAppSelector } from './redux-hooks';

export function useAuth() {
    const {email,name, token, id} = useAppSelector(state => state.user);

    return {
        isAuth: !!email,
        email,
        name,
        token,
        id,
    };
}