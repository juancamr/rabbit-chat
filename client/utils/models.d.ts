export interface WebSocketProps {
    socket: WebSocket;
    dataProfile: any;
    dataMessages: DataMessage[];
}

export interface DataMessage {
    code: number;
    message: string;
}