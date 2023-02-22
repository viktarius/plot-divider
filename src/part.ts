export function getPart(width: number, height: number, result = []): number[][][] {
    console.log('render', {width, height});
    if (height > width) {
        // let leftHeight = height - (width * Math.floor(height / width));
        // leftHeight = leftHeight === 0 ? width : leftHeight;
        // return getPart(width, leftHeight);
        result.push([[width, height - width], [0, height - width]]);

        return getPart(width, height - width, result);
    } else if (width > height) {
        // let leftWidth = width - (height * Math.floor(width / height));
        // leftWidth = leftWidth === 0 ? height : leftWidth;
        // return getPart(leftWidth, height);
        result.push([[width - height, height], [width - height, 0]]);
        return getPart(width - height, height, result);
    } else {
        return result;
    }
}
