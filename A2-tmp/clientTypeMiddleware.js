// Middleware to route requests based on X-Client-Type header
function routeRequests(req, res, next) {
    const clientType = req.headers['x-client-type'];
  
    if (!clientType || !['Web', 'iOS', 'Android'].includes(clientType)) {
      return res.status(400).json({ message: 'Invalid or missing X-Client-Type header' });
    }
  
    console.log(req.url)
    // Route requests based on X-Client-Type header
    switch (clientType) {
      case 'Web':
        // Route to Book store web app BFF service
        // Example: res.redirect('/books-web');
        // or modify req.url to match the appropriate route for Book store web app BFF service

        if (req.url.startsWith('/books')) {
            req.url = '/books';
        }
        // Route customers requests to Customer service
        if (req.url.startsWith('/customers')) {
            console.log("go to customers")
            req.url = '/customers';
        }
  
        break;
      case 'iOS':
      case 'Android':
        // Route to Book store mobile app BFF service
        // Example: res.redirect('/books-mobile');
        // or modify req.url to match the appropriate route for Book store mobile app BFF service

        if (req.url.startsWith('/books')) {
            req.url = '/books';
        }
        // Route customers requests to Customer service
        if (req.url.startsWith('/customers')) {
            req.url = '/customers';
        }

        break;
      default:
        return res.status(400).json({ message: 'Invalid X-Client-Type header value' });
    }
  
    next(); // Move to the next middleware or route handler
  }
  
  module.exports = routeRequests;
  