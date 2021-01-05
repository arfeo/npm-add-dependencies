export = Files;
declare class Files {
    static readFromFile(filePath: any): Promise<any>;
    static writeToFile(filePath: any, fileContent: any): Promise<any>;
}
