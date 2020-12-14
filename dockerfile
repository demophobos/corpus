FROM nginx:1.19-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/clr /usr/share/nginx/html