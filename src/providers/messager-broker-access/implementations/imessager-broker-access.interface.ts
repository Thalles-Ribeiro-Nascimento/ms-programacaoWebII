export interface IMessagerBrokerAccess {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    publish(queue: string, message: string): Promise<void>;
    consume(queue: string, callback: (message: string) => void): Promise<void>;
    
    /**
     * Envia uma mensagem utilizando RPC.
     * @param params - Os parâmetros para a chamada RPC.
     */
    sendRPC(params: { queue: string; message: any }): Promise<{ code: number; response: any }>;
}
