// Type definitions for SparkMD5 2.0.2
// Project: https://github.com/satazor/js-spark-md5
// Definitions by: sri raghavan <https://github.com/srir>
// Definitions: https://github.com/Asana/DefinitelyTyped

declare module "spark-md5" {
    // This is a partial type definition and only shows the static method
    export function hash(value: string, raw?: boolean): string;
}
