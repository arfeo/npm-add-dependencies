#!/usr/bin/env node
declare const _exports: {
    new (dependencies?: any[], target?: string, overwrite?: boolean, packageFilePath?: string): import("./lib/AddDependencies");
    readonly CONSTANTS: {
        DEPENDENCIES: string;
        DEV_DEPENDENCIES: string;
        PEER_DEPENDENCIES: string;
        OPTIONAL_DEPENDENCIES: string;
    };
};
export = _exports;
