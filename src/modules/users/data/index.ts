import type { IUser } from "../interfaces";
import usersJson from "./users.json";

let usersList: IUser[] = usersJson.map(user => ({
    ...user,
    registrationDate: new Date(user.registrationDate)
}));

function getUserByUsername(username: string): IUser {
    return usersList.find((user: IUser) => user.username.toLowerCase() === username.toLowerCase());
}

function validateCredentials(username: string, password: string): IUser | null {
    const user = getUserByUsername(username);
    if (!user) return null;
    if (user.password !== password) return null;
    return user;
}

export {
    getUserByUsername,
    validateCredentials,
}
