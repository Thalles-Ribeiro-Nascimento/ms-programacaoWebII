import RabbitMQ from "../providers/messager-broker-access/implementations/rabbit-mq/rabbit-mq.provider.ts";
import { SendCreateUserApplication } from "./send-create-user-application.ts";
import { SendCreateUserController } from "./send-create-user.controller.ts";

const messagerBroker = RabbitMQ;
const sendCreateUserApp = new SendCreateUserApplication(messagerBroker);
const sendCreateUserController = new SendCreateUserController(sendCreateUserApp);

export { sendCreateUserApp, sendCreateUserController }

