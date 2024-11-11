# 1단계: 빌드 환경 설정
FROM node:20.11-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 의존성 파일 복사
COPY package.json package-lock.json ./

# 의존성 설치
RUN npm install --force --legacy-peer-deps

# 애플리케이션 소스 복사
COPY . .

# React 애플리케이션 빌드
RUN npm run build

# 2단계: 실행
FROM nginx:alpine

# 빌드 결과물 복사
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Nginx 설정 파일 복사 (필요한 경우)
# COPY nginx.conf /etc/nginx/nginx.conf

# 포트 노출
EXPOSE 80