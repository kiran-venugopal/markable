export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const initialGridWidth = 4;

export const LayoutGenerator = (initialItems) => {
  let no_of_grids = 0;
  let height = 0;

  let itemsWithLayout = [];

  const layout = initialItems.map((item) => {
    console.log({ item });
    if (item.layout && Object.keys(item.layout).length > 0) {
      if (no_of_grids + initialGridWidth <= 12) no_of_grids += initialGridWidth;
      else {
        height += 2;
        no_of_grids = initialGridWidth;
      }

      itemsWithLayout.push({
        ...item,
        layout: item.layout,
      });

      return {
        ...item.layout,
      };
    } else {
      if (no_of_grids + initialGridWidth <= 12) {
        let x_value = no_of_grids;
        no_of_grids += initialGridWidth;

        let layoutItem = {
          i: item._id,
          x: x_value,
          y: height,
          w: initialGridWidth,
          h: 2,
          maxW: 12,
          maxH: 4,
          minW: 2,
          minH: 1,
          // content: <Widgetbox contentdata={item} SectionId={sectionID} />,
          static: false,
          isDraggable: true,
          isResizable: true,
        };

        itemsWithLayout.push({
          ...item,
          layout: layoutItem,
        });

        return layoutItem;
      } else {
        height += 2;
        no_of_grids = initialGridWidth;

        let layoutItem = {
          i: item._id,
          x: 0,
          y: height,
          w: initialGridWidth,
          h: 2,
          maxW: 12,
          maxH: 4,
          minW: 2,
          minH: 1,
          //content: <Widgetbox contentdata={item} SectionId={sectionID} />,
          static: false,
          isDraggable: true,
          isResizable: true,
        };
        itemsWithLayout.push({
          ...item,
          layout: layoutItem,
        });
        return layoutItem;
      }
    }
  });

  return { layout, itemsWithLayout };
};
