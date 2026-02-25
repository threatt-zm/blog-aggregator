import { setUser, readConfig } from "./config";
import { handlerLogin, registerCommand, runCommand, type CommandsRegistry } from "./commandHandler";
import { exit } from "process";

function main() {
    const registry:CommandsRegistry = {};
    registerCommand(registry, "login", handlerLogin);
    const args:string[] = process.argv.slice(2);

    if(args.length == 0) {
        console.log("Not enough arguments were provided!");
        exit(1);
    } else if (args.length == 1) {
        console.log("A username is required");
        exit(1);
    } else {
        runCommand(registry, args[0], ...args.slice(1));
    }
}

main();