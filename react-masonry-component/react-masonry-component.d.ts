// Type definitions for react-masonry-component.js
// Project: https://github.com/eiriklv/react-masonry-component
// Definitions by: Asana <https://asana.com>
// Definitions: https://github.com/Asana/DefinitelyTyped

///<reference path='../react/react.d.ts' />

declare module "react-masonry-component" {
    import React = __React;

    class Masonry extends React.Component<MasonryProps, {}> {}

    interface MasonryProps extends React.Props<Masonry> {
        elementType: string;
        disableImagesLoaded: boolean;
        options: MasonryOptions;
    }

    interface MasonryOptions {
        columnWidth?: string|number;
        gutter?: string|number;
        isFitWidth?: boolean;
        isInitLayout?: boolean;
        isOriginLeft?: boolean;
        isOriginTop?: boolean;
        isResizeBound?: boolean;
        itemSelector?: string;
        percentPosition?: boolean;
        stamp?: boolean;
        transitionDuration?: string|number;
        // TODO: We need to add containerStyle as a dictionary of CSS properties and
        // their values.  I'm not sure how best to do this and don't need it
        // right now, so I'm leaving it out.
    }
}
