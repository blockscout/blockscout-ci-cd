FROM mcr.microsoft.com/playwright:next

RUN mkdir -p /newfolder
WORKDIR /newfolder
USER root 
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx playwright install chrome
RUN useradd -u 8877 Turing
RUN chown Turing /newfolder
USER Turing

CMD ["npx","cross-env","ENV=test","npm","run","test:serial"]