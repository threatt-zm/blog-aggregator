import fs from "fs";
import os from "os";
import path from "path";

type Config = {
    dbUrl:string;
    currentUserName:string;
}

export function setUser(name:string):void {

    const cfg:Config = readConfig(); 
    cfg.currentUserName = "Zabian";
    writeConfig(cfg);
}

export function readConfig():Config {

    const cfg_path = getConfigFilePath();
    const data = fs.readFileSync(cfg_path, 'utf-8');
    const rawConfig = JSON.parse(data);

    return validateConfig(rawConfig);
}

function getConfigFilePath():string {
    const fileName = ".gatorconfig.json";
    const homeDir = os.homedir();

    return path.join(homeDir, fileName);
}

function writeConfig(cfg:Config):void {

    const cfg_path = getConfigFilePath();
    const rawConfig = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName
    };
    const data = JSON.stringify(rawConfig);
    fs.writeFileSync(cfg_path, data);
}

function validateConfig(rawConfig:any):Config {
    
    if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
        throw new Error("db_url is required for config");
    };
    if (!rawConfig.current_user_name || typeof rawConfig.current_user_name !== "string") {
        throw new Error("current_user_name is required for config");
    };
    const cfg:Config = {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name,
    }; 

    return cfg;
}