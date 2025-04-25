import { WebSocketAdapter, SocketCloseHandler, SocketErrorHandler, SocketMessageHandler, SocketOpenHandler } from "../layerg-js/web_socket_adapter"
import * as tsproto from "./rtapi/realtime"

/**
 * A protocol buffer socket adapter that accepts and transmits payloads using the protobuf binary wire format.
 */
export class WebSocketAdapterPb implements WebSocketAdapter {

    private _socket?: WebSocket;

    constructor() {
    }

    get onClose(): SocketCloseHandler | null {
        return this._socket!.onclose;
    }

    set onClose(value: SocketCloseHandler | null) {
        this._socket!.onclose = value;
    }

    get onError(): SocketErrorHandler | null {
        return this._socket!.onerror;
    }

    set onError(value: SocketErrorHandler | null) {
        this._socket!.onerror = value;
    }

    get onMessage(): SocketMessageHandler | null {
        return this._socket!.onmessage;
    }

    set onMessage(value: SocketMessageHandler | null) {

        if (value) {
            this._socket!.onmessage = (evt: MessageEvent) => {
                const buffer: ArrayBuffer = evt.data;
                const uintBuffer: Uint8Array = new Uint8Array(buffer);
                const envelope = tsproto.Envelope.decode(uintBuffer);

                if (envelope.channel_message) {
                    if (envelope.channel_message.code == undefined) {
                        //protobuf plugin does not default-initialize missing Int32Value fields
                        envelope.channel_message.code = 0;
                    }
                    if (envelope.channel_message.persistent == undefined) {
                        //protobuf plugin does not default-initialize missing BoolValue fields
                        envelope.channel_message.persistent = false;
                    }
                }

                value!(envelope);
            };
        }
        else {
            value = null;
        }
    }

    get onOpen(): SocketOpenHandler | null {
        return this._socket!.onopen;
    }

    set onOpen(value: SocketOpenHandler | null) {
        this._socket!.onopen = value;
    }

    isOpen(): boolean {
        return this._socket?.readyState == WebSocket.OPEN;
    }

    close() {
        this._socket!.close();
        this._socket = undefined;
    }

    connect(scheme: string, host: string, port: string, createStatus: boolean, token: string): void {
        const url = `${scheme}${host}:${port}/ws?lang=en&status=${encodeURIComponent(createStatus.toString())}&token=${encodeURIComponent(token)}&format=protobuf`;
        this._socket = new WebSocket(url);
        this._socket.binaryType = "arraybuffer";
    }

    send(msg: any): void {

        if (msg.match_data_send) {
            let payload = msg.match_data_send.data;
            // can't send a string over protobuf
            if (typeof payload == "string") {
                msg.match_data_send.data = new TextEncoder().encode(payload);
            }
        } else if (msg.party_data_send) {
            let payload = msg.party_data_send.data;
            // can't send a string over protobuf
            if (typeof payload == "string") {
                msg.party_data_send.data = new TextEncoder().encode(payload);
            }
        }

        const envelopeWriter = tsproto.Envelope.encode(tsproto.Envelope.fromPartial(msg));
        const encodedMsg = envelopeWriter.finish();
        this._socket!.send(encodedMsg);
    }
}
