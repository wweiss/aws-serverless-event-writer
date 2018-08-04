export enum EnvVar {
  s3Bucket = 'S3_BUCKET',
  eventKey = 'EVENT_KEY',
  keyPrefix = 'EVENT_KEY_PREFIX',
  keySuffix = 'EVENT_KEY_SUFFIX',
  contentType = 'EVENT_CONTENT_TYPE',
}

export class AppConfig {
  private static valueOrNull(key: string): string {
    let rval = process.env[key];
    if (!rval || rval.length < 1) {
      rval = null;
    }
    return rval;
  }

  public readonly s3Bucket = process.env[EnvVar.s3Bucket];

  private cachedKey = AppConfig.valueOrNull(EnvVar.eventKey);
  private eventKeyPrefix = AppConfig.valueOrNull(EnvVar.keyPrefix);
  private eventKeySuffix = AppConfig.valueOrNull(EnvVar.keySuffix);
  private cachedContentType = AppConfig.valueOrNull(EnvVar.contentType);

  get eventKey(): string {
    let rval = this.cachedKey;
    if (!rval) {
      const prefix = this.eventKeyPrefix ? this.eventKeyPrefix : '';
      const suffix = this.eventKeySuffix ? this.eventKeySuffix : '.json';
      rval = `${prefix}event-${Math.round(Date.now() / 1000)}${suffix}`;
    }
    return rval;
  }

  get eventContentType(): string {
    let rval = this.cachedContentType;
    if (!rval && !this.cachedKey && !this.eventKeySuffix) {
      rval = 'application/json';
    }
    return rval;
  }
}
