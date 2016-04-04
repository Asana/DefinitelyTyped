declare module "spark-md5" {
  export default class SparkMD5 {
    static hash: (s: string, raw?: boolean) => string;
  }
}
