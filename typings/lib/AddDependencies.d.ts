export = AddDependencies;
declare class AddDependencies {
    static get CONSTANTS(): {
        DEPENDENCIES: string;
        DEV_DEPENDENCIES: string;
        PEER_DEPENDENCIES: string;
        OPTIONAL_DEPENDENCIES: string;
    };
    constructor(dependencies?: any[], target?: string, overwrite?: boolean, packageFilePath?: string);
    result: {};
    dependencies: any[];
    target: string;
    overwrite: boolean;
    packageFilePath: string;
    addDependencies(): Promise<any[]>;
    run(): Promise<void>;
    runNpmShow(dep: any): Promise<any>;
    saveToPackage(): Promise<void>;
}
