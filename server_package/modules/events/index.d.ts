import { EventEmitter } from "events";
import { SampPlayer } from "samp-node-lib";

declare interface Command {
    on<U>(
      event: U, listener: (player: SampPlayer, params: Array[]) => void
    ): this;
  
    emit<U>(
      event: U, ...args: Parameters<(player: SampPlayer, params: Array[]) => void>
    ): boolean;
}

export class Command extends EventEmitter {
    public constructor() {
      super();
    }
}