import RabbitMQ from "../providers/messager-broker-access/implementations/rabbit-mq/rabbit-mq.provider.ts";
import { SendCreateUserApplication } from "../app/send-create-user-application";
import { SendCreateUserController } from "../app/send-create-user.controller";

const messagerBroker = RabbitMQ;
const sendCreateUserApp = new SendCreateUserApplication(messagerBroker);
const sendCreateUserController = new SendCreateUserController(sendCreateUserApp);

export { sendCreateUserApp, sendCreateUserController }

