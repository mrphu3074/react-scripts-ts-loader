module.exports = function typescriptPlugin(paths, config) {
  paths.appIndexJs = process.cwd() + '/src/index.tsx';
  // Change entry
  config.entry.pop();
  config.entry.push(
    paths.appIndexJs
  );
  // Add support typescript file extensions
  config.resolve.extensions = config.resolve.extensions.concat(['.ts', '.tsx']);
  // exclude typescript extensions out of url-loader
  var loaderUrlIndex = config.module.loaders.findIndex(function (loader) {
    return loader.loader === "url";
  });
  if (loaderUrlIndex >= 0) {
    config.module.loaders[loaderUrlIndex].exclude = config.module.loaders[loaderUrlIndex].exclude.concat([/\.(ts|tsx)$/]);
  }
  // Add typescript loader
  config.module.loaders = config.module.loaders.concat([{
    test: /\.(ts|tsx)$/,
    include: paths.appSrc,
    loader: 'ts'
  }]);
  return {
    paths: paths,
    config: config,
  };
}