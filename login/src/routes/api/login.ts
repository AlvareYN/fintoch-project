import { AUTH_API_DEV, AUTH_API_PROD } from "$lib/config";
import type { AuthUser } from "$lib/utils";
import { postMethod } from "$lib/services/rest.service";

export async function post({ request }: any): Promise<any> {
    const url = process.env.NODE_ENV === "prod" ? AUTH_API_PROD : AUTH_API_DEV;
    const body: AuthUser = await request.json()
    const response = await postMethod<AuthUser>(`${url}/auth`, body);
    const responseBody = await response.json();
    if (response.status === 200) {
        return {
            statusCode: 200,
            body: {
                message: 'Successfully logged in.'
            },
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': `at_as=${responseBody.access_token}`
            }
        }
    } else {
        return {
            statusCode: response.status,
            body: responseBody,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
}