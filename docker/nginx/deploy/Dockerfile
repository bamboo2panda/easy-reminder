
# Second stage
# Copy React static files and run nginx
FROM node:15.14.0-alpine as build
WORKDIR /frontend
COPY ./frontend ./


FROM nginx:stable-alpine
COPY --from=build /frontend/build /usr/share/nginx/html
ENV NODE_ENV=development
CMD ["nginx", "-g", "daemon off;"]