export default function ({ app }) {
  if (!app.router) return;

  const originalPush = app.router.push;
  app.router.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) {
      return originalPush.call(this, location, onResolve, onReject);
    }
    
    const result = originalPush.call(this, location);
    if (result && typeof result.catch === 'function') {
      return result.catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          // Log the error but don't throw it to prevent app crashes
          console.warn('Navigation error:', err);
        }
        // Return a resolved promise to continue the navigation chain
        return Promise.resolve(false);
      });
    }
    // If result is undefined or doesn't have catch method, return a resolved promise
    return Promise.resolve(result);
  };

  const originalReplace = app.router.replace;
  app.router.replace = function replace(location, onResolve, onReject) {
    if (onResolve || onReject) {
      return originalReplace.call(this, location, onResolve, onReject);
    }
    
    const result = originalReplace.call(this, location);
    if (result && typeof result.catch === 'function') {
      return result.catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          console.warn('Navigation replace error:', err);
        }
        return Promise.resolve(false);
      });
    }
    // If result is undefined or doesn't have catch method, return a resolved promise
    return Promise.resolve(result);
  };
}