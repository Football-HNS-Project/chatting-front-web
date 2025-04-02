# 쨌쨌 - 실시간 채팅 플랫폼

WebSocket과 HTTP를 결합한 하이브리드 아키텍처의 실시간 채팅 플랫폼

## 기술 스택

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=flat-square&logo=socketdotio&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=react-query&logoColor=white)
![Jotai](https://img.shields.io/badge/Jotai-000000?style=flat-square&logo=jotai&logoColor=white)
![shadcn UI](https://img.shields.io/badge/shadcn_UI-000000?style=flat-square&logo=shadcnui&logoColor=white)
![AWS Amplify](https://img.shields.io/badge/AWS_Amplify-FF9900?style=flat-square&logo=aws-amplify&logoColor=white)

## 핵심 기능

- **실시간 일대다 채팅**: WebSocket을 통한 즉각적인 메시지 전송 및 수신
- **채팅방 관리**: 채팅방 생성, 사용자 초대, 나가기 기능
- **실시간 알림**: 새로운 메시지와 상태 변경에 대한 실시간 알림
- **톡서랍 기능**: 채팅방 내 사진, 동영상, 파일, 공지사항 히스토리 효율적 관리 및 검색
- **공지사항 등록**: 중요 정보를 공지사항으로 등록 및 관리

## 실시간 동기화 시스템

- **사용자 프로필 변경 실시간 반영**: 프로필 이미지, 이름 등 정보 변경 시 즉시 반영
- **메시지 읽음 확인**: 채팅방 내 메세지를 확인한 인원 수 실시간 업데이트
- **읽지 않은 메시지 카운터**: 채팅방 목록에서 읽지 않은 메시지 수 실시간 업데이트
- **공지사항 알림**: 새로운 공지사항에 대한 실시간 알림 및 표시
- **오프라인 메시지 동기화**: 오프라인 상태에서 누락된 메시지 자동 동기화

## 기술적 성과

- **WebSocket 기반 실시간 통신**: 지연 없는 양방향 통신 구현
- **Pub/Sub 아키텍처**: 이벤트 기반의 확장 가능한 아키텍처 설계
- **양방향 무한 스크롤**: 효율적인 메시지 로딩 및 렌더링
- **FCM 알림 시스템**: Firebase Cloud Messaging을 이용한 푸시 알림 구현
- **다양한 메시지 타입**: 텍스트, 파일, 이미지 등 다양한 형식의 메시지 지원
- **실시간 읽음 확인**: 사용자 경험을 개선하는 메시지 상태 추적
- **네트워크 복원력**: 네트워크 연결 문제 발생 시 자동 재연결 및 메시지 동기화

## 프로젝트 인사이트

- **대규모 실시간 통신 시스템**: 확장 가능한 실시간 통신 시스템 설계 경험 및 성능 최적화
- **상태 관리 전략**: Jotai와 TanStack Query를 활용한 효율적인 상태 관리 구현
- **이벤트 기반 아키텍처**: Pub/Sub 패턴을 활용한 확장성 높은 시스템 구축
- **사용자 경험 최적화**: 네트워크 상태에 관계없이 일관된 사용자 경험 제공

## 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 테스트 빌드
npm run build:dev

# 프로덕션 빌드
npm run build:prod
```

## 프로젝트 구조

```
src/
├── apis/            # API 클라이언트 및 통신 관련 코드
├── assets/          # 이미지 및 정적 리소스
├── components/      # 재사용 가능한 UI 컴포넌트
├── hooks/           # 커스텀 React 훅
├── lib/             # 외부 라이브러리 구성
├── pages/           # 페이지 컴포넌트
├── routers/         # 라우팅 구성
├── stores/          # 상태 관리 (Jotai)
├── typings/         # TypeScript 타입 정의
└── utils/           # 유틸리티 함수
```
