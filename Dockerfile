# 1. 빌드 단계
FROM node:18 as build

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 설치 및 빌드
RUN npm install -g pnpm
COPY package*.json ./
RUN pnpm install
COPY . .
RUN pnpm run build

# 2. 실행 단계
FROM nginx:alpine

# Nginx 설정 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 빌드된 파일을 Nginx 웹 루트로 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 컨테이너가 외부에 노출할 포트를 지정
EXPOSE 80

# 컨테이너 시작 시 Nginx 실행
CMD ["nginx", "-g", "daemon off;"]