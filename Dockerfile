# Use official Nginx image
FROM nginx:latest

# Copy application code into nginx html folder
COPY ./app /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
