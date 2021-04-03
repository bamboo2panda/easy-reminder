# First stage
# Build react app
FROM node:15.12.0-alpine as build

ENTRYPOINT /docker/backend/wsgi-entrypoint.sh

WORKDIR /frontend
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm ci --silent
COPY ./frontend ./
RUN npm run build

# Second stage
# Copy React static files and run nginx
FROM nginx:stable-alpine
COPY --from=build /frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]