export const emailRules = [
    (v: any) => !!v || 'Required',
    (v: any) => v.length <= 25 || 'Max 25 characters',
    (v: any) => {
        const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(v) || 'Invalid e-mail.';
    }
];

export interface AuthUser {
    email: string;
    password: string;
}