import amqp, { Connection, Channel } from 'amqplib';

export class RabbitMQProvider {
    private connection: Connection | null = null;
    private channel: Channel | null = null;

    constructor(private readonly uri: string) {}

    async connect(): Promise<void> {
        try {
            this.connection = await amqp.connect(this.uri);
            this.channel = await this.connection.createChannel();
            console.log('RabbitMQ connected successfully');
        } catch (error) {
            console.error('Failed to connect to RabbitMQ:', error);
            throw error;
        }
    }

    async sendToQueue(queue: string, message: string): Promise<void> {
        if (!this.channel) {
            throw new Error('Channel is not initialized. Call connect() first.');
        }

        await this.channel.assertQueue(queue, { durable: true });
        this.channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Message sent to queue "${queue}": ${message}`);
    }

    async consume(queue: string, callback: (message: string) => void): Promise<void> {
        if (!this.channel) {
            throw new Error('Channel is not initialized. Call connect() first.');
        }

        await this.channel.assertQueue(queue, { durable: true });
        this.channel.consume(queue, (msg) => {
            if (msg) {
                const messageContent = msg.content.toString();
                console.log(`Message received from queue "${queue}": ${messageContent}`);
                callback(messageContent);
                this.channel?.ack(msg);
            }
        });
    }

    async disconnect(): Promise<void> {
        try {
            await this.channel?.close();
            await this.connection?.close();
            console.log('RabbitMQ connection closed');
        } catch (error) {
            console.error('Failed to close RabbitMQ connection:', error);
        }
    }

    sendRPC(params: { queue: string; message: any }): Promise<{ code: number; response: any }> {
        const { queue, message } = params;
        // Adjust the implementation to match the new signature
        return new Promise((resolve) => {
            // Example response
            resolve({ code: 200, response: "Success" });
        });
    }

      publish(queue: string, message: string): Promise<void> {
        const exchange = ''; // Default exchange or adapt as needed
        const routingKey = queue; // Use queue as routingKey
        if (!this.channel) {
            throw new Error('Channel is not initialized. Call connect() first.');
        }
        return new Promise<void>((resolve, reject) => {
            const success = this.channel?.publish(exchange, routingKey, Buffer.from(message));
            if (success) {
                resolve();
            } else {
                reject(new Error('Failed to publish message'));
            }
        });
      }


}

export default new RabbitMQProvider('amqp://localhost');
