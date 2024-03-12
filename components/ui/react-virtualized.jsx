import React, { useState, useEffect } from "react";
import { CellMeasurer, CellMeasurerCache, createMasonryCellPositioner, Masonry } from 'react-virtualized';
import ImageMeasurer from 'react-virtualized-image-measurer';

// interface Image {
//   name: string;
//   title: string;
//   id: number;
//   width: number;
//   height: number;
//   src: string;
// }

// interface imageProps {
//   images: Image[];
// }

export const Images = function Images(props) {
  const columnWidth = 200;
  const defaultHeight = 250;

  const cache = new CellMeasurerCache({
    defaultHeight,
    defaultWidth: columnWidth,
    fixedWidth: true,
  });

  const cellPositioner = createMasonryCellPositioner({
    cellMeasurerCache: cache,
    columnCount: 3,
    columnWidth,
    spacer: 10,
  });

  useEffect(() => {
    // Prepend a cache-buster to ensure images are not cached by the browser.
    const noCacheList = props.images.map(item => ({
      ...item,
    }));

    // This state is not used directly in rendering and the comment might be confusing,
    // as we handle sizes directly through ImageMeasurer now. Consider removing or modifying this.
    // setItemsWithSizes(noCacheList);
  }, [props.images]);

  // Directly use items from props, as ImageMeasurer will handle loading and size measurement.
  const items = props.images.map(item => ({
    ...item,
  }));

  const cellRenderer = ({ index, key, parent, style }) => {
    // Here we need to ensure that we're using the correctly measured sizes.
    // However, this function does not have direct access to itemsWithMeasuredSizes.
    // Ensure that this function is correctly tied to the output of ImageMeasurer.
  };

  // Correct usage of ImageMeasurer. You need to ensure that the measured sizes are correctly passed down.
  return (
    <ImageMeasurer
      items={items}
      image={item => item.src}
      defaultHeight={defaultHeight}
      defaultWidth={columnWidth}
    >
      {({ itemsWithSizes }) => (
        <Masonry
          cellCount={itemsWithSizes.length}
          cellMeasurerCache={cache}
          cellPositioner={cellPositioner}
          cellRenderer={({ index, key, parent, style }) => {
            const { item, size } = itemsWithSizes[index];
            const height = columnWidth * (size.height / size.width) || defaultHeight;
            return (
              <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
                <div style={style}>
                  <img
                    src={item.src}
                    alt={item.title}
                    style={{
                      height: height,
                      width: columnWidth,
                    }}
                  />
                </div>
              </CellMeasurer>
            );
          }}
          height={window.innerHeight}
          width={window.innerWidth}
        />
      )}
    </ImageMeasurer>
  );
}
