// Type definitions for quill.js
// Project: https://github.com/quilljs/quill/tree/0.20.1
// Definitions by: Asana <https://asana.com>
// Definitions: https://github.com/Asana/DefinitelyTyped

declare module "quill" {
    class Quill<T extends Quill.Attributes, E extends Quill.Attributes> {
        // we shouldn't be accessing the internal modules object, but we need
        // this for now to hide the warning for replacing paste-manager. We should
        // remove it after mergin our paste-manager PR into Quill.
        static modules: any;
        static DEFAULTS: Quill.QuillConfig;

        root: HTMLElement;
        options: Quill.QuillConfig;
        // by right we shouldn't access the editor attribute since it's not in the API
        // unfortunately we need to access the leaf nodes of the document model
        // for linkifications
        editor: Quill.Editor<T, E>;

        static require(internalQuillModule: "delta"): Quill.DeltaClass;
        static require(internalQuillModule: string): any;
        static registerModule(name: string, moduleClass: Quill.ModuleClass): void;
        static registerTheme(name: string, theme: Quill.ThemeClass): void;

        addContainer(className: string): HTMLElement;
        constructor(container: HTMLElement, configs?: Quill.QuillConfig);
        addFormat(name: string, config: Quill.FormatConfig): boolean;
        deleteText(start: number, end: number, source?: string): void;
        destroy(): void;
        focus(): void;
        formatText(start: number, end: number, format: T|E, source?: string): void;
        formatText(start: number, end: number, format: string, value: string): void;
        formatLine(start: number, end: number, format: string, value: string, source?: string): void;
        getContents(): Quill.DeltaInit<T, E>;
        getContents(start: number, end?: number): Quill.DeltaInit<T, E>;
        getHTML(): string;
        getLength(): number;
        getModule(name: string): any;
        getSelection(): Quill.Range;
        getText(): string;
        getText(start: number, end: number): string;
        insertText(index: number, text: string, formats?: T|E, source?: string): void;
        on(eventName: "text-change", listener: Quill.OnTextChangeListener<T, E>): void;
        on(eventName: "selection-change", listener: Quill.OnSelectionChangeListener): void;
        prepareFormat(format: string, value: string, source?: string): void;
        setContents(delta: Quill.DeltaInit<T, E>, source?: string): void;
        setHTML(html: string, source?: string): void;
        setSelection(start: number, end: number, source?: string): void;
        setText(text: string, source?: string): void;
        updateContents(delta: Quill.Delta<T, E>, source?: string): void;
    }

    module Quill {
        export interface Editor<T extends Attributes, E extends Attributes> {
            doc: Document<T, E>;
            checkUpdate(source?: string): void;
        }

        interface LeafOffsetTuple<T extends Attributes, E extends Attributes> extends Array<Leaf<T, E> | number> {
            0: Leaf<T, E>;
            1: number;
        }

        interface LineOffsetTuple<T extends Attributes> extends Array<Line<T> | number> {
            0: Line<T>;
            1: number;
        }

        export interface Document<T extends Attributes, E extends Attributes> {
            findLeafAt(point: number): LeafOffsetTuple<T, E>;
            findLineAt(point: number): LineOffsetTuple<T>;
        }

        export interface Leaf<T, E> {
            prev?: Leaf<T, E>;
            next?: Leaf<T, E>;
            length: number;
            formats: T & E;
        }

        export interface Line<T extends Attributes> {
            prev?: Line<T>;
            next?: Line<T>;
            length: number;
            formats: T;
        }

        export interface DeltaClass {
            new<T extends Attributes, E extends Attributes>(): Quill.DeltaOfType<T, E, any>;
            new<T extends Attributes, E extends Attributes>(ops: InsertOperation<T, E>[]): Quill.DeltaOfType<T, E, InsertOperation<T, E>>;
            new(ops: DeleteOperation[]): Quill.DeltaOfType<any, any, DeleteOperation>;
            new<T extends Attributes, E extends Attributes>(ops: RetainOperation<T, E>[]): Quill.DeltaOfType<T, E, RetainOperation<T, E>>;
            new<T extends Attributes, E extends Attributes>(ops: Quill.DeltaOperation<T, E>[]): Quill.Delta<T, E>;
        }

        export interface ModuleClass {
            new(quill: Quill<any, any>, option: any): any;
        }

        interface QuillConfig {
            formats?: string[];
            modules?: {};
            pollInterval?: number;
            readOnly?: boolean;
            styles?: {};
            theme?: string;
            id?: string;
            tabindex?: number;
        }

        export interface ThemeClass {
            new(quill: Quill<any, any>, options: QuillConfig): {};
            OPTIONS: QuillConfig;
        }

        export interface EmbedAttributes {
            image?: string;
        }

        export interface TextAttributes {
            background?: string;
            bold?: boolean;
            color?: string;
            font?: string;
            italic?: boolean;
            link?: string;
            size?: string;
            strike?: boolean;
            underline?: boolean;

            align?: string;
            bullet?: boolean;
            list?: boolean;
        }

        export interface Attributes { [s: string]: boolean | string }

        export interface QuillAttributes extends EmbedAttributes, TextAttributes {

        }

        export interface TextInsertOperation<TextAttributes extends Attributes> {
            insert: string;
            attributes?: TextAttributes;
        }

        export interface EmbedInsertOperation<EmbedAttributes extends Attributes> {
            insert: number;
            attributes: EmbedAttributes;
        }

        export type InsertOperation<T extends Attributes, E extends Attributes> = TextInsertOperation<T> | EmbedInsertOperation<E>;

        export interface DeleteOperation {
            delete: number;
        }

        export interface RetainOperation<T, E> {
            retain: number;
            attributes?: T | E;
        }

        export type DeltaOperation<T extends Attributes, E extends Attributes> = InsertOperation<T, E> | DeleteOperation | RetainOperation<T, E>;

        export interface DeltaOfType<T extends Attributes, E extends Attributes, D extends DeltaOperation<T, E>> {
            ops: Array<D>;

            length(): number;
            compose(other: Delta<T, E>): Delta<T, E>;
            diff(other: Delta<T, E>): Delta<T, E>;
            transform(other: Delta<T, E>, priority?: boolean): Delta<T, E>;
            transformPosition(index: number): number;

            insert(text: number, attributes?: E): Delta<T, E>;
            insert(text: string, attributes?: T): Delta<T, E>;
            delete(length: number): Delta<T, E>;
            retain(length: number, attributes?: T | E): Delta<T, E>;

            push(op: D): Delta<T, E>;
            chop(): Delta<T, E>; // removes any no-op "retain" op from the end of the delta
            slice(startIndex: number, endIndex: number): Delta<T, E>;

            // Unlike most of the above methods, concat does not modify `this`;
            // it returns a new delta
            concat(other: Delta<T, E>): Delta<T, E>;
        }

        export type DeltaInit<T extends Attributes, E extends Attributes> = DeltaOfType<T, E, InsertOperation<T, E>>;

        export type Delta<T extends Attributes, E extends Attributes> = DeltaOfType<T, E, DeltaOperation<T, E>>;

        export interface Range {
            start: number;
            end: number;
        }

        export interface FormatConfig {
            tag: string;
        }

        export interface OnTextChangeListener<T extends Attributes, E extends Attributes> {
            (delta: Quill.Delta<T, E>, source: string): void;
        }

        export interface OnSelectionChangeListener {
            (range: Quill.Range): void;
        }
    }

    export = Quill
}
