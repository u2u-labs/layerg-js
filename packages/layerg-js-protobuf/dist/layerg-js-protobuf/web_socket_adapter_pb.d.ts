import { WebSocketAdapter, SocketCloseHandler, SocketErrorHandler, SocketMessageHandler, SocketOpenHandler } from "../layerg-js/web_socket_adapter";
/**
 * A protocol buffer socket adapter that accepts and transmits payloads using the protobuf binary wire format.
 */
export declare class WebSocketAdapterPb implements WebSocketAdapter {
    private _socket?;
    constructor();
    get onClose(): SocketCloseHandler | null;
    set onClose(value: SocketCloseHandler | null);
    get onError(): SocketErrorHandler | null;
    set onError(value: SocketErrorHandler | null);
    get onMessage(): SocketMessageHandler | null;
    set onMessage(value: SocketMessageHandler | null);
    get onOpen(): SocketOpenHandler | null;
    set onOpen(value: SocketOpenHandler | null);
    isOpen(): boolean;
    close(): void;
    connect(scheme: string, host: string, port: string, createStatus: boolean, token: string): void;
    send(msg: any): void;
}
