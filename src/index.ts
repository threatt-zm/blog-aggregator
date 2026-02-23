import { setUser, readConfig } from "./config";
function main() {
    setUser("Zabian");
    console.log(readConfig());
}

main();