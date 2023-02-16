import { draw } from './main';

export function getPart(width, height) {
    console.log('render', { width, height });
    if (height > width) {
        // let leftHeight = height - (width * Math.floor(height / width));
        // leftHeight = leftHeight === 0 ? width : leftHeight;
        // return getPart(width, leftHeight);
        const data = [{ width, height: height - width }, { width: 0, height: height - width }];
        draw(data, 'steelblue');
        return getPart(width, height - width);
    } else if (width > height) {
        // let leftWidth = width - (height * Math.floor(width / height));
        // leftWidth = leftWidth === 0 ? height : leftWidth;
        // return getPart(leftWidth, height);
        // draw();
        const data = [{ width: width - height, height }, { width: width - height, height: 0 }];
        draw(data, 'steelblue');
        return getPart(width - height, height);
    } else {
        return { width, height };
    }
}
