const blogPluginExports = require('@docusaurus/plugin-content-blog');
const blogPlugin = blogPluginExports.default;

async function blogPluginEnhanced(...pluginArgs) {
  const blogPluginInstance = await blogPlugin(...pluginArgs);

  return {
    ...blogPluginInstance,
    async contentLoaded(contentLoadedArgs) {
      const {
        content: { blogPosts },
        actions: { setGlobalData }
      } = contentLoadedArgs;
      const recentBlogs = [...blogPosts].splice(0, 3).map(({ metadata }) => ({
        date: metadata.date,
        formattedDate: metadata.formattedDate,
        title: metadata.title,
        readingTime: metadata.readingTime,
        permalink: metadata.permalink
      }));
      setGlobalData({ recentBlogs });

      contentLoadedArgs.actions.addRoute({
        path: '/admin',
        exact: true,
        content: contentLoadedArgs.content
      })

      return blogPluginInstance.contentLoaded(contentLoadedArgs);
    }
  };
}
module.exports = {
  ...blogPluginExports,
  default: blogPluginEnhanced
};
