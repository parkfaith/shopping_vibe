# 🛒 Shopping List App

간단하고 직관적인 쇼핑 리스트 웹 애플리케이션입니다.

## ✨ 주요 기능

- ✅ 아이템 추가 (Enter 키 지원)
- ✅ 아이템 체크/해제 (완료 표시)
- ✅ 개별 아이템 삭제
- ✅ 완료된 항목 일괄 삭제
- ✅ 실시간 통계 (전체/완료/남은 항목)
- ✅ **Supabase 데이터베이스 연동** (클라우드 저장)
- ✅ **실시간 동기화** (여러 기기에서 동시 사용 가능)
- ✅ 반응형 디자인
- ✅ XSS 보안 처리

## 🚀 사용 방법

### 바로 실행하기

1. `index.html` 파일을 브라우저로 엽니다.
2. 또는 터미널에서:
   ```bash
   start index.html
   ```

### GitHub Pages로 바로 보기

https://parkfaith.github.io/shopping_vibe/

### Supabase 데이터베이스 연동

이 앱은 Supabase를 사용하여 클라우드에 데이터를 저장합니다.

**데이터베이스 설정 (이미 완료됨):**
1. Supabase 프로젝트 생성
2. `supabase-setup.sql` 파일의 SQL을 실행하여 `shopping_items` 테이블 생성
3. Supabase URL과 Anon Key가 이미 앱에 설정되어 있음

**장점:**
- ☁️ 클라우드 저장으로 여러 기기에서 동일한 데이터 접근
- 🔄 실시간 동기화로 변경사항이 즉시 반영
- 🔒 Row Level Security로 보안 강화

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
shopping_vibe/
├── index.html               # 메인 애플리케이션
├── supabase-setup.sql       # Supabase 테이블 생성 SQL
├── shopping-list.test.js    # Playwright 테스트
├── playwright.config.js     # Playwright 설정
├── package.json             # 프로젝트 설정
└── README.md                # 프로젝트 문서
```

## 🛠️ 기술 스택

- HTML5
- CSS3 (Flexbox, Gradient)
- Vanilla JavaScript (ES6+, Async/Await)
- **Supabase** (PostgreSQL 데이터베이스)
- **Supabase Realtime** (실시간 동기화)
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
