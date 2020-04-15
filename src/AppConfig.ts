export enum EnvVar {
  s3Bucket = 'S3_BUCKET',
  eventKey = 'EVENT_KEY',
  keyPrefix = 'EVENT_KEY_PREFIX',
  keySuffix = 'EVENT_KEY_SUFFIX',
  contentType = 'EVENT_CONTENT_TYPE',
}

export class AppConfig {
  private static requiredValue(key: string, errorMsg?: string): string {
    const rval = this.valueOrUndefined(key) || '';
    if (!rval) {
      throw new Error(errorMsg || `Could not find required config value for key: ${key}`);
    }
    return rval;
  }

  private static valueOrUndefined(key: string): string | undefined {
    let rval = process.env[key];
    if (!rval || rval.length < 1) {
      rval = undefined;
    }
    return rval;
  }

  public readonly s3Bucket = AppConfig.requiredValue(EnvVar.s3Bucket);

  private cachedKey = AppConfig.valueOrUndefined(EnvVar.eventKey);
  private eventKeyPrefix = AppConfig.valueOrUndefined(EnvVar.keyPrefix);
  private eventKeySuffix = AppConfig.valueOrUndefined(EnvVar.keySuffix);
  private cachedContentType = AppConfig.valueOrUndefined(EnvVar.contentType);

  get eventKey(): string {
    let rval = this.cachedKey;
    if (!rval) {
      const prefix = this.eventKeyPrefix ? this.eventKeyPrefix : '';
      const suffix = this.eventKeySuffix ? this.eventKeySuffix : '.json';
      rval = `${prefix}event-${Math.round(Date.now() / 1000)}${suffix}`;
    }
    return rval;
  }

  get eventContentType(): string | undefined {
    let rval = this.cachedContentType;
    if (!rval && !this.cachedKey && !this.eventKeySuffix) {
      rval = 'application/json';
    }
    return rval;
  }
}
