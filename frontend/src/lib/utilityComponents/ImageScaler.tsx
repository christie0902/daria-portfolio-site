const imageScaler = (
  targetLink = undefined,
  scale = 100
) => {
    if (!targetLink) {
        console.warn('empty link in image scaler');
        return '';
    };
    const transformer = `c_scale,h_0.${scale},w_0.${scale}`
    const splitLink = targetLink.split('/');
    const image = splitLink.pop()
    const folderAndImg = `${splitLink.pop()}/${image}`
    return `${splitLink.join('/')}/${transformer}/${folderAndImg}`;
};

export default imageScaler;
