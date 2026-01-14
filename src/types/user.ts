import { UserI } from "@/interfaces/user";

export type UpdateUserPayload =Partial<Pick<UserI,"name"|"description"|"cover">>;