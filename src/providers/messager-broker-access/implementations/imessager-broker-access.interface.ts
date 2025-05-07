export interface IMessagerBrokerAccess {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    publish(queue: string, message: string): Promise<void>;
    consume(queue: string, callback: (message: string) => void): Promise<void>;
    
    /**
     * Sends a message using RPC.
     * @param params - The parameters for the RPC call.
     */
    sendRPC(params: { queue: string; message: any }): Promise<{ code: number; response: any }>;
}
