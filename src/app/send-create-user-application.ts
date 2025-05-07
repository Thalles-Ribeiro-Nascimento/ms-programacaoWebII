import { IMessagerBrokerAccess } from "../providers/messager-broker-access/implementations/imessager-broker-access.interface.ts";

import { ISendCreateUserDTO } from "../app/isend-create-user-dto.interface.ts";


export class SendCreateUserApplication {

   constructor (private readonly messagerBroker: IMessagerBrokerAccess) { }

   /**
    * Handle
    * @param userSend
    */
   async handle(userSend: ISendCreateUserDTO): Promise<{code: number, response: any}> {

       return await this.messagerBroker.sendRPC({
           queue: 'user-create',
           message: userSend
       });


   }


}

