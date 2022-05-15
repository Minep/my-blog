declare module 'bit-field/lib' {
    interface RendererConfig {
        hspace?: number,
        vspace?: number,
        lanes?: number,
        bits?: number,
        fontsize?: number,
        hflip?: boolean,
        compact?: boolean,
        fontfamily?: string;
        fontweight?: string;
        uneven?: boolean;
    }
    export function render(json: Record<string, any>, options?:RendererConfig): any;
}