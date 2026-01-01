const { test, expect } = require('@playwright/test');
const path = require('path');

// 테스트 전에 localStorage를 클리어
test.beforeEach(async ({ page }) => {
  const filePath = 'file://' + path.resolve(__dirname, 'index.html');
  await page.goto(filePath);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test.describe('쇼핑 리스트 앱 테스트', () => {

  test('페이지가 올바르게 로드되는지 확인', async ({ page }) => {
    // 제목 확인
    await expect(page.locator('h1')).toContainText('🛒 쇼핑 리스트');

    // 입력 필드 확인
    await expect(page.locator('#itemInput')).toBeVisible();

    // 추가 버튼 확인
    await expect(page.locator('#addButton')).toBeVisible();

    // 빈 메시지 확인
    await expect(page.locator('.empty-message')).toContainText('아이템을 추가해보세요!');
  });

  test('아이템 추가 기능 테스트', async ({ page }) => {
    // 아이템 입력
    await page.fill('#itemInput', '사과');
    await page.click('#addButton');

    // 아이템이 리스트에 추가되었는지 확인
    await expect(page.locator('.shopping-item')).toHaveCount(1);
    await expect(page.locator('.item-text')).toContainText('사과');

    // 입력 필드가 비워졌는지 확인
    await expect(page.locator('#itemInput')).toHaveValue('');

    // 통계 업데이트 확인
    await expect(page.locator('#stats')).toContainText('전체 1개');
    await expect(page.locator('#stats')).toContainText('남은 항목 1개');
  });

  test('Enter 키로 아이템 추가', async ({ page }) => {
    // Enter 키로 아이템 추가
    await page.fill('#itemInput', '바나나');
    await page.press('#itemInput', 'Enter');

    // 아이템이 추가되었는지 확인
    await expect(page.locator('.shopping-item')).toHaveCount(1);
    await expect(page.locator('.item-text')).toContainText('바나나');
  });

  test('여러 아이템 추가', async ({ page }) => {
    const items = ['우유', '빵', '계란'];

    for (const item of items) {
      await page.fill('#itemInput', item);
      await page.click('#addButton');
    }

    // 모든 아이템이 추가되었는지 확인
    await expect(page.locator('.shopping-item')).toHaveCount(3);

    // 통계 확인
    await expect(page.locator('#stats')).toContainText('전체 3개');
  });

  test('빈 아이템은 추가되지 않음', async ({ page }) => {
    // 빈 입력으로 추가 시도
    await page.click('#addButton');

    // 아이템이 추가되지 않았는지 확인
    await expect(page.locator('.empty-message')).toBeVisible();
    await expect(page.locator('.shopping-item')).toHaveCount(0);

    // 공백만 입력
    await page.fill('#itemInput', '   ');
    await page.click('#addButton');

    // 여전히 아이템이 없는지 확인
    await expect(page.locator('.shopping-item')).toHaveCount(0);
  });

  test('아이템 체크 기능 테스트', async ({ page }) => {
    // 아이템 추가
    await page.fill('#itemInput', '치킨');
    await page.click('#addButton');

    // 체크박스 클릭
    await page.locator('.checkbox').click();

    // 아이템이 체크되었는지 확인
    await expect(page.locator('.shopping-item')).toHaveClass(/checked/);
    await expect(page.locator('.item-text')).toHaveCSS('text-decoration', /line-through/);

    // 통계 확인
    await expect(page.locator('#stats')).toContainText('완료 1개');
    await expect(page.locator('#stats')).toContainText('남은 항목 0개');

    // 다시 클릭하여 체크 해제
    await page.locator('.checkbox').click();

    // 체크가 해제되었는지 확인
    await expect(page.locator('.shopping-item')).not.toHaveClass(/checked/);
    await expect(page.locator('#stats')).toContainText('완료 0개');
    await expect(page.locator('#stats')).toContainText('남은 항목 1개');
  });

  test('여러 아이템 체크/해제', async ({ page }) => {
    // 3개 아이템 추가
    const items = ['토마토', '양파', '마늘'];
    for (const item of items) {
      await page.fill('#itemInput', item);
      await page.click('#addButton');
    }

    // 첫 번째와 세 번째 아이템 체크
    await page.locator('.checkbox').nth(0).click();
    await page.locator('.checkbox').nth(2).click();

    // 통계 확인
    await expect(page.locator('#stats')).toContainText('완료 2개');
    await expect(page.locator('#stats')).toContainText('남은 항목 1개');

    // 체크된 아이템 확인
    await expect(page.locator('.shopping-item').nth(0)).toHaveClass(/checked/);
    await expect(page.locator('.shopping-item').nth(1)).not.toHaveClass(/checked/);
    await expect(page.locator('.shopping-item').nth(2)).toHaveClass(/checked/);
  });

  test('아이템 삭제 기능 테스트', async ({ page }) => {
    // 아이템 추가
    await page.fill('#itemInput', '피자');
    await page.click('#addButton');

    // 삭제 버튼 클릭
    await page.locator('.delete-button').click();

    // 아이템이 삭제되었는지 확인
    await expect(page.locator('.shopping-item')).toHaveCount(0);
    await expect(page.locator('.empty-message')).toBeVisible();
    await expect(page.locator('#stats')).toContainText('아이템이 없습니다');
  });

  test('특정 아이템만 삭제', async ({ page }) => {
    // 3개 아이템 추가
    const items = ['콜라', '사이다', '환타'];
    for (const item of items) {
      await page.fill('#itemInput', item);
      await page.click('#addButton');
    }

    // 두 번째 아이템 삭제
    await page.locator('.delete-button').nth(1).click();

    // 2개 아이템만 남았는지 확인
    await expect(page.locator('.shopping-item')).toHaveCount(2);

    // 올바른 아이템이 남았는지 확인
    await expect(page.locator('.item-text').nth(0)).toContainText('콜라');
    await expect(page.locator('.item-text').nth(1)).toContainText('환타');

    // 통계 확인
    await expect(page.locator('#stats')).toContainText('전체 2개');
  });

  test('완료된 항목 일괄 삭제 기능', async ({ page }) => {
    // 5개 아이템 추가
    const items = ['상추', '고추', '쌈장', '된장', '간장'];
    for (const item of items) {
      await page.fill('#itemInput', item);
      await page.click('#addButton');
    }

    // 3개 아이템 체크
    await page.locator('.checkbox').nth(0).click();
    await page.locator('.checkbox').nth(2).click();
    await page.locator('.checkbox').nth(4).click();

    // 확인 대화상자 수락 설정
    page.on('dialog', dialog => dialog.accept());

    // 완료된 항목 삭제 버튼 클릭
    await page.locator('#clearAll').click();

    // 체크되지 않은 2개 아이템만 남았는지 확인
    await expect(page.locator('.shopping-item')).toHaveCount(2);
    await expect(page.locator('.item-text').nth(0)).toContainText('고추');
    await expect(page.locator('.item-text').nth(1)).toContainText('된장');

    // 통계 확인
    await expect(page.locator('#stats')).toContainText('전체 2개');
    await expect(page.locator('#stats')).toContainText('완료 0개');
  });

  test('완료된 항목이 없을 때 일괄 삭제', async ({ page }) => {
    // 아이템 추가 (체크하지 않음)
    await page.fill('#itemInput', '라면');
    await page.click('#addButton');

    // 완료된 항목 삭제 버튼 클릭
    await page.locator('#clearAll').click();

    // 아이템이 그대로 있는지 확인
    await expect(page.locator('.shopping-item')).toHaveCount(1);
  });

  test('localStorage에 데이터 저장 확인', async ({ page }) => {
    // 아이템 추가
    const items = ['감자', '고구마'];
    for (const item of items) {
      await page.fill('#itemInput', item);
      await page.click('#addButton');
    }

    // 첫 번째 아이템 체크
    await page.locator('.checkbox').nth(0).click();

    // localStorage 확인
    const savedData = await page.evaluate(() => {
      return localStorage.getItem('shoppingList');
    });

    expect(savedData).toBeTruthy();
    const parsedData = JSON.parse(savedData);
    expect(parsedData).toHaveLength(2);
    expect(parsedData[0].text).toBe('감자');
    expect(parsedData[0].checked).toBe(true);
    expect(parsedData[1].text).toBe('고구마');
    expect(parsedData[1].checked).toBe(false);
  });

  test('페이지 새로고침 후 데이터 유지', async ({ page }) => {
    // 아이템 추가
    await page.fill('#itemInput', '수박');
    await page.click('#addButton');
    await page.fill('#itemInput', '참외');
    await page.click('#addButton');

    // 첫 번째 아이템 체크
    await page.locator('.checkbox').nth(0).click();

    // 페이지 새로고침
    await page.reload();

    // 데이터가 유지되었는지 확인
    await expect(page.locator('.shopping-item')).toHaveCount(2);
    await expect(page.locator('.item-text').nth(0)).toContainText('수박');
    await expect(page.locator('.item-text').nth(1)).toContainText('참외');

    // 체크 상태 유지 확인
    await expect(page.locator('.shopping-item').nth(0)).toHaveClass(/checked/);
    await expect(page.locator('.shopping-item').nth(1)).not.toHaveClass(/checked/);

    // 통계 확인
    await expect(page.locator('#stats')).toContainText('전체 2개');
    await expect(page.locator('#stats')).toContainText('완료 1개');
  });

  test('통합 시나리오 테스트', async ({ page }) => {
    // 1. 여러 아이템 추가
    const items = ['샴푸', '린스', '바디워시', '칫솔', '치약'];
    for (const item of items) {
      await page.fill('#itemInput', item);
      await page.click('#addButton');
    }

    // 2. 일부 아이템 체크
    await page.locator('.checkbox').nth(1).click(); // 린스
    await page.locator('.checkbox').nth(3).click(); // 칫솔

    // 3. 하나 삭제
    await page.locator('.delete-button').nth(2).click(); // 바디워시 삭제

    // 4. 상태 확인
    await expect(page.locator('.shopping-item')).toHaveCount(4);
    await expect(page.locator('#stats')).toContainText('전체 4개');
    await expect(page.locator('#stats')).toContainText('완료 2개');
    await expect(page.locator('#stats')).toContainText('남은 항목 2개');

    // 5. 완료된 항목 삭제
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#clearAll').click();

    // 6. 최종 상태 확인
    await expect(page.locator('.shopping-item')).toHaveCount(2);
    await expect(page.locator('.item-text').nth(0)).toContainText('샴푸');
    await expect(page.locator('.item-text').nth(1)).toContainText('치약');
  });

  test('UI 반응성 테스트', async ({ page }) => {
    // 아이템 추가
    await page.fill('#itemInput', '노트북');
    await page.click('#addButton');

    // hover 효과 확인 (스타일 변경 확인)
    const item = page.locator('.shopping-item').first();
    await item.hover();

    // 삭제 버튼 hover
    const deleteButton = page.locator('.delete-button').first();
    await deleteButton.hover();

    // 추가 버튼 hover
    await page.locator('#addButton').hover();
  });
});
