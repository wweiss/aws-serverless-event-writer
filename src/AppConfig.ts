export class AppConfig {
  public readonly s3Bucket = process.env['S3_BUCKET'];
  private _eventKey = AppConfig.valueOrNull('EVENT_KEY');
  private eventKeyPrefix = AppConfig.valueOrNull('EVENT_KEY_PREFIX');
  private eventKeySuffix = AppConfig.valueOrNull('EVENT_KEY_SUFFIX');
  public readonly eventContentType = AppConfig.valueOrNull(
    'EVENT_CONTENT_TYPE'
  );

  static valueOrNull(key: string): string {
    let rval = process.env[key];
    if (!rval || rval.length < 1) {
      rval = null;
    }
    return rval;
  }

  get eventKey(): string {
    let rval = this._eventKey;
    if (!rval) {
      const suffix = this.eventKeySuffix ? this.eventKeySuffix : '.json';
      rval = `${this.eventKeyPrefix}event-${Math.round(
        Date.now() / 1000
      )}${suffix}`;
    }
    return rval;
  }
}
