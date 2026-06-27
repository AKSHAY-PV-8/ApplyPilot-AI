FROM node:22-alpine AS builder 

RUN apk add --no-cache \
    texlive \
    texlive-xetex \
    texmf-dist-latexextra \
    texmf-dist-fontsrecommended \
    texmf-dist-fontsextra \
    perl

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build


FROM node:22-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist/prisma.config.js ./prisma.config.js
COPY --from=builder /app/dist/generated ./dist/generated
EXPOSE 5003
CMD ["sh","-c","npx prisma migrate deploy && node dist/index.js"]

