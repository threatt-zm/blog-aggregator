import { setUser } from "./config";

export type CommandHandler = (cmdName:string, ...args: string[]) => void;
export type CommandsRegistry = Record<string, CommandHandler>;

export function handlerLogin(cmdName: string, ...args: string[]):void {
    if(args.length != 1) {
        throw new Error("A username is required to login");
    }

    setUser(args[0]);
    console.log("Username has been set!");
}

export function registerCommand(registry:CommandsRegistry, cmdName:string, handler:CommandHandler):void {
    registry[cmdName] = handler;
}

export function runCommand(registry:CommandsRegistry, cmdName:string, ...args:string[]):void {
    const handler:CommandHandler = registry[cmdName];
    if (handler) {
       handler(cmdName,...args);
    }
}