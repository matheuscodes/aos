FROM nginx:1.15-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY dist/aos-app /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 8081
