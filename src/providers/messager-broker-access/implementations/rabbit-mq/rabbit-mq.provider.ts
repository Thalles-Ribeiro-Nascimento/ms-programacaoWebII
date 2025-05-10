import amqp, { Connection, Channel } from 'amqplib';

export class RabbitMQProvider {
    private connection: Connection | null = null;
    private channel: Channel | null = null;

    constructor(private readonly uri: string) {}

    async connect(): Promise<void> {
        try {
            this.connection = await amqp.connect(this.uri);
            this.channel = await this.connection.createChannel();
            console.log('Conexão com RabbitMQ estabelecida com sucesso');
        } catch (error) {
            console.error('Falha ao conectar ao RabbitMQ:', error);
            throw error;
        }
    }

    async sendToQueue(queue: string, message: string): Promise<void> {
        if (!this.channel) {
            throw new Error('O canal não foi inicializado. Chame o método connect() primeiro.');
        }

        await this.channel.assertQueue(queue, { durable: true });
        this.channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Mensagem enviada para a fila "${queue}": ${message}`);
    }

    async consume(queue: string, callback: (message: string) => void): Promise<void> {
        if (!this.channel) {
            throw new Error('O canal não foi inicializado. Chame o método connect() primeiro.');
        }

        await this.channel.assertQueue(queue, { durable: true });
        this.channel.consume(queue, (msg) => {
            if (msg) {
                const messageContent = msg.content.toString();
                console.log(`Mensagem recebida da fila "${queue}": ${messageContent}`);
                callback(messageContent);
                this.channel?.ack(msg);
            }
        });
    }

    async disconnect(): Promise<void> {
        try {
            await this.channel?.close();
            await this.connection?.close();
            console.log('Conexão com RabbitMQ encerrada');
        } catch (error) {
            console.error('Falha ao encerrar a conexão com RabbitMQ:', error);
        }
    }

    sendRPC(params: { queue: string; message: any }): Promise<{ code: number; response: any }> {
        const { queue, message } = params;
        return new Promise((resolve) => {
            resolve({ code: 200, response: "Sucesso" });
        });
    }

    publish(queue: string, message: string): Promise<void> {
        const exchange = '';
        const routingKey = queue;
        if (!this.channel) {
            throw new Error('O canal não foi inicializado. Chame o método connect() primeiro.');
        }
        return new Promise<void>((resolve, reject) => {
            const success = this.channel?.publish(exchange, routingKey, Buffer.from(message));
            if (success) {
                resolve();
            } else {
                reject(new Error('Falha ao publicar a mensagem'));
            }
        });
    }
}

export default new RabbitMQProvider('amqp://localhost');
