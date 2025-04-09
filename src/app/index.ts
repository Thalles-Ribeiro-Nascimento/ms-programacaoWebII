import { RabbitMQ } from "../providers/messager-broker-acess/implementations/rabbit-mq/rabbit-mq.provider";
import { SendCreateUserApplication } from "../app/send-create-user-application";
import { SendCreateUserController } from "../app/send-create-user.controller";

const messagerBroker = new RabbitMQ();
const sendCreateUserApp = new SendCreateUserApplication(messagerBroker);
const sendCreateUserController = new SendCreateUserController(sendCreateUserApp);

export { sendCreateUserApp, sendCreateUserController }

