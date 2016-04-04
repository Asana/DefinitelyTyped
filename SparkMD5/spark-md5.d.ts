declare module "spark-md5" {
  export class SparkMD5 {
    hash: (s: string, raw?: boolean) => string;
  }
}
