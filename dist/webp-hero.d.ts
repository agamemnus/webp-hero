export default class WebpHero {
    private readonly dwebp;
    private busy;
    constructor({dwebp}?: {
        dwebp?: any;
    });
    decode(webpdata: Uint8Array): Promise<string>;
    polyfill({document, force}?: {
        document?: Document;
        force?: boolean;
    }): Promise<void>;
}
