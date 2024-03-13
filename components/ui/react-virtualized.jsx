import React, { useState, useEffect } from "react";
import { CellMeasurer, CellMeasurerCache, createMasonryCellPositioner, Masonry } from 'react-virtualized';
import ImageMeasurer from 'react-virtualized-image-measurer';
import styled from 'styled-components';

const MasonryContainer = styled.div`
  height: 100vh;
  overflow: auto;
`;

const defaultWidth = 200;

export const Images = function Images(props) {
  const cache = new CellMeasurerCache({
    defaultWidth,
    defaultHeight: 250,
    fixedWidth: true,
  });
  const cellPositioner = createMasonryCellPositioner({
    cellMeasurerCache: cache,
    columnCount: Math.floor(window.innerWidth / (defaultWidth + 10)),
    columnWidth: defaultWidth,
    spacer: 10,
  });

  useEffect(() => {
    const first = window.addEventListener('resize', () => {
      cache.clearAll();
      cellPositioner.reset({
        columnCount: Math.floor(window.innerWidth / (defaultWidth + 10)),
        columnWidth: defaultWidth,
        spacer: 10,
      });
    });
    return () => window.removeEventListener('resize', first);
  
  }, [cache, cellPositioner])
  

  useEffect(() => {
    const noCacheList = props.images.map(item => ({ ...item }));
  }, [props.images]);

  const items = props.images.map(item => ({ ...item }));

  return (
    <MasonryContainer>
      <ImageMeasurer
        items={items}
        image={item => item.src}
        defaultWidth={defaultWidth}
      >
        {({ itemsWithSizes }) => (
          <Masonry
            cellCount={itemsWithSizes.length}
            cellMeasurerCache={cache}
            cellPositioner={cellPositioner}
            cellRenderer={({ index, key, parent, style }) => {
              const { item, size } = itemsWithSizes[index];
              const height = (defaultWidth * size.height) / size.width; // Calculate height based on aspect ratio
              return (
                <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
                  <div style={{ ...style, height }}>
                    <img
                      src={item.src}
                      alt={item.title}
                      style={{ height: '100%', width: 'auto' }}
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
    </MasonryContainer>
  );
}