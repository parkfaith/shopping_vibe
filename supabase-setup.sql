-- Shopping Items 테이블 생성
CREATE TABLE IF NOT EXISTS shopping_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  checked BOOLEAN DEFAULT false,
  user_id TEXT DEFAULT 'default',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 인덱스 생성 (성능 향상)
CREATE INDEX IF NOT EXISTS idx_shopping_items_user_id ON shopping_items(user_id);
CREATE INDEX IF NOT EXISTS idx_shopping_items_created_at ON shopping_items(created_at);

-- Row Level Security (RLS) 활성화
ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기/쓰기 가능하도록 정책 설정 (데모용)
CREATE POLICY "Enable read access for all users" ON shopping_items
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON shopping_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON shopping_items
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for all users" ON shopping_items
  FOR DELETE USING (true);
