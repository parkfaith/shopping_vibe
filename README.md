# 🛒 Shopping List App

간단하고 직관적인 쇼핑 리스트 웹 애플리케이션입니다.

## ✨ 주요 기능

- ✅ 아이템 추가 (Enter 키 지원)
- ✅ 아이템 체크/해제 (완료 표시)
- ✅ 개별 아이템 삭제
- ✅ 완료된 항목 일괄 삭제
- ✅ 실시간 통계 (전체/완료/남은 항목)
- ✅ localStorage를 통한 데이터 영구 저장
- ✅ 반응형 디자인

## 🚀 사용 방법

### 바로 실행하기

1. `shopping-list.html` 파일을 브라우저로 엽니다.
2. 또는 터미널에서:
   ```bash
   start shopping-list.html
   ```

### 추가 설정 필요 없음

이 앱은 순수 HTML, CSS, JavaScript로 만들어져 별도의 설치나 서버가 필요하지 않습니다.

## 🧪 테스트

Playwright를 사용한 자동화 테스트가 포함되어 있습니다.

### 테스트 실행

```bash
# 의존성 설치
npm install

# Chromium 브라우저 설치
npx playwright install chromium

# 테스트 실행
npm test
```

### 테스트 커버리지

- 페이지 로드 확인
- 아이템 추가/삭제 기능
- 체크/해제 기능
- localStorage 저장 및 복원
- 통합 시나리오 테스트
- **15개 테스트 모두 통과** ✅

## 📁 프로젝트 구조

```
shopping-list-app/
├── shopping-list.html       # 메인 애플리케이션
├── shopping-list.test.js    # Playwright 테스트
├── playwright.config.js     # Playwright 설정
├── package.json             # 프로젝트 설정
└── README.md                # 프로젝트 문서
```

## 🛠️ 기술 스택

- HTML5
- CSS3 (Flexbox, Gradient)
- Vanilla JavaScript (ES6+)
- localStorage API
- Playwright (테스트)

## 🎨 특징

- 아름다운 그라데이션 UI
- 부드러운 애니메이션과 호버 효과
- 직관적인 사용자 경험
- 모바일 친화적 디자인

## 📝 라이선스

MIT License

## 👨‍💻 개발자

Claude Code로 개발되었습니다.
