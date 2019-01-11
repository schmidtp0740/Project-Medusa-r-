FROM node:6
RUN npm install react-scripts@1.1.1 serve -g --silent
COPY . .
RUN npm install --silent
EXPOSE 3000

# start app
CMD ["npm", "start"]
