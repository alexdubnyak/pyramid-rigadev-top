const svgAssets = import.meta.glob('../assets/*.svg', { eager: true, import: 'default' });
const pngAssets = import.meta.glob('../assets/*.png', { eager: true, import: 'default' });

const assets = {
  ...svgAssets,
  ...pngAssets,
};

export const getAssetPath = (fileName) => {
  const assetPath = `../assets/${fileName}`;
  return assets[assetPath] || '';
};
