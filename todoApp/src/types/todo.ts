export type TodoType = {
    id: string;
    title: string;
    author: string;
    todoDate: string;
};

export type TodoPayload = {
    title: string;
    author: string;
    todoDate: string;
};

export type TodoUpdatePayload = TodoPayload;
export type TodoCreatePayload = TodoPayload;
