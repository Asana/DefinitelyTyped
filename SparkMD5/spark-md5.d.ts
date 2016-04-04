declare module "spark-md5" {
  class SparkMD5 {
    static hash: (s: string, raw?: boolean) => string;
  }

  export = SparkMD5;
}
