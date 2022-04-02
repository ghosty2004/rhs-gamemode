import { Message } from "discord.js";
import { EventEmitter } from "events";
import { SampPlayer } from "../../libs/samp";

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

declare interface DiscordCommand {
    on<U>(
      event: U, listener: (message: Message, params: Array[]) => void
    ): this;

    emit<U>(
      event: U, ...args: Parameters<(message: Message, params: Array[]) => void>
    )
}

export class DiscordCommand extends EventEmitter {
  public constructor() {
    super();
  }
}