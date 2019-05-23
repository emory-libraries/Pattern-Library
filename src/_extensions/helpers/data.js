// Export helpers.
module.exports = {

  // This patches the missing helpers that will be available
  // within the templating engine, but will not be available
  // within Pattern Lab. This is needed in order to let
  // Pattern Lab fail gracefully when attempting to use these
  // helpers.
  getMetaData: () => null,
  getMetaDataByPath: () => null,
  getGlobalData: () => null,
  getGlobalDataByPath: () => null,
  getSharedData: () => null,
  getSharedDataByPath: () => null,
  getSiteData: () => null,
  getSiteDataByPath: () => null,
  getSiteDataOfType: () => null,
  getSiteDataByPathOfType: () => null,
  getData: () => null,
  getDataByPath: () => null,
  getDataOfType: () => null,
  getDataByPathOfType: () => null

};
